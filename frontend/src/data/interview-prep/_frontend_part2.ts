import type { InterviewTopic } from './types';

export const FRONTEND_PART2_TOPICS: InterviewTopic[] = [
  // ──────────────────────────────────────────────
  // 1. React Advanced (12 Qs)
  // ──────────────────────────────────────────────
  {
    id: 'fe-react-advanced',
    label: 'React Advanced',
    icon: 'Atom',
    description:
      'Advanced React patterns including hooks, memoization, concurrent features, and component composition strategies.',
    questions: [
      {
        id: 'fe-react-advanced-usecallback',
        title: 'What is useCallback and when should you use it?',
        difficulty: 'intermediate',
        answer:
          'useCallback memoizes a function reference so it stays the same between renders unless its dependencies change. It prevents unnecessary re-renders of child components that receive the callback as a prop, especially when paired with React.memo.',
        tags: ['react', 'hooks', 'memoization'],
        keyTakeaway:
          'Use useCallback to stabilize function references passed to memoized children.',
      },
      {
        id: 'fe-react-advanced-usememo',
        title: 'How does useMemo differ from useCallback?',
        difficulty: 'intermediate',
        answer:
          'useMemo memoizes a computed value, while useCallback memoizes a function reference. useMemo runs the factory function and caches its return value; useCallback simply returns the same function object without invoking it.',
        tags: ['react', 'hooks', 'performance'],
        keyTakeaway:
          'useMemo caches values, useCallback caches functions.',
      },
      {
        id: 'fe-react-advanced-useref',
        title: 'What are the use cases for useRef?',
        difficulty: 'intermediate',
        answer:
          'useRef creates a mutable object whose .current property persists across renders without triggering re-renders. Common uses include accessing DOM nodes, storing previous values, and holding mutable instance variables like timer IDs.',
        tags: ['react', 'hooks', 'refs'],
        keyTakeaway:
          'useRef is for mutable values that persist across renders without causing re-renders.',
      },
      {
        id: 'fe-react-advanced-custom-hooks',
        title: 'What are custom hooks and why use them?',
        difficulty: 'intermediate',
        answer:
          'Custom hooks are functions prefixed with "use" that encapsulate reusable stateful logic by composing built-in hooks. They let you extract component logic into shareable functions without changing the component hierarchy or using render props.',
        tags: ['react', 'hooks', 'patterns'],
        keyTakeaway:
          'Custom hooks extract and share stateful logic between components.',
      },
      {
        id: 'fe-react-advanced-context',
        title: 'How does the Context API work?',
        difficulty: 'intermediate',
        answer:
          'Context provides a way to pass data through the component tree without prop drilling. You create a context with createContext, wrap a subtree with a Provider that supplies a value, and consume it via useContext in any descendant.',
        tags: ['react', 'context', 'state'],
        keyTakeaway:
          'Context eliminates prop drilling by broadcasting state to an entire subtree.',
      },
      {
        id: 'fe-react-advanced-memo',
        title: 'What does React.memo do?',
        difficulty: 'intermediate',
        answer:
          'React.memo is a higher-order component that memoizes the rendered output, skipping re-renders if props haven\'t changed. It performs a shallow comparison by default but accepts a custom comparator as a second argument.',
        tags: ['react', 'memo', 'optimization'],
        keyTakeaway:
          'Use React.memo to prevent unnecessary re-renders of pure components.',
      },
      {
        id: 'fe-react-advanced-suspense',
        title: 'What are React.Suspense and React.lazy?',
        difficulty: 'advanced',
        answer:
          'React.lazy lets you define a component that is loaded dynamically via code splitting, returning a module with a default export. Suspense wraps lazy components and displays a fallback UI while the chunk is being fetched over the network.',
        tags: ['react', 'suspense', 'code-splitting'],
        keyTakeaway:
          'Suspense + lazy enable declarative code splitting with a loading fallback.',
      },
      {
        id: 'fe-react-advanced-error-boundaries',
        title: 'What are error boundaries in React?',
        difficulty: 'advanced',
        answer:
          'Error boundaries are class components that catch JavaScript errors in their child component tree during rendering, lifecycle methods, and constructors. They use getDerivedStateFromError and componentDidCatch to display a fallback UI instead of crashing the whole app.',
        tags: ['react', 'error-handling', 'resilience'],
        keyTakeaway:
          'Error boundaries catch render-time errors and show a fallback UI.',
      },
      {
        id: 'fe-react-advanced-portals',
        title: 'What are React portals?',
        difficulty: 'advanced',
        answer:
          'Portals render children into a DOM node that exists outside the parent component\'s DOM hierarchy using ReactDOM.createPortal. They are ideal for modals, tooltips, and dropdowns that need to visually break out of overflow-hidden containers.',
        tags: ['react', 'portals', 'dom'],
        keyTakeaway:
          'Portals render children outside the parent DOM tree while preserving React event bubbling.',
      },
      {
        id: 'fe-react-advanced-render-props',
        title: 'What is the render props pattern?',
        difficulty: 'advanced',
        answer:
          'Render props is a pattern where a component receives a function prop that returns React elements, allowing the parent to control what is rendered. It enables sharing stateful logic between components, though custom hooks have largely replaced this pattern.',
        tags: ['react', 'patterns', 'composition'],
        keyTakeaway:
          'Render props share logic via a function prop that returns JSX.',
      },
      {
        id: 'fe-react-advanced-hoc',
        title: 'What are higher-order components (HOCs)?',
        difficulty: 'advanced',
        answer:
          'A HOC is a function that takes a component and returns a new component with enhanced behavior, such as injecting props or wrapping with providers. They enable cross-cutting concerns like auth checks or data fetching without modifying the original component.',
        tags: ['react', 'hoc', 'patterns'],
        keyTakeaway:
          'HOCs wrap components to add shared behavior without changing the original.',
      },
      {
        id: 'fe-react-advanced-concurrent',
        title: 'What are React concurrent features?',
        difficulty: 'advanced',
        answer:
          'Concurrent features like useTransition and useDeferredValue let React interrupt rendering to keep the UI responsive. useTransition marks state updates as non-urgent so React can prioritize user input, while useDeferredValue delays re-rendering with a stale value.',
        tags: ['react', 'concurrent', 'performance'],
        keyTakeaway:
          'Concurrent features let React prioritize urgent updates over expensive re-renders.',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 2. Next.js & SSR (8 Qs)
  // ──────────────────────────────────────────────
  {
    id: 'fe-nextjs',
    label: 'Next.js & SSR',
    icon: 'Globe',
    description:
      'Next.js framework features including server-side rendering, static generation, App Router, and edge runtime.',
    questions: [
      {
        id: 'fe-nextjs-ssr-ssg-isr',
        title: 'What is the difference between SSR, SSG, and ISR?',
        difficulty: 'intermediate',
        answer:
          'SSR generates HTML on every request for fresh data. SSG pre-renders pages at build time for maximum speed. ISR combines both by serving static pages while revalidating them in the background after a configurable time interval.',
        tags: ['nextjs', 'ssr', 'ssg', 'isr'],
        keyTakeaway:
          'SSR is per-request, SSG is build-time, ISR is static with background revalidation.',
      },
      {
        id: 'fe-nextjs-data-fetching',
        title: 'What are getServerSideProps and getStaticProps?',
        difficulty: 'intermediate',
        answer:
          'getServerSideProps runs on every request and returns props for SSR pages. getStaticProps runs at build time and returns props for SSG pages, optionally with a revalidate key for ISR. Both execute only on the server and never ship to the client bundle.',
        tags: ['nextjs', 'data-fetching', 'ssr'],
        keyTakeaway:
          'getServerSideProps fetches per-request; getStaticProps fetches at build time.',
      },
      {
        id: 'fe-nextjs-app-router',
        title: 'What is the Next.js App Router?',
        difficulty: 'advanced',
        answer:
          'The App Router uses a new directory-based routing system under the app/ folder with React Server Components by default. It supports nested layouts, loading states, error boundaries, and parallel routes via file conventions like layout.tsx, loading.tsx, and error.tsx.',
        tags: ['nextjs', 'app-router', 'rsc'],
        keyTakeaway:
          'The App Router uses server components by default with nested layout conventions.',
      },
      {
        id: 'fe-nextjs-server-actions',
        title: 'What are server actions in Next.js?',
        difficulty: 'advanced',
        answer:
          'Server actions are async functions marked with "use server" that run exclusively on the server and can be called directly from client components. They simplify form handling and mutations by eliminating the need to create separate API routes.',
        tags: ['nextjs', 'server-actions', 'forms'],
        keyTakeaway:
          'Server actions let client components call server-side functions directly without API routes.',
      },
      {
        id: 'fe-nextjs-middleware',
        title: 'How does Next.js middleware work?',
        difficulty: 'advanced',
        answer:
          'Middleware runs before a request is completed and can rewrite, redirect, or modify headers and cookies. It executes at the edge, defined in a middleware.ts file at the project root, and uses a matcher config to target specific paths.',
        tags: ['nextjs', 'middleware', 'edge'],
        keyTakeaway:
          'Middleware intercepts requests at the edge for auth, redirects, and header manipulation.',
      },
      {
        id: 'fe-nextjs-image',
        title: 'How does Next.js optimize images?',
        difficulty: 'beginner',
        answer:
          'The next/image component automatically resizes, converts to modern formats like WebP, and lazy-loads images. It requires width and height props to prevent layout shift and serves optimized images on-demand from a built-in image optimization API.',
        tags: ['nextjs', 'images', 'performance'],
        keyTakeaway:
          'next/image auto-optimizes format, size, and lazy loading to improve Core Web Vitals.',
      },
      {
        id: 'fe-nextjs-routing',
        title: 'How does file-based routing work in Next.js?',
        difficulty: 'beginner',
        answer:
          'Each file in the pages/ or app/ directory automatically becomes a route matching its path. Dynamic segments use bracket syntax like [id].tsx, and catch-all routes use [...slug].tsx. No manual router configuration is needed.',
        tags: ['nextjs', 'routing', 'file-system'],
        keyTakeaway:
          'Files and folders in pages/ or app/ map directly to URL routes.',
      },
      {
        id: 'fe-nextjs-edge-runtime',
        title: 'What is the Edge Runtime in Next.js?',
        difficulty: 'advanced',
        answer:
          'The Edge Runtime is a lightweight V8-based environment that runs closer to users with minimal cold starts. It supports a subset of Node.js APIs and is used for middleware and edge API routes where low latency is critical.',
        tags: ['nextjs', 'edge', 'runtime'],
        keyTakeaway:
          'Edge Runtime provides low-latency execution near users with a limited API surface.',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 3. State Management (8 Qs)
  // ──────────────────────────────────────────────
  {
    id: 'fe-state',
    label: 'State Management',
    icon: 'Database',
    description:
      'State management solutions including Redux, Zustand, Jotai, and patterns for server state and optimistic updates.',
    questions: [
      {
        id: 'fe-state-redux-basics',
        title: 'How do actions, reducers, and the store work in Redux?',
        difficulty: 'intermediate',
        answer:
          'Actions are plain objects describing what happened, reducers are pure functions that compute the next state from the current state and an action, and the store holds the single state tree. Components dispatch actions, the store runs the reducer, and subscribers re-render.',
        tags: ['redux', 'state', 'architecture'],
        keyTakeaway:
          'Redux uses a unidirectional flow: dispatch action, reducer computes new state, UI updates.',
      },
      {
        id: 'fe-state-redux-toolkit',
        title: 'What is Redux Toolkit and why use it?',
        difficulty: 'intermediate',
        answer:
          'Redux Toolkit (RTK) is the official opinionated toolset that simplifies Redux with createSlice, createAsyncThunk, and configureStore. It reduces boilerplate by auto-generating action creators and using Immer for immutable updates internally.',
        tags: ['redux', 'rtk', 'tooling'],
        keyTakeaway:
          'RTK eliminates Redux boilerplate with createSlice and built-in Immer support.',
      },
      {
        id: 'fe-state-zustand',
        title: 'What is Zustand and how does it differ from Redux?',
        difficulty: 'intermediate',
        answer:
          'Zustand is a lightweight state management library that uses a hook-based API with no providers or boilerplate. Unlike Redux, it has no actions or reducers; you simply define a store with state and updater functions using the create function.',
        tags: ['zustand', 'state', 'hooks'],
        keyTakeaway:
          'Zustand offers minimal boilerplate state management with a simple hook-based API.',
      },
      {
        id: 'fe-state-jotai',
        title: 'What is Jotai and how does it work?',
        difficulty: 'advanced',
        answer:
          'Jotai is an atomic state management library where each piece of state is an atom created with the atom function. Components subscribe to individual atoms via useAtom, causing re-renders only when that specific atom changes, enabling fine-grained reactivity.',
        tags: ['jotai', 'atoms', 'state'],
        keyTakeaway:
          'Jotai uses atoms for bottom-up, fine-grained state management.',
      },
      {
        id: 'fe-state-react-query',
        title: 'How does React Query handle server state?',
        difficulty: 'intermediate',
        answer:
          'React Query caches server responses, automatically refetches stale data, and provides loading/error states via useQuery. It separates server state from client state, handling background updates, pagination, and cache invalidation out of the box.',
        tags: ['react-query', 'server-state', 'caching'],
        keyTakeaway:
          'React Query manages server state with automatic caching, refetching, and cache invalidation.',
      },
      {
        id: 'fe-state-context-vs-redux',
        title: 'When should you use Context API vs Redux?',
        difficulty: 'intermediate',
        answer:
          'Context is ideal for low-frequency updates like themes or locale since every consumer re-renders on any value change. Redux is better for high-frequency updates because it uses selectors to subscribe components only to specific slices of state.',
        tags: ['context', 'redux', 'comparison'],
        keyTakeaway:
          'Use Context for infrequent global values; use Redux when many components need granular subscriptions.',
      },
      {
        id: 'fe-state-normalization',
        title: 'What is state normalization?',
        difficulty: 'advanced',
        answer:
          'State normalization stores entities in a flat structure keyed by ID with separate arrays of IDs for ordering, similar to a database. This avoids deeply nested data, eliminates duplication, and makes updates O(1) lookups instead of traversals.',
        tags: ['state', 'normalization', 'patterns'],
        keyTakeaway:
          'Normalize state into flat ID-keyed maps to avoid nesting and duplication.',
      },
      {
        id: 'fe-state-optimistic',
        title: 'What are optimistic updates?',
        difficulty: 'advanced',
        answer:
          'Optimistic updates immediately reflect a mutation in the UI before the server confirms it, then roll back if the request fails. This makes the app feel instant; React Query supports this via onMutate for cache manipulation and onError for rollback.',
        tags: ['optimistic', 'mutations', 'ux'],
        keyTakeaway:
          'Optimistic updates show expected results immediately and roll back on failure.',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 4. Browser Internals (10 Qs)
  // ──────────────────────────────────────────────
  {
    id: 'fe-browser',
    label: 'Browser Internals',
    icon: 'Monitor',
    description:
      'How browsers work under the hood including rendering pipeline, event handling, observers, and JavaScript engine internals.',
    questions: [
      {
        id: 'fe-browser-crp',
        title: 'What is the critical rendering path?',
        difficulty: 'advanced',
        answer:
          'The critical rendering path is the sequence of steps the browser takes to convert HTML, CSS, and JS into pixels on screen. It includes building the DOM, constructing the CSSOM, creating the render tree, computing layout, and painting.',
        tags: ['browser', 'rendering', 'performance'],
        keyTakeaway:
          'The CRP is DOM + CSSOM -> render tree -> layout -> paint.',
      },
      {
        id: 'fe-browser-dom-cssom',
        title: 'What are the DOM and CSSOM?',
        difficulty: 'intermediate',
        answer:
          'The DOM is a tree representation of the HTML document that JavaScript can manipulate. The CSSOM is a similar tree for CSS rules. The browser combines both into a render tree that contains only visible nodes with their computed styles.',
        tags: ['browser', 'dom', 'cssom'],
        keyTakeaway:
          'DOM represents HTML structure; CSSOM represents styles; both merge into the render tree.',
      },
      {
        id: 'fe-browser-reflow-repaint',
        title: 'What is the difference between reflow and repaint?',
        difficulty: 'intermediate',
        answer:
          'Reflow recalculates the geometry and position of elements when layout changes occur, such as width or height modifications. Repaint updates visual properties like color or visibility without affecting layout. Reflow is more expensive and always triggers repaint.',
        tags: ['browser', 'reflow', 'repaint'],
        keyTakeaway:
          'Reflow recalculates layout and is costlier; repaint only updates visual appearance.',
      },
      {
        id: 'fe-browser-event-delegation',
        title: 'What is event delegation?',
        difficulty: 'intermediate',
        answer:
          'Event delegation attaches a single event listener to a parent element instead of individual listeners on each child, leveraging event bubbling. You check event.target to identify which child was clicked, reducing memory usage and handling dynamic elements automatically.',
        tags: ['browser', 'events', 'delegation'],
        keyTakeaway:
          'Attach one listener to a parent and use bubbling to handle events from children.',
      },
      {
        id: 'fe-browser-v8',
        title: 'How does the V8 engine execute JavaScript?',
        difficulty: 'advanced',
        answer:
          'V8 first parses JS into an AST, then compiles it to bytecode via Ignition (the interpreter). Hot code paths are optimized by TurboFan (the JIT compiler) into machine code. It deoptimizes back to bytecode if type assumptions are violated.',
        tags: ['v8', 'engine', 'compilation'],
        keyTakeaway:
          'V8 uses Ignition for bytecode and TurboFan for JIT-compiled hot paths.',
      },
      {
        id: 'fe-browser-gc',
        title: 'How does garbage collection work in browsers?',
        difficulty: 'advanced',
        answer:
          'V8 uses a generational garbage collector with a young generation (Scavenger) for short-lived objects and an old generation (Mark-Compact) for long-lived ones. Objects that survive multiple young-gen collections are promoted to the old generation.',
        tags: ['browser', 'gc', 'memory'],
        keyTakeaway:
          'V8 uses generational GC: Scavenger for young objects, Mark-Compact for old ones.',
      },
      {
        id: 'fe-browser-raf',
        title: 'What is requestAnimationFrame?',
        difficulty: 'intermediate',
        answer:
          'requestAnimationFrame schedules a callback to run before the next browser repaint, typically at 60fps. Unlike setTimeout, it syncs with the display refresh rate, pauses in background tabs, and batches DOM reads/writes for smooth animations.',
        tags: ['browser', 'animation', 'raf'],
        keyTakeaway:
          'Use rAF for smooth animations synced to the browser\'s repaint cycle.',
      },
      {
        id: 'fe-browser-intersection-observer',
        title: 'What is the Intersection Observer API?',
        difficulty: 'intermediate',
        answer:
          'Intersection Observer asynchronously watches for an element entering or leaving the viewport or a parent container. It fires a callback with intersection ratios, making it ideal for lazy loading images, infinite scroll, and analytics tracking without scroll listeners.',
        tags: ['browser', 'observer', 'lazy-loading'],
        keyTakeaway:
          'Intersection Observer detects element visibility changes without scroll event listeners.',
      },
      {
        id: 'fe-browser-resize-observer',
        title: 'What is ResizeObserver?',
        difficulty: 'intermediate',
        answer:
          'ResizeObserver watches for changes in an element\'s content or border box dimensions and fires a callback with the new sizes. It replaces polling or window resize listeners for responsive components that need to adapt to their own container size.',
        tags: ['browser', 'observer', 'responsive'],
        keyTakeaway:
          'ResizeObserver tracks element size changes for container-aware responsive layouts.',
      },
      {
        id: 'fe-browser-mutation-observer',
        title: 'What is MutationObserver?',
        difficulty: 'advanced',
        answer:
          'MutationObserver watches for changes to the DOM tree including attribute modifications, child additions/removals, and text content changes. It batches mutations and delivers them asynchronously, replacing the deprecated DOM Mutation Events.',
        tags: ['browser', 'observer', 'dom'],
        keyTakeaway:
          'MutationObserver efficiently watches DOM changes like attribute and child modifications.',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 5. Web APIs (8 Qs)
  // ──────────────────────────────────────────────
  {
    id: 'fe-web-apis',
    label: 'Web APIs',
    icon: 'Plug',
    description:
      'Browser-native APIs for networking, storage, offline capabilities, and device access.',
    questions: [
      {
        id: 'fe-web-apis-fetch',
        title: 'How does the Fetch API work?',
        difficulty: 'beginner',
        answer:
          'Fetch returns a Promise that resolves to a Response object for a given URL and options. You must call response.json() or response.text() to read the body. Unlike XMLHttpRequest, fetch only rejects on network failures, not on HTTP error status codes.',
        tags: ['fetch', 'networking', 'promises'],
        keyTakeaway:
          'Fetch is promise-based but does not reject on 4xx/5xx; check response.ok manually.',
      },
      {
        id: 'fe-web-apis-storage',
        title: 'What is the difference between localStorage and sessionStorage?',
        difficulty: 'beginner',
        answer:
          'Both store key-value string pairs scoped to the origin with a ~5MB limit. localStorage persists until explicitly cleared, while sessionStorage is cleared when the tab or window is closed. Neither is accessible from web workers or service workers.',
        tags: ['storage', 'localstorage', 'sessionstorage'],
        keyTakeaway:
          'localStorage persists forever; sessionStorage clears when the tab closes.',
      },
      {
        id: 'fe-web-apis-indexeddb',
        title: 'What is IndexedDB?',
        difficulty: 'intermediate',
        answer:
          'IndexedDB is a low-level, asynchronous, transactional database built into browsers for storing large amounts of structured data including files and blobs. It supports indexes for efficient queries and can store significantly more data than localStorage.',
        tags: ['indexeddb', 'storage', 'database'],
        keyTakeaway:
          'IndexedDB is a browser-native transactional database for large structured data.',
      },
      {
        id: 'fe-web-apis-service-workers',
        title: 'What are Service Workers?',
        difficulty: 'advanced',
        answer:
          'Service Workers are background scripts that act as a proxy between the browser and network, enabling offline caching, push notifications, and background sync. They run on a separate thread, cannot access the DOM, and require HTTPS.',
        tags: ['service-worker', 'offline', 'pwa'],
        keyTakeaway:
          'Service workers intercept network requests for offline caching and push notifications.',
      },
      {
        id: 'fe-web-apis-notifications',
        title: 'How does the Notifications API work?',
        difficulty: 'intermediate',
        answer:
          'The Notifications API displays system-level notifications to users after they grant permission via Notification.requestPermission(). You create a notification with new Notification(title, options) including body, icon, and click handlers.',
        tags: ['notifications', 'permissions', 'api'],
        keyTakeaway:
          'The Notifications API requires user permission to show native OS-level alerts.',
      },
      {
        id: 'fe-web-apis-geolocation',
        title: 'How does the Geolocation API work?',
        difficulty: 'beginner',
        answer:
          'The Geolocation API provides the device\'s geographic position via navigator.geolocation.getCurrentPosition() or watchPosition(). It requires user permission, returns latitude and longitude coordinates, and works over HTTPS only.',
        tags: ['geolocation', 'device', 'api'],
        keyTakeaway:
          'Geolocation provides lat/long coordinates after the user grants permission.',
      },
      {
        id: 'fe-web-apis-clipboard',
        title: 'How does the Clipboard API work?',
        difficulty: 'beginner',
        answer:
          'The Clipboard API provides async methods navigator.clipboard.writeText() and readText() for copying and pasting text. Write access works without permission in response to user gestures, but read access requires explicit user permission.',
        tags: ['clipboard', 'api', 'async'],
        keyTakeaway:
          'The Clipboard API provides async read/write with permission-gated access.',
      },
      {
        id: 'fe-web-apis-webrtc',
        title: 'What is WebRTC?',
        difficulty: 'advanced',
        answer:
          'WebRTC enables peer-to-peer audio, video, and data communication directly between browsers without a server relay. It uses STUN/TURN servers for NAT traversal and RTCPeerConnection for establishing the media connection with ICE candidates.',
        tags: ['webrtc', 'p2p', 'real-time'],
        keyTakeaway:
          'WebRTC enables direct peer-to-peer media and data streaming in the browser.',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 6. Performance (10 Qs)
  // ──────────────────────────────────────────────
  {
    id: 'fe-performance',
    label: 'Performance',
    icon: 'Zap',
    description:
      'Frontend performance optimization covering Core Web Vitals, loading strategies, and runtime performance patterns.',
    questions: [
      {
        id: 'fe-performance-cwv',
        title: 'What are Core Web Vitals?',
        difficulty: 'intermediate',
        answer:
          'Core Web Vitals are three Google metrics: LCP (Largest Contentful Paint) measures loading speed, FID (First Input Delay) measures interactivity, and CLS (Cumulative Layout Shift) measures visual stability. They directly impact search rankings.',
        tags: ['performance', 'cwv', 'metrics'],
        keyTakeaway:
          'Core Web Vitals measure loading (LCP), interactivity (FID), and stability (CLS).',
      },
      {
        id: 'fe-performance-lazy-loading',
        title: 'What is lazy loading?',
        difficulty: 'beginner',
        answer:
          'Lazy loading defers loading of resources until they are needed, typically when they enter the viewport. Images use the native loading="lazy" attribute, while components can be lazy-loaded with React.lazy or dynamic imports.',
        tags: ['performance', 'lazy-loading', 'optimization'],
        keyTakeaway:
          'Lazy loading defers off-screen resources to reduce initial page load time.',
      },
      {
        id: 'fe-performance-code-splitting',
        title: 'What is code splitting?',
        difficulty: 'intermediate',
        answer:
          'Code splitting breaks a bundle into smaller chunks loaded on demand using dynamic import() expressions. Route-based splitting loads code per page, while component-based splitting loads features only when they are first used.',
        tags: ['performance', 'bundling', 'code-splitting'],
        keyTakeaway:
          'Code splitting reduces initial bundle size by loading chunks on demand.',
      },
      {
        id: 'fe-performance-tree-shaking',
        title: 'What is tree shaking?',
        difficulty: 'intermediate',
        answer:
          'Tree shaking is a dead code elimination technique that removes unused exports from the final bundle. It relies on ES module static structure to determine which exports are actually imported, and works best when libraries avoid side effects.',
        tags: ['performance', 'bundling', 'tree-shaking'],
        keyTakeaway:
          'Tree shaking removes unused exports by analyzing ES module import/export relationships.',
      },
      {
        id: 'fe-performance-image-opt',
        title: 'How do you optimize images for the web?',
        difficulty: 'beginner',
        answer:
          'Use modern formats like WebP or AVIF for smaller file sizes, serve responsive sizes via srcset, lazy-load off-screen images, and specify width/height to prevent layout shift. CDN-based image services can automate format and size negotiation.',
        tags: ['performance', 'images', 'optimization'],
        keyTakeaway:
          'Use modern formats, responsive sizes, lazy loading, and explicit dimensions for images.',
      },
      {
        id: 'fe-performance-fonts',
        title: 'How do you optimize font loading?',
        difficulty: 'intermediate',
        answer:
          'Use font-display: swap to show fallback text while loading, preload critical fonts with link rel="preload", subset fonts to include only needed characters, and self-host to avoid third-party DNS lookups.',
        tags: ['performance', 'fonts', 'loading'],
        keyTakeaway:
          'Use font-display: swap, preload critical fonts, and subset to reduce font payload.',
      },
      {
        id: 'fe-performance-prefetch-preload',
        title: 'What is the difference between prefetch and preload?',
        difficulty: 'intermediate',
        answer:
          'Preload fetches a resource with high priority for the current page, used for critical assets like fonts or hero images. Prefetch fetches resources with low priority for likely future navigations. Both use link elements with different rel attributes.',
        tags: ['performance', 'preload', 'prefetch'],
        keyTakeaway:
          'Preload is high-priority for current page; prefetch is low-priority for future pages.',
      },
      {
        id: 'fe-performance-debounce-throttle',
        title: 'What is the difference between debounce and throttle?',
        difficulty: 'intermediate',
        answer:
          'Debounce delays execution until a pause in events, firing only after the last call within a wait period. Throttle ensures execution at most once per interval. Use debounce for search inputs and throttle for scroll or resize handlers.',
        tags: ['performance', 'debounce', 'throttle'],
        keyTakeaway:
          'Debounce waits for inactivity; throttle limits to once per interval.',
      },
      {
        id: 'fe-performance-virtualization',
        title: 'What is list virtualization?',
        difficulty: 'advanced',
        answer:
          'Virtualization renders only the visible items in a long list plus a small buffer, replacing off-screen elements with empty space. Libraries like react-window and TanStack Virtual dramatically reduce DOM nodes and improve scroll performance.',
        tags: ['performance', 'virtualization', 'rendering'],
        keyTakeaway:
          'Virtualization renders only visible list items to minimize DOM nodes.',
      },
      {
        id: 'fe-performance-bundle-analysis',
        title: 'How do you analyze bundle size?',
        difficulty: 'intermediate',
        answer:
          'Tools like webpack-bundle-analyzer and vite-plugin-visualizer generate treemaps showing each module\'s size in the bundle. source-map-explorer provides similar insights. These tools help identify large dependencies that should be code-split or replaced.',
        tags: ['performance', 'bundling', 'analysis'],
        keyTakeaway:
          'Bundle analyzers create visual treemaps to identify oversized dependencies.',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 7. Accessibility (6 Qs)
  // ──────────────────────────────────────────────
  {
    id: 'fe-a11y',
    label: 'Accessibility',
    icon: 'Eye',
    description:
      'Web accessibility standards, ARIA, keyboard navigation, and inclusive design practices.',
    questions: [
      {
        id: 'fe-a11y-wcag',
        title: 'What are the WCAG guidelines?',
        difficulty: 'intermediate',
        answer:
          'WCAG (Web Content Accessibility Guidelines) define standards organized under four principles: Perceivable, Operable, Understandable, and Robust (POUR). Compliance levels are A (minimum), AA (standard target), and AAA (highest). Most organizations aim for AA.',
        tags: ['a11y', 'wcag', 'standards'],
        keyTakeaway:
          'WCAG follows POUR principles with AA as the standard compliance target.',
      },
      {
        id: 'fe-a11y-aria',
        title: 'What are ARIA roles and properties?',
        difficulty: 'intermediate',
        answer:
          'ARIA (Accessible Rich Internet Applications) adds roles, states, and properties to HTML elements to convey meaning to assistive technologies. Roles define what an element is, aria-label provides text labels, and aria-live announces dynamic content changes.',
        tags: ['a11y', 'aria', 'semantics'],
        keyTakeaway:
          'ARIA attributes communicate element purpose and state to screen readers.',
      },
      {
        id: 'fe-a11y-keyboard',
        title: 'How do you implement keyboard navigation?',
        difficulty: 'intermediate',
        answer:
          'Ensure all interactive elements are focusable with logical tab order using tabIndex. Handle Enter and Space for activation, Escape for dismissal, and arrow keys for composite widgets. Visible focus indicators are required and should never be removed.',
        tags: ['a11y', 'keyboard', 'navigation'],
        keyTakeaway:
          'All interactive elements must be keyboard-operable with visible focus indicators.',
      },
      {
        id: 'fe-a11y-focus',
        title: 'What is focus management and why does it matter?',
        difficulty: 'advanced',
        answer:
          'Focus management means programmatically controlling which element has focus during UI transitions like modal opens, route changes, or dynamic content updates. Trapping focus inside modals and restoring focus on close prevents users from interacting with hidden content.',
        tags: ['a11y', 'focus', 'modals'],
        keyTakeaway:
          'Manage focus during UI transitions to keep keyboard users oriented.',
      },
      {
        id: 'fe-a11y-screen-reader',
        title: 'How do you test with screen readers?',
        difficulty: 'advanced',
        answer:
          'Test with VoiceOver on macOS, NVDA or JAWS on Windows, and TalkBack on Android. Verify that all content is announced in logical order, interactive elements have accessible names, live regions update correctly, and images have meaningful alt text.',
        tags: ['a11y', 'screen-reader', 'testing'],
        keyTakeaway:
          'Test with native screen readers to verify announced content and interaction flow.',
      },
      {
        id: 'fe-a11y-contrast',
        title: 'What are the color contrast requirements?',
        difficulty: 'beginner',
        answer:
          'WCAG AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18px+ or 14px bold). Tools like Chrome DevTools, axe, and Lighthouse can audit contrast ratios. Never rely on color alone to convey information.',
        tags: ['a11y', 'contrast', 'color'],
        keyTakeaway:
          'Normal text needs 4.5:1 contrast; large text needs 3:1 under WCAG AA.',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 8. Frontend Testing (6 Qs)
  // ──────────────────────────────────────────────
  {
    id: 'fe-testing',
    label: 'Frontend Testing',
    icon: 'TestTube',
    description:
      'Testing strategies for frontend applications including unit, integration, and end-to-end testing.',
    questions: [
      {
        id: 'fe-testing-unit',
        title: 'How do Jest and Vitest work for unit testing?',
        difficulty: 'beginner',
        answer:
          'Jest and Vitest are test runners that execute test files matching patterns like *.test.ts, providing assertions (expect), mocking, and coverage reporting. Vitest is Vite-native and faster for Vite projects, while Jest has a larger ecosystem.',
        tags: ['testing', 'jest', 'vitest'],
        keyTakeaway:
          'Jest and Vitest run unit tests with assertions, mocking, and coverage out of the box.',
      },
      {
        id: 'fe-testing-rtl',
        title: 'What is React Testing Library?',
        difficulty: 'intermediate',
        answer:
          'React Testing Library renders components into a DOM and provides queries like getByRole, getByText, and getByLabelText that mirror how users find elements. It discourages testing implementation details and encourages testing behavior and accessibility.',
        tags: ['testing', 'rtl', 'react'],
        keyTakeaway:
          'RTL tests components from the user\'s perspective using accessible queries.',
      },
      {
        id: 'fe-testing-e2e',
        title: 'What are Playwright and Cypress for E2E testing?',
        difficulty: 'intermediate',
        answer:
          'Playwright and Cypress run tests against a real browser to simulate user workflows end-to-end. Playwright supports multiple browsers and parallel execution, while Cypress has a simpler API and interactive test runner with time-travel debugging.',
        tags: ['testing', 'e2e', 'playwright'],
        keyTakeaway:
          'E2E tools test full user flows in real browsers to catch integration issues.',
      },
      {
        id: 'fe-testing-snapshot',
        title: 'What is snapshot testing?',
        difficulty: 'beginner',
        answer:
          'Snapshot testing serializes a component\'s rendered output and compares it to a stored reference file. If the output changes, the test fails until you review and update the snapshot. It catches unintended UI changes but can produce brittle tests.',
        tags: ['testing', 'snapshot', 'regression'],
        keyTakeaway:
          'Snapshots detect unintended UI changes but require careful review on updates.',
      },
      {
        id: 'fe-testing-mocking',
        title: 'How do you mock dependencies in frontend tests?',
        difficulty: 'intermediate',
        answer:
          'Use jest.mock() or vi.mock() to replace modules with fake implementations. Mock API calls with MSW (Mock Service Worker) to intercept network requests at the service worker level, providing realistic responses without changing application code.',
        tags: ['testing', 'mocking', 'msw'],
        keyTakeaway:
          'Mock modules with jest.mock/vi.mock and network requests with MSW.',
      },
      {
        id: 'fe-testing-coverage',
        title: 'What is test coverage and how much is enough?',
        difficulty: 'beginner',
        answer:
          'Test coverage measures what percentage of code lines, branches, functions, and statements are executed during tests. Aim for 70-80% on critical paths rather than chasing 100%, which often leads to brittle tests with diminishing returns.',
        tags: ['testing', 'coverage', 'quality'],
        keyTakeaway:
          'Target 70-80% coverage on critical code paths, not 100% everywhere.',
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 9. Build Tools (6 Qs)
  // ──────────────────────────────────────────────
  {
    id: 'fe-build',
    label: 'Build Tools',
    icon: 'Hammer',
    description:
      'Frontend build tools, bundlers, transpilers, and monorepo tooling for modern development workflows.',
    questions: [
      {
        id: 'fe-build-bundlers',
        title: 'How do Webpack, Vite, and esbuild compare?',
        difficulty: 'intermediate',
        answer:
          'Webpack is the most configurable bundler with a vast plugin ecosystem but slower builds. Vite uses native ES modules in dev for instant HMR and esbuild/Rollup for production builds. esbuild is an ultra-fast Go-based bundler used as a foundation by other tools.',
        tags: ['build', 'webpack', 'vite', 'esbuild'],
        keyTakeaway:
          'Vite offers the best DX; Webpack has the largest ecosystem; esbuild is the fastest.',
      },
      {
        id: 'fe-build-hmr',
        title: 'What is Hot Module Replacement (HMR)?',
        difficulty: 'intermediate',
        answer:
          'HMR swaps updated modules at runtime without a full page reload, preserving application state during development. Vite achieves near-instant HMR by leveraging native ES modules, while Webpack HMR works through its module system and runtime.',
        tags: ['build', 'hmr', 'dx'],
        keyTakeaway:
          'HMR replaces changed modules without reloading, preserving app state during development.',
      },
      {
        id: 'fe-build-sourcemaps',
        title: 'What are source maps?',
        difficulty: 'beginner',
        answer:
          'Source maps are files that map minified/transpiled production code back to original source code for debugging. They allow browser DevTools to show original file names, line numbers, and variable names. They should be hidden from production users.',
        tags: ['build', 'sourcemaps', 'debugging'],
        keyTakeaway:
          'Source maps connect minified code to original source for production debugging.',
      },
      {
        id: 'fe-build-transpilers',
        title: 'What is the difference between Babel and SWC?',
        difficulty: 'intermediate',
        answer:
          'Babel is a JavaScript transpiler written in JavaScript that converts modern syntax to older versions with a rich plugin ecosystem. SWC is a Rust-based alternative that is 20-70x faster and is used by Next.js and Vite as a drop-in Babel replacement.',
        tags: ['build', 'babel', 'swc'],
        keyTakeaway:
          'SWC is a Rust-based Babel alternative that is significantly faster.',
      },
      {
        id: 'fe-build-module-bundling',
        title: 'How does module bundling work?',
        difficulty: 'intermediate',
        answer:
          'A bundler starts from entry points, builds a dependency graph by following import/require statements, and concatenates modules into output chunks. It applies transformations, resolves aliases, and optimizes with tree shaking and minification.',
        tags: ['build', 'bundling', 'modules'],
        keyTakeaway:
          'Bundlers trace imports from entry points to build a dependency graph and emit optimized chunks.',
      },
      {
        id: 'fe-build-monorepos',
        title: 'What are Turborepo and Nx for monorepos?',
        difficulty: 'advanced',
        answer:
          'Turborepo and Nx are build orchestration tools for monorepos that cache task outputs, run tasks in parallel respecting dependency order, and skip unchanged packages. Turborepo is simpler and Vercel-backed, while Nx offers richer plugins and code generators.',
        tags: ['build', 'monorepo', 'turborepo'],
        keyTakeaway:
          'Monorepo tools cache builds and parallelize tasks across packages.',
      },
    ],
  },
];
