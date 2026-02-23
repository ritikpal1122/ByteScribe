import type { DocCategory } from './types';

// Part 6: React + TypeScript Patterns
export const TS_PART6_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  React & TypeScript                                           */
  /* ------------------------------------------------------------ */
  {
    id: 'ts-react',
    label: 'React & TypeScript',
    icon: 'Layout',
    entries: [
      {
        id: 'react-component-types',
        title: 'Component Types',
        difficulty: 'intermediate',
        tags: ['react', 'component', 'FC', 'props', 'children', 'ReactNode'],
        cheatSheetSummary: 'Type components with FC<Props>, ReactNode for children, or simple function signatures.',
        sections: [
          { heading: 'FC Type and Props', content: 'React components in TypeScript are typed by defining an interface for their props. The React.FC<Props> type annotates functional components, though many teams prefer explicit return types instead. The FC type automatically includes children in older versions, but React 18+ removed implicit children. You must now explicitly include children in your props interface when needed. PropsWithChildren<P> is a utility type that adds the children prop to any props interface.',
            analogy: 'Think of it like a restaurant order form: the props interface is the form listing exactly what the kitchen (component) needs from the customer (parent). React.FC is one style of form, while a plain function signature is another style, but both communicate the same requirements.',
            code: `import React, { type ReactNode } from 'react';

// Explicit props interface
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick: () => void;
}

// Option 1: FC type
const Button: React.FC<ButtonProps> = ({ label, variant = 'primary', onClick }) => (
  <button className={variant} onClick={onClick}>{label}</button>
);

// Option 2: Plain function with typed props (preferred by many teams)
function Badge({ label, variant = 'primary', onClick }: ButtonProps) {
  return <button className={variant} onClick={onClick}>{label}</button>;
}`,
            codeHighlightLines: [4, 5, 6, 7, 11, 16],
            output: `// Both approaches produce the same JSX output
// <button class="primary">Click Me</button>`,
            tip: 'Many TypeScript + React style guides prefer plain function signatures over React.FC because it is more explicit and avoids hidden behavior around children and defaultProps.' },
          { heading: 'Children Types', content: 'The children prop accepts different types depending on what your component allows. ReactNode is the broadest type, covering strings, numbers, elements, arrays, fragments, and null. ReactElement is narrower and only accepts JSX elements. PropsWithChildren is a utility that merges { children?: ReactNode } into your existing props type. Use these types to constrain what consumers can pass as children to your component.',
            analogy: 'Think of it like a shipping container: ReactNode is a universal container that accepts any cargo (strings, numbers, elements, null). ReactElement is a specialized container that only accepts pre-packaged JSX boxes, rejecting loose items like raw strings or numbers.',
            code: `import { type ReactNode, type PropsWithChildren } from 'react';

// ReactNode — accepts anything renderable
interface CardProps {
  title: string;
  children: ReactNode;
}
function Card({ title, children }: CardProps) {
  return <div><h2>{title}</h2>{children}</div>;
}

// PropsWithChildren utility
type PanelProps = PropsWithChildren<{ heading: string }>;
function Panel({ heading, children }: PanelProps) {
  return <section><h3>{heading}</h3>{children}</section>;
}

// Usage
<Card title="Info">
  <p>Text node</p>
  {42}
  {null}
</Card>`,
            codeHighlightLines: [6, 13],
            output: `// <div><h2>Info</h2><p>Text node</p>42</div>
// null is rendered as nothing`,
            tip: 'Use ReactNode for maximum flexibility. Use ReactElement when you require actual JSX elements and want to reject strings or numbers.' },
          { heading: 'Default Props', content: 'Default props in TypeScript are handled via default parameter values in destructuring rather than the deprecated defaultProps static property. This approach integrates cleanly with TypeScript inference and is the recommended pattern in modern React. Mark optional props with the ? modifier and assign defaults in the destructuring pattern. TypeScript will correctly narrow the type inside the component body.',
            code: `interface AlertProps {
  message: string;
  severity?: 'info' | 'warning' | 'error';
  dismissible?: boolean;
  onDismiss?: () => void;
}

function Alert({
  message,
  severity = 'info',
  dismissible = false,
  onDismiss,
}: AlertProps) {
  return (
    <div className={\`alert alert-\${severity}\`}>
      <span>{message}</span>
      {dismissible && (
        <button onClick={onDismiss}>Dismiss</button>
      )}
    </div>
  );
}

// severity is 'info' | 'warning' | 'error' inside the component (not undefined)
<Alert message="Saved!" />
<Alert message="Watch out" severity="warning" dismissible onDismiss={() => {}} />`,
            codeHighlightLines: [3, 4, 10, 11],
            output: `// <div class="alert alert-info"><span>Saved!</span></div>
// <div class="alert alert-warning"><span>Watch out</span><button>Dismiss</button></div>`,
            warning: 'Avoid using the static defaultProps property on function components. It is deprecated in React 18.3+ and will be removed in React 19.' },
        ],
        quiz: [
          {
            question: 'In React 18+, what happens when you use React.FC<Props> for a component?',
            options: [
              'Children are automatically included in the props type',
              'Children are NOT automatically included — you must add them explicitly',
              'The component cannot accept any children at all',
              'React.FC was removed entirely in React 18',
            ],
            correctIndex: 1,
            explanation: 'React 18 removed the implicit children prop from React.FC. You must now explicitly include children in your props interface, for example using PropsWithChildren<P> or adding children: ReactNode directly.',
          },
          {
            question: 'Which type covers the broadest range of renderable content in React?',
            options: [
              'ReactElement',
              'JSX.Element',
              'ReactNode',
              'ReactChild',
            ],
            correctIndex: 2,
            explanation: 'ReactNode covers strings, numbers, elements, arrays, fragments, booleans, null, and undefined. ReactElement is narrower and only accepts JSX elements. ReactChild was deprecated in React 18.',
          },
          {
            question: 'What is the recommended way to handle default props in modern TypeScript React?',
            options: [
              'Use the static defaultProps property on the function component',
              'Use default parameter values in the destructuring pattern',
              'Wrap the component with a HOC that provides defaults',
              'Use the React.defaults() utility function',
            ],
            correctIndex: 1,
            explanation: 'Default parameter values in destructuring (e.g., severity = "info") integrate cleanly with TypeScript inference and are the recommended pattern. The static defaultProps property is deprecated in React 18.3+.',
          },
          {
            question: 'What does PropsWithChildren<P> do?',
            options: [
              'It removes the children prop from the interface P',
              'It merges { children?: ReactNode } into the given props type P',
              'It makes children a required prop on P',
              'It wraps the component in a higher-order component',
            ],
            correctIndex: 1,
            explanation: 'PropsWithChildren<P> is a utility type that adds an optional children prop typed as ReactNode to the provided props interface P, saving you from writing it manually.',
          },
        ],
        challenge: {
          prompt: 'Create a typed Card component that accepts a title (string), an optional footer (ReactNode), and children (ReactNode). Use PropsWithChildren and provide default values for optional props.',
          starterCode: `import { type ReactNode, type PropsWithChildren } from 'react';

// Define CardProps and use PropsWithChildren
// The card should have: title (required string), footer (optional ReactNode)

// TODO: Define the props type


// TODO: Implement the Card component
`,
          solutionCode: `import { type ReactNode, type PropsWithChildren } from 'react';

interface CardBaseProps {
  title: string;
  footer?: ReactNode;
}

type CardProps = PropsWithChildren<CardBaseProps>;

function Card({ title, footer = null, children }: CardProps) {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// Usage:
// <Card title="Welcome" footer={<button>Close</button>}>
//   <p>Card content here</p>
// </Card>`,
          hints: [
            'Use PropsWithChildren<YourBaseProps> to add the children prop automatically.',
            'Mark footer as optional with ? and give it a default value in the destructuring.',
            'ReactNode is the correct type for footer since it could be JSX, a string, or null.',
          ],
        },
      },
      {
        id: 'react-hooks-typed',
        title: 'Typed Hooks',
        difficulty: 'intermediate',
        tags: ['react', 'hooks', 'useState', 'useRef', 'useReducer', 'useCallback', 'useMemo'],
        cheatSheetSummary: 'useState<T>, useRef<T | null>, useReducer with typed actions, useCallback/useMemo generics.',
        sections: [
          { heading: 'useState and useRef', content: 'useState accepts a generic type parameter to specify the state type. TypeScript can often infer the type from the initial value, but explicit generics are needed for union types or complex state. useRef<T> creates a mutable ref object. When used for DOM elements, pass null as the initial value and type it as useRef<HTMLElement | null>. The resulting ref.current will be typed accordingly and requires null checks before access.',
            analogy: 'Think of it like labeled storage boxes: useState<number> is a box labeled "numbers only" that rejects anything else. useRef<HTMLInputElement | null> is a sticky note pointing to a specific shelf in the DOM warehouse, but the shelf might be empty (null) until the component mounts.',
            code: `import { useState, useRef, useEffect } from 'react';

// Inferred type: number
const [count, setCount] = useState(0);

// Explicit generic for union types
const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
setStatus('loading'); // OK
// setStatus('unknown'); // Error: not assignable

// Complex state
interface User { id: number; name: string; email: string }
const [user, setUser] = useState<User | null>(null);
// Must null-check before access
if (user) {
  console.log(user.name); // OK — narrowed to User
}

// DOM ref — typed with the specific HTML element
const inputRef = useRef<HTMLInputElement>(null);
useEffect(() => {
  inputRef.current?.focus(); // null-safe access
}, []);

// Mutable ref (no null — acts like instance variable)
const renderCount = useRef(0);
renderCount.current += 1;`,
            codeHighlightLines: [7, 13, 20],
            output: `// count: number, setCount: (value: number) => void
// status: 'idle' | 'loading' | 'error'
// user: User | null
// inputRef: RefObject<HTMLInputElement | null>`,
            tip: 'If the initial state fully describes the type, you can omit the generic: useState(0) infers number. Add the generic when the type is wider than the initial value, like useState<User | null>(null).' },
          { heading: 'useReducer with Typed Actions', content: 'useReducer shines in TypeScript when combined with discriminated union action types. Define a union of action types, each with a type literal and optional payload. The reducer function receives typed state and action, and TypeScript narrows the action inside each case. This pattern provides compile-time safety for all state transitions and ensures exhaustive handling of every action type.',
            analogy: 'Think of it like a vending machine: each action type (ADD, TOGGLE, DELETE) is a specific button on the machine. The discriminated union ensures only real buttons exist, and TypeScript checks that pressing each button produces the correct snack (state change). You cannot press a button that does not exist.',
            code: `import { useReducer } from 'react';

interface TodoState {
  todos: { id: number; text: string; done: boolean }[];
  filter: 'all' | 'active' | 'done';
}

type TodoAction =
  | { type: 'ADD'; text: string }
  | { type: 'TOGGLE'; id: number }
  | { type: 'DELETE'; id: number }
  | { type: 'SET_FILTER'; filter: TodoState['filter'] };

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD':
      return { ...state, todos: [...state.todos, { id: Date.now(), text: action.text, done: false }] };
    case 'TOGGLE':
      return { ...state, todos: state.todos.map(t => t.id === action.id ? { ...t, done: !t.done } : t) };
    case 'DELETE':
      return { ...state, todos: state.todos.filter(t => t.id !== action.id) };
    case 'SET_FILTER':
      return { ...state, filter: action.filter };
  }
}

const [state, dispatch] = useReducer(todoReducer, { todos: [], filter: 'all' });
dispatch({ type: 'ADD', text: 'Learn TypeScript' });
dispatch({ type: 'TOGGLE', id: 123 });`,
            codeHighlightLines: [8, 9, 10, 11, 12, 15],
            output: `// dispatch is fully typed — only valid actions are accepted
// dispatch({ type: 'ADD' })            // Error: missing 'text'
// dispatch({ type: 'UNKNOWN' })        // Error: not in union`,
            tip: 'Always return from every case in the reducer. Add a default case with const _exhaustive: never = action to catch unhandled actions at compile time.',
            diagram: {
              kind: 'mermaid',
              code: 'stateDiagram-v2\n    [*] --> TodoState\n    TodoState --> TodoState: ADD {text}\n    TodoState --> TodoState: TOGGLE {id}\n    TodoState --> TodoState: DELETE {id}\n    TodoState --> TodoState: SET_FILTER {filter}\n    state TodoState {\n        todos: Todo[]\n        filter: all | active | done\n    }',
              caption: 'useReducer models state transitions through typed action dispatches. Each action type triggers a specific, type-safe state transformation.',
            } },
          { heading: 'useCallback and useMemo', content: 'useCallback and useMemo accept generic type parameters, but TypeScript usually infers them from the callback or computation. useCallback<T> memoizes a function reference, and useMemo<T> memoizes a computed value. Explicit generics are useful when the inferred type is too narrow or when you want to constrain the return type. Both hooks require a dependency array to control when the memoized value is recalculated.',
            code: `import { useCallback, useMemo } from 'react';

interface Product { id: number; name: string; price: number; category: string }

const products: Product[] = [
  { id: 1, name: 'Widget', price: 25, category: 'tools' },
  { id: 2, name: 'Gadget', price: 50, category: 'electronics' },
];

// useMemo — infers Product[]
const expensive = useMemo(() => {
  return products.filter(p => p.price > 30).sort((a, b) => a.price - b.price);
}, [products]);

// useMemo with explicit type
const priceMap = useMemo<Map<number, number>>(() => {
  return new Map(products.map(p => [p.id, p.price]));
}, [products]);

// useCallback — infers (id: number) => void
const handleDelete = useCallback((id: number) => {
  console.log('Deleting product:', id);
}, []);

// useCallback with explicit function type
type FilterFn = (category: string) => Product[];
const filterByCategory = useCallback<FilterFn>((category) => {
  return products.filter(p => p.category === category);
}, [products]);`,
            output: `// expensive: Product[]
// priceMap: Map<number, number>
// handleDelete: (id: number) => void
// filterByCategory: (category: string) => Product[]`,
            tip: 'Only add useCallback/useMemo when there is a measurable performance benefit, such as preventing unnecessary re-renders of memoized children or expensive computations.' },
        ],
        quiz: [
          {
            question: 'When should you provide an explicit generic to useState?',
            options: [
              'Always, for every useState call',
              'When the type is wider than the initial value, such as useState<User | null>(null)',
              'Only when using primitive types like number or string',
              'Never, TypeScript always infers the correct type',
            ],
            correctIndex: 1,
            explanation: 'When the initial value fully describes the type (e.g., useState(0)), TypeScript infers correctly. But when the type is wider than the initial value, like a union with null (useState<User | null>(null)) or a union of string literals, you need the explicit generic.',
          },
          {
            question: 'How should you type a useRef for a DOM element?',
            options: [
              'useRef<HTMLInputElement>(undefined)',
              'useRef<HTMLInputElement>(null)',
              'useRef(document.getElementById("input"))',
              'useRef<Element>()',
            ],
            correctIndex: 1,
            explanation: 'DOM refs should be typed with the specific HTML element and initialized with null: useRef<HTMLInputElement>(null). The ref.current will be HTMLInputElement | null, requiring null checks before access.',
          },
          {
            question: 'What is the primary advantage of using discriminated union actions with useReducer?',
            options: [
              'It makes the reducer function run faster at runtime',
              'TypeScript narrows the action inside each case, providing type-safe payload access',
              'It eliminates the need for a switch statement',
              'It automatically dispatches actions in the correct order',
            ],
            correctIndex: 1,
            explanation: 'Discriminated union actions let TypeScript narrow the action type inside each switch case. This means you get autocomplete and compile-time checking for the specific payload of each action type, preventing bugs like accessing the wrong payload field.',
          },
          {
            question: 'What does useCallback return?',
            options: [
              'A new function on every render',
              'A memoized function reference that only changes when dependencies change',
              'A memoized computed value',
              'A ref object pointing to a function',
            ],
            correctIndex: 1,
            explanation: 'useCallback returns a memoized version of the callback function that only changes if one of the dependencies has changed. This is useful for passing stable function references to memoized child components to prevent unnecessary re-renders.',
          },
        ],
        challenge: {
          prompt: 'Create a useReducer-based counter with typed actions for INCREMENT, DECREMENT, and RESET. The state should track the current count and a history of actions performed.',
          starterCode: `import { useReducer } from 'react';

// TODO: Define CounterState interface with count (number) and history (string[])


// TODO: Define CounterAction discriminated union
// Actions: INCREMENT (by: number), DECREMENT (by: number), RESET


// TODO: Implement counterReducer


// TODO: Initialize the reducer with count: 0, history: []
`,
          solutionCode: `import { useReducer } from 'react';

interface CounterState {
  count: number;
  history: string[];
}

type CounterAction =
  | { type: 'INCREMENT'; by: number }
  | { type: 'DECREMENT'; by: number }
  | { type: 'RESET' };

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.by,
        history: [...state.history, \`+\${action.by}\`],
      };
    case 'DECREMENT':
      return {
        count: state.count - action.by,
        history: [...state.history, \`-\${action.by}\`],
      };
    case 'RESET':
      return { count: 0, history: [...state.history, 'RESET'] };
  }
}

const [state, dispatch] = useReducer(counterReducer, { count: 0, history: [] });
dispatch({ type: 'INCREMENT', by: 5 });
dispatch({ type: 'DECREMENT', by: 2 });
dispatch({ type: 'RESET' });`,
          hints: [
            'Define a discriminated union with "type" as the discriminant field.',
            'INCREMENT and DECREMENT carry a "by: number" payload; RESET has no payload.',
            'Append a description string to the history array in each case.',
          ],
        },
      },
      {
        id: 'react-event-types',
        title: 'Event Types',
        difficulty: 'intermediate',
        tags: ['react', 'events', 'ChangeEvent', 'MouseEvent', 'FormEvent', 'KeyboardEvent'],
        cheatSheetSummary: 'React.ChangeEvent<HTMLInputElement>, MouseEvent<HTMLButtonElement>, FormEvent<HTMLFormElement>.',
        sections: [
          { heading: 'Common React Event Types', content: 'React provides its own synthetic event types that wrap native browser events. These types are generic over the element that fired the event. React.ChangeEvent<HTMLInputElement> types input change handlers. React.MouseEvent<HTMLButtonElement> types click handlers. React.FormEvent<HTMLFormElement> types form submissions. Always use the React-prefixed types rather than the native DOM event types to ensure cross-browser compatibility and correct typing.',
            analogy: 'Think of it like a universal translator at a conference: React synthetic events wrap the native browser events (different "languages") into a single consistent interface. The generic parameter (e.g., HTMLInputElement) tells the translator which delegate is speaking, so it knows exactly what information (properties) to make available.',
            code: `import React from 'react';

// Change event — typed to the input element
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  console.log(e.target.value);     // string
  console.log(e.target.checked);   // boolean (for checkboxes)
}

// Select change
function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
  console.log(e.target.value);
  console.log(e.target.selectedIndex);
}

// Mouse event
function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
  console.log(e.clientX, e.clientY);
  console.log(e.currentTarget.textContent);
}

// Form event
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  console.log(Object.fromEntries(formData));
}

// Keyboard event
function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    console.log('Submit on Enter');
  }
}`,
            output: `// All handlers are fully typed:
// e.target — the element that fired the event
// e.currentTarget — the element the handler is attached to
// e.preventDefault() — cancels default behavior`,
            tip: 'Use e.currentTarget for the element the handler is attached to (always typed). e.target can be a child element and may need casting.' },
          { heading: 'Typing Event Handler Props', content: 'When passing event handlers as props, type them using React event handler types or inline function signatures. React provides convenience types like React.MouseEventHandler<HTMLButtonElement> for common patterns. For custom event-like callbacks, define your own function signature in the props interface. This ensures consumers pass correctly typed handlers and prevents runtime type mismatches.',
            code: `import React from 'react';

// Using React event handler types
interface SearchBarProps {
  onSearch: (query: string) => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

function SearchBar({ onSearch, onChange, onFocus }: SearchBarProps) {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    onSearch(form.get('query') as string);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="query" onChange={onChange} onFocus={onFocus} />
      <button type="submit">Search</button>
    </form>
  );
}

// Custom callback props
interface DataTableProps<T> {
  data: T[];
  onRowClick: (item: T, index: number) => void;
  onSort: (column: keyof T, direction: 'asc' | 'desc') => void;
}`,
            output: `// SearchBar accepts typed handler props
// DataTableProps is generic — works with any data type
// <DataTable<User> data={users} onRowClick={(user) => ...} onSort={...} />`,
            warning: 'Avoid using "any" for event types. It defeats the purpose of TypeScript. If unsure, hover over the JSX event attribute in your editor to see the expected type.' },
        ],
        quiz: [
          {
            question: 'What is the correct type for an onChange handler on an <input> element in React?',
            options: [
              'React.ChangeEvent<HTMLFormElement>',
              'React.ChangeEvent<HTMLInputElement>',
              'Event',
              'React.InputEvent<HTMLInputElement>',
            ],
            correctIndex: 1,
            explanation: 'React.ChangeEvent<HTMLInputElement> is the correct type. The generic parameter specifies the element type (HTMLInputElement for <input>), which determines the properties available on e.target.',
          },
          {
            question: 'What is the difference between e.target and e.currentTarget in a React event handler?',
            options: [
              'They are identical and can be used interchangeably',
              'e.target is the element that fired the event (may be a child); e.currentTarget is the element the handler is attached to',
              'e.target is always the parent element; e.currentTarget is the child',
              'e.currentTarget is deprecated in favor of e.target',
            ],
            correctIndex: 1,
            explanation: 'e.currentTarget is always the element the handler is attached to and is correctly typed by the generic parameter. e.target is the actual element that triggered the event, which may be a child element and may need type assertion.',
          },
          {
            question: 'Which convenience type does React provide for typing an onClick prop on a button?',
            options: [
              'React.ClickHandler<HTMLButtonElement>',
              'React.MouseEventHandler<HTMLButtonElement>',
              'React.OnClick<HTMLButtonElement>',
              'React.ButtonClickEvent',
            ],
            correctIndex: 1,
            explanation: 'React provides convenience types like React.MouseEventHandler<HTMLButtonElement> which is equivalent to (e: React.MouseEvent<HTMLButtonElement>) => void. These are useful for typing event handler props.',
          },
        ],
        challenge: {
          prompt: 'Build a typed SearchInput component that handles keyboard events. It should call an onSearch callback when the user presses Enter, and an onChange callback on every keystroke. Type all event handlers correctly.',
          starterCode: `import React, { useState } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  onChange?: (value: string) => void;
  placeholder?: string;
}

// TODO: Implement SearchInput with properly typed event handlers
// - Use React.ChangeEvent<HTMLInputElement> for the change handler
// - Use React.KeyboardEvent<HTMLInputElement> for the keydown handler
// - Call onSearch when Enter is pressed
function SearchInput({ onSearch, onChange, placeholder = 'Search...' }: SearchInputProps) {
  // Your implementation here
}`,
          solutionCode: `import React, { useState } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  onChange?: (value: string) => void;
  placeholder?: string;
}

function SearchInput({ onSearch, onChange, placeholder = 'Search...' }: SearchInputProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSearch(value);
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
    />
  );
}`,
          hints: [
            'Use React.ChangeEvent<HTMLInputElement> for the onChange handler type.',
            'Use React.KeyboardEvent<HTMLInputElement> for the onKeyDown handler type.',
            'Check e.key === "Enter" to detect the Enter key press.',
          ],
        },
      },
      {
        id: 'react-context-typed',
        title: 'Typed Context',
        difficulty: 'intermediate',
        tags: ['react', 'context', 'createContext', 'useContext', 'provider', 'consumer'],
        cheatSheetSummary: 'createContext<T>(defaultValue) with a custom hook that throws if used outside the provider.',
        sections: [
          { heading: 'Creating Typed Context', content: 'React.createContext<T> creates a context with a typed default value. The challenge is that context may be undefined if used outside a provider. A common pattern is to create the context with undefined as the default, then wrap useContext in a custom hook that throws a descriptive error when the context is missing. This eliminates the need for null checks at every consumer site while keeping the code type-safe.',
            analogy: 'Think of it like a company badge system: the Provider is the security desk that issues badges (context values) to everyone inside the building. The custom useAuth hook is the badge scanner at each door. If you try to scan without a badge (outside the Provider), it loudly rejects you instead of silently letting you through with undefined access.',
            code: `import { createContext, useContext, useState, type ReactNode } from 'react';

// 1. Define the context shape
interface AuthContextType {
  user: { id: string; name: string } | null;
  login: (name: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// 2. Create context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Custom hook with safety check
function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// 4. Provider component
function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const value: AuthContextType = {
    user,
    login: (name) => setUser({ id: crypto.randomUUID(), name }),
    logout: () => setUser(null),
    isAuthenticated: user !== null,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}`,
            codeHighlightLines: [12, 16, 17, 18, 19, 20],
            output: `// Consumer usage (no null checks needed):
// const { user, login, logout } = useAuth();
// login('Alice');
// console.log(user?.name); // 'Alice'`,
            tip: 'Always export the custom hook (useAuth) instead of the raw context. This enforces the provider boundary and gives better error messages.' },
          { heading: 'Context Patterns', content: 'Advanced context patterns include splitting state and dispatch into separate contexts for performance, composing multiple providers, and using generic context factories. Splitting state from dispatch prevents components that only dispatch actions from re-rendering when state changes. A generic createSafeContext factory eliminates boilerplate by generating the context and custom hook in one call. These patterns scale well in larger applications.',
            analogy: 'Think of it like splitting a newspaper into sections: instead of handing the entire newspaper (state + dispatch) to every reader, you give the sports section (state) to readers who care about scores and the classified section (dispatch) to readers who want to post ads. Readers only get notified about changes in their section, not the whole paper.',
            code: `import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react';

// Generic context factory — eliminates boilerplate
function createSafeContext<T>(name: string) {
  const Context = createContext<T | undefined>(undefined);
  function useCtx(): T {
    const ctx = useContext(Context);
    if (!ctx) throw new Error(\`use\${name} must be used within \${name}Provider\`);
    return ctx;
  }
  return [Context.Provider, useCtx] as const;
}

// Split state and dispatch for performance
interface ThemeState { mode: 'light' | 'dark'; fontSize: number }
type ThemeAction = { type: 'TOGGLE_MODE' } | { type: 'SET_FONT'; size: number };

const [ThemeStateProvider, useThemeState] = createSafeContext<ThemeState>('ThemeState');
const [ThemeDispatchProvider, useThemeDispatch] = createSafeContext<Dispatch<ThemeAction>>('ThemeDispatch');

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'TOGGLE_MODE': return { ...state, mode: state.mode === 'light' ? 'dark' : 'light' };
    case 'SET_FONT': return { ...state, fontSize: action.size };
  }
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, { mode: 'light', fontSize: 16 });
  return (
    <ThemeStateProvider value={state}>
      <ThemeDispatchProvider value={dispatch}>{children}</ThemeDispatchProvider>
    </ThemeStateProvider>
  );
}`,
            codeHighlightLines: [4, 11, 18, 19],
            output: `// Components reading state re-render on state change
// Components only dispatching do NOT re-render on state change
// const { mode } = useThemeState();
// const dispatch = useThemeDispatch();
// dispatch({ type: 'TOGGLE_MODE' });`,
            tip: 'Splitting state and dispatch into two contexts is a key optimization. Components that only call dispatch never re-render when the state changes.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    TP["ThemeProvider"] --> TSP["ThemeStateProvider\\n(state context)"]\n    TP --> TDP["ThemeDispatchProvider\\n(dispatch context)"]\n    TSP --> CR["ComponentReader\\nuseThemeState()\\n🔄 re-renders on state change"]\n    TDP --> CD["ComponentDispatcher\\nuseThemeDispatch()\\n✅ never re-renders on state change"]\n    TSP --> CB["ComponentBoth\\nuseThemeState()\\nuseThemeDispatch()\\n🔄 re-renders on state change"]\n    TDP --> CB',
              caption: 'Splitting state and dispatch into separate contexts prevents unnecessary re-renders for dispatch-only consumers.',
            } },
        ],
        quiz: [
          {
            question: 'Why is createContext<T | undefined>(undefined) preferred over createContext<T>(null as any)?',
            options: [
              'It runs faster at runtime',
              'It forces consumers to handle the case where the context has no provider, preventing silent undefined access',
              'It allows the context to accept any value type',
              'It automatically creates the provider component',
            ],
            correctIndex: 1,
            explanation: 'Using undefined as the default and T | undefined as the type forces you to check for undefined when consuming the context. Combined with a custom hook that throws, this ensures the context is never used outside its provider without explicit error handling.',
          },
          {
            question: 'What does the createSafeContext factory function return?',
            options: [
              'A single context object',
              'A Provider component and a custom hook as a readonly tuple',
              'A reducer and a dispatch function',
              'An object with get and set methods',
            ],
            correctIndex: 1,
            explanation: 'createSafeContext returns [Context.Provider, useCtx] as const, which is a readonly tuple containing the Provider component and a custom hook. The custom hook includes a safety check that throws if used outside the provider.',
          },
          {
            question: 'Why split state and dispatch into separate contexts?',
            options: [
              'It reduces the total number of renders to zero',
              'Components that only dispatch actions will not re-render when state changes',
              'It is required by React for useReducer to work with context',
              'It makes the code shorter and easier to read',
            ],
            correctIndex: 1,
            explanation: 'When state and dispatch share a single context, every consumer re-renders on state changes. By splitting them, components that only call dispatch (like a button that triggers an action) never re-render when the state itself changes.',
          },
          {
            question: 'What error does the custom useAuth hook throw when called outside the AuthProvider?',
            options: [
              'A TypeError about undefined properties',
              'A descriptive Error saying "useAuth must be used within an AuthProvider"',
              'A React warning in the console',
              'It silently returns undefined without any error',
            ],
            correctIndex: 1,
            explanation: 'The custom hook checks if the context is undefined (meaning no provider exists above it in the tree) and throws an explicit Error with a descriptive message. This is far more helpful for debugging than a silent undefined or a cryptic "cannot read properties of undefined" error.',
          },
        ],
        challenge: {
          prompt: 'Create a typed ThemeContext using the createSafeContext factory pattern. The context should store a theme mode ("light" | "dark") and a toggleTheme function. Write the provider, the custom hook, and a consumer component.',
          starterCode: `import { createContext, useContext, useState, type ReactNode } from 'react';

// TODO: Define ThemeContextType with mode and toggleTheme


// TODO: Create a createSafeContext factory (generic)


// TODO: Use the factory to create ThemeProvider and useTheme


// TODO: Implement the ThemeProvider that manages the mode state


// TODO: Create a consumer component ThemeToggle that uses useTheme
`,
          solutionCode: `import { createContext, useContext, useState, type ReactNode } from 'react';

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

function createSafeContext<T>(name: string) {
  const Context = createContext<T | undefined>(undefined);
  function useCtx(): T {
    const ctx = useContext(Context);
    if (!ctx) throw new Error(\`use\${name} must be used within \${name}Provider\`);
    return ctx;
  }
  return [Context.Provider, useCtx] as const;
}

const [ThemeProvider, useTheme] = createSafeContext<ThemeContextType>('Theme');

function ThemeRoot({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const toggleTheme = () => setMode(prev => prev === 'light' ? 'dark' : 'light');
  return <ThemeProvider value={{ mode, toggleTheme }}>{children}</ThemeProvider>;
}

function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Current: {mode}</button>;
}`,
          hints: [
            'The createSafeContext factory takes a generic type T and a name string, returning [Provider, hook] as const.',
            'Inside the factory, create the context with undefined default and a hook that checks for undefined.',
            'The ThemeProvider component wraps the factory-generated Provider with actual state management.',
          ],
        },
      },
      {
        id: 'react-forms-typed',
        title: 'Typed Forms',
        difficulty: 'intermediate',
        tags: ['react', 'forms', 'controlled-inputs', 'react-hook-form', 'zod', 'validation'],
        cheatSheetSummary: 'Type controlled inputs, integrate react-hook-form with zod for schema-validated forms.',
        sections: [
          { heading: 'Form Event Handling', content: 'Typing form events in React requires specifying the element type in the generic parameter. FormEvent<HTMLFormElement> types the submit handler, while ChangeEvent<HTMLInputElement> types input changes. The FormData API works well with TypeScript when you cast the retrieved values to the expected types. For simple forms, controlled inputs with useState provide straightforward type safety without external libraries.',
            code: `import React, { useState } from 'react';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

function LoginPage() {
  const [form, setForm] = useState<LoginForm>({
    email: '', password: '', remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting:', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" value={form.password} onChange={handleChange} />
      <input name="remember" type="checkbox" checked={form.remember} onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}`,
            output: `// form state is fully typed as LoginForm
// handleChange works for text and checkbox inputs
// handleSubmit receives FormEvent<HTMLFormElement>`,
            tip: 'Use the name attribute to match your state keys. The [name]: value pattern lets one handler manage multiple inputs.' },
          { heading: 'Controlled Inputs Typing', content: 'Controlled inputs keep their value in React state, giving you complete control over the input behavior. TypeScript enforces that the value and onChange handler types match the input element. For select elements, use ChangeEvent<HTMLSelectElement>. For textareas, use ChangeEvent<HTMLTextAreaElement>. Generic controlled input components accept a value type parameter and forward refs for integration with form libraries.',
            code: `import React, { forwardRef } from 'react';

// Generic controlled input component
interface FieldProps<T extends string | number> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  type?: 'text' | 'number' | 'email';
}

function Field<T extends string | number>({ label, value, onChange, type = 'text' }: FieldProps<T>) {
  return (
    <label>
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(
          (type === 'number' ? Number(e.target.value) : e.target.value) as T
        )}
      />
    </label>
  );
}

// Typed select component
interface SelectProps<T extends string> {
  options: { value: T; label: string }[];
  selected: T;
  onSelect: (value: T) => void;
}

function Select<T extends string>({ options, selected, onSelect }: SelectProps<T>) {
  return (
    <select value={selected} onChange={(e) => onSelect(e.target.value as T)}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}`,
            output: `// <Field<string> label="Name" value={name} onChange={setName} />
// <Field<number> label="Age" value={age} onChange={setAge} type="number" />
// <Select<'sm'|'md'|'lg'> options={sizes} selected={size} onSelect={setSize} />`,
            tip: 'Generic components provide reusable type safety. The consumer gets autocomplete and type checking specific to their value type.' },
          { heading: 'React Hook Form with Zod', content: 'React Hook Form combined with zod provides runtime validation and compile-time type inference in a single schema definition. The zodResolver bridges zod schemas to react-hook-form validation. z.infer<typeof schema> extracts the TypeScript type from a zod schema, so you never define types separately from validation rules. This is the most popular pattern for production form handling in TypeScript React applications.',
            analogy: 'Think of it like a single blueprint that serves as both the building plan and the safety inspection checklist: the zod schema defines what the form looks like (compile-time types) and how to verify it was built correctly (runtime validation). Without it, you would maintain two separate documents that could drift out of sync.',
            code: `import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define schema — single source of truth for types AND validation
const signupSchema = z.object({
  username: z.string().min(3, 'Must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be 18 or older'),
  role: z.enum(['user', 'admin', 'moderator']),
  bio: z.string().max(500).optional(),
});

// Infer type from schema — no manual interface needed
type SignupForm = z.infer<typeof signupSchema>;

function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: 'user' },
  });

  const onSubmit = (data: SignupForm) => {
    // data is fully typed and validated
    console.log(data.username, data.email, data.role);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} />
      {errors.username && <span>{errors.username.message}</span>}
      <input {...register('email')} />
      <input {...register('age', { valueAsNumber: true })} type="number" />
      <button type="submit">Sign Up</button>
    </form>
  );
}`,
            codeHighlightLines: [6, 7, 8, 9, 10, 11, 15],
            output: `// SignupForm is inferred as:
// { username: string; email: string; age: number; role: 'user' | 'admin' | 'moderator'; bio?: string }
// register('username') — autocompletes field names
// errors.username?.message — typed error messages`,
            tip: 'Define your zod schema once and use z.infer to derive the type. This ensures your validation rules and TypeScript types are always in sync.' },
        ],
        quiz: [
          {
            question: 'What does z.infer<typeof schema> do in the context of react-hook-form with zod?',
            options: [
              'It creates a runtime validator from the schema',
              'It extracts the TypeScript type from a zod schema, so you do not need a separate interface',
              'It validates the form data at compile time',
              'It generates the form JSX from the schema',
            ],
            correctIndex: 1,
            explanation: 'z.infer<typeof schema> is a TypeScript utility type that extracts the inferred type from a zod schema. This means your validation rules (zod schema) and your TypeScript type are always derived from the same source, preventing them from drifting out of sync.',
          },
          {
            question: 'How do you handle both text and checkbox inputs with a single handleChange function?',
            options: [
              'Use separate handlers for each input type',
              'Check e.target.type and use checked for checkboxes, value for text inputs',
              'Cast all inputs to string type',
              'Use e.target.innerHTML for all input types',
            ],
            correctIndex: 1,
            explanation: 'By destructuring type and checked from e.target, you can check if the input is a checkbox (type === "checkbox") and use checked for booleans or value for text inputs. The [name]: value pattern with computed property names handles updating the correct state field.',
          },
          {
            question: 'What is the purpose of zodResolver in react-hook-form?',
            options: [
              'It converts React components to zod schemas',
              'It bridges zod validation schemas to react-hook-form validation, providing both runtime and type-level validation',
              'It replaces the need for register() calls',
              'It automatically generates form fields from schemas',
            ],
            correctIndex: 1,
            explanation: 'zodResolver acts as a bridge between zod and react-hook-form. It takes a zod schema and returns a resolver function that react-hook-form uses to validate form data. This gives you runtime validation from zod plus type inference from react-hook-form.',
          },
          {
            question: 'What constraint does FieldProps<T extends string | number> enforce?',
            options: [
              'T can be any type including objects and arrays',
              'T must be exactly string or exactly number',
              'T must be a subtype of string or number, enabling literals like "sm" | "md"',
              'T must be a union of string and number',
            ],
            correctIndex: 2,
            explanation: 'The constraint T extends string | number means T can be string, number, or any subtype such as string literal unions ("sm" | "md" | "lg") or numeric literals. This enables the generic Field component to work with specific literal types while maintaining type safety.',
          },
        ],
        challenge: {
          prompt: 'Create a typed registration form using zod for validation and z.infer to derive the TypeScript type. The form should have username (min 3 chars), email (valid email), and age (min 13) fields. Implement a handleSubmit that logs the validated data.',
          starterCode: `import { z } from 'zod';

// TODO: Define the registration schema with zod
// - username: string, min 3 characters
// - email: valid email string
// - age: number, minimum 13

// TODO: Derive the TypeScript type using z.infer

// TODO: Write a validate function that parses unknown data against the schema
// and returns the typed result or null on failure
`,
          solutionCode: `import { z } from 'zod';

const registrationSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email'),
  age: z.number().min(13, 'Must be at least 13 years old'),
});

type RegistrationData = z.infer<typeof registrationSchema>;

function validate(data: unknown): RegistrationData | null {
  const result = registrationSchema.safeParse(data);
  if (result.success) {
    return result.data; // fully typed as RegistrationData
  }
  console.error('Validation errors:', result.error.format());
  return null;
}

// Usage
const valid = validate({ username: 'Alice', email: 'alice@example.com', age: 25 });
if (valid) {
  console.log(valid.username, valid.email, valid.age);
}

const invalid = validate({ username: 'Al', email: 'not-email', age: 10 });
// Logs validation errors, returns null`,
          hints: [
            'Use z.object({}) to define the schema shape.',
            'Use z.infer<typeof yourSchema> to extract the TypeScript type.',
            'Use safeParse() instead of parse() to handle errors without exceptions.',
          ],
        },
      },
    ],
  },
  /* ------------------------------------------------------------ */
  /*  Patterns & Best Practices                                    */
  /* ------------------------------------------------------------ */
  {
    id: 'ts-patterns',
    label: 'Patterns & Best Practices',
    icon: 'Star',
    entries: [
      {
        id: 'discriminated-unions-pattern',
        title: 'Discriminated Unions Pattern',
        difficulty: 'advanced',
        tags: ['discriminated-unions', 'tagged-unions', 'state-management', 'reducer', 'pattern'],
        cheatSheetSummary: 'Use a literal type discriminant field to narrow union members in switch/if blocks.',
        sections: [
          { heading: 'Tagged Unions for State Management', content: 'Discriminated unions use a common literal field (the discriminant) to let TypeScript narrow the type in each branch of a switch or if statement. This is the foundation of type-safe state management in React. Each state variant carries only the data relevant to that state, preventing impossible states like having both an error message and loaded data. TypeScript enforces that you handle each variant and access only the fields that exist on that variant.',
            analogy: 'Think of it like a hospital triage system: each patient wears a colored wristband (the status discriminant). A green band means "healthy, carry discharge papers." A red band means "critical, carry medical charts." The nurse (TypeScript) checks the band color first and knows exactly which paperwork to expect, preventing mix-ups between patients.',
            code: `// State machine — each state carries only relevant data
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading'; startedAt: number }
  | { status: 'success'; data: T; receivedAt: number }
  | { status: 'error'; error: Error; retryCount: number };

function renderState(state: RequestState<string[]>) {
  switch (state.status) {
    case 'idle':
      return 'Ready to fetch';
    case 'loading':
      return \`Loading since \${state.startedAt}\`;
    case 'success':
      return \`Got \${state.data.length} items\`; // data is narrowed
    case 'error':
      return \`Error: \${state.error.message} (retries: \${state.retryCount})\`;
  }
}

const s: RequestState<string[]> = { status: 'success', data: ['a', 'b'], receivedAt: Date.now() };
console.log(renderState(s));`,
            codeHighlightLines: [2, 3, 4, 5, 6, 9],
            output: `Got 2 items`,
            tip: 'Name the discriminant field consistently across your codebase. Common choices are "status", "type", or "kind".',
            diagram: {
              kind: 'mermaid',
              code: 'stateDiagram-v2\n    [*] --> idle\n    idle --> loading: fetch()\n    loading --> success: data received\n    loading --> error: request failed\n    error --> loading: retry()\n    success --> loading: refetch()\n    state idle {\n        (no extra fields)\n    }\n    state loading {\n        startedAt: number\n    }\n    state success {\n        data: T\n        receivedAt: number\n    }\n    state error {\n        error: Error\n        retryCount: number\n    }',
              caption: 'Each state variant in a discriminated union carries only the data relevant to that state, preventing impossible states.',
            } },
          { heading: 'API Response Types', content: 'Discriminated unions model API responses elegantly by separating success and error cases. Each variant carries its own payload type, so consumers must check the discriminant before accessing the data. This prevents common bugs like accessing data on a failed response or ignoring error states. The pattern works naturally with async functions and can be composed with generics to create reusable response types across your entire API layer.',
            code: `// Generic API response type
type ApiResponse<T> =
  | { ok: true; data: T; meta: { page: number; total: number } }
  | { ok: false; error: { code: string; message: string } };

async function fetchUsers(): Promise<ApiResponse<{ id: string; name: string }[]>> {
  try {
    const res = await fetch('/api/users');
    if (!res.ok) {
      return { ok: false, error: { code: 'HTTP_ERROR', message: \`Status \${res.status}\` } };
    }
    const data = await res.json();
    return { ok: true, data, meta: { page: 1, total: data.length } };
  } catch (e) {
    return { ok: false, error: { code: 'NETWORK', message: (e as Error).message } };
  }
}

// Consumer — must narrow before accessing data
const result = await fetchUsers();
if (result.ok) {
  console.log(result.data[0].name); // TypeScript knows data exists
  console.log(result.meta.total);
} else {
  console.error(result.error.code);  // TypeScript knows error exists
}`,
            codeHighlightLines: [3, 4, 20, 21],
            output: `// On success: logs user name and total count
// On failure: logs the error code
// Accessing result.data without checking ok is a compile error`,
            tip: 'Use a boolean discriminant (ok: true/false) for simple two-variant responses. Use string literals for three or more variants.' },
          { heading: 'Action Types in Reducers', content: 'Discriminated union actions are the standard pattern for useReducer and Redux-style state management. Each action has a type literal and an optional payload typed specifically for that action. TypeScript narrows the action inside each case of the reducer switch statement, giving you autocomplete and type checking for the payload. This pattern also enables exhaustive checking to ensure every action type is handled.',
            code: `// Action union — each action has its own typed payload
type AppAction =
  | { type: 'SET_USER'; payload: { id: string; name: string } }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'ADD_NOTIFICATION'; payload: { message: string; severity: 'info' | 'error' } }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'LOGOUT' };

interface AppState {
  user: { id: string; name: string } | null;
  theme: 'light' | 'dark';
  notifications: { message: string; severity: string }[];
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };  // payload is { id, name }
    case 'SET_THEME':
      return { ...state, theme: action.payload };  // payload is 'light' | 'dark'
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, action.payload] };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };       // no payload
    case 'LOGOUT':
      return { ...state, user: null, notifications: [] };
  }
}`,
            output: `// dispatch({ type: 'SET_USER', payload: { id: '1', name: 'Alice' } }) // OK
// dispatch({ type: 'SET_THEME', payload: 'dark' })                    // OK
// dispatch({ type: 'SET_THEME', payload: 'blue' })                    // Error
// dispatch({ type: 'LOGOUT' })                                        // OK — no payload`,
            tip: 'Create action creator functions for complex payloads. They provide autocomplete and prevent typos in the type string.' },
        ],
        quiz: [
          {
            question: 'What is the "discriminant" in a discriminated union?',
            options: [
              'A generic type parameter that defines the union',
              'A common literal-typed field present in every variant that TypeScript uses to narrow the type',
              'A special TypeScript keyword for union types',
              'The return type of the switch statement',
            ],
            correctIndex: 1,
            explanation: 'The discriminant is a field with a literal type (like status: "idle" | "loading") that appears in every variant of the union. TypeScript uses this field to narrow the type in switch/if branches, making the correct properties available in each branch.',
          },
          {
            question: 'Why does RequestState<T> prevent impossible states compared to a flat interface?',
            options: [
              'It uses generics which are inherently safer',
              'Each variant carries only the data relevant to that state, so you cannot have both error and data simultaneously',
              'It runs validation at runtime to prevent bad states',
              'TypeScript automatically removes invalid states from unions',
            ],
            correctIndex: 1,
            explanation: 'A flat interface like { status: string; data?: T; error?: Error } allows impossible combinations (e.g., having both data and error). The discriminated union ensures each variant has exactly the fields relevant to that state, making impossible states unrepresentable.',
          },
          {
            question: 'What happens when you access result.data without first checking result.ok in ApiResponse<T>?',
            options: [
              'TypeScript allows it because data might exist on the union',
              'TypeScript produces a compile error because data only exists on the ok: true variant',
              'It compiles but throws a runtime error',
              'TypeScript infers data as undefined',
            ],
            correctIndex: 1,
            explanation: 'Without narrowing via result.ok, TypeScript sees the full union type. Since the ok: false variant does not have a data property, accessing result.data is a compile error. You must narrow first with an if check on the discriminant.',
          },
          {
            question: 'In a reducer using discriminated union actions, what does TypeScript narrow inside case "SET_THEME"?',
            options: [
              'The entire state to a specific type',
              'The action to the specific variant { type: "SET_THEME"; payload: "light" | "dark" }',
              'The return type of the reducer',
              'Nothing — narrowing only works with if statements',
            ],
            correctIndex: 1,
            explanation: 'Inside case "SET_THEME", TypeScript narrows the action variable to the specific variant { type: "SET_THEME"; payload: "light" | "dark" }. This means action.payload is typed as "light" | "dark" rather than the union of all possible payloads.',
          },
        ],
        challenge: {
          prompt: 'Create a discriminated union type called AsyncState<T> with four variants: idle, loading, success (with data: T), and error (with message: string). Write a function processState that uses a switch statement to return a description string for each state, and include exhaustive checking in the default case.',
          starterCode: `// TODO: Define AsyncState<T> discriminated union
// Variants: idle, loading, success (with data: T), error (with message: string)


// TODO: Write an assertNever helper


// TODO: Write processState<T> that switches on state.status
// and returns a descriptive string for each variant
`,
          solutionCode: `type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

function assertNever(value: never): never {
  throw new Error(\`Unhandled state: \${JSON.stringify(value)}\`);
}

function processState<T>(state: AsyncState<T>): string {
  switch (state.status) {
    case 'idle':
      return 'Waiting to start';
    case 'loading':
      return 'Loading in progress...';
    case 'success':
      return \`Success: received \${JSON.stringify(state.data)}\`;
    case 'error':
      return \`Error occurred: \${state.message}\`;
    default:
      return assertNever(state);
  }
}

// Tests
console.log(processState({ status: 'idle' }));
console.log(processState({ status: 'success', data: [1, 2, 3] }));
console.log(processState({ status: 'error', message: 'Network failure' }));`,
          hints: [
            'Use "status" as the discriminant field with literal string types for each variant.',
            'The success variant should have a generic data: T field.',
            'Use assertNever in the default case to ensure exhaustive checking at compile time.',
          ],
        },
      },
      {
        id: 'builder-pattern',
        title: 'Builder Pattern',
        difficulty: 'advanced',
        tags: ['builder', 'fluent-api', 'method-chaining', 'design-pattern', 'conditional'],
        cheatSheetSummary: 'Fluent method chaining that returns "this" for type-safe, step-by-step object construction.',
        sections: [
          { heading: 'Fluent API with Types', content: 'The builder pattern constructs complex objects step by step using method chaining. In TypeScript, each method returns this to enable chaining while preserving the specific builder type. The build() method produces the final typed result. This pattern is ideal for constructing configuration objects, query builders, and request pipelines where many optional parameters exist and the construction order matters for readability.',
            analogy: 'Think of it like ordering a custom sandwich at a deli counter: you start with the bread (constructor), then chain toppings one by one (.select(), .where(), .orderBy()), and finally say "that\'s it" (.build()) to get the finished sandwich. Each step returns you back to the counter so you can keep adding.',
            code: `interface QueryConfig {
  table: string;
  columns: string[];
  conditions: string[];
  orderBy?: { column: string; direction: 'asc' | 'desc' };
  limit?: number;
}

class QueryBuilder {
  private config: QueryConfig;

  constructor(table: string) {
    this.config = { table, columns: ['*'], conditions: [] };
  }

  select(...columns: string[]): this {
    this.config.columns = columns;
    return this;
  }

  where(condition: string): this {
    this.config.conditions.push(condition);
    return this;
  }

  orderBy(column: string, direction: 'asc' | 'desc' = 'asc'): this {
    this.config.orderBy = { column, direction };
    return this;
  }

  limit(n: number): this {
    this.config.limit = n;
    return this;
  }

  build(): string {
    const cols = this.config.columns.join(', ');
    let sql = \`SELECT \${cols} FROM \${this.config.table}\`;
    if (this.config.conditions.length) sql += \` WHERE \${this.config.conditions.join(' AND ')}\`;
    if (this.config.orderBy) sql += \` ORDER BY \${this.config.orderBy.column} \${this.config.orderBy.direction.toUpperCase()}\`;
    if (this.config.limit) sql += \` LIMIT \${this.config.limit}\`;
    return sql;
  }
}

const query = new QueryBuilder('users')
  .select('id', 'name', 'email')
  .where('active = true')
  .where('age > 18')
  .orderBy('name', 'asc')
  .limit(10)
  .build();
console.log(query);`,
            codeHighlightLines: [16, 17, 18, 35],
            output: `SELECT id, name, email FROM users WHERE active = true AND age > 18 ORDER BY name ASC LIMIT 10`,
            tip: 'Return "this" (not the class name) as the return type so that subclasses preserve their type when chaining.' },
          { heading: 'Conditional Building', content: 'Conditional building extends the builder pattern with methods that apply only when a condition is met. The when() method accepts a boolean and a callback, applying the callback only if the condition is true. This avoids breaking the chain with if statements. TypeScript ensures the callback receives and returns the correct builder type, maintaining type safety throughout the conditional chain.',
            code: `class RequestBuilder {
  private url: string;
  private headers: Record<string, string> = {};
  private body?: string;
  private method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET';

  constructor(url: string) { this.url = url; }

  setMethod(m: 'GET' | 'POST' | 'PUT' | 'DELETE'): this {
    this.method = m;
    return this;
  }

  addHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  setBody(data: unknown): this {
    this.body = JSON.stringify(data);
    this.headers['Content-Type'] = 'application/json';
    return this;
  }

  // Conditional builder — only applies if condition is true
  when(condition: boolean, fn: (builder: this) => this): this {
    return condition ? fn(this) : this;
  }

  build(): RequestInit & { url: string } {
    return { url: this.url, method: this.method, headers: this.headers, body: this.body };
  }
}

const isAdmin = true;
const req = new RequestBuilder('/api/data')
  .setMethod('POST')
  .addHeader('Accept', 'application/json')
  .when(isAdmin, b => b.addHeader('X-Admin', 'true'))
  .setBody({ query: 'test' })
  .build();
console.log(req.method, req.headers);`,
            codeHighlightLines: [26, 27, 39],
            output: `POST { Accept: 'application/json', 'X-Admin': 'true', 'Content-Type': 'application/json' }`,
            tip: 'The when() method keeps the fluent chain unbroken. It is cleaner than assigning the builder to a variable and using external if statements.' },
        ],
        quiz: [
          {
            question: 'Why should builder methods return "this" instead of the class name as the return type?',
            options: [
              'It makes the code shorter to write',
              'Returning "this" preserves the specific subclass type when chaining, enabling proper inheritance',
              'The class name is not valid as a return type in TypeScript',
              'It prevents the builder from being instantiated',
            ],
            correctIndex: 1,
            explanation: 'When a subclass extends the builder, returning "this" ensures the chained methods return the subclass type, not the parent class type. If you return the parent class name, subclass-specific methods would not be available after calling a parent method.',
          },
          {
            question: 'What does the when() method in the conditional builder pattern do?',
            options: [
              'It adds a WHERE clause to the query',
              'It applies a callback to the builder only if a boolean condition is true, otherwise returns the builder unchanged',
              'It schedules the builder step to run later',
              'It validates the current builder state',
            ],
            correctIndex: 1,
            explanation: 'The when(condition, fn) method checks the boolean condition: if true, it passes the builder to the callback function fn and returns the result; if false, it returns the builder unchanged. This keeps the fluent chain intact without external if statements.',
          },
          {
            question: 'What is the final step in the builder pattern that produces the result?',
            options: [
              'The constructor, which initializes the result',
              'The last chained method call',
              'The build() method, which assembles and returns the final typed result',
              'The return statement of any chained method',
            ],
            correctIndex: 2,
            explanation: 'The build() method is the terminal operation that assembles the accumulated configuration into the final result. It returns a different type than the builder itself (e.g., a string SQL query or a RequestInit object), signaling the end of the building process.',
          },
        ],
        challenge: {
          prompt: 'Create a typed FormBuilder class that constructs HTML form configuration objects step by step. It should support addField(name, type, required?), setAction(url), setMethod("GET" | "POST"), and a when() conditional method. The build() method should return a typed FormConfig object.',
          starterCode: `interface FormField {
  name: string;
  type: 'text' | 'email' | 'number' | 'password';
  required: boolean;
}

interface FormConfig {
  action: string;
  method: 'GET' | 'POST';
  fields: FormField[];
}

// TODO: Implement FormBuilder with fluent API
// Methods: addField, setAction, setMethod, when, build
class FormBuilder {
  // Your implementation here
}
`,
          solutionCode: `interface FormField {
  name: string;
  type: 'text' | 'email' | 'number' | 'password';
  required: boolean;
}

interface FormConfig {
  action: string;
  method: 'GET' | 'POST';
  fields: FormField[];
}

class FormBuilder {
  private action = '/';
  private method: 'GET' | 'POST' = 'POST';
  private fields: FormField[] = [];

  setAction(url: string): this {
    this.action = url;
    return this;
  }

  setMethod(m: 'GET' | 'POST'): this {
    this.method = m;
    return this;
  }

  addField(name: string, type: FormField['type'], required = false): this {
    this.fields.push({ name, type, required });
    return this;
  }

  when(condition: boolean, fn: (builder: this) => this): this {
    return condition ? fn(this) : this;
  }

  build(): FormConfig {
    return { action: this.action, method: this.method, fields: [...this.fields] };
  }
}

// Usage
const needsPassword = true;
const config = new FormBuilder()
  .setAction('/api/register')
  .setMethod('POST')
  .addField('email', 'email', true)
  .addField('name', 'text', true)
  .when(needsPassword, b => b.addField('password', 'password', true))
  .build();`,
          hints: [
            'Store the form configuration as private fields on the class.',
            'Each method should return "this" to enable chaining.',
            'The when() method should accept a boolean and a callback that receives and returns the builder.',
          ],
        },
      },
      {
        id: 'branded-types',
        title: 'Branded Types',
        difficulty: 'advanced',
        tags: ['branded-types', 'nominal', 'unique-symbol', 'type-safety', 'UserId', 'opaque'],
        cheatSheetSummary: 'Use unique symbol brands to make structurally identical types incompatible (UserId vs OrderId).',
        sections: [
          { heading: 'Nominal Typing via Unique Symbol', content: 'TypeScript uses structural typing, meaning two types with the same shape are interchangeable. This allows accidentally passing a UserId where an OrderId is expected. Branded types solve this by intersecting a primitive with a unique symbol brand, creating types that are structurally incompatible even though their runtime value is the same. The brand exists only at compile time and has zero runtime cost. This pattern is widely used in domain-driven design to prevent ID mix-ups.',
            analogy: 'Think of it like colored wristbands at a music festival: a VIP wristband and a general admission wristband are both just plastic strips (strings), but the color brand makes them incompatible. You cannot enter the VIP area with a general band, even though the physical material is identical.',
            code: `// Brand utility type
declare const __brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [__brand]: B };

// Define branded types
type UserId = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;
type Email = Brand<string, 'Email'>;

// Constructor functions (runtime validation + branding)
function UserId(id: string): UserId {
  if (!id.startsWith('usr_')) throw new Error('Invalid UserId');
  return id as UserId;
}

function OrderId(id: string): OrderId {
  if (!id.startsWith('ord_')) throw new Error('Invalid OrderId');
  return id as OrderId;
}

function Email(value: string): Email {
  if (!value.includes('@')) throw new Error('Invalid email');
  return value as Email;
}

// Type-safe usage
function getUser(id: UserId) { console.log('Fetching user:', id); }
function getOrder(id: OrderId) { console.log('Fetching order:', id); }

const userId = UserId('usr_abc123');
const orderId = OrderId('ord_xyz789');
getUser(userId);   // OK
getOrder(orderId); // OK
// getUser(orderId); // Compile error! OrderId is not assignable to UserId`,
            codeHighlightLines: [2, 3, 6, 7, 8, 11, 12, 13],
            output: `Fetching user: usr_abc123
Fetching order: ord_xyz789`,
            tip: 'Branded types add zero runtime overhead. The brand exists only in the type system and is erased during compilation.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    subgraph "Structural Typing (unsafe)"\n        S1["string"] -->|"accepted"| FN1["getUser(id: string)"]\n        S1 -->|"accepted"| FN2["getOrder(id: string)"]\n    end\n    subgraph "Branded Types (safe)"\n        U["UserId\\nstring & Brand<UserId>"] -->|"accepted ✅"| FN3["getUser(id: UserId)"]\n        O["OrderId\\nstring & Brand<OrderId>"] -->|"accepted ✅"| FN4["getOrder(id: OrderId)"]\n        U -->|"rejected ❌"| FN4\n        O -->|"rejected ❌"| FN3\n    end',
              caption: 'Branded types make structurally identical strings incompatible at compile time, preventing ID mix-ups.',
            } },
          { heading: 'Compile-Time Safety', content: 'Branded types prevent an entire category of bugs where values with the same underlying type are swapped. Common examples include mixing up different ID types, passing raw strings where validated emails are expected, or confusing units like pixels and rems. The pattern works with numbers, strings, and any other primitive. Libraries like ts-brand and zod .brand() provide ready-made utilities for this pattern.',
            code: `// Numeric branded types — prevent unit confusion
type Pixels = Brand<number, 'Pixels'>;
type Rems = Brand<number, 'Rems'>;
type Milliseconds = Brand<number, 'Milliseconds'>;

function px(n: number): Pixels { return n as Pixels; }
function rem(n: number): Rems { return n as Rems; }
function ms(n: number): Milliseconds { return n as Milliseconds; }

function setWidth(value: Pixels) { console.log(\`Width: \${value}px\`); }
function setFontSize(value: Rems) { console.log(\`Font: \${value}rem\`); }
function delay(duration: Milliseconds) { console.log(\`Delay: \${duration}ms\`); }

setWidth(px(100));       // OK
setFontSize(rem(1.5));   // OK
delay(ms(300));          // OK
// setWidth(rem(1.5));   // Compile error! Rems not assignable to Pixels
// delay(px(100));       // Compile error! Pixels not assignable to Milliseconds

// Works with zod for runtime + compile-time safety
// const UserIdSchema = z.string().startsWith('usr_').brand<'UserId'>();
// type UserId = z.infer<typeof UserIdSchema>;`,
            output: `Width: 100px
Font: 1.5rem
Delay: 300ms`,
            warning: 'Branded types require discipline. Always use the constructor functions to create branded values. Raw casts (as UserId) bypass the runtime validation.' },
        ],
        quiz: [
          {
            question: 'Why does TypeScript allow passing a UserId where an OrderId is expected without branded types?',
            options: [
              'Because TypeScript does not check function parameter types',
              'Because TypeScript uses structural typing — both are strings with the same shape, so they are interchangeable',
              'Because TypeScript treats all IDs as the same type',
              'Because type aliases are always transparent in TypeScript',
            ],
            correctIndex: 1,
            explanation: 'TypeScript uses structural typing, meaning types are compatible based on their shape, not their name. Since both UserId and OrderId are plain strings, they are structurally identical and freely interchangeable without branding.',
          },
          {
            question: 'What is the runtime cost of branded types?',
            options: [
              'A small overhead from the brand property stored on each value',
              'Zero — the brand exists only in the type system and is erased during compilation',
              'Significant, because each value must be wrapped in a class instance',
              'A one-time cost when the brand type is first declared',
            ],
            correctIndex: 1,
            explanation: 'The brand is an intersection with a unique symbol property that exists only at the type level. TypeScript erases all type information during compilation, so the brand has zero runtime cost. The constructor functions may add runtime validation, but the brand itself is free.',
          },
          {
            question: 'How does the Brand<T, B> utility type work?',
            options: [
              'It creates a new class that extends T',
              'It intersects T with a readonly unique symbol property, making it structurally different from plain T',
              'It wraps T in a generic container at runtime',
              'It adds a string tag to the value at runtime',
            ],
            correctIndex: 1,
            explanation: 'Brand<T, B> is defined as T & { readonly [__brand]: B }, where __brand is a unique symbol. This intersection makes the branded type structurally different from plain T because it carries an additional (phantom) property that only exists in the type system.',
          },
          {
            question: 'Which approach adds both runtime validation AND compile-time branding?',
            options: [
              'Using type aliases like type UserId = string',
              'Constructor functions that validate input and cast with "as" to the branded type',
              'Using the satisfies keyword',
              'Declaring the brand as a class property',
            ],
            correctIndex: 1,
            explanation: 'Constructor functions like function UserId(id: string): UserId combine runtime validation (checking the format) with the "as UserId" cast that applies the brand. This gives you both compile-time type safety and runtime data integrity.',
          },
        ],
        challenge: {
          prompt: 'Create branded types for a currency system: USD, EUR, and GBP. Each should brand a number. Write constructor functions that validate non-negative amounts, and a typed addSameCurrency function that only allows adding amounts of the same currency.',
          starterCode: `// TODO: Define the Brand utility type
declare const __brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [__brand]: B };

// TODO: Define branded currency types: USD, EUR, GBP


// TODO: Write constructor functions with non-negative validation


// TODO: Write addSameCurrency<T extends number>(a: T, b: T): T
// This function should only accept two values of the same branded type
`,
          solutionCode: `declare const __brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [__brand]: B };

type USD = Brand<number, 'USD'>;
type EUR = Brand<number, 'EUR'>;
type GBP = Brand<number, 'GBP'>;

function usd(amount: number): USD {
  if (amount < 0) throw new Error('Amount cannot be negative');
  return amount as USD;
}

function eur(amount: number): EUR {
  if (amount < 0) throw new Error('Amount cannot be negative');
  return amount as EUR;
}

function gbp(amount: number): GBP {
  if (amount < 0) throw new Error('Amount cannot be negative');
  return amount as GBP;
}

function addSameCurrency<T extends number>(a: T, b: T): T {
  return (a + b) as T;
}

// Usage
const price1 = usd(29.99);
const price2 = usd(15.00);
const total = addSameCurrency(price1, price2); // OK — both USD

const euroPrice = eur(50);
// addSameCurrency(price1, euroPrice); // Compile error! USD and EUR are incompatible`,
          hints: [
            'Define each currency type as Brand<number, "CurrencyName">.',
            'Constructor functions should validate that the amount is non-negative before casting.',
            'The generic constraint T extends number ensures addSameCurrency works with any branded number but requires both arguments to be the same branded type.',
          ],
        },
      },
      {
        id: 'exhaustive-checks',
        title: 'Exhaustive Checking',
        difficulty: 'advanced',
        tags: ['exhaustive', 'never', 'switch', 'assertNever', 'compile-time', 'safety'],
        cheatSheetSummary: 'Use the never type in default cases to get compile errors when union variants are unhandled.',
        sections: [
          { heading: 'The never Type in Switch Statements', content: 'The never type represents values that should never occur. When you narrow a discriminated union through all its variants, the remaining type is never. By assigning the unhandled value to a never-typed variable in the default case, TypeScript produces a compile error if you forget to handle a variant. This is called exhaustive checking and is essential for maintaining correctness when union types grow over time. Without it, adding a new variant silently falls through.',
            analogy: 'Think of it like a mail sorting machine: each slot is labeled for a specific department (circle, rectangle, triangle). The "never" slot at the end is the dead-letter office that should always stay empty. If a new department (shape) is added but no slot is created, letters pile up in the dead-letter office and an alarm (compile error) goes off immediately.',
            code: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    case 'triangle':
      return 0.5 * shape.base * shape.height;
    default: {
      // If all cases are handled, shape is 'never' here
      const _exhaustive: never = shape;
      throw new Error(\`Unhandled shape: \${JSON.stringify(_exhaustive)}\`);
    }
  }
}

console.log(area({ kind: 'circle', radius: 5 }).toFixed(2));
console.log(area({ kind: 'rectangle', width: 4, height: 6 }));
console.log(area({ kind: 'triangle', base: 10, height: 3 }));`,
            codeHighlightLines: [14, 15, 16],
            output: `78.54
24
15`,
            tip: 'If you add { kind: "polygon"; sides: number } to Shape but forget to add a case, TypeScript will error at the _exhaustive assignment, catching the bug at compile time.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    S["shape.kind"] --> C1{"circle?"}\n    C1 -->|"yes"| R1["return PI * r^2"]\n    C1 -->|"no"| C2{"rectangle?"}\n    C2 -->|"yes"| R2["return w * h"]\n    C2 -->|"no"| C3{"triangle?"}\n    C3 -->|"yes"| R3["return 0.5 * b * h"]\n    C3 -->|"no"| DEF["default: never"]\n    DEF -->|"shape is never"| ERR["Compile error if\\nunhandled variant exists"]\n    style DEF fill:#ef4444,stroke:#dc2626,color:#fff\n    style ERR fill:#fca5a5,stroke:#ef4444,color:#000',
              caption: 'Exhaustive checking: the default case assigns to never, which causes a compile error if any variant is not handled above.',
            } },
          { heading: 'assertNever Helper', content: 'The assertNever utility function formalizes exhaustive checking into a reusable helper. It accepts a value of type never and throws an error with a descriptive message. This is cleaner than an inline assignment and provides a consistent runtime error for truly impossible cases. Some teams extend this pattern to log the unexpected value in production error tracking systems before throwing, giving visibility into potential type mismatches.',
            code: `// Reusable exhaustive check helper
function assertNever(value: never, message?: string): never {
  throw new Error(message ?? \`Unexpected value: \${JSON.stringify(value)}\`);
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function describeMethod(method: HttpMethod): string {
  switch (method) {
    case 'GET':    return 'Retrieve resource';
    case 'POST':   return 'Create resource';
    case 'PUT':    return 'Update resource';
    case 'DELETE': return 'Remove resource';
    default:       return assertNever(method);
  }
}

// Works with if-else chains too
type LogLevel = 'debug' | 'info' | 'warn' | 'error';
function logIcon(level: LogLevel): string {
  if (level === 'debug') return '[D]';
  if (level === 'info')  return '[I]';
  if (level === 'warn')  return '[W]';
  if (level === 'error') return '[E]';
  return assertNever(level);
}

console.log(describeMethod('POST'));
console.log(logIcon('warn'));`,
            codeHighlightLines: [2, 3, 14, 25],
            output: `Create resource
[W]`,
            warning: 'Without exhaustive checks, adding a new union member compiles silently and falls through to undefined behavior. Always use assertNever in the default case of discriminated union switches.' },
        ],
        quiz: [
          {
            question: 'What does the never type represent in TypeScript?',
            options: [
              'A type that accepts any value',
              'A type that represents undefined',
              'A type that represents values that should never occur — the empty set of values',
              'A type that represents null',
            ],
            correctIndex: 2,
            explanation: 'The never type is the bottom type in TypeScript, representing the empty set of values. No value can be assigned to never. When all variants of a discriminated union are handled, the remaining type is narrowed to never, confirming exhaustive handling.',
          },
          {
            question: 'What happens if you add a new variant to a union but forget to handle it in the switch statement with exhaustive checking?',
            options: [
              'The code compiles and the new variant falls through silently',
              'TypeScript produces a compile error at the never assignment because the new variant is not assignable to never',
              'A runtime error is thrown automatically',
              'TypeScript adds a default handler automatically',
            ],
            correctIndex: 1,
            explanation: 'If a new variant is added but not handled, the switch falls through to the default case where the value is not never (it is the unhandled variant type). Assigning a non-never value to a never variable causes a compile error, catching the missing case.',
          },
          {
            question: 'Why does assertNever have a return type of never?',
            options: [
              'Because it returns undefined',
              'Because it always throws an error and never returns, so never is the correct return type for functions that never complete',
              'Because it returns a value of type never',
              'Because TypeScript requires all error functions to return never',
            ],
            correctIndex: 1,
            explanation: 'Functions that always throw (or have infinite loops) never return to the caller. The never return type tells TypeScript this function is a dead end, which helps with control flow analysis and ensures the compiler knows code after the call is unreachable.',
          },
          {
            question: 'Can exhaustive checking with never work in if-else chains, not just switch statements?',
            options: [
              'No, it only works in switch statements',
              'Yes, if all variants are handled in if/else branches, the final else reaches never',
              'Only with a special TypeScript plugin',
              'Only if the discriminant is a boolean',
            ],
            correctIndex: 1,
            explanation: 'TypeScript narrows types through any control flow, including if-else chains. If every variant of a union is handled in sequential if statements, the remaining type after all checks is never, and assertNever can be used in the final else or return statement.',
          },
        ],
        challenge: {
          prompt: 'Create a type-safe logger with log levels "debug", "info", "warn", and "error". Write a formatLog function that uses exhaustive checking to format each level with a prefix ([DEBUG], [INFO], [WARN], [ERROR]). Then add a new level "fatal" to the union and verify that the exhaustive check catches the unhandled case.',
          starterCode: `// TODO: Define assertNever helper


// TODO: Define LogLevel union type (start with debug, info, warn, error)


// TODO: Write formatLog(level: LogLevel, message: string): string
// Use a switch with exhaustive checking in the default case


// Test it
// console.log(formatLog('info', 'Server started'));
// console.log(formatLog('error', 'Connection failed'));

// TODO: Add 'fatal' to LogLevel and see the compile error
`,
          solutionCode: `function assertNever(value: never, msg?: string): never {
  throw new Error(msg ?? \`Unhandled value: \${JSON.stringify(value)}\`);
}

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

function formatLog(level: LogLevel, message: string): string {
  switch (level) {
    case 'debug': return \`[DEBUG] \${message}\`;
    case 'info':  return \`[INFO] \${message}\`;
    case 'warn':  return \`[WARN] \${message}\`;
    case 'error': return \`[ERROR] \${message}\`;
    case 'fatal': return \`[FATAL] \${message}\`;
    default:      return assertNever(level);
  }
}

console.log(formatLog('info', 'Server started'));
console.log(formatLog('error', 'Connection failed'));
console.log(formatLog('fatal', 'System crash'));`,
          hints: [
            'Start with four log levels and a switch statement that handles each one.',
            'Add const _exhaustive: never = level in the default case (or use assertNever).',
            'When you add "fatal" to the union without a corresponding case, TypeScript will report an error at the never assignment.',
          ],
        },
      },
      {
        id: 'type-safe-api-calls',
        title: 'Type-Safe API Calls',
        difficulty: 'advanced',
        tags: ['api', 'fetch', 'zod', 'tRPC', 'validation', 'type-safe', 'runtime'],
        cheatSheetSummary: 'Combine typed fetch wrappers with zod runtime validation for compile-time and runtime API safety.',
        sections: [
          { heading: 'Typed Fetch Wrapper', content: 'A typed fetch wrapper provides compile-time type safety for API calls. By defining a generic function that accepts a URL path and returns a typed promise, you get autocomplete and error checking at every call site. However, the runtime response is still unknown JSON, so the wrapper only guarantees the type at the TypeScript level. For true safety, combine it with runtime validation using zod or similar libraries.',
            analogy: 'Think of it like a GPS navigation system: the typed fetch wrapper gives you a detailed map (compile-time types) showing which roads (endpoints) exist and what destinations (response types) they lead to. But just like a GPS cannot guarantee the road is not flooded at runtime, the wrapper cannot guarantee the server actually returns the expected data.',
            code: `// Typed API client
interface ApiEndpoints {
  '/users': { params: { page?: number }; response: { id: string; name: string }[] };
  '/users/:id': { params: { id: string }; response: { id: string; name: string; email: string } };
  '/posts': { params: { userId?: string }; response: { id: string; title: string }[] };
}

async function api<P extends keyof ApiEndpoints>(
  path: P,
  params?: ApiEndpoints[P]['params']
): Promise<ApiEndpoints[P]['response']> {
  const url = new URL(path as string, 'https://api.example.com');
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) url.searchParams.set(k, String(v));
    });
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(\`API error: \${res.status}\`);
  return res.json();
}

// Fully typed — autocomplete on path, params, and response
const users = await api('/users', { page: 1 });
console.log(users[0].name); // typed as string
const user = await api('/users/:id', { id: '123' });
console.log(user.email);    // typed as string`,
            codeHighlightLines: [2, 3, 4, 5, 8, 9, 10, 11],
            output: `// users: { id: string; name: string }[]
// user: { id: string; name: string; email: string }
// api('/unknown') — compile error, path not in ApiEndpoints`,
            tip: 'This pattern gives compile-time safety but not runtime safety. The server could return unexpected data. Add zod validation for full safety.' },
          { heading: 'Zod Runtime Validation', content: 'Zod schemas validate API responses at runtime, catching type mismatches between your frontend types and the actual server response. By calling schema.parse() on the JSON response, you get a runtime error with a descriptive message if the data does not match the expected shape. Combining zod with the typed fetch wrapper gives you both compile-time autocomplete and runtime guarantees, eliminating an entire class of integration bugs.',
            code: `import { z } from 'zod';

// Define response schemas
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'moderator']),
  createdAt: z.string().datetime(),
});

const UsersResponseSchema = z.object({
  data: z.array(UserSchema),
  pagination: z.object({ page: z.number(), total: z.number() }),
});

type User = z.infer<typeof UserSchema>;
type UsersResponse = z.infer<typeof UsersResponseSchema>;

// Validated fetch — runtime + compile-time safety
async function safeFetch<T>(url: string, schema: z.ZodType<T>): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  const json = await res.json();
  return schema.parse(json); // throws ZodError if invalid
}

// Usage — response is validated AND typed
const response = await safeFetch('/api/users', UsersResponseSchema);
console.log(response.data[0].name);       // typed as string
console.log(response.pagination.total);    // typed as number`,
            codeHighlightLines: [21, 25],
            output: `// If server returns valid data: works normally
// If server returns { data: [{ id: 123 }] }:
// ZodError: Expected string, received number at "data[0].id"`,
            tip: 'Use safeParse() instead of parse() to handle validation errors without exceptions. It returns { success: boolean, data?, error? }.' },
          { heading: 'tRPC-Style Typed Endpoints', content: 'tRPC eliminates the need for a separate API layer by sharing types directly between server and client. The server defines procedures with input validation and typed return values. The client calls these procedures as if they were local functions, with full autocomplete and type checking. This removes the entire class of serialization/deserialization bugs and ensures the frontend and backend types are always in sync without code generation.',
            analogy: 'Think of it like a direct phone line between two offices in the same building: instead of writing letters (REST requests) that could get lost or misread, tRPC gives the frontend a direct call to the backend where both sides speak the exact same language (shared types). If someone changes the conversation format on one end, the other end immediately knows.',
            code: `// Simplified tRPC-style pattern (conceptual)
import { z } from 'zod';

// Shared type contract (used by both server and client)
interface AppRouter {
  getUser: {
    input: z.infer<typeof z.object({ id: z.string() })>;
    output: { id: string; name: string; email: string };
  };
  createPost: {
    input: z.infer<typeof z.object({ title: z.string(), body: z.string() })>;
    output: { id: string; title: string; createdAt: string };
  };
  listPosts: {
    input: z.infer<typeof z.object({ page: z.number().optional() })>;
    output: { posts: { id: string; title: string }[]; total: number };
  };
}

// Type-safe client proxy
type Client<T> = { [K in keyof T]: T[K] extends { input: infer I; output: infer O }
  ? (input: I) => Promise<O> : never };

// Usage — fully typed end-to-end
declare const trpc: Client<AppRouter>;
const user = await trpc.getUser({ id: '123' });
console.log(user.name);  // autocomplete works
const result = await trpc.createPost({ title: 'Hello', body: 'World' });
console.log(result.createdAt);
// trpc.getUser({ name: 'wrong' }); // Compile error: 'name' not in input type`,
            output: `// user: { id: string; name: string; email: string }
// result: { id: string; title: string; createdAt: string }
// Full autocomplete on both input and output types`,
            tip: 'tRPC provides the best developer experience for TypeScript full-stack apps. If your backend is also TypeScript, consider tRPC over REST for internal APIs.' },
        ],
        quiz: [
          {
            question: 'What is the main limitation of a typed fetch wrapper without runtime validation?',
            options: [
              'It does not provide autocomplete in the editor',
              'It guarantees types at compile time but the server could return unexpected data at runtime',
              'It cannot handle async operations',
              'It requires manual type annotations at every call site',
            ],
            correctIndex: 1,
            explanation: 'A typed fetch wrapper maps endpoint paths to expected response types, providing compile-time autocomplete and checking. However, the actual JSON from the server is unknown at runtime. Without zod or similar validation, a type mismatch between the server response and your types silently produces incorrectly typed data.',
          },
          {
            question: 'What does schema.parse(json) do in zod?',
            options: [
              'It converts the JSON string to an object',
              'It validates the data against the schema and throws a ZodError if the data does not match',
              'It only checks the top-level keys of the object',
              'It silently returns undefined for invalid data',
            ],
            correctIndex: 1,
            explanation: 'schema.parse(json) performs deep runtime validation of the data against the zod schema. If the data matches, it returns the typed result. If it does not match, it throws a ZodError with detailed information about what went wrong and where.',
          },
          {
            question: 'How does tRPC achieve end-to-end type safety?',
            options: [
              'By generating TypeScript code from an OpenAPI specification',
              'By sharing TypeScript types directly between server and client without a separate API layer',
              'By validating all requests at a gateway proxy',
              'By using JSON Schema for runtime validation',
            ],
            correctIndex: 1,
            explanation: 'tRPC shares TypeScript types directly between the server and client. The server defines procedures with typed inputs and outputs, and the client gets a type-safe proxy that mirrors these procedures. Changes on one side are immediately reflected on the other, with no code generation needed.',
          },
          {
            question: 'What is the difference between parse() and safeParse() in zod?',
            options: [
              'parse() is faster, safeParse() is slower but more accurate',
              'parse() throws on invalid data, safeParse() returns a result object with success/error without throwing',
              'They are identical in behavior',
              'safeParse() only validates the top-level structure',
            ],
            correctIndex: 1,
            explanation: 'parse() throws a ZodError when validation fails, which must be caught with try/catch. safeParse() returns a discriminated union { success: true, data: T } | { success: false, error: ZodError } without throwing, making it easier to handle validation failures in a type-safe way.',
          },
        ],
        challenge: {
          prompt: 'Create a type-safe API client using an interface map and a generic fetch wrapper. Define at least 3 endpoints with different response types. Then add zod validation by creating a safeFetch function that validates the response against a zod schema before returning it.',
          starterCode: `import { z } from 'zod';

// TODO: Define an ApiEndpoints interface mapping paths to { params; response }


// TODO: Write a generic api() function that accepts a path from ApiEndpoints
// and returns the correctly typed response


// TODO: Define a zod schema for one of the endpoints


// TODO: Write safeFetch<T>(url: string, schema: z.ZodType<T>): Promise<T>
// that validates the response against the schema
`,
          solutionCode: `import { z } from 'zod';

interface ApiEndpoints {
  '/todos': {
    params: { completed?: boolean };
    response: { id: number; title: string; completed: boolean }[];
  };
  '/todos/:id': {
    params: { id: number };
    response: { id: number; title: string; completed: boolean; description: string };
  };
  '/users/me': {
    params: Record<string, never>;
    response: { id: string; name: string; email: string };
  };
}

async function api<P extends keyof ApiEndpoints>(
  path: P,
  params?: ApiEndpoints[P]['params']
): Promise<ApiEndpoints[P]['response']> {
  const url = new URL(path as string, 'https://api.example.com');
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) url.searchParams.set(k, String(v));
    });
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(\`API error: \${res.status}\`);
  return res.json();
}

const TodoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

const TodoListSchema = z.array(TodoSchema);

async function safeFetch<T>(url: string, schema: z.ZodType<T>): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  const json = await res.json();
  return schema.parse(json);
}

// Usage
const todos = await safeFetch('/api/todos', TodoListSchema);
console.log(todos[0].title); // typed and validated`,
          hints: [
            'Map endpoint paths as keys in the ApiEndpoints interface, with params and response as values.',
            'Use a generic constraint P extends keyof ApiEndpoints to restrict the path parameter.',
            'safeFetch takes a zod schema and calls schema.parse() on the JSON response for runtime validation.',
          ],
        },
      },
      {
        id: 'strict-mode-tips',
        title: 'Strict Mode Tips',
        difficulty: 'advanced',
        tags: ['strict', 'strictNullChecks', 'noImplicitAny', 'strictFunctionTypes', 'tsconfig', 'best-practices'],
        cheatSheetSummary: 'Enable strict mode in tsconfig for maximum type safety: strictNullChecks, noImplicitAny, strictFunctionTypes.',
        sections: [
          { heading: 'Key Strict Mode Flags', content: 'TypeScript strict mode is a collection of compiler flags that enable the most rigorous type checking. Setting "strict": true in tsconfig.json enables all strict flags at once. strictNullChecks makes null and undefined their own types, preventing the most common runtime errors. noImplicitAny requires explicit type annotations when TypeScript cannot infer the type. strictFunctionTypes enforces contravariant parameter checking for function types, catching subtle assignment bugs.',
            analogy: 'Think of it like safety equipment in a chemistry lab: strict mode is the master "safety protocol" switch. strictNullChecks is the goggles (protecting against null explosions), noImplicitAny is the labeling rule (every bottle must be identified), and strictFunctionTypes is the compatibility chart (ensuring you do not pour acid into the wrong container).',
            code: `// tsconfig.json — recommended strict settings
// {
//   "compilerOptions": {
//     "strict": true,                    // enables ALL strict flags
//     "noUncheckedIndexedAccess": true,  // array[0] is T | undefined
//     "noUnusedLocals": true,
//     "noUnusedParameters": true,
//     "exactOptionalPropertyTypes": true
//   }
// }

// strictNullChecks — null/undefined must be handled
function getLength(s: string | null): number {
  // return s.length;  // Error: 's' is possibly null
  return s?.length ?? 0; // OK: null-safe access
}

// noImplicitAny — must declare types when not inferable
// function process(data) {}    // Error: parameter 'data' has implicit 'any'
function process(data: unknown) { // OK: explicit type
  if (typeof data === 'string') {
    console.log(data.toUpperCase()); // narrowed to string
  }
}

// noUncheckedIndexedAccess — arrays may be undefined
const arr = [1, 2, 3];
// const first: number = arr[0]; // Error: may be undefined
const first: number = arr[0] ?? 0;    // OK: handled
console.log(getLength('hello'), getLength(null), first);`,
            output: `5 0 1`,
            tip: 'Enable strict mode from the start of every project. Retrofitting strict mode onto a large untyped codebase is significantly harder than starting with it.' },
          { heading: 'Strict Mode Best Practices', content: 'Beyond the compiler flags, strict mode best practices include avoiding type assertions (as), using unknown instead of any for truly unknown values, preferring type guards over assertions, and using the satisfies operator to validate object shapes without widening. The satisfies keyword, introduced in TypeScript 4.9, checks that a value matches a type while preserving the narrower inferred type. These practices ensure your types provide real safety rather than a false sense of security.',
            code: `// Avoid 'any' — use 'unknown' and narrow
function handleApiResponse(data: unknown) {
  // Bad: (data as User).name — no runtime check
  // Good: validate and narrow
  if (isUser(data)) {
    console.log(data.name); // safely narrowed
  }
}

interface User { name: string; email: string }
function isUser(val: unknown): val is User {
  return typeof val === 'object' && val !== null
    && 'name' in val && 'email' in val;
}

// 'satisfies' — validate without widening
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
} satisfies Record<string, string | number[]>;
// palette.red is still number[] (not string | number[])
const r: number = palette.red[0]; // OK — preserved narrow type

// Prefer readonly for immutable data
interface Config {
  readonly apiUrl: string;
  readonly maxRetries: number;
  readonly features: readonly string[];
}

const config: Config = { apiUrl: 'https://api.com', maxRetries: 3, features: ['auth', 'search'] };
// config.apiUrl = 'other';        // Error: readonly
// config.features.push('new');    // Error: readonly array
console.log(r, config.apiUrl);`,
            codeHighlightLines: [11, 12, 13, 17, 18, 19, 20, 21],
            output: `255 https://api.com`,
            warning: 'Type assertions (as) bypass the type checker entirely. Every "as" in your code is a potential runtime bug. Use type guards and runtime validation instead.' },
        ],
        quiz: [
          {
            question: 'What does "strict": true in tsconfig.json do?',
            options: [
              'It enables only strictNullChecks',
              'It enables ALL strict compiler flags at once, including strictNullChecks, noImplicitAny, and strictFunctionTypes',
              'It prevents any TypeScript errors from being warnings',
              'It disables all type inference, requiring explicit types everywhere',
            ],
            correctIndex: 1,
            explanation: '"strict": true is a shorthand that enables all strict-family flags: strictNullChecks, noImplicitAny, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, noImplicitThis, useUnknownInCatchVariables, and alwaysStrict.',
          },
          {
            question: 'What does noUncheckedIndexedAccess do?',
            options: [
              'It prevents accessing array elements by index',
              'It makes array element access return T | undefined, requiring you to handle the case where the element might not exist',
              'It only allows accessing arrays with a for loop',
              'It adds bounds checking at runtime',
            ],
            correctIndex: 1,
            explanation: 'With noUncheckedIndexedAccess, array[0] returns T | undefined instead of T. This forces you to handle the possibility that the index is out of bounds, preventing undefined access bugs. You can use nullish coalescing (??) or optional chaining (?.) to handle it.',
          },
          {
            question: 'What does the "satisfies" operator do differently from a type annotation?',
            options: [
              'It performs runtime type checking',
              'It validates that a value matches a type while preserving the narrower inferred type, unlike a type annotation which widens it',
              'It is identical to a type annotation',
              'It only works with primitive types',
            ],
            correctIndex: 1,
            explanation: 'A type annotation like const x: Record<string, string | number[]> = {...} widens the type. The satisfies operator checks compatibility but preserves the inferred type, so palette.red remains number[] (not string | number[]).',
          },
          {
            question: 'Why should you prefer "unknown" over "any" for values of uncertain type?',
            options: [
              '"unknown" is faster at runtime',
              '"unknown" forces you to narrow the type before accessing properties, preventing unsafe access that "any" would silently allow',
              '"unknown" and "any" are exactly the same',
              '"unknown" automatically validates the data',
            ],
            correctIndex: 1,
            explanation: '"any" disables all type checking — you can access any property or call any method without error. "unknown" requires you to narrow the type first (via type guards, typeof, instanceof, etc.) before accessing properties, which prevents accidental unsafe operations.',
          },
        ],
        challenge: {
          prompt: 'Write a type guard function isValidConfig that checks if an unknown value is a valid AppConfig object (with apiUrl: string, port: number, and debug: boolean). Use "unknown" as the input type and the "val is AppConfig" return type. Then use "satisfies" to validate a config literal.',
          starterCode: `interface AppConfig {
  apiUrl: string;
  port: number;
  debug: boolean;
}

// TODO: Write isValidConfig type guard
// Input: unknown, Output: val is AppConfig
// Check that all required properties exist and have the correct types


// TODO: Use "satisfies" to validate a config object literal
// The object should satisfy Record<string, string | number | boolean>
// but preserve narrow types for each property


// TODO: Test the type guard with valid and invalid data
`,
          solutionCode: `interface AppConfig {
  apiUrl: string;
  port: number;
  debug: boolean;
}

function isValidConfig(val: unknown): val is AppConfig {
  return (
    typeof val === 'object' &&
    val !== null &&
    'apiUrl' in val && typeof (val as Record<string, unknown>).apiUrl === 'string' &&
    'port' in val && typeof (val as Record<string, unknown>).port === 'number' &&
    'debug' in val && typeof (val as Record<string, unknown>).debug === 'boolean'
  );
}

const myConfig = {
  apiUrl: 'https://api.example.com',
  port: 3000,
  debug: true,
} satisfies Record<string, string | number | boolean>;
// myConfig.apiUrl is still string (not string | number | boolean)
// myConfig.port is still number

// Testing the type guard
const rawData: unknown = JSON.parse('{"apiUrl":"https://api.com","port":8080,"debug":false}');
if (isValidConfig(rawData)) {
  console.log(rawData.apiUrl); // safely typed as string
  console.log(rawData.port);   // safely typed as number
}

const invalid: unknown = { apiUrl: 123, port: 'wrong' };
if (!isValidConfig(invalid)) {
  console.log('Invalid config detected');
}`,
          hints: [
            'Check typeof val === "object" && val !== null first to ensure it is an object.',
            'Use the "in" operator to check for property existence, then typeof for each property type.',
            'The satisfies operator goes after the object literal and checks compatibility without widening the type.',
          ],
        },
      },
    ],
  },
];
