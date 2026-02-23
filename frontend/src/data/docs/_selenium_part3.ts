import type { DocCategory } from './types';

export const SELENIUM_PART3_CATEGORIES: DocCategory[] = [
  /* ================================================================== */
  /*  Category 7: Page Object Model                                     */
  /* ================================================================== */
  {
    id: 'page-object-model',
    label: 'Page Object Model',
    icon: 'Layout',
    entries: [
      /* ------------------------------------------------------------ */
      /*  POM Introduction                                            */
      /* ------------------------------------------------------------ */
      {
        id: 'pom-introduction',
        title: 'POM Introduction',
        difficulty: 'intermediate',
        tags: ['pom', 'design-pattern', 'architecture'],
        sections: [
          {
            heading: 'What Is the Page Object Model?',
            content:
              'The Page Object Model (POM) is a design pattern that creates an object-oriented abstraction of web pages in your test automation code. Each web page or significant component is represented by a class, and the elements and interactions on that page are encapsulated as methods and properties. This separation of concerns means your test scripts never directly interact with raw Selenium locators -- they call descriptive methods on page objects instead.',
            code: `# Without POM -- brittle, duplicated locators
driver.find_element(By.ID, "username").send_keys("admin")
driver.find_element(By.ID, "password").send_keys("secret")
driver.find_element(By.CSS_SELECTOR, "button.login-btn").click()

# With POM -- clean, maintainable
login_page = LoginPage(driver)
login_page.enter_username("admin")
login_page.enter_password("secret")
login_page.click_login()`,
            output: `# Both approaches produce the same browser behavior,
# but the POM version is far easier to maintain.`,
            analogy:
              'Think of POM like a TV remote control. You press "Volume Up" without knowing the internal circuitry. If the manufacturer changes the electronics, the button still works the same way. Similarly, if a developer changes an element ID, you only update the page class, not every test.',
          },
          {
            heading: 'Why Use POM?',
            content:
              'POM delivers three key benefits: reduced code duplication (locators live in one place), improved readability (tests read like user stories), and easier maintenance (UI changes require updates in a single class rather than across dozens of test files). In large test suites with hundreds of tests, POM can cut maintenance effort by an order of magnitude.',
            code: `# Example: If the login button selector changes from
# "button.login-btn" to "button#submit-login",
# you update ONE line in LoginPage, not 50 test files.

class LoginPage:
    LOGIN_BUTTON = (By.CSS_SELECTOR, "button#submit-login")  # single source of truth

    def click_login(self):
        self.driver.find_element(*self.LOGIN_BUTTON).click()`,
            tip: 'A good rule of thumb: if you find yourself copying the same locator into more than one test file, it belongs in a page object.',
          },
          {
            heading: 'POM Project Structure',
            content:
              'A typical POM project organizes code into three layers: page objects (one class per page), test cases (organized by feature), and utilities (driver setup, config, helpers). This structure makes it easy for new team members to find and modify code.',
            code: `# Recommended project structure
# project/
# +-- pages/
# |   +-- __init__.py
# |   +-- base_page.py
# |   +-- login_page.py
# |   +-- dashboard_page.py
# +-- tests/
# |   +-- __init__.py
# |   +-- test_login.py
# |   +-- test_dashboard.py
# +-- utils/
# |   +-- __init__.py
# |   +-- driver_factory.py
# |   +-- config.py
# +-- conftest.py
# +-- pytest.ini`,
            note: 'Keep page objects and tests in separate directories. This enforces the boundary between "how to interact with the UI" and "what to verify".',
          },
          {
            heading: 'POM vs Traditional Scripts',
            content:
              'Traditional linear scripts mix locators, actions, and assertions into a single file. They are quick to write but become a maintenance nightmare. POM invests a little more setup time but pays dividends as the suite grows. The table below summarizes the trade-offs.',
            code: `# Traditional linear script
def test_login_traditional():
    driver = webdriver.Chrome()
    driver.get("https://example.com/login")
    driver.find_element(By.ID, "username").send_keys("admin")
    driver.find_element(By.ID, "password").send_keys("secret")
    driver.find_element(By.CSS_SELECTOR, "button.login-btn").click()
    assert "Dashboard" in driver.title
    driver.quit()

# POM-based test
def test_login_pom(browser):
    login = LoginPage(browser)
    login.open()
    login.enter_username("admin")
    login.enter_password("secret")
    dashboard = login.click_login()
    assert dashboard.is_loaded()`,
            tip: 'Notice how the POM test reads almost like plain English. This makes it accessible even to non-technical stakeholders reviewing test coverage.',
          },
        ],
        quiz: [
          {
            question: 'What is the primary purpose of the Page Object Model?',
            options: [
              'To speed up test execution',
              'To separate page interaction logic from test logic',
              'To replace Selenium WebDriver',
              'To generate HTML test reports',
            ],
            correctIndex: 1,
            explanation:
              'POM separates the page interaction layer (locators, actions) from the test layer (assertions, flow). This separation makes tests more maintainable and readable.',
          },
          {
            question: 'If a button\'s CSS selector changes on the login page, how many files need updating in a POM architecture?',
            options: [
              'Every test file that clicks the button',
              'Only the LoginPage class',
              'The conftest.py file',
              'All page object classes',
            ],
            correctIndex: 1,
            explanation:
              'In POM, locators are defined once in the page class. A selector change only requires an update in that single class, regardless of how many tests use it.',
          },
          {
            question: 'Which layer in POM typically contains WebDriver locators?',
            options: [
              'Test cases',
              'Utility helpers',
              'Page object classes',
              'Configuration files',
            ],
            correctIndex: 2,
            explanation:
              'Page object classes encapsulate all locators and page-specific interactions. Tests should not contain raw locator definitions.',
          },
        ],
        challenge: {
          prompt:
            'Create a simple page object class called SearchPage for a search engine. It should have: a constructor accepting a driver, a locator for the search input (By.NAME, "q"), a locator for the search button (By.NAME, "btnK"), a method search_for(query) that types the query and clicks search, and a method get_title() that returns the page title.',
          starterCode: `from selenium.webdriver.common.by import By

class SearchPage:
    # Define locators as class-level tuples

    def __init__(self, driver):
        # Store the driver
        pass

    def search_for(self, query):
        # Type query and click search
        pass

    def get_title(self):
        # Return current page title
        pass`,
          solutionCode: `from selenium.webdriver.common.by import By

class SearchPage:
    SEARCH_INPUT = (By.NAME, "q")
    SEARCH_BUTTON = (By.NAME, "btnK")

    def __init__(self, driver):
        self.driver = driver

    def search_for(self, query):
        self.driver.find_element(*self.SEARCH_INPUT).clear()
        self.driver.find_element(*self.SEARCH_INPUT).send_keys(query)
        self.driver.find_element(*self.SEARCH_BUTTON).click()

    def get_title(self):
        return self.driver.title`,
          hints: [
            'Store locators as class-level tuples like SEARCH_INPUT = (By.NAME, "q").',
            'Use the * operator to unpack tuples into find_element arguments.',
            'Remember to clear the input field before typing to avoid appending text.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  Creating Page Classes                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'creating-page-classes',
        title: 'Creating Page Classes',
        difficulty: 'intermediate',
        tags: ['pom', 'base-page', 'locators', 'encapsulation'],
        sections: [
          {
            heading: 'The BasePage Class',
            content:
              'Every POM project should start with a BasePage class that holds the shared WebDriver instance and common helper methods such as clicking, typing, waiting, and navigation. All page-specific classes inherit from BasePage, avoiding code duplication across page objects.',
            code: `from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BasePage:
    """Base class for all page objects."""

    def __init__(self, driver, base_url="https://example.com"):
        self.driver = driver
        self.base_url = base_url
        self.wait = WebDriverWait(driver, 10)

    def open(self, path=""):
        self.driver.get(f"{self.base_url}/{path}")
        return self

    def find(self, locator):
        return self.wait.until(EC.presence_of_element_located(locator))

    def click(self, locator):
        self.wait.until(EC.element_to_be_clickable(locator)).click()

    def type_text(self, locator, text):
        element = self.find(locator)
        element.clear()
        element.send_keys(text)

    def get_text(self, locator):
        return self.find(locator).text

    def is_visible(self, locator, timeout=5):
        try:
            WebDriverWait(self.driver, timeout).until(
                EC.visibility_of_element_located(locator)
            )
            return True
        except:
            return False`,
            tip: 'The BasePage wraps raw Selenium calls with built-in waits, so child classes never need to worry about timing issues.',
            analogy:
              'BasePage is like a universal tool belt. Every craftsperson (page class) wears it and gets access to a hammer, screwdriver, and tape measure without buying their own.',
          },
          {
            heading: 'Defining Locators',
            content:
              'Locators should be defined as class-level constants using tuples of (By strategy, value). This convention keeps all selectors in one visible block at the top of the class, making audits and updates straightforward.',
            code: `from selenium.webdriver.common.by import By

class LoginPage(BasePage):
    # --- Locators ---
    USERNAME_INPUT = (By.ID, "username")
    PASSWORD_INPUT = (By.ID, "password")
    LOGIN_BUTTON   = (By.CSS_SELECTOR, "button[type='submit']")
    ERROR_MESSAGE  = (By.CLASS_NAME, "error-msg")
    REMEMBER_ME    = (By.ID, "remember-checkbox")

    def __init__(self, driver):
        super().__init__(driver)
        self.open("login")`,
            note: 'Prefix locators with the element type or purpose (e.g., USERNAME_INPUT, LOGIN_BUTTON) so their role is immediately clear.',
          },
          {
            heading: 'Action Methods',
            content:
              'Each user interaction on the page becomes a method. Methods should be named from the user perspective (enter_username, click_login) rather than the implementation perspective (send_keys_to_field). Methods that navigate to a new page should return the corresponding page object.',
            code: `class LoginPage(BasePage):
    USERNAME_INPUT = (By.ID, "username")
    PASSWORD_INPUT = (By.ID, "password")
    LOGIN_BUTTON   = (By.CSS_SELECTOR, "button[type='submit']")
    ERROR_MESSAGE  = (By.CLASS_NAME, "error-msg")

    def __init__(self, driver):
        super().__init__(driver)
        self.open("login")

    def enter_username(self, username):
        self.type_text(self.USERNAME_INPUT, username)
        return self  # fluent interface

    def enter_password(self, password):
        self.type_text(self.PASSWORD_INPUT, password)
        return self

    def click_login(self):
        self.click(self.LOGIN_BUTTON)
        return DashboardPage(self.driver)  # returns next page

    def get_error_message(self):
        return self.get_text(self.ERROR_MESSAGE)

    def login_as(self, username, password):
        """Convenience method combining multiple steps."""
        self.enter_username(username)
        self.enter_password(password)
        return self.click_login()`,
            tip: 'Returning self from setter-like methods enables method chaining: login_page.enter_username("admin").enter_password("secret").click_login().',
          },
          {
            heading: 'Using Page Objects in Tests',
            content:
              'With page classes defined, tests become concise and expressive. Each test instantiates the relevant page object and calls its methods. Assertions remain in the test layer -- page objects should never contain assert statements.',
            code: `import pytest
from pages.login_page import LoginPage
from pages.dashboard_page import DashboardPage

class TestLogin:
    def test_successful_login(self, browser):
        login_page = LoginPage(browser)
        dashboard = login_page.login_as("admin", "secret123")
        assert dashboard.get_welcome_message() == "Welcome, admin!"

    def test_invalid_password(self, browser):
        login_page = LoginPage(browser)
        login_page.enter_username("admin")
        login_page.enter_password("wrong")
        login_page.click(login_page.LOGIN_BUTTON)
        assert login_page.get_error_message() == "Invalid credentials"

    def test_empty_fields(self, browser):
        login_page = LoginPage(browser)
        login_page.click(login_page.LOGIN_BUTTON)
        assert login_page.is_visible(login_page.ERROR_MESSAGE)`,
            warning: 'Never put assertions inside page objects. Page objects describe what a page can do; tests decide what is correct.',
          },
        ],
        quiz: [
          {
            question: 'What is the main purpose of a BasePage class in POM?',
            options: [
              'To define test assertions',
              'To hold shared driver logic and common helper methods',
              'To generate test reports',
              'To manage database connections',
            ],
            correctIndex: 1,
            explanation:
              'BasePage centralizes the WebDriver instance and reusable methods (click, type, wait) so every page class inherits them without duplication.',
          },
          {
            question: 'How should locators be defined in a page class?',
            options: [
              'As global variables in a separate file',
              'Inline within each test method',
              'As class-level constant tuples of (By, value)',
              'As environment variables',
            ],
            correctIndex: 2,
            explanation:
              'Class-level tuples like USERNAME = (By.ID, "user") keep locators visible, centralized, and easy to unpack with the * operator.',
          },
          {
            question: 'What should a page object method return when it navigates to a new page?',
            options: [
              'None',
              'A boolean indicating success',
              'The new page object instance',
              'The raw HTML of the new page',
            ],
            correctIndex: 2,
            explanation:
              'Returning the new page object (e.g., return DashboardPage(self.driver)) creates a fluent navigation chain and makes the page transition explicit in the test code.',
          },
          {
            question: 'Why should assertions NOT be placed inside page objects?',
            options: [
              'Assertions slow down execution',
              'It violates the separation between interaction logic and verification logic',
              'Selenium does not support assertions in classes',
              'Assertions only work in conftest.py',
            ],
            correctIndex: 1,
            explanation:
              'Page objects encapsulate interaction logic. Assertions belong in the test layer to keep responsibilities clearly separated and page objects reusable across different test scenarios.',
          },
        ],
        challenge: {
          prompt:
            'Create a BasePage class and a ProductPage class that inherits from it. BasePage should have __init__(driver), find(locator), click(locator), and get_text(locator) methods. ProductPage should have locators for product name (By.CSS_SELECTOR, "h1.product-title"), price (By.CLASS_NAME, "price"), and an add_to_cart button (By.ID, "add-cart"). Add methods: get_product_name(), get_price(), and add_to_cart().',
          starterCode: `from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BasePage:
    def __init__(self, driver):
        pass

    def find(self, locator):
        pass

    def click(self, locator):
        pass

    def get_text(self, locator):
        pass

class ProductPage(BasePage):
    # Define locators here

    def get_product_name(self):
        pass

    def get_price(self):
        pass

    def add_to_cart(self):
        pass`,
          solutionCode: `from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BasePage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)

    def find(self, locator):
        return self.wait.until(EC.presence_of_element_located(locator))

    def click(self, locator):
        self.wait.until(EC.element_to_be_clickable(locator)).click()

    def get_text(self, locator):
        return self.find(locator).text

class ProductPage(BasePage):
    PRODUCT_NAME = (By.CSS_SELECTOR, "h1.product-title")
    PRICE = (By.CLASS_NAME, "price")
    ADD_TO_CART_BTN = (By.ID, "add-cart")

    def get_product_name(self):
        return self.get_text(self.PRODUCT_NAME)

    def get_price(self):
        return self.get_text(self.PRICE)

    def add_to_cart(self):
        self.click(self.ADD_TO_CART_BTN)`,
          hints: [
            'BasePage.__init__ should store the driver and create a WebDriverWait instance.',
            'Use EC.presence_of_element_located in find() and EC.element_to_be_clickable in click().',
            'ProductPage methods simply delegate to inherited BasePage methods with the right locators.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  POM Best Practices                                          */
      /* ------------------------------------------------------------ */
      {
        id: 'pom-best-practices',
        title: 'POM Best Practices',
        difficulty: 'advanced',
        tags: ['pom', 'design-pattern', 'composition', 'fluent-interface'],
        sections: [
          {
            heading: 'Composition Over Inheritance',
            content:
              'While a single BasePage works well for small projects, large applications benefit from composition. Instead of deep inheritance hierarchies (BasePage -> AuthPage -> AdminPage), compose page objects from reusable component objects. A NavBar, Footer, or SearchWidget can be shared across multiple pages without inheritance coupling.',
            code: `class NavBarComponent:
    NAV_HOME = (By.LINK_TEXT, "Home")
    NAV_PROFILE = (By.LINK_TEXT, "Profile")
    NAV_LOGOUT = (By.ID, "logout-btn")

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)

    def go_home(self):
        self.wait.until(EC.element_to_be_clickable(self.NAV_HOME)).click()

    def go_profile(self):
        self.wait.until(EC.element_to_be_clickable(self.NAV_PROFILE)).click()

    def logout(self):
        self.wait.until(EC.element_to_be_clickable(self.NAV_LOGOUT)).click()


class DashboardPage(BasePage):
    """Composes a NavBarComponent instead of inheriting navbar logic."""

    def __init__(self, driver):
        super().__init__(driver)
        self.navbar = NavBarComponent(driver)  # composition

    def navigate_to_profile(self):
        self.navbar.go_profile()
        return ProfilePage(self.driver)`,
            analogy:
              'Inheritance is like a family tree -- you get everything from your ancestors whether you want it or not. Composition is like building with LEGO -- you pick exactly the pieces you need and snap them together.',
            tip: 'If two page classes share a UI component (e.g., a sidebar), extract it into a component class and compose it rather than creating a shared parent class.',
          },
          {
            heading: 'Factory Pattern for Page Creation',
            content:
              'A page factory centralizes page object creation and can handle common setup like waiting for the page to load. This is especially useful when a single action can lead to different pages depending on application state.',
            code: `class PageFactory:
    """Centralized page creation with load verification."""

    _registry = {}

    @classmethod
    def register(cls, page_class):
        cls._registry[page_class.__name__] = page_class
        return page_class

    @classmethod
    def create(cls, page_name, driver):
        page_class = cls._registry.get(page_name)
        if not page_class:
            raise ValueError(f"Unknown page: {page_name}")
        page = page_class(driver)
        page.wait_for_load()
        return page


@PageFactory.register
class LoginPage(BasePage):
    FORM = (By.ID, "login-form")

    def wait_for_load(self):
        self.find(self.FORM)

    def login_as(self, user, pwd):
        self.type_text(self.USERNAME, user)
        self.type_text(self.PASSWORD, pwd)
        self.click(self.LOGIN_BTN)
        # Factory decides which page loads next
        return PageFactory.create("DashboardPage", self.driver)`,
            note: 'The factory pattern is most valuable in large suites with 20+ page objects. For smaller projects, direct instantiation is simpler.',
          },
          {
            heading: 'Fluent Interface Pattern',
            content:
              'A fluent interface lets you chain method calls on a page object, producing test code that reads almost like natural language. Each method returns self (for same-page actions) or a new page object (for navigation), enabling expressive one-liner workflows.',
            code: `class CheckoutPage(BasePage):
    ADDRESS_INPUT = (By.ID, "address")
    CITY_INPUT = (By.ID, "city")
    ZIP_INPUT = (By.ID, "zip")
    PLACE_ORDER_BTN = (By.ID, "place-order")

    def enter_address(self, address):
        self.type_text(self.ADDRESS_INPUT, address)
        return self  # same page -> return self

    def enter_city(self, city):
        self.type_text(self.CITY_INPUT, city)
        return self

    def enter_zip(self, zip_code):
        self.type_text(self.ZIP_INPUT, zip_code)
        return self

    def place_order(self):
        self.click(self.PLACE_ORDER_BTN)
        return OrderConfirmationPage(self.driver)  # new page


# Fluent test
def test_checkout(browser):
    confirmation = (
        CheckoutPage(browser)
        .enter_address("123 Main St")
        .enter_city("Springfield")
        .enter_zip("62704")
        .place_order()
    )
    assert confirmation.get_order_status() == "Confirmed"`,
            tip: 'The fluent pattern works best when actions are sequential. Avoid chaining methods that depend on asynchronous page loads mid-chain.',
          },
          {
            heading: 'Additional Best Practices',
            content:
              'Beyond structural patterns, several practical guidelines help keep POM projects healthy: never expose WebDriver elements directly (return strings, booleans, or page objects instead), use meaningful method names, keep page objects focused on a single page, and version your locators alongside the application code.',
            code: `# GOOD -- returns a string
def get_username(self):
    return self.get_text(self.USERNAME_LABEL)

# BAD -- leaks WebElement to the test
def get_username_element(self):
    return self.find(self.USERNAME_LABEL)

# GOOD -- boolean check encapsulated
def is_logged_in(self):
    return self.is_visible(self.WELCOME_BANNER)

# GOOD -- descriptive name
def submit_registration_form(self):
    self.click(self.REGISTER_BTN)

# BAD -- vague name
def do_action(self):
    self.click(self.REGISTER_BTN)`,
            warning: 'Exposing raw WebElements from page objects breaks encapsulation. If the element type changes, every test using that element must be updated.',
          },
        ],
        quiz: [
          {
            question: 'What is the main advantage of composition over inheritance in POM?',
            options: [
              'It runs tests faster',
              'It avoids tight coupling and allows reuse of UI components across unrelated pages',
              'It eliminates the need for locators',
              'It automatically generates page objects',
            ],
            correctIndex: 1,
            explanation:
              'Composition lets you share UI components (navbar, sidebar) across pages without forcing an inheritance hierarchy. This avoids tight coupling and makes the architecture more flexible.',
          },
          {
            question: 'In a fluent interface, what should a same-page action method return?',
            options: [
              'None',
              'The WebElement that was acted on',
              'self (the current page object)',
              'A boolean indicating success',
            ],
            correctIndex: 2,
            explanation:
              'Returning self enables method chaining like page.enter_name("x").enter_email("y").submit(). Navigation methods return the new page object instead.',
          },
          {
            question: 'Why should page objects NOT return raw WebElements?',
            options: [
              'WebElements consume too much memory',
              'It breaks encapsulation and couples tests to Selenium internals',
              'WebElements cannot be used in assertions',
              'Python does not support returning objects from methods',
            ],
            correctIndex: 1,
            explanation:
              'Returning raw WebElements leaks Selenium implementation details into tests. If the element type or structure changes, every test is affected. Return strings, booleans, or page objects instead.',
          },
        ],
        challenge: {
          prompt:
            'Refactor the following code to use composition. Create a HeaderComponent class with a search_for(query) method, then use it inside a HomePage class. The header has a search input (By.ID, "search-box") and a search button (By.ID, "search-btn").',
          starterCode: `from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Create HeaderComponent here

class HomePage:
    def __init__(self, driver):
        self.driver = driver
        # Compose HeaderComponent here

    def search(self, query):
        # Delegate to header component
        pass`,
          solutionCode: `from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class HeaderComponent:
    SEARCH_INPUT = (By.ID, "search-box")
    SEARCH_BTN = (By.ID, "search-btn")

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)

    def search_for(self, query):
        search_input = self.wait.until(
            EC.presence_of_element_located(self.SEARCH_INPUT)
        )
        search_input.clear()
        search_input.send_keys(query)
        self.wait.until(
            EC.element_to_be_clickable(self.SEARCH_BTN)
        ).click()

class HomePage:
    def __init__(self, driver):
        self.driver = driver
        self.header = HeaderComponent(driver)

    def search(self, query):
        self.header.search_for(query)`,
          hints: [
            'HeaderComponent should accept a driver in __init__ and define locators as class constants.',
            'HomePage composes HeaderComponent by creating an instance in __init__.',
            'The search method in HomePage simply delegates to self.header.search_for(query).',
          ],
        },
      },
    ],
  },

  /* ================================================================== */
  /*  Category 8: Screenshots and Logging                              */
  /* ================================================================== */
  {
    id: 'screenshots-and-logging',
    label: 'Screenshots and Logging',
    icon: 'Camera',
    entries: [
      /* ------------------------------------------------------------ */
      /*  Taking Screenshots                                          */
      /* ------------------------------------------------------------ */
      {
        id: 'taking-screenshots',
        title: 'Taking Screenshots',
        difficulty: 'beginner',
        tags: ['screenshots', 'debugging', 'visual-evidence'],
        sections: [
          {
            heading: 'Full Page Screenshots with save_screenshot',
            content:
              'Selenium provides save_screenshot() to capture the current browser viewport and save it as a PNG file. This is invaluable for debugging failed tests -- you get a visual snapshot of exactly what the browser displayed at the moment of failure.',
            code: `from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://example.com")

# Save a full-page screenshot to a file
driver.save_screenshot("homepage.png")
print("Screenshot saved successfully!")

driver.quit()`,
            output: `Screenshot saved successfully!
# A file named "homepage.png" is created in the current directory`,
            analogy:
              'Taking a screenshot is like snapping a photo of a crime scene. When a test fails, the screenshot preserves the exact state of the page so you can investigate later without needing to reproduce the failure.',
            tip: 'Always use descriptive file names that include the test name and timestamp to avoid overwriting previous screenshots.',
          },
          {
            heading: 'In-Memory Screenshots with get_screenshot_as_png',
            content:
              'If you need the screenshot as raw bytes (for embedding in reports, sending to APIs, or processing with image libraries), use get_screenshot_as_png(). For a base64-encoded string, use get_screenshot_as_base64().',
            code: `from selenium import webdriver
import base64

driver = webdriver.Chrome()
driver.get("https://example.com")

# Get screenshot as raw bytes
png_bytes = driver.get_screenshot_as_png()
print(f"Screenshot size: {len(png_bytes)} bytes")

# Get screenshot as base64 string (useful for HTML reports)
b64_string = driver.get_screenshot_as_base64()
print(f"Base64 length: {len(b64_string)} characters")

# Save bytes to file manually
with open("manual_save.png", "wb") as f:
    f.write(png_bytes)

driver.quit()`,
            output: `Screenshot size: 84521 bytes
Base64 length: 112696 characters`,
            tip: 'Base64 screenshots can be embedded directly in HTML reports using <img src="data:image/png;base64,..." /> without needing separate image files.',
          },
          {
            heading: 'Element-Level Screenshots',
            content:
              'Selenium 4 allows you to capture a screenshot of a specific element rather than the entire viewport. This is useful for visual regression testing of individual components.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Find a specific element
logo = driver.find_element(By.CSS_SELECTOR, "header img.logo")

# Take a screenshot of just that element
logo.screenshot("logo_element.png")
print("Element screenshot saved!")

# You can also get element screenshot as base64
logo_b64 = logo.screenshot_as_base64
print(f"Element base64 length: {len(logo_b64)}")

# Or as PNG bytes
logo_png = logo.screenshot_as_png
print(f"Element PNG bytes: {len(logo_png)}")

driver.quit()`,
            output: `Element screenshot saved!
Element base64 length: 5420
Element PNG bytes: 4065`,
            note: 'Element screenshots crop to the element bounding box. If the element is partially off-screen, Selenium will scroll to it first.',
          },
          {
            heading: 'Screenshot on Test Failure',
            content:
              'The most powerful use of screenshots is capturing them automatically when a test fails. Combined with pytest fixtures, you can create an automatic screenshot-on-failure system that saves hours of debugging.',
            code: `import pytest
from selenium import webdriver
from datetime import datetime
import os

@pytest.fixture
def browser(request):
    driver = webdriver.Chrome()
    yield driver
    # After test completes, check if it failed
    if request.node.rep_call and request.node.rep_call.failed:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        test_name = request.node.name
        os.makedirs("screenshots", exist_ok=True)
        path = f"screenshots/{test_name}_{timestamp}.png"
        driver.save_screenshot(path)
        print(f"Failure screenshot: {path}")
    driver.quit()

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """Hook to attach test result to the request node."""
    outcome = yield
    rep = outcome.get_result()
    setattr(item, f"rep_{rep.when}", rep)`,
            tip: 'Place the pytest_runtest_makereport hook in conftest.py so it applies to all tests automatically.',
          },
        ],
        quiz: [
          {
            question: 'Which method saves a screenshot directly to a file?',
            options: [
              'driver.get_screenshot_as_png()',
              'driver.save_screenshot("file.png")',
              'driver.capture_screen()',
              'driver.get_screenshot_as_base64()',
            ],
            correctIndex: 1,
            explanation:
              'save_screenshot("file.png") writes the screenshot directly to the specified file path. get_screenshot_as_png() returns raw bytes, and get_screenshot_as_base64() returns a base64 string.',
          },
          {
            question: 'How do you take a screenshot of a single element in Selenium 4?',
            options: [
              'driver.save_screenshot(element)',
              'element.screenshot("file.png")',
              'driver.element_screenshot(element)',
              'It is not possible in Selenium',
            ],
            correctIndex: 1,
            explanation:
              'Selenium 4 added the screenshot() method directly on WebElement objects, allowing you to capture just that element rather than the full viewport.',
          },
          {
            question: 'What format does get_screenshot_as_base64() return?',
            options: [
              'A JPEG file path',
              'Raw PNG bytes',
              'A base64-encoded string',
              'An HTML img tag',
            ],
            correctIndex: 2,
            explanation:
              'get_screenshot_as_base64() returns the screenshot as a base64-encoded string, which is useful for embedding in HTML reports or transmitting over APIs.',
          },
        ],
        challenge: {
          prompt:
            'Write a utility function called screenshot_on_failure that acts as a context manager. When used in a with block, it should catch any exception, save a screenshot named "failure_<timestamp>.png" to a "screenshots" folder, and then re-raise the exception.',
          starterCode: `import os
from datetime import datetime
from contextlib import contextmanager

@contextmanager
def screenshot_on_failure(driver):
    # Implement context manager that catches failures
    # and saves a screenshot before re-raising
    pass

# Usage:
# with screenshot_on_failure(driver):
#     assert driver.title == "Expected Title"`,
          solutionCode: `import os
from datetime import datetime
from contextlib import contextmanager

@contextmanager
def screenshot_on_failure(driver):
    try:
        yield
    except Exception as e:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        os.makedirs("screenshots", exist_ok=True)
        path = f"screenshots/failure_{timestamp}.png"
        driver.save_screenshot(path)
        print(f"Screenshot saved to: {path}")
        raise  # re-raise the original exception

# Usage:
# with screenshot_on_failure(driver):
#     assert driver.title == "Expected Title"`,
          hints: [
            'Use @contextmanager from contextlib to create the context manager.',
            'Wrap yield in a try/except block to catch any exception.',
            'Use os.makedirs with exist_ok=True to create the directory if it does not exist.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  Browser Console Logs                                        */
      /* ------------------------------------------------------------ */
      {
        id: 'browser-console-logs',
        title: 'Browser Console Logs',
        difficulty: 'intermediate',
        tags: ['logging', 'console', 'javascript-errors', 'debugging'],
        sections: [
          {
            heading: 'Accessing Browser Logs with get_log',
            content:
              'Selenium can capture the browser console logs, giving you access to JavaScript errors, warnings, and info messages. This is crucial for detecting frontend issues that might not cause visible failures but indicate underlying problems. Use driver.get_log("browser") to retrieve the console log entries.',
            code: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# Enable logging capabilities
options = Options()
options.set_capability("goog:loggingPrefs", {"browser": "ALL"})

driver = webdriver.Chrome(options=options)
driver.get("https://example.com")

# Retrieve browser console logs
logs = driver.get_log("browser")
for entry in logs:
    print(f"[{entry['level']}] {entry['message']}")

driver.quit()`,
            output: `[WARNING] A cookie associated with a resource was set with SameSite=None
[SEVERE] Uncaught TypeError: Cannot read property 'foo' of undefined`,
            tip: 'You must set the logging preference BEFORE creating the driver session. Adding it after will have no effect.',
            analogy:
              'Browser logs are like a flight recorder (black box) for your web page. Even if the page looks fine visually, the logs may reveal hidden JavaScript errors that will eventually cause problems.',
          },
          {
            heading: 'Log Types and Levels',
            content:
              'Selenium supports several log types depending on the browser. The most commonly used are "browser" (console logs), "driver" (WebDriver internal logs), and "performance" (network and rendering events). Each log entry has a level: SEVERE, WARNING, INFO, or DEBUG.',
            code: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.set_capability("goog:loggingPrefs", {
    "browser": "ALL",
    "driver": "WARNING",
    "performance": "ALL",
})

driver = webdriver.Chrome(options=options)
driver.get("https://example.com")

# List available log types
available_types = driver.log_types
print(f"Available log types: {available_types}")

# Get browser logs
browser_logs = driver.get_log("browser")
print(f"Browser log entries: {len(browser_logs)}")

# Get driver logs
driver_logs = driver.get_log("driver")
print(f"Driver log entries: {len(driver_logs)}")

driver.quit()`,
            output: `Available log types: ['browser', 'driver', 'performance']
Browser log entries: 3
Driver log entries: 12`,
            note: 'get_log() clears the log buffer after retrieval. If you call it twice, the second call returns only new entries since the first call.',
          },
          {
            heading: 'Analyzing JavaScript Errors',
            content:
              'Filtering browser logs for SEVERE entries is an effective way to detect JavaScript errors during test execution. You can integrate this check into your test teardown to fail tests that encounter JS errors, even if the visible behavior seems correct.',
            code: `import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

@pytest.fixture
def browser():
    options = Options()
    options.set_capability("goog:loggingPrefs", {"browser": "ALL"})
    driver = webdriver.Chrome(options=options)
    yield driver
    driver.quit()

def get_js_errors(driver):
    """Extract only SEVERE-level browser log entries."""
    logs = driver.get_log("browser")
    return [
        entry for entry in logs
        if entry["level"] == "SEVERE"
    ]

def test_page_has_no_js_errors(browser):
    browser.get("https://example.com")
    # Interact with the page...
    browser.find_element(By.ID, "some-button").click()

    # Check for JavaScript errors
    js_errors = get_js_errors(browser)
    if js_errors:
        error_messages = "\\n".join(e["message"] for e in js_errors)
        pytest.fail(f"JavaScript errors detected:\\n{error_messages}")`,
            tip: 'Add the JS error check as a conftest.py fixture that runs after every test. This catches hidden frontend bugs early in development.',
          },
        ],
        quiz: [
          {
            question: 'Which capability must be set to enable browser console log capture in Chrome?',
            options: [
              'options.add_argument("--enable-logging")',
              'options.set_capability("goog:loggingPrefs", {"browser": "ALL"})',
              'driver.enable_logging(True)',
              'options.set_capability("loggingEnabled", True)',
            ],
            correctIndex: 1,
            explanation:
              'Chrome requires the "goog:loggingPrefs" capability with a dictionary specifying which log types to capture and at what level.',
          },
          {
            question: 'What happens when you call driver.get_log("browser") twice?',
            options: [
              'Both calls return all logs from session start',
              'The second call returns only new entries since the first call',
              'The second call raises an exception',
              'The second call returns an empty list always',
            ],
            correctIndex: 1,
            explanation:
              'get_log() clears the log buffer after retrieval. The second call returns only entries logged between the first and second calls.',
          },
          {
            question: 'Which log level indicates a JavaScript error?',
            options: ['DEBUG', 'INFO', 'WARNING', 'SEVERE'],
            correctIndex: 3,
            explanation:
              'SEVERE is the log level for JavaScript errors. Uncaught exceptions, failed resource loads, and other critical issues appear at this level.',
          },
        ],
        challenge: {
          prompt:
            'Create a function called assert_no_console_errors(driver) that retrieves browser logs, filters for SEVERE-level entries, and raises an AssertionError with all error messages if any are found. It should return True if no errors exist.',
          starterCode: `def assert_no_console_errors(driver):
    """Check browser console for JavaScript errors.
    Raises AssertionError if SEVERE logs found.
    Returns True if clean.
    """
    # Get browser logs
    # Filter for SEVERE level
    # Raise AssertionError with messages if found
    # Return True if clean
    pass`,
          solutionCode: `def assert_no_console_errors(driver):
    """Check browser console for JavaScript errors.
    Raises AssertionError if SEVERE logs found.
    Returns True if clean.
    """
    logs = driver.get_log("browser")
    severe_logs = [
        entry for entry in logs
        if entry["level"] == "SEVERE"
    ]

    if severe_logs:
        messages = "\\n".join(
            f"  [{e['level']}] {e['message']}"
            for e in severe_logs
        )
        raise AssertionError(
            f"Found {len(severe_logs)} JavaScript error(s):\\n{messages}"
        )

    return True`,
          hints: [
            'Use driver.get_log("browser") to retrieve all console log entries.',
            'Filter entries where entry["level"] == "SEVERE".',
            'Use a list comprehension to build the list of error messages for the assertion message.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  Performance Logging                                         */
      /* ------------------------------------------------------------ */
      {
        id: 'performance-logging',
        title: 'Performance Logging',
        difficulty: 'advanced',
        tags: ['performance', 'network', 'timing', 'optimization'],
        sections: [
          {
            heading: 'Enabling Performance Logs',
            content:
              'Chrome DevTools Protocol exposes detailed performance data through Selenium. By enabling the "performance" log type, you gain access to network requests, resource timing, page load metrics, and more. This data follows the Chrome DevTools Protocol event format.',
            code: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import json

options = Options()
options.set_capability("goog:loggingPrefs", {"performance": "ALL"})

# Enable performance logging in ChromeDriver
options.set_capability("goog:perfLoggingPrefs", {
    "enableNetwork": True,
    "enablePage": True,
    "traceCategories": "devtools.timeline"
})

driver = webdriver.Chrome(options=options)
driver.get("https://example.com")

# Get performance log entries
perf_logs = driver.get_log("performance")
print(f"Captured {len(perf_logs)} performance events")

# Each entry is a JSON string containing a DevTools event
first_event = json.loads(perf_logs[0]["message"])
print(f"Event method: {first_event['message']['method']}")

driver.quit()`,
            output: `Captured 247 performance events
Event method: Network.requestWillBeSent`,
            analogy:
              'Performance logs are like a detailed stopwatch for every step of page loading. Instead of just timing the whole race, you see split times for DNS lookup, connection setup, and each resource download.',
          },
          {
            heading: 'Capturing Network Timing',
            content:
              'You can extract network request and response events to analyze API call durations, failed requests, and payload sizes. Filter the performance logs for Network.responseReceived events to inspect individual resource loads.',
            code: `import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.set_capability("goog:loggingPrefs", {"performance": "ALL"})
driver = webdriver.Chrome(options=options)
driver.get("https://example.com")

# Parse performance logs
perf_logs = driver.get_log("performance")
network_events = []

for entry in perf_logs:
    log_data = json.loads(entry["message"])["message"]
    if log_data["method"] == "Network.responseReceived":
        response = log_data["params"]["response"]
        network_events.append({
            "url": response["url"],
            "status": response["status"],
            "mime_type": response.get("mimeType", "unknown"),
            "timing": response.get("timing", {}),
        })

# Print network requests
for event in network_events:
    print(f"[{event['status']}] {event['mime_type']}: {event['url'][:80]}")

# Find failed requests
failed = [e for e in network_events if e["status"] >= 400]
if failed:
    print(f"\\nFound {len(failed)} failed request(s)!")

driver.quit()`,
            output: `[200] text/html: https://example.com/
[200] text/css: https://example.com/styles.css
[200] application/javascript: https://example.com/app.js
[200] image/png: https://example.com/logo.png`,
            tip: 'Network events contain detailed timing data including DNS lookup, SSL handshake, and time-to-first-byte. Use this for performance regression testing.',
          },
          {
            heading: 'Measuring Page Load Performance',
            content:
              'Selenium can access the Navigation Timing API through JavaScript execution. This provides precise measurements for page load phases like DOM content loaded, first paint, and full load time.',
            code: `from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://example.com")

# Use Navigation Timing API
timing = driver.execute_script("""
    const perf = window.performance.timing;
    return {
        dns: perf.domainLookupEnd - perf.domainLookupStart,
        tcp: perf.connectEnd - perf.connectStart,
        ttfb: perf.responseStart - perf.requestStart,
        domLoaded: perf.domContentLoadedEventEnd - perf.navigationStart,
        fullLoad: perf.loadEventEnd - perf.navigationStart,
    };
""")

print("Page Load Performance Metrics:")
print(f"  DNS Lookup:          {timing['dns']}ms")
print(f"  TCP Connection:      {timing['tcp']}ms")
print(f"  Time to First Byte:  {timing['ttfb']}ms")
print(f"  DOM Content Loaded:  {timing['domLoaded']}ms")
print(f"  Full Page Load:      {timing['fullLoad']}ms")

# Fail if page load exceeds threshold
MAX_LOAD_TIME_MS = 3000
assert timing["fullLoad"] < MAX_LOAD_TIME_MS, \\
    f"Page load too slow: {timing['fullLoad']}ms > {MAX_LOAD_TIME_MS}ms"

driver.quit()`,
            output: `Page Load Performance Metrics:
  DNS Lookup:          12ms
  TCP Connection:      25ms
  Time to First Byte:  142ms
  DOM Content Loaded:  856ms
  Full Page Load:      1423ms`,
            note: 'The Navigation Timing API (Level 1) uses performance.timing. For more precise measurements, consider the newer Performance Observer API (Level 2) with performance.getEntriesByType("navigation").',
          },
          {
            heading: 'Resource Loading Analysis',
            content:
              'The Resource Timing API provides detailed loading metrics for every resource on the page (scripts, stylesheets, images). This allows you to identify slow resources that may be bottlenecking page performance.',
            code: `from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://example.com")

# Get resource timing for all loaded resources
resources = driver.execute_script("""
    return window.performance.getEntriesByType("resource").map(r => ({
        name: r.name.split('/').pop(),
        type: r.initiatorType,
        duration: Math.round(r.duration),
        size: r.transferSize || 0,
    }));
""")

# Sort by duration (slowest first)
resources.sort(key=lambda r: r["duration"], reverse=True)

print("Top 5 Slowest Resources:")
for i, res in enumerate(resources[:5], 1):
    size_kb = res["size"] / 1024
    print(f"  {i}. [{res['type']}] {res['name']}: "
          f"{res['duration']}ms ({size_kb:.1f}KB)")

# Check for oversized resources
large_resources = [r for r in resources if r["size"] > 500_000]
if large_resources:
    print(f"\\nWarning: {len(large_resources)} resource(s) exceed 500KB!")

driver.quit()`,
            output: `Top 5 Slowest Resources:
  1. [script] vendor.js: 342ms (245.3KB)
  2. [img] hero-banner.jpg: 287ms (189.7KB)
  3. [script] app.js: 156ms (78.2KB)
  4. [css] styles.css: 89ms (23.1KB)
  5. [img] logo.png: 45ms (8.4KB)`,
            tip: 'Automate performance budgets by asserting that no resource exceeds a certain size or load time threshold. Run these checks in CI/CD to catch regressions.',
          },
        ],
        quiz: [
          {
            question: 'What capability enables Chrome performance logging?',
            options: [
              'options.add_argument("--perf-log")',
              'options.set_capability("goog:loggingPrefs", {"performance": "ALL"})',
              'driver.enable_performance_logging()',
              'options.set_capability("enablePerf", True)',
            ],
            correctIndex: 1,
            explanation:
              'The "goog:loggingPrefs" capability with {"performance": "ALL"} enables Chrome to capture DevTools Protocol performance events.',
          },
          {
            question: 'Which JavaScript API provides page load timing data?',
            options: [
              'document.loadTime',
              'window.performance.timing',
              'navigator.timing',
              'chrome.devtools.timing',
            ],
            correctIndex: 1,
            explanation:
              'The Navigation Timing API (window.performance.timing) provides timestamps for each phase of page loading, from DNS lookup to full load completion.',
          },
          {
            question: 'How can you find the slowest resources loaded by a page?',
            options: [
              'Parse the HTML source for resource tags',
              'Use window.performance.getEntriesByType("resource")',
              'Check the driver.page_source property',
              'Use driver.get_log("network")',
            ],
            correctIndex: 1,
            explanation:
              'The Resource Timing API (performance.getEntriesByType("resource")) returns detailed timing metrics for every resource loaded by the page, which you can sort by duration.',
          },
        ],
        challenge: {
          prompt:
            'Write a function called check_page_performance(driver, max_load_ms, max_resource_ms) that checks two things: (1) the full page load time is under max_load_ms, and (2) no individual resource took longer than max_resource_ms to load. Return a dict with keys "load_time", "slow_resources" (list), and "passed" (boolean).',
          starterCode: `def check_page_performance(driver, max_load_ms=3000, max_resource_ms=1000):
    """Verify page load performance against thresholds."""
    # Get full page load time using Navigation Timing API
    # Get resource timings
    # Find resources exceeding max_resource_ms
    # Return results dict
    pass`,
          solutionCode: `def check_page_performance(driver, max_load_ms=3000, max_resource_ms=1000):
    """Verify page load performance against thresholds."""
    load_time = driver.execute_script("""
        const t = window.performance.timing;
        return t.loadEventEnd - t.navigationStart;
    """)

    resources = driver.execute_script("""
        return window.performance.getEntriesByType("resource").map(r => ({
            name: r.name.split('/').pop(),
            duration: Math.round(r.duration),
        }));
    """)

    slow_resources = [
        r for r in resources if r["duration"] > max_resource_ms
    ]

    passed = load_time < max_load_ms and len(slow_resources) == 0

    return {
        "load_time": load_time,
        "slow_resources": slow_resources,
        "passed": passed,
    }`,
          hints: [
            'Use driver.execute_script() to access window.performance.timing for page load time.',
            'Use performance.getEntriesByType("resource") to get individual resource timings.',
            'Filter resources where duration exceeds max_resource_ms.',
          ],
        },
      },
    ],
  },

  /* ================================================================== */
  /*  Category 9: Testing Integration                                  */
  /* ================================================================== */
  {
    id: 'testing-integration',
    label: 'Testing Integration',
    icon: 'TestTube',
    entries: [
      /* ------------------------------------------------------------ */
      /*  Selenium with pytest                                        */
      /* ------------------------------------------------------------ */
      {
        id: 'selenium-with-pytest',
        title: 'Selenium with pytest',
        difficulty: 'intermediate',
        tags: ['pytest', 'fixtures', 'parametrize', 'test-organization'],
        sections: [
          {
            heading: 'Setting Up pytest Fixtures for Selenium',
            content:
              'pytest fixtures provide an elegant way to manage browser lifecycle in Selenium tests. A fixture can create the WebDriver before each test and quit it afterward, ensuring clean state and proper resource cleanup. Fixtures are defined in conftest.py and are automatically available to all test files.',
            code: `# conftest.py
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

@pytest.fixture
def browser():
    """Create a Chrome browser instance for each test."""
    options = Options()
    options.add_argument("--start-maximized")
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(10)
    yield driver  # test runs here
    driver.quit()  # cleanup after test

@pytest.fixture
def headless_browser():
    """Create a headless Chrome browser."""
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(options=options)
    yield driver
    driver.quit()`,
            output: `# Usage in tests:
# def test_example(browser):   -- gets a visible Chrome
# def test_fast(headless_browser):  -- gets headless Chrome`,
            analogy:
              'Fixtures are like a backstage crew in a theater. They set up the stage (browser) before the actors (tests) perform and tear everything down afterward. The actors never worry about setup.',
            tip: 'Use yield instead of return in fixtures to ensure cleanup code runs even if the test fails.',
          },
          {
            heading: 'Scoped Fixtures for Efficiency',
            content:
              'By default, pytest fixtures have "function" scope -- a new browser is created for each test. For slow test suites, you can use "class" or "session" scope to share a single browser across multiple tests, dramatically reducing startup time.',
            code: `# conftest.py
import pytest
from selenium import webdriver

@pytest.fixture(scope="session")
def browser_session():
    """Single browser for the entire test session."""
    driver = webdriver.Chrome()
    driver.implicitly_wait(10)
    yield driver
    driver.quit()

@pytest.fixture(scope="class")
def browser_per_class():
    """One browser per test class."""
    driver = webdriver.Chrome()
    driver.implicitly_wait(10)
    yield driver
    driver.quit()

@pytest.fixture(autouse=True)
def clear_cookies(browser_session):
    """Auto-clear cookies before each test when sharing a browser."""
    browser_session.delete_all_cookies()
    yield`,
            note: 'Session-scoped browsers are faster but can cause test pollution. Always pair them with cleanup fixtures (like clear_cookies) to maintain isolation.',
          },
          {
            heading: 'Parametrized Tests',
            content:
              'pytest.mark.parametrize lets you run the same test with multiple sets of input data. This is perfect for testing forms with different inputs, validating multiple URLs, or cross-browser testing.',
            code: `import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By

@pytest.mark.parametrize("username,password,expected", [
    ("admin", "admin123", "Welcome, admin!"),
    ("user1", "pass123", "Welcome, user1!"),
    ("guest", "guest", "Welcome, guest!"),
])
def test_login_various_users(browser, username, password, expected):
    browser.get("https://example.com/login")
    browser.find_element(By.ID, "username").send_keys(username)
    browser.find_element(By.ID, "password").send_keys(password)
    browser.find_element(By.ID, "login-btn").click()
    welcome = browser.find_element(By.ID, "welcome-msg").text
    assert welcome == expected

@pytest.mark.parametrize("url,title_contains", [
    ("/", "Home"),
    ("/about", "About"),
    ("/contact", "Contact"),
])
def test_page_titles(browser, url, title_contains):
    browser.get(f"https://example.com{url}")
    assert title_contains in browser.title`,
            tip: 'Parametrized tests generate separate test IDs (test_login[admin-admin123-Welcome]) making it easy to re-run a specific case.',
          },
          {
            heading: 'Test Organization and Markers',
            content:
              'Organize Selenium tests by feature using directories and files. Use pytest markers to categorize tests by speed, priority, or type, allowing you to selectively run subsets of your suite.',
            code: `# pytest.ini
# [pytest]
# markers =
#     smoke: Critical path tests
#     regression: Full regression suite
#     slow: Tests that take over 30 seconds

import pytest

@pytest.mark.smoke
def test_homepage_loads(browser):
    browser.get("https://example.com")
    assert "Example" in browser.title

@pytest.mark.regression
def test_search_results_pagination(browser):
    browser.get("https://example.com/search?q=python")
    # ... pagination tests ...

@pytest.mark.slow
def test_file_upload_large_file(browser):
    # ... long-running upload test ...
    pass

# Run only smoke tests:
# pytest -m smoke
#
# Run everything except slow:
# pytest -m "not slow"
#
# Run smoke AND regression:
# pytest -m "smoke or regression"`,
            tip: 'Create a smoke test suite that covers the most critical user journeys. Run smoke tests on every commit; run the full regression suite nightly.',
          },
        ],
        quiz: [
          {
            question: 'What keyword should you use in a pytest fixture to ensure cleanup runs after the test?',
            options: ['return', 'yield', 'finally', 'teardown'],
            correctIndex: 1,
            explanation:
              'yield splits a fixture into setup (before yield) and teardown (after yield). Code after yield always runs, even if the test fails.',
          },
          {
            question: 'Which fixture scope shares a single browser across all tests in the session?',
            options: [
              'scope="function"',
              'scope="class"',
              'scope="module"',
              'scope="session"',
            ],
            correctIndex: 3,
            explanation:
              'scope="session" creates the fixture once for the entire test session. All tests share the same browser instance, which is faster but requires careful state management.',
          },
          {
            question: 'How do you run only tests marked with @pytest.mark.smoke?',
            options: [
              'pytest --filter smoke',
              'pytest -m smoke',
              'pytest --mark smoke',
              'pytest -k smoke',
            ],
            correctIndex: 1,
            explanation:
              'The -m flag selects tests by marker expression. -k filters by name pattern, which is different from marker-based selection.',
          },
        ],
        challenge: {
          prompt:
            'Create a conftest.py with a browser fixture that supports both headed and headless modes via a pytest command-line option --headless. Add a pytest_addoption hook and use request.config.getoption to read the flag.',
          starterCode: `# conftest.py
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def pytest_addoption(parser):
    # Add --headless command line option
    pass

@pytest.fixture
def browser(request):
    # Create browser based on --headless option
    pass`,
          solutionCode: `# conftest.py
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def pytest_addoption(parser):
    parser.addoption(
        "--headless",
        action="store_true",
        default=False,
        help="Run tests in headless mode",
    )

@pytest.fixture
def browser(request):
    options = Options()
    options.add_argument("--start-maximized")
    if request.config.getoption("--headless"):
        options.add_argument("--headless=new")
        options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(10)
    yield driver
    driver.quit()`,
          hints: [
            'Use parser.addoption with action="store_true" for a boolean flag.',
            'Access the option value with request.config.getoption("--headless").',
            'Conditionally add --headless=new argument to Chrome options.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  Selenium with unittest                                      */
      /* ------------------------------------------------------------ */
      {
        id: 'selenium-with-unittest',
        title: 'Selenium with unittest',
        difficulty: 'intermediate',
        tags: ['unittest', 'setUp', 'tearDown', 'test-suites'],
        sections: [
          {
            heading: 'Basic unittest Test Case',
            content:
              'Python\'s built-in unittest framework provides a class-based approach to organizing Selenium tests. Each test class extends unittest.TestCase, and you use setUp() and tearDown() methods to manage the browser lifecycle. This is a solid choice when you prefer a batteries-included approach without external dependencies.',
            code: `import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By

class TestLogin(unittest.TestCase):

    def setUp(self):
        """Runs before each test method."""
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(10)
        self.driver.get("https://example.com/login")

    def tearDown(self):
        """Runs after each test method."""
        self.driver.quit()

    def test_successful_login(self):
        self.driver.find_element(By.ID, "username").send_keys("admin")
        self.driver.find_element(By.ID, "password").send_keys("secret")
        self.driver.find_element(By.ID, "login-btn").click()
        welcome = self.driver.find_element(By.ID, "welcome").text
        self.assertEqual(welcome, "Welcome, admin!")

    def test_empty_username_shows_error(self):
        self.driver.find_element(By.ID, "login-btn").click()
        error = self.driver.find_element(By.CLASS_NAME, "error").text
        self.assertIn("required", error.lower())

if __name__ == "__main__":
    unittest.main()`,
            output: `..
----------------------------------------------------------------------
Ran 2 tests in 8.432s

OK`,
            analogy:
              'unittest is like a formal dinner with assigned seats (setUp/tearDown). Everything follows a strict protocol. pytest is like a casual buffet -- more flexible but less structured.',
          },
          {
            heading: 'Class-Level Setup with setUpClass',
            content:
              'If creating a new browser for each test is too slow, use setUpClass() and tearDownClass() to share a single browser across all tests in a class. This is similar to pytest\'s class-scoped fixtures.',
            code: `import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By

class TestDashboard(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """Runs once before all tests in this class."""
        cls.driver = webdriver.Chrome()
        cls.driver.implicitly_wait(10)
        # Login once for all tests
        cls.driver.get("https://example.com/login")
        cls.driver.find_element(By.ID, "username").send_keys("admin")
        cls.driver.find_element(By.ID, "password").send_keys("secret")
        cls.driver.find_element(By.ID, "login-btn").click()

    @classmethod
    def tearDownClass(cls):
        """Runs once after all tests in this class."""
        cls.driver.quit()

    def setUp(self):
        """Reset to dashboard before each test."""
        self.driver.get("https://example.com/dashboard")

    def test_dashboard_title(self):
        self.assertIn("Dashboard", self.driver.title)

    def test_sidebar_visible(self):
        sidebar = self.driver.find_element(By.ID, "sidebar")
        self.assertTrue(sidebar.is_displayed())`,
            tip: 'Use @classmethod decorator for setUpClass and tearDownClass. Access the driver via cls.driver in class methods and self.driver in test methods.',
          },
          {
            heading: 'Building Test Suites',
            content:
              'unittest allows you to compose test suites programmatically, giving you precise control over which tests run in what order. This is useful for creating specialized test runs (smoke, regression, nightly).',
            code: `import unittest
from tests.test_login import TestLogin
from tests.test_dashboard import TestDashboard
from tests.test_search import TestSearch

def smoke_suite():
    """Build a suite of critical smoke tests."""
    suite = unittest.TestSuite()
    suite.addTest(TestLogin("test_successful_login"))
    suite.addTest(TestDashboard("test_dashboard_title"))
    suite.addTest(TestSearch("test_basic_search"))
    return suite

def regression_suite():
    """Build the full regression suite."""
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    suite.addTests(loader.loadTestsFromTestCase(TestLogin))
    suite.addTests(loader.loadTestsFromTestCase(TestDashboard))
    suite.addTests(loader.loadTestsFromTestCase(TestSearch))
    return suite

if __name__ == "__main__":
    runner = unittest.TextTestRunner(verbosity=2)
    # Run just the smoke tests
    runner.run(smoke_suite())`,
            output: `test_successful_login (tests.test_login.TestLogin) ... ok
test_dashboard_title (tests.test_dashboard.TestDashboard) ... ok
test_basic_search (tests.test_search.TestSearch) ... ok

----------------------------------------------------------------------
Ran 3 tests in 12.156s

OK`,
            note: 'While unittest suites offer fine-grained control, most modern projects prefer pytest\'s marker system (-m smoke) for test selection due to its simplicity.',
          },
        ],
        quiz: [
          {
            question: 'When does setUp() run in a unittest.TestCase?',
            options: [
              'Once before all tests in the class',
              'Before each individual test method',
              'After each test method',
              'Only if the previous test passed',
            ],
            correctIndex: 1,
            explanation:
              'setUp() runs before every individual test method. For one-time class-level setup, use setUpClass() with @classmethod.',
          },
          {
            question: 'What decorator is required for setUpClass?',
            options: ['@staticmethod', '@classmethod', '@property', 'No decorator needed'],
            correctIndex: 1,
            explanation:
              'setUpClass must be decorated with @classmethod because it receives the class (cls) rather than an instance (self) as its first argument.',
          },
          {
            question: 'How do you add a specific test to a unittest TestSuite?',
            options: [
              'suite.add(TestLogin.test_successful_login)',
              'suite.addTest(TestLogin("test_successful_login"))',
              'suite.append(TestLogin, "test_successful_login")',
              'suite.register("test_successful_login")',
            ],
            correctIndex: 1,
            explanation:
              'addTest() accepts a test instance created by passing the method name as a string to the TestCase constructor: TestLogin("test_successful_login").',
          },
        ],
        challenge: {
          prompt:
            'Create a unittest.TestCase class called TestNavigation that uses setUpClass to create a shared browser and tearDownClass to quit it. Add setUp to navigate to the base URL. Write two test methods: test_home_link and test_about_link that verify clicking navigation links leads to the correct pages.',
          starterCode: `import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By

class TestNavigation(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        pass

    @classmethod
    def tearDownClass(cls):
        pass

    def setUp(self):
        pass

    def test_home_link(self):
        pass

    def test_about_link(self):
        pass`,
          solutionCode: `import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By

class TestNavigation(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.driver.implicitly_wait(10)
        cls.base_url = "https://example.com"

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def setUp(self):
        self.driver.get(self.base_url)

    def test_home_link(self):
        self.driver.find_element(By.LINK_TEXT, "Home").click()
        self.assertIn("Home", self.driver.title)
        self.assertEqual(self.driver.current_url, f"{self.base_url}/")

    def test_about_link(self):
        self.driver.find_element(By.LINK_TEXT, "About").click()
        self.assertIn("About", self.driver.title)
        self.assertEqual(self.driver.current_url, f"{self.base_url}/about")`,
          hints: [
            'Use @classmethod for setUpClass/tearDownClass and store the driver on cls.',
            'In setUp, navigate to the base URL so each test starts from the same page.',
            'Use self.assertIn and self.assertEqual for verification.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  Assertions and Verification                                 */
      /* ------------------------------------------------------------ */
      {
        id: 'assertions-and-verification',
        title: 'Assertions and Verification',
        difficulty: 'beginner',
        tags: ['assertions', 'verification', 'soft-assertions', 'matchers'],
        sections: [
          {
            heading: 'Basic Assert Statements',
            content:
              'Python\'s built-in assert statement is the simplest way to verify conditions in Selenium tests. When an assertion fails, it raises an AssertionError with an optional message. Most Selenium test failures come down to asserting something about the page state.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Assert page title
assert "Example" in driver.title, f"Expected 'Example' in title, got '{driver.title}'"

# Assert element text
heading = driver.find_element(By.TAG_NAME, "h1").text
assert heading == "Welcome", f"Expected 'Welcome', got '{heading}'"

# Assert element is displayed
logo = driver.find_element(By.ID, "logo")
assert logo.is_displayed(), "Logo should be visible"

# Assert URL
assert "/home" in driver.current_url, f"Expected /home in URL: {driver.current_url}"

# Assert element attribute
link = driver.find_element(By.ID, "docs-link")
assert link.get_attribute("href") == "https://docs.example.com"

driver.quit()`,
            analogy:
              'Assertions are like quality control checkpoints on a factory line. Each checkpoint inspects one aspect of the product. If any check fails, the product (test) is rejected.',
            tip: 'Always include a descriptive message in assertions. Without a message, a failed assert only shows "AssertionError" with no context.',
          },
          {
            heading: 'Common Assertion Patterns',
            content:
              'Selenium tests typically verify five categories: element presence, element state, text content, attributes, and page-level properties. Here are reusable helper functions for the most common checks.',
            code: `from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def assert_element_present(driver, locator, timeout=10):
    """Assert an element exists in the DOM."""
    try:
        WebDriverWait(driver, timeout).until(
            EC.presence_of_element_located(locator)
        )
    except:
        raise AssertionError(f"Element {locator} not found within {timeout}s")

def assert_element_visible(driver, locator, timeout=10):
    """Assert an element is visible on the page."""
    try:
        WebDriverWait(driver, timeout).until(
            EC.visibility_of_element_located(locator)
        )
    except:
        raise AssertionError(f"Element {locator} not visible within {timeout}s")

def assert_text_contains(driver, locator, expected_text):
    """Assert element text contains a substring."""
    element = driver.find_element(*locator)
    actual = element.text
    assert expected_text in actual, \\
        f"Expected '{expected_text}' in '{actual}'"

def assert_element_count(driver, locator, expected_count):
    """Assert the number of matching elements."""
    elements = driver.find_elements(*locator)
    actual = len(elements)
    assert actual == expected_count, \\
        f"Expected {expected_count} elements, found {actual}"`,
            tip: 'Using WebDriverWait in assertion helpers prevents flaky tests caused by elements that have not finished rendering.',
          },
          {
            heading: 'Soft Assertions',
            content:
              'Standard assertions stop the test at the first failure. Soft assertions collect all failures and report them at the end, giving you a complete picture of what is broken. This is especially useful when verifying multiple elements on a complex page.',
            code: `class SoftAssert:
    """Collect multiple assertion failures and report them together."""

    def __init__(self):
        self.errors = []

    def assert_equal(self, actual, expected, message=""):
        try:
            assert actual == expected, message or f"Expected {expected}, got {actual}"
        except AssertionError as e:
            self.errors.append(str(e))

    def assert_true(self, condition, message=""):
        try:
            assert condition, message or "Condition is not True"
        except AssertionError as e:
            self.errors.append(str(e))

    def assert_in(self, member, container, message=""):
        try:
            assert member in container, message or f"'{member}' not in '{container}'"
        except AssertionError as e:
            self.errors.append(str(e))

    def assert_all(self):
        """Call at the end of the test to fail if any assertions failed."""
        if self.errors:
            report = "\\n".join(f"  - {e}" for e in self.errors)
            raise AssertionError(
                f"{len(self.errors)} assertion(s) failed:\\n{report}"
            )

# Usage in a test
def test_dashboard_elements(browser):
    browser.get("https://example.com/dashboard")
    soft = SoftAssert()

    soft.assert_equal(browser.title, "Dashboard")
    soft.assert_true(browser.find_element(By.ID, "sidebar").is_displayed(), "Sidebar missing")
    soft.assert_in("Welcome", browser.find_element(By.ID, "header").text)
    soft.assert_equal(len(browser.find_elements(By.CLASS_NAME, "widget")), 4, "Wrong widget count")

    soft.assert_all()  # raises if any failed`,
            note: 'Soft assertions are powerful but use them judiciously. For critical checks (like login success), use hard assertions so the test stops immediately.',
          },
        ],
        quiz: [
          {
            question: 'What exception does a failed Python assert statement raise?',
            options: ['ValueError', 'TestError', 'AssertionError', 'RuntimeError'],
            correctIndex: 2,
            explanation:
              'A failed assert statement raises an AssertionError. Test frameworks catch this exception to mark the test as failed.',
          },
          {
            question: 'What is the advantage of soft assertions over hard assertions?',
            options: [
              'They run faster',
              'They collect all failures instead of stopping at the first one',
              'They automatically fix the failures',
              'They do not require an assert statement',
            ],
            correctIndex: 1,
            explanation:
              'Soft assertions collect all failures during a test and report them together at the end, giving a complete picture of all broken elements rather than stopping at the first issue.',
          },
          {
            question: 'Why should assertion messages be descriptive?',
            options: [
              'They make the code run faster',
              'They are required by Python syntax',
              'They help quickly identify what failed and why',
              'They are displayed in the browser',
            ],
            correctIndex: 2,
            explanation:
              'Descriptive messages turn a cryptic "AssertionError" into something like "Expected Dashboard in title, got Login" making it immediately clear what went wrong.',
          },
        ],
        challenge: {
          prompt:
            'Extend the SoftAssert class with a method assert_element_visible(driver, locator, message) that checks if an element is displayed. If the element is not found or not visible, add the failure message. Do not let exceptions from find_element crash the test.',
          starterCode: `class SoftAssert:
    def __init__(self):
        self.errors = []

    def assert_element_visible(self, driver, locator, message=""):
        # Check if element exists and is displayed
        # Catch exceptions and add to errors list
        pass

    def assert_all(self):
        if self.errors:
            report = "\\n".join(f"  - {e}" for e in self.errors)
            raise AssertionError(f"{len(self.errors)} failure(s):\\n{report}")`,
          solutionCode: `class SoftAssert:
    def __init__(self):
        self.errors = []

    def assert_element_visible(self, driver, locator, message=""):
        try:
            element = driver.find_element(*locator)
            if not element.is_displayed():
                self.errors.append(
                    message or f"Element {locator} exists but is not visible"
                )
        except Exception:
            self.errors.append(
                message or f"Element {locator} not found in DOM"
            )

    def assert_all(self):
        if self.errors:
            report = "\\n".join(f"  - {e}" for e in self.errors)
            raise AssertionError(f"{len(self.errors)} failure(s):\\n{report}")`,
          hints: [
            'Use try/except to catch NoSuchElementException when the element is not found.',
            'If the element is found, check is_displayed() to verify visibility.',
            'Append failure messages to self.errors rather than raising immediately.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  Test Reporting                                              */
      /* ------------------------------------------------------------ */
      {
        id: 'test-reporting',
        title: 'Test Reporting',
        difficulty: 'intermediate',
        tags: ['reporting', 'pytest-html', 'allure', 'screenshots'],
        sections: [
          {
            heading: 'pytest-html Reports',
            content:
              'The pytest-html plugin generates beautiful standalone HTML test reports. Install it with pip install pytest-html, then run your tests with the --html flag. The report includes test names, durations, pass/fail status, and can embed screenshots and logs.',
            code: `# Install:  pip install pytest-html
# Run:      pytest --html=report.html --self-contained-html

# conftest.py -- enhance the report with screenshots
import pytest
from datetime import datetime

@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()
    extras = getattr(report, "extras", [])

    if report.when == "call" and report.failed:
        # Attach screenshot on failure
        driver = item.funcargs.get("browser")
        if driver:
            screenshot = driver.get_screenshot_as_base64()
            extras.append(pytest.html.extras.image(screenshot, "Screenshot"))
            extras.append(pytest.html.extras.html(
                f"<div>URL: {driver.current_url}</div>"
            ))

    report.extras = extras`,
            output: `# Running: pytest --html=report.html --self-contained-html
# produces a single HTML file with:
# - Test summary (passed, failed, skipped)
# - Detailed results per test
# - Embedded failure screenshots
# - Execution timestamps and durations`,
            tip: 'Use --self-contained-html to embed all CSS and images directly in the HTML file, making it easy to share as a single attachment.',
          },
          {
            heading: 'Allure Reports',
            content:
              'Allure is a powerful reporting framework that produces interactive, visually rich reports. It supports test categorization, step-by-step breakdowns, attachments, and historical trend analysis. It is the industry standard for enterprise test reporting.',
            code: `# Install:  pip install allure-pytest
# Run:      pytest --alluredir=allure-results
# View:     allure serve allure-results

import allure
from selenium.webdriver.common.by import By

@allure.feature("Authentication")
@allure.story("Login")
@allure.severity(allure.severity_level.CRITICAL)
def test_login(browser):
    with allure.step("Navigate to login page"):
        browser.get("https://example.com/login")

    with allure.step("Enter credentials"):
        browser.find_element(By.ID, "username").send_keys("admin")
        browser.find_element(By.ID, "password").send_keys("secret")

    with allure.step("Click login button"):
        browser.find_element(By.ID, "login-btn").click()

    with allure.step("Verify dashboard loaded"):
        assert "Dashboard" in browser.title
        allure.attach(
            browser.get_screenshot_as_png(),
            name="Dashboard Screenshot",
            attachment_type=allure.attachment_type.PNG,
        )`,
            note: 'Allure requires a separate command-line tool (allure-commandline) to generate the HTML report from the raw results directory.',
          },
          {
            heading: 'Custom Report Generation',
            content:
              'For full control over report format and content, you can build custom reports using pytest hooks. A common approach is to collect results in a JSON file and generate an HTML or PDF report from a template.',
            code: `# conftest.py
import pytest
import json
from datetime import datetime

class TestResultCollector:
    def __init__(self):
        self.results = []
        self.start_time = None

    def start(self):
        self.start_time = datetime.now().isoformat()

    def add_result(self, name, status, duration, error=None):
        self.results.append({
            "name": name,
            "status": status,
            "duration": round(duration, 2),
            "error": str(error) if error else None,
            "timestamp": datetime.now().isoformat(),
        })

    def save(self, filepath="test_results.json"):
        report = {
            "start_time": self.start_time,
            "end_time": datetime.now().isoformat(),
            "total": len(self.results),
            "passed": sum(1 for r in self.results if r["status"] == "passed"),
            "failed": sum(1 for r in self.results if r["status"] == "failed"),
            "results": self.results,
        }
        with open(filepath, "w") as f:
            json.dump(report, f, indent=2)

collector = TestResultCollector()

def pytest_sessionstart(session):
    collector.start()

@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()
    if report.when == "call":
        collector.add_result(
            name=item.name,
            status=report.outcome,
            duration=report.duration,
            error=report.longrepr if report.failed else None,
        )

def pytest_sessionfinish(session, exitstatus):
    collector.save()`,
            tip: 'Custom reports let you integrate test results with your existing dashboards, Slack notifications, or project management tools.',
          },
          {
            heading: 'Screenshots on Failure in Reports',
            content:
              'The most useful enhancement to any test report is automatic screenshot capture on failure. Whether you use pytest-html, Allure, or a custom solution, embedding a screenshot of the browser state at the moment of failure dramatically speeds up debugging.',
            code: `# conftest.py -- universal screenshot-on-failure fixture
import pytest
import os
from datetime import datetime

@pytest.fixture(autouse=True)
def capture_failure_screenshot(request, browser):
    """Automatically capture screenshot when a test fails."""
    yield
    # This runs after the test
    if request.node.rep_call and request.node.rep_call.failed:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        test_name = request.node.name.replace("[", "_").replace("]", "")
        screenshot_dir = "reports/screenshots"
        os.makedirs(screenshot_dir, exist_ok=True)

        # Save screenshot file
        path = f"{screenshot_dir}/{test_name}_{timestamp}.png"
        browser.save_screenshot(path)

        # Also save page source for debugging
        html_path = f"{screenshot_dir}/{test_name}_{timestamp}.html"
        with open(html_path, "w") as f:
            f.write(browser.page_source)

        # Log the current URL
        print(f"\\nFailure URL: {browser.current_url}")
        print(f"Screenshot: {path}")
        print(f"Page source: {html_path}")

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    rep = outcome.get_result()
    setattr(item, f"rep_{rep.when}", rep)`,
            tip: 'Save both the screenshot AND the page HTML source on failure. The HTML source helps debug issues that screenshots alone cannot reveal (like hidden elements or JavaScript state).',
          },
        ],
        quiz: [
          {
            question: 'Which command generates an HTML report using pytest-html?',
            options: [
              'pytest --report html',
              'pytest --html=report.html',
              'pytest --generate-html',
              'pytest --output report.html',
            ],
            correctIndex: 1,
            explanation:
              'The pytest-html plugin uses --html=filename.html to specify the output report file. Add --self-contained-html for a single portable file.',
          },
          {
            question: 'What does allure.step() do in a test?',
            options: [
              'It pauses the test for debugging',
              'It creates a named step in the Allure report for readability',
              'It skips the next test step',
              'It runs the step in a separate thread',
            ],
            correctIndex: 1,
            explanation:
              'allure.step() wraps a block of code as a named step in the report, breaking the test into a readable sequence of actions in the Allure UI.',
          },
          {
            question: 'Why should you save page source along with screenshots on failure?',
            options: [
              'Page source files are smaller than screenshots',
              'It helps debug hidden elements and JS state not visible in screenshots',
              'Page source is required by pytest',
              'Screenshots cannot capture text content',
            ],
            correctIndex: 1,
            explanation:
              'Page source reveals hidden elements, JavaScript variables, and DOM structure that may not be visible in a screenshot alone, providing a more complete debugging picture.',
          },
        ],
        challenge: {
          prompt:
            'Write a pytest hook function (for conftest.py) that embeds a base64 screenshot into the pytest-html report when a test fails. Use pytest_runtest_makereport hook with the extras mechanism.',
          starterCode: `import pytest

# This goes in conftest.py
@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    # Get the test report
    # Check if it is a call-phase failure
    # Get the browser fixture
    # Capture screenshot as base64
    # Add as extra image to the report
    pass`,
          solutionCode: `import pytest

@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()
    extras = getattr(report, "extras", [])

    if report.when == "call" and report.failed:
        driver = item.funcargs.get("browser")
        if driver:
            screenshot_b64 = driver.get_screenshot_as_base64()
            extras.append(
                pytest.html.extras.image(screenshot_b64, "Failure Screenshot")
            )
            extras.append(
                pytest.html.extras.url(driver.current_url, "Failure URL")
            )
    report.extras = extras`,
          hints: [
            'Use yield to get the test outcome, then outcome.get_result() for the report.',
            'Check report.when == "call" and report.failed to target only test failures.',
            'Access the browser through item.funcargs.get("browser").',
          ],
        },
      },
    ],
  },

  /* ================================================================== */
  /*  Category 10: Advanced Topics                                     */
  /* ================================================================== */
  {
    id: 'advanced-topics',
    label: 'Advanced Topics',
    icon: 'Settings',
    entries: [
      /* ------------------------------------------------------------ */
      /*  Selenium Grid                                               */
      /* ------------------------------------------------------------ */
      {
        id: 'selenium-grid',
        title: 'Selenium Grid',
        difficulty: 'advanced',
        tags: ['grid', 'parallel', 'docker', 'remote-webdriver'],
        sections: [
          {
            heading: 'Hub and Node Architecture',
            content:
              'Selenium Grid is a server infrastructure that lets you run tests across multiple machines and browsers in parallel. The Hub acts as the central point that receives test requests and routes them to available Nodes. Nodes register with the Hub and host the actual browser instances. In Selenium 4, the Grid architecture has been modernized with separate Router, Distributor, Session Map, and Node components, though it still supports the simple Hub-Node setup.',
            code: `# Start a standalone Grid (Hub + Node in one process)
# Terminal:  java -jar selenium-server-4.x.jar standalone

# Or start Hub and Node separately:
# Terminal 1:  java -jar selenium-server-4.x.jar hub
# Terminal 2:  java -jar selenium-server-4.x.jar node --hub http://localhost:4444

# Connect from Python using Remote WebDriver
from selenium import webdriver
from selenium.webdriver.common.by import By

options = webdriver.ChromeOptions()
options.add_argument("--start-maximized")

driver = webdriver.Remote(
    command_executor="http://localhost:4444/wd/hub",
    options=options,
)

driver.get("https://example.com")
print(f"Title: {driver.title}")
print(f"Session ID: {driver.session_id}")
driver.quit()`,
            output: `Title: Example Domain
Session ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890`,
            analogy:
              'Selenium Grid is like a call center. The Hub is the phone switchboard that receives incoming calls (test requests) and routes them to available operators (Nodes). Each operator can handle one call at a time per phone line (browser slot).',
          },
          {
            heading: 'Docker-Based Grid Setup',
            content:
              'Docker is the most convenient way to run Selenium Grid. The official selenium/hub and selenium/node-chrome images make it trivial to spin up a grid. Docker Compose lets you define the entire grid infrastructure in a single YAML file.',
            code: `# docker-compose.yml
# version: "3"
# services:
#   hub:
#     image: selenium/hub:4.15
#     ports:
#       - "4442:4442"
#       - "4443:4443"
#       - "4444:4444"
#
#   chrome:
#     image: selenium/node-chrome:4.15
#     depends_on:
#       - hub
#     environment:
#       - SE_EVENT_BUS_HOST=hub
#       - SE_EVENT_BUS_PUBLISH_PORT=4442
#       - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
#       - SE_NODE_MAX_SESSIONS=4
#     shm_size: "2gb"
#
#   firefox:
#     image: selenium/node-firefox:4.15
#     depends_on:
#       - hub
#     environment:
#       - SE_EVENT_BUS_HOST=hub
#       - SE_EVENT_BUS_PUBLISH_PORT=4442
#       - SE_EVENT_BUS_SUBSCRIBE_PORT=4443

# Start:  docker-compose up -d
# Scale:  docker-compose up -d --scale chrome=5

# Connect from Python
from selenium import webdriver

chrome_options = webdriver.ChromeOptions()
driver = webdriver.Remote(
    command_executor="http://localhost:4444/wd/hub",
    options=chrome_options,
)
print(f"Running on: {driver.capabilities['browserName']}")
driver.quit()`,
            output: `Running on: chrome`,
            tip: 'Set shm_size: "2gb" for Chrome nodes to prevent crashes caused by insufficient shared memory, which is a common Docker issue with Chrome.',
          },
          {
            heading: 'Parallel Test Execution',
            content:
              'The real power of Selenium Grid is running tests in parallel. Use pytest-xdist to distribute tests across multiple processes, each connecting to the Grid. This can reduce a 1-hour test suite to minutes.',
            code: `# Install:  pip install pytest-xdist
# Run:      pytest -n 4 --dist=loadgroup tests/

# conftest.py for parallel execution
import pytest
from selenium import webdriver

@pytest.fixture
def browser():
    """Each parallel worker gets its own browser session on the Grid."""
    options = webdriver.ChromeOptions()
    driver = webdriver.Remote(
        command_executor="http://localhost:4444/wd/hub",
        options=options,
    )
    driver.implicitly_wait(10)
    yield driver
    driver.quit()

# Tests run in parallel across 4 workers
# pytest -n 4 tests/

# Group related tests to run on the same worker
@pytest.mark.xdist_group("checkout")
class TestCheckoutFlow:
    def test_add_to_cart(self, browser):
        pass

    def test_apply_coupon(self, browser):
        pass

    def test_complete_purchase(self, browser):
        pass`,
            note: 'Ensure your tests are independent -- they should not share state, database rows, or rely on execution order. Parallel tests that depend on each other will fail randomly.',
          },
          {
            heading: 'Remote WebDriver Capabilities',
            content:
              'When connecting to a Remote WebDriver, you can specify desired browser capabilities including browser version, platform, and custom options. The Grid matches your request to an available node that satisfies the requirements.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

# Chrome with specific options
chrome_opts = webdriver.ChromeOptions()
chrome_opts.add_argument("--window-size=1920,1080")
chrome_opts.set_capability("browserVersion", "120")
chrome_opts.set_capability("platformName", "linux")

chrome = webdriver.Remote(
    command_executor="http://grid-host:4444/wd/hub",
    options=chrome_opts,
)

# Firefox
firefox_opts = webdriver.FirefoxOptions()
firefox_opts.set_capability("browserVersion", "121")

firefox = webdriver.Remote(
    command_executor="http://grid-host:4444/wd/hub",
    options=firefox_opts,
)

# Check the Grid status via API
import requests
status = requests.get("http://grid-host:4444/wd/hub/status").json()
print(f"Grid ready: {status['value']['ready']}")

chrome.quit()
firefox.quit()`,
            output: `Grid ready: True`,
            tip: 'Use the Grid UI at http://localhost:4444/ui to monitor active sessions, queue length, and node availability in real time.',
          },
        ],
        quiz: [
          {
            question: 'What role does the Hub play in Selenium Grid?',
            options: [
              'It runs the actual browser instances',
              'It routes test requests to available Nodes',
              'It compiles test code',
              'It generates test reports',
            ],
            correctIndex: 1,
            explanation:
              'The Hub acts as the central router that receives Remote WebDriver requests and distributes them to Nodes that match the requested capabilities.',
          },
          {
            question: 'Which tool distributes pytest tests across parallel processes?',
            options: ['pytest-parallel', 'pytest-xdist', 'pytest-grid', 'pytest-multi'],
            correctIndex: 1,
            explanation:
              'pytest-xdist is the standard plugin for parallel test execution. Use pytest -n <workers> to specify the number of parallel processes.',
          },
          {
            question: 'What Docker setting prevents Chrome crashes in containers?',
            options: [
              'memory_limit: 4gb',
              'shm_size: 2gb',
              'cpu_shares: 1024',
              'privileged: true',
            ],
            correctIndex: 1,
            explanation:
              'Chrome uses /dev/shm (shared memory) extensively. Docker defaults to 64MB which is insufficient, causing crashes. Setting shm_size: 2gb provides adequate shared memory.',
          },
        ],
        challenge: {
          prompt:
            'Write a pytest fixture that connects to a Selenium Grid and supports running tests on both Chrome and Firefox via parametrize. The fixture should accept a "browser_name" parameter, create the appropriate options, connect to the Grid at http://localhost:4444/wd/hub, and clean up afterward.',
          starterCode: `import pytest
from selenium import webdriver

@pytest.fixture(params=["chrome", "firefox"])
def browser(request):
    # Get browser name from parameter
    # Create appropriate options object
    # Connect to Remote WebDriver
    # Yield driver
    # Quit driver
    pass`,
          solutionCode: `import pytest
from selenium import webdriver

@pytest.fixture(params=["chrome", "firefox"])
def browser(request):
    browser_name = request.param

    if browser_name == "chrome":
        options = webdriver.ChromeOptions()
    elif browser_name == "firefox":
        options = webdriver.FirefoxOptions()
    else:
        raise ValueError(f"Unsupported browser: {browser_name}")

    driver = webdriver.Remote(
        command_executor="http://localhost:4444/wd/hub",
        options=options,
    )
    driver.implicitly_wait(10)
    yield driver
    driver.quit()`,
          hints: [
            'Use @pytest.fixture(params=["chrome", "firefox"]) to parametrize the fixture.',
            'Access the current parameter via request.param.',
            'Use webdriver.ChromeOptions() or webdriver.FirefoxOptions() based on the parameter.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  JavaScript Execution                                        */
      /* ------------------------------------------------------------ */
      {
        id: 'javascript-execution',
        title: 'JavaScript Execution',
        difficulty: 'intermediate',
        tags: ['javascript', 'execute-script', 'dom-manipulation'],
        sections: [
          {
            heading: 'Synchronous JavaScript with execute_script',
            content:
              'Selenium\'s execute_script() method injects and runs JavaScript code in the browser context. It is synchronous -- Selenium waits for the script to complete before continuing. This is your escape hatch for interactions that Selenium cannot handle natively, such as manipulating hidden elements, scrolling, or accessing browser APIs.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Execute simple JavaScript and get a return value
title = driver.execute_script("return document.title;")
print(f"Title via JS: {title}")

# Scroll to the bottom of the page
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

# Scroll a specific element into view
element = driver.find_element(By.ID, "footer")
driver.execute_script("arguments[0].scrollIntoView(true);", element)

# Change element style (e.g., highlight for debugging)
driver.execute_script(
    "arguments[0].style.border = '3px solid red';", element
)

# Get computed CSS property
color = driver.execute_script(
    "return window.getComputedStyle(arguments[0]).color;", element
)
print(f"Footer text color: {color}")

driver.quit()`,
            output: `Title via JS: Example Domain
Footer text color: rgb(0, 0, 0)`,
            analogy:
              'execute_script is like having a direct phone line to the browser\'s JavaScript engine. You can ask it to do anything a developer could do in the browser console, all from your Python test.',
            tip: 'Pass WebElements to JavaScript using arguments[0], arguments[1], etc. Selenium automatically converts Python WebElement objects to their DOM references.',
          },
          {
            heading: 'Asynchronous JavaScript with execute_async_script',
            content:
              'For JavaScript that uses callbacks or needs to wait for asynchronous operations, use execute_async_script(). It provides a callback function as the last argument that your script must call when done. Selenium waits until the callback is invoked or the script timeout is reached.',
            code: `from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://example.com")

# Set async script timeout
driver.set_script_timeout(10)

# Wait for a specific condition asynchronously
result = driver.execute_async_script("""
    const callback = arguments[arguments.length - 1];
    // Simulate an async operation
    setTimeout(function() {
        callback("Async operation completed!");
    }, 2000);
""")
print(f"Result: {result}")

# Fetch data from an API within the browser context
api_data = driver.execute_async_script("""
    const callback = arguments[arguments.length - 1];
    fetch('/api/status')
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => callback({error: error.message}));
""")
print(f"API response: {api_data}")

driver.quit()`,
            output: `Result: Async operation completed!
API response: {'status': 'ok', 'version': '2.1'}`,
            warning: 'Always call the callback function in execute_async_script. If you forget, Selenium will hang until the script timeout expires and then raise a TimeoutException.',
          },
          {
            heading: 'Common JavaScript Patterns',
            content:
              'Here is a collection of frequently used JavaScript snippets for Selenium automation. These cover common scenarios that pure Selenium commands cannot handle elegantly.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# 1. Remove an element (useful for dismissing overlays)
driver.execute_script("""
    const el = document.querySelector('.cookie-banner');
    if (el) el.remove();
""")

# 2. Set a hidden input value
driver.execute_script(
    "document.getElementById('hidden-token').value = 'abc123';"
)

# 3. Trigger a click on an element obscured by another
button = driver.find_element(By.ID, "submit-btn")
driver.execute_script("arguments[0].click();", button)

# 4. Get all local storage data
storage = driver.execute_script(
    "return JSON.stringify(localStorage);"
)
print(f"Local storage: {storage}")

# 5. Wait for jQuery AJAX to complete
driver.execute_script("""
    return (typeof jQuery !== 'undefined')
        ? jQuery.active === 0
        : true;
""")

# 6. Disable CSS animations for faster tests
driver.execute_script("""
    const style = document.createElement('style');
    style.textContent = '*, *::before, *::after { '
        + 'animation-duration: 0s !important; '
        + 'transition-duration: 0s !important; }';
    document.head.appendChild(style);
""")`,
            tip: 'Disabling CSS animations at the start of each test can significantly reduce flakiness caused by elements moving during interaction.',
          },
          {
            heading: 'Returning Complex Data from JavaScript',
            content:
              'execute_script can return various JavaScript types back to Python. Primitives (strings, numbers, booleans, null) convert naturally. Arrays become Python lists, objects become dicts, and WebElements become Selenium WebElement objects.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Return an array of objects
links = driver.execute_script("""
    return Array.from(document.querySelectorAll('a')).map(a => ({
        text: a.textContent.trim(),
        href: a.href,
        visible: a.offsetParent !== null,
    }));
""")
for link in links[:3]:
    print(f"  {link['text']}: {link['href']} (visible: {link['visible']})")

# Return a WebElement from JavaScript
header = driver.execute_script(
    "return document.querySelector('h1');"
)
print(f"Header tag: {header.tag_name}")
print(f"Header text: {header.text}")

# Return nested data structure
page_info = driver.execute_script("""
    return {
        url: window.location.href,
        dimensions: {
            width: window.innerWidth,
            height: window.innerHeight,
        },
        cookies: document.cookie.split(';').length,
    };
""")
print(f"Window size: {page_info['dimensions']}")

driver.quit()`,
            output: `  More information...: https://www.iana.org/domains/example (visible: True)
Header tag: h1
Header text: Example Domain
Window size: {'width': 1920, 'height': 969}`,
            note: 'Date objects, functions, and Promises cannot be directly returned. Convert them to serializable types (strings, numbers) before returning.',
          },
        ],
        quiz: [
          {
            question: 'How do you pass a WebElement to a JavaScript snippet in execute_script?',
            options: [
              'Use ${element} in the JS string',
              'Pass it as an additional argument and access via arguments[0]',
              'Use driver.inject_element(element)',
              'Convert it to a CSS selector first',
            ],
            correctIndex: 1,
            explanation:
              'Additional arguments passed to execute_script() are available inside the JavaScript as arguments[0], arguments[1], etc. WebElements are automatically converted to DOM element references.',
          },
          {
            question: 'What happens if you forget to call the callback in execute_async_script?',
            options: [
              'The script returns None immediately',
              'The browser crashes',
              'Selenium waits until the script timeout and raises TimeoutException',
              'The test passes silently',
            ],
            correctIndex: 2,
            explanation:
              'execute_async_script waits for the callback to be invoked. Without it, Selenium blocks until the script timeout expires, then raises a TimeoutException.',
          },
          {
            question: 'What Python type does a JavaScript object become when returned from execute_script?',
            options: ['A string (JSON)', 'A Python dict', 'A JavaScript Object', 'A WebElement'],
            correctIndex: 1,
            explanation:
              'Selenium automatically converts JavaScript objects to Python dictionaries, arrays to lists, and primitives to their Python equivalents.',
          },
        ],
        challenge: {
          prompt:
            'Write a helper function called js_click(driver, locator) that finds an element using the locator and clicks it via JavaScript instead of Selenium\'s native click. Also write js_set_value(driver, locator, value) that sets an input\'s value via JavaScript and dispatches an "input" event so frameworks like React detect the change.',
          starterCode: `from selenium.webdriver.common.by import By

def js_click(driver, locator):
    """Click an element using JavaScript."""
    pass

def js_set_value(driver, locator, value):
    """Set input value via JS and trigger input event."""
    pass`,
          solutionCode: `from selenium.webdriver.common.by import By

def js_click(driver, locator):
    """Click an element using JavaScript."""
    element = driver.find_element(*locator)
    driver.execute_script("arguments[0].click();", element)

def js_set_value(driver, locator, value):
    """Set input value via JS and trigger input event."""
    element = driver.find_element(*locator)
    driver.execute_script("""
        arguments[0].value = arguments[1];
        arguments[0].dispatchEvent(new Event('input', { bubbles: true }));
        arguments[0].dispatchEvent(new Event('change', { bubbles: true }));
    """, element, value)`,
          hints: [
            'Find the element with driver.find_element(*locator) first, then pass it to execute_script.',
            'For js_click, use arguments[0].click() in the JavaScript.',
            'Dispatch both "input" and "change" events with {bubbles: true} so React/Vue detect the value change.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  Cookie Management                                           */
      /* ------------------------------------------------------------ */
      {
        id: 'cookie-management',
        title: 'Cookie Management',
        difficulty: 'intermediate',
        tags: ['cookies', 'session', 'authentication', 'storage'],
        sections: [
          {
            heading: 'Reading Cookies with get_cookies',
            content:
              'Selenium provides full access to browser cookies. The get_cookies() method returns all cookies for the current domain as a list of dictionaries. Each dictionary contains the cookie name, value, domain, path, expiry, and security flags.',
            code: `from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://example.com")

# Get all cookies
all_cookies = driver.get_cookies()
print(f"Total cookies: {len(all_cookies)}")

for cookie in all_cookies:
    print(f"  Name: {cookie['name']}")
    print(f"  Value: {cookie['value'][:30]}...")
    print(f"  Domain: {cookie.get('domain', 'N/A')}")
    print(f"  Secure: {cookie.get('secure', False)}")
    print()

# Get a specific cookie by name
session_cookie = driver.get_cookie("session_id")
if session_cookie:
    print(f"Session ID: {session_cookie['value']}")
else:
    print("No session cookie found")`,
            output: `Total cookies: 3
  Name: _ga
  Value: GA1.2.123456789.1234567890...
  Domain: .example.com
  Secure: False

  Name: session_id
  Value: abc123def456...
  Domain: example.com
  Secure: True

Session ID: abc123def456`,
            analogy:
              'Cookies are like wristbands at a theme park. Each one identifies you and grants access to certain areas. get_cookies() lets you inspect all the wristbands the browser is currently wearing.',
          },
          {
            heading: 'Adding and Modifying Cookies',
            content:
              'Use add_cookie() to inject cookies into the browser. This is powerful for bypassing login screens in tests -- instead of filling out the login form every time, you can inject a valid session cookie directly. The cookie must be a dictionary with at minimum "name" and "value" keys.',
            code: `from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://example.com")  # must visit domain first

# Add a simple cookie
driver.add_cookie({
    "name": "test_cookie",
    "value": "hello_selenium",
})

# Add a cookie with full options
driver.add_cookie({
    "name": "session_token",
    "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "domain": "example.com",
    "path": "/",
    "secure": True,
    "httpOnly": True,
    "expiry": 1735689600,  # Unix timestamp
})

# Verify the cookie was added
added = driver.get_cookie("test_cookie")
print(f"Cookie added: {added['name']} = {added['value']}")

# Bypass login by injecting session cookie
driver.add_cookie({
    "name": "auth_session",
    "value": "valid_session_token_from_api",
})
driver.refresh()  # reload page with the new cookie
# Now the browser should be authenticated!`,
            output: `Cookie added: test_cookie = hello_selenium`,
            warning: 'You must navigate to the cookie\'s domain before adding it. Attempting to add a cookie for a domain you have not visited will raise an InvalidCookieDomainException.',
            tip: 'To bypass login, first obtain a valid session token via API call, then inject it as a cookie. This can save 5-10 seconds per test.',
          },
          {
            heading: 'Deleting Cookies',
            content:
              'Selenium provides three methods for cookie deletion: delete_cookie(name) for a specific cookie, delete_all_cookies() for a clean slate, and you can selectively delete cookies to test logged-out behavior or cookie consent flows.',
            code: `from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://example.com")

# Check initial cookies
print(f"Before: {len(driver.get_cookies())} cookies")

# Delete a specific cookie
driver.delete_cookie("_ga")
print("Deleted _ga cookie")

# Delete all cookies
driver.delete_all_cookies()
print(f"After delete_all: {len(driver.get_cookies())} cookies")

# Refresh to see the effect (server may set new cookies)
driver.refresh()
print(f"After refresh: {len(driver.get_cookies())} cookies")

driver.quit()`,
            output: `Before: 5 cookies
Deleted _ga cookie
After delete_all: 0 cookies
After refresh: 2 cookies`,
            note: 'Deleting all cookies and refreshing is a common way to reset the browser to a logged-out state between tests when sharing a browser session.',
          },
          {
            heading: 'Session Management Patterns',
            content:
              'Combining cookie management with API calls creates powerful session management patterns. You can save cookies to a file for reuse across test runs, share authenticated sessions between tests, or test session expiry behavior.',
            code: `import json
from selenium import webdriver

driver = webdriver.Chrome()

def save_cookies(driver, filepath):
    """Save current cookies to a JSON file."""
    cookies = driver.get_cookies()
    with open(filepath, "w") as f:
        json.dump(cookies, f, indent=2)
    print(f"Saved {len(cookies)} cookies to {filepath}")

def load_cookies(driver, filepath, url):
    """Load cookies from a JSON file into the browser."""
    driver.get(url)  # must visit domain first
    with open(filepath, "r") as f:
        cookies = json.load(f)
    for cookie in cookies:
        # Remove problematic fields that some browsers reject
        cookie.pop("sameSite", None)
        try:
            driver.add_cookie(cookie)
        except Exception as e:
            print(f"Skipped cookie {cookie['name']}: {e}")
    driver.refresh()
    print(f"Loaded {len(cookies)} cookies")

# Usage: Login once and save session
driver.get("https://example.com/login")
# ... perform login ...
save_cookies(driver, "session_cookies.json")

# Later: restore session without logging in
load_cookies(driver, "session_cookies.json", "https://example.com")
# Browser is now authenticated!

driver.quit()`,
            tip: 'Saved cookies expire just like normal cookies. Add a timestamp check in load_cookies to re-authenticate when stored cookies are stale.',
          },
        ],
        quiz: [
          {
            question: 'What method retrieves a single cookie by name?',
            options: [
              'driver.get_cookies(name)',
              'driver.get_cookie("name")',
              'driver.find_cookie("name")',
              'driver.cookies["name"]',
            ],
            correctIndex: 1,
            explanation:
              'driver.get_cookie("name") returns a dictionary for the specified cookie, or None if it does not exist. driver.get_cookies() returns all cookies as a list.',
          },
          {
            question: 'What must you do BEFORE calling driver.add_cookie()?',
            options: [
              'Clear all existing cookies',
              'Navigate to the cookie\'s domain',
              'Set the cookie expiry',
              'Enable cookie support in options',
            ],
            correctIndex: 1,
            explanation:
              'The browser must be on the cookie\'s domain before you can add a cookie for it. Attempting to add a cookie for an unvisited domain raises InvalidCookieDomainException.',
          },
          {
            question: 'How can cookies be used to speed up test execution?',
            options: [
              'Cookies make the browser render faster',
              'Injecting session cookies bypasses the login form',
              'Cookies reduce network latency',
              'Cookies cache page content locally',
            ],
            correctIndex: 1,
            explanation:
              'Instead of filling out the login form in every test (5-10 seconds), you can inject a valid session cookie and refresh the page. The server treats the browser as authenticated instantly.',
          },
        ],
        challenge: {
          prompt:
            'Write two functions: save_session(driver, filepath) that saves all cookies and the current URL to a JSON file, and restore_session(driver, filepath) that loads that file, navigates to the saved URL, injects the cookies, and refreshes. Handle the case where the file does not exist gracefully.',
          starterCode: `import json
import os

def save_session(driver, filepath="session.json"):
    """Save cookies and current URL to a file."""
    pass

def restore_session(driver, filepath="session.json"):
    """Restore a saved session. Returns True if successful."""
    pass`,
          solutionCode: `import json
import os

def save_session(driver, filepath="session.json"):
    """Save cookies and current URL to a file."""
    session_data = {
        "url": driver.current_url,
        "cookies": driver.get_cookies(),
    }
    with open(filepath, "w") as f:
        json.dump(session_data, f, indent=2)

def restore_session(driver, filepath="session.json"):
    """Restore a saved session. Returns True if successful."""
    if not os.path.exists(filepath):
        print(f"Session file not found: {filepath}")
        return False

    with open(filepath, "r") as f:
        session_data = json.load(f)

    driver.get(session_data["url"])
    driver.delete_all_cookies()

    for cookie in session_data["cookies"]:
        cookie.pop("sameSite", None)
        try:
            driver.add_cookie(cookie)
        except Exception:
            pass

    driver.refresh()
    return True`,
          hints: [
            'Save both the URL and cookies to the JSON file.',
            'In restore_session, check if the file exists with os.path.exists before loading.',
            'Navigate to the saved URL before adding cookies, and call driver.refresh() after.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  Handling Shadow DOM                                         */
      /* ------------------------------------------------------------ */
      {
        id: 'handling-shadow-dom',
        title: 'Handling Shadow DOM',
        difficulty: 'advanced',
        tags: ['shadow-dom', 'web-components', 'encapsulation'],
        sections: [
          {
            heading: 'Understanding Shadow DOM',
            content:
              'Shadow DOM is a web standard that encapsulates HTML elements inside a "shadow tree" attached to a host element. Elements inside a shadow tree are hidden from regular DOM queries -- driver.find_element() cannot reach them. Many modern web frameworks and component libraries (like Salesforce Lightning, Angular Material, and Shoelace) use Shadow DOM extensively. To interact with these elements, you need to first access the shadow root.',
            code: `# Consider this HTML structure:
# <my-component>
#   #shadow-root (open)
#     <div class="inner">
#       <button id="shadow-btn">Click Me</button>
#     </div>
# </my-component>

# This will NOT work -- element is inside shadow DOM:
# driver.find_element(By.ID, "shadow-btn")
# Raises NoSuchElementException!

# The button is encapsulated inside the shadow root
# and invisible to standard Selenium locators.`,
            analogy:
              'Shadow DOM is like a gated community within a city. Regular mail carriers (find_element) can deliver to houses on public streets but cannot enter the gated area. You need a special access pass (shadow root reference) to reach the houses inside.',
          },
          {
            heading: 'Accessing Shadow Root in Selenium 4',
            content:
              'Selenium 4 introduced native shadow root support via the shadow_root property on WebElements. Once you have the shadow root, you can call find_element() on it to locate elements within the shadow tree. This is the recommended approach for open shadow roots.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/web-components")

# Step 1: Find the shadow host element
shadow_host = driver.find_element(By.CSS_SELECTOR, "my-component")

# Step 2: Access its shadow root
shadow_root = shadow_host.shadow_root

# Step 3: Find elements inside the shadow DOM
shadow_button = shadow_root.find_element(By.CSS_SELECTOR, "#shadow-btn")
shadow_button.click()
print(f"Clicked: {shadow_button.text}")

# Find multiple elements inside shadow DOM
inner_items = shadow_root.find_elements(By.CSS_SELECTOR, ".list-item")
print(f"Found {len(inner_items)} items inside shadow DOM")

driver.quit()`,
            output: `Clicked: Click Me
Found 5 items inside shadow DOM`,
            tip: 'The shadow_root property only works with open shadow roots. Closed shadow roots (mode: "closed") cannot be accessed by Selenium or JavaScript.',
            note: 'shadow_root.find_element() only supports By.CSS_SELECTOR. XPath does not work across shadow boundaries.',
          },
          {
            heading: 'Nested Shadow DOM',
            content:
              'Some applications use nested shadow DOM -- a shadow tree containing another element with its own shadow tree. You must traverse each level sequentially, accessing one shadow root at a time.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/nested-components")

# HTML structure:
# <outer-component>
#   #shadow-root
#     <inner-component>
#       #shadow-root
#         <button id="deep-btn">Deep Button</button>

# Traverse level by level
outer_host = driver.find_element(By.CSS_SELECTOR, "outer-component")
outer_shadow = outer_host.shadow_root

inner_host = outer_shadow.find_element(By.CSS_SELECTOR, "inner-component")
inner_shadow = inner_host.shadow_root

deep_button = inner_shadow.find_element(By.CSS_SELECTOR, "#deep-btn")
deep_button.click()
print(f"Clicked deep button: {deep_button.text}")

# Helper function for deep shadow DOM traversal
def find_in_shadow(driver, *selectors):
    """Traverse nested shadow DOMs using a chain of CSS selectors."""
    element = driver
    for i, selector in enumerate(selectors):
        if i < len(selectors) - 1:
            host = element.find_element(By.CSS_SELECTOR, selector)
            element = host.shadow_root
        else:
            element = element.find_element(By.CSS_SELECTOR, selector)
    return element

# Usage: find_in_shadow(driver, "outer-component", "inner-component", "#deep-btn")
btn = find_in_shadow(driver, "outer-component", "inner-component", "#deep-btn")
print(f"Found via helper: {btn.text}")

driver.quit()`,
            output: `Clicked deep button: Deep Button
Found via helper: Deep Button`,
            warning: 'Deeply nested shadow DOM (3+ levels) can make tests very fragile. If possible, work with the development team to add data-testid attributes on shadow hosts.',
          },
          {
            heading: 'JavaScript Fallback for Shadow DOM',
            content:
              'If the native shadow_root property does not work (e.g., older Selenium versions or special browser configurations), you can use JavaScript as a fallback. The execute_script approach works across all Selenium versions and can handle complex shadow DOM traversals in a single call.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/web-components")

# JavaScript approach -- works in all Selenium versions
shadow_element = driver.execute_script("""
    const host = document.querySelector('my-component');
    return host.shadowRoot.querySelector('#shadow-btn');
""")
shadow_element.click()

# One-liner for nested shadow DOM
deep_element = driver.execute_script("""
    return document
        .querySelector('outer-component').shadowRoot
        .querySelector('inner-component').shadowRoot
        .querySelector('#deep-btn');
""")
print(f"Deep element text: {deep_element.text}")

# Reusable JS helper function
def js_find_in_shadow(driver, *css_selectors):
    """Find element through shadow DOM chain using JavaScript."""
    js_chain = "return document"
    for i, selector in enumerate(css_selectors):
        if i < len(css_selectors) - 1:
            js_chain += f".querySelector('{selector}').shadowRoot"
        else:
            js_chain += f".querySelector('{selector}')"
    js_chain += ";"
    return driver.execute_script(js_chain)

# Usage
btn = js_find_in_shadow(driver, "outer-component", "inner-component", "#deep-btn")
print(f"JS helper found: {btn.text}")

driver.quit()`,
            output: `Deep element text: Deep Button
JS helper found: Deep Button`,
            tip: 'The JavaScript approach is more flexible and can be extended to handle dynamic shadow DOM content. Use it as a fallback when the native shadow_root property is insufficient.',
          },
        ],
        quiz: [
          {
            question: 'Why can\'t standard find_element() locate elements inside a shadow DOM?',
            options: [
              'Shadow DOM elements do not have HTML tags',
              'Shadow DOM encapsulates its elements, hiding them from the main DOM tree',
              'find_element() only works with visible elements',
              'Shadow DOM is not supported by Chrome',
            ],
            correctIndex: 1,
            explanation:
              'Shadow DOM creates an encapsulated subtree that is isolated from the main document DOM. Standard queries operate on the main DOM and cannot pierce the shadow boundary.',
          },
          {
            question: 'Which locator strategy works with shadow_root.find_element()?',
            options: [
              'By.XPATH',
              'By.ID',
              'By.CSS_SELECTOR',
              'All of the above',
            ],
            correctIndex: 2,
            explanation:
              'Selenium\'s shadow_root.find_element() only supports By.CSS_SELECTOR. XPath does not work across shadow DOM boundaries, and By.ID is not supported directly on shadow roots.',
          },
          {
            question: 'Can Selenium access a closed shadow root (mode: "closed")?',
            options: [
              'Yes, using shadow_root property',
              'Yes, using execute_script',
              'No, closed shadow roots are inaccessible by design',
              'Yes, using By.SHADOW_CSS locator',
            ],
            correctIndex: 2,
            explanation:
              'Closed shadow roots (created with {mode: "closed"}) return null for shadowRoot in JavaScript and are inaccessible through Selenium. This is by design for security-sensitive components.',
          },
          {
            question: 'What is the correct order to access an element inside nested shadow DOM?',
            options: [
              'Find the deepest element first, then traverse up',
              'Find each shadow host, access its shadow_root, then find the next host',
              'Use a single CSS selector with shadow-piercing combinators',
              'Use XPath with shadow namespace',
            ],
            correctIndex: 1,
            explanation:
              'You must traverse shadow DOM level by level: find the outer host, get its shadow root, find the inner host within that root, get its shadow root, and so on until you reach the target element.',
          },
        ],
        challenge: {
          prompt:
            'Create a ShadowDOMHelper class with two methods: find_element(driver, *shadow_selectors) that traverses a chain of shadow hosts and returns the final element, and find_elements(driver, *shadow_selectors) that returns all matching elements at the final shadow level. The last selector in the chain is the target element; all preceding selectors are shadow host selectors.',
          starterCode: `from selenium.webdriver.common.by import By

class ShadowDOMHelper:

    @staticmethod
    def find_element(driver, *shadow_selectors):
        """Traverse shadow DOM chain and return the target element.
        All selectors except the last are shadow hosts.
        The last selector is the target element.
        """
        pass

    @staticmethod
    def find_elements(driver, *shadow_selectors):
        """Same as find_element but returns all matches at the final level."""
        pass`,
          solutionCode: `from selenium.webdriver.common.by import By

class ShadowDOMHelper:

    @staticmethod
    def find_element(driver, *shadow_selectors):
        """Traverse shadow DOM chain and return the target element."""
        current = driver
        for i, selector in enumerate(shadow_selectors):
            if i < len(shadow_selectors) - 1:
                host = current.find_element(By.CSS_SELECTOR, selector)
                current = host.shadow_root
            else:
                return current.find_element(By.CSS_SELECTOR, selector)

    @staticmethod
    def find_elements(driver, *shadow_selectors):
        """Same as find_element but returns all matches at the final level."""
        current = driver
        for i, selector in enumerate(shadow_selectors):
            if i < len(shadow_selectors) - 1:
                host = current.find_element(By.CSS_SELECTOR, selector)
                current = host.shadow_root
            else:
                return current.find_elements(By.CSS_SELECTOR, selector)`,
          hints: [
            'Iterate through selectors. For all but the last, find the host and get its shadow_root.',
            'For the last selector, call find_element (or find_elements) on the current shadow root.',
            'Use By.CSS_SELECTOR since shadow roots only support CSS selectors.',
          ],
        },
      },
    ],
  },
];
