import type { DocCategory } from './types';

// Part 2: OOP, Import/Export Data, Advanced Topics
export const PART2_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  OOP                                                          */
  /* ------------------------------------------------------------ */
  {
    id: 'oop',
    label: 'OOP',
    icon: 'Layers',
    entries: [
      /* ======== classes-and-objects ======== */
      {
        id: 'classes-and-objects',
        title: 'Classes and Objects',
        difficulty: 'beginner',
        quiz: [
          {
            question: 'What is the purpose of the __init__ method in a Python class?',
            options: [
              'It is called when the object is deleted from memory',
              'It is the constructor that initializes the object\'s state when created',
              'It defines the string representation of the object',
              'It is a static method that belongs to the class, not instances',
            ],
            correctIndex: 1,
            explanation:
              '__init__ is the constructor method. It runs automatically when you create a new instance (e.g., Dog("Rex", "Lab")) and is where you set up the object\'s initial attributes via self.',
          },
          {
            question: 'What happens if you define a mutable class variable like `tags = []` and one instance appends to it?',
            options: [
              'Only that instance\'s tags list is modified',
              'A TypeError is raised because class variables are read-only',
              'All instances see the change because they share the same list object',
              'Python automatically creates a copy for each instance',
            ],
            correctIndex: 2,
            explanation:
              'Mutable class variables (lists, dicts) are shared by all instances. Mutating the object in-place (e.g., append) affects every instance. To give each instance its own list, initialize it inside __init__ with self.tags = [].',
          },
          {
            question: 'If a class defines __repr__ but not __str__, what does print(obj) display?',
            options: [
              'An empty string',
              'The default <ClassName object at 0x...> representation',
              'The result of __repr__, because Python falls back to it',
              'A TypeError because __str__ is required for print()',
            ],
            correctIndex: 2,
            explanation:
              'Python falls back to __repr__ when __str__ is not defined. This is why, if you only implement one, you should implement __repr__ -- it covers both use cases.',
          },
          {
            question: 'What is the difference between a class variable and an instance variable?',
            options: [
              'Class variables are defined inside __init__; instance variables are defined outside it',
              'Class variables are shared by all instances; instance variables belong to a specific object',
              'Class variables can only be strings; instance variables can be any type',
              'There is no difference -- they are two names for the same thing',
            ],
            correctIndex: 1,
            explanation:
              'Class variables are defined in the class body and shared across all instances. Instance variables are attached to self inside __init__ (or other methods) and each object gets its own independent copy.',
          },
        ],
        challenge: {
          prompt:
            'Create a `Counter` class that tracks how many instances have been created (using a class variable) and gives each instance a unique sequential ID. Implement __repr__ to show the ID.',
          starterCode: `class Counter:
    # TODO: Add a class variable to track total instances created

    def __init__(self):
        # TODO: Increment the class-level count
        # TODO: Assign a unique id to this instance (1, 2, 3, ...)
        pass

    def __repr__(self) -> str:
        # TODO: Return a string like "Counter(id=1)"
        pass

# Test your implementation
a = Counter()
b = Counter()
c = Counter()
print(a)          # Counter(id=1)
print(b)          # Counter(id=2)
print(c)          # Counter(id=3)
print(f"Total created: {Counter.total}")  # Total created: 3`,
          solutionCode: `class Counter:
    total = 0

    def __init__(self):
        Counter.total += 1
        self.id = Counter.total

    def __repr__(self) -> str:
        return f"Counter(id={self.id})"

# Test your implementation
a = Counter()
b = Counter()
c = Counter()
print(a)          # Counter(id=1)
print(b)          # Counter(id=2)
print(c)          # Counter(id=3)
print(f"Total created: {Counter.total}")  # Total created: 3`,
          hints: [
            'Define a class variable `total = 0` directly in the class body, outside __init__.',
            'Inside __init__, increment with `Counter.total += 1` (not self.total) to modify the shared class variable.',
            'Assign `self.id = Counter.total` after incrementing so the first instance gets id=1.',
          ],
        },
        sections: [
          {
            heading: 'Defining a Class with __init__',
            content:
              'Object-Oriented Programming can feel intimidating at first, but here is the core idea: a class is a blueprint, and an object is something you build from that blueprint. Think of it like an architectural plan for a house -- the plan itself is not a house, but you can construct many houses from the same plan, each with its own paint color, furniture, and quirks. In Python, you define a class with the `class` keyword. The special method `__init__` is the constructor -- it runs automatically the moment you create a new object and is where you set up the object\'s initial state. Every instance method receives `self` as its first parameter, which is Python\'s way of saying "the specific object we\'re working with right now." You attach data to `self` (like `self.name`) so that each object carries its own independent copy of that data. Two dogs can have different names because each one has its own `self`.',
            code: `class Dog:
    """A simple Dog class."""

    def __init__(self, name: str, breed: str, age: int = 1):
        self.name = name      # instance variable
        self.breed = breed
        self.age = age

    def bark(self) -> str:
        return f"{self.name} says: Woof!"

# Create instances (objects)
rex = Dog("Rex", "German Shepherd", 3)
luna = Dog("Luna", "Labrador")

print(rex.bark())
print(f"{luna.name} is a {luna.breed}, age {luna.age}")`,
            output: `Rex says: Woof!
Luna is a Labrador, age 1`,
            tip: '`self` is just a convention -- you could technically name it anything, but the entire Python community uses `self`. Straying from this convention will confuse every reader of your code and break most linters. Treat it as a keyword in spirit.',
            note: 'You might wonder why Python makes you write `self` explicitly instead of handling it implicitly like `this` in JavaScript or Java. Guido van Rossum\'s reasoning was "explicit is better than implicit" -- one of the core tenets of Python\'s design philosophy. It keeps things transparent: you always know exactly what you\'re accessing.',
            analogy: 'Think of it like a cookie cutter: the class is the cutter (the shape), and each object is a cookie you stamp out with it. Every cookie has the same shape, but you can decorate each one differently (different frosting, sprinkles) -- just like each object has the same methods but its own instance data.',
            diagram: {
              kind: 'mermaid',
              code: 'classDiagram\n    class Dog {\n        +str name\n        +str breed\n        +int age\n        +bark() str\n    }\n    Dog <|-- rex : instance\n    Dog <|-- luna : instance\n    class rex {\n        name = "Rex"\n        breed = "German Shepherd"\n        age = 3\n    }\n    class luna {\n        name = "Luna"\n        breed = "Labrador"\n        age = 1\n    }',
              caption: 'The Dog class is the blueprint; rex and luna are individual instances with their own data.',
            },
            codeHighlightLines: [4, 5, 6, 7, 13, 14],
          },
          {
            heading: 'Instance Methods and Class Variables',
            content:
              'Now that you understand instances, let\'s talk about the two kinds of data a class can hold. Instance variables (attached to `self` inside `__init__`) belong to one specific object -- each dog has its own name. Class variables, on the other hand, are defined directly in the class body and are shared by every instance. Think of class variables like a bulletin board in an apartment building: every resident sees the same board, and if someone updates it, everyone sees the change. They are perfect for counters, shared defaults, or any data that logically belongs to the class as a whole rather than to one specific object. Here is the critical subtlety: if you accidentally write `self.count = something` instead of `Cat.count = something`, Python silently creates a new instance variable that shadows the class variable. Your intent was to update the shared counter, but instead you gave that one object its own private copy. This is one of the most common OOP bugs in Python.',
            code: `class Cat:
    species = "Felis catus"   # class variable -- shared by ALL cats
    count = 0                 # tracks how many cats were created

    def __init__(self, name: str, indoor: bool = True):
        self.name = name      # instance variable
        self.indoor = indoor
        Cat.count += 1        # modify the class variable, not a copy

    def describe(self) -> str:
        habitat = "indoor" if self.indoor else "outdoor"
        return f"{self.name} ({self.species}) - {habitat}"

whiskers = Cat("Whiskers")
shadow = Cat("Shadow", indoor=False)

print(whiskers.describe())
print(shadow.describe())
print(f"Total cats created: {Cat.count}")`,
            output: `Whiskers (Felis catus) - indoor
Shadow (Felis catus) - outdoor
Total cats created: 2`,
            warning: 'Be careful with mutable class variables like lists or dictionaries. If you define `tags = []` as a class variable, every instance shares that exact same list. Appending to it via one instance modifies it for all instances -- a bug that has confused countless Python developers. If each instance needs its own list, initialize it in `__init__` with `self.tags = []`.',
            analogy: 'Think of it like a shared whiteboard in a classroom versus personal notebooks. The class variable (whiteboard) is one copy everyone reads; if the teacher erases it, every student sees the change. Instance variables (notebooks) are personal -- each student writes their own notes independently.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Cat (class)',
                    color: '#6366f1',
                    items: [
                      { name: 'species', value: '"Felis catus"' },
                      { name: 'count', value: '2' },
                    ],
                  },
                  {
                    label: 'whiskers (instance)',
                    color: '#10b981',
                    items: [
                      { name: 'name', value: '"Whiskers"' },
                      { name: 'indoor', value: 'True' },
                    ],
                  },
                  {
                    label: 'shadow (instance)',
                    color: '#f59e0b',
                    items: [
                      { name: 'name', value: '"Shadow"' },
                      { name: 'indoor', value: 'False' },
                    ],
                  },
                ],
              },
              caption: 'Class variables live on the class itself and are shared; instance variables live on each object independently.',
            },
            codeHighlightLines: [2, 3, 6, 7, 8],
          },
          {
            heading: '__str__ and __repr__',
            content:
              'Here is a question you will run into quickly: you create a beautiful object, you `print()` it, and Python shows you something useless like `<__main__.Point object at 0x7f3b2c>`. What happened? By default, Python doesn\'t know how to display your custom objects in a meaningful way. That is where the "dunder" (double underscore) methods `__str__` and `__repr__` come in. Think of them as teaching Python how to introduce your object. `__str__` is the friendly introduction -- it\'s what `print()` and f-strings use. It should be clean and readable for end users. `__repr__`, on the other hand, is the developer\'s business card -- it should be unambiguous and, ideally, return a string that could recreate the object (like `Point(3, 4)`). The clever part of Python\'s design: if you only define one of these, define `__repr__`. Python falls back to `__repr__` when `__str__` is missing, but not the other way around. So `__repr__` covers both bases.',
            code: `class Point:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    def __repr__(self) -> str:
        return f"Point({self.x}, {self.y})"

    def __str__(self) -> str:
        return f"({self.x}, {self.y})"

p = Point(3, 4)
print(str(p))       # calls __str__
print(repr(p))      # calls __repr__
print(f"The point is {p}")  # f-strings call __str__
print([p])          # containers use __repr__ for their items`,
            output: `(3, 4)
Point(3, 4)
The point is (3, 4)
[Point(3, 4)]`,
            tip: 'A handy rule of thumb: `__repr__` is for developers (unambiguous), `__str__` is for users (readable). When in doubt, implement `__repr__` first -- it is the one Python uses as a fallback everywhere.',
            note: 'Notice the last line of the output: when you print a list containing your object, the list uses `__repr__` for each item, not `__str__`. This is by design -- inside data structures, Python wants the unambiguous representation so you can distinguish between, say, the string `"hello"` and an object whose `__str__` returns `hello`.',
            analogy: 'Think of it like two kinds of introductions: `__str__` is how you introduce yourself at a party ("Hi, I\'m Alice"), while `__repr__` is your full legal name on a passport ("Alice Marie Johnson, DOB 1990-03-15"). The casual one is for humans; the precise one is for systems that need to identify you unambiguously.',
            codeHighlightLines: [6, 7, 9, 10],
          },
        ],
      },

      /* ======== inheritance ======== */
      {
        id: 'inheritance',
        title: 'Inheritance',
        difficulty: 'intermediate',
        quiz: [
          {
            question: 'What does super().__init__(...) do inside a child class constructor?',
            options: [
              'It creates a new instance of the parent class',
              'It calls the parent class\'s __init__ to set up inherited attributes',
              'It copies all methods from the parent class into the child',
              'It is optional syntax that has no actual effect in Python 3',
            ],
            correctIndex: 1,
            explanation:
              'super().__init__(...) delegates to the parent class\'s constructor, ensuring that the parent\'s initialization logic runs and sets up the inherited attributes before the child adds its own.',
          },
          {
            question: 'In a class hierarchy Shape -> Circle, if Circle overrides area() and Shape.describe() calls self.area(), which version runs when called on a Circle instance?',
            options: [
              'Shape.area(), because describe() is defined in Shape',
              'Circle.area(), because self refers to the actual Circle instance',
              'Both versions run in sequence, parent first then child',
              'It raises an AttributeError because of ambiguity',
            ],
            correctIndex: 1,
            explanation:
              'This is polymorphism in action. When describe() calls self.area(), self is the Circle instance, so Python looks up area() on Circle first and finds the overridden version. The parent\'s describe() does not need to know which subclass it is working with.',
          },
          {
            question: 'In `class Duck(Flyer, Swimmer)`, if both Flyer and Swimmer define move(), which one does Duck.move() call?',
            options: [
              'Swimmer.move(), because the last parent takes priority',
              'Flyer.move(), because the MRO checks parents left to right',
              'Neither -- Python raises an error due to the ambiguity',
              'Both are called, and their results are combined',
            ],
            correctIndex: 1,
            explanation:
              'Python\'s Method Resolution Order (MRO) checks parents left to right, depth-first. Since Flyer is listed first in Duck(Flyer, Swimmer), Flyer.move() is found first and called.',
          },
          {
            question: 'Why is using super() preferred over calling the parent class by name (e.g., Animal.__init__(self, ...)) in inheritance?',
            options: [
              'super() is faster at runtime due to internal optimizations',
              'super() correctly follows the MRO, which matters for multiple inheritance',
              'Calling the parent by name is a syntax error in Python 3',
              'super() automatically passes all arguments, so you do not need to list them',
            ],
            correctIndex: 1,
            explanation:
              'super() uses the MRO to determine which parent to call next. This is critical with multiple inheritance -- hardcoding the parent name can cause __init__ to be skipped or called multiple times in a diamond hierarchy.',
          },
        ],
        challenge: {
          prompt:
            'Create a base class `Vehicle` with attributes `make`, `model`, and `year`, plus a method `describe()`. Then create two child classes: `ElectricCar` (adds `battery_kwh`) and `GasCar` (adds `mpg`). Each child should override describe() to include its unique attribute.',
          starterCode: `class Vehicle:
    def __init__(self, make: str, model: str, year: int):
        # TODO: Store the attributes
        pass

    def describe(self) -> str:
        # TODO: Return something like "2024 Tesla Model S"
        pass

class ElectricCar(Vehicle):
    def __init__(self, make: str, model: str, year: int, battery_kwh: float):
        # TODO: Call parent __init__ with super(), then store battery_kwh
        pass

    def describe(self) -> str:
        # TODO: Extend parent describe() to include battery info
        pass

class GasCar(Vehicle):
    def __init__(self, make: str, model: str, year: int, mpg: float):
        # TODO: Call parent __init__ with super(), then store mpg
        pass

    def describe(self) -> str:
        # TODO: Extend parent describe() to include mpg info
        pass

# Test
ev = ElectricCar("Tesla", "Model S", 2024, 100)
gas = GasCar("Toyota", "Camry", 2023, 32)
print(ev.describe())   # 2024 Tesla Model S (100 kWh battery)
print(gas.describe())  # 2023 Toyota Camry (32 mpg)`,
          solutionCode: `class Vehicle:
    def __init__(self, make: str, model: str, year: int):
        self.make = make
        self.model = model
        self.year = year

    def describe(self) -> str:
        return f"{self.year} {self.make} {self.model}"

class ElectricCar(Vehicle):
    def __init__(self, make: str, model: str, year: int, battery_kwh: float):
        super().__init__(make, model, year)
        self.battery_kwh = battery_kwh

    def describe(self) -> str:
        return f"{super().describe()} ({self.battery_kwh} kWh battery)"

class GasCar(Vehicle):
    def __init__(self, make: str, model: str, year: int, mpg: float):
        super().__init__(make, model, year)
        self.mpg = mpg

    def describe(self) -> str:
        return f"{super().describe()} ({self.mpg} mpg)"

# Test
ev = ElectricCar("Tesla", "Model S", 2024, 100)
gas = GasCar("Toyota", "Camry", 2023, 32)
print(ev.describe())   # 2024 Tesla Model S (100 kWh battery)
print(gas.describe())  # 2023 Toyota Camry (32 mpg)`,
          hints: [
            'In each child __init__, call super().__init__(make, model, year) before storing the child-specific attribute.',
            'In the child describe() methods, call super().describe() to get the base string and then append the child-specific info.',
            'Use f-strings to combine super().describe() with the extra attribute for a clean one-liner.',
          ],
        },
        sections: [
          {
            heading: 'Single Inheritance and super()',
            content:
              'Inheritance is one of the most powerful ideas in OOP, and the concept is surprisingly intuitive once you think of it in human terms. Imagine you have a general category -- "Animal" -- with some shared traits: every animal has a name and makes some kind of sound. Now you want to create a more specific category -- "Dog" -- that has everything an Animal has, plus dog-specific abilities like fetching a ball. Instead of rewriting all the Animal code, you let Dog inherit from Animal and only write the new or different parts. The child class automatically gets every attribute and method of the parent. The key tool for making this work cleanly is `super()`. When you call `super().__init__(...)` inside the child\'s `__init__`, you are telling Python: "First, set me up as a proper Animal, then I will add the Dog-specific stuff." This keeps the initialization chain clean and avoids duplicating code. Always use `super()` rather than calling the parent class by name directly -- it becomes essential when you work with multiple inheritance later.',
            code: `class Animal:
    def __init__(self, name: str, sound: str):
        self.name = name
        self.sound = sound

    def speak(self) -> str:
        return f"{self.name} says {self.sound}!"

class Dog(Animal):
    def __init__(self, name: str, breed: str):
        super().__init__(name, sound="Woof")  # call parent __init__
        self.breed = breed                    # child-specific attribute

    def fetch(self, item: str) -> str:
        return f"{self.name} fetches the {item}!"

buddy = Dog("Buddy", "Golden Retriever")
print(buddy.speak())       # inherited method
print(buddy.fetch("ball")) # child-specific method
print(f"Breed: {buddy.breed}")`,
            output: `Buddy says Woof!
Buddy fetches the ball!
Breed: Golden Retriever`,
            tip: 'Always use `super()` instead of hardcoding the parent class name (e.g., `Animal.__init__(self, ...)`). The hardcoded approach breaks in subtle ways with multiple inheritance and makes your code fragile if you ever restructure the class hierarchy.',
            note: 'In real-world projects, you will see inheritance everywhere. Django\'s class-based views, Flask\'s blueprint patterns, SQLAlchemy models -- they all rely on you inheriting from a base class and overriding or extending specific behavior. Mastering inheritance here pays dividends across every Python framework.',
            analogy: 'Think of it like a family business: the parent generation builds the foundation (the Animal class with name and sound), and the child generation inherits everything but adds their own specialty (Dog adds fetching). The child does not rebuild the foundation from scratch -- they call `super().__init__()` to say "set up the family basics first, then I will add my twist."',
            diagram: {
              kind: 'mermaid',
              code: 'classDiagram\n    class Animal {\n        +str name\n        +str sound\n        +speak() str\n    }\n    class Dog {\n        +str breed\n        +fetch(item) str\n    }\n    Animal <|-- Dog : inherits\n    note for Dog "Dog gets name, sound,\\nand speak() from Animal,\\nthen adds breed and fetch()"',
              caption: 'Dog inherits all attributes and methods from Animal, then adds its own.',
            },
            codeHighlightLines: [9, 11, 12],
          },
          {
            heading: 'Method Overriding',
            content:
              'Here is where things get really interesting. A child class can override any method from the parent simply by defining a method with the same name. When you call that method on a child instance, the child\'s version runs instead of the parent\'s. This is the foundation of polymorphism -- a fancy word for a simple idea: different objects can respond to the same method call in different ways. In the example below, both `Circle` and `Rectangle` inherit from `Shape`, and both override the `area()` method. When we loop through a list of shapes and call `describe()`, each shape calculates its own area correctly, even though `describe()` is defined only in the parent. The parent\'s `describe()` calls `self.area()`, and because `self` refers to the actual object (a Circle or Rectangle), the overridden version runs. This is the magic of polymorphism -- the parent class does not need to know what kind of shape it is describing. You can also use `super()` inside an overridden method if you want to extend the parent\'s behavior rather than completely replace it.',
            code: `class Shape:
    def __init__(self, color: str = "red"):
        self.color = color

    def area(self) -> float:
        return 0.0

    def describe(self) -> str:
        return f"A {self.color} shape with area {self.area():.2f}"

class Circle(Shape):
    def __init__(self, radius: float, color: str = "blue"):
        super().__init__(color)
        self.radius = radius

    def area(self) -> float:       # override parent method
        return 3.14159 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width: float, height: float, color: str = "green"):
        super().__init__(color)
        self.width = width
        self.height = height

    def area(self) -> float:       # override parent method
        return self.width * self.height

shapes = [Circle(5), Rectangle(4, 6)]
for s in shapes:
    print(s.describe())            # polymorphism in action`,
            output: `A blue shape with area 78.54
A green shape with area 24.00`,
            note: 'This pattern is incredibly common in professional Python code. In web frameworks like Django, you override methods like `get_queryset()` or `form_valid()` on class-based views to customize behavior while the parent class handles the boilerplate. The same principle applies here -- the parent defines the structure, the children fill in the specifics.',
            warning: 'When overriding a method, make sure your version accepts the same parameters and returns a compatible type. If the parent\'s `area()` returns a `float`, your overridden version should too. Changing the signature silently can introduce subtle bugs that are hard to track down.',
            diagram: {
              kind: 'mermaid',
              code: 'classDiagram\n    class Shape {\n        +str color\n        +area() float\n        +describe() str\n    }\n    class Circle {\n        +float radius\n        +area() float\n    }\n    class Rectangle {\n        +float width\n        +float height\n        +area() float\n    }\n    Shape <|-- Circle\n    Shape <|-- Rectangle\n    note for Shape "describe() calls self.area()\\nwhich dispatches to the\\nchild\'s overridden version"',
              caption: 'Both Circle and Rectangle override area(). When describe() calls self.area(), polymorphism ensures the correct child version runs.',
            },
            analogy: 'Think of it like a restaurant franchise: the headquarters (Shape) defines the menu template and the ordering process (describe), but each location (Circle, Rectangle) prepares its signature dish (area) in its own way. The customer (calling code) just says "give me the food" and each restaurant delivers its own version.',
          },
          {
            heading: 'Multiple Inheritance and MRO',
            content:
              'Python is one of the few mainstream languages that supports multiple inheritance -- a class can inherit from two or more parents at once. This is powerful but comes with a natural question: if two parents define a method with the same name, which one wins? Python resolves this with the Method Resolution Order (MRO), computed using an algorithm called C3 linearization. You can inspect the MRO with `ClassName.__mro__` or `ClassName.mro()`. In practice, the MRO follows the order you list the parent classes, going left to right and depth-first. In the example below, `Duck` inherits from both `Flyer` and `Swimmer`. Since `Flyer` is listed first, `Flyer.move()` is the one that gets called. Swap the order to `Duck(Swimmer, Flyer)` and the duck would swim instead. While full-blown multiple inheritance can get complex, the most common and cleanest pattern is using "mixins" -- small, focused classes that add a single capability (like `LoggingMixin` or `SerializableMixin`). Mixins are designed to be combined with other classes and avoid the tangled hierarchies that give multiple inheritance a bad reputation.',
            code: `class Flyer:
    def move(self) -> str:
        return "flies through the air"

class Swimmer:
    def move(self) -> str:
        return "swims through the water"

class Duck(Flyer, Swimmer):
    """Inherits from both Flyer and Swimmer."""
    def __init__(self, name: str):
        self.name = name

    def describe(self) -> str:
        return f"{self.name} {self.move()}"

donald = Duck("Donald")
print(donald.describe())  # which move() is called?

# Inspect the MRO
print("\\nMethod Resolution Order:")
for cls in Duck.__mro__:
    print(f"  {cls.__name__}")`,
            output: `Donald flies through the air

Method Resolution Order:
  Duck
  Flyer
  Swimmer
  object`,
            tip: 'The MRO follows left-to-right order of the parent classes. Since `Duck(Flyer, Swimmer)` lists `Flyer` first, `Flyer.move()` wins. Swap the order to `Duck(Swimmer, Flyer)` and the duck would swim instead.',
            warning: 'Multiple inheritance is a sharp tool -- use it with care. The "diamond problem" (where two parents share a common grandparent) can cause `__init__` to be called multiple times or not at all if you don\'t use `super()` consistently throughout the hierarchy. When in doubt, favor composition (having an attribute that is an instance of another class) over multiple inheritance.',
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    Duck -->|"1st parent"| Flyer\n    Duck -->|"2nd parent"| Swimmer\n    Flyer --> object\n    Swimmer --> object\n    style Duck fill:#6366f1,color:#fff\n    style Flyer fill:#10b981,color:#fff\n    style Swimmer fill:#f59e0b,color:#fff\n    style object fill:#94a3b8,color:#fff',
              caption: 'MRO traversal order: Duck -> Flyer -> Swimmer -> object. Python checks left-to-right, depth-first.',
            },
            analogy: 'Think of it like a child with two parents who both have a recipe for "move." When the child is asked to cook, they check the first parent\'s cookbook before the second. The MRO is the order in which Python consults the family cookbooks to find the first matching recipe.',
          },
        ],
      },

      /* ======== property-decorator ======== */
      {
        id: 'property-decorator',
        title: '@property',
        difficulty: 'intermediate',
        quiz: [
          {
            question: 'What is the main advantage of using @property over writing explicit get_x() and set_x() methods?',
            options: [
              '@property methods execute faster than regular methods',
              'The caller uses clean attribute syntax (obj.x) while you still control access behind the scenes',
              '@property automatically validates types, while get/set methods do not',
              '@property works with multiple inheritance, while get/set methods do not',
            ],
            correctIndex: 1,
            explanation:
              'The key benefit of @property is that the external API looks like plain attribute access (obj.x = 5, print(obj.x)), but behind the scenes your getter/setter methods run. This means you can add validation or computation later without changing any calling code.',
          },
          {
            question: 'What happens if you define a @property getter but no setter, and then try to assign to that attribute?',
            options: [
              'Python silently ignores the assignment',
              'The value is stored as a regular instance attribute, bypassing the property',
              'An AttributeError is raised because the property is read-only',
              'A TypeError is raised because properties cannot be assigned to',
            ],
            correctIndex: 2,
            explanation:
              'A property with only a getter is read-only. Attempting to assign to it raises AttributeError with a message like "property \'x\' of \'MyClass\' object has no setter". This is the standard way to create read-only computed attributes in Python.',
          },
          {
            question: 'Inside __init__, writing `self.balance = value` when balance is a @property with a setter will:',
            options: [
              'Bypass the setter and directly store the value',
              'Cause an infinite recursion error',
              'Trigger the setter, so validation runs even during construction',
              'Raise an error because you cannot assign to properties in __init__',
            ],
            correctIndex: 2,
            explanation:
              'Assigning to self.balance triggers the @balance.setter, even inside __init__. This is a powerful pattern because it means validation is active from the very first moment the object is created -- you cannot construct an object with invalid state.',
          },
        ],
        challenge: {
          prompt:
            'Create a `Circle` class with a `radius` property that validates the radius is positive, and computed read-only properties for `area` and `diameter`. Setting a negative radius should raise ValueError.',
          starterCode: `import math

class Circle:
    def __init__(self, radius: float):
        # TODO: Use the property setter to store the radius
        pass

    @property
    def radius(self) -> float:
        # TODO: Return the stored radius
        pass

    @radius.setter
    def radius(self, value: float):
        # TODO: Validate that value > 0, raise ValueError if not
        # TODO: Store as self._radius
        pass

    @property
    def diameter(self) -> float:
        # TODO: Return computed diameter
        pass

    @property
    def area(self) -> float:
        # TODO: Return computed area using math.pi
        pass

# Test
c = Circle(5)
print(f"Radius: {c.radius}")      # 5
print(f"Diameter: {c.diameter}")   # 10
print(f"Area: {c.area:.2f}")      # 78.54

c.radius = 10
print(f"New area: {c.area:.2f}")  # 314.16

try:
    c.radius = -3
except ValueError as e:
    print(f"Error: {e}")

try:
    c.area = 100
except AttributeError as e:
    print(f"Error: {e}")`,
          solutionCode: `import math

class Circle:
    def __init__(self, radius: float):
        self.radius = radius  # goes through the setter

    @property
    def radius(self) -> float:
        return self._radius

    @radius.setter
    def radius(self, value: float):
        if value <= 0:
            raise ValueError(f"Radius must be positive, got {value}")
        self._radius = value

    @property
    def diameter(self) -> float:
        return self._radius * 2

    @property
    def area(self) -> float:
        return math.pi * self._radius ** 2

# Test
c = Circle(5)
print(f"Radius: {c.radius}")      # 5
print(f"Diameter: {c.diameter}")   # 10
print(f"Area: {c.area:.2f}")      # 78.54

c.radius = 10
print(f"New area: {c.area:.2f}")  # 314.16

try:
    c.radius = -3
except ValueError as e:
    print(f"Error: {e}")

try:
    c.area = 100
except AttributeError as e:
    print(f"Error: {e}")`,
          hints: [
            'In __init__, write self.radius = radius (not self._radius) so the setter validation runs during construction.',
            'In the setter, check if value <= 0 and raise ValueError. Store as self._radius (with underscore).',
            'For read-only properties like area and diameter, define only the @property getter with no setter.',
          ],
        },
        sections: [
          {
            heading: 'Getters the Pythonic Way',
            content:
              'If you are coming from Java or C++, your first instinct might be to write `get_age()` and `set_age()` methods everywhere. In Python, that is considered un-Pythonic -- the community prefers a cleaner approach. The Python philosophy is: start with plain attributes. Just use `obj.celsius` directly. No getters, no setters, no ceremony. Then, if you later need to add validation, computation, or logging when an attribute is accessed, you promote it to a property using the `@property` decorator. The beautiful part? The calling code does not change at all. External code keeps using `temp.celsius` as if it were a simple attribute, but behind the scenes your property method runs. This is one of Python\'s most elegant design decisions -- it means you never need to preemptively wrap attributes in getters "just in case." You can always add the control later without breaking anyone\'s code.',
            code: `class Temperature:
    def __init__(self, celsius: float):
        self._celsius = celsius   # "private" by convention (leading _)

    @property
    def celsius(self) -> float:
        """Getter: accessed as temp.celsius"""
        return self._celsius

    @property
    def fahrenheit(self) -> float:
        """Computed property: no stored value, calculated on access."""
        return self._celsius * 9 / 5 + 32

temp = Temperature(100)
print(f"{temp.celsius} C = {temp.fahrenheit} F")

temp2 = Temperature(0)
print(f"{temp2.celsius} C = {temp2.fahrenheit} F")`,
            output: `100 C = 212.0 F
0 C = 32.0 F`,
            tip: 'Start with plain attributes. Only introduce `@property` when you actually need validation, computation, or logging. "Premature property-ification" adds complexity for no benefit -- and it is one of the most common over-engineering mistakes Python developers make.',
            note: 'The leading underscore in `self._celsius` is a convention meaning "this is intended to be private -- please don\'t access it directly." Python does not enforce this (there is no true private in Python), but it is a strong social contract. Double underscores (`__name`) trigger name mangling, which is different and rarely what you want.',
            analogy: 'Think of it like a smart thermostat display: you look at the screen and see "72 F" as though it is just a number sitting there (plain attribute access), but behind the display the thermostat is actually reading a sensor and converting units in real time (the property method running). The user experience is seamless -- they never know computation is happening.',
          },
          {
            heading: '@name.setter for Validation',
            content:
              'Let\'s take properties a step further. What if you want to let people set a value, but you need to validate it first? That is where the setter comes in. You define it with `@propertyname.setter`, and it runs automatically whenever someone assigns to that attribute. This is incredibly powerful for maintaining data integrity -- you write the validation logic once, and it guards every assignment, whether it happens in `__init__`, in a method, or from external code. In the example below, the `BankAccount` class ensures the balance can never go negative. Notice that even inside `__init__`, the line `self.balance = balance` goes through the setter. This means your validation is always active from the very first moment the object is created. There is no way to sneak an invalid value past it.',
            code: `class BankAccount:
    def __init__(self, owner: str, balance: float = 0):
        self.owner = owner         # plain attribute -- no validation needed
        self.balance = balance     # goes through the setter below

    @property
    def balance(self) -> float:
        return self._balance

    @balance.setter
    def balance(self, amount: float):
        if amount < 0:
            raise ValueError(f"Balance cannot be negative: {amount}")
        self._balance = amount

    def deposit(self, amount: float):
        self.balance += amount     # triggers the setter

    def __repr__(self) -> str:
        return f"BankAccount({self.owner!r}, balance={self.balance})"

acct = BankAccount("Alice", 100)
acct.deposit(50)
print(acct)

# Try setting a negative balance
try:
    acct.balance = -500
except ValueError as e:
    print(f"Error: {e}")`,
            output: `BankAccount('Alice', balance=150)
Error: Balance cannot be negative: -500`,
            warning: 'A common trap: inside `__init__`, make sure you assign to `self.balance` (which triggers the setter), not `self._balance` (which bypasses it). If you bypass the setter in the constructor, objects can be created with invalid state, defeating the entire purpose of having validation.',
            note: 'This property-with-setter pattern is how professional Python code handles validation. You will see it in libraries like SQLAlchemy (for column validation), Pydantic (for model fields), and Django (for form fields). Learning this pattern now gives you a foundation for understanding how those frameworks work under the hood.',
            codeHighlightLines: [4, 10, 11, 12, 13, 14, 17],
          },
          {
            heading: 'Computed Properties and Read-Only Attributes',
            content:
              'One of the most satisfying uses of `@property` is creating read-only computed attributes. If you define a property with only a getter and no setter, any attempt to assign to it raises an `AttributeError`. This is perfect for values that should always be derived from other data rather than stored independently. Think about it: if a `Rectangle` stores `width` and `height`, do you also want to store `area` separately? That would mean three pieces of data that need to stay in sync. Change the width, and you would also need to remember to recalculate the area. Instead, make `area` a computed property. There is a single source of truth (`width` and `height`), and the derived value is always fresh and accurate. Your data model literally cannot become inconsistent. This principle -- minimizing stored state and computing derived values on demand -- is a hallmark of well-designed code.',
            code: `class Rectangle:
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height

    @property
    def area(self) -> float:
        """Read-only computed property."""
        return self.width * self.height

    @property
    def perimeter(self) -> float:
        """Read-only computed property."""
        return 2 * (self.width + self.height)

    @property
    def is_square(self) -> bool:
        return self.width == self.height

r = Rectangle(5, 3)
print(f"Size: {r.width}x{r.height}")
print(f"Area: {r.area}")
print(f"Perimeter: {r.perimeter}")
print(f"Is square: {r.is_square}")

# area is read-only -- no setter defined
try:
    r.area = 100
except AttributeError as e:
    print(f"\\nError: {e}")`,
            output: `Size: 5x3
Area: 15
Perimeter: 16
Is square: False

Error: property 'area' of 'Rectangle' object has no setter`,
            tip: 'Computed properties look like plain attributes to the caller -- that is the whole point. Use them liberally for derived values. They make your API intuitive, your internal state minimal, and your data impossible to corrupt.',
            warning: 'If a computed property involves expensive calculation (like a database query or heavy math), consider caching the result with `@functools.cached_property` instead. A regular `@property` recalculates every single time it is accessed, which can cause performance problems in tight loops.',
            analogy: 'Think of it like a price tag on a product bundle: the store does not print a separate "total" sticker -- it computes the total from the prices of the individual items every time you ask. If an item\'s price changes, the total is automatically correct. Storing the total separately would risk it becoming stale and wrong.',
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Import/Export Data                                           */
  /* ------------------------------------------------------------ */
  {
    id: 'import-export-data',
    label: 'Import/Export Data',
    icon: 'Database',
    entries: [
      /* ======== read-write-txt ======== */
      {
        id: 'read-write-txt',
        title: 'Read/Write Txt Files',
        difficulty: 'beginner',
        quiz: [
          {
            question: 'Why should you always use the `with` statement when opening files in Python?',
            options: [
              'It makes file I/O faster by using buffered writes',
              'It guarantees the file is properly closed even if an exception occurs',
              'It is required syntax -- open() does not work without with',
              'It automatically converts the file encoding to UTF-8',
            ],
            correctIndex: 1,
            explanation:
              'The `with` statement is a context manager that guarantees the file is closed when the block exits, even if an exception is raised midway. Without it, a crash or forgotten f.close() call can leak file handles, which is especially dangerous in long-running applications.',
          },
          {
            question: 'What is the difference between "w" and "a" file modes?',
            options: [
              '"w" writes text and "a" writes binary (ASCII) data',
              '"w" overwrites the entire file; "a" appends to the end without erasing existing content',
              '"w" creates a new file; "a" raises an error if the file does not exist',
              'There is no difference -- both write to the end of the file',
            ],
            correctIndex: 1,
            explanation:
              'Write mode ("w") creates a new file or completely truncates an existing one -- all previous content is erased the moment you open it. Append mode ("a") preserves existing content and adds new data to the end. Both modes create the file if it does not exist.',
          },
          {
            question: 'For a 2 GB log file, which approach is the most memory-efficient?',
            options: [
              'content = f.read() to load everything into a string',
              'lines = f.readlines() to get a list of all lines',
              'for line in f: to iterate one line at a time',
              'f.read(2_000_000_000) to read the exact byte count',
            ],
            correctIndex: 2,
            explanation:
              'Iterating directly over the file object with `for line in f:` reads one line at a time, using minimal memory regardless of file size. Both read() and readlines() load the entire file into memory, which would try to allocate 2 GB of RAM for a 2 GB file.',
          },
        ],
        challenge: {
          prompt:
            'Write a script that reads a log file, counts how many lines are at each log level (INFO, DEBUG, ERROR, WARNING), and writes a summary report to a new file.',
          starterCode: `# Step 1: Create a sample log file
log_lines = [
    "INFO: Server started",
    "DEBUG: Loading config",
    "ERROR: Connection timeout",
    "INFO: Request received",
    "WARNING: Disk space low",
    "ERROR: Query failed",
    "INFO: Response sent",
    "DEBUG: Cache cleared",
    "WARNING: Memory usage high",
    "INFO: Server shutdown",
]

with open("server.log", "w") as f:
    for line in log_lines:
        f.write(line + "\\n")

# Step 2: Read the log and count each level
# TODO: Create a dictionary to count occurrences of each level
# TODO: Read server.log line by line
# TODO: For each line, extract the level (text before the colon)
# TODO: Increment the count for that level

# Step 3: Write a summary report
# TODO: Write the counts to "log_report.txt" in a readable format
# Expected output in log_report.txt:
#   Log Level Summary
#   -----------------
#   INFO: 4
#   DEBUG: 2
#   ERROR: 2
#   WARNING: 2

# Step 4: Read back and print the report
with open("log_report.txt", "r") as f:
    print(f.read())`,
          solutionCode: `# Step 1: Create a sample log file
log_lines = [
    "INFO: Server started",
    "DEBUG: Loading config",
    "ERROR: Connection timeout",
    "INFO: Request received",
    "WARNING: Disk space low",
    "ERROR: Query failed",
    "INFO: Response sent",
    "DEBUG: Cache cleared",
    "WARNING: Memory usage high",
    "INFO: Server shutdown",
]

with open("server.log", "w") as f:
    for line in log_lines:
        f.write(line + "\\n")

# Step 2: Read the log and count each level
counts: dict[str, int] = {}
with open("server.log", "r") as f:
    for line in f:
        line = line.strip()
        if ":" in line:
            level = line.split(":")[0]
            counts[level] = counts.get(level, 0) + 1

# Step 3: Write a summary report
with open("log_report.txt", "w") as f:
    f.write("Log Level Summary\\n")
    f.write("-----------------\\n")
    for level, count in counts.items():
        f.write(f"{level}: {count}\\n")

# Step 4: Read back and print the report
with open("log_report.txt", "r") as f:
    print(f.read())`,
          hints: [
            'Use a dictionary like counts = {} and counts.get(level, 0) + 1 to safely increment counts for each level.',
            'Split each line on ":" and take the first part to extract the log level (e.g., "ERROR: Connection timeout".split(":")[0] gives "ERROR").',
            'Remember to strip each line with .strip() to remove trailing newline characters before processing.',
          ],
        },
        sections: [
          {
            heading: 'Reading Text Files with open() and with',
            content:
              'Almost every real program needs to read data from files at some point -- configuration files, log files, user data, exported reports. Python makes this straightforward with the built-in `open()` function. But here is the critical habit to build from day one: always use the `with` statement (a context manager) when opening files. Why? Because `with` guarantees the file is properly closed when the block exits, even if an exception occurs midway through. Without `with`, a crash or forgotten `f.close()` call can leak file handles. This might not matter in a quick script, but in a long-running web server or data pipeline, leaked handles accumulate and eventually your program crashes with a "too many open files" error. The `read()` method loads the entire file into a single string, which is convenient for small files. The `readlines()` method returns a list where each element is one line (including the trailing newline character). Choose based on whether you need the whole content at once or want to work line by line.',
            code: `# Suppose "greeting.txt" contains:
# Hello, World!
# Welcome to Python.
# Have a great day!

# Read entire file as one string
with open("greeting.txt", "r") as f:
    content = f.read()
print(content)
print(f"Total characters: {len(content)}")

print("---")

# Read as a list of lines
with open("greeting.txt", "r") as f:
    lines = f.readlines()
print(f"Number of lines: {len(lines)}")
for i, line in enumerate(lines, 1):
    print(f"  Line {i}: {line.strip()}")`,
            output: `Hello, World!
Welcome to Python.
Have a great day!

Total characters: 52
---
Number of lines: 3
  Line 1: Hello, World!
  Line 2: Welcome to Python.
  Line 3: Have a great day!`,
            tip: 'For very large files, avoid `read()` -- it loads everything into memory at once. A 2 GB log file will try to allocate 2 GB of RAM. Instead, iterate over the file object directly: `for line in f:` processes one line at a time with minimal memory usage. We will cover this pattern in the third section.',
            warning: 'Be aware that `readlines()` preserves the newline character (`\\n`) at the end of each line. This is why we use `line.strip()` in the example. Forgetting to strip can cause bugs like duplicate blank lines when writing the data back out, or failed string comparisons.',
            analogy: 'Think of it like borrowing a book from a library: the `with` statement is your library card checkout system. It guarantees you return the book (close the file) when you leave the library (exit the block), even if you get interrupted. Without it, you might forget to return the book, and eventually the library runs out of copies (file handles).',
          },
          {
            heading: 'Writing and Appending to Files',
            content:
              'Writing files is just as straightforward as reading them, but you need to understand the difference between the file modes or you risk accidentally destroying data. Write mode (`"w"`) creates a new file or completely overwrites an existing one -- everything previously in the file is gone the instant you open it. Append mode (`"a"`) is gentler: it adds content to the end of the file, preserving everything already there. If the file does not exist, both modes create it. One gotcha that trips up beginners: `write()` does not add newlines for you. Unlike `print()`, which adds a newline by default, `write()` outputs exactly the string you give it and nothing more. If you want separate lines, you must include `\\n` explicitly. The `writelines()` method takes a list of strings and writes them sequentially -- again, no automatic newlines between them, so you must include `\\n` in each string yourself.',
            code: `# Write mode ("w") -- creates or overwrites
with open("output.txt", "w") as f:
    f.write("Line 1: Hello\\n")
    f.write("Line 2: World\\n")

# Append mode ("a") -- adds to the end
with open("output.txt", "a") as f:
    f.write("Line 3: Appended!\\n")

# Verify by reading back
with open("output.txt", "r") as f:
    print(f.read())

# Write multiple lines at once with writelines()
colors = ["red\\n", "green\\n", "blue\\n"]
with open("colors.txt", "w") as f:
    f.writelines(colors)

with open("colors.txt", "r") as f:
    print(f.read())`,
            output: `Line 1: Hello
Line 2: World
Line 3: Appended!

red
green
blue
`,
            warning: 'Opening a file with `"w"` mode truncates it immediately -- even before you write anything. If your script crashes between opening and writing, you have lost the original file contents and written nothing. For critical data, consider writing to a temporary file first, then renaming it to the target path. This "atomic write" pattern is how production systems avoid data loss.',
            note: 'There is also `"x"` mode (exclusive creation), which creates a new file but raises `FileExistsError` if the file already exists. This is useful when you want to guarantee you are not overwriting something important.',
          },
          {
            heading: 'Iterating Line by Line and Practical Patterns',
            content:
              'Let\'s talk about the most professional way to process text files. Instead of loading everything into memory with `read()` or `readlines()`, iterate directly over the file object with a simple `for line in f:` loop. Python reads one line at a time behind the scenes, so even multi-gigabyte log files can be processed without exhausting your machine\'s memory. This pattern is the backbone of real-world text processing -- log parsing, data cleaning, CSV preprocessing, search-and-filter scripts. Combine it with string methods like `strip()` (remove whitespace), `split()` (break into parts), `startswith()` (check prefixes), and `lower()` (case-insensitive matching), and you can build powerful text processing pipelines in just a few lines. The example below demonstrates a common real-world task: scanning a log file and extracting only the error lines. This is the kind of script you will write dozens of times in your career, so it is worth internalizing the pattern.',
            code: `# Write a sample log file
with open("app.log", "w") as f:
    f.write("INFO: Server started on port 8000\\n")
    f.write("DEBUG: Loading config from env\\n")
    f.write("ERROR: Database connection timeout\\n")
    f.write("INFO: Retrying connection...\\n")
    f.write("ERROR: Max retries exceeded\\n")

# Filter and count errors
error_count = 0
errors = []
with open("app.log", "r") as f:
    for line in f:                     # memory-efficient iteration
        line = line.strip()
        if line.startswith("ERROR"):
            error_count += 1
            errors.append(line)

print(f"Found {error_count} errors:")
for err in errors:
    print(f"  {err}")`,
            output: `Found 2 errors:
  ERROR: Database connection timeout
  ERROR: Max retries exceeded`,
            tip: 'When processing files with unknown encoding, always specify it explicitly: `open("file.txt", "r", encoding="utf-8")`. The default encoding varies by platform (UTF-8 on macOS/Linux, but often CP-1252 on Windows), which can cause subtle bugs when your code runs on a different OS than where you developed it.',
            note: 'In Python 3.11+, you can also use `pathlib.Path` for file operations: `Path("app.log").read_text(encoding="utf-8")`. The `pathlib` approach is more modern and handles path manipulation more elegantly, especially when you need to join paths, check if files exist, or work across operating systems.',
            codeHighlightLines: [13, 14, 15, 16, 17],
          },
        ],
      },

      /* ======== read-write-csv ======== */
      {
        id: 'read-write-csv',
        title: 'Read/Write CSV Files',
        difficulty: 'beginner',
        quiz: [
          {
            question: 'Why should you use the csv module instead of splitting lines with line.split(",")?',
            options: [
              'The csv module is faster because it is written in C',
              'line.split(",") cannot handle quoted fields that contain commas, newlines, or quote characters',
              'The csv module automatically converts numeric strings to integers',
              'line.split(",") only works with ASCII characters, not Unicode',
            ],
            correctIndex: 1,
            explanation:
              'CSV parsing has many edge cases: fields containing commas (e.g., "Smith, Jr."), embedded newlines, and escaped quotes. The csv module handles all of these correctly, while naive string splitting breaks on any of them.',
          },
          {
            question: 'What is the key advantage of csv.DictReader over csv.reader?',
            options: [
              'DictReader is significantly faster for large files',
              'DictReader automatically infers data types from values',
              'DictReader maps each row to a dictionary using header names as keys, making code more readable',
              'DictReader can read CSV files without headers, but reader cannot',
            ],
            correctIndex: 2,
            explanation:
              'With csv.reader you access fields by index (row[0], row[2]), which is cryptic. DictReader uses the header row as keys, so you write row["name"] and row["grade"] -- the code becomes self-documenting and much easier to maintain.',
          },
          {
            question: 'Why should you pass newline="" when opening a CSV file?',
            options: [
              'It tells Python to use Unix-style line endings for cross-platform compatibility',
              'It prevents the csv module from mishandling line endings, which can cause extra blank rows on Windows',
              'It is required -- open() raises an error without it when using the csv module',
              'It makes the file smaller by removing unnecessary newline characters',
            ],
            correctIndex: 1,
            explanation:
              'Without newline="", Python\'s universal newline handling can interfere with the csv module\'s own newline processing, particularly on Windows. The result is mysterious extra blank rows between your data. Passing newline="" lets the csv module handle line endings correctly.',
          },
          {
            question: 'What does the delimiter parameter in csv.reader control?',
            options: [
              'The character used to end each row',
              'The character used to separate fields within a row',
              'The character used to quote field values',
              'The character used for comments in the CSV file',
            ],
            correctIndex: 1,
            explanation:
              'The delimiter parameter specifies which character separates fields. The default is a comma, but you can set it to "\\t" for tab-separated files, ";" for semicolon-separated files (common in European CSV), or "|" for pipe-delimited files.',
          },
        ],
        challenge: {
          prompt:
            'Write a program that reads a CSV file of products, filters for products above a price threshold, and writes the expensive products to a new CSV file using DictWriter. Include a computed "tax" column (8% of the price).',
          starterCode: `import csv

# Step 1: Create a sample products CSV
products = [
    {"name": "Widget", "category": "Tools", "price": "9.99"},
    {"name": "Gadget", "category": "Electronics", "price": "49.99"},
    {"name": "Thingamajig", "category": "Tools", "price": "24.50"},
    {"name": "Doohickey", "category": "Electronics", "price": "149.99"},
    {"name": "Whatchamacallit", "category": "Toys", "price": "5.99"},
]

with open("products.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "category", "price"])
    writer.writeheader()
    writer.writerows(products)

# Step 2: Read products, filter by price > 20, add tax column
# TODO: Read products.csv with DictReader
# TODO: For each row where float(price) > 20, compute tax = price * 0.08
# TODO: Collect expensive products as dicts with keys: name, category, price, tax

expensive = []
# YOUR CODE HERE

# Step 3: Write expensive products to expensive_products.csv
# TODO: Use DictWriter with fieldnames ["name", "category", "price", "tax"]
# TODO: Write the header and all rows

# Step 4: Verify
with open("expensive_products.csv", "r", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"{row['name']:>20} | \${row['price']:>7} | tax: \${row['tax']}")`,
          solutionCode: `import csv

# Step 1: Create a sample products CSV
products = [
    {"name": "Widget", "category": "Tools", "price": "9.99"},
    {"name": "Gadget", "category": "Electronics", "price": "49.99"},
    {"name": "Thingamajig", "category": "Tools", "price": "24.50"},
    {"name": "Doohickey", "category": "Electronics", "price": "149.99"},
    {"name": "Whatchamacallit", "category": "Toys", "price": "5.99"},
]

with open("products.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "category", "price"])
    writer.writeheader()
    writer.writerows(products)

# Step 2: Read products, filter by price > 20, add tax column
expensive = []
with open("products.csv", "r", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        price = float(row["price"])
        if price > 20:
            tax = round(price * 0.08, 2)
            expensive.append({
                "name": row["name"],
                "category": row["category"],
                "price": row["price"],
                "tax": f"{tax:.2f}",
            })

# Step 3: Write expensive products to expensive_products.csv
with open("expensive_products.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "category", "price", "tax"])
    writer.writeheader()
    writer.writerows(expensive)

# Step 4: Verify
with open("expensive_products.csv", "r", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"{row['name']:>20} | \${row['price']:>7} | tax: \${row['tax']}")`,
          hints: [
            'Remember that all values from csv.DictReader are strings -- use float(row["price"]) to compare numerically.',
            'When computing tax, use round(price * 0.08, 2) to avoid floating-point precision issues, and format with f"{tax:.2f}" for the output.',
            'The output DictWriter needs fieldnames=["name", "category", "price", "tax"] -- the "tax" column is new and computed.',
          ],
        },
        sections: [
          {
            heading: 'Reading CSV Files with csv.reader',
            content:
              'CSV (Comma-Separated Values) files are one of the most common data exchange formats you will encounter. They look deceptively simple -- just values separated by commas, right? But the real world is messy: what if a field itself contains a comma? Or a newline? Or a quote character? This is why you should use Python\'s built-in `csv` module rather than splitting lines on commas yourself. The `csv` module correctly handles all these edge cases -- quoted fields, escaped delimiters, different dialects, newlines embedded inside field values. `csv.reader` wraps a file object and yields each row as a list of strings. The first row is typically the header, which you can grab with `next(reader)`. One thing to note: every value comes back as a string, even if it looks like a number. If you need integers or floats, you will need to convert them explicitly with `int()` or `float()`.',
            code: `import csv

# Create a sample CSV file
with open("students.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["name", "age", "grade"])
    writer.writerow(["Alice", "20", "A"])
    writer.writerow(["Bob", "22", "B+"])
    writer.writerow(["Charlie", "21", "A-"])

# Read it back with csv.reader
with open("students.csv", "r", newline="") as f:
    reader = csv.reader(f)
    header = next(reader)       # first row is the header
    print(f"Columns: {header}")
    print()
    for row in reader:
        print(f"  {row[0]} is {row[1]} years old, grade: {row[2]}")`,
            output: `Columns: ['name', 'age', 'grade']

  Alice is 20 years old, grade: A
  Bob is 22 years old, grade: B+
  Charlie is 21 years old, grade: A-`,
            tip: 'Always pass `newline=""` when opening CSV files. Without it, the csv module may mishandle line endings on Windows, resulting in mysterious extra blank rows between your data -- a classic CSV gotcha that has wasted hours of developer time.',
            warning: 'Never try to parse CSV by hand with `line.split(",")`. It breaks on quoted fields like `"Smith, Jr."` (which is one field, not two) and on escaped quotes. The `csv` module exists precisely because CSV parsing has more edge cases than people expect.',
          },
          {
            heading: 'DictReader and DictWriter',
            content:
              'Let\'s make CSV handling even more pleasant. `csv.DictReader` automatically maps each row to a dictionary using the header names as keys. Instead of writing cryptic code like `row[0]` and `row[2]`, you write `row["name"]` and `row["grade"]` -- your code becomes self-documenting. Three months from now, when you revisit this script, you will immediately understand what each field means. `csv.DictWriter` does the reverse: it takes a list of dictionaries and writes them as CSV rows. One important step: you must call `writeheader()` to output the column names as the first row, and you need to specify `fieldnames` upfront so the writer knows the column order (dictionaries in Python 3.7+ maintain insertion order, but the writer still needs to know which keys to expect and in what order). In professional Python code, `DictReader` and `DictWriter` are almost always preferred over plain `reader` and `writer` because the named access makes the code so much more readable and maintainable.',
            code: `import csv

# Write CSV with DictWriter
employees = [
    {"name": "Alice", "department": "Engineering", "salary": "95000"},
    {"name": "Bob", "department": "Marketing", "salary": "78000"},
    {"name": "Charlie", "department": "Engineering", "salary": "102000"},
]

with open("employees.csv", "w", newline="") as f:
    fieldnames = ["name", "department", "salary"]
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(employees)

# Read it back with DictReader
print("Engineering team:")
with open("employees.csv", "r", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row["department"] == "Engineering":
            print(f"  {row['name']}: \${row['salary']}")`,
            output: `Engineering team:
  Alice: $95000
  Charlie: $102000`,
            tip: 'When your CSV has inconsistent column names (extra spaces, different capitalization), you can pass a custom `fieldnames` list to `DictReader` to override the header row, or preprocess the header. This is especially useful when dealing with CSV exports from spreadsheet software that adds trailing spaces to column names.',
            note: 'The `DictReader`/`DictWriter` pattern maps beautifully to how data flows in web applications. A REST API returns JSON objects (dictionaries), you process them, and write them to CSV for a report. Or you read a CSV upload, turn each row into a dictionary, and insert it into a database. This dictionary-centric workflow is the natural way Python handles structured data.',
            analogy: 'Think of it like the difference between a numbered locker system and a labeled filing cabinet. With `csv.reader`, you access data by position -- "open locker 0, locker 2" -- and you have to remember what is in each slot. With `DictReader`, every drawer is labeled -- "open the name drawer, the grade drawer" -- and the code explains itself.',
          },
          {
            heading: 'Handling Delimiters and Quoting',
            content:
              'Here is a reality check: not all "CSV" files actually use commas. In European countries, where the comma is used as a decimal separator (like `3,14` for pi), CSV files often use semicolons instead. Tab-separated files (TSV) are popular in bioinformatics and data science. Pipe-delimited files show up in legacy enterprise systems. The `csv` module handles all of these through the `delimiter` parameter -- just tell it what character separates the fields. The `quoting` parameter gives you control over how fields are wrapped in quotes: `csv.QUOTE_MINIMAL` (the default) only quotes fields that contain the delimiter or other special characters, while `csv.QUOTE_ALL` wraps every single field in quotes. Understanding these options means you can confidently handle any CSV-like file that lands on your desk, no matter how unconventional its format.',
            code: `import csv

# Write a tab-separated file
with open("data.tsv", "w", newline="") as f:
    writer = csv.writer(f, delimiter="\\t")
    writer.writerow(["product", "price", "description"])
    writer.writerow(["Widget", "9.99", "A small, useful widget"])
    writer.writerow(["Gadget", "24.50", "Includes comma, in description"])

# Read it back
with open("data.tsv", "r", newline="") as f:
    reader = csv.reader(f, delimiter="\\t")
    for row in reader:
        print(f"{row[0]:>10} | {row[1]:>6} | {row[2]}")

print()

# Demonstrate QUOTE_ALL
import io
output = io.StringIO()
writer = csv.writer(output, quoting=csv.QUOTE_ALL)
writer.writerow(["Alice", 30, "New York"])
print(f"QUOTE_ALL: {output.getvalue().strip()}")`,
            output: `   product |  price | description
    Widget |   9.99 | A small, useful widget
    Gadget |  24.50 | Includes comma, in description

QUOTE_ALL: "Alice","30","New York"`,
            tip: 'If you are working with large CSV files (millions of rows) or need DataFrames for analysis, graduate to `pandas.read_csv()`. It is dramatically faster (written in C under the hood), handles type inference automatically, and gives you powerful data manipulation tools. The `csv` module is perfect for straightforward read/write tasks; pandas is for when you need to analyze and transform the data.',
            note: 'You can also define reusable CSV formats by registering a dialect with `csv.register_dialect()`. If you frequently work with a non-standard format (say, pipe-delimited with no quoting), register it once and then just pass `dialect="my_format"` instead of repeating `delimiter` and `quoting` parameters everywhere.',
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Advanced Topics                                              */
  /* ------------------------------------------------------------ */
  {
    id: 'advanced-topics',
    label: 'Advanced Topics',
    icon: 'Sparkles',
    entries: [
      /* ======== exception-handling ======== */
      {
        id: 'exception-handling',
        title: 'Exception Handling',
        difficulty: 'intermediate',
        quiz: [
          {
            question: 'In a try/except/else/finally block, when does the `else` block execute?',
            options: [
              'Always, regardless of whether an exception occurred',
              'Only when an exception is raised and caught by except',
              'Only when no exception occurs in the try block',
              'Only when the finally block finishes without error',
            ],
            correctIndex: 2,
            explanation:
              'The else block runs only if the try block completed without raising any exception. It is the right place for code that should run only on success, keeping it separate from the "risky" code in the try block.',
          },
          {
            question: 'What is the purpose of `raise ValueError("msg") from original_error`?',
            options: [
              'It catches ValueError and original_error at the same time',
              'It explicitly chains the new exception to the original, preserving the full error context in tracebacks',
              'It converts the original error into a ValueError',
              'It suppresses the original error so only ValueError is visible',
            ],
            correctIndex: 1,
            explanation:
              'Exception chaining with `from` sets the __cause__ attribute on the new exception, linking them. Python\'s traceback shows "The above exception was the direct cause of the following exception:" -- invaluable for debugging cascading failures.',
          },
          {
            question: 'Why is it bad practice to use a bare `except:` clause (without specifying an exception type)?',
            options: [
              'It is a syntax error in Python 3',
              'It catches every exception including KeyboardInterrupt and SystemExit, hiding real bugs',
              'It only catches built-in exceptions, not custom ones',
              'It prevents the finally block from running',
            ],
            correctIndex: 1,
            explanation:
              'A bare except catches everything, including KeyboardInterrupt (Ctrl+C) and SystemExit. This can silently swallow critical signals and hide genuine bugs. Always catch specific exception types so you only handle errors you expect and know how to recover from.',
          },
          {
            question: 'When should you create custom exception classes instead of using built-in ones?',
            options: [
              'Always -- built-in exceptions should never be used in application code',
              'Only when you need to add custom attributes like field names or error codes to the exception',
              'When you need precise, domain-specific error handling and want callers to catch your module\'s errors specifically',
              'Only when inheriting from BaseException rather than Exception',
            ],
            correctIndex: 2,
            explanation:
              'Custom exceptions let callers handle your module\'s errors specifically (catch ValidationError) or broadly (catch AppError). They make error handling self-documenting and allow structured error data beyond just a message string.',
          },
        ],
        challenge: {
          prompt:
            'Create a custom exception hierarchy for a user registration system. Define a base `RegistrationError`, with children `InvalidEmailError` and `WeakPasswordError`. Write a `register_user` function that validates email (must contain @) and password (min 8 chars, must contain a digit), raising the appropriate custom exception on failure.',
          starterCode: `# Step 1: Define custom exceptions
class RegistrationError(Exception):
    """Base exception for registration failures."""
    pass

# TODO: Define InvalidEmailError(RegistrationError) with an 'email' attribute

# TODO: Define WeakPasswordError(RegistrationError) with a 'reason' attribute

# Step 2: Write the registration function
def register_user(email: str, password: str) -> dict:
    """Validate and register a user. Returns user dict on success."""
    # TODO: Check that email contains "@" -- raise InvalidEmailError if not
    # TODO: Check password is at least 8 characters -- raise WeakPasswordError if not
    # TODO: Check password contains at least one digit -- raise WeakPasswordError if not
    # Return the user dict on success
    return {"email": email, "status": "registered"}

# Step 3: Test with various inputs
test_cases = [
    ("alice@example.com", "securePass1"),
    ("bad-email", "securePass1"),
    ("bob@example.com", "short"),
    ("charlie@example.com", "nodigitshere"),
]

for email, password in test_cases:
    try:
        user = register_user(email, password)
        print(f"OK: {user}")
    except InvalidEmailError as e:
        print(f"Email error: {e} (email={e.email})")
    except WeakPasswordError as e:
        print(f"Password error: {e} (reason={e.reason})")`,
          solutionCode: `# Step 1: Define custom exceptions
class RegistrationError(Exception):
    """Base exception for registration failures."""
    pass

class InvalidEmailError(RegistrationError):
    def __init__(self, email: str):
        self.email = email
        super().__init__(f"Invalid email address: {email}")

class WeakPasswordError(RegistrationError):
    def __init__(self, reason: str):
        self.reason = reason
        super().__init__(f"Weak password: {reason}")

# Step 2: Write the registration function
def register_user(email: str, password: str) -> dict:
    """Validate and register a user. Returns user dict on success."""
    if "@" not in email:
        raise InvalidEmailError(email)
    if len(password) < 8:
        raise WeakPasswordError("must be at least 8 characters")
    if not any(c.isdigit() for c in password):
        raise WeakPasswordError("must contain at least one digit")
    return {"email": email, "status": "registered"}

# Step 3: Test with various inputs
test_cases = [
    ("alice@example.com", "securePass1"),
    ("bad-email", "securePass1"),
    ("bob@example.com", "short"),
    ("charlie@example.com", "nodigitshere"),
]

for email, password in test_cases:
    try:
        user = register_user(email, password)
        print(f"OK: {user}")
    except InvalidEmailError as e:
        print(f"Email error: {e} (email={e.email})")
    except WeakPasswordError as e:
        print(f"Password error: {e} (reason={e.reason})")`,
          hints: [
            'Each custom exception should call super().__init__(message) with a human-readable string so it displays nicely in tracebacks.',
            'Store the custom attributes (email, reason) on self before calling super().__init__() so they are accessible in the except block.',
            'Use `any(c.isdigit() for c in password)` to check if the password contains at least one digit.',
          ],
        },
        sections: [
          {
            heading: 'try / except / else / finally',
            content:
              'Every program encounters errors -- a file that does not exist, a network that times out, a user who types "abc" when you asked for a number. The question is: does your program crash ungracefully, or does it handle the situation with poise? Python\'s `try`/`except` blocks give you that control. The code in the `try` block runs normally. If an exception occurs, Python immediately jumps to the matching `except` block. But here is where most tutorials stop, and where real mastery begins: there are actually four parts to the full structure. The `else` block runs only if no exception occurred -- it is the right place for code that should execute only on success, keeping it separate from the "risky" code in `try`. The `finally` block always runs, regardless of whether an exception happened, making it ideal for cleanup tasks like closing database connections or releasing locks. Think of it as: `try` is the attempt, `except` is the recovery plan, `else` is the celebration, and `finally` is the cleanup crew that comes in no matter what happened at the party.',
            code: `def divide(a: float, b: float) -> float | None:
    try:
        result = a / b
    except ZeroDivisionError:
        print("  Error: cannot divide by zero!")
        return None
    except TypeError as e:
        print(f"  Error: invalid types -- {e}")
        return None
    else:
        print(f"  Success: {a} / {b} = {result}")
        return result
    finally:
        print("  (cleanup: this always runs)")

print("Test 1:")
divide(10, 3)

print("\\nTest 2:")
divide(10, 0)

print("\\nTest 3:")
divide("ten", 2)`,
            output: `Test 1:
  Success: 10 / 3 = 3.3333333333333335
  (cleanup: this always runs)

Test 2:
  Error: cannot divide by zero!
  (cleanup: this always runs)

Test 3:
  Error: invalid types -- unsupported operand type(s) for /: 'str' and 'int'
  (cleanup: this always runs)`,
            tip: 'Always catch specific exceptions rather than using bare `except:` or broad `except Exception:`. Catching too broadly is one of the most dangerous habits in Python -- it can silently swallow `KeyboardInterrupt` (Ctrl+C), `SystemExit`, or hide genuine bugs that you need to know about. Be explicit about what you expect to go wrong.',
            warning: 'A subtle trap: if you put success-only code inside `try` instead of `else`, an exception in that code might accidentally match one of your `except` clauses, hiding a bug. Keep the `try` block as small as possible -- only the line(s) that might raise the exception you are handling.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    A["try block"] -->|"exception raised"| B["except block\\n(handle error)"]\n    A -->|"no exception"| C["else block\\n(success path)"]\n    B --> D["finally block\\n(always runs)"]\n    C --> D\n    D --> E["continue program"]\n    style A fill:#6366f1,color:#fff\n    style B fill:#ef4444,color:#fff\n    style C fill:#10b981,color:#fff\n    style D fill:#f59e0b,color:#fff\n    style E fill:#94a3b8,color:#fff',
              caption: 'The four parts of exception handling: try (attempt), except (recover), else (celebrate), finally (clean up).',
            },
            analogy: 'Think of it like a trapeze act at a circus: the `try` block is the performer attempting the stunt, `except` is the safety net that catches them if they fall, `else` is the crowd cheering when the stunt succeeds, and `finally` is the stage crew that cleans up the equipment regardless of what happened during the act.',
            codeHighlightLines: [2, 4, 7, 10, 13],
          },
          {
            heading: 'Raising Exceptions',
            content:
              'So far we have talked about catching exceptions that Python raises. But what about your own code? When your function receives invalid input or encounters a situation it cannot handle, you should signal this loudly and clearly by raising an exception. This is not an error in your code -- it is your code doing its job by refusing to proceed with bad data. Use the `raise` statement with an appropriate exception type and a descriptive message. Think of it like a security guard at a building entrance: if someone shows an invalid ID, the guard does not let them in and pretend everything is fine. They stop the person and explain why. `ValueError` is the right choice for valid types but invalid values (like a negative age). `TypeError` is for wrong types entirely. The caller can then decide how to respond -- retry, show an error message, log it, or let it propagate further up the call stack. If you catch an exception but realize you cannot actually handle it, use bare `raise` (with no arguments) to re-raise the original exception with its full traceback intact.',
            code: `def set_age(age: int) -> str:
    if not isinstance(age, int):
        raise TypeError(f"age must be an int, got {type(age).__name__}")
    if age < 0 or age > 150:
        raise ValueError(f"age must be 0-150, got {age}")
    return f"Age set to {age}"

# Valid input
print(set_age(25))

# Invalid values
for bad_input in [-5, 200, "thirty"]:
    try:
        print(set_age(bad_input))
    except (ValueError, TypeError) as e:
        print(f"Rejected {bad_input!r}: {e}")

# Re-raising an exception
print("\\nRe-raise demo:")
try:
    try:
        int("abc")
    except ValueError:
        print("  Caught ValueError, re-raising...")
        raise       # re-raise with original traceback
except ValueError as e:
    print(f"  Outer handler caught: {e}")`,
            output: `Age set to 25
Rejected -5: age must be 0-150, got -5
Rejected 200: age must be 0-150, got 200
Rejected 'thirty': age must be an int, got str

Re-raise demo:
  Caught ValueError, re-raising...
  Outer handler caught: invalid literal for int() with base 10: 'abc'`,
            note: 'Choosing between `ValueError` and `TypeError` is not just pedantic -- it communicates intent to callers. A `TypeError` tells them they passed the wrong kind of data (a string where an int was expected). A `ValueError` tells them the type is correct but the specific value is out of range. This distinction helps callers write more targeted `except` clauses and produce better error messages for their users.',
            warning: 'Never use exceptions for normal control flow. If you expect a dictionary key to be missing half the time, use `dict.get(key, default)` instead of wrapping every access in try/except `KeyError`. Exceptions are for exceptional situations -- things that should not normally happen. Using them as a substitute for `if` statements makes your code slower and harder to reason about.',
            codeHighlightLines: [2, 3, 4, 5, 25],
          },
          {
            heading: 'Custom Exceptions',
            content:
              'As your programs grow beyond simple scripts, the built-in exceptions start to feel too generic. When a `ValueError` is raised in a web application, is it a validation error from user input? A configuration error? A data integrity problem? You cannot tell without reading the message. Custom exceptions solve this beautifully. Define your own exception classes by inheriting from `Exception`, and suddenly your error handling becomes precise and self-documenting. The best practice is to create a base exception for your module or application (like `AppError`), then derive specific exceptions from it (like `ValidationError`, `NotFoundError`, `AuthenticationError`). This gives callers two options: catch `AppError` to handle all of your module\'s errors at once, or catch a specific subclass for targeted handling. You can also add custom attributes to your exceptions (like `field` and `message` on `ValidationError`) to carry structured error data instead of just a string.',
            code: `# Define a hierarchy of custom exceptions
class AppError(Exception):
    """Base exception for our application."""
    pass

class ValidationError(AppError):
    """Raised when input validation fails."""
    def __init__(self, field: str, message: str):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")

class NotFoundError(AppError):
    """Raised when a resource is not found."""
    def __init__(self, resource: str, identifier: str):
        self.resource = resource
        self.identifier = identifier
        super().__init__(f"{resource} '{identifier}' not found")

# Using custom exceptions
def get_user(user_id: str) -> dict:
    if not user_id.isdigit():
        raise ValidationError("user_id", "must be numeric")
    users = {"1": "Alice", "2": "Bob"}
    if user_id not in users:
        raise NotFoundError("User", user_id)
    return {"id": user_id, "name": users[user_id]}

test_ids = ["1", "abc", "99"]
for uid in test_ids:
    try:
        user = get_user(uid)
        print(f"Found: {user}")
    except ValidationError as e:
        print(f"Validation failed -- {e.field}: {e.message}")
    except NotFoundError as e:
        print(f"Not found -- {e.resource} with id '{e.identifier}'")`,
            output: `Found: {'id': '1', 'name': 'Alice'}
Validation failed -- user_id: must be numeric
Not found -- User with id '99'`,
            tip: 'Name your custom exceptions with an `Error` suffix (`ValidationError`, not `ValidationException`). This follows the Python standard library convention and reads naturally in `except` clauses. Also, always call `super().__init__()` with a human-readable message so the exception still makes sense when printed in a traceback.',
            note: 'This exception hierarchy pattern is used extensively in professional Python projects. FastAPI defines `HTTPException`, Django has `ObjectDoesNotExist`, and the `requests` library has `ConnectionError`, `Timeout`, and `HTTPError` -- all inheriting from a common base. When you design your own library or application, a well-thought-out exception hierarchy is a sign of mature engineering.',
            diagram: {
              kind: 'mermaid',
              code: 'classDiagram\n    class Exception {\n    }\n    class AppError {\n        +str message\n    }\n    class ValidationError {\n        +str field\n        +str message\n    }\n    class NotFoundError {\n        +str resource\n        +str identifier\n    }\n    Exception <|-- AppError\n    AppError <|-- ValidationError\n    AppError <|-- NotFoundError\n    note for AppError "Catch AppError to handle\\nall app-specific errors at once"',
              caption: 'Custom exception hierarchy: AppError is the base for all domain-specific errors, with ValidationError and NotFoundError as specialized children.',
            },
            analogy: 'Think of it like a hospital triage system: instead of just saying "patient is sick" (generic Exception), you classify the problem -- "broken bone" (ValidationError), "allergic reaction" (NotFoundError). Each classification triggers a different treatment protocol (except handler), and catching the general category "emergency" (AppError) handles them all.',
          },
          {
            heading: 'Exception Chaining with "from"',
            content:
              'When something goes wrong in a real application, errors often cascade: a file-not-found error causes a config-loading failure, which causes a startup failure. Without context, the person debugging only sees the outermost error and has no idea what the root cause was. Python solves this with exception chaining. When you catch one exception and raise a different one, use `raise NewError(...) from original_error` to explicitly link them. This sets the `__cause__` attribute on the new exception, and when Python displays the traceback, it shows the full chain: "The above exception was the direct cause of the following exception." This is invaluable for debugging because it preserves the complete story of what went wrong. In the example below, a `FileNotFoundError` is the root cause, but we wrap it in a domain-specific `ConfigError` so callers can handle it at the right level of abstraction. On the flip side, sometimes the original exception is just noise -- an implementation detail that would confuse the caller. In that case, use `from None` to suppress the chain entirely and present only the clean, user-friendly error.',
            code: `class ConfigError(Exception):
    pass

def load_config(path: str) -> dict:
    """Simulate loading a config that fails."""
    try:
        # Simulate a missing file
        with open(path) as f:
            return {}
    except FileNotFoundError as e:
        # Chain: wrap low-level error in a domain-specific one
        raise ConfigError(f"Cannot load config from '{path}'") from e

# Demonstrate chaining
try:
    config = load_config("missing_config.toml")
except ConfigError as e:
    print(f"ConfigError: {e}")
    print(f"Original cause: {e.__cause__}")

print()

# Demonstrate suppression with 'from None'
def parse_port(value: str) -> int:
    try:
        port = int(value)
    except ValueError:
        raise ValueError(f"Invalid port: '{value}' is not a number") from None

try:
    parse_port("abc")
except ValueError as e:
    print(f"ValueError: {e}")
    print(f"Cause suppressed: {e.__cause__}")`,
            output: `ConfigError: Cannot load config from 'missing_config.toml'
Original cause: [Errno 2] No such file or directory: 'missing_config.toml'

ValueError: Invalid port: 'abc' is not a number
Cause suppressed: None`,
            tip: 'Use `raise NewError(...) from original_error` when the original exception provides useful debugging context (like wrapping a low-level I/O error in a domain-specific one). Use `from None` when the original is an implementation detail that would only add noise and confuse the person reading the traceback.',
            warning: 'If you `raise` a new exception inside an `except` block without using `from`, Python still implicitly chains the exceptions (setting `__context__` instead of `__cause__`). The traceback will show "During handling of the above exception, another exception occurred:" -- which can be confusing because it implies a bug in your error handling rather than intentional wrapping. Always be explicit: use `from original` or `from None`.',
            codeHighlightLines: [12, 28],
          },
        ],
      },
    ],
  },
];
