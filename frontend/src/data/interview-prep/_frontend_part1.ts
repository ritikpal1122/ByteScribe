import type { InterviewTopic } from './types';

export const FRONTEND_PART1_TOPICS: InterviewTopic[] = [
  // ─────────────────────────────────────────────
  // 1. HTML Fundamentals (10 questions)
  // ─────────────────────────────────────────────
  {
    id: 'fe-html',
    label: 'HTML Fundamentals',
    icon: 'FileCode',
    description:
      'Core HTML concepts including semantic markup, DOCTYPE, meta tags, forms, accessibility, and modern web platform features.',
    questions: [
      {
        id: 'fe-html-semantic',
        title: 'What is semantic HTML?',
        difficulty: 'beginner',
        answer:
          'Semantic HTML uses meaningful tags like <article>, <nav>, <header>, <main>, and <section> instead of generic <div>s. It improves accessibility for screen readers, boosts SEO, and makes code self-documenting.',
        tags: ['html', 'semantics', 'accessibility'],
        keyTakeaway: 'Use semantic tags to convey meaning and improve accessibility.',
      },
      {
        id: 'fe-html-doctype',
        title: 'What is DOCTYPE and why is it required?',
        difficulty: 'beginner',
        answer:
          'The <!DOCTYPE html> declaration must be the first line of an HTML document. It tells the browser to use standards mode rendering instead of quirks mode, which emulates buggy legacy behavior from the 1990s.',
        tags: ['html', 'doctype', 'rendering'],
        keyTakeaway: 'DOCTYPE activates standards mode; omitting it triggers quirks mode.',
      },
      {
        id: 'fe-html-meta',
        title: 'Which meta tags are essential for modern web pages?',
        difficulty: 'beginner',
        answer:
          'The charset meta declares encoding (UTF-8), the viewport meta enables responsive design on mobile, and description influences search snippets. Open Graph and Twitter Card meta tags control social sharing previews.',
        tags: ['html', 'meta-tags', 'seo'],
        keyTakeaway: 'Charset and viewport meta tags are non-negotiable for every page.',
      },
      {
        id: 'fe-html-forms',
        title: 'How do HTML forms and input types work?',
        difficulty: 'beginner',
        answer:
          'A <form> collects user input via controls like <input>, <select>, and <textarea>, then submits data via GET or POST. HTML5 added input types like email, date, number, and range that provide built-in validation and mobile-optimized keyboards.',
        tags: ['html', 'forms', 'validation'],
        keyTakeaway: 'Use HTML5 input types for free validation and better mobile UX.',
      },
      {
        id: 'fe-html-aria',
        title: 'What are ARIA attributes and when should you use them?',
        difficulty: 'intermediate',
        answer:
          'ARIA (Accessible Rich Internet Applications) attributes modify how elements appear in the accessibility tree. They include roles (role="dialog"), states (aria-expanded), and properties (aria-label). Use them only when native HTML elements cannot convey the needed semantics.',
        tags: ['html', 'aria', 'accessibility'],
        keyTakeaway: 'Prefer native HTML semantics first; use ARIA only for custom widgets.',
      },
      {
        id: 'fe-html-data-attrs',
        title: 'What are data attributes and how do you access them?',
        difficulty: 'beginner',
        answer:
          'Data attributes (data-*) store custom metadata on HTML elements. Access them in JavaScript via element.dataset (data-user-id becomes dataset.userId) and in CSS via attribute selectors like [data-status="active"]. They should not hold sensitive or large data.',
        tags: ['html', 'data-attributes', 'dom'],
        keyTakeaway: 'Data attributes attach custom metadata accessible via dataset in JS.',
      },
      {
        id: 'fe-html-script-loading',
        title: 'What is the difference between defer and async on script tags?',
        difficulty: 'intermediate',
        answer:
          'Both defer and async download scripts without blocking HTML parsing. Async executes immediately after download in no guaranteed order. Defer waits until HTML parsing completes and executes scripts in document order, making it ideal for dependent scripts.',
        tags: ['html', 'script', 'performance'],
        keyTakeaway: 'Use defer for ordered execution, async for independent scripts.',
      },
      {
        id: 'fe-html-web-components',
        title: 'What are Web Components?',
        difficulty: 'advanced',
        answer:
          'Web Components are browser APIs for creating reusable custom elements. They consist of Custom Elements (customElements.define), Shadow DOM for style/DOM encapsulation, and HTML Templates (<template>/<slot>) for inert markup and content projection.',
        tags: ['html', 'web-components', 'custom-elements'],
        keyTakeaway: 'Web Components provide native, framework-agnostic encapsulation.',
      },
      {
        id: 'fe-html-shadow-dom',
        title: 'What is Shadow DOM and why is it useful?',
        difficulty: 'advanced',
        answer:
          'Shadow DOM creates an encapsulated DOM subtree attached to an element via attachShadow(). Styles inside the shadow tree do not leak out and external styles do not penetrate in. This isolation prevents style conflicts in component-based architectures.',
        tags: ['html', 'shadow-dom', 'encapsulation'],
        keyTakeaway: 'Shadow DOM isolates styles and markup to prevent conflicts.',
      },
      {
        id: 'fe-html-html5-apis',
        title: 'What are some important HTML5 APIs?',
        difficulty: 'intermediate',
        answer:
          'HTML5 introduced many browser APIs including localStorage/sessionStorage for client-side storage, Geolocation for user location, Canvas/WebGL for graphics, Drag and Drop, History API for SPA routing, and the Intersection Observer for lazy loading.',
        tags: ['html', 'html5', 'browser-apis'],
        keyTakeaway: 'HTML5 APIs extend the browser beyond document rendering.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. CSS Fundamentals (12 questions)
  // ─────────────────────────────────────────────
  {
    id: 'fe-css',
    label: 'CSS Fundamentals',
    icon: 'Palette',
    description:
      'Core CSS concepts including box model, specificity, layout systems, positioning, and modern CSS features.',
    questions: [
      {
        id: 'fe-css-box-model',
        title: 'Explain the CSS box model.',
        difficulty: 'beginner',
        answer:
          'Every element is a box with four layers: content, padding, border, and margin. With content-box (default), width/height set only the content area. With border-box, width/height include padding and border, making sizing predictable.',
        tags: ['css', 'box-model', 'layout'],
        keyTakeaway: 'Use border-box universally so width/height behave intuitively.',
      },
      {
        id: 'fe-css-specificity',
        title: 'How does CSS specificity work?',
        difficulty: 'intermediate',
        answer:
          'Specificity is a tuple (IDs, classes, elements) that determines which rule wins. One ID (1,0,0) always beats any number of classes (0,N,0). Inline styles override all selectors, and !important overrides everything. :where() has zero specificity; :is() takes its highest argument.',
        tags: ['css', 'specificity', 'cascade'],
        keyTakeaway: 'IDs always outrank classes, which always outrank element selectors.',
      },
      {
        id: 'fe-css-flexbox',
        title: 'How does Flexbox work?',
        difficulty: 'beginner',
        answer:
          'Flexbox is a one-dimensional layout that distributes space along a main axis (row or column). Use justify-content for main-axis alignment and align-items for cross-axis. The flex shorthand (grow, shrink, basis) controls how items share space.',
        tags: ['css', 'flexbox', 'layout'],
        keyTakeaway: 'Flexbox handles one-dimensional layouts with flexible item sizing.',
      },
      {
        id: 'fe-css-grid',
        title: 'How does CSS Grid differ from Flexbox?',
        difficulty: 'intermediate',
        answer:
          'CSS Grid is a two-dimensional layout controlling rows and columns simultaneously. Define tracks with grid-template-columns/rows, use fr units for fractions of space, and repeat(auto-fill, minmax()) for responsive grids. Flexbox is better for single-axis alignment.',
        tags: ['css', 'grid', 'layout'],
        keyTakeaway: 'Grid handles two-dimensional layouts; Flexbox handles one dimension.',
      },
      {
        id: 'fe-css-positioning',
        title: 'Explain CSS position values: static, relative, absolute, fixed, sticky.',
        difficulty: 'beginner',
        answer:
          'Static is normal flow. Relative offsets from original position but preserves space. Absolute removes from flow, positions relative to nearest positioned ancestor. Fixed positions relative to viewport. Sticky acts as relative until a scroll threshold, then becomes fixed.',
        tags: ['css', 'positioning', 'layout'],
        keyTakeaway: 'Position controls whether elements stay in or leave document flow.',
      },
      {
        id: 'fe-css-cascade',
        title: 'What is the CSS cascade and how does it resolve conflicts?',
        difficulty: 'intermediate',
        answer:
          'The cascade determines which styles apply when multiple rules target the same element. Resolution order is: origin and importance, @layer order, specificity, then source order. CSS layers (@layer) give developers explicit control over cascade precedence.',
        tags: ['css', 'cascade', 'layers'],
        keyTakeaway: 'The cascade resolves conflicts via origin, layers, specificity, then order.',
      },
      {
        id: 'fe-css-pseudo',
        title: 'What is the difference between pseudo-classes and pseudo-elements?',
        difficulty: 'beginner',
        answer:
          'Pseudo-classes (:hover, :focus, :nth-child) select elements based on state or position without adding DOM nodes. Pseudo-elements (::before, ::after, ::first-line) create virtual sub-elements for styling. Pseudo-classes use single colon, pseudo-elements use double colon.',
        tags: ['css', 'pseudo-classes', 'pseudo-elements'],
        keyTakeaway: 'Pseudo-classes target states; pseudo-elements create virtual nodes.',
      },
      {
        id: 'fe-css-media-queries',
        title: 'How do media queries work?',
        difficulty: 'beginner',
        answer:
          'Media queries (@media) apply styles conditionally based on viewport width, height, orientation, or user preferences like prefers-color-scheme and prefers-reduced-motion. Mobile-first design uses min-width queries to progressively enhance layouts for larger screens.',
        tags: ['css', 'media-queries', 'responsive'],
        keyTakeaway: 'Media queries enable conditional styling based on device or user preferences.',
      },
      {
        id: 'fe-css-units',
        title: 'What are the differences between px, em, rem, vh, and vw?',
        difficulty: 'beginner',
        answer:
          'px is an absolute unit. em is relative to the parent font-size, causing compounding. rem is relative to the root font-size, avoiding compounding. vh/vw are 1% of viewport height/width. Use rem for typography, vh/vw for viewport-relative sizing.',
        tags: ['css', 'units', 'responsive'],
        keyTakeaway: 'Use rem for scalable typography and viewport units for layout sizing.',
      },
      {
        id: 'fe-css-z-index',
        title: 'How do z-index and stacking contexts work?',
        difficulty: 'intermediate',
        answer:
          'z-index controls layering order but only within a stacking context. New stacking contexts are created by positioned elements with z-index, opacity < 1, transform, and filter. A child with z-index: 9999 cannot escape a parent stacking context with a lower z-index.',
        tags: ['css', 'z-index', 'stacking-context'],
        keyTakeaway: 'z-index is scoped to stacking contexts, not the whole page.',
      },
      {
        id: 'fe-css-bem',
        title: 'What is BEM methodology?',
        difficulty: 'beginner',
        answer:
          'BEM (Block, Element, Modifier) is a CSS naming convention: .block__element--modifier. Block is the standalone component, element is a child part, and modifier is a variation. It prevents specificity wars and makes CSS predictable at scale.',
        tags: ['css', 'bem', 'methodology'],
        keyTakeaway: 'BEM provides flat, predictable class naming to avoid specificity conflicts.',
      },
      {
        id: 'fe-css-variables',
        title: 'How do CSS custom properties (variables) work?',
        difficulty: 'beginner',
        answer:
          'CSS custom properties are declared with --name and referenced with var(--name, fallback). Unlike preprocessor variables, they are live in the browser, follow cascade/inheritance rules, and can be changed at runtime via JavaScript for dynamic theming.',
        tags: ['css', 'custom-properties', 'theming'],
        keyTakeaway: 'CSS variables are live runtime values ideal for theming and design tokens.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. CSS Advanced (10 questions)
  // ─────────────────────────────────────────────
  {
    id: 'fe-css-advanced',
    label: 'CSS Advanced',
    icon: 'Wand2',
    description:
      'Advanced CSS topics including animations, container queries, CSS-in-JS, Tailwind, and modern layout features.',
    questions: [
      {
        id: 'fe-css-advanced-animations',
        title: 'What is the difference between CSS transitions and animations?',
        difficulty: 'intermediate',
        answer:
          'Transitions animate between two states on a trigger (hover, class change) with the transition shorthand. Animations use @keyframes for multi-step, autonomous motion that can loop, alternate, and run without triggers. Only animate transform and opacity for 60fps performance.',
        tags: ['css', 'animations', 'transitions'],
        keyTakeaway: 'Transitions handle A-to-B changes; animations handle complex multi-step motion.',
      },
      {
        id: 'fe-css-advanced-container-queries',
        title: 'What are container queries?',
        difficulty: 'advanced',
        answer:
          'Container queries (@container) let components respond to their parent container size instead of the viewport. Set container-type: inline-size on the parent, then use @container (min-width: 500px) to apply conditional styles. This makes components truly reusable across different layouts.',
        tags: ['css', 'container-queries', 'responsive'],
        keyTakeaway: 'Container queries make components adapt to their container, not the viewport.',
      },
      {
        id: 'fe-css-advanced-css-in-js',
        title: 'What is CSS-in-JS and what are its trade-offs?',
        difficulty: 'intermediate',
        answer:
          'CSS-in-JS (styled-components, Emotion) writes styles in JavaScript, enabling dynamic styling, scoping, and co-location with components. Trade-offs include runtime overhead, larger bundle size, and SSR complexity. Zero-runtime alternatives like vanilla-extract compile to static CSS.',
        tags: ['css', 'css-in-js', 'styled-components'],
        keyTakeaway: 'CSS-in-JS enables dynamic scoped styles at the cost of runtime overhead.',
      },
      {
        id: 'fe-css-advanced-tailwind',
        title: 'What is Tailwind CSS and the utility-first approach?',
        difficulty: 'beginner',
        answer:
          'Tailwind provides low-level utility classes (flex, p-4, text-blue-500) applied directly in HTML instead of writing custom CSS. It eliminates naming, reduces dead CSS via purging, and enforces design consistency through a config-driven token system.',
        tags: ['css', 'tailwind', 'utility-first'],
        keyTakeaway: 'Tailwind replaces custom CSS with composable utility classes.',
      },
      {
        id: 'fe-css-advanced-modules',
        title: 'What are CSS Modules?',
        difficulty: 'intermediate',
        answer:
          'CSS Modules scope class names locally by generating unique identifiers at build time (e.g., .title becomes .Title_abc123). This prevents global name collisions without runtime cost. You import styles as an object and reference them like styles.title in JSX.',
        tags: ['css', 'css-modules', 'scoping'],
        keyTakeaway: 'CSS Modules provide build-time class scoping with zero runtime cost.',
      },
      {
        id: 'fe-css-advanced-subgrid',
        title: 'What is CSS subgrid?',
        difficulty: 'advanced',
        answer:
          'Subgrid allows a nested grid item to inherit track definitions from its parent grid using grid-template-columns: subgrid. This solves the alignment problem where child grids need to align with the parent grid tracks without duplicating track sizes.',
        tags: ['css', 'subgrid', 'grid'],
        keyTakeaway: 'Subgrid lets child grids inherit parent track sizing for alignment.',
      },
      {
        id: 'fe-css-advanced-aspect-ratio',
        title: 'How does the aspect-ratio property work?',
        difficulty: 'beginner',
        answer:
          'The aspect-ratio property (e.g., aspect-ratio: 16/9) sets a preferred width-to-height ratio for an element. It replaces the old padding-top percentage hack. The browser automatically calculates the missing dimension, making responsive media embeds simple.',
        tags: ['css', 'aspect-ratio', 'layout'],
        keyTakeaway: 'aspect-ratio natively maintains element proportions without hacks.',
      },
      {
        id: 'fe-css-advanced-logical',
        title: 'What are CSS logical properties?',
        difficulty: 'intermediate',
        answer:
          'Logical properties (margin-inline-start, padding-block-end, inline-size) replace physical properties (margin-left, padding-bottom, width) with flow-relative directions. They automatically adapt to different writing modes and text directions (LTR/RTL) for internationalization.',
        tags: ['css', 'logical-properties', 'i18n'],
        keyTakeaway: 'Logical properties enable direction-agnostic layouts for i18n support.',
      },
      {
        id: 'fe-css-advanced-scroll-snap',
        title: 'How does CSS scroll-snap work?',
        difficulty: 'intermediate',
        answer:
          'Scroll-snap provides native snapping behavior for scrollable containers. Set scroll-snap-type on the container (x mandatory or y proximity) and scroll-snap-align on children (start, center, end). It enables carousel-like UX without JavaScript.',
        tags: ['css', 'scroll-snap', 'ux'],
        keyTakeaway: 'Scroll-snap creates native carousel-like snapping without JavaScript.',
      },
      {
        id: 'fe-css-advanced-color-functions',
        title: 'What are modern CSS color functions like oklch?',
        difficulty: 'advanced',
        answer:
          'oklch(lightness chroma hue) is a perceptually uniform color space where equal numeric changes produce equal visual changes. It supports a wider gamut than sRGB and makes palette generation predictable. Other modern functions include color-mix() for blending and relative color syntax.',
        tags: ['css', 'oklch', 'color'],
        keyTakeaway: 'oklch provides perceptually uniform colors with wide gamut support.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. JavaScript Core (12 questions)
  // ─────────────────────────────────────────────
  {
    id: 'fe-js-core',
    label: 'JavaScript Core',
    icon: 'Code',
    description:
      'Fundamental JavaScript concepts including closures, prototypes, the event loop, hoisting, and ES6+ features.',
    questions: [
      {
        id: 'fe-js-core-closures',
        title: 'What are closures in JavaScript?',
        difficulty: 'intermediate',
        answer:
          'A closure is a function that retains access to its outer scope variables even after the outer function returns. Every function in JavaScript creates a closure. They enable data privacy, memoization, and factory patterns.',
        tags: ['javascript', 'closures', 'scope'],
        keyTakeaway: 'Closures let inner functions access outer variables after the outer function exits.',
      },
      {
        id: 'fe-js-core-prototypes',
        title: 'How does prototypal inheritance work?',
        difficulty: 'advanced',
        answer:
          'Every object has a hidden [[Prototype]] link to another object. When a property is not found on an object, JavaScript walks up this chain until it finds it or reaches null. ES6 classes are syntactic sugar over the same prototype mechanism.',
        tags: ['javascript', 'prototypes', 'inheritance'],
        keyTakeaway: 'Property lookups traverse the prototype chain; classes are sugar over prototypes.',
      },
      {
        id: 'fe-js-core-event-loop',
        title: 'Explain the JavaScript event loop.',
        difficulty: 'advanced',
        answer:
          'The event loop enables async execution in a single thread. It runs all synchronous code, drains all microtasks (Promises, queueMicrotask), then executes one macrotask (setTimeout, I/O). Microtasks always run before macrotasks, so Promise.then fires before setTimeout(fn, 0).',
        tags: ['javascript', 'event-loop', 'async'],
        keyTakeaway: 'Microtasks (Promises) always execute before macrotasks (setTimeout).',
      },
      {
        id: 'fe-js-core-hoisting',
        title: 'What is hoisting in JavaScript?',
        difficulty: 'beginner',
        answer:
          'Hoisting moves declarations to the top of their scope during compilation. Function declarations are fully hoisted. var is hoisted and initialized to undefined. let/const are hoisted but remain in a Temporal Dead Zone until reached, throwing ReferenceError if accessed early.',
        tags: ['javascript', 'hoisting', 'scope'],
        keyTakeaway: 'var hoists as undefined; let/const enter a Temporal Dead Zone.',
      },
      {
        id: 'fe-js-core-this',
        title: 'How does the "this" keyword work in JavaScript?',
        difficulty: 'intermediate',
        answer:
          'The value of "this" depends on how a function is called: global context (window/undefined in strict), method call (the object), constructor (new instance), explicit binding (call/bind/apply). Arrow functions do not have their own "this" and inherit from the enclosing lexical scope.',
        tags: ['javascript', 'this', 'context'],
        keyTakeaway: 'Arrow functions inherit "this" lexically; regular functions get it from call site.',
      },
      {
        id: 'fe-js-core-equality',
        title: 'What is the difference between == and ===?',
        difficulty: 'beginner',
        answer:
          'Strict equality (===) checks value and type with no conversions. Loose equality (==) performs type coercion before comparing, leading to surprises like 0 == "" being true and null == undefined being true. Always prefer === to avoid implicit coercion bugs.',
        tags: ['javascript', 'equality', 'coercion'],
        keyTakeaway: 'Always use === to avoid unexpected type coercion.',
      },
      {
        id: 'fe-js-core-var-let-const',
        title: 'What are the differences between var, let, and const?',
        difficulty: 'beginner',
        answer:
          'var is function-scoped, hoisted to undefined, and allows redeclaration. let is block-scoped with TDZ and allows reassignment. const is block-scoped with TDZ, must be initialized, and cannot be reassigned (but object contents remain mutable). Default to const, use let when reassignment is needed.',
        tags: ['javascript', 'var', 'let', 'const'],
        keyTakeaway: 'Default to const; use let for reassignment; avoid var.',
      },
      {
        id: 'fe-js-core-destructuring',
        title: 'How does destructuring work in JavaScript?',
        difficulty: 'beginner',
        answer:
          'Destructuring extracts values from arrays or properties from objects into variables. Array destructuring uses position ([a, b] = arr), object destructuring uses keys ({name, age} = obj). You can set defaults, rename variables, and nest patterns.',
        tags: ['javascript', 'destructuring', 'es6'],
        keyTakeaway: 'Destructuring concisely extracts values from arrays and objects.',
      },
      {
        id: 'fe-js-core-spread-rest',
        title: 'What is the difference between spread and rest operators?',
        difficulty: 'beginner',
        answer:
          'Both use the ... syntax but serve opposite purposes. Spread expands an iterable into individual elements (fn(...args), [...arr], {...obj}). Rest collects remaining elements into an array or object (function(a, ...rest), {a, ...rest} = obj).',
        tags: ['javascript', 'spread', 'rest'],
        keyTakeaway: 'Spread expands; rest collects. Same syntax, opposite direction.',
      },
      {
        id: 'fe-js-core-template-literals',
        title: 'What are template literals?',
        difficulty: 'beginner',
        answer:
          'Template literals use backticks and support string interpolation via ${expression}, multi-line strings without \\n, and tagged templates for custom processing. Tagged templates (e.g., html`...`, css`...`) enable libraries like styled-components and GraphQL query builders.',
        tags: ['javascript', 'template-literals', 'es6'],
        keyTakeaway: 'Template literals enable interpolation, multi-line strings, and tagged processing.',
      },
      {
        id: 'fe-js-core-optional-chaining',
        title: 'What is optional chaining (?.)?',
        difficulty: 'beginner',
        answer:
          'Optional chaining (?.) short-circuits to undefined if the left side is null or undefined, preventing "Cannot read property of undefined" errors. It works on properties (obj?.a), methods (obj?.fn()), and bracket notation (obj?.[key]).',
        tags: ['javascript', 'optional-chaining', 'safety'],
        keyTakeaway: 'Optional chaining safely accesses nested properties without null checks.',
      },
      {
        id: 'fe-js-core-nullish-coalescing',
        title: 'What is the nullish coalescing operator (??)?',
        difficulty: 'beginner',
        answer:
          'The ?? operator returns the right operand only when the left is null or undefined, unlike || which also falls through on falsy values like 0, "", and false. Use ?? when 0 or empty string are valid values that should not trigger the fallback.',
        tags: ['javascript', 'nullish-coalescing', 'operators'],
        keyTakeaway: '?? only falls back on null/undefined, preserving valid falsy values.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. JavaScript Advanced (10 questions)
  // ─────────────────────────────────────────────
  {
    id: 'fe-js-advanced',
    label: 'JavaScript Advanced',
    icon: 'Sparkles',
    description:
      'Advanced JavaScript topics including Promises, async/await, generators, Proxy, WeakMap, symbols, and modules.',
    questions: [
      {
        id: 'fe-js-advanced-promises',
        title: 'How do Promises work and what are the key static methods?',
        difficulty: 'intermediate',
        answer:
          'A Promise represents an async operation with three states: pending, fulfilled, rejected. Chain with .then/.catch/.finally. Promise.all fails fast on any rejection, allSettled waits for all, race settles with the first, and any resolves with the first fulfillment.',
        tags: ['javascript', 'promises', 'async'],
        keyTakeaway: 'Promises model async results; use all/race/any for concurrent operations.',
      },
      {
        id: 'fe-js-advanced-async-await',
        title: 'How does async/await work under the hood?',
        difficulty: 'intermediate',
        answer:
          'async/await is syntactic sugar over Promises. An async function always returns a Promise. await pauses execution until the Promise settles, resuming as a microtask. Use try/catch for error handling. Avoid sequential awaits for independent operations; use Promise.all instead.',
        tags: ['javascript', 'async-await', 'promises'],
        keyTakeaway: 'async/await makes Promise-based code read synchronously.',
      },
      {
        id: 'fe-js-advanced-generators',
        title: 'What are generators in JavaScript?',
        difficulty: 'advanced',
        answer:
          'Generators are functions (function*) that can pause and resume via yield. Calling a generator returns an iterator. Each .next() resumes until the next yield. They enable lazy sequences, custom iterables, and are the foundation for async/await transpilation.',
        tags: ['javascript', 'generators', 'iterators'],
        keyTakeaway: 'Generators produce values lazily via yield, pausing between each.',
      },
      {
        id: 'fe-js-advanced-proxy-reflect',
        title: 'What are Proxy and Reflect?',
        difficulty: 'advanced',
        answer:
          'Proxy wraps an object and intercepts operations (get, set, has, deleteProperty) via handler traps. Reflect provides default implementations of those same operations. Together they enable validation, logging, reactive systems (Vue 3), and virtual objects.',
        tags: ['javascript', 'proxy', 'reflect'],
        keyTakeaway: 'Proxy intercepts object operations; Reflect provides their default behavior.',
      },
      {
        id: 'fe-js-advanced-weakmap-weakset',
        title: 'What are WeakMap and WeakSet?',
        difficulty: 'intermediate',
        answer:
          'WeakMap holds object keys with weak references, allowing garbage collection when no other references exist. WeakSet holds objects the same way. Neither is iterable or has a size property. Use them for private data, caching, and tracking without preventing GC.',
        tags: ['javascript', 'weakmap', 'memory'],
        keyTakeaway: 'Weak collections hold references without preventing garbage collection.',
      },
      {
        id: 'fe-js-advanced-symbols',
        title: 'What are Symbols in JavaScript?',
        difficulty: 'intermediate',
        answer:
          'Symbol() creates a unique, immutable primitive ideal for object property keys that avoid naming collisions. Well-known symbols like Symbol.iterator and Symbol.toPrimitive let you customize built-in behaviors. Symbols are not enumerable in for...in loops.',
        tags: ['javascript', 'symbols', 'primitives'],
        keyTakeaway: 'Symbols provide guaranteed-unique property keys and hook into built-in behavior.',
      },
      {
        id: 'fe-js-advanced-iterators',
        title: 'How do iterators and the iterable protocol work?',
        difficulty: 'intermediate',
        answer:
          'An iterable has a [Symbol.iterator]() method returning an iterator with a next() method that returns {value, done}. Arrays, strings, Maps, and Sets are built-in iterables. For...of, spread, and destructuring all consume iterables through this protocol.',
        tags: ['javascript', 'iterators', 'protocols'],
        keyTakeaway: 'The iterable protocol powers for...of, spread, and destructuring.',
      },
      {
        id: 'fe-js-advanced-modules',
        title: 'What is the difference between ESM and CommonJS?',
        difficulty: 'intermediate',
        answer:
          'ESM (import/export) is static, enabling tree-shaking and top-level await, and uses strict mode by default. CommonJS (require/module.exports) is dynamic, synchronous, and evaluated at runtime. Browsers and modern Node.js prefer ESM; CJS remains common in legacy Node packages.',
        tags: ['javascript', 'esm', 'commonjs'],
        keyTakeaway: 'ESM is static and tree-shakeable; CJS is dynamic and runtime-evaluated.',
      },
      {
        id: 'fe-js-advanced-web-workers',
        title: 'What are Web Workers?',
        difficulty: 'advanced',
        answer:
          'Web Workers run JavaScript in a background thread separate from the main thread, preventing CPU-intensive tasks from blocking the UI. Communication happens via postMessage/onmessage with structured cloning. Workers cannot access the DOM directly.',
        tags: ['javascript', 'web-workers', 'concurrency'],
        keyTakeaway: 'Web Workers enable true multi-threading for CPU-heavy work.',
      },
      {
        id: 'fe-js-advanced-structured-clone',
        title: 'What is structuredClone?',
        difficulty: 'beginner',
        answer:
          'structuredClone() creates a deep copy of a value, handling nested objects, arrays, Maps, Sets, Dates, RegExps, and circular references. Unlike JSON.parse(JSON.stringify()), it preserves these types correctly but cannot clone functions, DOM nodes, or Error objects.',
        tags: ['javascript', 'structured-clone', 'deep-copy'],
        keyTakeaway: 'structuredClone provides native deep copying with support for complex types.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. TypeScript (8 questions)
  // ─────────────────────────────────────────────
  {
    id: 'fe-typescript',
    label: 'TypeScript',
    icon: 'Shield',
    description:
      'TypeScript fundamentals including types, generics, utility types, discriminated unions, and strict mode.',
    questions: [
      {
        id: 'fe-typescript-type-vs-interface',
        title: 'What is the difference between type and interface in TypeScript?',
        difficulty: 'beginner',
        answer:
          'Interfaces support declaration merging and extends for objects. Types support unions, intersections, mapped types, and conditional types. Both can describe object shapes. Use interface for public API contracts and type for unions, complex types, and utility compositions.',
        tags: ['typescript', 'type', 'interface'],
        keyTakeaway: 'Use interface for objects and extendability; type for unions and complex types.',
      },
      {
        id: 'fe-typescript-generics',
        title: 'How do generics work in TypeScript?',
        difficulty: 'intermediate',
        answer:
          'Generics (<T>) let you write reusable code that works with multiple types while preserving type safety. They parameterize functions, classes, and interfaces. Constraints (T extends Foo) limit what types are accepted. Common examples include Array<T>, Promise<T>, and custom utility types.',
        tags: ['typescript', 'generics', 'type-safety'],
        keyTakeaway: 'Generics enable reusable, type-safe code without sacrificing specificity.',
      },
      {
        id: 'fe-typescript-utility-types',
        title: 'What are Partial, Pick, and Omit utility types?',
        difficulty: 'intermediate',
        answer:
          'Partial<T> makes all properties optional. Pick<T, K> selects a subset of properties. Omit<T, K> excludes specific properties. Other useful utilities include Required, Readonly, Record<K, V>, and ReturnType. They transform existing types without rewriting them.',
        tags: ['typescript', 'utility-types', 'generics'],
        keyTakeaway: 'Utility types transform existing types to avoid redundant declarations.',
      },
      {
        id: 'fe-typescript-discriminated-unions',
        title: 'What are discriminated unions?',
        difficulty: 'intermediate',
        answer:
          'Discriminated unions combine union types with a common literal property (the discriminant) that TypeScript uses to narrow the type. For example, {type: "circle", radius: number} | {type: "square", side: number}. Switch on the discriminant for exhaustive, type-safe handling.',
        tags: ['typescript', 'discriminated-unions', 'narrowing'],
        keyTakeaway: 'A shared literal discriminant enables exhaustive type narrowing in unions.',
      },
      {
        id: 'fe-typescript-type-guards',
        title: 'What are type guards in TypeScript?',
        difficulty: 'intermediate',
        answer:
          'Type guards narrow a type within a conditional block. Built-in guards include typeof, instanceof, and the "in" operator. Custom type guards use the "is" return type (param is Type). They enable safe access to type-specific properties after a runtime check.',
        tags: ['typescript', 'type-guards', 'narrowing'],
        keyTakeaway: 'Type guards narrow types at runtime for safe property access.',
      },
      {
        id: 'fe-typescript-enums-vs-const',
        title: 'Should you use enums or const objects in TypeScript?',
        difficulty: 'intermediate',
        answer:
          'Enums generate runtime JavaScript code and can have unexpected behaviors like reverse mapping. Const objects with "as const" assertion provide the same type safety with zero runtime overhead and better tree-shaking. Most modern codebases prefer const objects over enums.',
        tags: ['typescript', 'enums', 'const-assertion'],
        keyTakeaway: 'Prefer const objects with "as const" over enums for zero runtime cost.',
      },
      {
        id: 'fe-typescript-declaration-files',
        title: 'What are TypeScript declaration files (.d.ts)?',
        difficulty: 'advanced',
        answer:
          'Declaration files (.d.ts) describe the types of JavaScript modules without including implementation. They enable TypeScript to type-check code that depends on JS libraries. DefinitelyTyped (@types/*) provides community-maintained declarations for popular npm packages.',
        tags: ['typescript', 'declaration-files', 'types'],
        keyTakeaway: 'Declaration files add type information to existing JavaScript libraries.',
      },
      {
        id: 'fe-typescript-strict-mode',
        title: 'What does TypeScript strict mode enable?',
        difficulty: 'advanced',
        answer:
          'Strict mode (strict: true in tsconfig) enables all strict checks: strictNullChecks (no implicit null/undefined), noImplicitAny (all values need types), strictFunctionTypes (contravariant params), and more. It catches significantly more bugs at compile time.',
        tags: ['typescript', 'strict-mode', 'config'],
        keyTakeaway: 'Always enable strict mode to catch null, any, and type errors early.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. React Fundamentals (8 questions)
  // ─────────────────────────────────────────────
  {
    id: 'fe-react',
    label: 'React Fundamentals',
    icon: 'Atom',
    description:
      'Core React concepts including JSX, virtual DOM, hooks, component patterns, and rendering behavior.',
    questions: [
      {
        id: 'fe-react-jsx',
        title: 'What is JSX?',
        difficulty: 'beginner',
        answer:
          'JSX is a syntax extension that lets you write HTML-like markup inside JavaScript. It compiles to React.createElement() calls (or the modern jsx transform). JSX uses className instead of class, camelCase for attributes, and curly braces for JavaScript expressions.',
        tags: ['react', 'jsx', 'syntax'],
        keyTakeaway: 'JSX is syntactic sugar for React.createElement, not actual HTML.',
      },
      {
        id: 'fe-react-virtual-dom',
        title: 'What is the virtual DOM?',
        difficulty: 'intermediate',
        answer:
          'The virtual DOM is a lightweight JavaScript representation of the real DOM. On state change, React creates a new virtual DOM tree, diffs it against the previous one (reconciliation), and applies only the minimal set of real DOM updates needed. This batching makes updates efficient.',
        tags: ['react', 'virtual-dom', 'reconciliation'],
        keyTakeaway: 'React diffs virtual DOM trees and applies minimal real DOM changes.',
      },
      {
        id: 'fe-react-lifecycle',
        title: 'What is the React component lifecycle?',
        difficulty: 'intermediate',
        answer:
          'Class components have mount (constructor, render, componentDidMount), update (render, componentDidUpdate), and unmount (componentWillUnmount) phases. In function components, useEffect replaces all three: the effect runs on mount/update, and its cleanup function runs on unmount.',
        tags: ['react', 'lifecycle', 'useEffect'],
        keyTakeaway: 'useEffect replaces mount, update, and unmount lifecycle methods.',
      },
      {
        id: 'fe-react-hooks',
        title: 'How do useState and useEffect work?',
        difficulty: 'beginner',
        answer:
          'useState returns a [value, setter] pair that persists across re-renders. useEffect runs side effects after render; its dependency array controls when it re-runs (empty = mount only, [deps] = when deps change). The cleanup function in useEffect runs before re-runs and on unmount.',
        tags: ['react', 'useState', 'useEffect'],
        keyTakeaway: 'useState holds state; useEffect runs side effects after render.',
      },
      {
        id: 'fe-react-props-vs-state',
        title: 'What is the difference between props and state?',
        difficulty: 'beginner',
        answer:
          'Props are read-only data passed from parent to child, making components configurable. State is mutable data owned and managed by the component itself. When state changes, React re-renders the component. Data flows down via props; events flow up via callback props.',
        tags: ['react', 'props', 'state'],
        keyTakeaway: 'Props flow down (read-only); state is local and triggers re-renders.',
      },
      {
        id: 'fe-react-conditional-rendering',
        title: 'How does conditional rendering work in React?',
        difficulty: 'beginner',
        answer:
          'React supports conditional rendering via ternary operators ({cond ? <A/> : <B/>}), logical AND ({cond && <A/>}), early returns, and switch statements. Avoid using index-based patterns that break component identity. Be cautious with && when the left side could be 0, which renders "0".',
        tags: ['react', 'conditional-rendering', 'jsx'],
        keyTakeaway: 'Use ternaries and && for inline conditions; watch for falsy 0 gotcha.',
      },
      {
        id: 'fe-react-lists-keys',
        title: 'Why are keys important when rendering lists?',
        difficulty: 'intermediate',
        answer:
          'Keys help React identify which items changed, were added, or removed during reconciliation. Use stable, unique identifiers (IDs) as keys, not array indices. Index keys cause bugs when items are reordered, inserted, or deleted because React reuses DOM nodes by key.',
        tags: ['react', 'keys', 'lists'],
        keyTakeaway: 'Use stable unique IDs as keys, not array indices, for correct reconciliation.',
      },
      {
        id: 'fe-react-controlled-uncontrolled',
        title: 'What are controlled vs uncontrolled inputs?',
        difficulty: 'intermediate',
        answer:
          'Controlled inputs have their value driven by React state (value={state} + onChange), giving React full control for validation and formatting. Uncontrolled inputs use refs (useRef) to read DOM values directly. Controlled is preferred for complex forms; uncontrolled is simpler for basic cases.',
        tags: ['react', 'forms', 'controlled'],
        keyTakeaway: 'Controlled inputs use state for the source of truth; uncontrolled use refs.',
      },
    ],
  },
];
