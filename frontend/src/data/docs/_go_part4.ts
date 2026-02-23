import type { DocCategory } from './types';

// Part 4: Concurrency + Packages
export const GO_PART4_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Concurrency                                                  */
  /* ------------------------------------------------------------ */
  {
    id: 'concurrency',
    label: 'Concurrency',
    icon: 'Zap',
    entries: [
      {
        id: 'goroutines',
        title: 'Goroutines',
        difficulty: 'intermediate',
        tags: ['goroutine', 'concurrency', 'go-keyword', 'lightweight-thread'],
        cheatSheetSummary:
          'Launch with `go func()`. Lightweight (~2KB stack). Use `sync.WaitGroup` to wait. Never use `time.Sleep` for synchronization in production.',
        crossLanguageId: 'goroutines',
        sections: [
          {
            heading: 'Goroutine Basics',
            content:
              'Goroutines are lightweight threads managed by the Go runtime, not the OS. Starting a goroutine costs only about 2KB of stack (vs ~1MB for OS threads), so you can launch thousands or millions. Use the `go` keyword before a function call to run it concurrently.',
            code: `package main

import (
    "fmt"
    "sync"
)

func greet(name string, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Printf("Hello from %s\\n", name)
}

func main() {
    var wg sync.WaitGroup

    names := []string{"Alice", "Bob", "Charlie", "Diana"}
    for _, name := range names {
        wg.Add(1)
        go greet(name, &wg)
    }

    wg.Wait() // wait for all goroutines
    fmt.Println("All goroutines finished")
}`,
            output: `Hello from Diana
Hello from Alice
Hello from Bob
Hello from Charlie
All goroutines finished`,
            tip: 'The output order is nondeterministic -- goroutines run concurrently and may execute in any order.',
            analogy: 'Think of it like sending out party invitations: each goroutine is a messenger who runs off independently to deliver one invitation. They all work at the same time, and you use a WaitGroup like a checklist to track when everyone has reported back.',
            diagram: {
              kind: 'mermaid',
              code: 'sequenceDiagram\n    participant Main as main()\n    participant WG as WaitGroup\n    participant G1 as goroutine 1\n    participant G2 as goroutine 2\n    participant G3 as goroutine 3\n    Main->>WG: Add(1)\n    Main->>G1: go greet("Alice")\n    Main->>WG: Add(1)\n    Main->>G2: go greet("Bob")\n    Main->>WG: Add(1)\n    Main->>G3: go greet("Charlie")\n    Main->>WG: Wait()\n    Note over Main: blocked\n    G1-->>WG: Done()\n    G3-->>WG: Done()\n    G2-->>WG: Done()\n    WG-->>Main: unblocked\n    Note over Main: "All goroutines finished"',
              caption: 'main() launches goroutines and blocks on Wait(). Each goroutine calls Done() when finished. Wait() unblocks only after all goroutines complete.',
            },
            codeHighlightLines: [18, 19, 22],
          },
          {
            heading: 'Anonymous Goroutines',
            content:
              'You can launch anonymous functions as goroutines. This is common for short, one-off concurrent tasks. Be careful with loop variables -- pass them as parameters to avoid closure capture issues.',
            code: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup

    // Anonymous goroutine
    wg.Add(1)
    go func() {
        defer wg.Done()
        fmt.Println("Anonymous goroutine")
    }()

    // Loop with goroutines (pass variable as parameter)
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            fmt.Printf("Worker %d\\n", n)
        }(i) // pass i as argument
    }

    wg.Wait()
    fmt.Println("Done")
}`,
            output: `Anonymous goroutine
Worker 4
Worker 0
Worker 1
Worker 2
Worker 3
Done`,
            warning: 'Always pass loop variables as parameters to goroutine closures (before Go 1.22). Without this, all goroutines may see the final value of the loop variable.',
            codeHighlightLines: [12, 13, 14, 15, 16, 21, 24],
          },
          {
            heading: 'Goroutine Lifecycle',
            content:
              'A goroutine runs until its function returns or the program exits. There is no way to forcefully stop a goroutine from outside -- you must use cancellation signals (channels or context). Leaked goroutines are a common bug that wastes memory.',
            code: `package main

import (
    "context"
    "fmt"
    "time"
)

func worker(ctx context.Context, id int) {
    for {
        select {
        case <-ctx.Done():
            fmt.Printf("Worker %d stopped: %v\\n", id, ctx.Err())
            return
        default:
            fmt.Printf("Worker %d working...\\n", id)
            time.Sleep(200 * time.Millisecond)
        }
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
    defer cancel()

    for i := 1; i <= 3; i++ {
        go worker(ctx, i)
    }

    // Wait for context to expire
    <-ctx.Done()
    time.Sleep(100 * time.Millisecond) // let workers print stop message
    fmt.Println("All workers stopped")
}`,
            output: `Worker 1 working...
Worker 2 working...
Worker 3 working...
Worker 1 working...
Worker 3 working...
Worker 2 working...
Worker 1 stopped: context deadline exceeded
Worker 2 stopped: context deadline exceeded
Worker 3 stopped: context deadline exceeded
All workers stopped`,
            tip: 'Always provide a way to stop goroutines (context cancellation or a done channel). Goroutines that run forever without a stop mechanism are goroutine leaks.',
            analogy: 'Think of it like workers on an assembly line with a walkie-talkie: each worker keeps working until they hear "stop" over the radio (ctx.Done). If you forget to give them a radio, they will work forever even after the factory closes.',
            codeHighlightLines: [12, 13, 14, 23],
          },
        ],
        quiz: [
          {
            question: 'What is the approximate initial stack size of a goroutine?',
            options: ['1 MB', '2 KB', '64 KB', '512 bytes'],
            correctIndex: 1,
            explanation:
              'Goroutines start with approximately 2 KB of stack space, which is much smaller than the ~1 MB default for OS threads. This allows Go programs to run thousands or millions of goroutines concurrently.',
          },
          {
            question: 'What is the purpose of sync.WaitGroup in goroutine management?',
            options: [
              'To limit the number of goroutines running concurrently',
              'To wait for a collection of goroutines to finish before proceeding',
              'To share data between goroutines safely',
              'To cancel goroutines from outside',
            ],
            correctIndex: 1,
            explanation:
              'sync.WaitGroup is used to wait for a collection of goroutines to finish. You call Add(1) before launching each goroutine, Done() when each finishes, and Wait() blocks until all are complete.',
          },
          {
            question: 'Why should you pass loop variables as parameters to goroutine closures (before Go 1.22)?',
            options: [
              'To improve performance',
              'Because closures cannot access outer variables',
              'To avoid all goroutines seeing the final value of the loop variable',
              'Because Go requires function arguments for goroutines',
            ],
            correctIndex: 2,
            explanation:
              'Without passing loop variables as parameters, all goroutine closures capture the same variable. By the time they execute, the loop may have finished, so they all see the final value. Passing as a parameter creates a copy for each goroutine.',
          },
          {
            question: 'How can you gracefully stop a goroutine from outside?',
            options: [
              'Call goroutine.Stop()',
              'Use runtime.KillGoroutine()',
              'Use context cancellation or a done channel',
              'Use sync.Mutex to lock the goroutine',
            ],
            correctIndex: 2,
            explanation:
              'There is no way to forcefully stop a goroutine from outside. You must use cooperative cancellation via context.Context or a done channel. The goroutine checks for the cancellation signal and returns voluntarily.',
          },
        ],
        challenge: {
          prompt:
            'Write a program that launches 5 goroutines, each computing the factorial of a number (1 through 5). Use a sync.WaitGroup to wait for all goroutines to finish and print each result.',
          starterCode: `package main

import (
    "fmt"
    "sync"
)

func factorial(n int, wg *sync.WaitGroup) {
    defer wg.Done()
    // TODO: compute factorial of n and print the result
}

func main() {
    var wg sync.WaitGroup

    for i := 1; i <= 5; i++ {
        // TODO: launch goroutine for each number
    }

    // TODO: wait for all goroutines to finish
    fmt.Println("All factorials computed")
}`,
          solutionCode: `package main

import (
    "fmt"
    "sync"
)

func factorial(n int, wg *sync.WaitGroup) {
    defer wg.Done()
    result := 1
    for i := 2; i <= n; i++ {
        result *= i
    }
    fmt.Printf("%d! = %d\\n", n, result)
}

func main() {
    var wg sync.WaitGroup

    for i := 1; i <= 5; i++ {
        wg.Add(1)
        go factorial(i, &wg)
    }

    wg.Wait()
    fmt.Println("All factorials computed")
}`,
          hints: [
            'Use wg.Add(1) before launching each goroutine with the go keyword.',
            'Compute the factorial by multiplying all integers from 2 to n in a loop.',
            'Call wg.Wait() in main to block until all goroutines have called wg.Done().',
          ],
        },
      },
      {
        id: 'channels',
        title: 'Channels',
        difficulty: 'intermediate',
        tags: ['channel', 'unbuffered', 'send', 'receive', 'close'],
        cheatSheetSummary:
          'Create: `ch := make(chan T)`. Send: `ch <- val`. Receive: `val := <-ch`. Close: `close(ch)`. Range loops until closed.',
        crossLanguageId: 'channels',
        sections: [
          {
            heading: 'Unbuffered Channels',
            content:
              'Channels are Go\'s primary mechanism for goroutine communication. An unbuffered channel blocks the sender until a receiver is ready, and vice versa. This blocking behavior provides built-in synchronization.',
            code: `package main

import "fmt"

func main() {
    ch := make(chan string) // unbuffered

    // Sender goroutine
    go func() {
        ch <- "hello" // blocks until receiver ready
        ch <- "world"
        close(ch) // signal no more values
    }()

    // Receive until closed
    for msg := range ch {
        fmt.Println("Received:", msg)
    }
    fmt.Println("Channel closed")
}`,
            output: `Received: hello
Received: world
Channel closed`,
            tip: 'Always close channels from the sender side, never the receiver. Sending on a closed channel panics. Receiving from a closed channel returns the zero value.',
            analogy: 'Think of it like a relay race baton handoff: the sender must wait until the receiver is reaching out, and the receiver must wait until the sender is handing off. Neither can proceed alone -- they synchronize at the handoff point.',
            diagram: {
              kind: 'mermaid',
              code: 'sequenceDiagram\n    participant Sender as Sender goroutine\n    participant Ch as chan string\n    participant Main as main()\n    Sender->>Ch: ch <- "hello"\n    Note over Sender,Ch: sender blocks until...\n    Ch->>Main: msg := <-ch\n    Note over Ch,Main: ...receiver reads\n    Main->>Main: Println("Received: hello")\n    Sender->>Ch: ch <- "world"\n    Ch->>Main: msg := <-ch\n    Main->>Main: Println("Received: world")\n    Sender->>Ch: close(ch)\n    Ch-->>Main: range loop exits\n    Main->>Main: Println("Channel closed")',
              caption: 'Unbuffered channel synchronization: each send blocks until the corresponding receive is ready, creating a handshake between sender and receiver.',
            },
            codeHighlightLines: [6, 10, 11, 12, 16],
          },
          {
            heading: 'Directional Channels',
            content:
              'Channel parameters can be directional: `chan<- T` is send-only, `<-chan T` is receive-only. This prevents misuse at compile time. Use directional types in function signatures for clarity and safety.',
            code: `package main

import "fmt"

// Producer: can only send
func produce(ch chan<- int, n int) {
    for i := 0; i < n; i++ {
        ch <- i * i
    }
    close(ch)
}

// Consumer: can only receive
func consume(ch <-chan int) []int {
    var results []int
    for v := range ch {
        results = append(results, v)
    }
    return results
}

func main() {
    ch := make(chan int) // bidirectional

    go produce(ch, 5) // automatically converts to send-only
    results := consume(ch) // automatically converts to receive-only

    fmt.Println("Results:", results)
}`,
            output: `Results: [0 1 4 9 16]`,
            note: 'A bidirectional channel is automatically converted to a directional channel when passed to a function. The reverse is not allowed.',
            codeHighlightLines: [6, 14],
          },
          {
            heading: 'Channel Patterns: Fan-Out/Fan-In',
            content:
              'Fan-out distributes work across multiple goroutines. Fan-in collects results from multiple channels into one. This is the foundation of concurrent pipelines in Go.',
            code: `package main

import (
    "fmt"
    "sync"
)

// Fan-out: distribute work to multiple workers
// Fan-in: collect results into one channel
func fanIn(channels ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    merged := make(chan int)

    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c {
                merged <- v
            }
        }(ch)
    }

    go func() {
        wg.Wait()
        close(merged)
    }()

    return merged
}

func worker(id int, jobs <-chan int) <-chan int {
    results := make(chan int)
    go func() {
        defer close(results)
        for j := range jobs {
            results <- j * j // process job
        }
    }()
    return results
}

func main() {
    jobs := make(chan int, 10)

    // Fan-out: 3 workers
    w1 := worker(1, jobs)
    w2 := worker(2, jobs)
    w3 := worker(3, jobs)

    // Send jobs
    go func() {
        for i := 1; i <= 9; i++ {
            jobs <- i
        }
        close(jobs)
    }()

    // Fan-in: merge results
    for result := range fanIn(w1, w2, w3) {
        fmt.Print(result, " ")
    }
    fmt.Println()
}`,
            output: `1 4 9 16 25 36 49 64 81`,
            tip: 'Fan-out/fan-in is Go\'s answer to thread pools. Launch N workers reading from the same channel, then merge their output channels.',
            analogy: 'Think of it like a fast-food kitchen: orders (jobs) fan out to multiple cooks (workers) who prepare them in parallel, then all finished plates fan back in to a single counter (merged channel) for pickup.',
            diagram: {
              kind: 'mermaid',
              code: 'graph LR\n    Jobs["jobs channel"] --> W1["Worker 1"]\n    Jobs --> W2["Worker 2"]\n    Jobs --> W3["Worker 3"]\n    W1 --> FI["fanIn()"]\n    W2 --> FI\n    W3 --> FI\n    FI --> Out["merged channel"]\n    style Jobs fill:#dbeafe,stroke:#3b82f6\n    style W1 fill:#fef3c7,stroke:#f59e0b\n    style W2 fill:#fef3c7,stroke:#f59e0b\n    style W3 fill:#fef3c7,stroke:#f59e0b\n    style FI fill:#d1fae5,stroke:#10b981\n    style Out fill:#ede9fe,stroke:#8b5cf6',
              caption: 'Fan-out/Fan-in pattern: a single jobs channel fans out to multiple workers running concurrently, then fanIn() merges all worker outputs into one channel.',
            },
            codeHighlightLines: [10, 32, 46, 47, 48, 59],
          },
        ],
        quiz: [
          {
            question: 'What happens when you send on an unbuffered channel and no receiver is ready?',
            options: [
              'The value is discarded',
              'The program panics',
              'The sender goroutine blocks until a receiver is ready',
              'The value is buffered internally',
            ],
            correctIndex: 2,
            explanation:
              'An unbuffered channel blocks the sender until a receiver is ready, and vice versa. This blocking behavior provides built-in synchronization between goroutines.',
          },
          {
            question: 'What does a directional channel type `chan<- int` mean?',
            options: [
              'The channel can only receive int values',
              'The channel can only send int values',
              'The channel is bidirectional',
              'The channel is closed',
            ],
            correctIndex: 1,
            explanation:
              '`chan<- int` is a send-only channel. The arrow points into the channel, meaning you can only send values into it. `<-chan int` would be receive-only.',
          },
          {
            question: 'What happens when you receive from a closed channel?',
            options: [
              'The program panics',
              'It blocks forever',
              'It returns the zero value of the channel type',
              'It returns an error',
            ],
            correctIndex: 2,
            explanation:
              'Receiving from a closed channel returns the zero value of the channel element type immediately. You can use the two-value form `val, ok := <-ch` where ok is false if the channel is closed and empty.',
          },
        ],
        challenge: {
          prompt:
            'Create a pipeline with two stages using channels. Stage 1 generates numbers 1-5, stage 2 doubles each number. The main function should print the final results.',
          starterCode: `package main

import "fmt"

func generator(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        // TODO: send each number to out and close the channel
    }()
    return out
}

func doubler(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        // TODO: read from in, double each value, send to out, then close
    }()
    return out
}

func main() {
    // TODO: create pipeline: generator -> doubler -> print
}`,
          solutionCode: `package main

import "fmt"

func generator(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

func doubler(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for v := range in {
            out <- v * 2
        }
        close(out)
    }()
    return out
}

func main() {
    ch := generator(1, 2, 3, 4, 5)
    doubled := doubler(ch)

    for result := range doubled {
        fmt.Println(result)
    }
}`,
          hints: [
            'In the generator, use a for range loop over nums and send each value to the out channel, then close it.',
            'In the doubler, use for v := range in to read values, multiply by 2, and send to out.',
            'Chain the functions: pass generator output as input to doubler, then range over doubler output in main.',
          ],
        },
      },
      {
        id: 'buffered-channels',
        title: 'Buffered Channels',
        difficulty: 'intermediate',
        tags: ['buffered-channel', 'capacity', 'semaphore', 'backpressure'],
        cheatSheetSummary:
          'Create with capacity: `make(chan T, n)`. Blocks sender only when full. Use as semaphore: `make(chan struct{}, maxConcurrency)`.',
        crossLanguageId: 'buffered-channels',
        sections: [
          {
            heading: 'Buffered Channel Basics',
            content:
              'Buffered channels have a capacity and only block the sender when the buffer is full. They decouple producers and consumers, allowing bursts of work. Create them with `make(chan T, capacity)`.',
            code: `package main

import "fmt"

func main() {
    // Buffered channel with capacity 3
    ch := make(chan int, 3)

    // Non-blocking sends (buffer has room)
    ch <- 1
    ch <- 2
    ch <- 3
    // ch <- 4 would block (buffer full)

    fmt.Println("Length:", len(ch)) // items in buffer
    fmt.Println("Capacity:", cap(ch))

    // Receive
    fmt.Println(<-ch) // 1 (FIFO)
    fmt.Println(<-ch) // 2
    fmt.Println(<-ch) // 3

    fmt.Println("Empty, length:", len(ch))
}`,
            output: `Length: 3
Capacity: 3
1
2
3
Empty, length: 0`,
            tip: 'Buffered channels are useful when the producer is faster than the consumer. The buffer absorbs bursts without blocking the producer.',
            analogy: 'Think of it like a mailbox with a fixed number of slots: you can drop off letters (sends) without waiting for the mail carrier (receiver), as long as there is room. Once the mailbox is full, you must wait.',
            diagram: {
              kind: 'custom',
              type: 'queue',
              data: {
                label: 'Buffered Channel (cap=3)',
                items: [
                  { value: '1', status: 'active' },
                  { value: '2', status: 'active' },
                  { value: '3', status: 'active' },
                ],
                operations: [
                  { name: 'ch <- val', description: 'Send: enqueues at back (blocks if full)' },
                  { name: '<-ch', description: 'Receive: dequeues from front (blocks if empty)' },
                ],
                direction: 'left-to-right',
              },
              caption: 'Buffered channel as a FIFO queue: sends enqueue at the back, receives dequeue from the front. Blocks only when buffer is full (send) or empty (receive).',
            },
            codeHighlightLines: [7, 10, 11, 12],
          },
          {
            heading: 'Semaphore Pattern',
            content:
              'A buffered channel of empty structs acts as a semaphore, limiting concurrency to N goroutines. Acquire a slot by sending, release by receiving. This pattern prevents resource exhaustion.',
            code: `package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {
    const maxConcurrency = 3
    sem := make(chan struct{}, maxConcurrency)
    var wg sync.WaitGroup

    for i := 1; i <= 8; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()

            sem <- struct{}{} // acquire slot
            defer func() { <-sem }() // release slot

            fmt.Printf("Worker %d started\\n", id)
            time.Sleep(100 * time.Millisecond)
            fmt.Printf("Worker %d finished\\n", id)
        }(i)
    }

    wg.Wait()
    fmt.Println("All done")
}`,
            output: `Worker 3 started
Worker 1 started
Worker 2 started
Worker 1 finished
Worker 3 finished
Worker 4 started
Worker 5 started
Worker 2 finished
Worker 6 started
Worker 4 finished
Worker 5 finished
Worker 7 started
Worker 8 started
Worker 6 finished
Worker 7 finished
Worker 8 finished
All done`,
            tip: 'Use `chan struct{}` for semaphores. Empty structs use zero bytes per element, making the channel as memory-efficient as possible.',
            codeHighlightLines: [11, 19, 20],
          },
          {
            heading: 'When to Use Buffered vs Unbuffered',
            content:
              'Unbuffered channels provide synchronization -- both sides must be ready. Buffered channels provide decoupling -- the sender can proceed without waiting. Choose based on your synchronization needs.',
            code: `package main

import (
    "fmt"
    "time"
)

func main() {
    // Unbuffered: tight coupling (rendez-vous)
    sync := make(chan string)
    go func() {
        fmt.Println("Preparing data...")
        time.Sleep(50 * time.Millisecond)
        sync <- "data ready"
    }()
    msg := <-sync // blocks until sender sends
    fmt.Println("Received:", msg)

    // Buffered: loose coupling (fire and forget within capacity)
    events := make(chan string, 5)
    events <- "click"
    events <- "scroll"
    events <- "keypress"
    // Producer didn't need to wait for consumer

    // Consumer processes at its own pace
    for i := 0; i < 3; i++ {
        fmt.Println("Event:", <-events)
    }

    // Buffered for signaling (capacity 1)
    done := make(chan bool, 1)
    go func() {
        fmt.Println("Working...")
        done <- true // never blocks (buffer of 1)
    }()
    <-done
}`,
            output: `Preparing data...
Received: data ready
Event: click
Event: scroll
Event: keypress
Working...`,
            note: 'A common pattern: use buffered channels of capacity 1 (`make(chan T, 1)`) for signaling when you want the sender to never block.',
          },
        ],
        quiz: [
          {
            question: 'When does a send on a buffered channel block?',
            options: [
              'When the channel is empty',
              'When the buffer is full',
              'It never blocks',
              'When no goroutine is receiving',
            ],
            correctIndex: 1,
            explanation:
              'A buffered channel blocks the sender only when the buffer is full. If there is room in the buffer, the send proceeds immediately without blocking.',
          },
          {
            question: 'What type is idiomatic for a semaphore channel in Go?',
            options: [
              'chan bool',
              'chan int',
              'chan struct{}',
              'chan interface{}',
            ],
            correctIndex: 2,
            explanation:
              'chan struct{} is idiomatic for semaphores because empty structs use zero bytes of memory per element, making the channel as memory-efficient as possible.',
          },
          {
            question: 'How do you check how many items are currently in a buffered channel?',
            options: [
              'ch.Size()',
              'len(ch)',
              'cap(ch)',
              'ch.Count()',
            ],
            correctIndex: 1,
            explanation:
              'len(ch) returns the number of elements currently queued in the buffered channel. cap(ch) returns the total buffer capacity.',
          },
        ],
        challenge: {
          prompt:
            'Implement a rate limiter using a buffered channel as a semaphore. Allow at most 2 concurrent workers out of 6 total. Each worker should print its ID and simulate work with a brief message.',
          starterCode: `package main

import (
    "fmt"
    "sync"
)

func main() {
    const maxConcurrency = 2
    const totalWorkers = 6

    // TODO: create a semaphore using a buffered channel
    var wg sync.WaitGroup

    for i := 1; i <= totalWorkers; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            // TODO: acquire semaphore slot
            // TODO: print worker started
            // TODO: print worker finished
            // TODO: release semaphore slot
        }(i)
    }

    wg.Wait()
    fmt.Println("All workers done")
}`,
          solutionCode: `package main

import (
    "fmt"
    "sync"
)

func main() {
    const maxConcurrency = 2
    const totalWorkers = 6

    sem := make(chan struct{}, maxConcurrency)
    var wg sync.WaitGroup

    for i := 1; i <= totalWorkers; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            sem <- struct{}{} // acquire slot
            fmt.Printf("Worker %d started\\n", id)
            fmt.Printf("Worker %d finished\\n", id)
            <-sem // release slot
        }(i)
    }

    wg.Wait()
    fmt.Println("All workers done")
}`,
          hints: [
            'Create the semaphore with make(chan struct{}, maxConcurrency).',
            'Acquire a slot by sending an empty struct: sem <- struct{}{}',
            'Release a slot by receiving from the semaphore: <-sem',
          ],
        },
      },
      {
        id: 'select',
        title: 'Select',
        difficulty: 'intermediate',
        tags: ['select', 'multiplexing', 'timeout', 'non-blocking'],
        cheatSheetSummary:
          '`select` waits on multiple channels. First ready wins (random if multiple). `default` makes it non-blocking. Essential for timeouts.',
        crossLanguageId: 'select',
        sections: [
          {
            heading: 'Select Basics',
            content:
              '`select` is like a switch for channels. It waits on multiple channel operations and proceeds with whichever is ready first. If multiple are ready, one is chosen randomly. It is essential for timeouts, cancellation, and multiplexing.',
            code: `package main

import (
    "fmt"
    "time"
)

func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        time.Sleep(100 * time.Millisecond)
        ch1 <- "from channel 1"
    }()
    go func() {
        time.Sleep(200 * time.Millisecond)
        ch2 <- "from channel 2"
    }()

    // Wait for first result
    select {
    case msg := <-ch1:
        fmt.Println("Received:", msg)
    case msg := <-ch2:
        fmt.Println("Received:", msg)
    }
}`,
            output: `Received: from channel 1`,
            tip: 'When multiple cases are ready simultaneously, `select` picks one at random. This prevents starvation of any particular channel.',
            analogy: 'Think of it like waiting at a bus stop where multiple bus lines arrive: you board whichever bus comes first, regardless of which one you expected. Select does the same -- it takes whichever channel is ready first.',
            codeHighlightLines: [22, 23, 25],
          },
          {
            heading: 'Timeout and Non-Blocking Patterns',
            content:
              'Select enables timeout patterns with `time.After()` and non-blocking checks with `default`. These are fundamental concurrency patterns in Go.',
            code: `package main

import (
    "fmt"
    "time"
)

func main() {
    ch := make(chan string)

    go func() {
        time.Sleep(300 * time.Millisecond)
        ch <- "result"
    }()

    // Timeout pattern
    select {
    case msg := <-ch:
        fmt.Println("Got:", msg)
    case <-time.After(200 * time.Millisecond):
        fmt.Println("Timed out!")
    }

    // Non-blocking receive
    ch2 := make(chan int, 1)
    select {
    case v := <-ch2:
        fmt.Println("Received:", v)
    default:
        fmt.Println("No value available (non-blocking)")
    }

    // Non-blocking send
    ch3 := make(chan int, 1)
    ch3 <- 1 // fill buffer
    select {
    case ch3 <- 2:
        fmt.Println("Sent successfully")
    default:
        fmt.Println("Channel full, skipping send")
    }
}`,
            output: `Timed out!
No value available (non-blocking)
Channel full, skipping send`,
            tip: 'The `default` case makes select non-blocking. Without `default`, select blocks until at least one case is ready.',
            codeHighlightLines: [17, 20, 26, 29],
          },
          {
            heading: 'Select in Loops',
            content:
              'Select is commonly used inside infinite loops to continuously process events from multiple channels. This pattern is the backbone of event-driven Go programs, servers, and workers.',
            code: `package main

import (
    "context"
    "fmt"
    "time"
)

func eventLoop(ctx context.Context) {
    ticker := time.NewTicker(100 * time.Millisecond)
    defer ticker.Stop()

    msgs := make(chan string, 5)
    go func() {
        msgs <- "hello"
        time.Sleep(150 * time.Millisecond)
        msgs <- "world"
    }()

    for {
        select {
        case <-ctx.Done():
            fmt.Println("Event loop stopped:", ctx.Err())
            return
        case t := <-ticker.C:
            fmt.Printf("Tick at %s\\n", t.Format("15:04:05.000"))
        case msg := <-msgs:
            fmt.Println("Message:", msg)
        }
    }
}

func main() {
    ctx, cancel := context.WithTimeout(
        context.Background(), 350*time.Millisecond,
    )
    defer cancel()

    eventLoop(ctx)
}`,
            output: `Message: hello
Tick at 10:30:00.100
Tick at 10:30:00.200
Message: world
Tick at 10:30:00.300
Event loop stopped: context deadline exceeded`,
            note: '`select {}` (empty select) blocks forever. This is useful in main() when all work is in goroutines and you want the program to run indefinitely.',
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    Start["for loop begins"] --> Sel{"select"}\n    Sel -->|"ctx.Done()"| Stop["return - loop exits"]\n    Sel -->|"ticker.C"| Tick["handle tick event"]\n    Sel -->|"msgs"| Msg["handle message"]\n    Tick --> Sel\n    Msg --> Sel\n    style Start fill:#dbeafe,stroke:#3b82f6\n    style Sel fill:#fef3c7,stroke:#f59e0b\n    style Stop fill:#fca5a5,stroke:#dc2626\n    style Tick fill:#d1fae5,stroke:#10b981\n    style Msg fill:#ede9fe,stroke:#8b5cf6',
              caption: 'The event loop pattern: select inside an infinite for loop waits on multiple channels each iteration. Context cancellation provides the exit path.',
            },
          },
        ],
        quiz: [
          {
            question: 'What happens when multiple cases in a select statement are ready simultaneously?',
            options: [
              'The first case listed is always chosen',
              'The last case listed is always chosen',
              'One is chosen at random',
              'All ready cases execute in order',
            ],
            correctIndex: 2,
            explanation:
              'When multiple cases are ready simultaneously, select picks one at random. This prevents starvation of any particular channel and ensures fairness.',
          },
          {
            question: 'What does adding a `default` case to a select statement do?',
            options: [
              'It runs after all other cases complete',
              'It makes the select non-blocking',
              'It handles errors from channel operations',
              'It runs when the channel is closed',
            ],
            correctIndex: 1,
            explanation:
              'The default case makes select non-blocking. Without default, select blocks until at least one case is ready. With default, if no channel operation is ready, the default case runs immediately.',
          },
          {
            question: 'How do you implement a timeout pattern with select?',
            options: [
              'Using time.Sleep() inside a case',
              'Using a case with <-time.After(duration)',
              'Using a default case with a loop',
              'Using runtime.SetTimeout()',
            ],
            correctIndex: 1,
            explanation:
              'time.After(duration) returns a channel that receives a value after the specified duration. Combined with select, it provides a clean timeout pattern: if the main channel does not produce a result in time, the timeout case fires.',
          },
          {
            question: 'What does `select {}` (empty select) do?',
            options: [
              'Returns immediately',
              'Panics at runtime',
              'Blocks forever',
              'Compilation error',
            ],
            correctIndex: 2,
            explanation:
              'An empty select {} blocks forever because there are no cases to satisfy. This is useful in main() when all work is done in goroutines and you want the program to run indefinitely.',
          },
        ],
        challenge: {
          prompt:
            'Write a program that uses select to receive messages from two channels. One channel sends "ping" every 100ms and the other sends "pong" every 250ms. Use a timeout of 1 second to stop the program.',
          starterCode: `package main

import (
    "fmt"
    "time"
)

func main() {
    ping := make(chan string)
    pong := make(chan string)

    // TODO: launch goroutine that sends "ping" every 100ms
    // TODO: launch goroutine that sends "pong" every 250ms

    timeout := time.After(1 * time.Second)

    for {
        select {
        // TODO: handle ping, pong, and timeout cases
        }
    }
}`,
          solutionCode: `package main

import (
    "fmt"
    "time"
)

func main() {
    ping := make(chan string)
    pong := make(chan string)

    go func() {
        for {
            time.Sleep(100 * time.Millisecond)
            ping <- "ping"
        }
    }()
    go func() {
        for {
            time.Sleep(250 * time.Millisecond)
            pong <- "pong"
        }
    }()

    timeout := time.After(1 * time.Second)

    for {
        select {
        case msg := <-ping:
            fmt.Println(msg)
        case msg := <-pong:
            fmt.Println(msg)
        case <-timeout:
            fmt.Println("Timed out!")
            return
        }
    }
}`,
          hints: [
            'Launch goroutines that loop forever, sleeping and then sending to their respective channels.',
            'In the select, add a case for each channel that prints the received message.',
            'Add a case for <-timeout that prints a message and returns to exit the loop.',
          ],
        },
      },
      {
        id: 'sync-waitgroup',
        title: 'sync.WaitGroup',
        difficulty: 'intermediate',
        tags: ['waitgroup', 'sync', 'wait', 'goroutine-coordination'],
        cheatSheetSummary:
          'WaitGroup waits for goroutines: `wg.Add(1)` before launch, `defer wg.Done()` inside, `wg.Wait()` to block until all done.',
        crossLanguageId: 'sync-waitgroup',
        sections: [
          {
            heading: 'WaitGroup Basics',
            content:
              '`sync.WaitGroup` is the standard way to wait for a collection of goroutines to finish. Call `Add(n)` before launching goroutines, `Done()` when each finishes (usually deferred), and `Wait()` to block until all are complete.',
            code: `package main

import (
    "fmt"
    "sync"
    "time"
)

func fetchURL(url string, wg *sync.WaitGroup) {
    defer wg.Done()
    // Simulate HTTP request
    time.Sleep(100 * time.Millisecond)
    fmt.Println("Fetched:", url)
}

func main() {
    var wg sync.WaitGroup

    urls := []string{
        "https://example.com",
        "https://go.dev",
        "https://github.com",
    }

    for _, url := range urls {
        wg.Add(1)
        go fetchURL(url, &wg)
    }

    wg.Wait() // blocks until counter reaches 0
    fmt.Println("All fetches complete")
}`,
            output: `Fetched: https://github.com
Fetched: https://example.com
Fetched: https://go.dev
All fetches complete`,
            warning: 'Always call `wg.Add()` BEFORE the `go` statement, not inside the goroutine. If Wait() is reached before Add(), the program may exit early.',
            analogy: 'Think of it like a hotel checkout counter: each guest (goroutine) checks in (Add) before going to their room, hangs the "done" sign (Done) when leaving, and the manager (Wait) does not lock up until every guest has checked out.',
            codeHighlightLines: [10, 26, 27, 30],
          },
          {
            heading: 'WaitGroup with Results Collection',
            content:
              'Combine WaitGroup with channels or mutexes to collect results from concurrent goroutines safely.',
            code: `package main

import (
    "fmt"
    "sync"
)

func main() {
    nums := []int{1, 2, 3, 4, 5, 6, 7, 8}

    // Method 1: Channel for results
    results := make(chan int, len(nums))
    var wg sync.WaitGroup

    for _, n := range nums {
        wg.Add(1)
        go func(val int) {
            defer wg.Done()
            results <- val * val
        }(n)
    }

    // Close channel after all goroutines finish
    go func() {
        wg.Wait()
        close(results)
    }()

    // Collect results
    var squares []int
    for r := range results {
        squares = append(squares, r)
    }
    fmt.Println("Squares:", squares)

    // Method 2: Mutex for shared state
    var mu sync.Mutex
    sum := 0
    var wg2 sync.WaitGroup

    for _, n := range nums {
        wg2.Add(1)
        go func(val int) {
            defer wg2.Done()
            mu.Lock()
            sum += val
            mu.Unlock()
        }(n)
    }
    wg2.Wait()
    fmt.Println("Sum:", sum)
}`,
            output: `Squares: [1 4 9 16 25 36 49 64]
Sum: 36`,
            tip: 'The channel pattern is generally preferred over mutex for collecting results. Channels are more idiomatic and harder to misuse.',
            codeHighlightLines: [12, 24, 25, 26, 45, 46, 47],
          },
          {
            heading: 'WaitGroup in Worker Pools',
            content:
              'WaitGroup is a key component in the worker pool pattern, where a fixed number of goroutines process jobs from a shared channel.',
            code: `package main

import (
    "fmt"
    "sync"
)

func workerPool(jobs <-chan int, results chan<- string, wg *sync.WaitGroup, id int) {
    defer wg.Done()
    for job := range jobs {
        result := fmt.Sprintf("worker %d processed job %d -> %d", id, job, job*job)
        results <- result
    }
}

func main() {
    const numWorkers = 3
    const numJobs = 10

    jobs := make(chan int, numJobs)
    results := make(chan string, numJobs)

    // Start workers
    var wg sync.WaitGroup
    for w := 1; w <= numWorkers; w++ {
        wg.Add(1)
        go workerPool(jobs, results, &wg, w)
    }

    // Send jobs
    for j := 1; j <= numJobs; j++ {
        jobs <- j
    }
    close(jobs)

    // Close results after workers finish
    go func() {
        wg.Wait()
        close(results)
    }()

    // Collect
    for r := range results {
        fmt.Println(r)
    }
}`,
            output: `worker 1 processed job 1 -> 1
worker 2 processed job 2 -> 4
worker 3 processed job 3 -> 9
worker 1 processed job 4 -> 16
worker 2 processed job 5 -> 25
worker 3 processed job 6 -> 36
worker 1 processed job 7 -> 49
worker 2 processed job 8 -> 64
worker 3 processed job 9 -> 81
worker 1 processed job 10 -> 100`,
            note: 'Close the jobs channel to signal workers to stop. Workers exit the `for range` loop when the channel is closed and drained.',
          },
        ],
        quiz: [
          {
            question: 'When should you call wg.Add(1) relative to launching a goroutine?',
            options: [
              'Inside the goroutine, at the beginning',
              'After wg.Wait()',
              'Before the go statement, in the launching goroutine',
              'It does not matter when you call it',
            ],
            correctIndex: 2,
            explanation:
              'You must call wg.Add() BEFORE the go statement, not inside the goroutine. If Wait() is reached before Add(), the program may exit early because the counter might be zero before all goroutines have registered.',
          },
          {
            question: 'What is the idiomatic way to ensure wg.Done() is called even if the goroutine panics?',
            options: [
              'Call wg.Done() in a finally block',
              'Use defer wg.Done() at the start of the goroutine',
              'Use a try-catch block',
              'Call wg.Done() in main after Wait()',
            ],
            correctIndex: 1,
            explanation:
              'Using defer wg.Done() at the beginning of the goroutine ensures Done() is called when the function returns, even if it panics. This prevents the WaitGroup counter from getting stuck.',
          },
          {
            question: 'How can you safely collect results from multiple goroutines using a WaitGroup?',
            options: [
              'Write directly to a shared slice without synchronization',
              'Use a buffered channel to collect results, closing it after wg.Wait()',
              'Use fmt.Println from each goroutine',
              'Return values from goroutine functions',
            ],
            correctIndex: 1,
            explanation:
              'Use a buffered channel to collect results. After wg.Wait() confirms all goroutines are done, close the channel and range over it to collect results. Alternatively, use a mutex to protect shared state.',
          },
        ],
        challenge: {
          prompt:
            'Create a worker pool with 3 workers that process jobs from a shared channel. Each job is a string that should be converted to uppercase. Collect all results and print them.',
          starterCode: `package main

import (
    "fmt"
    "strings"
    "sync"
)

func worker(id int, jobs <-chan string, results chan<- string, wg *sync.WaitGroup) {
    defer wg.Done()
    // TODO: range over jobs, convert to uppercase, send to results
}

func main() {
    jobs := make(chan string, 5)
    results := make(chan string, 5)

    // TODO: start 3 workers with a WaitGroup
    var wg sync.WaitGroup

    // Send jobs
    words := []string{"hello", "world", "go", "is", "great"}
    for _, w := range words {
        jobs <- w
    }
    close(jobs)

    // TODO: close results channel after workers finish
    // TODO: collect and print results
}`,
          solutionCode: `package main

import (
    "fmt"
    "strings"
    "sync"
)

func worker(id int, jobs <-chan string, results chan<- string, wg *sync.WaitGroup) {
    defer wg.Done()
    for job := range jobs {
        results <- strings.ToUpper(job)
    }
}

func main() {
    jobs := make(chan string, 5)
    results := make(chan string, 5)

    var wg sync.WaitGroup
    for w := 1; w <= 3; w++ {
        wg.Add(1)
        go worker(w, jobs, results, &wg)
    }

    words := []string{"hello", "world", "go", "is", "great"}
    for _, w := range words {
        jobs <- w
    }
    close(jobs)

    go func() {
        wg.Wait()
        close(results)
    }()

    for r := range results {
        fmt.Println(r)
    }
}`,
          hints: [
            'In the worker function, use for job := range jobs to process each job and send strings.ToUpper(job) to results.',
            'Start a goroutine that calls wg.Wait() then close(results) so the main function can range over results.',
            'Use wg.Add(1) before each go worker(...) call in the loop.',
          ],
        },
      },
      {
        id: 'sync-mutex',
        title: 'sync.Mutex',
        difficulty: 'intermediate',
        tags: ['mutex', 'rwmutex', 'sync', 'race-condition', 'critical-section'],
        cheatSheetSummary:
          '`mu.Lock()` / `mu.Unlock()` for exclusive access. `sync.RWMutex` allows multiple readers. Always `defer mu.Unlock()`.',
        crossLanguageId: 'sync-mutex',
        sections: [
          {
            heading: 'Mutex for Shared State',
            content:
              'Mutex (mutual exclusion) protects shared data from concurrent access. `Lock()` acquires exclusive access (blocks if held by another goroutine), `Unlock()` releases it. Always `defer Unlock()` to prevent deadlocks from panics or early returns.',
            code: `package main

import (
    "fmt"
    "sync"
)

type SafeCounter struct {
    mu    sync.Mutex
    count map[string]int
}

func (c *SafeCounter) Increment(key string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.count[key]++
}

func (c *SafeCounter) Get(key string) int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.count[key]
}

func main() {
    counter := SafeCounter{count: make(map[string]int)}

    var wg sync.WaitGroup
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter.Increment("hits")
        }()
    }

    wg.Wait()
    fmt.Println("Final count:", counter.Get("hits"))
}`,
            output: `Final count: 1000`,
            tip: 'Without the mutex, concurrent map writes would cause a runtime panic: "concurrent map writes". The mutex serializes access.',
            analogy: 'Think of it like a bathroom lock: only one person (goroutine) can enter at a time. Everyone else waits in line. When the person inside finishes (Unlock), the next one enters (Lock). The defer ensures you always unlock, even if something goes wrong inside.',
            codeHighlightLines: [9, 14, 15, 20, 21],
          },
          {
            heading: 'RWMutex for Read-Heavy Workloads',
            content:
              '`sync.RWMutex` allows multiple concurrent readers OR a single writer. Use `RLock()`/`RUnlock()` for read operations and `Lock()`/`Unlock()` for writes. This dramatically improves performance for read-heavy workloads.',
            code: `package main

import (
    "fmt"
    "sync"
)

type SafeCache struct {
    mu    sync.RWMutex
    items map[string]string
}

func NewCache() *SafeCache {
    return &SafeCache{items: make(map[string]string)}
}

// Multiple goroutines can read simultaneously
func (c *SafeCache) Get(key string) (string, bool) {
    c.mu.RLock()
    defer c.mu.RUnlock()
    val, ok := c.items[key]
    return val, ok
}

// Only one goroutine can write at a time
func (c *SafeCache) Set(key, val string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.items[key] = val
}

func (c *SafeCache) Len() int {
    c.mu.RLock()
    defer c.mu.RUnlock()
    return len(c.items)
}

func main() {
    cache := NewCache()
    var wg sync.WaitGroup

    // Writers
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            key := fmt.Sprintf("key%d", n)
            cache.Set(key, fmt.Sprintf("value%d", n))
        }(i)
    }

    wg.Wait()

    // Concurrent readers
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            key := fmt.Sprintf("key%d", n)
            if val, ok := cache.Get(key); ok {
                fmt.Printf("%s = %s\\n", key, val)
            }
        }(i)
    }

    wg.Wait()
    fmt.Println("Cache size:", cache.Len())
}`,
            output: `key0 = value0
key1 = value1
key2 = value2
key3 = value3
key4 = value4
Cache size: 5`,
            note: 'Use `RWMutex` when reads vastly outnumber writes. For equal read/write ratios, a regular `Mutex` is simpler and has less overhead.',
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    subgraph "RWMutex Behavior"\n        direction TB\n        R1["Reader 1"] -->|"RLock()"| Shared["Shared Data"]\n        R2["Reader 2"] -->|"RLock()"| Shared\n        R3["Reader 3"] -->|"RLock()"| Shared\n    end\n    subgraph "Write Mode"\n        direction TB\n        W1["Writer"] -->|"Lock() - exclusive"| Data2["Shared Data"]\n        BR1["Reader A"] -.->|"blocked"| Data2\n        BR2["Reader B"] -.->|"blocked"| Data2\n    end\n    style R1 fill:#dbeafe,stroke:#3b82f6\n    style R2 fill:#dbeafe,stroke:#3b82f6\n    style R3 fill:#dbeafe,stroke:#3b82f6\n    style W1 fill:#fca5a5,stroke:#dc2626\n    style BR1 fill:#f3f4f6,stroke:#9ca3af\n    style BR2 fill:#f3f4f6,stroke:#9ca3af\n    style Shared fill:#d1fae5,stroke:#10b981\n    style Data2 fill:#fef3c7,stroke:#f59e0b',
              caption: 'RWMutex allows multiple concurrent readers (left) but only one writer at a time (right). While a writer holds the lock, all readers and other writers are blocked.',
            },
            codeHighlightLines: [9, 19, 20, 27, 28],
          },
          {
            heading: 'sync.Once and sync.Map',
            content:
              '`sync.Once` guarantees a function runs exactly once across all goroutines -- perfect for lazy initialization. `sync.Map` is a concurrent-safe map that avoids the need for manual locking in specific use cases.',
            code: `package main

import (
    "fmt"
    "sync"
)

// sync.Once for singleton
var (
    instance *Database
    once     sync.Once
)

type Database struct {
    Name string
}

func GetDB() *Database {
    once.Do(func() {
        fmt.Println("Initializing database (runs once)")
        instance = &Database{Name: "production"}
    })
    return instance
}

func main() {
    // sync.Once
    var wg sync.WaitGroup
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            db := GetDB()
            fmt.Println("Got DB:", db.Name)
        }()
    }
    wg.Wait()

    fmt.Println()

    // sync.Map (no explicit locking needed)
    var m sync.Map
    m.Store("language", "Go")
    m.Store("version", "1.22")

    val, ok := m.Load("language")
    fmt.Printf("language: %v (found: %t)\\n", val, ok)

    m.Range(func(key, value interface{}) bool {
        fmt.Printf("%v = %v\\n", key, value)
        return true // continue iteration
    })
}`,
            output: `Initializing database (runs once)
Got DB: production
Got DB: production
Got DB: production
Got DB: production
Got DB: production

language: Go (found: true)
language = Go
version = 1.22`,
            tip: 'Prefer regular `map` + `sync.Mutex` over `sync.Map` for most cases. `sync.Map` is optimized for two patterns: (1) write-once, read-many, and (2) disjoint key sets across goroutines.',
            analogy: 'Think of it like a "do not disturb" sign on a hotel door that flips to "done" after housekeeping visits once: sync.Once ensures initialization happens exactly one time, no matter how many goroutines try to trigger it.',
            codeHighlightLines: [11, 19, 20, 21],
          },
        ],
        quiz: [
          {
            question: 'What happens if you try to write to a Go map concurrently without a mutex?',
            options: [
              'The writes silently fail',
              'The map grows incorrectly but does not crash',
              'A runtime panic: "concurrent map writes"',
              'A compilation error',
            ],
            correctIndex: 2,
            explanation:
              'Go maps are not safe for concurrent writes. The runtime detects concurrent map access and panics with "concurrent map writes". You must protect map access with a sync.Mutex or sync.RWMutex.',
          },
          {
            question: 'When should you use sync.RWMutex instead of sync.Mutex?',
            options: [
              'When you have more writes than reads',
              'When reads vastly outnumber writes',
              'When only one goroutine accesses the data',
              'When using channels for communication',
            ],
            correctIndex: 1,
            explanation:
              'RWMutex is beneficial when reads vastly outnumber writes because it allows multiple concurrent readers. For equal read/write ratios, a regular Mutex is simpler and has less overhead.',
          },
          {
            question: 'What does sync.Once guarantee?',
            options: [
              'A function runs at most once per goroutine',
              'A function runs exactly once across all goroutines',
              'A function runs before main()',
              'A function runs after all goroutines finish',
            ],
            correctIndex: 1,
            explanation:
              'sync.Once guarantees that the function passed to Do() runs exactly one time, regardless of how many goroutines call Do(). All other callers block until the first execution completes.',
          },
          {
            question: 'Why should you always use `defer mu.Unlock()` instead of calling Unlock() manually at the end?',
            options: [
              'It is faster than manual unlocking',
              'It ensures the mutex is unlocked even if the function panics or returns early',
              'It prevents other goroutines from acquiring the lock',
              'It is required by the Go compiler',
            ],
            correctIndex: 1,
            explanation:
              'Using defer mu.Unlock() ensures the mutex is released even if the function panics or returns early via a conditional branch. Without defer, a panic or early return would leave the mutex locked, causing a deadlock.',
          },
        ],
        challenge: {
          prompt:
            'Create a thread-safe counter struct with Increment(), Decrement(), and Value() methods using sync.Mutex. Launch 100 goroutines to increment and 50 to decrement, then print the final value (which should be 50).',
          starterCode: `package main

import (
    "fmt"
    "sync"
)

type SafeCounter struct {
    // TODO: add mutex and value fields
}

func (c *SafeCounter) Increment() {
    // TODO: safely increment the value
}

func (c *SafeCounter) Decrement() {
    // TODO: safely decrement the value
}

func (c *SafeCounter) Value() int {
    // TODO: safely return the value
}

func main() {
    counter := &SafeCounter{}
    var wg sync.WaitGroup

    // Launch 100 increment goroutines
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter.Increment()
        }()
    }

    // Launch 50 decrement goroutines
    for i := 0; i < 50; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter.Decrement()
        }()
    }

    wg.Wait()
    fmt.Println("Final value:", counter.Value())
}`,
          solutionCode: `package main

import (
    "fmt"
    "sync"
)

type SafeCounter struct {
    mu  sync.Mutex
    val int
}

func (c *SafeCounter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.val++
}

func (c *SafeCounter) Decrement() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.val--
}

func (c *SafeCounter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.val
}

func main() {
    counter := &SafeCounter{}
    var wg sync.WaitGroup

    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter.Increment()
        }()
    }

    for i := 0; i < 50; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter.Decrement()
        }()
    }

    wg.Wait()
    fmt.Println("Final value:", counter.Value())
}`,
          hints: [
            'Add a sync.Mutex field and an int field to the SafeCounter struct.',
            'In each method, call c.mu.Lock() and defer c.mu.Unlock() before accessing the value.',
            'The Value() method also needs locking to ensure a consistent read.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Packages                                                     */
  /* ------------------------------------------------------------ */
  {
    id: 'packages',
    label: 'Packages',
    icon: 'Package',
    entries: [
      {
        id: 'packages',
        title: 'Packages',
        difficulty: 'beginner',
        tags: ['package', 'import', 'export', 'visibility'],
        cheatSheetSummary:
          'Code organized in packages (directories). Exported names start with uppercase. Import by module path. One package per directory.',
        crossLanguageId: 'packages',
        sections: [
          {
            heading: 'Package Basics',
            content:
              'Go code is organized into packages. A package is a directory of `.go` files sharing the same `package` declaration. Exported names start with an uppercase letter. Lowercase names are package-private. One package per directory is the rule.',
            code: `// File: mathutil/mathutil.go
package mathutil

// Exported: accessible from other packages
func Add(a, b int) int {
    return a + b
}

// unexported: only visible within mathutil package
func helper() int {
    return 42
}

// File: main.go
package main

import (
    "fmt"
    "myproject/mathutil"
)

func main() {
    result := mathutil.Add(3, 4)
    fmt.Println("3 + 4 =", result)
    // mathutil.helper() // ERROR: unexported
}`,
            output: `3 + 4 = 7`,
            tip: 'The capitalization convention is enforced by the compiler. There is no public/private keyword -- just uppercase for exported, lowercase for unexported.',
            analogy: 'Think of it like a storefront: uppercase names are items displayed in the window (public API), while lowercase names are kept in the back room (private). Customers (other packages) can only access what is in the window.',
            codeHighlightLines: [5, 6, 10, 11],
          },
          {
            heading: 'Import Styles',
            content:
              'Go supports several import styles: single imports, grouped imports (idiomatic), aliased imports for name conflicts, blank imports for side effects, and dot imports (rarely used).',
            code: `package main

// Grouped imports (idiomatic)
import (
    "fmt"
    "math"

    // Third-party packages after a blank line
    // "github.com/gin-gonic/gin"
)

// Aliased imports (resolve conflicts)
// import (
//     crand "crypto/rand"
//     mrand "math/rand"
// )

// Blank import (side effects only, e.g., database drivers)
// import _ "github.com/lib/pq"

// Dot import (puts names in current namespace -- avoid)
// import . "fmt"  // then Println() instead of fmt.Println()

func main() {
    fmt.Println("Pi:", math.Pi)
    fmt.Println("Sqrt(16):", math.Sqrt(16))
}`,
            output: `Pi: 3.141592653589793
Sqrt(16): 4`,
            note: 'Convention: group stdlib imports first, then third-party, separated by a blank line. The `goimports` tool formats this automatically.',
          },
          {
            heading: 'Package Documentation',
            content:
              'Every package should have a doc comment starting with "Package <name>" placed before the package declaration. Exported functions and types should also have doc comments. Use `go doc` to view documentation from the command line.',
            code: `// Package mathutil provides basic mathematical utility functions
// for common operations not covered by the standard math package.
package mathutil

// Clamp restricts val to the range [min, max].
// If val is less than min, min is returned.
// If val is greater than max, max is returned.
func Clamp(val, min, max int) int {
    if val < min {
        return min
    }
    if val > max {
        return max
    }
    return val
}

// Abs returns the absolute value of n.
func Abs(n int) int {
    if n < 0 {
        return -n
    }
    return n
}

// View docs:
// $ go doc mathutil
// $ go doc mathutil.Clamp`,
            output: `// $ go doc mathutil
// package mathutil // import "myproject/mathutil"
//
// Package mathutil provides basic mathematical utility functions.
//
// func Abs(n int) int
// func Clamp(val, min, max int) int`,
            tip: 'Write doc comments as complete sentences starting with the function/type name. The `go doc` tool uses these to generate beautiful documentation.',
            codeHighlightLines: [1, 2, 5, 6, 7, 18],
          },
        ],
        quiz: [
          {
            question: 'How does Go determine whether a name is exported (public) from a package?',
            options: [
              'Using the `public` keyword',
              'Using the `export` keyword',
              'The name starts with an uppercase letter',
              'The name is declared in a separate exports file',
            ],
            correctIndex: 2,
            explanation:
              'In Go, exported names start with an uppercase letter and unexported names start with a lowercase letter. This convention is enforced by the compiler -- there is no public/private keyword.',
          },
          {
            question: 'What is the idiomatic way to group imports in Go?',
            options: [
              'One import statement per package',
              'Grouped imports with stdlib first, then third-party separated by a blank line',
              'Alphabetical order with no grouping',
              'Third-party first, then stdlib',
            ],
            correctIndex: 1,
            explanation:
              'The Go convention is to use grouped imports with standard library packages first, then third-party packages separated by a blank line. The goimports tool formats this automatically.',
          },
          {
            question: 'What does a blank import (`import _ "pkg"`) do?',
            options: [
              'Imports the package but discards all its exports',
              'Triggers the package init() function for side effects without using its exports',
              'Imports the package into the current namespace',
              'Marks the package as optional',
            ],
            correctIndex: 1,
            explanation:
              'A blank import triggers the package init() function for its side effects (like registering a database driver) without making its exports available. This is common with database drivers and image decoders.',
          },
        ],
        challenge: {
          prompt:
            'Create a simple package with exported and unexported functions. Write a Clamp function (exported) that restricts a value to a range, and a helper function (unexported) that checks if a value is in range. Demonstrate usage from a main package.',
          starterCode: `// Imagine this is in a file mathutil/mathutil.go
package main

import "fmt"

// TODO: create an exported Clamp function that takes val, min, max int
// and returns the clamped value

// TODO: create an unexported inRange function that takes val, min, max int
// and returns bool

func main() {
    // Test the Clamp function
    fmt.Println(Clamp(15, 0, 10))  // should print 10
    fmt.Println(Clamp(-5, 0, 10))  // should print 0
    fmt.Println(Clamp(5, 0, 10))   // should print 5
}`,
          solutionCode: `package main

import "fmt"

// Clamp restricts val to the range [min, max].
func Clamp(val, min, max int) int {
    if !inRange(val, min, max) {
        if val < min {
            return min
        }
        return max
    }
    return val
}

// inRange checks if val is within [min, max].
func inRange(val, min, max int) bool {
    return val >= min && val <= max
}

func main() {
    fmt.Println(Clamp(15, 0, 10))  // 10
    fmt.Println(Clamp(-5, 0, 10))  // 0
    fmt.Println(Clamp(5, 0, 10))   // 5
}`,
          hints: [
            'Exported functions start with an uppercase letter (Clamp), unexported with lowercase (inRange).',
            'The Clamp function should check if the value is below min or above max and return the appropriate boundary.',
            'The inRange helper returns true if val >= min && val <= max.',
          ],
        },
      },
      {
        id: 'go-modules',
        title: 'Go Modules',
        difficulty: 'beginner',
        tags: ['go-mod', 'go-sum', 'dependency', 'versioning', 'semver'],
        cheatSheetSummary:
          '`go mod init <path>` creates go.mod. `go get pkg@version` adds deps. `go mod tidy` cleans up. Follows semver.',
        crossLanguageId: 'go-modules',
        sections: [
          {
            heading: 'Module Initialization and Dependencies',
            content:
              'Go modules manage dependencies via `go.mod` and `go.sum` files. Initialize with `go mod init`. Add dependencies with `go get`. Clean up with `go mod tidy`. Go follows semantic versioning (semver).',
            code: `// Initialize a new module
// $ go mod init github.com/user/myproject

// go.mod file:
// module github.com/user/myproject
//
// go 1.22
//
// require (
//     github.com/gin-gonic/gin v1.9.1
//     golang.org/x/exp v0.0.0-20230817173708-d852ddb80c63
// )

// Common commands:
// go get github.com/pkg/errors@latest     # add/update dep
// go get github.com/pkg/errors@v0.9.1     # specific version
// go get -u ./...                           # update all deps
// go mod tidy                               # remove unused, add missing
// go mod download                           # download deps to cache
// go mod vendor                             # copy deps to vendor/
// go mod graph                              # print dependency graph

package main

import "fmt"

func main() {
    fmt.Println("Module initialized")
}`,
            output: `Module initialized`,
            tip: 'Always commit both `go.mod` and `go.sum` to version control. The `go.sum` file ensures reproducible builds by recording cryptographic hashes.',
          },
          {
            heading: 'Module Versioning',
            content:
              'Go modules follow semantic versioning. Major version 2+ requires a `/v2` suffix in the module path. Use `go list -m -versions` to see available versions. The `replace` directive lets you use local copies during development.',
            code: `// go.mod with version constraints
// module github.com/user/myproject
//
// go 1.22
//
// require (
//     github.com/gin-gonic/gin v1.9.1  // specific version
//     golang.org/x/exp v0.0.0-20230817173708-d852ddb80c63  // pseudo-version
// )
//
// // Replace with local path during development
// replace github.com/myorg/mylib => ../mylib
//
// // Exclude a bad version
// exclude github.com/badpkg/lib v1.2.3

// Commands for versioning:
// go list -m -versions github.com/gin-gonic/gin
// go get github.com/gin-gonic/gin@v1.9.0
// go get github.com/gin-gonic/gin@latest

// Major version 2+ requires path suffix:
// import "github.com/user/lib/v2"

package main

import "fmt"

func main() {
    fmt.Println("Versioned module")
}`,
            output: `Versioned module`,
            note: 'The `replace` directive is invaluable during local development. It redirects a module path to a local directory without publishing.',
          },
          {
            heading: 'Multi-Module Workspaces (Go 1.18+)',
            content:
              'Go workspaces let you work with multiple modules simultaneously without `replace` directives. Create a `go.work` file to define which modules are in the workspace.',
            code: `// Create a workspace
// $ mkdir workspace && cd workspace
// $ go work init ./backend ./frontend ./shared

// go.work file:
// go 1.22
//
// use (
//     ./backend
//     ./frontend
//     ./shared
// )

// Commands:
// go work init ./module1 ./module2   # create workspace
// go work use ./new-module           # add module to workspace
// go work sync                       # sync workspace deps

// Directory structure:
// workspace/
// ├── go.work
// ├── backend/
// │   ├── go.mod
// │   └── main.go
// ├── frontend/
// │   ├── go.mod
// │   └── main.go
// └── shared/
//     ├── go.mod
//     └── types.go

package main

import "fmt"

func main() {
    fmt.Println("Workspace ready")
}`,
            output: `Workspace ready`,
            tip: 'Do not commit `go.work` to your repository unless all team members use the same directory layout. It is typically a local development tool.',
          },
        ],
        quiz: [
          {
            question: 'Which command initializes a new Go module?',
            options: [
              'go init module',
              'go mod init <module-path>',
              'go new module',
              'go create mod',
            ],
            correctIndex: 1,
            explanation:
              '`go mod init <module-path>` creates a go.mod file in the current directory, initializing a new module with the specified module path.',
          },
          {
            question: 'What does `go mod tidy` do?',
            options: [
              'Formats all Go source files',
              'Updates all dependencies to their latest versions',
              'Adds missing dependencies and removes unused ones from go.mod',
              'Validates the go.mod file syntax',
            ],
            correctIndex: 2,
            explanation:
              '`go mod tidy` analyzes your source code, adds any missing module dependencies to go.mod and go.sum, and removes modules that are no longer needed.',
          },
          {
            question: 'What is the purpose of the go.sum file?',
            options: [
              'It lists all available versions of dependencies',
              'It contains the source code of dependencies',
              'It records cryptographic hashes for reproducible builds',
              'It stores the build configuration',
            ],
            correctIndex: 2,
            explanation:
              'The go.sum file records the expected cryptographic hashes of the content of specific module versions. This ensures that future downloads of these modules retrieve the same bits, providing reproducible builds.',
          },
          {
            question: 'What must you do for major version 2+ of a Go module?',
            options: [
              'Create a new repository',
              'Add a /v2 suffix to the module path',
              'Use a different package name',
              'Increment the go version in go.mod',
            ],
            correctIndex: 1,
            explanation:
              'Go modules follow semantic versioning. Major version 2+ requires a /v2 (or /v3, etc.) suffix in the module path in go.mod and in import statements. This allows different major versions to coexist.',
          },
        ],
        challenge: {
          prompt:
            'Write a Go program that demonstrates the use of the replace directive concept. Create two "packages" (in the same file for simplicity) where one provides a Greet function and main uses it. Show how module paths and local development work together.',
          starterCode: `package main

import "fmt"

// Simulate a "greeter" package
// In a real project, this would be in a separate module
// and you might use: replace github.com/user/greeter => ../greeter

// TODO: create a Greet function that takes a name and returns a greeting string

// TODO: create a GreetAll function that takes a slice of names and returns
// all greetings joined with newlines

func main() {
    // TODO: use Greet and GreetAll to print greetings
}`,
          solutionCode: `package main

import (
    "fmt"
    "strings"
)

// Greet returns a personalized greeting.
func Greet(name string) string {
    return fmt.Sprintf("Hello, %s! Welcome to Go modules.", name)
}

// GreetAll returns greetings for all provided names.
func GreetAll(names []string) string {
    var greetings []string
    for _, name := range names {
        greetings = append(greetings, Greet(name))
    }
    return strings.Join(greetings, "\\n")
}

func main() {
    fmt.Println(Greet("Alice"))
    fmt.Println()
    names := []string{"Bob", "Charlie", "Diana"}
    fmt.Println(GreetAll(names))
}`,
          hints: [
            'The Greet function should use fmt.Sprintf to format a greeting string with the name.',
            'GreetAll should iterate over the names slice, call Greet for each, and join results with strings.Join.',
            'In a real multi-module project, you would use `replace` in go.mod to point to a local path during development.',
          ],
        },
      },
      {
        id: 'init-function',
        title: 'Init Function',
        difficulty: 'intermediate',
        tags: ['init', 'initialization', 'package-init', 'side-effects'],
        cheatSheetSummary:
          '`func init()` runs automatically before `main()`. Used for setup. Multiple init() allowed per file. Runs in import order.',
        crossLanguageId: 'init-function',
        sections: [
          {
            heading: 'The init() Function',
            content:
              'The `init()` function is called automatically before `main()`. Each file can have multiple `init()` functions. They run in the order files are presented to the compiler (alphabetical within a package). Use init for setup that cannot fail.',
            code: `package main

import "fmt"

var config map[string]string

func init() {
    fmt.Println("init 1: initializing config")
    config = make(map[string]string)
    config["env"] = "production"
}

func init() {
    fmt.Println("init 2: validating config")
    if config["env"] == "" {
        panic("env not set")
    }
}

func main() {
    fmt.Println("main: config =", config)
}`,
            output: `init 1: initializing config
init 2: validating config
main: config = map[env:production]`,
            warning: 'Use `init()` sparingly. It makes code harder to test because it runs automatically. Prefer explicit initialization in `main()` or constructor functions.',
            analogy: 'Think of it like the opening credits of a movie: init() runs before the main story begins. The audience (main function) has no control over what happens in the credits, and everything shown there is already set in stone before the story starts.',
            diagram: {
              kind: 'mermaid',
              code: 'graph LR\n    A["Import dependencies"] --> B["Dependency init() runs"]\n    B --> C["Package var initialization"]\n    C --> D["init() 1"]\n    D --> E["init() 2"]\n    E --> F["main()"]\n    style A fill:#dbeafe,stroke:#3b82f6\n    style B fill:#e0e7ff,stroke:#6366f1\n    style C fill:#fef3c7,stroke:#f59e0b\n    style D fill:#d1fae5,stroke:#10b981\n    style E fill:#d1fae5,stroke:#10b981\n    style F fill:#fca5a5,stroke:#dc2626',
              caption: 'Go initialization order: imported packages init first, then package-level variables, then init() functions in order, and finally main().',
            },
            codeHighlightLines: [7, 13, 20],
          },
          {
            heading: 'Init Order and Side-Effect Imports',
            content:
              'Init functions run in dependency order: if package A imports package B, B\'s init runs first. Blank imports (`import _ "pkg"`) trigger a package\'s init functions without using any of its exports. This is used for database drivers and image decoders.',
            code: `// Database driver registration pattern:
// import _ "github.com/lib/pq"  // registers PostgreSQL driver
// import _ "github.com/go-sql-driver/mysql"  // registers MySQL driver

// Image decoder registration:
// import _ "image/png"   // registers PNG decoder
// import _ "image/jpeg"  // registers JPEG decoder

// Init order example:
// 1. Imported packages' init() (in dependency order)
// 2. Package-level variable initialization
// 3. Current package's init() functions
// 4. main()

package main

import "fmt"

// Package-level vars are initialized before init()
var startTime = initTime()

func initTime() string {
    fmt.Println("Package var initialization")
    return "2024-01-01"
}

func init() {
    fmt.Println("init() runs after package vars")
}

func main() {
    fmt.Println("main() runs last, start:", startTime)
}`,
            output: `Package var initialization
init() runs after package vars
main() runs last, start: 2024-01-01`,
            tip: 'The blank import pattern (`import _ "pkg"`) is the idiomatic way to register plugins, drivers, and decoders in Go. The `init()` in those packages calls a registration function.',
          },
          {
            heading: 'Alternatives to init()',
            content:
              'Modern Go style prefers explicit initialization over `init()`. This makes dependencies clear, code testable, and initialization order controllable. Use constructor functions and explicit setup calls.',
            code: `package main

import "fmt"

// Instead of init(), use explicit setup
type App struct {
    Config map[string]string
    Ready  bool
}

func NewApp() (*App, error) {
    config := map[string]string{
        "env":  "production",
        "port": "8080",
    }

    if config["env"] == "" {
        return nil, fmt.Errorf("env not configured")
    }

    return &App{
        Config: config,
        Ready:  true,
    }, nil
}

func main() {
    app, err := NewApp()
    if err != nil {
        fmt.Println("Setup failed:", err)
        return
    }
    fmt.Printf("App ready: %t, env: %s\\n", app.Ready, app.Config["env"])
}`,
            output: `App ready: true, env: production`,
            note: 'Explicit initialization is preferred because it can return errors, accept parameters, and be called in tests with different configurations.',
          },
        ],
        quiz: [
          {
            question: 'When does the init() function run relative to main()?',
            options: [
              'After main() finishes',
              'Concurrently with main()',
              'Before main(), after package-level variable initialization',
              'Only when explicitly called',
            ],
            correctIndex: 2,
            explanation:
              'init() runs automatically before main(). The order is: imported packages init first, then package-level variables are initialized, then init() functions run, and finally main() is called.',
          },
          {
            question: 'Can a single Go file have multiple init() functions?',
            options: [
              'No, only one init() per file is allowed',
              'Yes, and they run in the order they appear',
              'Yes, but only the first one runs',
              'No, it causes a compilation error',
            ],
            correctIndex: 1,
            explanation:
              'A single file can have multiple init() functions. They run in the order they appear in the file. Multiple files in the same package can also each have init() functions.',
          },
          {
            question: 'Why is explicit initialization (constructor functions) preferred over init()?',
            options: [
              'init() is deprecated in modern Go',
              'Explicit initialization can return errors, accept parameters, and is easier to test',
              'init() runs too slowly',
              'The Go compiler optimizes constructor functions better',
            ],
            correctIndex: 1,
            explanation:
              'Explicit initialization via constructor functions is preferred because it can return errors, accept parameters for configuration, and be called in tests with different configurations. init() makes code harder to test since it runs automatically.',
          },
        ],
        challenge: {
          prompt:
            'Refactor a program that uses init() for configuration setup into one that uses explicit initialization with a constructor function that returns an error if configuration is invalid.',
          starterCode: `package main

import "fmt"

// TODO: define a Config struct with fields: AppName (string), Port (int), Debug (bool)

// TODO: create a NewConfig function that takes appName string, port int, debug bool
// It should return (*Config, error)
// Return an error if appName is empty or port is not between 1 and 65535

func main() {
    // TODO: use NewConfig to create a valid config and print it
    // TODO: try creating an invalid config and handle the error
}`,
          solutionCode: `package main

import "fmt"

type Config struct {
    AppName string
    Port    int
    Debug   bool
}

func NewConfig(appName string, port int, debug bool) (*Config, error) {
    if appName == "" {
        return nil, fmt.Errorf("app name cannot be empty")
    }
    if port < 1 || port > 65535 {
        return nil, fmt.Errorf("port must be between 1 and 65535, got %d", port)
    }
    return &Config{
        AppName: appName,
        Port:    port,
        Debug:   debug,
    }, nil
}

func main() {
    cfg, err := NewConfig("MyApp", 8080, true)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Printf("Config: %+v\\n", cfg)

    _, err = NewConfig("", 8080, false)
    if err != nil {
        fmt.Println("Validation error:", err)
    }

    _, err = NewConfig("MyApp", 0, false)
    if err != nil {
        fmt.Println("Validation error:", err)
    }
}`,
          hints: [
            'The Config struct should have three fields: AppName string, Port int, Debug bool.',
            'In NewConfig, validate the inputs before creating the struct. Return an error using fmt.Errorf for invalid input.',
            'In main, use the two-value return pattern (cfg, err) and check err before using the config.',
          ],
        },
      },
      {
        id: 'internal-packages',
        title: 'Internal Packages',
        difficulty: 'intermediate',
        tags: ['internal', 'visibility', 'encapsulation', 'project-structure'],
        cheatSheetSummary:
          'Packages under `internal/` can only be imported by code within the parent directory. Compiler-enforced encapsulation.',
        crossLanguageId: 'internal-packages',
        sections: [
          {
            heading: 'The internal Directory',
            content:
              'The `internal` directory provides compiler-enforced encapsulation. Packages under `internal/` can only be imported by code within the parent of the `internal/` directory. This prevents other modules from depending on your implementation details.',
            code: `// Project structure:
// myproject/
// ├── go.mod            (module github.com/user/myproject)
// ├── main.go           (package main)
// ├── internal/
// │   ├── auth/
// │   │   └── auth.go   (package auth)
// │   └── database/
// │       └── db.go     (package database)
// └── pkg/
//     └── api/
//         └── api.go    (package api)

// internal/auth/auth.go
// package auth
// func ValidateToken(token string) bool { ... }

// main.go CAN import internal packages:
// import "github.com/user/myproject/internal/auth"

// Other modules CANNOT:
// import "github.com/user/myproject/internal/auth"
// ERROR: use of internal package not allowed

package main

import "fmt"

func main() {
    fmt.Println("Internal packages enforce encapsulation")
}`,
            output: `Internal packages enforce encapsulation`,
            tip: 'Use `internal/` for code that other packages in your module need but external users should not depend on. It is your project\'s private API.',
            analogy: 'Think of it like the "Employees Only" door in a restaurant: anyone inside the restaurant (your module) can walk through, but customers (external packages) are stopped by the compiler-enforced sign on the door.',
          },
          {
            heading: 'Structuring with Internal Packages',
            content:
              'A well-structured Go project uses internal packages to separate concerns while keeping implementation details private. This is especially important for libraries and services.',
            code: `// Service project structure:
// orderservice/
// ├── go.mod
// ├── cmd/
// │   └── server/
// │       └── main.go          // entry point
// ├── internal/
// │   ├── handler/
// │   │   └── order.go         // HTTP handlers
// │   ├── service/
// │   │   └── order.go         // business logic
// │   ├── repository/
// │   │   └── order.go         // database access
// │   └── model/
// │       └── order.go         // domain types
// └── pkg/
//     └── orderapi/
//         └── client.go        // public API client

// Benefits:
// - internal/handler can import internal/service
// - internal/service can import internal/repository
// - external packages can only import pkg/orderapi
// - Business logic is protected from external coupling

package main

import "fmt"

func main() {
    fmt.Println("Well-structured service")
}`,
            output: `Well-structured service`,
            note: 'The `cmd/`, `internal/`, `pkg/` layout is a convention, not a requirement. Small projects can start flat and refactor into this structure as they grow.',
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    CMD["cmd/server/main.go"] --> H["internal/handler"]\n    CMD --> S["internal/service"]\n    H --> S\n    S --> R["internal/repository"]\n    R --> M["internal/model"]\n    S --> M\n    H --> M\n    EXT["External packages"] -->|"allowed"| PKG["pkg/orderapi"]\n    EXT -.->|"BLOCKED by compiler"| H\n    EXT -.->|"BLOCKED by compiler"| S\n    style CMD fill:#dbeafe,stroke:#3b82f6\n    style H fill:#d1fae5,stroke:#10b981\n    style S fill:#d1fae5,stroke:#10b981\n    style R fill:#d1fae5,stroke:#10b981\n    style M fill:#d1fae5,stroke:#10b981\n    style PKG fill:#fef3c7,stroke:#f59e0b\n    style EXT fill:#f3f4f6,stroke:#9ca3af',
              caption: 'Go project structure: internal/ packages are accessible within the module but blocked for external consumers. Only pkg/ is part of the public API.',
            },
          },
          {
            heading: 'Nested Internal Directories',
            content:
              'Internal directories can be nested. A package under `a/internal/` is only accessible to code in `a/` and its subdirectories. This allows fine-grained access control within larger projects.',
            code: `// Nested internal example:
// myproject/
// ├── internal/           // project-wide internal
// │   └── config/
// ├── services/
// │   ├── auth/
// │   │   ├── internal/   // only auth/ can use these
// │   │   │   └── jwt/
// │   │   └── handler.go
// │   └── billing/
// │       ├── internal/   // only billing/ can use these
// │       │   └── stripe/
// │       └── handler.go
// └── pkg/                // public packages

// auth/handler.go CAN import auth/internal/jwt
// billing/handler.go CANNOT import auth/internal/jwt
// This prevents cross-service coupling of internal details

package main

import "fmt"

func main() {
    fmt.Println("Nested internal packages for micro-boundaries")
}`,
            output: `Nested internal packages for micro-boundaries`,
            tip: 'Use nested internal directories in monorepos to prevent accidental coupling between services. Each service maintains its own private implementation.',
          },
        ],
        quiz: [
          {
            question: 'What does the `internal/` directory enforce in a Go project?',
            options: [
              'Packages under internal/ are compiled as static libraries',
              'Packages under internal/ can only be imported by code within the parent directory',
              'Packages under internal/ are excluded from testing',
              'Packages under internal/ are automatically documented',
            ],
            correctIndex: 1,
            explanation:
              'The internal directory provides compiler-enforced encapsulation. Packages under internal/ can only be imported by code rooted at the parent of the internal/ directory. External modules cannot import these packages.',
          },
          {
            question: 'What happens if an external module tries to import a package under your internal/ directory?',
            options: [
              'It works but with a deprecation warning',
              'A runtime error occurs',
              'A compilation error: "use of internal package not allowed"',
              'The import is silently ignored',
            ],
            correctIndex: 2,
            explanation:
              'The Go compiler enforces the internal directory restriction. Any attempt by external code to import a package under internal/ results in a compilation error: "use of internal package not allowed".',
          },
          {
            question: 'In a project structure with services/auth/internal/jwt, who can import the jwt package?',
            options: [
              'Any package in the project',
              'Only packages under services/auth/ and its subdirectories',
              'Only the main package',
              'Only packages in the same directory as jwt',
            ],
            correctIndex: 1,
            explanation:
              'Nested internal directories scope access to their parent. The jwt package under services/auth/internal/ can only be imported by code within services/auth/ and its subdirectories. Other services like services/billing/ cannot import it.',
          },
        ],
        challenge: {
          prompt:
            'Design a Go project structure by writing a program that simulates the visibility rules of internal packages. Create a function that checks whether a given import path is allowed based on the internal/ directory rules.',
          starterCode: `package main

import (
    "fmt"
    "strings"
)

// canImport checks if importerPath is allowed to import targetPath
// based on Go internal package rules.
// Rule: if targetPath contains "/internal/", the importer must share
// the parent prefix before "/internal/".
func canImport(importerPath, targetPath string) bool {
    // TODO: implement the internal package visibility check
    return false
}

func main() {
    tests := []struct {
        importer string
        target   string
    }{
        {"myproject/cmd/server", "myproject/internal/auth"},
        {"otherproject/main", "myproject/internal/auth"},
        {"myproject/services/auth", "myproject/services/auth/internal/jwt"},
        {"myproject/services/billing", "myproject/services/auth/internal/jwt"},
    }

    for _, t := range tests {
        allowed := canImport(t.importer, t.target)
        status := "ALLOWED"
        if !allowed {
            status = "BLOCKED"
        }
        fmt.Printf("%s -> %s: %s\\n", t.importer, t.target, status)
    }
}`,
          solutionCode: `package main

import (
    "fmt"
    "strings"
)

func canImport(importerPath, targetPath string) bool {
    idx := strings.Index(targetPath, "/internal/")
    if idx == -1 {
        // Also check if it ends with /internal
        if strings.HasSuffix(targetPath, "/internal") {
            idx = len(targetPath) - len("/internal")
        } else {
            return true // no internal directory, always allowed
        }
    }

    // The importer must share the prefix up to and including the parent of internal/
    requiredPrefix := targetPath[:idx]
    return strings.HasPrefix(importerPath, requiredPrefix)
}

func main() {
    tests := []struct {
        importer string
        target   string
    }{
        {"myproject/cmd/server", "myproject/internal/auth"},
        {"otherproject/main", "myproject/internal/auth"},
        {"myproject/services/auth", "myproject/services/auth/internal/jwt"},
        {"myproject/services/billing", "myproject/services/auth/internal/jwt"},
    }

    for _, t := range tests {
        allowed := canImport(t.importer, t.target)
        status := "ALLOWED"
        if !allowed {
            status = "BLOCKED"
        }
        fmt.Printf("%s -> %s: %s\\n", t.importer, t.target, status)
    }
}`,
          hints: [
            'Use strings.Index to find "/internal/" in the target path. If not found, the import is always allowed.',
            'Extract the prefix of the target path before "/internal/" -- this is the required parent directory.',
            'Check if the importer path starts with that required prefix using strings.HasPrefix.',
          ],
        },
      },
    ],
  },
];
