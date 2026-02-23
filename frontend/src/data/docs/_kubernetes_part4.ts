import type { DocCategory } from './types';

export const K8S_PART4_CATEGORIES: DocCategory[] = [
  {
    id: 'k8s-scaling',
    label: 'Scaling & Scheduling',
    icon: '📈',
    entries: [
      {
        id: 'k8s-cluster-autoscaler',
        title: 'Cluster Autoscaler',
        difficulty: 'intermediate',
        tags: ['autoscaling', 'nodes', 'cloud', 'capacity'],
        sections: [
          {
            heading: 'How the Cluster Autoscaler Works',
            content: 'The Cluster Autoscaler automatically adjusts the number of nodes in your Kubernetes cluster when pods fail to schedule due to insufficient resources or when nodes remain underutilized for an extended period. It watches for pods in a Pending state that cannot be scheduled because existing nodes lack the CPU, memory, or other resources they require. When such pods are detected, the autoscaler evaluates the configured node groups (or managed instance groups in cloud providers) and determines which group can best accommodate the pending workloads. The scale-up decision considers factors like node readiness time, cost, and resource fit. On the flip side, the autoscaler also monitors nodes for underutilization. If a node has been running below a configurable utilization threshold for a sustained period and all its pods can be rescheduled elsewhere, the autoscaler will cordon, drain, and terminate that node to reduce cost.',
            code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler
  namespace: kube-system
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cluster-autoscaler
  template:
    metadata:
      labels:
        app: cluster-autoscaler
    spec:
      serviceAccountName: cluster-autoscaler
      containers:
        - name: cluster-autoscaler
          image: registry.k8s.io/autoscaling/cluster-autoscaler:v1.28.0
          command:
            - ./cluster-autoscaler
            - --v=4
            - --cloud-provider=aws
            - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/my-cluster
            - --balance-similar-node-groups
            - --skip-nodes-with-system-pods=false
            - --expander=least-waste`,
            tip: 'Use the --balance-similar-node-groups flag to keep node counts even across availability zones for high availability.'
          },
          {
            heading: 'Expander Strategies',
            content: 'The expander strategy determines how the Cluster Autoscaler picks a node group when multiple groups could satisfy the pending pod requirements. The random expander selects a node group at random, which provides simple load distribution. The most-pods expander picks the group that can schedule the greatest number of pending pods, optimizing for throughput. The least-waste expander selects the group that will have the least idle CPU and memory after the scale-up event, making it the best option for cost optimization. The priority expander uses a user-defined ConfigMap to assign priorities to different node groups, allowing operators to prefer cheaper instance types or specific availability zones. You can even combine strategies by using the grpc expander, which delegates the decision to an external gRPC server implementing custom logic. Choosing the right expander can significantly reduce cloud spend while maintaining cluster performance targets.',
            code: `apiVersion: v1
kind: ConfigMap
metadata:
  name: cluster-autoscaler-priority-expander
  namespace: kube-system
data:
  priorities: |-
    50:
      - .*spot-pool.*
    30:
      - .*on-demand-pool.*
    10:
      - .*gpu-pool.*`,
            note: 'The priority expander ConfigMap uses regex patterns to match node group names. Higher numbers mean higher priority.'
          },
          {
            heading: 'Scale-Down Behavior and Safe Eviction',
            content: 'Scale-down is where the Cluster Autoscaler removes underutilized nodes to save cost. A node is considered for removal when its total CPU and memory requests are below the configurable threshold (default 50%) for a sustained period defined by --scale-down-unneeded-time (default 10 minutes). Before removing a node, the autoscaler verifies that all pods on it can be rescheduled to other nodes. Pods controlled by a ReplicaSet, StatefulSet, or Job are generally movable, but standalone pods without a controller are not and will block scale-down by default. You can annotate pods with cluster-autoscaler.kubernetes.io/safe-to-evict: true to allow eviction of uncontrolled pods. Pods with local storage also block removal unless annotated. PodDisruptionBudgets are respected, ensuring that critical services maintain their minimum replica counts during node drain operations.',
            code: `# Check cluster autoscaler status
kubectl -n kube-system get configmap cluster-autoscaler-status -o yaml

# View autoscaler logs
kubectl -n kube-system logs -l app=cluster-autoscaler --tail=100

# Annotate a pod to allow safe eviction
kubectl annotate pod my-pod cluster-autoscaler.kubernetes.io/safe-to-evict="true"

# Prevent a node from being scaled down
kubectl annotate node my-node cluster-autoscaler.kubernetes.io/scale-down-disabled="true"`,
            warning: 'Standalone pods without controllers will block node scale-down. Always use Deployments or ReplicaSets for production workloads.'
          }
        ],
        quiz: [
          {
            question: 'What triggers the Cluster Autoscaler to add nodes?',
            options: ['High CPU usage on existing nodes', 'Pending pods that cannot be scheduled', 'A cron schedule', 'Manual approval'],
            correctIndex: 1,
            explanation: 'The Cluster Autoscaler watches for pods stuck in Pending state due to insufficient resources and adds nodes to accommodate them.'
          },
          {
            question: 'Which expander strategy minimizes wasted resources after scale-up?',
            options: ['random', 'most-pods', 'least-waste', 'priority'],
            correctIndex: 2,
            explanation: 'The least-waste expander selects the node group that leaves the least idle CPU and memory after scheduling pending pods.'
          },
          {
            question: 'What blocks a node from being removed during scale-down?',
            options: ['Pods managed by a ReplicaSet', 'Pods with PodDisruptionBudgets set to zero', 'Standalone pods without a controller', 'Pods using ConfigMaps'],
            correctIndex: 2,
            explanation: 'Standalone pods without a controller cannot be rescheduled automatically and block scale-down unless annotated with safe-to-evict.'
          }
        ]
      },
      {
        id: 'k8s-keda',
        title: 'KEDA Event-Driven Autoscaling',
        difficulty: 'advanced',
        tags: ['keda', 'autoscaling', 'events', 'serverless', 'scaling'],
        sections: [
          {
            heading: 'Introduction to KEDA',
            content: 'KEDA (Kubernetes Event-Driven Autoscaling) extends Kubernetes with event-driven autoscaling capabilities that go far beyond what the built-in Horizontal Pod Autoscaler can offer. While HPA primarily scales based on CPU and memory metrics, KEDA can scale workloads based on the length of a message queue, the number of unprocessed events in a stream, database query results, cron schedules, or any custom metric exposed through over 60 built-in scalers. KEDA acts as a Kubernetes operator that creates and manages HPA objects on your behalf. It introduces two custom resources: ScaledObject for Deployments and StatefulSets, and ScaledJob for batch workloads using Jobs. One of KEDA\'s most powerful features is the ability to scale to zero replicas when no events are pending, and then rapidly scale back up when events arrive, providing true serverless-like behavior on Kubernetes.',
            code: `# Install KEDA using Helm
helm repo add kedacore https://kedacore.github.io/charts
helm repo update
helm install keda kedacore/keda --namespace keda --create-namespace

# Verify installation
kubectl get pods -n keda
kubectl get crd | grep keda`,
            analogy: 'Think of KEDA like a smart thermostat. Instead of just reacting to temperature (CPU), it can react to any signal: motion sensors (queue depth), time of day (cron), weather forecast (external metrics), and adjust the heating (replicas) accordingly.'
          },
          {
            heading: 'ScaledObject and Triggers',
            content: 'A ScaledObject defines the autoscaling rules for a Deployment or StatefulSet. It specifies the target resource, the minimum and maximum replica counts, polling intervals, and one or more triggers that KEDA monitors. Each trigger references a scaler type and provides the configuration needed to connect to the event source. Common triggers include azure-queue, aws-sqs-queue, kafka, rabbitmq, prometheus, cron, and redis. When multiple triggers are configured, KEDA evaluates all of them and uses the one requesting the highest replica count. The pollingInterval determines how frequently KEDA checks the event source, typically every 30 seconds. The cooldownPeriod controls how long KEDA waits after the last trigger activation before scaling back to the minimum replica count, preventing flapping. KEDA also supports TriggerAuthentication resources to securely manage credentials for accessing external event sources.',
            code: `apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: order-processor
  namespace: default
spec:
  scaleTargetRef:
    name: order-processor
  pollingInterval: 15
  cooldownPeriod: 300
  minReplicaCount: 0
  maxReplicaCount: 50
  triggers:
    - type: rabbitmq
      metadata:
        host: amqp://guest:guest@rabbitmq.default:5672/
        queueName: orders
        queueLength: "5"
    - type: cron
      metadata:
        timezone: America/New_York
        start: 0 8 * * 1-5
        end: 0 20 * * 1-5
        desiredReplicas: "3"`,
            tip: 'Combine queue-based triggers with cron triggers to maintain a baseline of replicas during business hours while still scaling to zero overnight.'
          },
          {
            heading: 'Scaling to Zero and ScaledJobs',
            content: 'Scaling to zero is one of KEDA\'s signature capabilities. When minReplicaCount is set to 0 and no events are pending, KEDA scales the workload down to zero replicas, saving resources entirely. When an event arrives, KEDA rapidly activates the workload by scaling it to one or more replicas. The activation latency depends on pod startup time and image pull time, so using pre-pulled images and small containers helps minimize cold-start delays. For batch processing, KEDA offers ScaledJob, which creates Kubernetes Jobs instead of scaling a Deployment. Each trigger activation creates a new Job, making it ideal for tasks that need to run to completion like video transcoding, report generation, or ETL pipelines. ScaledJobs support configuring the maximum number of concurrent jobs, successful and failed job history limits, and rollout strategies. The combination of ScaledObjects and ScaledJobs gives you a comprehensive event-driven platform on top of standard Kubernetes.',
            code: `apiVersion: keda.sh/v1alpha1
kind: ScaledJob
metadata:
  name: video-transcoder
spec:
  jobTargetRef:
    template:
      spec:
        containers:
          - name: transcoder
            image: myrepo/transcoder:v2
            env:
              - name: QUEUE_URL
                value: "https://sqs.us-east-1.amazonaws.com/123456789/videos"
        restartPolicy: Never
  pollingInterval: 10
  maxReplicaCount: 20
  successfulJobsHistoryLimit: 5
  failedJobsHistoryLimit: 3
  triggers:
    - type: aws-sqs-queue
      metadata:
        queueURL: https://sqs.us-east-1.amazonaws.com/123456789/videos
        queueLength: "1"
        awsRegion: us-east-1`,
            warning: 'Scaling to zero introduces cold-start latency. For latency-sensitive services, set minReplicaCount to at least 1.'
          }
        ],
        quiz: [
          {
            question: 'What is the primary advantage of KEDA over the built-in HPA?',
            options: ['It is faster at scaling', 'It supports event-driven triggers from external sources', 'It uses less memory', 'It works without RBAC'],
            correctIndex: 1,
            explanation: 'KEDA supports over 60 scalers that react to external event sources like message queues, databases, and custom metrics.'
          },
          {
            question: 'What does the cooldownPeriod in a ScaledObject control?',
            options: ['How long before a pod restarts', 'Time to wait after last trigger before scaling to minimum', 'Maximum pod lifetime', 'Interval between health checks'],
            correctIndex: 1,
            explanation: 'The cooldownPeriod defines how long KEDA waits after the last trigger activation before scaling to minReplicaCount, preventing rapid flapping.'
          },
          {
            question: 'What resource does KEDA use for batch processing workloads?',
            options: ['ScaledObject', 'ScaledDeployment', 'ScaledJob', 'ScaledBatch'],
            correctIndex: 2,
            explanation: 'ScaledJob creates Kubernetes Jobs for each trigger activation, ideal for run-to-completion batch tasks.'
          }
        ]
      },
      {
        id: 'k8s-scheduler-deep',
        title: 'Scheduler Deep Dive',
        difficulty: 'advanced',
        tags: ['scheduler', 'scheduling', 'filtering', 'scoring', 'preemption'],
        sections: [
          {
            heading: 'The Scheduling Pipeline',
            content: 'The Kubernetes scheduler is a control plane component that watches for newly created pods with no assigned node and selects the best node for each pod to run on. The scheduling process follows a well-defined pipeline with distinct phases: filtering, scoring, and binding. During the filtering phase, the scheduler eliminates nodes that cannot run the pod. Filters check whether a node has sufficient CPU and memory resources, whether the node matches the pod\'s nodeSelector or nodeAffinity requirements, whether taints and tolerations align, whether volume topology constraints are satisfied, and whether PodTopologySpreadConstraints can be met. Nodes that pass all filter plugins become candidates for the scoring phase. The scheduler also supports scheduling framework extension points, allowing custom plugins to inject logic at various stages. Understanding this pipeline is crucial for debugging why pods end up on unexpected nodes or remain unscheduled.',
            code: `apiVersion: kubescheduler.config.k8s.io/v1
kind: KubeSchedulerConfiguration
profiles:
  - schedulerName: default-scheduler
    plugins:
      filter:
        enabled:
          - name: NodeResourcesFit
          - name: NodeAffinity
          - name: TaintToleration
          - name: PodTopologySpread
      score:
        enabled:
          - name: NodeResourcesBalancedAllocation
            weight: 1
          - name: ImageLocality
            weight: 1
          - name: InterPodAffinity
            weight: 1`,
            note: 'You can run multiple scheduler profiles in a single kube-scheduler instance, each with different plugin configurations.'
          },
          {
            heading: 'Scoring and Node Selection',
            content: 'After filtering reduces the candidate set, the scoring phase ranks the remaining nodes to find the best fit. Each scoring plugin evaluates every candidate node and assigns a score between 0 and 100. The scores from all plugins are then combined using weighted sums to produce a final score for each node. The node with the highest total score wins. Key scoring plugins include NodeResourcesBalancedAllocation, which prefers nodes where CPU and memory usage will be evenly balanced after scheduling; ImageLocality, which prefers nodes that already have the pod\'s container images cached; InterPodAffinity, which scores based on pod affinity and anti-affinity preferences; and NodeResourcesFit with its MostAllocated or LeastAllocated strategies. The MostAllocated strategy packs pods tightly onto fewer nodes (good for cost optimization), while LeastAllocated spreads pods across nodes for better resilience. You can adjust plugin weights to influence scheduling behavior without writing custom code.',
            code: `# Check why a pod is pending
kubectl describe pod my-pending-pod | grep -A 20 Events

# View scheduler logs for a specific pod
kubectl logs -n kube-system kube-scheduler-control-plane --tail=200

# Check node allocatable resources
kubectl describe node my-node | grep -A 10 "Allocated resources"

# Run scheduler in verbose mode (add to manifest)
# --v=10 shows detailed scoring information`,
            analogy: 'Scheduling is like a talent show. Filtering is the audition round where unqualified contestants are eliminated. Scoring is the judges\' panel where remaining contestants are rated. The contestant with the highest combined score wins the placement.'
          },
          {
            heading: 'Preemption and Scheduling Framework',
            content: 'When no node can accommodate a pending pod after filtering, the scheduler checks if preemption can help. Preemption allows higher-priority pods to evict lower-priority pods from a node to free up resources. The scheduler evaluates all nodes to find one where evicting low-priority pods would make room for the pending pod, preferring nodes where the fewest pods need eviction and where the evicted pods have the lowest priority. Evicted pods enter a graceful termination period before being forcibly removed. The Scheduling Framework is the extensible architecture that underpins the scheduler, offering extension points at PreFilter, Filter, PostFilter, PreScore, Score, Reserve, Permit, PreBind, Bind, and PostBind stages. You can write custom plugins in Go that hook into any of these points, package them into a custom scheduler binary, and deploy it alongside the default scheduler. Pods can then specify which scheduler to use via the schedulerName field.',
            code: `apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000000
globalDefault: false
preemptionPolicy: PreemptLowerPriority
description: "High priority for critical workloads"
---
apiVersion: v1
kind: Pod
metadata:
  name: critical-app
spec:
  priorityClassName: high-priority
  schedulerName: default-scheduler
  containers:
    - name: app
      image: myapp:v1
      resources:
        requests:
          cpu: "2"
          memory: 4Gi`,
            warning: 'Preemption can cause service disruptions. Use PodDisruptionBudgets and priority classes carefully to avoid cascading evictions.'
          }
        ],
        diagram: {
          kind: 'mermaid' as const,
          code: `flowchart TD
    A[New Pod Created] --> B[Scheduling Queue]
    B --> C{Filter Phase}
    C -->|NodeResourcesFit| D{Node has resources?}
    C -->|NodeAffinity| E{Affinity matches?}
    C -->|TaintToleration| F{Tolerations match?}
    D -->|No| G[Node Excluded]
    E -->|No| G
    F -->|No| G
    D -->|Yes| H[Candidate Node]
    E -->|Yes| H
    F -->|Yes| H
    H --> I{Score Phase}
    I -->|BalancedAllocation| J[Score 0-100]
    I -->|ImageLocality| K[Score 0-100]
    I -->|InterPodAffinity| L[Score 0-100]
    J --> M[Weighted Sum]
    K --> M
    L --> M
    M --> N[Select Highest Score]
    N --> O[Bind Pod to Node]
    G --> P{Preemption?}
    P -->|Yes| Q[Evict Low Priority Pods]
    Q --> C
    P -->|No| R[Pod Remains Pending]`,
          caption: 'The Kubernetes scheduling pipeline: filtering, scoring, binding, and preemption'
        },
        quiz: [
          {
            question: 'What happens during the filtering phase of scheduling?',
            options: ['Pods are ranked by priority', 'Nodes that cannot run the pod are eliminated', 'Container images are pulled', 'Resources are reserved'],
            correctIndex: 1,
            explanation: 'The filtering phase removes nodes that do not meet the pod requirements such as insufficient resources, taint mismatches, or affinity violations.'
          },
          {
            question: 'Which scoring strategy packs pods tightly onto fewer nodes?',
            options: ['LeastAllocated', 'MostAllocated', 'BalancedAllocation', 'RandomAllocation'],
            correctIndex: 1,
            explanation: 'MostAllocated prefers nodes with the highest existing utilization, packing pods onto fewer nodes to optimize cost.'
          },
          {
            question: 'When does preemption occur?',
            options: ['When a node runs out of disk', 'When no node passes filtering for a higher-priority pod', 'When HPA scales down', 'During node maintenance'],
            correctIndex: 1,
            explanation: 'Preemption happens when a higher-priority pod cannot be scheduled and the scheduler evicts lower-priority pods to make room.'
          }
        ]
      },
      {
        id: 'k8s-descheduler',
        title: 'Descheduler',
        difficulty: 'intermediate',
        tags: ['descheduler', 'eviction', 'rebalancing', 'optimization'],
        sections: [
          {
            heading: 'Why You Need a Descheduler',
            content: 'The Kubernetes scheduler makes placement decisions only at pod creation time. Once a pod is running on a node, the scheduler does not revisit that decision even if conditions change dramatically. Over time, clusters develop resource imbalances: some nodes become overloaded while others sit nearly idle. New nodes added to the cluster remain underutilized because existing pods are not redistributed. Taint or label changes may mean pods violate affinity rules they originally satisfied. The Descheduler addresses these problems by periodically evaluating running pods and evicting those that violate current constraints or contribute to imbalance. Evicted pods are then rescheduled by the regular scheduler, which now has the updated cluster state. The Descheduler runs as a Job or CronJob in the cluster and uses a policy configuration to define which eviction strategies to apply. It respects PodDisruptionBudgets and never evicts critical system pods.',
            code: `# Install descheduler using Helm
helm repo add descheduler https://kubernetes-sigs.github.io/descheduler/
helm install descheduler descheduler/descheduler \
  --namespace kube-system \
  --set schedule="*/5 * * * *"

# Check descheduler logs
kubectl logs -n kube-system -l app=descheduler --tail=100`,
            analogy: 'If the scheduler is like a hotel receptionist assigning rooms at check-in, the descheduler is like a hotel manager who periodically rebalances guest assignments when some floors are overcrowded and others are empty.'
          },
          {
            heading: 'Eviction Strategies',
            content: 'The Descheduler offers several strategies for identifying pods to evict. RemoveDuplicates ensures that no two pods from the same ReplicaSet, Deployment, or StatefulSet run on the same node, improving high availability. LowNodeUtilization identifies nodes that are underutilized (below configurable CPU and memory thresholds) and evicts pods from overutilized nodes so they can be rescheduled onto the underutilized ones. RemovePodsViolatingNodeAffinity evicts pods whose node affinity rules no longer match the node they are running on, which can happen when node labels change. RemovePodsViolatingInterPodAntiAffinity handles pods whose anti-affinity rules are violated due to new pod placements. RemovePodsViolatingTopologySpreadConstraint evicts pods that violate topology spread constraints. RemovePodsHavingTooManyRestarts targets pods that have restarted excessively. Each strategy can be independently enabled and configured.',
            code: `apiVersion: "descheduler/v1alpha2"
kind: "DeschedulerPolicy"
profiles:
  - name: default
    pluginConfig:
      - name: LowNodeUtilization
        args:
          thresholds:
            cpu: 20
            memory: 20
            pods: 20
          targetThresholds:
            cpu: 50
            memory: 50
            pods: 50
      - name: RemoveDuplicates
      - name: RemovePodsViolatingNodeAffinity
        args:
          nodeAffinityType:
            - requiredDuringSchedulingIgnoredDuringExecution
    plugins:
      balance:
        enabled:
          - LowNodeUtilization
          - RemoveDuplicates
      deschedule:
        enabled:
          - RemovePodsViolatingNodeAffinity`,
            tip: 'Start with dry-run mode by setting --dry-run=true to see which pods would be evicted before enabling actual eviction.'
          },
          {
            heading: 'Configuring and Running the Descheduler',
            content: 'The Descheduler can run as a one-shot Job, a recurring CronJob, or a Deployment with a configurable interval. Running as a CronJob is most common, with intervals typically between 2 and 10 minutes depending on how dynamic your cluster is. You can control scope by using namespace inclusion and exclusion lists, priority class filters, and label selectors. Pods in the kube-system namespace are excluded by default to protect system components. The Descheduler also supports node selection to limit which nodes it evaluates. When evicting pods, it honors PodDisruptionBudgets to avoid taking too many replicas offline simultaneously. You can set maxNoOfPodsToEvictPerNode and maxNoOfPodsToEvictPerNamespace to further limit blast radius. It is important to note that the Descheduler only evicts pods; it does not handle rescheduling. The standard scheduler takes over once pods are evicted and places them according to current cluster state.',
            code: `apiVersion: batch/v1
kind: CronJob
metadata:
  name: descheduler
  namespace: kube-system
spec:
  schedule: "*/5 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          serviceAccountName: descheduler
          containers:
            - name: descheduler
              image: registry.k8s.io/descheduler/descheduler:v0.28.0
              args:
                - --policy-config-file=/policy/policy.yaml
                - --v=3
              volumeMounts:
                - name: policy
                  mountPath: /policy
          volumes:
            - name: policy
              configMap:
                name: descheduler-policy
          restartPolicy: Never`,
            warning: 'The Descheduler evicts pods, which causes brief downtime for the evicted instances. Always configure PodDisruptionBudgets for critical services.'
          }
        ],
        challenge: {
          prompt: 'Create a DeschedulerPolicy that uses LowNodeUtilization with thresholds of 30% for CPU and memory, and target thresholds of 60%. Also enable RemoveDuplicates.',
          starterCode: `apiVersion: "descheduler/v1alpha2"
kind: "DeschedulerPolicy"
profiles:
  - name: rebalance
    pluginConfig:
      # Add LowNodeUtilization config here
      # Add RemoveDuplicates config here
    plugins:
      balance:
        enabled:
          # Enable plugins here`,
          solutionCode: `apiVersion: "descheduler/v1alpha2"
kind: "DeschedulerPolicy"
profiles:
  - name: rebalance
    pluginConfig:
      - name: LowNodeUtilization
        args:
          thresholds:
            cpu: 30
            memory: 30
          targetThresholds:
            cpu: 60
            memory: 60
      - name: RemoveDuplicates
    plugins:
      balance:
        enabled:
          - LowNodeUtilization
          - RemoveDuplicates`,
          hints: [
            'LowNodeUtilization goes under pluginConfig with thresholds and targetThresholds',
            'RemoveDuplicates needs no additional args',
            'Both plugins must be listed under plugins.balance.enabled'
          ]
        }
      },
      {
        id: 'k8s-pod-priority',
        title: 'Pod Priority Classes',
        difficulty: 'intermediate',
        tags: ['priority', 'preemption', 'scheduling', 'qos'],
        sections: [
          {
            heading: 'Understanding Pod Priority',
            content: 'Pod Priority in Kubernetes determines the relative importance of pods. When cluster resources are scarce, higher-priority pods can preempt (evict) lower-priority pods to claim the resources they need. Priority is assigned through PriorityClass objects, which define a numeric value (higher means more important) and an optional preemption policy. Kubernetes ships with two built-in priority classes: system-cluster-critical (value 2000001000) for essential cluster components like kube-dns and kube-proxy, and system-node-critical (value 2000000000) for critical node-level agents like kube-proxy. User-defined priority classes should use values below 1000000000 to avoid interfering with system components. When you assign a PriorityClass to a pod, the scheduler uses the priority value for ordering in the scheduling queue (higher-priority pods are scheduled first) and for preemption decisions when resources are constrained.',
            code: `apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: production-critical
value: 900000
globalDefault: false
preemptionPolicy: PreemptLowerPriority
description: "For production-critical workloads"
---
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: batch-low
value: 100
globalDefault: false
preemptionPolicy: Never
description: "For low-priority batch jobs that should not preempt others"`,
            note: 'Setting preemptionPolicy to Never means the pod gets scheduling priority in the queue but will not evict other pods to claim resources.'
          },
          {
            heading: 'Preemption Mechanics',
            content: 'When the scheduler cannot find a node for a high-priority pod, it enters the preemption cycle. The scheduler examines each node and simulates removing lower-priority pods to see if the pending pod would then fit. It selects the node where the fewest pods need eviction and where evicted pods have the lowest combined priority. Once a victim node is selected, the scheduler sets a nominatedNodeName on the pending pod and sends eviction signals to the victim pods. Victim pods enter their graceful termination period (defined by terminationGracePeriodSeconds), and once terminated, the scheduler binds the pending pod to the node. It is critical to understand that preemption is not instantaneous. The pending pod may wait for victim pods to gracefully terminate, which can take up to 30 seconds by default. During this window, other scheduling events may occur that change the picture, so the scheduler re-evaluates before final binding.',
            code: `# List all priority classes
kubectl get priorityclasses

# Check which priority class a pod uses
kubectl get pod my-pod -o jsonpath='{.spec.priorityClassName}'

# View the numeric priority of a pod
kubectl get pod my-pod -o jsonpath='{.spec.priority}'

# Check for preemption events
kubectl get events --field-selector reason=Preempted`,
            tip: 'Create at least three priority tiers: critical (production services), normal (standard workloads), and low (batch jobs, dev environments).'
          },
          {
            heading: 'Best Practices for Priority Classes',
            content: 'Designing a priority scheme requires careful planning. Start by identifying your workload categories and assigning them relative priorities. Production-facing services should have the highest user-defined priority, followed by internal services, then development and testing workloads, with batch jobs at the lowest priority. Avoid setting a globalDefault priority class to a high value, as it would give all unclassified pods elevated priority. Instead, set the globalDefault to a moderate value and explicitly assign higher priorities where needed. Be cautious with the number of distinct priority classes: too many makes the system hard to reason about, while too few limits flexibility. A common pattern is 4 to 6 tiers. Always pair priority classes with resource quotas at the namespace level to prevent a single team from consuming all cluster resources with high-priority pods. Monitor preemption events regularly to detect priority inversions or unexpected eviction patterns that could indicate misconfiguration.',
            code: `# Recommended priority tier structure
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: tier-1-critical
value: 900000
description: "Production-critical services"
---
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: tier-2-standard
value: 500000
globalDefault: true
description: "Standard workloads (default)"
---
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: tier-3-batch
value: 100000
preemptionPolicy: Never
description: "Batch and dev workloads"`,
            warning: 'Never set globalDefault on a high-priority class. This gives all unclassified pods the ability to preempt important workloads.'
          }
        ],
        quiz: [
          {
            question: 'What does preemptionPolicy: Never on a PriorityClass do?',
            options: ['Prevents the pod from being evicted', 'Gives the pod queue priority but no preemption rights', 'Disables scheduling for the pod', 'Makes the pod use best-effort QoS'],
            correctIndex: 1,
            explanation: 'PreemptionPolicy: Never means the pod is prioritized in the scheduling queue but will not evict lower-priority pods to obtain resources.'
          },
          {
            question: 'What is the value range for user-defined PriorityClasses?',
            options: ['0 to 100', '0 to 999999999', '1000000000 to 2000000000', 'Any integer'],
            correctIndex: 1,
            explanation: 'User-defined priority classes should use values below 1000000000 to avoid conflicting with system-level priority classes.'
          },
          {
            question: 'What happens to evicted pods during preemption?',
            options: ['They are immediately deleted', 'They enter graceful termination', 'They are moved to another node', 'They are paused'],
            correctIndex: 1,
            explanation: 'Evicted pods receive a termination signal and enter their graceful termination period before being forcibly removed.'
          }
        ]
      },
      {
        id: 'k8s-spot-instances',
        title: 'Spot/Preemptible Nodes',
        difficulty: 'intermediate',
        tags: ['spot', 'preemptible', 'cost', 'node-pools', 'tolerations'],
        sections: [
          {
            heading: 'Using Spot Instances in Kubernetes',
            content: 'Spot instances (AWS), preemptible VMs (GCP), and spot VMs (Azure) offer compute capacity at up to 90% discount compared to on-demand pricing, but the cloud provider can reclaim them with little notice (typically 2 minutes). Using these instances as Kubernetes nodes can dramatically reduce cluster costs, especially for fault-tolerant and stateless workloads. The key challenge is handling the interruption gracefully so that workloads are disrupted minimally. Cloud providers offer managed node groups or node pools that support spot instances natively. When creating a spot node pool, you typically specify multiple instance types to diversify across different capacity pools, reducing the likelihood that all your spot nodes are reclaimed simultaneously. Taints are applied to spot nodes so that only workloads explicitly tolerating interruptions are scheduled there, protecting critical services from involuntary disruption.',
            code: `# AWS EKS - Create a spot node group
eksctl create nodegroup \
  --cluster my-cluster \
  --name spot-workers \
  --node-type m5.large,m5a.large,m5d.large,m4.large \
  --nodes 3 --nodes-min 1 --nodes-max 10 \
  --managed --spot

# GKE - Create a preemptible node pool
gcloud container node-pools create spot-pool \
  --cluster=my-cluster \
  --machine-type=e2-standard-4 \
  --spot \
  --num-nodes=3 \
  --enable-autoscaling --min-nodes=1 --max-nodes=10`,
            tip: 'Specify at least 3-5 different instance types for spot node pools to increase availability across multiple capacity pools.'
          },
          {
            heading: 'Taints, Tolerations, and PodDisruptionBudgets',
            content: 'To ensure only appropriate workloads run on spot nodes, apply taints such as kubernetes.azure.com/scalesetpriority=spot:NoSchedule or a custom taint like cloud.google.com/gke-preemptible=true:NoSchedule. Workloads targeting spot nodes must include matching tolerations in their pod specs. Combine tolerations with node affinity rules to control exactly which workloads land on spot versus on-demand nodes. PodDisruptionBudgets (PDBs) are essential for spot workloads. They define the minimum number of replicas that must remain available during voluntary disruptions, including spot interruptions handled through the node termination handler. Set PDB minAvailable to ensure your application maintains enough healthy pods even when nodes are reclaimed. For stateless web services, a PDB allowing one pod to be unavailable at a time works well. For data-processing workloads, you may need higher availability guarantees or should design for checkpoint and resume patterns.',
            code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: batch-processor
spec:
  replicas: 6
  selector:
    matchLabels:
      app: batch-processor
  template:
    metadata:
      labels:
        app: batch-processor
    spec:
      tolerations:
        - key: "kubernetes.io/spot"
          operator: "Equal"
          value: "true"
          effect: "NoSchedule"
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
              - matchExpressions:
                  - key: node-type
                    operator: In
                    values: ["spot"]
      containers:
        - name: processor
          image: myrepo/processor:v3
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: batch-processor-pdb
spec:
  minAvailable: 4
  selector:
    matchLabels:
      app: batch-processor`,
            warning: 'Never run stateful workloads with persistent storage on spot nodes unless you have a robust data replication strategy.'
          },
          {
            heading: 'Node Termination Handlers and Cost Optimization',
            content: 'Node termination handlers are daemon sets that watch for spot interruption notices from the cloud provider metadata service and take proactive action before the node is reclaimed. The AWS Node Termination Handler, for example, detects the 2-minute interruption warning, cordons the node to prevent new pod scheduling, and drains the node so pods are gracefully evicted and rescheduled on healthy nodes. GKE and AKS have similar built-in mechanisms. Without a termination handler, pods on reclaimed nodes would be abruptly killed without graceful shutdown, potentially causing data loss or user-facing errors. For cost optimization, adopt a mixed strategy: run critical, latency-sensitive services on on-demand nodes and place fault-tolerant, stateless workloads on spot nodes. Use the Cluster Autoscaler with multiple node groups prioritized by cost (spot first, on-demand as fallback). Track savings by comparing spot versus on-demand costs in your cloud billing dashboard and adjust the spot-to-on-demand ratio based on your availability requirements.',
            code: `# Install AWS Node Termination Handler
helm repo add eks https://aws.github.io/eks-charts
helm install aws-node-termination-handler eks/aws-node-termination-handler \
  --namespace kube-system \
  --set enableSpotInterruptionDraining=true \
  --set enableScheduledEventDraining=true

# Check termination handler logs
kubectl logs -n kube-system -l app.kubernetes.io/name=aws-node-termination-handler

# View spot instance pricing (AWS CLI)
aws ec2 describe-spot-price-history \
  --instance-types m5.large m5a.large \
  --product-descriptions "Linux/UNIX" \
  --start-time $(date -u +%Y-%m-%dT%H:%M:%S)`,
            note: 'The node termination handler provides only a best-effort drain. Design your applications with graceful shutdown handling and health checks for maximum resilience.'
          }
        ]
      },
      {
        id: 'k8s-multi-cluster',
        title: 'Multi-Cluster Management',
        difficulty: 'advanced',
        tags: ['multi-cluster', 'federation', 'submariner', 'liqo', 'hybrid'],
        sections: [
          {
            heading: 'Why Multi-Cluster Architecture',
            content: 'As organizations scale their Kubernetes adoption, single-cluster deployments often reach practical limits in terms of blast radius, geographic distribution, regulatory compliance, and team autonomy. Multi-cluster architectures address these challenges by distributing workloads across multiple independent Kubernetes clusters. Common patterns include having separate clusters per environment (dev, staging, production), per region (US, EU, APAC), per team or business unit, or per compliance boundary. The primary benefits include fault isolation (a failure in one cluster does not affect others), geographic proximity (reducing latency for global users), regulatory compliance (keeping data within specific regions), and team autonomy (each team manages their own cluster). However, multi-cluster introduces complexity in service discovery, network connectivity, configuration synchronization, and observability. Several tools and frameworks have emerged to address these challenges, each with different tradeoffs.',
            code: `# Managing multiple clusters with kubectl contexts
kubectl config get-contexts
kubectl config use-context cluster-us-east
kubectl config use-context cluster-eu-west

# Using kubectx for fast context switching
kubectx cluster-us-east
kubectx cluster-eu-west

# Apply resources to multiple clusters
for ctx in cluster-us-east cluster-eu-west cluster-ap-south; do
  kubectl --context=$ctx apply -f deployment.yaml
done`,
            analogy: 'A multi-cluster setup is like a franchise restaurant chain. Each location (cluster) operates independently with its own staff and kitchen, but they share the same menu (configurations), brand standards (policies), and supply chain (CI/CD pipeline).'
          },
          {
            heading: 'Federation and Submariner',
            content: 'Kubernetes Federation (KubeFed) provides a control plane for coordinating configuration across multiple clusters. It introduces federated resource types that wrap standard Kubernetes objects with placement policies and overrides. A federated Deployment, for example, specifies which clusters should run the workload and how many replicas each cluster gets. KubeFed handles propagating the resources to member clusters and reconciling differences. However, KubeFed has seen limited adoption due to complexity and is being succeeded by newer approaches. Submariner focuses specifically on multi-cluster networking, providing encrypted tunnels between cluster networks so that pods and services in different clusters can communicate directly using their ClusterIP addresses. Submariner consists of a broker for cluster discovery, gateway nodes for tunnel establishment, and a service discovery component that exports and imports services across clusters. It supports both IPSec and WireGuard for encrypted transport and works with most CNI plugins.',
            code: `# Install Submariner using subctl
curl -Ls https://get.submariner.io | VERSION=0.17.0 bash
subctl deploy-broker --kubeconfig broker-cluster.kubeconfig

# Join clusters to the broker
subctl join --kubeconfig cluster-a.kubeconfig broker-info.subm \
  --clusterid cluster-a --natt=false
subctl join --kubeconfig cluster-b.kubeconfig broker-info.subm \
  --clusterid cluster-b --natt=false

# Export a service for cross-cluster access
subctl export service --namespace default my-service

# Verify connectivity
subctl verify --kubeconfig cluster-a.kubeconfig \
  --toconfig cluster-b.kubeconfig --verbose`,
            note: 'Submariner requires non-overlapping Pod and Service CIDRs across clusters. Plan your network addressing carefully before deployment.'
          },
          {
            heading: 'Liqo and Modern Approaches',
            content: 'Liqo takes a novel approach to multi-cluster by enabling transparent resource sharing between clusters. When two clusters are peered via Liqo, each cluster gains a virtual node representing the remote cluster. Pods scheduled on this virtual node actually run in the remote cluster, but they appear as local pods to the originating cluster. This creates a seamless multi-cluster experience where standard Kubernetes primitives like Deployments and Services work across clusters without modification. Liqo handles network connectivity, ensuring pods can communicate across clusters, and supports resource reflection to keep status synchronized. Other modern approaches include Cilium Cluster Mesh, which extends Cilium\'s eBPF networking across clusters with shared service discovery and network policy enforcement; Istio multi-cluster, which unifies service mesh capabilities across clusters; and GitOps tools like Flux and ArgoCD, which can synchronize configurations to multiple clusters from a single Git repository.',
            code: `# Install Liqo
curl --fail -LS "https://get.liqo.io" | bash

# Enable peering between clusters
liqoctl peer --remoteconfig remote-kubeconfig.yaml

# Check virtual nodes
kubectl get nodes
# Output includes virtual-node-remote-cluster

# Deploy across clusters using node affinity
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: distributed-app
spec:
  replicas: 6
  selector:
    matchLabels:
      app: distributed-app
  template:
    metadata:
      labels:
        app: distributed-app
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
              - matchExpressions:
                  - key: liqo.io/type
                    operator: In
                    values: ["virtual-node"]
      containers:
        - name: app
          image: nginx:latest
EOF`,
            tip: 'Start with GitOps-based multi-cluster management for configuration synchronization before adopting complex networking solutions like Submariner or Liqo.'
          }
        ],
        challenge: {
          prompt: 'Write a bash script that deploys a Deployment named "global-api" to three different kubectl contexts (us-east, eu-west, ap-south), each with a different replica count (5, 3, 2 respectively).',
          starterCode: `#!/bin/bash
# Deploy global-api to multiple clusters with varying replicas
CLUSTERS=("us-east" "eu-west" "ap-south")
REPLICAS=(5 3 2)

# Loop through clusters and deploy`,
          solutionCode: `#!/bin/bash
CLUSTERS=("us-east" "eu-west" "ap-south")
REPLICAS=(5 3 2)

for i in "\${!CLUSTERS[@]}"; do
  CTX="\${CLUSTERS[$i]}"
  REP="\${REPLICAS[$i]}"
  echo "Deploying to $CTX with $REP replicas..."
  kubectl --context="$CTX" apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: global-api
  namespace: default
spec:
  replicas: $REP
  selector:
    matchLabels:
      app: global-api
  template:
    metadata:
      labels:
        app: global-api
    spec:
      containers:
        - name: api
          image: myrepo/global-api:latest
          ports:
            - containerPort: 8080
EOF
done`,
          hints: [
            'Use ${!CLUSTERS[@]} to iterate by index so you can pair each cluster with its replica count',
            'kubectl --context allows targeting a specific cluster',
            'Use a heredoc with kubectl apply -f - to pass YAML inline'
          ]
        }
      },
      {
        id: 'k8s-capacity-planning',
        title: 'Capacity Planning',
        difficulty: 'advanced',
        tags: ['capacity', 'profiling', 'right-sizing', 'bin-packing', 'cost'],
        sections: [
          {
            heading: 'Resource Profiling and Right-Sizing',
            content: 'Capacity planning starts with understanding how much resources your workloads actually consume versus what they request. Resource profiling involves collecting historical metrics on CPU and memory usage for each workload over a representative time period (at least 1-2 weeks to capture peak and off-peak patterns). Tools like Kubernetes Metrics Server, Prometheus with kube-state-metrics, and the Vertical Pod Autoscaler (VPA) in recommendation mode can provide these insights. VPA analyzes actual usage patterns and recommends optimal resource requests and limits. Right-sizing means adjusting resource requests and limits to match actual usage plus a safety margin. Over-provisioned workloads (requesting far more than they use) waste cluster capacity and increase costs. Under-provisioned workloads risk OOM kills and CPU throttling. A common approach is to set requests at the P95 usage level and limits at P99 or higher, providing headroom for spikes while avoiding excessive waste.',
            code: `apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: my-app-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  updatePolicy:
    updateMode: "Off"  # Recommendation-only mode
  resourcePolicy:
    containerPolicies:
      - containerName: "*"
        minAllowed:
          cpu: 50m
          memory: 64Mi
        maxAllowed:
          cpu: 2
          memory: 4Gi`,
            tip: 'Run VPA in "Off" mode first to collect recommendations without modifying pods. Review the recommendations before enabling "Auto" mode.'
          },
          {
            heading: 'Bin Packing and Node Optimization',
            content: 'Bin packing is the practice of fitting workloads efficiently onto nodes to minimize wasted resources and reduce the total number of nodes needed. Effective bin packing requires choosing node instance types that match your workload profiles. If most of your pods request 500m CPU and 512Mi memory, using nodes with 4 CPUs and 8Gi memory gives you roughly 8 pods per node with minimal waste. But if workloads vary widely, a mix of node types may be more efficient. The scheduler\'s MostAllocated scoring strategy promotes bin packing by preferring nodes that already have high utilization. You can also use PodTopologySpreadConstraints to balance pods while still packing them efficiently. Consider the system overhead when planning: kubelet, kube-proxy, container runtime, and OS processes typically consume 10-15% of node resources. Cloud providers also reserve additional resources based on node size. A node with 4Gi memory may only offer 3.2Gi allocatable after system reservations.',
            code: `# Check node allocatable vs capacity
kubectl get nodes -o custom-columns=\
NAME:.metadata.name,\
CPU_CAP:.status.capacity.cpu,\
CPU_ALLOC:.status.allocatable.cpu,\
MEM_CAP:.status.capacity.memory,\
MEM_ALLOC:.status.allocatable.memory

# Check resource usage vs requests across all pods
kubectl top pods --all-namespaces --sort-by=cpu

# View resource requests and limits for a namespace
kubectl describe resourcequota -n production

# Calculate cluster-wide utilization
kubectl top nodes`,
            analogy: 'Bin packing is like packing a suitcase. If you just throw items in randomly, you waste space. But if you organize by size and shape, filling gaps with smaller items, you can fit much more into the same suitcase.'
          },
          {
            heading: 'Cost Analysis and Planning Strategies',
            content: 'Effective capacity planning combines resource profiling, cost analysis, and growth forecasting. Start by establishing a baseline: total cluster capacity, current utilization, and monthly cost. Track utilization trends over weeks and months to project when you will need more capacity. Cloud cost tools like Kubecost, OpenCost, and provider-native tools (AWS Cost Explorer, GCP Billing) can break down Kubernetes spending by namespace, deployment, and label. Use committed use discounts (Reserved Instances on AWS, Committed Use Discounts on GCP) for your baseline capacity and spot instances for burst capacity. Implement resource quotas and limit ranges at the namespace level to prevent individual teams from consuming disproportionate resources. Run regular capacity reviews where engineering teams justify their resource allocations and optimize based on VPA recommendations. Automate right-sizing recommendations into your CI/CD pipeline, flagging deployments where resource requests deviate significantly from actual usage.',
            code: `# Resource quota for a namespace
apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-alpha-quota
  namespace: team-alpha
spec:
  hard:
    requests.cpu: "20"
    requests.memory: 40Gi
    limits.cpu: "40"
    limits.memory: 80Gi
    pods: "100"
    persistentvolumeclaims: "20"
---
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: team-alpha
spec:
  limits:
    - type: Container
      default:
        cpu: 500m
        memory: 512Mi
      defaultRequest:
        cpu: 100m
        memory: 128Mi
      max:
        cpu: 4
        memory: 8Gi`,
            note: 'LimitRange sets default resource requests and limits for pods that do not specify them, preventing unbound resource consumption.'
          }
        ],
        quiz: [
          {
            question: 'What VPA mode provides recommendations without modifying pods?',
            options: ['Auto', 'Recreate', 'Off', 'Initial'],
            correctIndex: 2,
            explanation: 'VPA in "Off" mode collects usage data and generates recommendations but does not apply changes to running pods.'
          },
          {
            question: 'What percentage of node resources is typically consumed by system overhead?',
            options: ['1-2%', '5-7%', '10-15%', '25-30%'],
            correctIndex: 2,
            explanation: 'Kubelet, kube-proxy, container runtime, and OS processes typically consume 10-15% of node resources, reducing allocatable capacity.'
          },
          {
            question: 'What does a LimitRange do?',
            options: ['Limits the number of clusters', 'Sets default and maximum resource values for containers', 'Restricts network traffic', 'Controls storage throughput'],
            correctIndex: 1,
            explanation: 'LimitRange sets default, minimum, and maximum resource requests and limits for containers within a namespace.'
          }
        ]
      }
    ]
  },
  {
    id: 'k8s-security',
    label: 'Security',
    icon: '🔒',
    entries: [
      {
        id: 'k8s-rbac',
        title: 'RBAC',
        difficulty: 'intermediate',
        tags: ['rbac', 'roles', 'bindings', 'authorization', 'access-control'],
        sections: [
          {
            heading: 'Understanding RBAC in Kubernetes',
            content: 'Role-Based Access Control (RBAC) is the primary authorization mechanism in Kubernetes. It controls who can perform what actions on which resources within the cluster. RBAC uses four key API objects: Role, ClusterRole, RoleBinding, and ClusterRoleBinding. A Role defines a set of permissions (rules) within a specific namespace, specifying which API groups, resources, and verbs are allowed. A ClusterRole is similar but applies cluster-wide and can also grant access to non-namespaced resources like nodes and persistent volumes. RoleBinding grants the permissions defined in a Role to users, groups, or service accounts within a namespace. ClusterRoleBinding grants ClusterRole permissions across the entire cluster. RBAC follows the principle of least privilege: start with no permissions and grant only what is needed. The RBAC system is purely additive; there are no deny rules. If a user has multiple role bindings, their effective permissions are the union of all granted permissions.',
            code: `apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
  namespace: production
rules:
  - apiGroups: [""]
    resources: ["pods", "pods/log"]
    verbs: ["get", "list", "watch"]
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: production
subjects:
  - kind: User
    name: jane
    apiGroup: rbac.authorization.k8s.io
  - kind: Group
    name: developers
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io`,
            note: 'RBAC is additive-only. There is no way to deny a specific permission once granted. Design your roles carefully to avoid granting overly broad access.'
          },
          {
            heading: 'ClusterRoles and Aggregation',
            content: 'ClusterRoles serve two purposes: granting access to cluster-scoped resources and providing reusable role templates that can be bound at the namespace level. When you bind a ClusterRole using a RoleBinding (not ClusterRoleBinding), the permissions are scoped to that specific namespace. This is a powerful pattern for creating standardized role templates used across many namespaces without duplicating Role definitions. ClusterRole aggregation takes this further by automatically combining multiple ClusterRoles into a single aggregated role using label selectors. The built-in admin, edit, and view ClusterRoles are aggregated roles. When you create a CRD and want its resources to be accessible through the standard roles, you add a ClusterRole with the appropriate aggregation label. For example, adding the label rbac.authorization.k8s.io/aggregate-to-edit: true makes the permissions automatically included in the edit ClusterRole.',
            code: `apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: custom-resource-editor
  labels:
    rbac.authorization.k8s.io/aggregate-to-edit: "true"
rules:
  - apiGroups: ["mycompany.io"]
    resources: ["widgets", "gadgets"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
---
# Bind a ClusterRole at namespace level
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: namespace-admin
  namespace: team-alpha
subjects:
  - kind: Group
    name: team-alpha-leads
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: admin
  apiGroup: rbac.authorization.k8s.io`,
            tip: 'Use ClusterRole with RoleBinding for namespace-scoped permissions to avoid duplicating Role definitions across namespaces.'
          },
          {
            heading: 'Auditing and Debugging RBAC',
            content: 'Debugging RBAC issues is a common task for cluster administrators. The kubectl auth can-i command is your primary tool for checking whether a user or service account has specific permissions. You can impersonate users to test their access without switching contexts. The kubectl auth whoami command (v1.28+) shows the current authenticated identity. For comprehensive auditing, enable the Kubernetes audit log to capture all API requests along with their authorization decisions. Review ClusterRoleBindings regularly because overly broad bindings (like granting cluster-admin to all users) are a common security mistake. Tools like rbac-lookup, rakkess, and kubectl-who-can help visualize RBAC permissions across the cluster. When troubleshooting 403 Forbidden errors, check the API server logs for detailed RBAC decision information including which rules were evaluated and why access was denied.',
            code: `# Check if current user can create deployments
kubectl auth can-i create deployments --namespace production

# Check permissions for a specific user
kubectl auth can-i list pods --namespace default --as jane

# Check permissions for a service account
kubectl auth can-i get secrets --namespace default \
  --as system:serviceaccount:default:my-sa

# List all roles and bindings in a namespace
kubectl get roles,rolebindings -n production

# List all cluster-level bindings
kubectl get clusterrolebindings

# Show all permissions for a user
kubectl auth can-i --list --as jane -n production`,
            warning: 'The cluster-admin ClusterRole grants unrestricted access to all resources. Never bind it to users or service accounts unless absolutely necessary.'
          }
        ],
        diagram: {
          kind: 'mermaid' as const,
          code: `flowchart LR
    U[User / Group / SA] --> RB[RoleBinding]
    U --> CRB[ClusterRoleBinding]
    RB --> R[Role]
    RB --> CR[ClusterRole]
    CRB --> CR
    R -->|Namespace Scoped| NS[Namespace Resources]
    CR -->|Via RoleBinding| NS
    CR -->|Via ClusterRoleBinding| CL[Cluster Resources]
    subgraph "Role Rules"
      R1[apiGroups]
      R2[resources]
      R3[verbs]
    end
    R --> R1
    R --> R2
    R --> R3
    CR --> R1
    CR --> R2
    CR --> R3`,
          caption: 'RBAC architecture: Users are bound to Roles or ClusterRoles through Bindings'
        },
        quiz: [
          {
            question: 'What is the difference between a Role and a ClusterRole?',
            options: ['Roles are for pods, ClusterRoles are for nodes', 'Roles are namespace-scoped, ClusterRoles are cluster-scoped', 'Roles are read-only, ClusterRoles allow writes', 'There is no difference'],
            correctIndex: 1,
            explanation: 'Roles define permissions within a specific namespace, while ClusterRoles define permissions cluster-wide and can also cover non-namespaced resources.'
          },
          {
            question: 'Can you deny a specific permission with RBAC?',
            options: ['Yes, using deny rules', 'Yes, using NotRole objects', 'No, RBAC is additive only', 'Yes, using ClusterRoleBinding with deny verb'],
            correctIndex: 2,
            explanation: 'Kubernetes RBAC is purely additive. There is no mechanism to explicitly deny permissions. You can only grant them.'
          },
          {
            question: 'What happens when you bind a ClusterRole using a RoleBinding?',
            options: ['It fails with an error', 'The permissions apply cluster-wide', 'The permissions are scoped to the RoleBinding namespace', 'The ClusterRole is converted to a Role'],
            correctIndex: 2,
            explanation: 'Binding a ClusterRole with a RoleBinding limits its permissions to the namespace of the RoleBinding, making it a reusable template.'
          }
        ]
      },
      {
        id: 'k8s-service-accounts',
        title: 'Service Accounts',
        difficulty: 'intermediate',
        tags: ['service-accounts', 'tokens', 'workload-identity', 'irsa'],
        sections: [
          {
            heading: 'Service Accounts and Token Projection',
            content: 'Service accounts provide an identity for processes running inside pods. Every namespace has a default service account, and every pod is assigned a service account (the default one if not specified). Starting with Kubernetes 1.24, service account tokens are no longer automatically created as long-lived secrets. Instead, tokens are projected into pods using the TokenRequest API, which creates short-lived, audience-bound tokens that are automatically rotated. These projected tokens are mounted at /var/run/secrets/kubernetes.io/serviceaccount/token by default. The token includes the service account name, namespace, and an expiration time (typically 1 hour, auto-refreshed by kubelet). This is a significant security improvement over the legacy long-lived tokens that never expired and could be leaked. You can disable the automount of service account tokens using automountServiceAccountToken: false when a pod does not need to interact with the Kubernetes API.',
            code: `apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-app
  namespace: production
automountServiceAccountToken: false
---
apiVersion: v1
kind: Pod
metadata:
  name: my-app-pod
  namespace: production
spec:
  serviceAccountName: my-app
  automountServiceAccountToken: true  # Override SA default
  containers:
    - name: app
      image: myapp:v1
      volumeMounts:
        - name: custom-token
          mountPath: /var/run/secrets/tokens
  volumes:
    - name: custom-token
      projected:
        sources:
          - serviceAccountToken:
              path: api-token
              expirationSeconds: 3600
              audience: my-api-server`,
            tip: 'Set automountServiceAccountToken: false on service accounts by default and explicitly enable it only for pods that need API access.'
          },
          {
            heading: 'IRSA and Workload Identity',
            content: 'IAM Roles for Service Accounts (IRSA) on AWS EKS and Workload Identity on GKE allow Kubernetes service accounts to assume cloud provider IAM roles without managing static credentials. This eliminates the need to store AWS access keys or GCP service account keys in Kubernetes secrets. With IRSA, you annotate a Kubernetes service account with the ARN of an AWS IAM role. When a pod using that service account makes AWS API calls, it receives temporary credentials from STS via a projected service account token that the OIDC provider validates. On GKE, Workload Identity maps Kubernetes service accounts to Google service accounts, allowing pods to authenticate to Google Cloud APIs with the permissions of the mapped Google service account. AKS offers a similar feature called Azure AD Workload Identity. These mechanisms provide fine-grained, per-pod cloud permissions without shared credentials, following the principle of least privilege.',
            code: `# AWS IRSA - Service Account with IAM role
apiVersion: v1
kind: ServiceAccount
metadata:
  name: s3-reader
  namespace: production
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789:role/s3-reader-role
---
# GKE Workload Identity
apiVersion: v1
kind: ServiceAccount
metadata:
  name: gcs-writer
  namespace: production
  annotations:
    iam.gke.io/gcp-service-account: gcs-writer@my-project.iam.gserviceaccount.com`,
            note: 'IRSA and Workload Identity require OIDC provider configuration at the cluster level. Ensure the OIDC issuer is properly set up before annotating service accounts.'
          },
          {
            heading: 'Best Practices for Service Accounts',
            content: 'Follow these best practices to secure your service accounts. Create dedicated service accounts for each workload rather than reusing the default service account. This provides isolation and makes RBAC policies more granular. Disable automatic token mounting on the default service account in every namespace to reduce attack surface. When a pod does need API access, create a specific service account with the minimum required RBAC permissions. Regularly audit which service accounts have cluster-admin or other broad roles. Use projected tokens with short expiration times and specific audiences when integrating with external services. For cloud resource access, always prefer IRSA or Workload Identity over static credential secrets. Delete unused service accounts to prevent them from being exploited. Monitor service account token usage through audit logs to detect anomalous API access patterns that may indicate compromise.',
            code: `# List all service accounts across namespaces
kubectl get serviceaccounts --all-namespaces

# Check which roles are bound to a service account
kubectl get rolebindings,clusterrolebindings --all-namespaces \
  -o json | jq '.items[] | select(.subjects[]?.name=="my-sa")'

# Create a short-lived token for debugging
kubectl create token my-sa --duration=10m -n production

# Disable auto-mount on default SA
kubectl patch serviceaccount default -n production \
  -p '{"automountServiceAccountToken": false}'

# Check if a SA can perform an action
kubectl auth can-i list pods \
  --as=system:serviceaccount:production:my-sa -n production`,
            warning: 'Legacy long-lived service account tokens (stored as Secrets) do not expire. Migrate to projected tokens and delete any legacy token secrets.'
          }
        ],
        quiz: [
          {
            question: 'How are service account tokens projected into pods in modern Kubernetes?',
            options: ['As environment variables', 'Through the TokenRequest API with short-lived tokens', 'As permanent secrets', 'Via ConfigMaps'],
            correctIndex: 1,
            explanation: 'Since Kubernetes 1.24, tokens are created via the TokenRequest API, are short-lived, audience-bound, and automatically rotated by kubelet.'
          },
          {
            question: 'What does IRSA stand for?',
            options: ['Internal Role Security Architecture', 'IAM Roles for Service Accounts', 'Instance Role Service Authentication', 'Integrated Role-based Security Access'],
            correctIndex: 1,
            explanation: 'IRSA (IAM Roles for Service Accounts) allows Kubernetes service accounts on EKS to assume AWS IAM roles without static credentials.'
          },
          {
            question: 'Why should you disable automountServiceAccountToken on the default service account?',
            options: ['It improves performance', 'It reduces attack surface for pods that do not need API access', 'It is required by RBAC', 'It saves disk space'],
            correctIndex: 1,
            explanation: 'Disabling automatic token mounting prevents pods that do not need Kubernetes API access from having unnecessary credentials that could be exploited.'
          }
        ]
      },
      {
        id: 'k8s-pod-security',
        title: 'Pod Security Standards',
        difficulty: 'intermediate',
        tags: ['pod-security', 'pss', 'psa', 'standards', 'admission'],
        sections: [
          {
            heading: 'Pod Security Standards Overview',
            content: 'Pod Security Standards (PSS) define three security profiles for pods: Privileged, Baseline, and Restricted. These standards replace the deprecated PodSecurityPolicy (PSP) API and are enforced by the built-in Pod Security Admission (PSA) controller. The Privileged profile is completely unrestricted and allows all pod configurations. The Baseline profile prevents known privilege escalations and blocks features like hostNetwork, hostPID, privileged containers, and certain volume types. The Restricted profile is the most hardened, requiring pods to run as non-root, use a read-only root filesystem, drop all capabilities, and use seccomp profiles. Pod Security Standards are applied at the namespace level through labels. You set the enforcement mode (enforce, audit, or warn) and the security level for each namespace. Enforce mode rejects non-compliant pods, audit mode logs violations in the audit log, and warn mode returns warnings to the user but allows the pod.',
            code: `apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/enforce-version: latest
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/audit-version: latest
    pod-security.kubernetes.io/warn: restricted
    pod-security.kubernetes.io/warn-version: latest
---
apiVersion: v1
kind: Namespace
metadata:
  name: development
  labels:
    pod-security.kubernetes.io/enforce: baseline
    pod-security.kubernetes.io/warn: restricted`,
            analogy: 'Pod Security Standards are like airport security levels. Privileged is like a VIP pass with no checks. Baseline is standard security screening. Restricted is the enhanced screening with full body scan, bag check, and ID verification.'
          },
          {
            heading: 'Baseline vs Restricted Profiles',
            content: 'The Baseline profile blocks the most dangerous pod configurations while remaining broadly compatible with existing workloads. It prevents: privileged containers, hostProcess containers, host namespace sharing (hostNetwork, hostPID, hostIPC), host path volumes, host ports, the NET_RAW capability (unless explicitly dropped), and seccomp profiles that are not RuntimeDefault or Localhost. Most standard web applications and microservices can run under the Baseline profile without modification. The Restricted profile adds significantly stricter requirements. All containers must run as non-root (runAsNonRoot: true) and cannot use UID 0. All containers must drop ALL capabilities and only add NET_BIND_SERVICE if needed. Volume types are limited to ConfigMap, EmptyDir, PersistentVolumeClaim, Projected, Secret, and DownwardAPI. A seccomp profile of RuntimeDefault or Localhost is required. The Restricted profile is recommended for all production workloads but may require application changes to comply.',
            code: `# Pod that complies with Restricted profile
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
  namespace: production
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    runAsGroup: 1000
    fsGroup: 1000
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: app
      image: myapp:v1
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop: ["ALL"]
      volumeMounts:
        - name: tmp
          mountPath: /tmp
  volumes:
    - name: tmp
      emptyDir: {}`,
            tip: 'Start by applying Restricted in warn mode to identify non-compliant workloads, then fix them before switching to enforce mode.'
          },
          {
            heading: 'Migration from PodSecurityPolicy',
            content: 'PodSecurityPolicy was removed in Kubernetes 1.25, making Pod Security Admission the standard enforcement mechanism. Migrating from PSP to PSA requires a methodical approach. First, inventory all existing PSPs and map them to the closest PSS level (Privileged, Baseline, or Restricted). Many PSPs map to Baseline with some modifications. Next, label namespaces with the appropriate PSS levels in audit and warn modes first to identify violations without breaking anything. Review the audit logs and warning messages to find pods that need updates. Update workloads to comply with their target security level, focusing on adding securityContext fields, dropping capabilities, and ensuring non-root execution. Once all workloads in a namespace comply, switch from audit/warn to enforce mode. For workloads that genuinely need elevated privileges (like monitoring agents or CNI plugins), place them in namespaces with the Privileged or Baseline profile. Always have a testing phase where you validate that your applications function correctly under the new security constraints.',
            code: `# Check which namespaces have PSS labels
kubectl get namespaces -L \
  pod-security.kubernetes.io/enforce,\
  pod-security.kubernetes.io/warn

# Dry-run enforcement on a namespace
kubectl label --dry-run=server --overwrite ns production \
  pod-security.kubernetes.io/enforce=restricted

# Check for violations in audit logs
kubectl logs -n kube-system kube-apiserver-control-plane | \
  grep "pod-security.kubernetes.io"

# Apply warn mode first
kubectl label ns production \
  pod-security.kubernetes.io/warn=restricted \
  pod-security.kubernetes.io/audit=restricted`,
            warning: 'Never switch directly to enforce mode on production namespaces. Always validate with warn and audit modes first to avoid breaking running workloads.'
          }
        ],
        challenge: {
          prompt: 'Create a Namespace called "secure-apps" with Restricted enforcement and a Pod spec that fully complies with the Restricted profile.',
          starterCode: `apiVersion: v1
kind: Namespace
metadata:
  name: secure-apps
  labels:
    # Add PSS labels here
---
apiVersion: v1
kind: Pod
metadata:
  name: compliant-pod
  namespace: secure-apps
spec:
  # Add security context and containers`,
          solutionCode: `apiVersion: v1
kind: Namespace
metadata:
  name: secure-apps
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/enforce-version: latest
    pod-security.kubernetes.io/warn: restricted
---
apiVersion: v1
kind: Pod
metadata:
  name: compliant-pod
  namespace: secure-apps
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    runAsGroup: 1000
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: app
      image: nginx:latest
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop: ["ALL"]
      volumeMounts:
        - name: tmp
          mountPath: /tmp
  volumes:
    - name: tmp
      emptyDir: {}`,
          hints: [
            'Use pod-security.kubernetes.io/enforce: restricted label on the namespace',
            'Set runAsNonRoot: true and seccompProfile type RuntimeDefault in pod securityContext',
            'Each container needs allowPrivilegeEscalation: false and capabilities drop ALL'
          ]
        }
      },
      {
        id: 'k8s-security-context',
        title: 'Security Context',
        difficulty: 'intermediate',
        tags: ['security-context', 'runAsUser', 'capabilities', 'filesystem'],
        sections: [
          {
            heading: 'Pod-Level Security Context',
            content: 'A security context defines privilege and access control settings for a pod or container. Pod-level security context applies to all containers within the pod and covers settings like runAsUser (the UID under which all containers run), runAsGroup (the primary GID), fsGroup (the GID applied to all volumes mounted in the pod), supplementalGroups (additional GIDs), and seccompProfile (the system call filter). The runAsNonRoot field is particularly important: when set to true, the kubelet validates that the container process does not run as UID 0 and rejects the pod if it would. This prevents privilege escalation even if the container image is configured to run as root. The fsGroup setting is crucial for shared volumes: all files created in volumes will have this GID as their group owner, and the volume permission bits are modified to allow the group to read and write. Understanding and correctly configuring pod-level security context is foundational to Kubernetes security.',
            code: `apiVersion: v1
kind: Pod
metadata:
  name: secure-app
spec:
  securityContext:
    runAsUser: 1000
    runAsGroup: 3000
    fsGroup: 2000
    runAsNonRoot: true
    supplementalGroups: [4000]
    seccompProfile:
      type: RuntimeDefault
    sysctls:
      - name: net.core.somaxconn
        value: "1024"
  containers:
    - name: app
      image: myapp:v1
      ports:
        - containerPort: 8080`,
            note: 'fsGroup changes volume ownership at mount time, which can cause slow startup for volumes with many existing files. Use fsGroupChangePolicy: OnRootMismatch to optimize this.'
          },
          {
            heading: 'Container-Level Security Context',
            content: 'Container-level security context provides finer-grained control that can override or extend pod-level settings. Key container-level fields include allowPrivilegeEscalation (when false, prevents child processes from gaining more privileges than the parent via setuid or capabilities), readOnlyRootFilesystem (mounts the container root filesystem as read-only, forcing applications to write only to explicitly mounted volumes), capabilities (fine-grained Linux capability management with add and drop lists), and privileged (when true, gives the container almost all host capabilities, effectively running as root on the host). Best practice is to drop ALL capabilities and add back only what is needed. Common capabilities that applications may need include NET_BIND_SERVICE (binding to ports below 1024), SYS_PTRACE (for debugging tools), and NET_ADMIN (for network configuration). Setting readOnlyRootFilesystem to true prevents attackers from writing malicious files into the container filesystem, significantly reducing the attack surface.',
            code: `apiVersion: v1
kind: Pod
metadata:
  name: hardened-app
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: web
      image: myapp:v1
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop: ["ALL"]
          add: ["NET_BIND_SERVICE"]
      volumeMounts:
        - name: tmp
          mountPath: /tmp
        - name: cache
          mountPath: /var/cache
    - name: sidecar
      image: fluentd:v1
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop: ["ALL"]
  volumes:
    - name: tmp
      emptyDir: {}
    - name: cache
      emptyDir: {}`,
            tip: 'Use readOnlyRootFilesystem: true and mount writable emptyDir volumes at specific paths (/tmp, /var/cache) to control exactly where the application can write.'
          },
          {
            heading: 'AppArmor and Seccomp Profiles',
            content: 'Beyond the basic security context, Kubernetes supports Linux security modules like AppArmor and seccomp for deeper defense. Seccomp (Secure Computing Mode) restricts which system calls a container can make. The RuntimeDefault profile blocks known dangerous syscalls while allowing common ones, and is the recommended baseline. Custom seccomp profiles can be created to allow only the specific syscalls your application needs, further reducing attack surface. AppArmor provides mandatory access control that restricts what files, network resources, and capabilities a process can access. AppArmor profiles are loaded on the node and referenced via annotations on pods. Kubernetes 1.30 introduced first-class seccomp and AppArmor fields in the security context, replacing the older annotation-based approach. For maximum security, combine seccomp profiles with capability dropping and read-only filesystems. Tools like Inspektor Gadget and Security Profiles Operator can automatically generate seccomp profiles by observing your application behavior.',
            code: `# Custom seccomp profile on the node
# /var/lib/kubelet/seccomp/profiles/my-app.json
# Referenced in the pod spec:
apiVersion: v1
kind: Pod
metadata:
  name: seccomp-demo
spec:
  securityContext:
    seccompProfile:
      type: Localhost
      localhostProfile: profiles/my-app.json
  containers:
    - name: app
      image: myapp:v1
      securityContext:
        allowPrivilegeEscalation: false
        capabilities:
          drop: ["ALL"]
---
# Security Profiles Operator - auto-generate profiles
apiVersion: security-profiles-operator.x-k8s.io/v1alpha1
kind: ProfileRecording
metadata:
  name: my-app-recording
spec:
  kind: SeccompProfile
  recorder: logs
  podSelector:
    matchLabels:
      app: my-app`,
            warning: 'Custom seccomp profiles that are too restrictive will cause applications to crash with permission denied errors. Always test thoroughly in staging before applying to production.'
          }
        ]
      },
      {
        id: 'k8s-secrets-management',
        title: 'Secrets Management',
        difficulty: 'advanced',
        tags: ['secrets', 'encryption', 'vault', 'external-secrets', 'security'],
        sections: [
          {
            heading: 'Kubernetes Secrets and Encryption at Rest',
            content: 'Kubernetes Secrets store sensitive data like passwords, tokens, and TLS certificates. By default, secrets are stored unencrypted in etcd, meaning anyone with access to etcd can read all secrets in plaintext. This is a significant security concern that must be addressed in production clusters. Encryption at rest protects secrets by encrypting them before they are written to etcd. You configure this through an EncryptionConfiguration file on the API server that specifies which resources to encrypt and which encryption provider to use. Available providers include aescbc (AES-CBC with PKCS7 padding), aesgcm (AES-GCM, faster but requires key rotation care), secretbox (XSalsa20 and Poly1305), and kms (delegates encryption to an external Key Management Service). The KMS provider is recommended for production because it integrates with cloud KMS services (AWS KMS, GCP KMS, Azure Key Vault), keeping the master key outside the cluster. After enabling encryption, you must re-encrypt existing secrets with kubectl get secrets --all-namespaces -o json | kubectl replace -f -.',
            code: `apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
      - secrets
      - configmaps
    providers:
      - kms:
          apiVersion: v2
          name: aws-kms-provider
          endpoint: unix:///var/run/kmsplugin/socket.sock
          timeout: 3s
      - aescbc:
          keys:
            - name: key1
              secret: c2VjcmV0LWtleS1oZXJlLTMyLWJ5dGVz
      - identity: {}`,
            warning: 'The identity provider (no encryption) should always be listed last. It serves as a fallback for reading secrets that were stored before encryption was enabled.'
          },
          {
            heading: 'External Secrets Operator',
            content: 'The External Secrets Operator (ESO) synchronizes secrets from external secret management systems into Kubernetes Secrets. Instead of storing sensitive values directly in the cluster, you store them in a dedicated secret manager like AWS Secrets Manager, HashiCorp Vault, GCP Secret Manager, or Azure Key Vault, and ESO creates and maintains corresponding Kubernetes Secrets. ESO introduces two key custom resources: SecretStore (or ClusterSecretStore) defines the connection to the external provider, and ExternalSecret defines which secrets to fetch and how to map them into a Kubernetes Secret. ESO periodically refreshes the Kubernetes Secret from the external source, ensuring that rotated credentials are automatically updated. This eliminates the need to manually update secrets and provides a single source of truth for sensitive data. ESO supports complex transformations, allowing you to combine multiple external values into a single Kubernetes Secret or extract specific fields from JSON secrets.',
            code: `apiVersion: external-secrets.io/v1beta1
kind: ClusterSecretStore
metadata:
  name: aws-secrets-manager
spec:
  provider:
    aws:
      service: SecretsManager
      region: us-east-1
      auth:
        jwt:
          serviceAccountRef:
            name: external-secrets-sa
            namespace: external-secrets
---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: database-credentials
  namespace: production
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
    kind: ClusterSecretStore
  target:
    name: db-secret
    creationPolicy: Owner
  data:
    - secretKey: username
      remoteRef:
        key: production/database
        property: username
    - secretKey: password
      remoteRef:
        key: production/database
        property: password`,
            tip: 'Use ClusterSecretStore for organization-wide secret providers and SecretStore for namespace-specific providers.'
          },
          {
            heading: 'HashiCorp Vault Integration',
            content: 'HashiCorp Vault is the most feature-rich external secrets manager for Kubernetes. It offers dynamic secrets (generating unique credentials on demand), secret leasing and automatic revocation, encryption as a service, and comprehensive audit logging. There are two primary ways to integrate Vault with Kubernetes. The Vault Agent Injector uses a mutating webhook to inject a Vault Agent sidecar into pods, which authenticates to Vault and writes secrets to a shared volume. The Vault CSI Provider mounts secrets as volumes using the Secrets Store CSI driver. Both approaches avoid storing secrets as Kubernetes Secret objects entirely, keeping them only in memory. For ESO-based integration, you configure a SecretStore pointing to Vault and use ExternalSecrets to pull specific paths. Vault\'s Kubernetes auth method allows pods to authenticate using their service account tokens, providing automatic, identity-based access to secrets without distributing any credentials.',
            code: `# Vault Agent Injector annotations
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  template:
    metadata:
      annotations:
        vault.hashicorp.com/agent-inject: "true"
        vault.hashicorp.com/role: "my-app-role"
        vault.hashicorp.com/agent-inject-secret-db: "secret/data/production/db"
        vault.hashicorp.com/agent-inject-template-db: |
          {{- with secret "secret/data/production/db" -}}
          export DB_HOST={{ .Data.data.host }}
          export DB_USER={{ .Data.data.username }}
          export DB_PASS={{ .Data.data.password }}
          {{- end }}
    spec:
      serviceAccountName: my-app
      containers:
        - name: app
          image: myapp:v1
          command: ["/bin/sh", "-c", "source /vault/secrets/db && ./start.sh"]`,
            note: 'Vault Agent Injector writes secrets to files in /vault/secrets/. Your application must read from these files or source them as environment variables.'
          }
        ],
        challenge: {
          prompt: 'Create an ExternalSecret that fetches API keys from AWS Secrets Manager at path "production/api-keys" and creates a Kubernetes Secret named "api-keys" with fields "stripe-key" and "sendgrid-key", refreshing every 30 minutes.',
          starterCode: `apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: api-keys
  namespace: production
spec:
  # Configure refresh interval
  # Reference the secret store
  # Define target and data mappings`,
          solutionCode: `apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: api-keys
  namespace: production
spec:
  refreshInterval: 30m
  secretStoreRef:
    name: aws-secrets-manager
    kind: ClusterSecretStore
  target:
    name: api-keys
    creationPolicy: Owner
  data:
    - secretKey: stripe-key
      remoteRef:
        key: production/api-keys
        property: stripe-key
    - secretKey: sendgrid-key
      remoteRef:
        key: production/api-keys
        property: sendgrid-key`,
          hints: [
            'refreshInterval accepts duration strings like 30m, 1h, etc.',
            'secretStoreRef references a previously created ClusterSecretStore or SecretStore',
            'Each data entry maps a remoteRef (external) to a secretKey (Kubernetes Secret key)'
          ]
        }
      },
      {
        id: 'k8s-admission-controllers',
        title: 'Admission Controllers',
        difficulty: 'advanced',
        tags: ['admission', 'opa', 'gatekeeper', 'kyverno', 'webhooks'],
        sections: [
          {
            heading: 'Understanding Admission Controllers',
            content: 'Admission controllers are plugins that intercept API requests after authentication and authorization but before the object is persisted to etcd. They can validate requests (reject invalid configurations), mutate requests (modify objects before storage), or both. Kubernetes includes many built-in admission controllers: NamespaceLifecycle prevents operations in terminating namespaces, ResourceQuota enforces quota limits, LimitRanger applies default resource limits, ServiceAccount assigns service accounts, and PodSecurity enforces Pod Security Standards. Beyond built-in controllers, Kubernetes supports dynamic admission control through webhooks. Validating webhooks receive the admission request and return an allow or deny decision. Mutating webhooks can modify the request object, typically to inject sidecars, set defaults, or add labels. Webhooks are configured using ValidatingWebhookConfiguration and MutatingWebhookConfiguration resources that specify which API operations to intercept and which service to call. The webhook receives the AdmissionReview object and must respond within the configured timeout.',
            code: `apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: pod-policy
webhooks:
  - name: pod-policy.example.com
    admissionReviewVersions: ["v1"]
    sideEffects: None
    timeoutSeconds: 5
    failurePolicy: Fail
    clientConfig:
      service:
        name: pod-policy-webhook
        namespace: webhooks
        path: /validate
      caBundle: LS0tLS1C...
    rules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
    namespaceSelector:
      matchExpressions:
        - key: environment
          operator: In
          values: ["production"]`,
            analogy: 'Admission controllers are like security checkpoints at a building entrance. Validating webhooks are the security guards who check your ID and either let you in or turn you away. Mutating webhooks are like the reception desk that gives you a visitor badge and updates your form before you enter.'
          },
          {
            heading: 'OPA Gatekeeper',
            content: 'Open Policy Agent (OPA) Gatekeeper is a policy engine for Kubernetes that uses the Rego policy language to define and enforce custom admission policies. Gatekeeper provides a Kubernetes-native way to define policies using two custom resources: ConstraintTemplate and Constraint. A ConstraintTemplate defines the policy logic in Rego and creates a new CRD for configuring instances of that policy. A Constraint is an instance of that CRD that specifies which resources the policy applies to and any parameters. For example, you might create a ConstraintTemplate called K8sRequiredLabels that checks for required labels, then create Constraint instances that enforce different label requirements for different namespaces. Gatekeeper runs as a validating webhook and evaluates every matching API request against the configured constraints. It also supports audit functionality that checks existing resources against policies, identifying violations in resources that were created before the policy was applied.',
            code: `apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8srequiredlabels
spec:
  crd:
    spec:
      names:
        kind: K8sRequiredLabels
      validation:
        openAPIV3Schema:
          type: object
          properties:
            labels:
              type: array
              items:
                type: string
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8srequiredlabels
        violation[{"msg": msg}] {
          provided := {label | input.review.object.metadata.labels[label]}
          required := {label | label := input.parameters.labels[_]}
          missing := required - provided
          count(missing) > 0
          msg := sprintf("Missing required labels: %v", [missing])
        }
---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRequiredLabels
metadata:
  name: require-team-label
spec:
  match:
    kinds:
      - apiGroups: ["apps"]
        kinds: ["Deployment"]
    namespaces: ["production"]
  parameters:
    labels: ["team", "cost-center"]`,
            tip: 'Use Gatekeeper audit mode to discover existing violations before enforcing new policies. Check audit results with kubectl get constraints -o yaml.'
          },
          {
            heading: 'Kyverno Policy Engine',
            content: 'Kyverno is a policy engine designed specifically for Kubernetes that uses YAML to define policies, making it more accessible than Gatekeeper\'s Rego language. Kyverno policies can validate, mutate, generate, and clean up Kubernetes resources. A validate rule checks resource configurations and blocks non-compliant objects. A mutate rule modifies resources as they are admitted, such as adding default labels, injecting sidecars, or setting resource limits. A generate rule creates new resources when triggered, like automatically creating NetworkPolicies when a new namespace is created. Kyverno policies can be namespace-scoped (Policy) or cluster-scoped (ClusterPolicy). Each policy contains one or more rules with match and exclude conditions that determine which resources are affected. Kyverno also supports variable substitution, JMESPath expressions, and image verification for supply chain security. Its YAML-based syntax makes it popular with teams that prefer Kubernetes-native tooling over learning a new policy language.',
            code: `apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-resource-limits
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: check-limits
      match:
        any:
          - resources:
              kinds: ["Deployment", "StatefulSet"]
      validate:
        message: "All containers must have CPU and memory limits set."
        pattern:
          spec:
            template:
              spec:
                containers:
                  - resources:
                      limits:
                        memory: "?*"
                        cpu: "?*"
    - name: add-default-labels
      match:
        any:
          - resources:
              kinds: ["Deployment"]
      mutate:
        patchStrategicMerge:
          metadata:
            labels:
              managed-by: kyverno`,
            note: 'Set validationFailureAction to Audit first to log violations without blocking, then switch to Enforce once workloads are compliant.'
          }
        ],
        quiz: [
          {
            question: 'What is the order of admission controller processing?',
            options: ['Validate then Mutate', 'Mutate then Validate', 'Both run simultaneously', 'Depends on webhook priority'],
            correctIndex: 1,
            explanation: 'Mutating webhooks run first to modify the object, then validating webhooks check the final state of the object before it is persisted.'
          },
          {
            question: 'What language does OPA Gatekeeper use for policies?',
            options: ['YAML', 'JavaScript', 'Rego', 'Python'],
            correctIndex: 2,
            explanation: 'OPA Gatekeeper uses the Rego policy language, a declarative language designed for policy evaluation.'
          },
          {
            question: 'What can Kyverno policies do that pure validating webhooks cannot?',
            options: ['Reject requests', 'Generate new resources', 'Log events', 'Send notifications'],
            correctIndex: 1,
            explanation: 'Kyverno has a generate rule type that can automatically create resources (like NetworkPolicies) when triggered by other resource events.'
          }
        ]
      },
      {
        id: 'k8s-audit-logging',
        title: 'Audit Logging',
        difficulty: 'advanced',
        tags: ['audit', 'logging', 'compliance', 'forensics', 'policy'],
        sections: [
          {
            heading: 'Kubernetes Audit Logging Fundamentals',
            content: 'Kubernetes audit logging records a chronological set of security-relevant activities in the cluster. Every request to the API server can generate an audit event that captures who made the request, what they requested, when, and the outcome. Audit logs are essential for security monitoring, compliance requirements, incident investigation, and understanding cluster behavior. Each audit event includes the user identity (user, group, service account), the request URI and verb, the target resource, the response status code, and timestamps. Audit events progress through four stages: RequestReceived (the audit handler receives the request), ResponseStarted (response headers are sent but body is not complete, for long-running requests only), ResponseComplete (response body is complete), and Panic (an internal server error occurred). The audit policy determines which events are recorded and at what level of detail, allowing you to balance security requirements with storage costs and performance impact.',
            code: `# Audit policy file for kube-apiserver
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  # Do not log requests to certain non-resource URLs
  - level: None
    nonResourceURLs:
      - /healthz*
      - /readyz*
      - /livez*

  # Log secret access at Metadata level
  - level: Metadata
    resources:
      - group: ""
        resources: ["secrets"]

  # Log pod changes at RequestResponse level
  - level: RequestResponse
    resources:
      - group: ""
        resources: ["pods"]
    verbs: ["create", "update", "patch", "delete"]

  # Log everything else at Request level
  - level: Request
    resources:
      - group: ""
        resources: ["configmaps", "services"]`,
            note: 'Audit policies are evaluated from top to bottom and the first matching rule is applied. Place more specific rules before general catch-all rules.'
          },
          {
            heading: 'Audit Levels and Policy Configuration',
            content: 'The audit level determines how much detail is captured for each event. There are four levels: None means no event is generated at all for matching requests. Metadata records the request metadata (user, timestamp, resource, verb) but not the request or response bodies. Request records metadata plus the request body but not the response body, useful for understanding what changes were requested. RequestResponse records everything including both request and response bodies, providing the most complete audit trail but generating the most data. The audit policy file defines rules that match requests based on API groups, resources, namespaces, verbs, and user groups. Each rule specifies the audit level for matching requests. You can also use omitStages to skip recording events at specific stages. For production clusters, a balanced approach is to log secrets at Metadata level (to avoid exposing secret values in logs), log mutation operations at Request level, and set a Metadata catch-all for everything else. Exclude high-frequency, low-risk endpoints like health checks at the None level.',
            code: `apiVersion: audit.k8s.io/v1
kind: Policy
omitStages:
  - "RequestReceived"
rules:
  # Critical: log RBAC changes with full detail
  - level: RequestResponse
    resources:
      - group: "rbac.authorization.k8s.io"
        resources: ["roles", "rolebindings", "clusterroles", "clusterrolebindings"]

  # Important: log namespace changes
  - level: RequestResponse
    resources:
      - group: ""
        resources: ["namespaces"]
    verbs: ["create", "delete"]

  # Sensitive: log secret access but omit body
  - level: Metadata
    resources:
      - group: ""
        resources: ["secrets"]

  # Ignore system service account reads
  - level: None
    userGroups: ["system:serviceaccounts"]
    verbs: ["get", "list", "watch"]

  # Default catch-all
  - level: Metadata`,
            tip: 'Omit the RequestReceived stage to reduce log volume by about 50% since ResponseComplete contains the same information plus the outcome.'
          },
          {
            heading: 'Audit Backends and Log Analysis',
            content: 'Audit events need to be sent somewhere for storage and analysis. Kubernetes supports two backends: log backend and webhook backend. The log backend writes audit events as JSON lines to a file on the API server node. You configure it with --audit-log-path, --audit-log-maxage (days to retain), --audit-log-maxbackup (number of rotated files), and --audit-log-maxsize (megabytes per file). The webhook backend sends events to an external HTTP endpoint in real-time, ideal for streaming to a centralized logging system like Elasticsearch, Splunk, or a SIEM. You can configure the webhook with --audit-webhook-config-file pointing to a kubeconfig-style file with the endpoint URL. For production, combine both backends: local log files for reliability and webhook for real-time analysis. Process audit logs with tools like Falco for runtime security monitoring, or feed them into your SIEM for correlation with other security events. Set up alerts for suspicious patterns like excessive secret reads, RBAC changes outside change windows, or API calls from unexpected service accounts.',
            code: `# API server flags for audit logging
# Add to kube-apiserver manifest
# --audit-policy-file=/etc/kubernetes/audit-policy.yaml
# --audit-log-path=/var/log/kubernetes/audit.log
# --audit-log-maxage=30
# --audit-log-maxbackup=10
# --audit-log-maxsize=100
# --audit-webhook-config-file=/etc/kubernetes/audit-webhook.yaml

# Query audit logs for secret access
cat /var/log/kubernetes/audit.log | \
  jq 'select(.objectRef.resource=="secrets")'

# Find all RBAC changes in the last hour
cat /var/log/kubernetes/audit.log | \
  jq 'select(.objectRef.apiGroup=="rbac.authorization.k8s.io") |
      select(.verb | IN("create","update","delete","patch"))'

# Count requests by user
cat /var/log/kubernetes/audit.log | \
  jq -r '.user.username' | sort | uniq -c | sort -rn`,
            warning: 'RequestResponse level on high-traffic resources generates enormous log volumes. Reserve it only for critical security resources like RBAC and secrets.'
          }
        ]
      },
      {
        id: 'k8s-supply-chain',
        title: 'Supply Chain Security',
        difficulty: 'advanced',
        tags: ['supply-chain', 'sigstore', 'sbom', 'image-signing', 'cosign'],
        sections: [
          {
            heading: 'Container Image Signing with Cosign',
            content: 'Supply chain security ensures the integrity and authenticity of software artifacts from development to deployment. In Kubernetes, this starts with container images. Image signing uses cryptographic signatures to verify that an image was built by a trusted entity and has not been tampered with. Cosign, part of the Sigstore project, is the most widely adopted tool for signing container images. It supports both key-based signing (using a private key) and keyless signing (using OIDC identity providers like GitHub, Google, or Microsoft). In keyless mode, Cosign obtains a short-lived certificate from the Fulcio certificate authority, signs the image, and records the signature in the Rekor transparency log. This eliminates the need to manage long-lived signing keys. Signed images can be verified at deployment time using admission controllers to ensure that only trusted images are allowed to run in the cluster. This prevents supply chain attacks where malicious images are pushed to a registry.',
            code: `# Install cosign
brew install cosign

# Generate a key pair for signing
cosign generate-key-pair

# Sign an image with a key
cosign sign --key cosign.key myregistry.io/myapp:v1.0

# Keyless signing (uses OIDC)
cosign sign myregistry.io/myapp:v1.0

# Verify a signed image
cosign verify --key cosign.pub myregistry.io/myapp:v1.0

# Keyless verification
cosign verify \
  --certificate-identity user@example.com \
  --certificate-oidc-issuer https://accounts.google.com \
  myregistry.io/myapp:v1.0

# Attach an SBOM to an image
cosign attach sbom --sbom sbom.spdx myregistry.io/myapp:v1.0`,
            tip: 'Use keyless signing in CI/CD pipelines to avoid managing signing keys. The OIDC identity of the CI system becomes the verifiable signer identity.'
          },
          {
            heading: 'Enforcing Image Verification in Kubernetes',
            content: 'Signing images is only useful if you enforce verification at deployment time. Both Kyverno and OPA Gatekeeper support image verification policies. Kyverno has built-in support for cosign signature verification through its verifyImages rule type. You can require that all images in a namespace must be signed by a specific key or identity, and optionally verify that the image has an attached attestation (like a vulnerability scan result or SBOM). Gatekeeper can enforce image verification through custom ConstraintTemplates that call out to verification services. The Sigstore Policy Controller is another option that provides a dedicated admission controller for image verification with support for complex policies including multiple signatures, attestation checks, and identity-based verification. For comprehensive supply chain security, combine image signing with image provenance (SLSA attestations that prove where and how the image was built), vulnerability scanning (blocking images with critical CVEs), and registry restrictions (allowing images only from approved registries).',
            code: `# Kyverno policy for image verification
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: verify-image-signatures
spec:
  validationFailureAction: Enforce
  webhookTimeoutSeconds: 30
  rules:
    - name: verify-cosign-signature
      match:
        any:
          - resources:
              kinds: ["Pod"]
      verifyImages:
        - imageReferences:
            - "myregistry.io/*"
          attestors:
            - entries:
                - keyless:
                    subject: "https://github.com/myorg/*"
                    issuer: "https://token.actions.githubusercontent.com"
                    rekor:
                      url: https://rekor.sigstore.dev
    - name: restrict-registries
      match:
        any:
          - resources:
              kinds: ["Pod"]
      validate:
        message: "Images must come from approved registries."
        pattern:
          spec:
            containers:
              - image: "myregistry.io/* | gcr.io/my-project/*"`,
            warning: 'Image verification adds latency to pod creation. Set appropriate webhook timeouts and consider caching verification results.'
          },
          {
            heading: 'SBOM and Vulnerability Management',
            content: 'A Software Bill of Materials (SBOM) is a comprehensive inventory of all components, libraries, and dependencies in a software artifact. SBOMs enable organizations to quickly identify whether they are affected by newly discovered vulnerabilities. Two primary SBOM formats exist: SPDX (from the Linux Foundation) and CycloneDX (from OWASP). Tools like Syft generate SBOMs from container images, and Cosign can attach SBOMs to images as OCI artifacts. Grype and Trivy scan container images for known vulnerabilities by comparing the image contents against vulnerability databases. In a Kubernetes context, integrate vulnerability scanning into your CI/CD pipeline to block deployment of images with critical vulnerabilities. Use tools like Trivy Operator to continuously scan running workloads for new vulnerabilities discovered after deployment. Combine SBOMs with vulnerability data to create a real-time view of your cluster\'s security posture. When a new CVE is announced, query your SBOM database to instantly identify all affected deployments and prioritize remediation.',
            code: `# Generate SBOM with Syft
syft myregistry.io/myapp:v1.0 -o spdx-json > sbom.spdx.json

# Scan image for vulnerabilities with Trivy
trivy image --severity HIGH,CRITICAL myregistry.io/myapp:v1.0

# Scan with Grype
grype myregistry.io/myapp:v1.0 --fail-on critical

# Attach SBOM to image with Cosign
cosign attach sbom --sbom sbom.spdx.json myregistry.io/myapp:v1.0

# Install Trivy Operator for continuous scanning
helm install trivy-operator aquasecurity/trivy-operator \
  --namespace trivy-system --create-namespace \
  --set trivy.severity=HIGH,CRITICAL

# Check vulnerability reports
kubectl get vulnerabilityreports --all-namespaces
kubectl get vulnerabilityreports -n production -o json | \
  jq '.items[].report.summary'`,
            note: 'SBOM generation should happen during CI/CD build time when the full build context is available, not at deployment time.'
          }
        ],
        quiz: [
          {
            question: 'What is keyless signing in Cosign?',
            options: ['Signing without encryption', 'Using OIDC identity instead of long-lived keys', 'Signing with a shared key', 'Not signing at all'],
            correctIndex: 1,
            explanation: 'Keyless signing uses OIDC identity providers to obtain short-lived certificates from Fulcio, eliminating the need to manage signing keys.'
          },
          {
            question: 'What are the two primary SBOM formats?',
            options: ['JSON and YAML', 'SPDX and CycloneDX', 'CSV and XML', 'OCI and Docker'],
            correctIndex: 1,
            explanation: 'SPDX (Linux Foundation) and CycloneDX (OWASP) are the two widely adopted SBOM formats for describing software components.'
          },
          {
            question: 'What does the Rekor transparency log provide?',
            options: ['Image storage', 'An immutable record of signing events', 'Container runtime logs', 'Network traffic logs'],
            correctIndex: 1,
            explanation: 'Rekor is a transparency log that provides an immutable, tamper-proof record of signing events, enabling verification that a signature was created at a specific time.'
          }
        ]
      }
    ]
  }
];
