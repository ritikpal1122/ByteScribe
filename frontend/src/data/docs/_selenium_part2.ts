import type { DocCategory } from './types';

export const SELENIUM_PART2_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Waits & Synchronization                                      */
  /* ------------------------------------------------------------ */
  {
    id: 'waits-synchronization',
    label: 'Waits & Synchronization',
    icon: 'Clock',
    entries: [
      {
        id: 'sel-wait-implicit',
        title: 'Implicit Waits',
        difficulty: 'beginner',
        tags: ['selenium', 'waits', 'implicit', 'synchronization'],
        sections: [
          {
            heading: 'What Are Implicit Waits?',
            content:
              'Implicit waits tell Selenium to poll the DOM for a certain amount of time when trying to find an element that is not immediately available. Once set, the implicit wait applies to every element lookup for the lifetime of the WebDriver instance. If the element appears before the timeout, execution continues immediately — Selenium does not wait the full duration unnecessarily.\n\nThis is the simplest form of waiting in Selenium and is set once at the beginning of your script. The default implicit wait is 0 seconds, meaning Selenium throws a NoSuchElementException immediately if an element is not found.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()

# Set implicit wait to 10 seconds
driver.implicitly_wait(10)

driver.get("https://example.com")

# Selenium will poll the DOM for up to 10 seconds
# before throwing NoSuchElementException
element = driver.find_element(By.ID, "dynamic-content")
print(element.text)

driver.quit()`,
            output: `# If element appears within 10 seconds:
Dynamic content loaded successfully

# If element never appears after 10 seconds:
# NoSuchElementException is raised`,
            tip: 'Set implicit wait once after creating the driver. Setting it multiple times can lead to unpredictable behavior.',
            analogy: 'Implicit wait is like telling a waiter "I will wait up to 10 minutes for my table." The waiter checks periodically, and seats you as soon as a table opens — you do not necessarily wait the full 10 minutes.',
          },
          {
            heading: 'How Implicit Waits Work Internally',
            content:
              'When an implicit wait is set, every call to find_element or find_elements will poll the DOM at regular intervals (typically every 500ms) until the element is found or the timeout expires. This polling happens at the driver level, not in your Python code.\n\nImplicit waits only apply to element finding operations. They do not wait for elements to become visible, clickable, or interactable. An element that exists in the DOM but is hidden will still be found by an implicit wait, even though you cannot interact with it.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
driver.implicitly_wait(5)
driver.get("https://example.com")

# Timing how long the wait actually takes
start = time.time()

try:
    # Element that does not exist - will wait full 5 seconds
    driver.find_element(By.ID, "nonexistent")
except Exception as e:
    elapsed = time.time() - start
    print(f"Waited {elapsed:.1f}s before failing")
    print(f"Error: {type(e).__name__}")

driver.quit()`,
            output: `Waited 5.0s before failing
Error: NoSuchElementException`,
            note: 'Implicit waits apply globally. If you set it to 10 seconds and then try to verify an element does NOT exist, your test will slow down by 10 seconds for each such check.',
          },
          {
            heading: 'Implicit Wait Pitfalls',
            content:
              'While implicit waits are easy to use, they have significant limitations. The biggest problem is mixing implicit and explicit waits — doing so can lead to unpredictable timeout behavior where waits can stack, causing elements to wait much longer than expected. The Selenium documentation officially recommends against mixing the two.\n\nAnother pitfall is performance. If your test checks for the absence of an element (to verify something was deleted, for example), the implicit wait forces the test to wait the full timeout duration before confirming the element is gone. This can dramatically slow down your test suite.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()

# BAD: Setting a high implicit wait
driver.implicitly_wait(30)

driver.get("https://example.com")

# This check for absence will take 30 seconds!
start = time.time()
elements = driver.find_elements(By.CLASS_NAME, "deleted-item")
elapsed = time.time() - start

print(f"Found {len(elements)} elements")
print(f"Took {elapsed:.1f}s to confirm absence")

# BETTER: Use explicit waits for specific conditions
# and keep implicit wait at 0 or very low
driver.implicitly_wait(0)

driver.quit()`,
            output: `Found 0 elements
Took 30.0s to confirm absence`,
            warning: 'Never mix implicit and explicit waits. Choose one strategy and stick with it. Most professionals prefer explicit waits for their precision and flexibility.',
          },
        ],
        quiz: [
          {
            question: 'What is the default implicit wait time in Selenium?',
            options: ['1 second', '5 seconds', '0 seconds', '10 seconds'],
            correctIndex: 2,
            explanation: 'The default implicit wait is 0 seconds, meaning Selenium immediately throws NoSuchElementException if an element is not found.',
          },
          {
            question: 'What happens if you mix implicit and explicit waits?',
            options: [
              'They work together perfectly',
              'The shorter wait always wins',
              'Unpredictable timeout behavior can occur',
              'Selenium throws a configuration error',
            ],
            correctIndex: 2,
            explanation: 'Mixing implicit and explicit waits can lead to unpredictable stacking of timeouts. The Selenium docs recommend against this.',
          },
          {
            question: 'Implicit waits apply to which operations?',
            options: [
              'All Selenium operations',
              'Only element finding operations',
              'Only click operations',
              'Only page loads',
            ],
            correctIndex: 1,
            explanation: 'Implicit waits only affect find_element and find_elements calls. They do not apply to other operations like clicking or page navigation.',
          },
        ],
        challenge: {
          prompt: 'Write a script that sets an implicit wait of 5 seconds, navigates to "https://example.com", finds an element by ID "main-content", prints its text, then tries to find a non-existent element "missing-element" and handles the error gracefully.',
          starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()

# TODO: Set implicit wait to 5 seconds

# TODO: Navigate to https://example.com

# TODO: Find element by ID "main-content" and print its text

# TODO: Try to find "missing-element" and handle the error

driver.quit()`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.implicitly_wait(5)

driver.get("https://example.com")

content = driver.find_element(By.ID, "main-content")
print(content.text)

try:
    driver.find_element(By.ID, "missing-element")
except Exception as e:
    print(f"Element not found: {type(e).__name__}")

driver.quit()`,
          hints: [
            'Use driver.implicitly_wait(seconds) to set the wait time.',
            'Wrap the missing element lookup in a try/except block.',
            'The exception type is NoSuchElementException.',
          ],
        },
      },
      {
        id: 'sel-wait-explicit',
        title: 'Explicit Waits',
        difficulty: 'intermediate',
        tags: ['selenium', 'waits', 'explicit', 'WebDriverWait', 'expected_conditions'],
        sections: [
          {
            heading: 'Introduction to Explicit Waits',
            content:
              'Explicit waits allow you to wait for a specific condition to be true before proceeding. Unlike implicit waits that apply globally, explicit waits target a particular element or condition. You create a WebDriverWait object with a timeout, then call its until() method with an expected condition.\n\nExplicit waits are the recommended approach for synchronization in Selenium. They are more precise, more flexible, and less prone to timing issues than implicit waits. Professional test automation engineers almost exclusively use explicit waits.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://example.com")

# Wait up to 10 seconds for element to be present in DOM
wait = WebDriverWait(driver, 10)
element = wait.until(
    EC.presence_of_element_located((By.ID, "dynamic-content"))
)
print(element.text)

driver.quit()`,
            output: `Dynamic content loaded successfully`,
            tip: 'Always import expected_conditions as EC — it is the standard convention and makes your code much more readable.',
          },
          {
            heading: 'Common Expected Conditions',
            content:
              'Selenium provides many built-in expected conditions through the expected_conditions module. The most commonly used ones are: presence_of_element_located (element exists in DOM), visibility_of_element_located (element is visible), element_to_be_clickable (element is visible and enabled), and text_to_be_present_in_element (element contains specific text).\n\nEach condition takes a locator tuple like (By.ID, "my-id") and returns the element when the condition is met. If the condition is not met within the timeout, a TimeoutException is raised.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://example.com")
wait = WebDriverWait(driver, 10)

# Wait for element to be present in the DOM
elem = wait.until(EC.presence_of_element_located((By.ID, "content")))

# Wait for element to be visible (not just in DOM)
visible = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".banner")))

# Wait for element to be clickable (visible + enabled)
button = wait.until(EC.element_to_be_clickable((By.ID, "submit-btn")))
button.click()

# Wait for specific text to appear
wait.until(EC.text_to_be_present_in_element((By.ID, "status"), "Success"))

# Wait for title to contain text
wait.until(EC.title_contains("Dashboard"))

print("All conditions met!")
driver.quit()`,
            output: `All conditions met!`,
            note: 'presence_of_element_located checks if the element is in the DOM, but it may be hidden. visibility_of_element_located checks that the element is both in the DOM and visible (has width/height > 0 and is not hidden by CSS).',
          },
          {
            heading: 'Custom Wait Conditions',
            content:
              'You can create custom wait conditions using lambda functions or callable classes. The until() method accepts any callable that takes the driver as an argument and returns a truthy value when the condition is met (or False/None to keep waiting).\n\nThis is powerful for waiting on complex conditions that are not covered by the built-in expected conditions, such as waiting for an element count to change, waiting for an attribute to have a specific value, or waiting for a JavaScript variable to be set.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

driver = webdriver.Chrome()
driver.get("https://example.com")
wait = WebDriverWait(driver, 10)

# Lambda: wait for at least 3 list items
wait.until(lambda d: len(d.find_elements(By.CSS_SELECTOR, "li")) >= 3)

# Lambda: wait for attribute value
wait.until(
    lambda d: d.find_element(By.ID, "loader").get_attribute("class") == "complete"
)

# Lambda: wait for JavaScript variable
wait.until(
    lambda d: d.execute_script("return window.appReady === true")
)

# Custom callable class for reusable conditions
class element_has_attribute:
    def __init__(self, locator, attribute, value):
        self.locator = locator
        self.attribute = attribute
        self.value = value

    def __call__(self, driver):
        element = driver.find_element(*self.locator)
        if element.get_attribute(self.attribute) == self.value:
            return element
        return False

# Use the custom condition
elem = wait.until(
    element_has_attribute((By.ID, "status"), "data-state", "ready")
)
print(f"Element is ready: {elem.text}")

driver.quit()`,
            output: `Element is ready: Loaded`,
            tip: 'When your custom condition finds the element, return the element itself rather than True. This way, the until() call returns the element directly, saving you from having to find it again.',
          },
        ],
        quiz: [
          {
            question: 'What exception is raised when an explicit wait times out?',
            options: ['NoSuchElementException', 'TimeoutException', 'StaleElementReferenceException', 'WaitExpiredException'],
            correctIndex: 1,
            explanation: 'When the condition is not met within the specified timeout, WebDriverWait raises a TimeoutException.',
          },
          {
            question: 'What is the difference between presence_of_element_located and visibility_of_element_located?',
            options: [
              'There is no difference',
              'presence checks DOM existence; visibility also checks the element is rendered and visible',
              'visibility checks DOM existence; presence checks rendering',
              'presence is faster than visibility',
            ],
            correctIndex: 1,
            explanation: 'presence_of_element_located only checks that the element exists in the DOM. visibility_of_element_located also checks that it is displayed (has dimensions > 0 and is not hidden).',
          },
          {
            question: 'What should a custom wait condition return to keep waiting?',
            options: ['True', 'The element', 'False or None', 'A TimeoutException'],
            correctIndex: 2,
            explanation: 'A custom condition should return False or None to continue waiting, and a truthy value (like the element itself) when the condition is satisfied.',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to "https://example.com", uses an explicit wait to wait for an element with class "loaded-content" to become visible, then uses a custom lambda condition to wait until the page title contains "Example".',
          starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://example.com")

# TODO: Create a WebDriverWait with 10 second timeout

# TODO: Wait for element with class "loaded-content" to be visible

# TODO: Wait for page title to contain "Example" using a lambda

driver.quit()`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://example.com")

wait = WebDriverWait(driver, 10)

element = wait.until(
    EC.visibility_of_element_located((By.CLASS_NAME, "loaded-content"))
)
print(f"Found: {element.text}")

wait.until(lambda d: "Example" in d.title)
print(f"Title: {driver.title}")

driver.quit()`,
          hints: [
            'Create WebDriverWait with WebDriverWait(driver, timeout).',
            'Use EC.visibility_of_element_located with a tuple locator.',
            'For the lambda, check if "Example" is in d.title.',
          ],
        },
      },
      {
        id: 'sel-wait-fluent',
        title: 'Fluent Waits',
        difficulty: 'advanced',
        tags: ['selenium', 'waits', 'fluent', 'polling', 'exceptions'],
        sections: [
          {
            heading: 'What Are Fluent Waits?',
            content:
              'Fluent waits are a more configurable version of explicit waits. They allow you to specify the polling frequency (how often to check the condition) and which exceptions to ignore during the wait. In Python Selenium, fluent waits are implemented through WebDriverWait with additional parameters.\n\nBy default, WebDriverWait polls every 500ms and only ignores NoSuchElementException. With fluent configuration, you can poll more or less frequently and ignore additional exceptions like StaleElementReferenceException, which is common when the DOM is being actively modified.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import (
    NoSuchElementException,
    StaleElementReferenceException
)

driver = webdriver.Chrome()
driver.get("https://example.com")

# Fluent wait: poll every 2 seconds, ignore stale elements
wait = WebDriverWait(
    driver,
    timeout=15,
    poll_frequency=2,
    ignored_exceptions=[
        NoSuchElementException,
        StaleElementReferenceException
    ]
)

element = wait.until(
    EC.element_to_be_clickable((By.ID, "dynamic-button"))
)
element.click()
print("Button clicked!")

driver.quit()`,
            output: `Button clicked!`,
            analogy: 'A fluent wait is like checking your phone for a delivery notification. Instead of checking every second (default), you might check every 5 minutes (poll_frequency). And if the app crashes temporarily (StaleElementReferenceException), you just reopen it and keep checking instead of giving up.',
          },
          {
            heading: 'Configuring Poll Frequency',
            content:
              'The poll_frequency parameter controls how often Selenium checks the condition, in seconds. A lower frequency means more frequent checks but more CPU usage, while a higher frequency is more efficient but may introduce slight delays. The default is 0.5 seconds.\n\nChoosing the right polling frequency depends on your use case. For time-sensitive operations, keep it low (0.25-0.5s). For operations where you are waiting for a slow server response, a higher frequency (1-3s) reduces unnecessary overhead.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

driver = webdriver.Chrome()
driver.get("https://example.com")

# Fast polling for responsive UI elements
fast_wait = WebDriverWait(driver, 5, poll_frequency=0.25)

# Slow polling for server-side operations
slow_wait = WebDriverWait(driver, 30, poll_frequency=3)

# Example: Fast wait for a dropdown to appear after click
start = time.time()
try:
    menu = fast_wait.until(
        EC.visibility_of_element_located((By.CLASS_NAME, "dropdown-menu"))
    )
    print(f"Menu found in {time.time() - start:.2f}s")
except Exception:
    print("Menu did not appear")

driver.quit()`,
            output: `Menu found in 0.52s`,
            tip: 'For most test automation, the default 0.5s polling is fine. Only adjust it when you have a specific performance or timing requirement.',
          },
          {
            heading: 'Ignoring Specific Exceptions',
            content:
              'The ignored_exceptions parameter is crucial when dealing with dynamic web pages. StaleElementReferenceException occurs when the DOM changes between finding an element and interacting with it. By ignoring this exception during the wait, Selenium will simply retry the condition instead of crashing.\n\nYou can ignore multiple exception types by passing a list. Common exceptions to ignore include NoSuchElementException (default), StaleElementReferenceException, and ElementNotInteractableException.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import (
    NoSuchElementException,
    StaleElementReferenceException,
    ElementNotInteractableException
)

driver = webdriver.Chrome()
driver.get("https://example.com")

# Wait that handles rapidly changing DOM
robust_wait = WebDriverWait(
    driver,
    timeout=10,
    poll_frequency=0.5,
    ignored_exceptions=[
        NoSuchElementException,
        StaleElementReferenceException,
        ElementNotInteractableException,
    ]
)

# Custom condition: find and click a button that may be re-rendered
def click_dynamic_button(d):
    btn = d.find_element(By.ID, "save-btn")
    btn.click()
    return True

robust_wait.until(click_dynamic_button)
print("Successfully clicked the dynamic button")

driver.quit()`,
            output: `Successfully clicked the dynamic button`,
            warning: 'Be careful not to ignore too many exceptions — you might mask real bugs. Only ignore exceptions that represent transient states you expect during normal page loading.',
          },
        ],
        quiz: [
          {
            question: 'What is the default polling frequency for WebDriverWait?',
            options: ['0.1 seconds', '0.5 seconds', '1 second', '2 seconds'],
            correctIndex: 1,
            explanation: 'WebDriverWait polls every 0.5 seconds (500ms) by default.',
          },
          {
            question: 'When is StaleElementReferenceException commonly encountered?',
            options: [
              'When the browser is closed',
              'When the DOM changes between finding and using an element',
              'When the element has no text',
              'When the network is slow',
            ],
            correctIndex: 1,
            explanation: 'StaleElementReferenceException occurs when the DOM is modified (e.g., by JavaScript) between the time you find an element reference and when you try to use it.',
          },
          {
            question: 'What parameter controls how often Selenium checks the condition?',
            options: ['check_interval', 'poll_frequency', 'retry_delay', 'wait_interval'],
            correctIndex: 1,
            explanation: 'The poll_frequency parameter in WebDriverWait controls how often the condition is checked, specified in seconds.',
          },
        ],
        challenge: {
          prompt: 'Create a fluent wait that polls every 1 second, has a 15-second timeout, and ignores both NoSuchElementException and StaleElementReferenceException. Use it to wait for an element with ID "results-table" to be visible.',
          starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import (
    NoSuchElementException,
    StaleElementReferenceException
)

driver = webdriver.Chrome()
driver.get("https://example.com")

# TODO: Create a fluent wait with the specified configuration

# TODO: Wait for element with ID "results-table" to be visible

driver.quit()`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import (
    NoSuchElementException,
    StaleElementReferenceException
)

driver = webdriver.Chrome()
driver.get("https://example.com")

wait = WebDriverWait(
    driver,
    timeout=15,
    poll_frequency=1,
    ignored_exceptions=[NoSuchElementException, StaleElementReferenceException]
)

table = wait.until(
    EC.visibility_of_element_located((By.ID, "results-table"))
)
print(f"Table found with text: {table.text[:50]}")

driver.quit()`,
          hints: [
            'Pass poll_frequency and ignored_exceptions to WebDriverWait constructor.',
            'Use EC.visibility_of_element_located for the condition.',
            'ignored_exceptions takes a list of exception classes.',
          ],
        },
      },
      {
        id: 'sel-wait-conditions',
        title: 'Common Expected Conditions',
        difficulty: 'intermediate',
        tags: ['selenium', 'expected_conditions', 'EC', 'waits', 'conditions'],
        sections: [
          {
            heading: 'Element State Conditions',
            content:
              'Selenium provides a rich set of expected conditions for checking element states. These range from basic existence checks to complex interaction readiness. Understanding which condition to use is key to writing reliable tests.\n\nThe main element state conditions are: presence_of_element_located (in DOM), visibility_of_element_located (visible on page), invisibility_of_element_located (not visible), element_to_be_clickable (visible and enabled), and staleness_of (element is no longer in DOM).',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)
driver.get("https://example.com")

# Check element exists in DOM (may be hidden)
elem = wait.until(EC.presence_of_element_located((By.ID, "content")))
print(f"Present: {elem.tag_name}")

# Check element is visible to the user
visible = wait.until(EC.visibility_of_element_located((By.ID, "banner")))
print(f"Visible: {visible.text}")

# Check element is ready to be clicked
btn = wait.until(EC.element_to_be_clickable((By.ID, "submit")))
print(f"Clickable: {btn.get_attribute('value')}")

# Wait for a loading spinner to disappear
wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, "spinner")))
print("Spinner gone!")

# Wait for an old element to become stale after page refresh
old_elem = driver.find_element(By.ID, "content")
driver.refresh()
wait.until(EC.staleness_of(old_elem))
print("Page refreshed, old element is stale")

driver.quit()`,
            output: `Present: div
Visible: Welcome to Example
Clickable: Submit
Spinner gone!
Page refreshed, old element is stale`,
          },
          {
            heading: 'Text and Title Conditions',
            content:
              'Expected conditions also cover page-level and text-based checks. These are useful for verifying that navigation completed successfully or that dynamic content has loaded with the expected text.\n\nKey text conditions include: title_is, title_contains, text_to_be_present_in_element, text_to_be_present_in_element_value (for input fields), and url_contains.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)
driver.get("https://example.com")

# Wait for exact page title
wait.until(EC.title_is("Example Domain"))
print(f"Title: {driver.title}")

# Wait for title to contain a substring
wait.until(EC.title_contains("Example"))

# Wait for text in an element
wait.until(
    EC.text_to_be_present_in_element(
        (By.TAG_NAME, "h1"), "Example Domain"
    )
)

# Wait for text in an input field's value attribute
wait.until(
    EC.text_to_be_present_in_element_value(
        (By.ID, "search"), "pre-filled"
    )
)

# Wait for URL to contain a substring
wait.until(EC.url_contains("example"))
print(f"URL: {driver.current_url}")

driver.quit()`,
            output: `Title: Example Domain
URL: https://example.com/`,
          },
          {
            heading: 'Frame and Alert Conditions',
            content:
              'Selenium also provides expected conditions for switching between frames and handling JavaScript alerts. frame_to_be_available_and_switch_to_it both waits for a frame and switches to it in one step. alert_is_present waits for a JavaScript alert dialog to appear.\n\nThese are important because trying to switch to a frame or accept an alert before they exist will throw exceptions. Using expected conditions makes your code robust against timing issues.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)
driver.get("https://example.com")

# Wait for a frame and switch to it
wait.until(
    EC.frame_to_be_available_and_switch_to_it((By.ID, "my-iframe"))
)
print("Switched to iframe")

# Interact inside the frame
content = driver.find_element(By.TAG_NAME, "body").text
print(f"Frame content: {content[:50]}")

# Switch back to default content
driver.switch_to.default_content()

# Wait for alert to appear
wait.until(EC.alert_is_present())
alert = driver.switch_to.alert
print(f"Alert text: {alert.text}")
alert.accept()

driver.quit()`,
            output: `Switched to iframe
Frame content: This content is inside the iframe...
Alert text: Are you sure?`,
            tip: 'frame_to_be_available_and_switch_to_it is one of the most useful conditions — it combines two operations (waiting and switching) that would otherwise require separate steps.',
          },
        ],
        quiz: [
          {
            question: 'Which condition waits for an element to disappear from view?',
            options: [
              'element_to_be_gone',
              'invisibility_of_element_located',
              'absence_of_element',
              'element_not_visible',
            ],
            correctIndex: 1,
            explanation: 'invisibility_of_element_located waits until the element is either not present in the DOM or is present but not visible.',
          },
          {
            question: 'What does staleness_of check?',
            options: [
              'The element text has not changed',
              'The element is old',
              'The element reference is no longer valid (detached from DOM)',
              'The element has stale data',
            ],
            correctIndex: 2,
            explanation: 'staleness_of returns True when the element reference is no longer attached to the DOM, typically after a page refresh or AJAX update.',
          },
          {
            question: 'What does frame_to_be_available_and_switch_to_it do?',
            options: [
              'Only checks if the frame exists',
              'Only switches to the frame',
              'Waits for the frame and switches to it',
              'Creates a new frame',
            ],
            correctIndex: 2,
            explanation: 'This condition both waits for the frame to be available and automatically switches the driver context to it.',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to a page, waits for the title to contain "Dashboard", waits for a loading spinner (class "spinner") to disappear, then waits for a button with ID "action-btn" to be clickable and clicks it.',
          starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://example.com/dashboard")
wait = WebDriverWait(driver, 10)

# TODO: Wait for title to contain "Dashboard"

# TODO: Wait for spinner to disappear

# TODO: Wait for button to be clickable and click it

driver.quit()`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://example.com/dashboard")
wait = WebDriverWait(driver, 10)

wait.until(EC.title_contains("Dashboard"))
print(f"Title: {driver.title}")

wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, "spinner")))
print("Loading complete")

button = wait.until(EC.element_to_be_clickable((By.ID, "action-btn")))
button.click()
print("Button clicked!")

driver.quit()`,
          hints: [
            'Use EC.title_contains("Dashboard") for the title check.',
            'Use EC.invisibility_of_element_located for the spinner.',
            'Use EC.element_to_be_clickable for the button.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Navigation & Windows                                         */
  /* ------------------------------------------------------------ */
  {
    id: 'navigation-windows',
    label: 'Navigation & Windows',
    icon: 'Globe',
    entries: [
      {
        id: 'sel-nav-page',
        title: 'Page Navigation',
        difficulty: 'beginner',
        tags: ['selenium', 'navigation', 'url', 'back', 'forward', 'refresh'],
        sections: [
          {
            heading: 'Basic Navigation Methods',
            content:
              'Selenium provides several methods for navigating between pages. The most common is driver.get(url), which loads a new page and waits for the page load to complete. You can also use driver.back(), driver.forward(), and driver.refresh() to simulate browser navigation buttons.\n\nThe driver.get() method blocks until the page fires its "load" event, which means all resources (images, scripts, stylesheets) have finished loading. This is usually what you want, but for single-page applications that load content dynamically after the initial page load, you may need additional waits.',
            code: `from selenium import webdriver

driver = webdriver.Chrome()

# Navigate to a URL (waits for page load)
driver.get("https://example.com")
print(f"Page: {driver.title}")
print(f"URL: {driver.current_url}")

# Navigate to another page
driver.get("https://example.com/about")
print(f"Page: {driver.title}")

# Go back (like pressing browser back button)
driver.back()
print(f"After back: {driver.current_url}")

# Go forward
driver.forward()
print(f"After forward: {driver.current_url}")

# Refresh the current page
driver.refresh()
print(f"After refresh: {driver.current_url}")

driver.quit()`,
            output: `Page: Example Domain
URL: https://example.com
Page: About - Example
After back: https://example.com
After forward: https://example.com/about
After refresh: https://example.com/about`,
          },
          {
            heading: 'Page Load Strategies',
            content:
              'Selenium supports three page load strategies that control when driver.get() returns: "normal" (default, waits for full page load), "eager" (waits for DOM to be interactive but not all resources), and "none" (returns immediately without waiting). You set the strategy through browser options.\n\nThe "eager" strategy is useful for fast test execution when you do not need all images and stylesheets to load. The "none" strategy gives you full control but requires you to handle all synchronization yourself.',
            code: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# Normal: wait for everything to load (default)
options_normal = Options()
options_normal.page_load_strategy = 'normal'

# Eager: wait for DOM interactive (faster)
options_eager = Options()
options_eager.page_load_strategy = 'eager'

# None: return immediately (fastest, but risky)
options_none = Options()
options_none.page_load_strategy = 'none'

# Example with eager loading
driver = webdriver.Chrome(options=options_eager)
driver.get("https://example.com")
print(f"Loaded with eager strategy: {driver.title}")

driver.quit()`,
            output: `Loaded with eager strategy: Example Domain`,
            tip: 'For most test automation, stick with "normal" page load strategy. Use "eager" when you know your tests only interact with DOM elements and do not depend on external resources like images.',
          },
          {
            heading: 'Getting Page Information',
            content:
              'Beyond navigation, the driver object provides several properties to inspect the current page state. driver.title returns the page title, driver.current_url returns the current URL (which may differ from what you navigated to if there was a redirect), and driver.page_source returns the full HTML source of the page.',
            code: `from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://example.com")

# Current page title
print(f"Title: {driver.title}")

# Current URL (after any redirects)
print(f"URL: {driver.current_url}")

# Page source (HTML)
source = driver.page_source
print(f"Page source length: {len(source)} characters")
print(f"Contains 'Example': {'Example' in source}")

driver.quit()`,
            output: `Title: Example Domain
URL: https://www.example.com/
Page source length: 1256 characters
Contains 'Example': True`,
          },
        ],
        quiz: [
          {
            question: 'What does driver.get() wait for by default?',
            options: [
              'Just the HTML to load',
              'The full page load event (all resources)',
              'Only the DOM to be interactive',
              'It returns immediately',
            ],
            correctIndex: 1,
            explanation: 'With the default "normal" page load strategy, driver.get() waits for the page load event, which fires after all resources (images, scripts, CSS) have finished loading.',
          },
          {
            question: 'Which page load strategy returns immediately without waiting?',
            options: ['normal', 'eager', 'none', 'instant'],
            correctIndex: 2,
            explanation: 'The "none" strategy returns immediately without waiting for any page loading, giving you full control over synchronization.',
          },
          {
            question: 'What does driver.current_url return?',
            options: [
              'The URL you passed to get()',
              'The actual current URL after redirects',
              'The base URL only',
              'The URL without query parameters',
            ],
            correctIndex: 1,
            explanation: 'driver.current_url returns the actual URL the browser is currently on, which may differ from what you originally navigated to if there were redirects.',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to "https://example.com", prints the title and URL, navigates to "https://example.com/about", goes back, and verifies you are back on the original page by checking the URL.',
          starterCode: `from selenium import webdriver

driver = webdriver.Chrome()

# TODO: Navigate to https://example.com and print title + URL

# TODO: Navigate to https://example.com/about

# TODO: Go back and verify the URL

driver.quit()`,
          solutionCode: `from selenium import webdriver

driver = webdriver.Chrome()

driver.get("https://example.com")
print(f"Title: {driver.title}")
print(f"URL: {driver.current_url}")

driver.get("https://example.com/about")
print(f"Navigated to: {driver.current_url}")

driver.back()
print(f"Back to: {driver.current_url}")
assert "example.com" in driver.current_url
print("Verification passed!")

driver.quit()`,
          hints: [
            'Use driver.get(url) to navigate.',
            'Use driver.back() to go back.',
            'Use driver.current_url to check the URL.',
          ],
        },
      },
      {
        id: 'sel-nav-windows',
        title: 'Multiple Windows & Tabs',
        difficulty: 'intermediate',
        tags: ['selenium', 'windows', 'tabs', 'handles', 'switch_to'],
        sections: [
          {
            heading: 'Understanding Window Handles',
            content:
              'Every browser window and tab in Selenium has a unique identifier called a window handle. When you open a new tab or a link opens in a new window, Selenium creates a new handle but stays focused on the original window. You must explicitly switch to the new window to interact with it.\n\ndriver.current_window_handle returns the handle of the currently focused window, and driver.window_handles returns a list of all open window handles.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Get the current window handle
original_window = driver.current_window_handle
print(f"Original handle: {original_window}")

# Check how many windows are open
print(f"Open windows: {len(driver.window_handles)}")

# Click a link that opens a new tab
driver.find_element(By.LINK_TEXT, "Open New Tab").click()

# Now there are two windows
print(f"Open windows: {len(driver.window_handles)}")

# Switch to the new window
for handle in driver.window_handles:
    if handle != original_window:
        driver.switch_to.window(handle)
        break

print(f"New window title: {driver.title}")

# Switch back to original
driver.switch_to.window(original_window)
print(f"Back to: {driver.title}")

driver.quit()`,
            output: `Original handle: CDwindow-ABC123
Open windows: 1
Open windows: 2
New window title: New Page
Back to: Example Domain`,
          },
          {
            heading: 'Opening New Windows and Tabs',
            content:
              'Selenium 4 introduced driver.switch_to.new_window() which lets you programmatically open a new tab or window without clicking a link. You pass either "tab" or "window" as the argument. This is useful for comparing content across pages or testing multi-window workflows.\n\nAfter opening a new window or tab, the driver automatically switches focus to it. You need to store the original handle if you want to switch back.',
            code: `from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://example.com")
original = driver.current_window_handle

# Open a new tab (Selenium 4+)
driver.switch_to.new_window('tab')
driver.get("https://example.com/page2")
print(f"New tab: {driver.title}")

# Open a new window
driver.switch_to.new_window('window')
driver.get("https://example.com/page3")
print(f"New window: {driver.title}")

print(f"Total handles: {len(driver.window_handles)}")

# Close current window and switch back
driver.close()  # Closes current window only
driver.switch_to.window(original)
print(f"Back to original: {driver.title}")

driver.quit()  # Closes all remaining windows`,
            output: `New tab: Page 2
New window: Page 3
Total handles: 3
Back to original: Example Domain`,
            tip: 'driver.close() closes only the current window. driver.quit() closes all windows and ends the session. Always switch to another window before closing the current one if you want to continue.',
          },
          {
            heading: 'Managing Multiple Windows',
            content:
              'When working with multiple windows, it is good practice to store handles with descriptive names and always know which window you are on. A common pattern is to use a dictionary to map meaningful names to window handles.\n\nRemember that window_handles returns handles in the order they were opened. When a window is closed, its handle is removed from the list.',
            code: `from selenium import webdriver

driver = webdriver.Chrome()
windows = {}

# Open main page
driver.get("https://example.com")
windows['main'] = driver.current_window_handle

# Open settings tab
driver.switch_to.new_window('tab')
driver.get("https://example.com/settings")
windows['settings'] = driver.current_window_handle

# Open help tab
driver.switch_to.new_window('tab')
driver.get("https://example.com/help")
windows['help'] = driver.current_window_handle

# Now switch between them by name
driver.switch_to.window(windows['settings'])
print(f"Settings: {driver.title}")

driver.switch_to.window(windows['main'])
print(f"Main: {driver.title}")

# Close help tab
driver.switch_to.window(windows['help'])
driver.close()
del windows['help']

# Switch back to main
driver.switch_to.window(windows['main'])
print(f"Remaining windows: {len(driver.window_handles)}")

driver.quit()`,
            output: `Settings: Settings - Example
Main: Example Domain
Remaining windows: 2`,
          },
        ],
        quiz: [
          {
            question: 'What is a window handle in Selenium?',
            options: [
              'The window title',
              'A unique string identifier for a browser window/tab',
              'The window size',
              'The window URL',
            ],
            correctIndex: 1,
            explanation: 'A window handle is a unique string that identifies each browser window or tab. You use it to switch between windows.',
          },
          {
            question: 'What is the difference between driver.close() and driver.quit()?',
            options: [
              'They are the same',
              'close() closes current window; quit() closes all windows and ends the session',
              'close() minimizes; quit() closes',
              'close() is for tabs; quit() is for windows',
            ],
            correctIndex: 1,
            explanation: 'close() closes only the currently focused window. quit() closes all windows and terminates the WebDriver session.',
          },
          {
            question: 'How do you open a new tab in Selenium 4?',
            options: [
              'driver.new_tab()',
              'driver.open_tab()',
              'driver.switch_to.new_window("tab")',
              'driver.create_tab()',
            ],
            correctIndex: 2,
            explanation: 'Selenium 4 introduced driver.switch_to.new_window("tab") to programmatically open a new tab.',
          },
        ],
        challenge: {
          prompt: 'Write a script that opens "https://example.com", saves the window handle, opens a new tab with "https://example.com/about", prints both titles, then closes the new tab and switches back to the original.',
          starterCode: `from selenium import webdriver

driver = webdriver.Chrome()

# TODO: Navigate to example.com and save the handle

# TODO: Open a new tab and navigate to example.com/about

# TODO: Print the title of the new tab

# TODO: Close the new tab and switch back to original

# TODO: Print the original tab title

driver.quit()`,
          solutionCode: `from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://example.com")
original = driver.current_window_handle
print(f"Original: {driver.title}")

driver.switch_to.new_window('tab')
driver.get("https://example.com/about")
print(f"New tab: {driver.title}")

driver.close()
driver.switch_to.window(original)
print(f"Back to: {driver.title}")

driver.quit()`,
          hints: [
            'Save driver.current_window_handle before opening a new tab.',
            'Use driver.switch_to.new_window("tab") to open a new tab.',
            'Call driver.close() to close the current tab, then switch back.',
          ],
        },
      },
      {
        id: 'sel-nav-frames',
        title: 'Frames & iFrames',
        difficulty: 'intermediate',
        tags: ['selenium', 'frames', 'iframe', 'switch_to'],
        sections: [
          {
            heading: 'Switching to Frames',
            content:
              'Frames and iframes embed separate HTML documents within a page. Selenium cannot see or interact with elements inside a frame until you explicitly switch the driver context to that frame. Think of frames as separate worlds — you must enter the frame\'s world before you can interact with anything inside it.\n\nYou switch to a frame using driver.switch_to.frame(), which accepts a frame element, a frame name/ID string, or a zero-based index.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Switch by frame name or ID attribute
driver.switch_to.frame("my-frame")
print(driver.find_element(By.TAG_NAME, "h1").text)

# Switch back to the main document
driver.switch_to.default_content()

# Switch by frame index (0-based)
driver.switch_to.frame(0)  # First frame on page
print(driver.find_element(By.TAG_NAME, "p").text)

# Switch back
driver.switch_to.default_content()

# Switch by element reference
iframe_elem = driver.find_element(By.CSS_SELECTOR, "iframe.content-frame")
driver.switch_to.frame(iframe_elem)
print(driver.find_element(By.TAG_NAME, "body").text[:50])

driver.switch_to.default_content()
driver.quit()`,
            output: `Frame Heading
Frame paragraph content
Body text inside the content frame...`,
            analogy: 'Frames are like rooms in a building. The main page is the lobby. To interact with anything in a room (frame), you must walk into that room first. You cannot reach into a room from the lobby.',
          },
          {
            heading: 'Nested Frames',
            content:
              'Frames can be nested inside other frames. To access a deeply nested frame, you must switch to each parent frame in sequence. driver.switch_to.parent_frame() moves up one level (to the parent frame), while driver.switch_to.default_content() jumps all the way back to the top-level document.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Switch to outer frame
driver.switch_to.frame("outer-frame")
print("In outer frame")
print(driver.find_element(By.ID, "outer-content").text)

# Switch to inner frame (nested inside outer)
driver.switch_to.frame("inner-frame")
print("In inner frame")
print(driver.find_element(By.ID, "inner-content").text)

# Go up one level to outer frame
driver.switch_to.parent_frame()
print("Back in outer frame")

# Go all the way back to main page
driver.switch_to.default_content()
print("Back in main page")

driver.quit()`,
            output: `In outer frame
Outer frame content
In inner frame
Inner frame content
Back in outer frame
Back in main page`,
            tip: 'When dealing with nested frames, draw a tree of the frame hierarchy. This helps you keep track of where you are and which switch calls you need to make.',
          },
          {
            heading: 'Waiting for Frames',
            content:
              'Frames often load asynchronously, especially in complex web applications. If you try to switch to a frame before it exists, Selenium throws a NoSuchFrameException. Use the expected condition frame_to_be_available_and_switch_to_it to wait for the frame and switch in one step.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://example.com")
wait = WebDriverWait(driver, 10)

# Wait for frame by name/ID and switch
wait.until(EC.frame_to_be_available_and_switch_to_it("dynamic-frame"))
content = driver.find_element(By.TAG_NAME, "body").text
print(f"Frame content: {content[:50]}")

# Switch back to main
driver.switch_to.default_content()

# Wait for frame by CSS locator and switch
wait.until(
    EC.frame_to_be_available_and_switch_to_it(
        (By.CSS_SELECTOR, "iframe[data-id='content']")
    )
)
print("Switched to dynamic iframe")

driver.switch_to.default_content()
driver.quit()`,
            output: `Frame content: Welcome to the dynamic frame content...
Switched to dynamic iframe`,
          },
        ],
        quiz: [
          {
            question: 'What happens if you try to find an element inside an iframe without switching to it first?',
            options: [
              'Selenium finds it automatically',
              'NoSuchElementException is raised',
              'The element is found but read-only',
              'Selenium switches automatically',
            ],
            correctIndex: 1,
            explanation: 'Selenium cannot see elements inside a frame from the main page context. You must explicitly switch to the frame first.',
          },
          {
            question: 'What does driver.switch_to.parent_frame() do?',
            options: [
              'Switches to the main page',
              'Switches up one level in the frame hierarchy',
              'Switches to the first frame',
              'Closes the current frame',
            ],
            correctIndex: 1,
            explanation: 'parent_frame() moves up one level in the frame hierarchy. Use default_content() to go all the way back to the main page.',
          },
          {
            question: 'Which method can you use to both wait for a frame and switch to it?',
            options: [
              'EC.frame_ready()',
              'EC.frame_to_be_available_and_switch_to_it()',
              'EC.switch_to_frame()',
              'EC.wait_for_frame()',
            ],
            correctIndex: 1,
            explanation: 'EC.frame_to_be_available_and_switch_to_it() waits for the frame to exist and automatically switches to it.',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to a page, waits for an iframe with ID "content-frame" to load, switches to it, reads the text of the first <p> element inside, switches back to the main page, and prints the result.',
          starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://example.com")

# TODO: Wait for iframe "content-frame" and switch to it

# TODO: Read text from first <p> element

# TODO: Switch back to main page and print the text

driver.quit()`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://example.com")
wait = WebDriverWait(driver, 10)

wait.until(EC.frame_to_be_available_and_switch_to_it("content-frame"))

text = driver.find_element(By.TAG_NAME, "p").text

driver.switch_to.default_content()
print(f"Frame content: {text}")

driver.quit()`,
          hints: [
            'Use EC.frame_to_be_available_and_switch_to_it("content-frame").',
            'Find the <p> element normally once inside the frame.',
            'Use driver.switch_to.default_content() to return to main page.',
          ],
        },
      },
      {
        id: 'sel-nav-alerts',
        title: 'Handling Alerts',
        difficulty: 'beginner',
        tags: ['selenium', 'alerts', 'confirm', 'prompt', 'dialog'],
        sections: [
          {
            heading: 'JavaScript Alert Dialogs',
            content:
              'JavaScript has three types of popup dialogs: alert (informational message with OK button), confirm (OK/Cancel buttons), and prompt (text input with OK/Cancel). Selenium handles all three through driver.switch_to.alert, which returns an Alert object.\n\nWhen a JavaScript dialog appears, it blocks all interaction with the page until it is dismissed. Your Selenium script must switch to the alert and either accept or dismiss it before continuing.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Trigger a simple alert
driver.find_element(By.ID, "alert-btn").click()

# Switch to the alert
alert = driver.switch_to.alert

# Read the alert text
print(f"Alert says: {alert.text}")

# Accept (click OK)
alert.accept()
print("Alert accepted")

driver.quit()`,
            output: `Alert says: This is an alert message!
Alert accepted`,
          },
          {
            heading: 'Confirm and Prompt Dialogs',
            content:
              'Confirm dialogs have two buttons — OK and Cancel. Use alert.accept() for OK and alert.dismiss() for Cancel. Prompt dialogs additionally have a text input field. Use alert.send_keys() to type text before accepting or dismissing.\n\nThe return value of these dialogs in JavaScript depends on the user action. For confirm, accept returns true and dismiss returns false. For prompt, accept returns the entered text and dismiss returns null.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Handle a confirm dialog
driver.find_element(By.ID, "confirm-btn").click()
confirm = driver.switch_to.alert
print(f"Confirm says: {confirm.text}")
confirm.accept()   # Click OK (returns true to JS)
print("Confirmed!")

# Handle another confirm - this time dismiss it
driver.find_element(By.ID, "confirm-btn").click()
confirm = driver.switch_to.alert
confirm.dismiss()  # Click Cancel (returns false to JS)
print("Dismissed!")

# Handle a prompt dialog
driver.find_element(By.ID, "prompt-btn").click()
prompt = driver.switch_to.alert
print(f"Prompt says: {prompt.text}")
prompt.send_keys("My answer")  # Type in the prompt
prompt.accept()                 # Submit the answer
print("Prompt submitted!")

driver.quit()`,
            output: `Confirm says: Are you sure you want to proceed?
Confirmed!
Dismissed!
Prompt says: Please enter your name:
Prompt submitted!`,
          },
          {
            heading: 'Waiting for Alerts',
            content:
              'Alerts may not appear immediately after clicking a button — there could be a delay due to JavaScript execution or AJAX calls. Use the expected condition alert_is_present to safely wait for an alert before trying to interact with it. Without this wait, you will get a NoAlertPresentException if the alert has not appeared yet.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://example.com")
wait = WebDriverWait(driver, 10)

# Click button that triggers a delayed alert
driver.find_element(By.ID, "delayed-alert-btn").click()

# Wait for the alert to appear
alert = wait.until(EC.alert_is_present())
print(f"Alert appeared: {alert.text}")
alert.accept()

# Handle unexpected alerts gracefully
try:
    alert = driver.switch_to.alert
    alert.dismiss()
    print("Unexpected alert handled")
except Exception:
    print("No unexpected alert present")

driver.quit()`,
            output: `Alert appeared: Operation completed!
No unexpected alert present`,
            tip: 'Always use EC.alert_is_present() instead of directly calling driver.switch_to.alert. It prevents NoAlertPresentException and makes your tests more robust.',
          },
        ],
        quiz: [
          {
            question: 'What are the three types of JavaScript dialog boxes?',
            options: [
              'alert, confirm, prompt',
              'alert, dialog, modal',
              'message, confirm, input',
              'popup, confirm, prompt',
            ],
            correctIndex: 0,
            explanation: 'JavaScript has three native dialog types: alert (message + OK), confirm (OK + Cancel), and prompt (text input + OK + Cancel).',
          },
          {
            question: 'How do you type text into a JavaScript prompt dialog?',
            options: [
              'alert.type("text")',
              'alert.send_keys("text")',
              'alert.input("text")',
              'alert.write("text")',
            ],
            correctIndex: 1,
            explanation: 'Use alert.send_keys("text") to enter text into a prompt dialog before accepting or dismissing it.',
          },
          {
            question: 'What happens if you call driver.switch_to.alert when no alert is present?',
            options: [
              'Returns None',
              'NoAlertPresentException is raised',
              'Creates a new alert',
              'Waits for an alert',
            ],
            correctIndex: 1,
            explanation: 'If no alert is present, Selenium raises NoAlertPresentException. Use EC.alert_is_present() to safely wait for alerts.',
          },
        ],
        challenge: {
          prompt: 'Write a script that clicks a button to trigger an alert, waits for the alert, prints its text, accepts it, then triggers a prompt dialog, enters "Selenium", and accepts it.',
          starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://example.com")
wait = WebDriverWait(driver, 10)

# TODO: Click "alert-btn", wait for alert, print text, accept

# TODO: Click "prompt-btn", wait for prompt, enter "Selenium", accept

driver.quit()`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://example.com")
wait = WebDriverWait(driver, 10)

driver.find_element(By.ID, "alert-btn").click()
alert = wait.until(EC.alert_is_present())
print(f"Alert: {alert.text}")
alert.accept()

driver.find_element(By.ID, "prompt-btn").click()
prompt = wait.until(EC.alert_is_present())
prompt.send_keys("Selenium")
prompt.accept()
print("Prompt submitted with: Selenium")

driver.quit()`,
          hints: [
            'Use wait.until(EC.alert_is_present()) to wait for the alert.',
            'Use alert.send_keys() to type into a prompt dialog.',
            'Call alert.accept() to click OK on both dialog types.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Advanced Interactions                                        */
  /* ------------------------------------------------------------ */
  {
    id: 'advanced-interactions',
    label: 'Advanced Interactions',
    icon: 'Zap',
    entries: [
      {
        id: 'sel-adv-actions',
        title: 'Action Chains',
        difficulty: 'intermediate',
        tags: ['selenium', 'ActionChains', 'drag', 'drop', 'hover', 'context_click'],
        sections: [
          {
            heading: 'Introduction to ActionChains',
            content:
              'ActionChains allow you to perform complex user interactions like hovering, drag-and-drop, double-clicking, right-clicking, and key combinations. Instead of calling simple methods like click(), you build a chain of actions and then execute them all at once with perform().\n\nThe ActionChains class queues up actions and sends them to the browser as a sequence. This is essential for interactions that require multiple steps, such as hovering over a menu to reveal a submenu, or holding Shift while clicking to select multiple items.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains

driver = webdriver.Chrome()
driver.get("https://example.com")

actions = ActionChains(driver)

# Hover over an element
menu = driver.find_element(By.ID, "dropdown-menu")
actions.move_to_element(menu).perform()
print("Hovered over menu")

# Double-click an element
item = driver.find_element(By.ID, "editable-text")
actions.double_click(item).perform()
print("Double-clicked")

# Right-click (context click)
target = driver.find_element(By.ID, "context-target")
actions.context_click(target).perform()
print("Right-clicked")

driver.quit()`,
            output: `Hovered over menu
Double-clicked
Right-clicked`,
            tip: 'Always call .perform() at the end of your action chain. Without it, the actions are queued but never executed.',
          },
          {
            heading: 'Drag and Drop',
            content:
              'Drag and drop is one of the most common uses for ActionChains. You can drag an element from one location to another using drag_and_drop() (which takes source and target elements) or by manually building the sequence with click_and_hold(), move_to_element(), and release().\n\nNote that drag and drop may not work on all websites due to JavaScript event handling. Some sites use custom drag implementations that do not respond to Selenium\'s native drag events. In those cases, you may need to use JavaScript execution as a fallback.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains

driver = webdriver.Chrome()
driver.get("https://example.com/drag-demo")
actions = ActionChains(driver)

source = driver.find_element(By.ID, "draggable")
target = driver.find_element(By.ID, "droppable")

# Method 1: Simple drag and drop
actions.drag_and_drop(source, target).perform()
print("Dragged and dropped!")

# Method 2: Manual drag sequence (more control)
source2 = driver.find_element(By.ID, "item-2")
target2 = driver.find_element(By.ID, "zone-2")
actions.click_and_hold(source2) \\
       .move_to_element(target2) \\
       .release() \\
       .perform()
print("Manual drag complete!")

# Method 3: Drag by offset (pixels)
slider = driver.find_element(By.ID, "slider-handle")
actions.click_and_hold(slider) \\
       .move_by_offset(100, 0) \\
       .release() \\
       .perform()
print("Slider moved!")

driver.quit()`,
            output: `Dragged and dropped!
Manual drag complete!
Slider moved!`,
          },
          {
            heading: 'Key Combinations',
            content:
              'ActionChains support keyboard modifiers like Ctrl, Shift, and Alt. You can hold down a modifier key while performing other actions, which is useful for selecting multiple items, opening links in new tabs, or triggering keyboard shortcuts.\n\nUse key_down() and key_up() to hold and release modifier keys, and send_keys() to type regular characters.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome()
driver.get("https://example.com")
actions = ActionChains(driver)

# Select all text with Ctrl+A
input_field = driver.find_element(By.ID, "text-input")
actions.click(input_field) \\
       .key_down(Keys.CONTROL) \\
       .send_keys('a') \\
       .key_up(Keys.CONTROL) \\
       .perform()
print("Selected all text")

# Copy with Ctrl+C and paste with Ctrl+V
actions.key_down(Keys.CONTROL) \\
       .send_keys('c') \\
       .key_up(Keys.CONTROL) \\
       .perform()

other_field = driver.find_element(By.ID, "other-input")
actions.click(other_field) \\
       .key_down(Keys.CONTROL) \\
       .send_keys('v') \\
       .key_up(Keys.CONTROL) \\
       .perform()
print("Copied and pasted")

# Shift+Click to select multiple items
item1 = driver.find_element(By.CSS_SELECTOR, "li:first-child")
item5 = driver.find_element(By.CSS_SELECTOR, "li:nth-child(5)")
actions.click(item1) \\
       .key_down(Keys.SHIFT) \\
       .click(item5) \\
       .key_up(Keys.SHIFT) \\
       .perform()
print("Selected range of items")

driver.quit()`,
            output: `Selected all text
Copied and pasted
Selected range of items`,
            note: 'On macOS, use Keys.COMMAND instead of Keys.CONTROL for standard shortcuts like Cmd+C and Cmd+V.',
          },
        ],
        quiz: [
          {
            question: 'What must you call at the end of an ActionChain to execute it?',
            options: ['execute()', 'run()', 'perform()', 'submit()'],
            correctIndex: 2,
            explanation: 'You must call .perform() to execute the queued actions. Without it, nothing happens.',
          },
          {
            question: 'Which method is used for right-clicking?',
            options: ['right_click()', 'context_click()', 'secondary_click()', 'alt_click()'],
            correctIndex: 1,
            explanation: 'context_click() performs a right-click (context menu click) on an element.',
          },
          {
            question: 'What does drag_and_drop(source, target) do?',
            options: [
              'Moves source element CSS position',
              'Clicks source, holds, moves to target, releases',
              'Copies source element to target',
              'Swaps the two elements',
            ],
            correctIndex: 1,
            explanation: 'drag_and_drop() is a shorthand for click_and_hold on source, move to target, and release.',
          },
        ],
        challenge: {
          prompt: 'Write a script that hovers over an element with ID "menu", waits for a submenu item with ID "submenu-item" to appear, clicks it, then performs a drag-and-drop from element "drag-source" to "drag-target".',
          starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://example.com")
actions = ActionChains(driver)
wait = WebDriverWait(driver, 10)

# TODO: Hover over #menu

# TODO: Wait for and click #submenu-item

# TODO: Drag #drag-source to #drag-target

driver.quit()`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://example.com")
actions = ActionChains(driver)
wait = WebDriverWait(driver, 10)

menu = driver.find_element(By.ID, "menu")
actions.move_to_element(menu).perform()

submenu = wait.until(EC.element_to_be_clickable((By.ID, "submenu-item")))
submenu.click()
print("Submenu clicked")

source = driver.find_element(By.ID, "drag-source")
target = driver.find_element(By.ID, "drag-target")
actions.drag_and_drop(source, target).perform()
print("Drag and drop complete")

driver.quit()`,
          hints: [
            'Use actions.move_to_element() for hovering.',
            'Wait for the submenu item to be clickable after hovering.',
            'Use actions.drag_and_drop(source, target).perform() for drag-and-drop.',
          ],
        },
      },
      {
        id: 'sel-adv-scroll',
        title: 'Scrolling',
        difficulty: 'beginner',
        tags: ['selenium', 'scrolling', 'javascript', 'scroll_into_view'],
        sections: [
          {
            heading: 'Scrolling with JavaScript',
            content:
              'Selenium does not have a built-in scroll method, but you can scroll using JavaScript execution. The most common approach is driver.execute_script() with JavaScript scroll functions like window.scrollTo(), window.scrollBy(), or element.scrollIntoView().\n\nScrolling is important because Selenium can only interact with elements that are in the viewport (visible area). If an element is below the fold, you may need to scroll to it before clicking or reading its content.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Scroll down by 500 pixels
driver.execute_script("window.scrollBy(0, 500)")
print("Scrolled down 500px")

# Scroll to the bottom of the page
driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
print("Scrolled to bottom")

# Scroll back to the top
driver.execute_script("window.scrollTo(0, 0)")
print("Scrolled to top")

# Scroll to a specific element
element = driver.find_element(By.ID, "footer")
driver.execute_script("arguments[0].scrollIntoView(true);", element)
print("Scrolled to footer")

# Smooth scroll to element
driver.execute_script(
    "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
    element
)
print("Smoothly scrolled to footer")

driver.quit()`,
            output: `Scrolled down 500px
Scrolled to bottom
Scrolled to top
Scrolled to footer
Smoothly scrolled to footer`,
            tip: 'scrollIntoView({block: "center"}) scrolls the element to the center of the viewport, which is often better than the default (top of viewport) because it prevents headers from obscuring the element.',
          },
          {
            heading: 'Selenium 4 Scroll Methods',
            content:
              'Selenium 4 introduced built-in scroll methods through the ActionChains class. You can scroll to an element, scroll by a specific amount, or scroll from a particular origin. These are more reliable than JavaScript scrolling in some cases.\n\nThe scroll_to_element() method is the simplest — it scrolls until the element is in the viewport. scroll_by_amount() lets you scroll by specific pixel offsets.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains

driver = webdriver.Chrome()
driver.get("https://example.com")
actions = ActionChains(driver)

# Scroll to a specific element (Selenium 4)
footer = driver.find_element(By.ID, "footer")
actions.scroll_to_element(footer).perform()
print("Scrolled to footer element")

# Scroll by amount (x, y pixels)
actions.scroll_by_amount(0, 300).perform()
print("Scrolled down 300px")

# Scroll up
actions.scroll_by_amount(0, -500).perform()
print("Scrolled up 500px")

driver.quit()`,
            output: `Scrolled to footer element
Scrolled down 300px
Scrolled up 500px`,
          },
          {
            heading: 'Infinite Scroll Pages',
            content:
              'Many modern websites use infinite scrolling — loading more content as the user scrolls down. To scrape or test these pages, you need to repeatedly scroll to the bottom and wait for new content to load. A common pattern is to scroll down, wait, check if new content appeared, and repeat until no more content loads.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
driver.get("https://example.com/infinite-scroll")

last_height = driver.execute_script("return document.body.scrollHeight")
items_loaded = 0

while True:
    # Scroll to bottom
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")

    # Wait for new content to load
    time.sleep(2)

    # Calculate new scroll height
    new_height = driver.execute_script("return document.body.scrollHeight")

    # Count items
    items = driver.find_elements(By.CSS_SELECTOR, ".item")
    items_loaded = len(items)
    print(f"Items loaded: {items_loaded}")

    # Break if no new content loaded
    if new_height == last_height:
        print("Reached the end!")
        break

    last_height = new_height

    # Safety limit
    if items_loaded > 100:
        print("Reached item limit")
        break

print(f"Total items: {items_loaded}")
driver.quit()`,
            output: `Items loaded: 20
Items loaded: 40
Items loaded: 60
Items loaded: 60
Reached the end!
Total items: 60`,
          },
        ],
        quiz: [
          {
            question: 'Which JavaScript method scrolls an element into the visible area?',
            options: ['element.scrollTo()', 'element.scrollIntoView()', 'element.show()', 'element.reveal()'],
            correctIndex: 1,
            explanation: 'element.scrollIntoView() scrolls the page until the element is visible in the viewport.',
          },
          {
            question: 'What Selenium 4 ActionChains method scrolls to an element?',
            options: ['scroll_to()', 'scroll_to_element()', 'move_to_element()', 'scroll_into_view()'],
            correctIndex: 1,
            explanation: 'scroll_to_element() is the Selenium 4 ActionChains method for scrolling to an element.',
          },
          {
            question: 'How do you detect the end of infinite scroll?',
            options: [
              'Check if the page says "end"',
              'Compare scroll height before and after scrolling',
              'Count the number of scrolls',
              'Check the URL',
            ],
            correctIndex: 1,
            explanation: 'If document.body.scrollHeight does not change after scrolling and waiting, it means no new content loaded — you have reached the end.',
          },
        ],
        challenge: {
          prompt: 'Write a script that scrolls to the bottom of a page, then scrolls to an element with ID "target-section" using scrollIntoView with center alignment, and prints whether the element is displayed.',
          starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# TODO: Scroll to bottom of page

# TODO: Scroll to element "target-section" centered in viewport

# TODO: Print if element is displayed

driver.quit()`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
print("Scrolled to bottom")

target = driver.find_element(By.ID, "target-section")
driver.execute_script(
    "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
    target
)
print(f"Element displayed: {target.is_displayed()}")

driver.quit()`,
          hints: [
            'Use driver.execute_script("window.scrollTo(0, document.body.scrollHeight)") for bottom scroll.',
            'Use scrollIntoView with {block: "center"} for centered alignment.',
            'Use element.is_displayed() to check visibility.',
          ],
        },
      },
      {
        id: 'sel-adv-upload',
        title: 'File Upload & Download',
        difficulty: 'intermediate',
        tags: ['selenium', 'file', 'upload', 'download', 'input'],
        sections: [
          {
            heading: 'File Upload',
            content:
              'File uploads in Selenium are handled by sending the file path to a file input element using send_keys(). This works because file input elements (<input type="file">) accept file paths as their value. You do not need to interact with the OS file dialog — Selenium bypasses it entirely.\n\nThe file must exist on the local machine at the specified path. This approach works for standard HTML file inputs but may not work for custom drag-and-drop upload widgets built with JavaScript.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
import os

driver = webdriver.Chrome()
driver.get("https://example.com/upload")

# Find the file input element
file_input = driver.find_element(By.CSS_SELECTOR, "input[type='file']")

# Send the file path directly (no dialog needed)
file_path = os.path.abspath("test_document.pdf")
file_input.send_keys(file_path)
print(f"Uploaded: {file_path}")

# For hidden file inputs, you may need to remove the hidden attribute
hidden_input = driver.find_element(By.ID, "hidden-upload")
driver.execute_script(
    "arguments[0].style.display = 'block'; arguments[0].style.visibility = 'visible';",
    hidden_input
)
hidden_input.send_keys(file_path)
print("Uploaded to hidden input")

# Multiple file upload
multi_input = driver.find_element(By.ID, "multi-upload")
files = "\\n".join([
    os.path.abspath("file1.txt"),
    os.path.abspath("file2.txt"),
])
multi_input.send_keys(files)
print("Uploaded multiple files")

driver.quit()`,
            output: `Uploaded: /path/to/test_document.pdf
Uploaded to hidden input
Uploaded multiple files`,
            tip: 'Always use absolute file paths with os.path.abspath() to avoid path resolution issues.',
          },
          {
            heading: 'File Download',
            content:
              'Handling file downloads requires configuring the browser to save files to a specific directory without showing the download dialog. For Chrome, you set download preferences through ChromeOptions. For Firefox, you configure the profile to auto-save specific MIME types.\n\nAfter configuring the download directory, you click the download link and wait for the file to appear in the specified directory.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import os
import time

# Configure Chrome to download to a specific directory
download_dir = os.path.abspath("downloads")
os.makedirs(download_dir, exist_ok=True)

options = Options()
prefs = {
    "download.default_directory": download_dir,
    "download.prompt_for_download": False,
    "download.directory_upgrade": True,
}
options.add_experimental_option("prefs", prefs)

driver = webdriver.Chrome(options=options)
driver.get("https://example.com/downloads")

# Click download link
driver.find_element(By.LINK_TEXT, "Download Report").click()

# Wait for download to complete
timeout = 30
end_time = time.time() + timeout
while time.time() < end_time:
    files = os.listdir(download_dir)
    # Chrome creates .crdownload files while downloading
    if files and not any(f.endswith('.crdownload') for f in files):
        print(f"Downloaded: {files}")
        break
    time.sleep(1)
else:
    print("Download timed out!")

driver.quit()`,
            output: `Downloaded: ['report.pdf']`,
          },
          {
            heading: 'Dropdown Select Elements',
            content:
              'HTML <select> elements have a dedicated Select class in Selenium that provides convenient methods for choosing options. You can select by visible text, by value attribute, or by index. The Select class also lets you get all available options and the currently selected option.\n\nThis only works for native HTML <select> elements. Custom dropdown widgets built with divs and JavaScript require regular click-based interaction.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

driver = webdriver.Chrome()
driver.get("https://example.com/form")

# Find the select element and wrap it
dropdown = Select(driver.find_element(By.ID, "country"))

# Select by visible text
dropdown.select_by_visible_text("United States")
print(f"Selected: {dropdown.first_selected_option.text}")

# Select by value attribute
dropdown.select_by_value("uk")
print(f"Selected: {dropdown.first_selected_option.text}")

# Select by index (0-based)
dropdown.select_by_index(2)
print(f"Selected: {dropdown.first_selected_option.text}")

# Get all available options
all_options = dropdown.options
print(f"Total options: {len(all_options)}")
for opt in all_options[:3]:
    print(f"  - {opt.text} (value={opt.get_attribute('value')})")

# For multi-select dropdowns
multi = Select(driver.find_element(By.ID, "languages"))
multi.select_by_visible_text("Python")
multi.select_by_visible_text("JavaScript")
selected = multi.all_selected_options
print(f"Multi-selected: {[o.text for o in selected]}")

# Deselect
multi.deselect_all()
print("Deselected all")

driver.quit()`,
            output: `Selected: United States
Selected: United Kingdom
Selected: Canada
Total options: 10
  - Select Country (value=)
  - United States (value=us)
  - United Kingdom (value=uk)
Multi-selected: ['Python', 'JavaScript']
Deselected all`,
            tip: 'Use select_by_visible_text() for readability in tests. It makes the test intent clear — you are selecting what the user sees, not an internal value.',
          },
        ],
        quiz: [
          {
            question: 'How do you upload a file in Selenium without interacting with the OS file dialog?',
            options: [
              'Use robot.click() on the dialog',
              'Use send_keys() with the file path on the file input element',
              'Use drag and drop',
              'Use driver.upload()',
            ],
            correctIndex: 1,
            explanation: 'You can bypass the file dialog entirely by sending the file path directly to the <input type="file"> element using send_keys().',
          },
          {
            question: 'Which Selenium class is used to interact with HTML <select> elements?',
            options: ['Dropdown', 'Select', 'Choice', 'Option'],
            correctIndex: 1,
            explanation: 'The Select class from selenium.webdriver.support.ui wraps <select> elements and provides methods like select_by_visible_text().',
          },
          {
            question: 'How can you detect that a Chrome download is still in progress?',
            options: [
              'Check if the browser is busy',
              'Look for .crdownload files in the download directory',
              'Check the network tab',
              'Count the bytes downloaded',
            ],
            correctIndex: 1,
            explanation: 'Chrome creates temporary .crdownload files while downloading. When the download completes, the file is renamed to its final name.',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to a form page, selects "Python" from a dropdown with ID "language" using visible text, then uploads a file called "resume.pdf" from the current directory to a file input with ID "file-upload".',
          starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import os

driver = webdriver.Chrome()
driver.get("https://example.com/form")

# TODO: Select "Python" from #language dropdown

# TODO: Upload resume.pdf to #file-upload

driver.quit()`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import os

driver = webdriver.Chrome()
driver.get("https://example.com/form")

dropdown = Select(driver.find_element(By.ID, "language"))
dropdown.select_by_visible_text("Python")
print(f"Selected: {dropdown.first_selected_option.text}")

file_input = driver.find_element(By.ID, "file-upload")
file_path = os.path.abspath("resume.pdf")
file_input.send_keys(file_path)
print(f"Uploaded: {file_path}")

driver.quit()`,
          hints: [
            'Wrap the element with Select() before calling select methods.',
            'Use select_by_visible_text("Python") for the dropdown.',
            'Use send_keys(file_path) on the file input, not click().',
          ],
        },
      },
    ],
  },
];
