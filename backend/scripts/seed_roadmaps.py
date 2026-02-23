"""
Seed the roadmaps table with curated, best-in-class tech learning roadmaps.

Each roadmap has sections (resource_type='section') with child steps.
Idempotent — skips roadmaps whose slug already exists.

Usage:
    cd backend
    python scripts/seed_roadmaps.py
"""

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from slugify import slugify as _slugify
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.config import get_settings
from app.models.roadmap import Roadmap, RoadmapStep


def _make_slug(title: str) -> str:
    return _slugify(title, max_length=300)


# ---------------------------------------------------------------------------
# Roadmap definitions
# Each roadmap: title, description, difficulty, estimated_hours, sections[]
# Each section: title, steps[]
# Each step: title, description, resource_type (article/problem/video/project)
# ---------------------------------------------------------------------------

ROADMAPS = [
    # ===================================================================
    # 1. DSA MASTERY
    # ===================================================================
    {
        "title": "Data Structures & Algorithms Mastery",
        "description": "A comprehensive path from basic data structures to advanced algorithmic techniques. Covers arrays, trees, graphs, dynamic programming, and competitive coding patterns used in FAANG interviews.",
        "difficulty": "intermediate",
        "estimated_hours": 120,
        "sections": [
            {
                "title": "Foundations: Complexity & Arrays",
                "steps": [
                    ("Understand Big-O, Big-Theta, and Big-Omega notation", "Learn to analyze time and space complexity of algorithms", "article"),
                    ("Master array manipulation techniques", "Two pointers, sliding window, prefix sums", "article"),
                    ("Solve 15 array problems", "Practice problems covering rotation, subarray sums, and kadane's algorithm", "problem"),
                    ("Sorting algorithms deep dive", "Implement and compare bubble, merge, quick, heap, and radix sort", "article"),
                ],
            },
            {
                "title": "Strings & Hashing",
                "steps": [
                    ("String manipulation patterns", "Palindromes, anagrams, substring search, and string matching", "article"),
                    ("Hash maps and hash sets", "Understand hashing, collision handling, and when to use maps vs sets", "article"),
                    ("Solve 10 string + hashing problems", "Longest substring without repeating chars, group anagrams, etc.", "problem"),
                ],
            },
            {
                "title": "Linked Lists & Stacks/Queues",
                "steps": [
                    ("Singly and doubly linked lists", "Insertion, deletion, reversal, cycle detection (Floyd's algorithm)", "article"),
                    ("Stack and queue patterns", "Monotonic stack, min stack, BFS with queue, deque tricks", "article"),
                    ("Solve 10 linked list problems", "Merge sorted lists, detect cycle, LRU cache implementation", "problem"),
                ],
            },
            {
                "title": "Trees & Binary Search Trees",
                "steps": [
                    ("Binary tree traversals", "Inorder, preorder, postorder — recursive and iterative", "article"),
                    ("Binary Search Trees (BST)", "Insert, delete, search, validate BST, and balanced BSTs", "article"),
                    ("Advanced tree problems", "Lowest common ancestor, tree serialization, path sum variants", "article"),
                    ("Solve 15 tree problems", "Max depth, level order traversal, BST iterator, etc.", "problem"),
                ],
            },
            {
                "title": "Heaps & Priority Queues",
                "steps": [
                    ("Heap fundamentals", "Min-heap, max-heap, heapify operation, and heap sort", "article"),
                    ("Priority queue patterns", "Top-K elements, merge K sorted lists, median finder", "article"),
                    ("Solve 8 heap problems", "Kth largest element, task scheduler, reorganize string", "problem"),
                ],
            },
            {
                "title": "Graph Algorithms",
                "steps": [
                    ("Graph representations", "Adjacency list vs matrix, directed vs undirected, weighted graphs", "article"),
                    ("BFS and DFS traversals", "Level-order search, connected components, topological sort", "article"),
                    ("Shortest path algorithms", "Dijkstra's, Bellman-Ford, and Floyd-Warshall", "article"),
                    ("Union-Find (Disjoint Set)", "Path compression, union by rank, detecting cycles", "article"),
                    ("Solve 15 graph problems", "Number of islands, course schedule, network delay time", "problem"),
                ],
            },
            {
                "title": "Dynamic Programming",
                "steps": [
                    ("DP fundamentals", "Memoization vs tabulation, identifying subproblems and recurrence relations", "article"),
                    ("1D DP patterns", "Climbing stairs, house robber, coin change, longest increasing subsequence", "article"),
                    ("2D DP patterns", "Unique paths, edit distance, longest common subsequence", "article"),
                    ("Advanced DP", "Knapsack variants, interval DP, bitmask DP, digit DP", "article"),
                    ("Solve 20 DP problems", "Practice classic patterns from easy to hard", "problem"),
                ],
            },
            {
                "title": "Advanced Topics & Interview Prep",
                "steps": [
                    ("Backtracking patterns", "Permutations, combinations, N-Queens, Sudoku solver", "article"),
                    ("Greedy algorithms", "Activity selection, Huffman coding, interval scheduling", "article"),
                    ("Trie data structure", "Implement trie, word search, autocomplete system", "article"),
                    ("Bit manipulation", "Single number, counting bits, power of two, XOR tricks", "article"),
                    ("Mock interview practice", "Simulate timed coding interviews with 2 problems in 45 minutes", "project"),
                ],
            },
        ],
    },

    # ===================================================================
    # 2. FRONTEND DEVELOPMENT
    # ===================================================================
    {
        "title": "Modern Frontend Development",
        "description": "Master frontend engineering from HTML/CSS fundamentals to building production React applications with TypeScript, state management, testing, and performance optimization.",
        "difficulty": "beginner",
        "estimated_hours": 100,
        "sections": [
            {
                "title": "HTML & CSS Foundations",
                "steps": [
                    ("Semantic HTML5", "Document structure, accessibility, forms, and media elements", "article"),
                    ("CSS Box Model & Layout", "Display, positioning, flexbox, and CSS grid", "article"),
                    ("Responsive design", "Media queries, mobile-first approach, fluid typography", "article"),
                    ("Build a responsive portfolio page", "Apply HTML/CSS skills to create a personal portfolio", "project"),
                ],
            },
            {
                "title": "JavaScript Essentials",
                "steps": [
                    ("Variables, types, and operators", "let/const, primitives, type coercion, equality", "article"),
                    ("Functions and scope", "Arrow functions, closures, hoisting, IIFE, this keyword", "article"),
                    ("Arrays and objects", "Destructuring, spread/rest, map/filter/reduce, object methods", "article"),
                    ("Asynchronous JavaScript", "Callbacks, promises, async/await, event loop", "article"),
                    ("DOM manipulation", "Selectors, events, createElement, and the virtual DOM concept", "article"),
                    ("Solve 10 JS coding challenges", "Practice closure, async, and array manipulation problems", "problem"),
                ],
            },
            {
                "title": "TypeScript",
                "steps": [
                    ("TypeScript fundamentals", "Types, interfaces, enums, generics, and type guards", "article"),
                    ("Advanced TypeScript", "Utility types, conditional types, mapped types, discriminated unions", "article"),
                    ("Convert a JS project to TypeScript", "Migrate an existing project adding proper type safety", "project"),
                ],
            },
            {
                "title": "React Core Concepts",
                "steps": [
                    ("Components and JSX", "Functional components, props, children, and composition patterns", "article"),
                    ("State and lifecycle", "useState, useEffect, component lifecycle and cleanup", "article"),
                    ("Event handling and forms", "Controlled components, form validation, custom hooks", "article"),
                    ("Lists and conditional rendering", "Keys, mapping data, ternary patterns, early returns", "article"),
                    ("Build a todo app with React", "CRUD operations, local state, component composition", "project"),
                ],
            },
            {
                "title": "Advanced React Patterns",
                "steps": [
                    ("Context API and useReducer", "Global state without libraries, reducer pattern", "article"),
                    ("Custom hooks", "Extract reusable logic — useDebounce, useFetch, useLocalStorage", "article"),
                    ("React Router", "Client-side routing, nested routes, route guards, lazy loading", "article"),
                    ("React Query / TanStack Query", "Server state management, caching, optimistic updates", "article"),
                    ("Performance optimization", "React.memo, useMemo, useCallback, code splitting", "article"),
                ],
            },
            {
                "title": "Styling & UI",
                "steps": [
                    ("Tailwind CSS", "Utility-first CSS, responsive design, custom themes", "article"),
                    ("Component libraries", "Headless UI, Radix, shadcn/ui — building accessible components", "article"),
                    ("Animations", "CSS transitions, Framer Motion, and micro-interactions", "article"),
                ],
            },
            {
                "title": "Testing & Deployment",
                "steps": [
                    ("Unit testing with Vitest", "Testing components, hooks, and utility functions", "article"),
                    ("Integration testing with Testing Library", "User-centric testing, async patterns, mocking", "article"),
                    ("E2E testing with Playwright", "Browser automation, visual regression, CI integration", "article"),
                    ("Build and deploy a full React app", "Vite build, environment variables, Vercel/Netlify deployment", "project"),
                ],
            },
        ],
    },

    # ===================================================================
    # 3. BACKEND DEVELOPMENT (Python)
    # ===================================================================
    {
        "title": "Backend Development with Python",
        "description": "Build production-grade APIs and services with Python. Covers FastAPI, databases, authentication, caching, async programming, and deploying scalable backend systems.",
        "difficulty": "intermediate",
        "estimated_hours": 110,
        "sections": [
            {
                "title": "Python Foundations for Backend",
                "steps": [
                    ("Python data structures", "Lists, dicts, sets, tuples, named tuples, dataclasses", "article"),
                    ("OOP in Python", "Classes, inheritance, magic methods, ABC, protocols", "article"),
                    ("Error handling and logging", "Exceptions, custom errors, structured logging", "article"),
                    ("Virtual environments and packaging", "venv, pip, pyproject.toml, dependency management", "article"),
                ],
            },
            {
                "title": "FastAPI & REST APIs",
                "steps": [
                    ("FastAPI fundamentals", "Routes, path/query params, request/response models with Pydantic", "article"),
                    ("Request validation and serialization", "Pydantic models, field validators, nested schemas", "article"),
                    ("Dependency injection", "FastAPI Depends, shared resources, database sessions", "article"),
                    ("Error handling and middleware", "Exception handlers, CORS, rate limiting, request logging", "article"),
                    ("Build a CRUD API", "Complete REST API with validation, pagination, and error handling", "project"),
                ],
            },
            {
                "title": "Databases & ORMs",
                "steps": [
                    ("SQL fundamentals", "SELECT, JOIN, GROUP BY, indexes, query optimization", "article"),
                    ("PostgreSQL deep dive", "Data types, JSON, full-text search, CTEs, window functions", "article"),
                    ("SQLAlchemy ORM", "Models, relationships, queries, migrations with Alembic", "article"),
                    ("Async database access", "asyncpg, async SQLAlchemy sessions, connection pooling", "article"),
                    ("Database design project", "Design and implement a normalized schema for a real application", "project"),
                ],
            },
            {
                "title": "Authentication & Security",
                "steps": [
                    ("Password hashing", "bcrypt, argon2, salt, and secure storage", "article"),
                    ("JWT authentication", "Access tokens, refresh tokens, token rotation", "article"),
                    ("OAuth2 integration", "GitHub/Google login, OAuth2 flow, token exchange", "article"),
                    ("API security best practices", "Input sanitization, rate limiting, CORS, HTTPS", "article"),
                ],
            },
            {
                "title": "Async Programming & Performance",
                "steps": [
                    ("asyncio fundamentals", "Coroutines, event loop, tasks, gather, semaphores", "article"),
                    ("Caching with Redis", "Cache patterns, TTL, invalidation strategies, pub/sub", "article"),
                    ("Background tasks", "Celery, FastAPI background tasks, task queues", "article"),
                    ("Performance profiling", "cProfile, py-spy, query analysis, N+1 problem", "article"),
                ],
            },
            {
                "title": "Testing & Deployment",
                "steps": [
                    ("Unit testing with pytest", "Fixtures, parametrize, mocking, async test patterns", "article"),
                    ("Integration and API testing", "TestClient, database fixtures, factory pattern", "article"),
                    ("Docker for Python apps", "Dockerfile, multi-stage builds, docker-compose", "article"),
                    ("CI/CD pipeline", "GitHub Actions, automated testing, deployment workflows", "article"),
                    ("Deploy a production API", "Full deployment with Docker, Nginx, and PostgreSQL", "project"),
                ],
            },
        ],
    },

    # ===================================================================
    # 4. SYSTEM DESIGN
    # ===================================================================
    {
        "title": "System Design Interview Prep",
        "description": "Learn to design large-scale distributed systems. Covers fundamental building blocks, scalability patterns, and walks through designing real systems like Twitter, Uber, and YouTube.",
        "difficulty": "advanced",
        "estimated_hours": 80,
        "sections": [
            {
                "title": "Fundamentals",
                "steps": [
                    ("Scalability basics", "Vertical vs horizontal scaling, load balancing, CDNs", "article"),
                    ("Networking essentials", "DNS, TCP/UDP, HTTP/2, WebSockets, REST vs gRPC", "article"),
                    ("CAP theorem and consistency models", "Strong vs eventual consistency, PACELC theorem", "article"),
                    ("Database fundamentals", "SQL vs NoSQL, sharding, replication, partitioning strategies", "article"),
                ],
            },
            {
                "title": "Building Blocks",
                "steps": [
                    ("Load balancers", "L4 vs L7, consistent hashing, health checks, algorithms", "article"),
                    ("Caching strategies", "Cache-aside, write-through, write-behind, CDN caching", "article"),
                    ("Message queues", "Kafka, RabbitMQ, pub/sub patterns, event-driven architecture", "article"),
                    ("Databases deep dive", "B-trees, LSM trees, indexing, query optimization, connection pooling", "article"),
                    ("Blob storage and CDNs", "S3, CloudFront, image optimization, pre-signed URLs", "article"),
                ],
            },
            {
                "title": "Key Concepts",
                "steps": [
                    ("Rate limiting", "Token bucket, sliding window, distributed rate limiting", "article"),
                    ("Consistent hashing", "Hash rings, virtual nodes, rebalancing", "article"),
                    ("Leader election", "Paxos, Raft, ZooKeeper, distributed consensus", "article"),
                    ("API design best practices", "REST, GraphQL, pagination, versioning, idempotency", "article"),
                    ("Monitoring and observability", "Metrics, logs, traces, alerting, SLOs", "article"),
                ],
            },
            {
                "title": "Design Exercises: Social & Messaging",
                "steps": [
                    ("Design a URL shortener", "Hashing, base62, analytics, read-heavy system", "project"),
                    ("Design Twitter/X news feed", "Fan-out, timeline generation, real-time updates", "project"),
                    ("Design a chat system (WhatsApp)", "WebSockets, presence, message delivery guarantees", "project"),
                    ("Design Instagram", "Image upload pipeline, feed ranking, explore page", "project"),
                ],
            },
            {
                "title": "Design Exercises: Infrastructure",
                "steps": [
                    ("Design a rate limiter service", "Distributed counting, Redis, token bucket", "project"),
                    ("Design a notification system", "Push, email, SMS — priority, dedup, delivery tracking", "project"),
                    ("Design YouTube/Netflix", "Video transcoding pipeline, adaptive streaming, CDN", "project"),
                    ("Design Uber/Lyft", "Geospatial indexing, matching, real-time tracking, ETA", "project"),
                ],
            },
            {
                "title": "Interview Framework",
                "steps": [
                    ("The system design interview process", "Clarify requirements, estimate scale, design high-level, dive deep", "article"),
                    ("Back-of-the-envelope estimation", "QPS, storage, bandwidth, memory calculations", "article"),
                    ("Common tradeoffs", "Consistency vs availability, latency vs throughput, cost vs performance", "article"),
                    ("Mock design practice", "Practice 3 full system design problems under time pressure", "project"),
                ],
            },
        ],
    },

    # ===================================================================
    # 5. DEVOPS & CLOUD
    # ===================================================================
    {
        "title": "DevOps & Cloud Engineering",
        "description": "Master modern DevOps practices — containers, orchestration, CI/CD, infrastructure as code, and cloud services. Build reliable, automated deployment pipelines from scratch.",
        "difficulty": "intermediate",
        "estimated_hours": 90,
        "sections": [
            {
                "title": "Linux & Networking Basics",
                "steps": [
                    ("Linux command line essentials", "File system, permissions, processes, shell scripting", "article"),
                    ("Networking fundamentals", "IP addressing, DNS, TCP/UDP, HTTP, firewalls, SSH", "article"),
                    ("Shell scripting", "Bash scripting, cron jobs, text processing with awk/sed", "article"),
                ],
            },
            {
                "title": "Containers with Docker",
                "steps": [
                    ("Docker fundamentals", "Images, containers, volumes, networking, Dockerfile best practices", "article"),
                    ("Multi-stage builds", "Optimize image size, security scanning, distroless images", "article"),
                    ("Docker Compose", "Multi-container apps, environment configs, local dev environments", "article"),
                    ("Containerize a full-stack app", "Docker setup for frontend + backend + database + Redis", "project"),
                ],
            },
            {
                "title": "Kubernetes",
                "steps": [
                    ("Kubernetes architecture", "Pods, services, deployments, namespaces, control plane", "article"),
                    ("Deployments and scaling", "Rolling updates, health checks, HPA, resource limits", "article"),
                    ("Services and networking", "ClusterIP, LoadBalancer, Ingress, service mesh basics", "article"),
                    ("ConfigMaps, secrets, and storage", "Configuration management, persistent volumes, StatefulSets", "article"),
                    ("Deploy an app on Kubernetes", "Full K8s deployment with Helm chart", "project"),
                ],
            },
            {
                "title": "CI/CD Pipelines",
                "steps": [
                    ("CI/CD concepts", "Continuous integration, delivery, deployment — why and how", "article"),
                    ("GitHub Actions", "Workflows, jobs, matrix builds, caching, reusable actions", "article"),
                    ("Pipeline best practices", "Fast feedback, parallel jobs, artifact management, security scanning", "article"),
                    ("Build a complete CI/CD pipeline", "Test, build, scan, deploy — fully automated", "project"),
                ],
            },
            {
                "title": "Infrastructure as Code",
                "steps": [
                    ("Terraform fundamentals", "Providers, resources, state, modules, workspaces", "article"),
                    ("AWS core services", "EC2, S3, RDS, VPC, IAM, Lambda, CloudFront", "article"),
                    ("Infrastructure project", "Provision a production environment with Terraform on AWS", "project"),
                ],
            },
            {
                "title": "Monitoring & Reliability",
                "steps": [
                    ("Observability stack", "Prometheus, Grafana, ELK stack, distributed tracing", "article"),
                    ("Alerting and incident response", "SLOs, SLIs, error budgets, on-call practices, postmortems", "article"),
                    ("Logging best practices", "Structured logging, log aggregation, correlation IDs", "article"),
                    ("Set up monitoring", "Deploy Prometheus + Grafana with dashboards and alerts", "project"),
                ],
            },
        ],
    },

    # ===================================================================
    # 6. MACHINE LEARNING
    # ===================================================================
    {
        "title": "Machine Learning Engineer Path",
        "description": "From math foundations to deploying ML models in production. Covers supervised/unsupervised learning, deep learning, NLP, computer vision, and MLOps best practices.",
        "difficulty": "advanced",
        "estimated_hours": 150,
        "sections": [
            {
                "title": "Mathematics for ML",
                "steps": [
                    ("Linear algebra essentials", "Vectors, matrices, eigenvalues, SVD — the math behind ML", "article"),
                    ("Probability and statistics", "Distributions, Bayes theorem, hypothesis testing, MLE", "article"),
                    ("Calculus for optimization", "Gradients, chain rule, partial derivatives, gradient descent", "article"),
                ],
            },
            {
                "title": "Python for Data Science",
                "steps": [
                    ("NumPy and vectorized computation", "Arrays, broadcasting, linear algebra operations", "article"),
                    ("Pandas for data wrangling", "DataFrames, groupby, merge, pivot, time series", "article"),
                    ("Data visualization", "Matplotlib, Seaborn, Plotly — effective chart design", "article"),
                    ("Exploratory data analysis project", "Complete EDA on a real-world dataset", "project"),
                ],
            },
            {
                "title": "Supervised Learning",
                "steps": [
                    ("Linear and logistic regression", "Cost functions, gradient descent, regularization", "article"),
                    ("Decision trees and random forests", "Entropy, information gain, bagging, feature importance", "article"),
                    ("Support vector machines", "Kernel trick, margin maximization, soft margin", "article"),
                    ("Gradient boosting", "XGBoost, LightGBM, hyperparameter tuning", "article"),
                    ("Classification project", "End-to-end ML pipeline: data prep, training, evaluation", "project"),
                ],
            },
            {
                "title": "Unsupervised Learning",
                "steps": [
                    ("Clustering algorithms", "K-means, DBSCAN, hierarchical clustering, silhouette score", "article"),
                    ("Dimensionality reduction", "PCA, t-SNE, UMAP — when and why to reduce dimensions", "article"),
                    ("Anomaly detection", "Isolation forest, autoencoders, statistical methods", "article"),
                ],
            },
            {
                "title": "Deep Learning",
                "steps": [
                    ("Neural network fundamentals", "Perceptrons, activation functions, backpropagation", "article"),
                    ("PyTorch essentials", "Tensors, autograd, nn.Module, training loop, DataLoader", "article"),
                    ("Convolutional neural networks", "CNNs for image classification, transfer learning, ResNet", "article"),
                    ("Recurrent networks and attention", "RNN, LSTM, transformer architecture, self-attention", "article"),
                    ("Image classification project", "Train a CNN on a real dataset with data augmentation", "project"),
                ],
            },
            {
                "title": "NLP & Large Language Models",
                "steps": [
                    ("Text preprocessing", "Tokenization, embeddings, Word2Vec, GloVe", "article"),
                    ("Transformer architecture", "Attention mechanism, positional encoding, BERT, GPT", "article"),
                    ("Fine-tuning LLMs", "Hugging Face Transformers, LoRA, prompt engineering", "article"),
                    ("RAG (Retrieval Augmented Generation)", "Vector databases, embeddings, chunking strategies", "article"),
                    ("Build an NLP application", "Sentiment analysis or text classification pipeline", "project"),
                ],
            },
            {
                "title": "MLOps & Production ML",
                "steps": [
                    ("Model serving", "Flask/FastAPI serving, ONNX, TensorRT, batching", "article"),
                    ("Experiment tracking", "MLflow, Weights & Biases, model versioning", "article"),
                    ("ML pipelines", "Feature stores, data validation, training pipelines", "article"),
                    ("Monitoring ML systems", "Data drift detection, model performance monitoring", "article"),
                    ("Deploy an ML model", "End-to-end: train, package, deploy, monitor", "project"),
                ],
            },
        ],
    },

    # ===================================================================
    # 7. FULL STACK DEVELOPMENT
    # ===================================================================
    {
        "title": "Full Stack Web Development",
        "description": "Build complete web applications from database to deployment. Covers React frontend, Node.js/Python backend, databases, authentication, and cloud deployment — everything needed to ship real products.",
        "difficulty": "beginner",
        "estimated_hours": 140,
        "sections": [
            {
                "title": "Web Fundamentals",
                "steps": [
                    ("How the web works", "HTTP, DNS, browsers, client-server model, request lifecycle", "article"),
                    ("HTML5 and semantic markup", "Document structure, forms, accessibility, SEO basics", "article"),
                    ("CSS3 and responsive design", "Flexbox, grid, media queries, mobile-first approach", "article"),
                    ("JavaScript essentials", "ES6+, DOM manipulation, events, async/await", "article"),
                    ("Build a static website", "Multi-page responsive site with HTML, CSS, and JS", "project"),
                ],
            },
            {
                "title": "Frontend with React",
                "steps": [
                    ("React core concepts", "Components, props, state, hooks, JSX", "article"),
                    ("Routing and navigation", "React Router, protected routes, lazy loading", "article"),
                    ("State management", "Context API, useReducer, Zustand/Redux Toolkit", "article"),
                    ("API integration", "Axios/fetch, React Query, loading/error states", "article"),
                    ("Build a frontend app", "Dashboard with authentication, data fetching, and forms", "project"),
                ],
            },
            {
                "title": "Backend API Development",
                "steps": [
                    ("REST API design", "Resources, HTTP methods, status codes, pagination, versioning", "article"),
                    ("Node.js with Express (or FastAPI)", "Routing, middleware, request handling, validation", "article"),
                    ("Database integration", "PostgreSQL/MongoDB, ORMs, migrations, query optimization", "article"),
                    ("Authentication system", "JWT tokens, password hashing, OAuth2, session management", "article"),
                    ("Build a REST API", "Full CRUD API with auth, validation, and error handling", "project"),
                ],
            },
            {
                "title": "Database Mastery",
                "steps": [
                    ("Relational database design", "Normalization, relationships, indexes, constraints", "article"),
                    ("SQL query mastery", "JOINs, subqueries, CTEs, window functions, optimization", "article"),
                    ("NoSQL databases", "MongoDB, Redis — document stores, key-value, when to use each", "article"),
                    ("Database project", "Design and implement a schema for a social media app", "project"),
                ],
            },
            {
                "title": "Real-World Features",
                "steps": [
                    ("File uploads and storage", "Multipart forms, S3, image processing, CDN delivery", "article"),
                    ("Real-time features", "WebSockets, Server-Sent Events, Socket.io, live updates", "article"),
                    ("Search implementation", "Full-text search, Elasticsearch basics, search UI patterns", "article"),
                    ("Email and notifications", "Transactional email, push notifications, in-app messages", "article"),
                ],
            },
            {
                "title": "Testing & Quality",
                "steps": [
                    ("Frontend testing", "Unit tests, component tests, E2E with Playwright", "article"),
                    ("Backend testing", "API tests, integration tests, database fixtures", "article"),
                    ("Code quality tools", "ESLint, Prettier, TypeScript strict mode, pre-commit hooks", "article"),
                ],
            },
            {
                "title": "Deployment & DevOps",
                "steps": [
                    ("Docker for full-stack apps", "Containerize frontend, backend, and database", "article"),
                    ("CI/CD with GitHub Actions", "Automated testing, building, and deployment", "article"),
                    ("Cloud deployment", "Deploy to AWS/Vercel/Railway with custom domain and HTTPS", "article"),
                    ("Capstone: Ship a full-stack app", "Complete project: idea to production with all skills combined", "project"),
                ],
            },
        ],
    },

    # ===================================================================
    # 8. CYBERSECURITY
    # ===================================================================
    {
        "title": "Cybersecurity Fundamentals",
        "description": "Learn defensive and offensive security concepts. Covers web security, network security, cryptography, penetration testing basics, and security engineering practices for developers.",
        "difficulty": "intermediate",
        "estimated_hours": 70,
        "sections": [
            {
                "title": "Security Foundations",
                "steps": [
                    ("CIA triad and security principles", "Confidentiality, integrity, availability, defense in depth", "article"),
                    ("Threat modeling", "STRIDE, attack surfaces, risk assessment, security requirements", "article"),
                    ("Networking for security", "OSI model, TCP/IP, firewalls, VPNs, packet analysis", "article"),
                ],
            },
            {
                "title": "Web Application Security",
                "steps": [
                    ("OWASP Top 10", "Injection, XSS, CSRF, broken auth, security misconfigurations", "article"),
                    ("SQL injection deep dive", "Types of SQLi, prevention with parameterized queries, ORMs", "article"),
                    ("Cross-site scripting (XSS)", "Reflected, stored, DOM-based XSS and prevention strategies", "article"),
                    ("Authentication vulnerabilities", "Brute force, session hijacking, insecure token storage", "article"),
                    ("Secure a web application", "Audit and fix vulnerabilities in a deliberately insecure app", "project"),
                ],
            },
            {
                "title": "Cryptography",
                "steps": [
                    ("Symmetric encryption", "AES, block ciphers, modes of operation, key management", "article"),
                    ("Asymmetric encryption", "RSA, elliptic curves, digital signatures, certificates", "article"),
                    ("Hashing and integrity", "SHA-256, HMAC, password hashing (bcrypt, argon2), salting", "article"),
                    ("TLS/HTTPS", "Certificate chain, TLS handshake, cipher suites, HSTS", "article"),
                ],
            },
            {
                "title": "Infrastructure Security",
                "steps": [
                    ("Linux hardening", "User management, SSH keys, firewall rules, audit logs", "article"),
                    ("Container security", "Image scanning, least privilege, secrets management, runtime security", "article"),
                    ("Cloud security", "IAM policies, security groups, encryption at rest/transit, logging", "article"),
                ],
            },
            {
                "title": "Penetration Testing Basics",
                "steps": [
                    ("Reconnaissance", "OSINT, port scanning, service enumeration, DNS recon", "article"),
                    ("Vulnerability assessment", "Scanning tools, CVE databases, risk scoring", "article"),
                    ("Exploitation basics", "Common exploits, privilege escalation, lateral movement", "article"),
                    ("CTF challenge practice", "Solve beginner-level Capture The Flag challenges", "project"),
                ],
            },
            {
                "title": "Security Engineering",
                "steps": [
                    ("Secure SDLC", "Security in CI/CD, SAST/DAST, dependency scanning", "article"),
                    ("Incident response", "Detection, containment, eradication, recovery, post-incident review", "article"),
                    ("Security monitoring", "SIEM, log analysis, anomaly detection, alerting", "article"),
                ],
            },
        ],
    },

    # ===================================================================
    # 9. MOBILE DEVELOPMENT
    # ===================================================================
    {
        "title": "Cross-Platform Mobile Development",
        "description": "Build native-quality mobile apps for iOS and Android using React Native and Flutter. Covers navigation, state management, native APIs, offline storage, and app store deployment.",
        "difficulty": "intermediate",
        "estimated_hours": 85,
        "sections": [
            {
                "title": "Mobile Development Foundations",
                "steps": [
                    ("Mobile platform overview", "iOS vs Android, native vs cross-platform, when to use each", "article"),
                    ("Mobile UX principles", "Touch targets, navigation patterns, platform conventions", "article"),
                    ("Development environment setup", "Xcode, Android Studio, simulators, debugging tools", "article"),
                ],
            },
            {
                "title": "React Native Core",
                "steps": [
                    ("React Native fundamentals", "Components, styling, platform-specific code, Expo vs bare", "article"),
                    ("Navigation", "React Navigation — stack, tab, drawer navigators, deep linking", "article"),
                    ("State management in mobile", "Zustand, Redux Toolkit, React Query for mobile", "article"),
                    ("Native modules", "Accessing camera, location, sensors, and file system", "article"),
                    ("Build a mobile app with React Native", "Social media app with auth, feed, and camera integration", "project"),
                ],
            },
            {
                "title": "Flutter Essentials",
                "steps": [
                    ("Dart language basics", "Types, null safety, async, collections, classes", "article"),
                    ("Flutter widget system", "Stateless vs stateful, layout widgets, Material vs Cupertino", "article"),
                    ("Flutter state management", "Provider, Riverpod, BLoC pattern comparison", "article"),
                    ("Build a Flutter app", "E-commerce app with product listing, cart, and checkout", "project"),
                ],
            },
            {
                "title": "Advanced Mobile Topics",
                "steps": [
                    ("Offline-first architecture", "SQLite, Hive, offline sync, optimistic updates", "article"),
                    ("Push notifications", "FCM, APNs, local notifications, notification channels", "article"),
                    ("Performance optimization", "FlatList, image caching, bundle size, startup time", "article"),
                    ("Animations and gestures", "Animated API, Reanimated, gesture handlers, shared transitions", "article"),
                ],
            },
            {
                "title": "Testing & Deployment",
                "steps": [
                    ("Mobile testing strategies", "Unit tests, widget tests, integration tests, detox/patrol", "article"),
                    ("App Store submission", "iOS App Store and Google Play — requirements, screenshots, review", "article"),
                    ("CI/CD for mobile", "Fastlane, EAS Build, automated testing and deployment", "article"),
                    ("Ship a mobile app", "Complete deployment to both app stores", "project"),
                ],
            },
        ],
    },

    # ===================================================================
    # 10. DATABASE ENGINEERING
    # ===================================================================
    {
        "title": "Database Engineering Deep Dive",
        "description": "Master database internals, query optimization, and data modeling. Covers SQL, NoSQL, distributed databases, indexing strategies, and how to design schemas that scale.",
        "difficulty": "advanced",
        "estimated_hours": 75,
        "sections": [
            {
                "title": "Relational Database Fundamentals",
                "steps": [
                    ("Relational model theory", "Relations, normalization (1NF-BCNF), functional dependencies", "article"),
                    ("SQL mastery", "Complex joins, subqueries, CTEs, window functions, EXPLAIN", "article"),
                    ("PostgreSQL advanced features", "JSONB, array types, full-text search, partitioning", "article"),
                    ("Solve 10 SQL challenges", "Complex queries with joins, aggregations, and window functions", "problem"),
                ],
            },
            {
                "title": "Indexing & Query Optimization",
                "steps": [
                    ("How indexes work", "B-trees, hash indexes, GiST, GIN — when to use each", "article"),
                    ("Query execution plans", "EXPLAIN ANALYZE, sequential vs index scan, join algorithms", "article"),
                    ("Index design strategies", "Composite indexes, covering indexes, partial indexes", "article"),
                    ("Optimization project", "Profile and optimize slow queries in a real application", "project"),
                ],
            },
            {
                "title": "Database Internals",
                "steps": [
                    ("Storage engines", "B-tree vs LSM-tree, page layout, buffer pool management", "article"),
                    ("ACID and transactions", "Isolation levels, MVCC, write-ahead logging, crash recovery", "article"),
                    ("Concurrency control", "Locks, deadlocks, optimistic vs pessimistic concurrency", "article"),
                    ("Connection pooling", "PgBouncer, connection lifecycle, pool sizing", "article"),
                ],
            },
            {
                "title": "NoSQL Databases",
                "steps": [
                    ("Document stores (MongoDB)", "Schema design, aggregation pipeline, indexing, sharding", "article"),
                    ("Key-value stores (Redis)", "Data structures, caching patterns, pub/sub, persistence", "article"),
                    ("Wide-column stores (Cassandra)", "Partition keys, clustering, eventual consistency, compaction", "article"),
                    ("When to use NoSQL", "CAP theorem in practice, polyglot persistence, migration strategies", "article"),
                ],
            },
            {
                "title": "Distributed Databases",
                "steps": [
                    ("Replication strategies", "Single-leader, multi-leader, leaderless, conflict resolution", "article"),
                    ("Partitioning/Sharding", "Range, hash, directory-based partitioning, rebalancing", "article"),
                    ("Distributed transactions", "Two-phase commit, saga pattern, outbox pattern", "article"),
                    ("NewSQL and cloud databases", "CockroachDB, Spanner, Aurora — distributed SQL at scale", "article"),
                ],
            },
            {
                "title": "Data Modeling & Schema Design",
                "steps": [
                    ("Schema design patterns", "Star schema, event sourcing, EAV, polymorphic associations", "article"),
                    ("Migration strategies", "Zero-downtime migrations, expand-contract, backfills", "article"),
                    ("Design a database", "Complete schema design for a large-scale application", "project"),
                ],
            },
        ],
    },

    # ===================================================================
    # 11. COMPETITIVE PROGRAMMING
    # ===================================================================
    {
        "title": "Competitive Programming Bootcamp",
        "description": "Level up your competitive programming skills from beginner to advanced. Covers all major algorithmic topics, contest strategies, and practice problems from Codeforces, LeetCode, and USACO.",
        "difficulty": "advanced",
        "estimated_hours": 200,
        "sections": [
            {
                "title": "Getting Started",
                "steps": [
                    ("Choose your language (C++ recommended)", "I/O optimization, STL containers, template setup", "article"),
                    ("Online judge platforms", "Codeforces, AtCoder, LeetCode, USACO — how to practice effectively", "article"),
                    ("Brute force and simulation", "Complete search, implementation problems, simulation", "article"),
                    ("Solve 20 easy problems", "Build speed and confidence with straightforward problems", "problem"),
                ],
            },
            {
                "title": "Math & Number Theory",
                "steps": [
                    ("Modular arithmetic", "Modular exponentiation, Fermat's little theorem, modular inverse", "article"),
                    ("Prime numbers and factorization", "Sieve of Eratosthenes, prime factorization, GCD/LCM", "article"),
                    ("Combinatorics", "Permutations, combinations, Pascal's triangle, inclusion-exclusion", "article"),
                    ("Solve 10 math problems", "Contest-style number theory and combinatorics problems", "problem"),
                ],
            },
            {
                "title": "Advanced Data Structures",
                "steps": [
                    ("Segment trees", "Point updates, range queries, lazy propagation", "article"),
                    ("Binary indexed trees (Fenwick)", "Prefix sums, range updates, 2D BIT", "article"),
                    ("Sparse tables and RMQ", "Range minimum query, LCA with sparse table", "article"),
                    ("Advanced trees", "Treaps, splay trees, link-cut trees", "article"),
                    ("Solve 10 data structure problems", "Segment tree and BIT practice problems", "problem"),
                ],
            },
            {
                "title": "Advanced Graph Algorithms",
                "steps": [
                    ("Strongly connected components", "Tarjan's and Kosaraju's algorithms, 2-SAT", "article"),
                    ("Network flow", "Max flow, min cut, Ford-Fulkerson, Dinic's algorithm", "article"),
                    ("Minimum spanning trees", "Kruskal's, Prim's, Boruvka's algorithms", "article"),
                    ("Shortest paths advanced", "Johnson's algorithm, SPFA, 0-1 BFS", "article"),
                    ("Solve 10 advanced graph problems", "Flow, SCC, and MST contest problems", "problem"),
                ],
            },
            {
                "title": "String Algorithms",
                "steps": [
                    ("KMP and Z-algorithm", "Pattern matching, failure function, Z-array", "article"),
                    ("Suffix arrays and LCP", "Construction algorithms, applications in string problems", "article"),
                    ("Aho-Corasick", "Multi-pattern matching, dictionary automaton", "article"),
                    ("Hashing for strings", "Rabin-Karp, polynomial hashing, double hashing", "article"),
                ],
            },
            {
                "title": "Contest Strategy",
                "steps": [
                    ("Reading and understanding problems", "Identify problem type, edge cases, constraints analysis", "article"),
                    ("Time management in contests", "Problem selection, partial scoring, stress testing", "article"),
                    ("Debugging under pressure", "Common bugs, testing strategies, custom checkers", "article"),
                    ("Participate in 5 live contests", "Apply skills under competitive time pressure", "project"),
                ],
            },
        ],
    },

    # ===================================================================
    # 12. API DESIGN & MICROSERVICES
    # ===================================================================
    {
        "title": "API Design & Microservices Architecture",
        "description": "Design robust, scalable APIs and transition from monoliths to microservices. Covers REST, GraphQL, gRPC, API gateways, service mesh, and distributed system patterns.",
        "difficulty": "advanced",
        "estimated_hours": 65,
        "sections": [
            {
                "title": "API Design Principles",
                "steps": [
                    ("RESTful API design", "Resources, HTTP methods, status codes, HATEOAS, Richardson maturity", "article"),
                    ("API versioning strategies", "URL path, header, query param — tradeoffs and best practices", "article"),
                    ("Pagination and filtering", "Cursor vs offset, filtering, sorting, field selection", "article"),
                    ("Error handling patterns", "Problem Details RFC, error codes, validation errors", "article"),
                ],
            },
            {
                "title": "GraphQL",
                "steps": [
                    ("GraphQL fundamentals", "Schema, types, queries, mutations, subscriptions", "article"),
                    ("GraphQL server implementation", "Resolvers, data loaders, N+1 prevention, schema stitching", "article"),
                    ("GraphQL vs REST", "When to use each, hybrid approaches, BFF pattern", "article"),
                ],
            },
            {
                "title": "gRPC & Protocol Buffers",
                "steps": [
                    ("Protocol Buffers", "Message definitions, code generation, backward compatibility", "article"),
                    ("gRPC fundamentals", "Unary, streaming, bidirectional — when to use gRPC over REST", "article"),
                    ("gRPC in microservices", "Service-to-service communication, load balancing, deadlines", "article"),
                ],
            },
            {
                "title": "Microservices Patterns",
                "steps": [
                    ("Monolith to microservices", "Strangler fig, domain-driven decomposition, bounded contexts", "article"),
                    ("Inter-service communication", "Sync vs async, choreography vs orchestration, saga pattern", "article"),
                    ("API Gateway pattern", "Kong, Envoy — routing, rate limiting, authentication", "article"),
                    ("Event-driven architecture", "Event sourcing, CQRS, message brokers, idempotency", "article"),
                ],
            },
            {
                "title": "Resilience & Observability",
                "steps": [
                    ("Circuit breaker pattern", "Fault tolerance, fallbacks, retry with backoff", "article"),
                    ("Distributed tracing", "OpenTelemetry, Jaeger, trace context propagation", "article"),
                    ("Service mesh basics", "Istio/Linkerd — traffic management, mTLS, observability", "article"),
                    ("Design a microservices system", "Decompose a monolith into services with full architecture", "project"),
                ],
            },
        ],
    },
]


async def seed_roadmap(
    session: AsyncSession,
    roadmap_data: dict,
) -> str:
    """Seed a single roadmap with sections and steps. Returns 'added', 'skipped', or 'failed'."""
    slug = _make_slug(roadmap_data["title"])

    # Idempotency check
    existing = await session.execute(select(Roadmap).where(Roadmap.slug == slug))
    if existing.scalar_one_or_none() is not None:
        return "skipped"

    try:
        roadmap = Roadmap(
            title=roadmap_data["title"],
            slug=slug,
            description=roadmap_data["description"],
            difficulty=roadmap_data["difficulty"],
            estimated_hours=roadmap_data["estimated_hours"],
            is_published=True,
            author_id=None,
        )
        session.add(roadmap)
        await session.flush()

        order = 0
        total_steps = 0

        for section_data in roadmap_data["sections"]:
            # Add the section header as a step with resource_type='section'
            section_step = RoadmapStep(
                roadmap_id=roadmap.id,
                title=section_data["title"],
                description="",
                order=order,
                resource_type="section",
            )
            session.add(section_step)
            order += 1

            # Add child steps
            for step_title, step_desc, step_type in section_data["steps"]:
                step = RoadmapStep(
                    roadmap_id=roadmap.id,
                    title=step_title,
                    description=step_desc,
                    order=order,
                    resource_type=step_type,
                )
                session.add(step)
                order += 1
                total_steps += 1

        roadmap.step_count = total_steps
        await session.flush()
        return "added"

    except Exception as exc:
        print(f"  ERROR seeding {roadmap_data['title']}: {exc}")
        return "failed"


async def main() -> None:
    settings = get_settings()

    engine = create_async_engine(settings.DATABASE_URL, echo=False)
    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    added = skipped = failed = 0
    total = len(ROADMAPS)

    print(f"Seeding {total} roadmaps ...\n")

    async with session_factory() as session:
        for i, roadmap_data in enumerate(ROADMAPS, 1):
            result = await seed_roadmap(session, roadmap_data)

            if result == "added":
                added += 1
                sections = len(roadmap_data["sections"])
                steps = sum(len(s["steps"]) for s in roadmap_data["sections"])
                print(f"  [{i}/{total}] + {roadmap_data['title']} ({sections} sections, {steps} steps)")
            elif result == "skipped":
                skipped += 1
                print(f"  [{i}/{total}] ~ {roadmap_data['title']} (exists)")
            else:
                failed += 1
                print(f"  [{i}/{total}] ! {roadmap_data['title']} (failed)")

        await session.commit()

    await engine.dispose()

    print(f"\nSeeded {added} roadmaps ({skipped} skipped, {failed} failed)")


if __name__ == "__main__":
    asyncio.run(main())
