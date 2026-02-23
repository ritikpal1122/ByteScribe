import type { DocCategory } from './types';

export const SELENIUM_PART1_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Getting Started                                              */
  /* ------------------------------------------------------------ */
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: 'Rocket',
    entries: [
      {
        id: 'introduction-to-selenium',
        title: 'Introduction to Selenium',
        difficulty: 'beginner',
        tags: ['selenium', 'webdriver', 'automation', 'testing', 'browser'],
        sections: [
          {
            heading: 'What Is Selenium?',
            content:
              'Selenium is an open-source framework for automating web browsers. It allows you to write scripts that control a real browser -- clicking buttons, filling forms, navigating pages -- just like a human user would, but programmatically. Unlike simple HTTP request libraries like `requests`, Selenium actually launches a browser and executes JavaScript, which means it can interact with dynamic single-page applications, handle AJAX calls, and test exactly what a real user would see.\n\nSelenium is used for two main purposes: automated testing (verifying that web applications work correctly) and web scraping (extracting data from websites that require JavaScript rendering). Companies like Google, Netflix, and Amazon use Selenium in their testing pipelines to catch bugs before they reach users.',
            tip: 'Selenium is not the only browser automation tool. Playwright and Cypress are newer alternatives, but Selenium remains the most widely adopted with the largest community and the broadest language support.',
            analogy: 'Think of Selenium as a robotic hand that sits in front of your computer. You give it instructions like "click here" or "type this," and it physically operates the browser for you. Unlike reading a webpage\'s source code directly, this robot sees exactly what a human would see.',
          },
          {
            heading: 'Selenium Architecture',
            content:
              'Selenium uses a client-server architecture built around the WebDriver protocol. Your Python script (the client) sends commands to a browser driver (like ChromeDriver), which translates those commands into browser-specific actions. The browser driver acts as a middleman between your code and the actual browser. This three-layer architecture -- your script, the driver, and the browser -- is what makes Selenium browser-agnostic.\n\nThe WebDriver protocol is a W3C standard, which means all major browsers implement it consistently. When you call `driver.find_element(By.ID, "submit")`, your script sends an HTTP request to the driver, the driver tells the browser to locate that element, and the result flows back through the same chain. This is why you need to download a separate driver executable for each browser you want to automate.',
            code: `# The three layers of Selenium architecture:
#
# 1. Your Script (Python + Selenium library)
#        |
#        v  (WebDriver Protocol / HTTP)
# 2. Browser Driver (e.g., ChromeDriver)
#        |
#        v  (Browser-specific commands)
# 3. Browser (e.g., Google Chrome)
#
# Example: What happens when you click a button
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()          # Launches ChromeDriver + Chrome
driver.get("https://example.com")    # Script -> Driver -> Browser: navigate
button = driver.find_element(By.ID, "btn")  # Script -> Driver -> Browser: find
button.click()                       # Script -> Driver -> Browser: click
driver.quit()                        # Shuts down browser and driver`,
            note: 'The WebDriver protocol replaced the older Selenium RC (Remote Control) protocol. Selenium 4 uses the W3C WebDriver standard exclusively, which provides more reliable and consistent behavior across browsers.',
          },
          {
            heading: 'Supported Browsers',
            content:
              'Selenium supports all major browsers through their respective driver executables. Chrome uses ChromeDriver, Firefox uses GeckoDriver, Edge uses EdgeDriver, and Safari uses SafariDriver (built into macOS). Each driver must match the version of its corresponding browser -- a ChromeDriver for Chrome 120 will not work with Chrome 119. This version matching is one of the most common sources of errors for beginners.\n\nIn practice, most teams standardize on Chrome or Firefox for automation because they offer the best driver stability and feature support. Safari\'s driver has historically lagged behind in feature support, and Internet Explorer\'s driver is no longer maintained since IE has been retired.',
            code: `from selenium import webdriver

# Chrome (most popular for automation)
chrome_driver = webdriver.Chrome()

# Firefox
firefox_driver = webdriver.Firefox()

# Edge (Chromium-based)
edge_driver = webdriver.Edge()

# Safari (macOS only, enable in Develop menu first)
# safari_driver = webdriver.Safari()

# Always close the browser when done
chrome_driver.quit()
firefox_driver.quit()
edge_driver.quit()`,
            tip: 'Use Chrome for most automation tasks. It has the best driver support, the largest community, and the most debugging tools. Firefox is a solid second choice, especially when you need to test cross-browser compatibility.',
          },
        ],
        quiz: [
          {
            question: 'What protocol does Selenium 4 use to communicate with browsers?',
            options: ['Selenium RC', 'W3C WebDriver', 'REST API', 'WebSocket'],
            correctIndex: 1,
            explanation: 'Selenium 4 uses the W3C WebDriver protocol, which is a standardized interface implemented by all major browsers for consistent automation behavior.',
          },
          {
            question: 'What role does ChromeDriver play in Selenium architecture?',
            options: [
              'It is the Chrome browser itself',
              'It is a Python library for Chrome',
              'It translates WebDriver commands into Chrome-specific actions',
              'It replaces the need for a browser',
            ],
            correctIndex: 2,
            explanation: 'ChromeDriver is a separate executable that acts as a bridge between your Selenium script and the Chrome browser, translating WebDriver protocol commands into browser actions.',
          },
          {
            question: 'Why does Selenium launch a real browser instead of just fetching HTML?',
            options: [
              'It is faster than HTTP requests',
              'It can interact with JavaScript-rendered dynamic content',
              'It uses less memory',
              'It does not need a network connection',
            ],
            correctIndex: 1,
            explanation: 'Selenium launches a real browser so it can execute JavaScript, handle AJAX requests, and interact with dynamic single-page applications -- things that simple HTTP libraries cannot do.',
          },
          {
            question: 'Which of these is NOT a supported Selenium browser driver?',
            options: ['ChromeDriver', 'GeckoDriver', 'OperaDriver', 'WgetDriver'],
            correctIndex: 3,
            explanation: 'WgetDriver does not exist. ChromeDriver is for Chrome, GeckoDriver is for Firefox, and OperaDriver was for Opera (now deprecated since Opera switched to Chromium).',
          },
        ],
        challenge: {
          prompt: 'Write a script that creates a Chrome WebDriver instance, navigates to https://example.com, prints the page title, and then quits the browser.',
          starterCode: `from selenium import webdriver

# Create a Chrome WebDriver instance

# Navigate to https://example.com

# Print the page title

# Quit the browser`,
          solutionCode: `from selenium import webdriver

# Create a Chrome WebDriver instance
driver = webdriver.Chrome()

# Navigate to https://example.com
driver.get("https://example.com")

# Print the page title
print(driver.title)

# Quit the browser
driver.quit()`,
          hints: [
            'Use webdriver.Chrome() to create the driver instance',
            'The get() method navigates to a URL',
            'The title property returns the page title',
            'Always call quit() to close the browser and free resources',
          ],
        },
      },
      {
        id: 'installing-selenium',
        title: 'Installing Selenium',
        difficulty: 'beginner',
        tags: ['installation', 'pip', 'chromedriver', 'setup', 'webdriver-manager'],
        sections: [
          {
            heading: 'Installing the Selenium Package',
            content:
              'Installing Selenium in Python is straightforward using pip, Python\'s package manager. The `selenium` package provides the Python bindings for the WebDriver protocol -- it is the library that lets you write Python code to control browsers. Always install it in a virtual environment to avoid polluting your global Python installation. A virtual environment keeps your project dependencies isolated, which prevents version conflicts between different projects.\n\nSelenium 4 is the current major version and includes significant improvements over Selenium 3, including native W3C WebDriver support, relative locators, and better browser option handling. Make sure you install version 4 or higher to get all the modern features.',
            code: `# Create a virtual environment (recommended)
# $ python -m venv selenium_env
# $ source selenium_env/bin/activate  (Linux/Mac)
# $ selenium_env\\Scripts\\activate     (Windows)

# Install Selenium
# $ pip install selenium

# Verify the installation
# $ python -c "import selenium; print(selenium.__version__)"
# 4.18.1

# Install a specific version if needed
# $ pip install selenium==4.18.1

# Upgrade an existing installation
# $ pip install --upgrade selenium`,
            output: `4.18.1`,
            tip: 'Always use a virtual environment for your Selenium projects. Run `python -m venv myenv` followed by `source myenv/bin/activate` (Mac/Linux) or `myenv\\Scripts\\activate` (Windows) before installing packages.',
          },
          {
            heading: 'Setting Up Browser Drivers',
            content:
              'After installing the Selenium package, you need a browser driver -- the executable that Selenium uses to communicate with the browser. The most common approach in Selenium 4 is to let Selenium Manager handle driver downloads automatically. Selenium Manager is a built-in tool (included since Selenium 4.6) that detects your browser version and downloads the matching driver without any manual intervention.\n\nIf you prefer manual control, you can also use the `webdriver-manager` third-party package, which provides a Python API for downloading and caching drivers. Some organizations require manual driver management for security or compliance reasons, in which case you download the driver directly from the browser vendor\'s site.',
            code: `# Option 1: Automatic (Selenium 4.6+, built-in Selenium Manager)
# Just use it -- Selenium downloads the right driver automatically
from selenium import webdriver
driver = webdriver.Chrome()  # Selenium Manager handles ChromeDriver
driver.quit()

# Option 2: Using webdriver-manager (third-party)
# $ pip install webdriver-manager
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)
driver.quit()

# Option 3: Manual driver path
from selenium import webdriver
from selenium.webdriver.chrome.service import Service

service = Service(executable_path="/path/to/chromedriver")
driver = webdriver.Chrome(service=service)
driver.quit()`,
            note: 'Selenium Manager (Option 1) is the recommended approach for Selenium 4.6 and later. It automatically detects your installed browser, downloads the correct driver version, and caches it for future use. You do not need to install anything extra.',
            analogy: 'Think of the browser driver like a translator at a conference. Your Python script speaks "WebDriver protocol," the browser speaks its own internal language, and the driver sits between them translating every command. Without the right translator (driver version), communication breaks down.',
          },
          {
            heading: 'Verifying Your Installation',
            content:
              'Before writing real automation scripts, verify that everything works by running a simple test. This test will create a browser instance, navigate to a page, print the title, and close the browser. If any step fails, you will get a clear error message indicating what went wrong -- usually a missing driver, a version mismatch, or a browser that is not installed.\n\nCommon issues include: ChromeDriver version not matching Chrome version (Selenium Manager usually prevents this), Chrome not being installed at the default location, or firewall/antivirus software blocking the driver executable. On macOS, you may need to allow ChromeDriver in System Preferences > Security if it gets blocked by Gatekeeper.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

def verify_selenium():
    """Verify that Selenium is properly installed and configured."""
    try:
        # Create a Chrome browser instance
        driver = webdriver.Chrome()
        print("Browser launched successfully!")

        # Navigate to a test page
        driver.get("https://www.selenium.dev")
        print(f"Page title: {driver.title}")

        # Verify we can find elements
        heading = driver.find_element(By.TAG_NAME, "h1")
        print(f"Found heading: {heading.text}")

        print("Selenium is working correctly!")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        driver.quit()
        print("Browser closed.")

verify_selenium()`,
            output: `Browser launched successfully!
Page title: Selenium
Found heading: Selenium automates browsers. That's it!
Selenium is working correctly!
Browser closed.`,
            tip: 'If you get a "chromedriver not found" error on macOS, you may need to run `xattr -d com.apple.quarantine chromedriver` to remove the quarantine flag, or use Selenium Manager which handles this automatically.',
          },
        ],
        quiz: [
          {
            question: 'What command installs the Selenium Python package?',
            options: ['npm install selenium', 'pip install selenium', 'brew install selenium', 'apt-get install selenium'],
            correctIndex: 1,
            explanation: 'Selenium\'s Python bindings are installed via pip, Python\'s package manager, using the command `pip install selenium`.',
          },
          {
            question: 'What is Selenium Manager?',
            options: [
              'A GUI tool for writing Selenium tests',
              'A built-in tool that automatically downloads matching browser drivers',
              'A cloud service for running Selenium tests',
              'A browser plugin for Selenium',
            ],
            correctIndex: 1,
            explanation: 'Selenium Manager is built into Selenium 4.6+ and automatically detects your browser version, downloads the correct driver, and caches it for future use.',
          },
          {
            question: 'Why must the browser driver version match the browser version?',
            options: [
              'For licensing reasons',
              'Because the driver uses browser-specific internal APIs that change between versions',
              'It is a Python requirement',
              'It does not need to match',
            ],
            correctIndex: 1,
            explanation: 'Browser drivers communicate with the browser using internal APIs that change between browser versions. A mismatched driver cannot properly control the browser.',
          },
        ],
        challenge: {
          prompt: 'Write a script that installs Selenium using webdriver-manager, launches Chrome, navigates to https://www.python.org, prints the page title, and closes the browser. Wrap everything in a try/finally block to ensure the browser always closes.',
          starterCode: `from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Set up ChromeDriver using webdriver-manager

# Use try/finally to ensure browser closes
# Navigate to https://www.python.org
# Print the page title
# Close the browser in the finally block`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

try:
    driver.get("https://www.python.org")
    print(f"Page title: {driver.title}")
finally:
    driver.quit()`,
          hints: [
            'Use Service(ChromeDriverManager().install()) to create the service',
            'Pass the service to webdriver.Chrome(service=service)',
            'Use try/finally to guarantee driver.quit() is called',
          ],
        },
      },
      {
        id: 'your-first-script',
        title: 'Your First Script',
        difficulty: 'beginner',
        tags: ['webdriver', 'navigation', 'get', 'quit', 'close', 'basics'],
        sections: [
          {
            heading: 'Opening a Browser',
            content:
              'Every Selenium script begins by creating a WebDriver instance, which launches a browser window. The `webdriver.Chrome()` constructor starts ChromeDriver and opens a new Chrome window. At this point, the browser is running but showing a blank page -- it is waiting for your instructions. The WebDriver instance (conventionally named `driver`) is your handle to control everything about that browser session.\n\nWhen you create the driver, Selenium Manager automatically finds or downloads the right ChromeDriver version, starts it as a background process, and establishes a connection. This entire handshake happens in the constructor call. If anything goes wrong (browser not found, driver incompatible), the exception will be raised here.',
            code: `from selenium import webdriver

# Launch Chrome -- this opens a visible browser window
driver = webdriver.Chrome()

# The browser is now open with a blank page
# driver.title will be an empty string
print(f"Title: '{driver.title}'")
print(f"Current URL: {driver.current_url}")`,
            output: `Title: ''
Current URL: data:,`,
            analogy: 'Creating a WebDriver instance is like turning the ignition key in a car. The engine starts, everything powers up, but you have not gone anywhere yet. The `driver` object is your steering wheel -- every action you want the browser to take goes through it.',
          },
          {
            heading: 'Navigating to a URL',
            content:
              'The `driver.get(url)` method tells the browser to navigate to a specific URL. This method blocks until the page has finished loading (specifically, until the `document.readyState` becomes "complete"). This means your script naturally waits for the page to load before moving to the next line -- you do not need to add manual sleep calls for basic navigation.\n\nAfter the page loads, you can access properties like `driver.title` for the page title, `driver.current_url` for the current URL (which might differ from what you passed to `get()` due to redirects), and `driver.page_source` for the full HTML content of the page.',
            code: `from selenium import webdriver

driver = webdriver.Chrome()

# Navigate to a website
driver.get("https://example.com")
print(f"Title: {driver.title}")
print(f"URL: {driver.current_url}")

# Navigate to another page
driver.get("https://www.python.org")
print(f"Title: {driver.title}")
print(f"URL: {driver.current_url}")

# Access page source (full HTML)
html = driver.page_source
print(f"Page source length: {len(html)} characters")

driver.quit()`,
            output: `Title: Example Domain
URL: https://example.com/
Title: Welcome to Python.org
URL: https://www.python.org/
Page source length: 49731 characters`,
            tip: 'The `get()` method automatically waits for the page to finish loading. However, it only waits for the initial HTML document -- AJAX requests and dynamically loaded content may still be in progress. For dynamic content, you will need explicit waits (covered later).',
          },
          {
            heading: 'Browser Navigation Methods',
            content:
              'Beyond `get()`, Selenium provides navigation methods that mimic browser buttons: `back()`, `forward()`, and `refresh()`. These work exactly like clicking the browser\'s back button, forward button, and refresh button respectively. Each of these methods also waits for the page to finish loading before returning control to your script.\n\nThe `back()` and `forward()` methods use the browser\'s navigation history, so they only work if you have navigated to multiple pages. Calling `back()` on the first page or `forward()` when there is no forward history will simply do nothing without raising an error.',
            code: `from selenium import webdriver

driver = webdriver.Chrome()

# Navigate to first page
driver.get("https://example.com")
print(f"1. {driver.title}")

# Navigate to second page
driver.get("https://www.python.org")
print(f"2. {driver.title}")

# Go back to the first page
driver.back()
print(f"After back: {driver.title}")

# Go forward to the second page
driver.forward()
print(f"After forward: {driver.title}")

# Refresh the current page
driver.refresh()
print(f"After refresh: {driver.title}")

driver.quit()`,
            output: `1. Example Domain
2. Welcome to Python.org
After back: Example Domain
After forward: Welcome to Python.org
After refresh: Welcome to Python.org`,
            note: 'The `refresh()` method is useful when testing pages that update their content periodically, or when you need to reset the page state to its initial loaded condition.',
          },
          {
            heading: 'Closing the Browser',
            content:
              'There are two ways to close the browser: `driver.close()` and `driver.quit()`. The difference is important. `close()` closes only the current window or tab -- if you have multiple windows open, the others remain. `quit()` terminates the entire browser session, closing all windows and stopping the ChromeDriver process. Always use `quit()` in your cleanup code to prevent orphaned ChromeDriver processes from consuming system resources.\n\nA common best practice is to use Python\'s `try/finally` pattern or a context manager to ensure `quit()` is always called, even if your script crashes. Orphaned driver processes are a common problem in CI/CD environments where scripts might fail mid-execution.',
            code: `from selenium import webdriver

# Pattern 1: try/finally (recommended)
driver = webdriver.Chrome()
try:
    driver.get("https://example.com")
    print(driver.title)
finally:
    driver.quit()  # Always runs, even if an error occurs

# Pattern 2: close() vs quit()
driver = webdriver.Chrome()
driver.get("https://example.com")

# Open a new tab via JavaScript
driver.execute_script("window.open('https://python.org', '_blank');")

# close() only closes the current tab
driver.close()  # Closes the first tab, second tab remains

# quit() closes everything and stops the driver
driver.quit()  # Closes all tabs and stops ChromeDriver`,
            warning: 'Always call `driver.quit()` when you are done. Failing to do so leaves orphaned ChromeDriver processes running in the background, which consume memory and can eventually slow down your system. Use `try/finally` to guarantee cleanup.',
          },
        ],
        quiz: [
          {
            question: 'What does `driver.get(url)` wait for before returning?',
            options: [
              'It returns immediately without waiting',
              'It waits for all AJAX requests to complete',
              'It waits for document.readyState to become "complete"',
              'It waits for 5 seconds',
            ],
            correctIndex: 2,
            explanation: 'The `get()` method blocks until the page\'s `document.readyState` is "complete," meaning the initial HTML and resources have loaded. It does not wait for AJAX requests.',
          },
          {
            question: 'What is the difference between `driver.close()` and `driver.quit()`?',
            options: [
              'They are identical',
              'close() closes the current window; quit() closes all windows and stops the driver',
              'close() stops the driver; quit() closes the window',
              'close() is for Chrome; quit() is for Firefox',
            ],
            correctIndex: 1,
            explanation: '`close()` closes only the current browser window/tab, while `quit()` terminates the entire browser session (all windows) and stops the driver process.',
          },
          {
            question: 'Which property gives you the full HTML of the current page?',
            options: ['driver.html', 'driver.source', 'driver.page_source', 'driver.content'],
            correctIndex: 2,
            explanation: '`driver.page_source` returns the full HTML source code of the currently loaded page as a string.',
          },
          {
            question: 'What happens if you call `driver.back()` on the first page you visited?',
            options: [
              'An exception is raised',
              'The browser crashes',
              'Nothing happens -- there is no previous page',
              'It navigates to about:blank',
            ],
            correctIndex: 2,
            explanation: 'Calling `back()` when there is no navigation history simply does nothing. No error is raised; the browser stays on the current page.',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to https://example.com, then to https://www.python.org, goes back to example.com, prints the title at each step, and properly closes the browser using try/finally.',
          starterCode: `from selenium import webdriver

driver = webdriver.Chrome()

# Use try/finally for safe cleanup
# Step 1: Navigate to https://example.com and print the title
# Step 2: Navigate to https://www.python.org and print the title
# Step 3: Go back and print the title
# Step 4: Quit the browser`,
          solutionCode: `from selenium import webdriver

driver = webdriver.Chrome()

try:
    driver.get("https://example.com")
    print(f"Step 1: {driver.title}")

    driver.get("https://www.python.org")
    print(f"Step 2: {driver.title}")

    driver.back()
    print(f"Step 3 (back): {driver.title}")
finally:
    driver.quit()`,
          hints: [
            'Wrap your logic in try/finally with driver.quit() in the finally block',
            'Use driver.get() for navigation and driver.title for the title',
            'Use driver.back() to go to the previous page',
          ],
        },
      },
      {
        id: 'browser-options',
        title: 'Browser Options',
        difficulty: 'beginner',
        tags: ['chrome-options', 'headless', 'configuration', 'user-agent', 'incognito'],
        sections: [
          {
            heading: 'Chrome Options Basics',
            content:
              'Chrome Options let you customize how Chrome launches and behaves during automation. You create an `Options` object, configure it with various settings, and pass it to the `webdriver.Chrome()` constructor. These options control everything from window size to security settings to performance flags. Without options, Chrome launches with default settings -- a visible window, standard user agent, and normal security policies.\n\nOptions are essential for production automation because defaults rarely match what you need. For CI/CD pipelines, you want headless mode. For scraping, you might want a custom user agent. For testing, you might want to disable browser notifications that could interfere with your script.',
            code: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# Create an Options object
options = Options()

# Add arguments (command-line flags for Chrome)
options.add_argument("--start-maximized")
options.add_argument("--disable-notifications")

# Launch Chrome with these options
driver = webdriver.Chrome(options=options)
driver.get("https://example.com")
print(f"Window size: {driver.get_window_size()}")
driver.quit()`,
            output: `Window size: {'width': 1920, 'height': 1080}`,
            tip: 'You can chain multiple `add_argument()` calls to set as many flags as you need. Each flag corresponds to a Chrome command-line switch. See the Chromium docs for a full list of available switches.',
          },
          {
            heading: 'Headless Mode',
            content:
              'Headless mode runs Chrome without displaying a visible browser window. This is critical for running automation on servers, in CI/CD pipelines, or in Docker containers where there is no display available. Headless Chrome renders pages just like regular Chrome, executing JavaScript and loading resources, but without the overhead of rendering pixels to a screen. This makes headless mode faster and less resource-intensive.\n\nSelenium 4 uses the new headless mode (sometimes called "new headless") which is more reliable than the old `--headless` flag. The new mode uses `--headless=new` and provides much better compatibility with websites that detect and block old headless browsers.',
            code: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()

# New headless mode (Selenium 4 / Chrome 109+)
options.add_argument("--headless=new")

# Recommended flags for headless environments
options.add_argument("--no-sandbox")           # Required in Docker
options.add_argument("--disable-dev-shm-usage")  # Overcome shared memory limits
options.add_argument("--disable-gpu")          # Stability in headless

driver = webdriver.Chrome(options=options)
driver.get("https://example.com")
print(f"Title: {driver.title}")
print(f"Running headless: no visible window appeared!")

# Take a screenshot to verify the page loaded
driver.save_screenshot("headless_screenshot.png")
print("Screenshot saved!")

driver.quit()`,
            output: `Title: Example Domain
Running headless: no visible window appeared!
Screenshot saved!`,
            analogy: 'Headless mode is like having a chef cook a meal in a kitchen with no windows. The food gets made exactly the same way, you just cannot watch the process. You can still inspect the result -- in this case, by taking screenshots or reading page content.',
            warning: 'Some websites detect headless browsers and block them. If you encounter unexpected behavior in headless mode, try adding a realistic user agent with `options.add_argument("--user-agent=...")` and a standard window size.',
          },
          {
            heading: 'Window Size and Position',
            content:
              'Controlling the browser window size is important because many modern websites use responsive design -- they display different layouts depending on the window dimensions. If your automation targets a desktop layout but Chrome opens with a small default window, elements might be hidden behind a mobile hamburger menu. Setting an explicit window size ensures consistent behavior across different machines and environments.\n\nYou can set the window size either as a Chrome argument at launch time, or dynamically after the browser is running using `driver.set_window_size()`. In headless mode, setting the window size is especially important because there is no physical screen to determine the default dimensions.',
            code: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()

# Set window size at launch
options.add_argument("--window-size=1920,1080")

driver = webdriver.Chrome(options=options)
print(f"Initial size: {driver.get_window_size()}")

# Change size dynamically
driver.set_window_size(1366, 768)
print(f"Resized: {driver.get_window_size()}")

# Maximize the window
driver.maximize_window()
print(f"Maximized: {driver.get_window_size()}")

# Set window position on screen
driver.set_window_position(100, 200)
print(f"Position: {driver.get_window_position()}")

driver.quit()`,
            output: `Initial size: {'width': 1920, 'height': 1080}
Resized: {'width': 1366, 'height': 768}
Maximized: {'width': 1920, 'height': 1080}
Position: {'x': 100, 'y': 200}`,
            tip: 'For consistent screenshots and testing, always set an explicit window size. Common choices are 1920x1080 (full HD desktop), 1366x768 (common laptop), or 375x812 (iPhone X mobile).',
          },
          {
            heading: 'User Agent and Incognito Mode',
            content:
              'The user agent string tells websites what browser and operating system you are using. Selenium\'s default user agent includes identifiers that some websites use to detect automation. Setting a custom user agent can help your scripts appear as a normal browser. Incognito (private) mode starts the browser without cookies, cache, or browsing history from previous sessions, which is useful for testing clean login flows or ensuring no stale state affects your tests.\n\nYou can also use experimental options to set specific Chrome preferences, such as the default download directory, language settings, or disabling images for faster page loads during scraping.',
            code: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()

# Set a custom user agent
options.add_argument(
    "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/120.0.0.0 Safari/537.36"
)

# Launch in incognito mode
options.add_argument("--incognito")

# Set experimental preferences
options.add_experimental_option("prefs", {
    "download.default_directory": "/tmp/downloads",
    "profile.default_content_setting_values.notifications": 2,  # Block
    "intl.accept_languages": "en-US,en",
})

# Disable automation flags (reduces detection)
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option("useAutomationExtension", False)

driver = webdriver.Chrome(options=options)
driver.get("https://example.com")

# Verify the user agent was set
ua = driver.execute_script("return navigator.userAgent;")
print(f"User Agent: {ua}")

driver.quit()`,
            output: `User Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36`,
            note: 'The `excludeSwitches` and `useAutomationExtension` options remove some of the default indicators that websites use to detect Selenium. This is useful for scraping but should not be used to bypass security measures on systems you do not own.',
          },
        ],
        quiz: [
          {
            question: 'What is the correct argument for new headless mode in Selenium 4?',
            options: ['--headless', '--headless=new', '--no-window', '--invisible'],
            correctIndex: 1,
            explanation: 'Selenium 4 with Chrome 109+ uses `--headless=new` for the improved headless mode, which has better website compatibility than the old `--headless` flag.',
          },
          {
            question: 'Why should you set an explicit window size in headless mode?',
            options: [
              'It is required or Chrome will crash',
              'Headless mode has no physical screen, so the default size may be too small for responsive layouts',
              'It makes the script run faster',
              'It is needed for screenshots only',
            ],
            correctIndex: 1,
            explanation: 'In headless mode there is no physical screen to determine default dimensions. An explicit window size ensures the page renders with the expected responsive layout.',
          },
          {
            question: 'What does incognito mode do in Selenium?',
            options: [
              'Hides the browser window',
              'Starts the browser without cookies, cache, or history from previous sessions',
              'Makes the browser faster',
              'Disables JavaScript execution',
            ],
            correctIndex: 1,
            explanation: 'Incognito mode starts a clean browser session with no cookies, cache, or browsing history, ensuring no stale state affects your automation.',
          },
          {
            question: 'How do you pass Chrome options to the WebDriver?',
            options: [
              'webdriver.Chrome(chrome_options=options)',
              'webdriver.Chrome(options=options)',
              'webdriver.Chrome(args=options)',
              'webdriver.Chrome().set_options(options)',
            ],
            correctIndex: 1,
            explanation: 'In Selenium 4, you pass options using the `options=` keyword argument: `webdriver.Chrome(options=options)`. The old `chrome_options=` parameter is deprecated.',
          },
        ],
        challenge: {
          prompt: 'Write a script that launches Chrome in headless mode with a window size of 1920x1080, navigates to https://example.com, takes a screenshot named "test.png", prints the page title, and closes the browser.',
          starterCode: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# Create options with headless mode and window size

# Launch Chrome with options

# Navigate to https://example.com

# Take a screenshot named "test.png"

# Print the page title

# Close the browser`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument("--headless=new")
options.add_argument("--window-size=1920,1080")

driver = webdriver.Chrome(options=options)

try:
    driver.get("https://example.com")
    driver.save_screenshot("test.png")
    print(f"Title: {driver.title}")
finally:
    driver.quit()`,
          hints: [
            'Use Options() and add_argument() to configure headless mode',
            'Window size argument format is "--window-size=width,height"',
            'Use driver.save_screenshot("filename.png") to capture the page',
          ],
        },
      },
    ],
  },
  /* ------------------------------------------------------------ */
  /*  Locating Elements                                            */
  /* ------------------------------------------------------------ */
  {
    id: 'locating-elements',
    label: 'Locating Elements',
    icon: 'Search',
    entries: [
      {
        id: 'finding-elements-by-id',
        title: 'Finding Elements by ID',
        difficulty: 'beginner',
        tags: ['find-element', 'by-id', 'locators', 'selectors'],
        sections: [
          {
            heading: 'The ID Locator',
            content:
              'The ID locator is the fastest and most reliable way to find an element on a web page. HTML IDs are supposed to be unique within a page, which means `find_element(By.ID, "some-id")` will always return exactly one element (or raise an exception if none exists). The browser internally maintains a hash map of IDs, so looking up an element by ID is an O(1) operation -- much faster than scanning the DOM with CSS selectors or XPath.\n\nIn Selenium 4, you use the `By` class from `selenium.webdriver.common.by` to specify the locator strategy. The old syntax `find_element_by_id("some-id")` is deprecated and should not be used in new code. Always prefer `find_element(By.ID, "value")` for modern, consistent code.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/login")

# Find an element by its HTML id attribute
# HTML: <input id="username" type="text" />
username_field = driver.find_element(By.ID, "username")
print(f"Found element: {username_field.tag_name}")
print(f"Element type: {username_field.get_attribute('type')}")

# Find the password field
# HTML: <input id="password" type="password" />
password_field = driver.find_element(By.ID, "password")

# Find the submit button
# HTML: <button id="login-btn">Sign In</button>
login_button = driver.find_element(By.ID, "login-btn")
print(f"Button text: {login_button.text}")

driver.quit()`,
            output: `Found element: input
Element type: text
Button text: Sign In`,
            analogy: 'Finding an element by ID is like looking up a book by its ISBN number. Each ISBN is unique in the world, so you get exactly one result instantly. Similarly, each ID should be unique on a page, making lookups fast and unambiguous.',
          },
          {
            heading: 'Handling Missing Elements',
            content:
              'When `find_element()` cannot locate an element with the given ID, it raises a `NoSuchElementException`. This commonly happens when the page has not fully loaded yet, the element is dynamically rendered by JavaScript, or you simply have the wrong ID. Always handle this exception gracefully rather than letting your script crash unexpectedly.\n\nA defensive approach is to wrap your element lookups in try/except blocks during development, and later replace them with explicit waits (covered in a later section) for production code. You can also check if an element exists without raising an exception by using `find_elements()` (plural) which returns an empty list instead of raising an error.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

driver = webdriver.Chrome()
driver.get("https://example.com")

# Pattern 1: try/except for graceful handling
try:
    element = driver.find_element(By.ID, "nonexistent-id")
except NoSuchElementException:
    print("Element not found! Check the ID or page state.")

# Pattern 2: Check existence with find_elements (plural)
elements = driver.find_elements(By.ID, "nonexistent-id")
if elements:
    print(f"Found: {elements[0].text}")
else:
    print("Element does not exist on this page.")

# Pattern 3: Helper function
def element_exists(drv, by, value):
    """Check if an element exists without raising an exception."""
    return len(drv.find_elements(by, value)) > 0

if element_exists(driver, By.ID, "some-id"):
    print("Element found!")
else:
    print("Element not found.")

driver.quit()`,
            output: `Element not found! Check the ID or page state.
Element does not exist on this page.
Element not found.`,
            tip: 'Use `find_elements()` (plural) to check for element existence without exceptions. It returns an empty list if no elements match, which is easier to handle than catching `NoSuchElementException` every time.',
          },
          {
            heading: 'Common Pitfalls with IDs',
            content:
              'Not all IDs are created equal. Some web frameworks generate dynamic IDs that change on every page load (like `input_3f7a2b1c`), making them unreliable for automation. Before building your locator around an ID, reload the page a few times and check if the ID stays the same. If it changes, you need a different locator strategy like CSS selectors or XPath.\n\nAnother common issue is duplicate IDs. While the HTML spec says IDs must be unique, browsers do not enforce this, and poorly written websites sometimes have multiple elements with the same ID. When duplicates exist, `find_element()` returns the first match, which may not be the one you want. Use browser DevTools (F12 > Elements) to inspect the page and verify your IDs before writing automation code.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/form")

# GOOD: Static, descriptive IDs
email_input = driver.find_element(By.ID, "user-email")
submit_btn = driver.find_element(By.ID, "submit-form")

# BAD: Dynamic IDs that change on reload
# These will break on the next page load!
# element = driver.find_element(By.ID, "input_3f7a2b1c")

# Checking for duplicate IDs (debugging technique)
all_with_id = driver.find_elements(By.ID, "user-email")
if len(all_with_id) > 1:
    print(f"WARNING: Found {len(all_with_id)} elements with the same ID!")
    for i, el in enumerate(all_with_id):
        print(f"  Element {i}: <{el.tag_name}> at ({el.location})")
else:
    print("ID is unique -- safe to use.")

driver.quit()`,
            warning: 'Never rely on IDs that look auto-generated (random characters, sequential numbers, or framework prefixes like `ember-` or `react-`). These change between page loads and will make your tests brittle.',
          },
        ],
        quiz: [
          {
            question: 'Why is By.ID the fastest locator strategy?',
            options: [
              'Because IDs are shorter strings',
              'Because browsers maintain a hash map of IDs for O(1) lookup',
              'Because IDs are always at the top of the DOM',
              'Because Selenium caches ID lookups',
            ],
            correctIndex: 1,
            explanation: 'Browsers internally index elements by their ID in a hash map, enabling constant-time O(1) lookups. Other strategies like CSS or XPath require traversing the DOM tree.',
          },
          {
            question: 'What happens when find_element(By.ID, "x") finds no element?',
            options: [
              'Returns None',
              'Returns an empty list',
              'Raises NoSuchElementException',
              'Returns a placeholder element',
            ],
            correctIndex: 2,
            explanation: '`find_element()` (singular) raises `NoSuchElementException` when no matching element is found. Use `find_elements()` (plural) to get an empty list instead.',
          },
          {
            question: 'Which syntax is correct in Selenium 4?',
            options: [
              'driver.find_element_by_id("username")',
              'driver.find_element(By.ID, "username")',
              'driver.find(id="username")',
              'driver.locate_element(By.ID, "username")',
            ],
            correctIndex: 1,
            explanation: 'Selenium 4 uses `find_element(By.ID, "value")` with the By class. The old `find_element_by_id()` syntax is deprecated.',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to a page, attempts to find elements by three different IDs, prints whether each exists or not (without crashing), and prints the tag name and text of each found element.',
          starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

ids_to_find = ["main-heading", "content", "nonexistent"]

# For each ID, check if it exists and print info
# Use find_elements() to avoid exceptions

driver.quit()`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

ids_to_find = ["main-heading", "content", "nonexistent"]

for element_id in ids_to_find:
    matches = driver.find_elements(By.ID, element_id)
    if matches:
        el = matches[0]
        print(f"ID '{element_id}': Found <{el.tag_name}> - '{el.text[:50]}'")
    else:
        print(f"ID '{element_id}': Not found")

driver.quit()`,
          hints: [
            'Use find_elements() (plural) to get a list instead of an exception',
            'Check if the list is non-empty before accessing elements',
            'Use .tag_name and .text to get element information',
          ],
        },
      },
      {
        id: 'finding-elements-by-css-selector',
        title: 'Finding Elements by CSS Selector',
        difficulty: 'intermediate',
        tags: ['css-selector', 'locators', 'selectors', 'class', 'attribute'],
        sections: [
          {
            heading: 'CSS Selector Basics',
            content:
              'CSS selectors are the same selectors you use in stylesheets to target HTML elements, and they are one of the most versatile locator strategies in Selenium. They let you find elements by tag name, class, attribute, hierarchy, and combinations thereof. CSS selectors are generally faster than XPath because browsers have highly optimized CSS selector engines built into their rendering pipelines.\n\nThe `By.CSS_SELECTOR` strategy accepts any valid CSS selector string. You can combine multiple conditions, target elements by their relationships to other elements, and match partial attribute values. For most automation tasks, CSS selectors provide the best balance of power and readability.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# By tag name
all_paragraphs = driver.find_elements(By.CSS_SELECTOR, "p")
print(f"Found {len(all_paragraphs)} paragraphs")

# By class name (use dot prefix)
# HTML: <div class="container">...</div>
container = driver.find_element(By.CSS_SELECTOR, ".container")

# By ID (use hash prefix)
# HTML: <input id="search" />
search = driver.find_element(By.CSS_SELECTOR, "#search")

# By attribute
# HTML: <input type="email" name="user_email" />
email = driver.find_element(By.CSS_SELECTOR, "input[type='email']")

# Combining: tag + class + attribute
# HTML: <button class="btn primary" data-action="submit">Go</button>
btn = driver.find_element(By.CSS_SELECTOR, "button.btn[data-action='submit']")

driver.quit()`,
            tip: 'Use browser DevTools to test CSS selectors before putting them in your script. Open the Elements panel, press Ctrl+F (or Cmd+F on Mac), and type your CSS selector to see which elements match.',
            analogy: 'CSS selectors work like a filtering system in a library. "Give me all books (tag) in the science section (class) written after 2020 (attribute)" -- each condition narrows down the results. The more specific your selector, the fewer elements match.',
          },
          {
            heading: 'Child and Descendant Selectors',
            content:
              'CSS selectors excel at expressing element relationships. A space between selectors means "descendant" (any depth), while `>` means "direct child" (immediate parent-child relationship). These hierarchical selectors let you target elements based on their position in the DOM tree, which is invaluable when elements lack unique IDs or classes.\n\nYou can also use `+` for adjacent siblings (the next sibling element) and `~` for general siblings (any following sibling). Combining these with class and attribute selectors gives you precise control over which element you target without needing fragile XPath expressions.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Descendant selector (any depth): space
# Find all <a> tags inside elements with class "nav"
nav_links = driver.find_elements(By.CSS_SELECTOR, ".nav a")
print(f"Nav links: {len(nav_links)}")

# Direct child selector: >
# Find <li> that are direct children of <ul class="menu">
menu_items = driver.find_elements(By.CSS_SELECTOR, "ul.menu > li")

# Adjacent sibling: +
# Find the <p> immediately after an <h2>
first_para = driver.find_element(By.CSS_SELECTOR, "h2 + p")

# General sibling: ~
# Find all <p> elements that follow an <h2>
all_paras_after_h2 = driver.find_elements(By.CSS_SELECTOR, "h2 ~ p")

# Nested: Find <span> inside <li> inside <ul class="results">
result_text = driver.find_elements(
    By.CSS_SELECTOR, "ul.results > li > span"
)

# Combining multiple classes
# HTML: <div class="card featured active">...</div>
featured = driver.find_element(By.CSS_SELECTOR, ".card.featured.active")

driver.quit()`,
            note: 'The descendant selector (space) searches at any depth, which can be slow on large DOMs. Prefer the direct child selector (>) when you know the exact parent-child relationship, as it is more efficient and less likely to match unintended elements.',
          },
          {
            heading: 'Attribute and Pseudo Selectors',
            content:
              'CSS attribute selectors can match exact values, partial values, prefixes, and suffixes. This is extremely useful for elements with data attributes, dynamic class names, or when you need to match elements based on patterns rather than exact values. Pseudo-selectors like `:first-child`, `:last-child`, and `:nth-child(n)` let you target elements by their position among siblings.\n\nPartial matching operators include: `*=` (contains), `^=` (starts with), `$=` (ends with). These are particularly helpful when class names or attributes contain dynamic portions that change between page loads, letting you match only the stable part of the value.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Exact attribute match
# HTML: <input type="submit" value="Login" />
submit_btn = driver.find_element(By.CSS_SELECTOR, "input[type='submit']")

# Contains: *= (attribute value contains substring)
# HTML: <div class="user-card-premium">...</div>
cards = driver.find_elements(By.CSS_SELECTOR, "div[class*='card']")

# Starts with: ^= (attribute value starts with)
# HTML: <a href="https://api.example.com/v1/users">...</a>
api_links = driver.find_elements(By.CSS_SELECTOR, "a[href^='https://api']")

# Ends with: $= (attribute value ends with)
# HTML: <a href="/documents/report.pdf">Download</a>
pdf_links = driver.find_elements(By.CSS_SELECTOR, "a[href$='.pdf']")

# Positional pseudo-selectors
first_item = driver.find_element(By.CSS_SELECTOR, "ul.list > li:first-child")
last_item = driver.find_element(By.CSS_SELECTOR, "ul.list > li:last-child")
third_item = driver.find_element(By.CSS_SELECTOR, "ul.list > li:nth-child(3)")

# Even/odd rows (great for tables)
even_rows = driver.find_elements(By.CSS_SELECTOR, "tr:nth-child(even)")
odd_rows = driver.find_elements(By.CSS_SELECTOR, "tr:nth-child(odd)")

# Not selector
# Find all inputs that are NOT disabled
active_inputs = driver.find_elements(
    By.CSS_SELECTOR, "input:not([disabled])"
)

driver.quit()`,
            tip: 'The `:nth-child()` selector is 1-indexed, not 0-indexed. So `:nth-child(1)` is the first element, `:nth-child(2)` is the second, and so on. You can also use formulas like `:nth-child(2n)` for even items or `:nth-child(2n+1)` for odd items.',
          },
        ],
        quiz: [
          {
            question: 'What CSS selector finds elements with class "btn" that are direct children of a div?',
            options: ['div .btn', 'div > .btn', 'div + .btn', 'div ~ .btn'],
            correctIndex: 1,
            explanation: 'The `>` combinator selects direct children only. `div > .btn` finds elements with class "btn" that are immediate children of a div. A space would find descendants at any depth.',
          },
          {
            question: 'Which attribute selector matches elements whose href ends with ".pdf"?',
            options: ['a[href~=".pdf"]', 'a[href*=".pdf"]', 'a[href$=".pdf"]', 'a[href^=".pdf"]'],
            correctIndex: 2,
            explanation: 'The `$=` operator matches the end of an attribute value. `a[href$=".pdf"]` finds links whose href ends with ".pdf".',
          },
          {
            question: 'Why are CSS selectors generally faster than XPath in browsers?',
            options: [
              'CSS selectors use less memory',
              'Browsers have highly optimized CSS engines built into their rendering pipelines',
              'CSS selectors are shorter strings',
              'XPath is an older technology',
            ],
            correctIndex: 1,
            explanation: 'Browsers use CSS selectors constantly for styling during rendering, so their CSS engines are extremely optimized. XPath requires a separate evaluation engine.',
          },
          {
            question: 'What does `div.card.featured` select?',
            options: [
              'A div with class "card" inside an element with class "featured"',
              'A div with both classes "card" and "featured"',
              'A div with class "card-featured"',
              'A div with either class "card" or "featured"',
            ],
            correctIndex: 1,
            explanation: 'Chaining class selectors without spaces (`.card.featured`) means the element must have ALL listed classes. It selects a div with both "card" and "featured" classes.',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to a page and uses CSS selectors to: (1) find all links that start with "https", (2) find the third list item in a ul, (3) find all input elements that are not disabled. Print the count for each query.',
          starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# 1. Find all links whose href starts with "https"

# 2. Find the third list item in a ul

# 3. Find all input elements that are not disabled

driver.quit()`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

try:
    # 1. Find all links whose href starts with "https"
    https_links = driver.find_elements(By.CSS_SELECTOR, "a[href^='https']")
    print(f"HTTPS links: {len(https_links)}")

    # 2. Find the third list item in a ul
    third_items = driver.find_elements(By.CSS_SELECTOR, "ul > li:nth-child(3)")
    print(f"Third list items: {len(third_items)}")

    # 3. Find all input elements that are not disabled
    active_inputs = driver.find_elements(By.CSS_SELECTOR, "input:not([disabled])")
    print(f"Active inputs: {len(active_inputs)}")
finally:
    driver.quit()`,
          hints: [
            'Use ^= for "starts with" attribute matching',
            'Use :nth-child(3) for the third child (1-indexed)',
            'Use :not([disabled]) to exclude disabled elements',
          ],
        },
      },
      {
        id: 'finding-elements-by-xpath',
        title: 'Finding Elements by XPath',
        difficulty: 'intermediate',
        tags: ['xpath', 'locators', 'axes', 'predicates', 'selectors'],
        sections: [
          {
            heading: 'XPath Fundamentals',
            content:
              'XPath (XML Path Language) is a query language for selecting nodes in XML/HTML documents. While CSS selectors are generally preferred for their speed and readability, XPath has capabilities that CSS selectors simply cannot match: it can traverse the DOM upward (from child to parent), match elements by their text content, and express complex conditional logic. These unique abilities make XPath indispensable for certain automation scenarios.\n\nXPath expressions come in two forms: absolute paths (starting from the root with `/html/body/...`) and relative paths (starting with `//` to search anywhere in the document). Absolute paths are fragile because any change to the page structure breaks them. Always prefer relative XPath expressions that target elements by their attributes or relationships.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# AVOID: Absolute XPath (fragile, breaks easily)
# element = driver.find_element(By.XPATH, "/html/body/div[1]/p[2]")

# GOOD: Relative XPath (flexible, resilient)
# Find by attribute
element = driver.find_element(By.XPATH, "//input[@id='username']")

# Find by tag name
headings = driver.find_elements(By.XPATH, "//h1")

# Find by text content (XPath exclusive feature!)
link = driver.find_element(By.XPATH, "//a[text()='More information...']")
print(f"Link href: {link.get_attribute('href')}")

# Find by partial text content
link2 = driver.find_element(By.XPATH, "//a[contains(text(), 'More')]")

# Find by multiple conditions
elem = driver.find_element(
    By.XPATH, "//input[@type='text' and @name='search']"
)

driver.quit()`,
            analogy: 'If CSS selectors are like giving directions using street names ("go to Main Street, turn at First Avenue"), XPath is like using GPS coordinates -- more verbose, but capable of pinpointing any location, even ones you cannot describe with simple directions.',
            tip: 'The biggest advantage of XPath over CSS selectors is the ability to find elements by their visible text content. Use `text()=\'exact text\'` for exact matches or `contains(text(), \'partial\')` for partial matches.',
          },
          {
            heading: 'XPath Axes: Navigating the DOM Tree',
            content:
              'XPath axes let you navigate the DOM tree in any direction -- up to parents, down to children, sideways to siblings, or even to ancestors at any depth. This bidirectional navigation is XPath\'s killer feature and something CSS selectors cannot do. The `parent::` axis moves up one level, `ancestor::` moves up any number of levels, `following-sibling::` moves to the next sibling, and `preceding-sibling::` moves to the previous sibling.\n\nThe most commonly used axis is `parent::` (or its shorthand `..`), which lets you find an element and then navigate to its container. This is useful when you can easily locate a label or text, but the element you actually need to interact with is its parent or sibling.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/form")

# Parent axis: find a label, then get its parent
# HTML: <div class="field"><label>Email</label><input type="email"/></div>
label = driver.find_element(By.XPATH, "//label[text()='Email']")
field_div = driver.find_element(By.XPATH, "//label[text()='Email']/..")
# Or equivalently:
field_div = driver.find_element(
    By.XPATH, "//label[text()='Email']/parent::div"
)

# Ancestor axis: find an element deep in the tree, get a container
# Go up to the nearest <form> ancestor
form = driver.find_element(
    By.XPATH, "//input[@id='email']/ancestor::form"
)

# Following-sibling: find the input next to a label
email_input = driver.find_element(
    By.XPATH, "//label[text()='Email']/following-sibling::input"
)

# Preceding-sibling: find the label before an input
email_label = driver.find_element(
    By.XPATH, "//input[@id='email']/preceding-sibling::label"
)
print(f"Label text: {email_label.text}")

# Descendant axis: find all inputs inside a specific form
all_inputs = driver.find_elements(
    By.XPATH, "//form[@id='login-form']/descendant::input"
)
print(f"Inputs in form: {len(all_inputs)}")

driver.quit()`,
            note: 'The `..` shorthand is equivalent to `parent::node()` and is the most commonly used axis shorthand. The `.` shorthand refers to the current node, which is useful inside predicates.',
          },
          {
            heading: 'XPath Predicates and Functions',
            content:
              'XPath predicates are conditions enclosed in square brackets `[]` that filter elements. You can use predicates to match attribute values, check position, compare text content, and combine multiple conditions. XPath also provides built-in functions like `contains()`, `starts-with()`, `normalize-space()`, and `not()` that enable sophisticated matching logic.\n\nPredicates can be chained and nested, allowing you to express very precise element queries. The `position()` function (or shorthand `[n]`) selects elements by their position among siblings, while `last()` selects the final element. These positional predicates use 1-based indexing, matching the XPath convention.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Attribute predicates
elem = driver.find_element(By.XPATH, "//input[@type='text']")
elem = driver.find_element(By.XPATH, "//div[@class='container']")

# contains() -- partial attribute match
elem = driver.find_element(By.XPATH, "//div[contains(@class, 'card')]")

# starts-with() -- attribute prefix match
elems = driver.find_elements(
    By.XPATH, "//div[starts-with(@id, 'section-')]"
)

# Positional predicates (1-indexed!)
first_li = driver.find_element(By.XPATH, "//ul/li[1]")       # First
last_li = driver.find_element(By.XPATH, "//ul/li[last()]")   # Last
second_li = driver.find_element(By.XPATH, "//ul/li[2]")      # Second

# Combining conditions with and/or
elem = driver.find_element(
    By.XPATH,
    "//input[@type='text' and @placeholder='Search']"
)

# not() function
visible = driver.find_elements(
    By.XPATH, "//input[not(@type='hidden')]"
)

# normalize-space() -- handles extra whitespace
elem = driver.find_element(
    By.XPATH, "//button[normalize-space(text())='Submit']"
)

# Chained predicates (AND logic)
elem = driver.find_element(
    By.XPATH, "//li[@class='active'][position()>2]"
)

driver.quit()`,
            warning: 'XPath uses 1-based indexing, not 0-based. `//li[1]` is the first element, not `//li[0]`. Using `[0]` will not raise an error but will never match anything, which is a subtle and frustrating bug.',
          },
        ],
        quiz: [
          {
            question: 'What can XPath do that CSS selectors cannot?',
            options: [
              'Find elements by class name',
              'Navigate upward from child to parent',
              'Find elements by tag name',
              'Match elements by attribute values',
            ],
            correctIndex: 1,
            explanation: 'XPath can traverse the DOM in any direction, including upward to parents and ancestors. CSS selectors can only traverse downward (descendants) and sideways (siblings).',
          },
          {
            question: 'What does `//label[text()="Email"]/..` select?',
            options: [
              'The label with text "Email"',
              'The parent element of the label with text "Email"',
              'All labels on the page',
              'The child of the label',
            ],
            correctIndex: 1,
            explanation: 'The `..` in XPath is shorthand for `parent::node()`, so this expression finds the label with text "Email" and then navigates to its parent element.',
          },
          {
            question: 'What is the indexing convention in XPath?',
            options: ['0-based', '1-based', 'It varies by browser', 'It uses negative indexing'],
            correctIndex: 1,
            explanation: 'XPath uses 1-based indexing. `//li[1]` is the first element, `//li[2]` is the second, and so on. This differs from Python\'s 0-based indexing.',
          },
          {
            question: 'Which XPath function matches partial text content?',
            options: ['text()', 'contains()', 'starts-with()', 'matches()'],
            correctIndex: 1,
            explanation: '`contains(text(), "partial")` matches elements whose text content includes the specified substring. `text()` requires an exact match.',
          },
        ],
        challenge: {
          prompt: 'Write a script that uses XPath to: (1) find a link by its visible text, (2) find the parent div of an input with id "email", and (3) find all list items that contain the word "Python" in their text. Print results for each.',
          starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# 1. Find a link by its exact visible text "More information..."

# 2. Find the parent div of an input with id "email"

# 3. Find all list items containing "Python" in their text

driver.quit()`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

try:
    # 1. Find a link by its exact visible text
    link = driver.find_element(By.XPATH, "//a[text()='More information...']")
    print(f"Link href: {link.get_attribute('href')}")

    # 2. Find the parent div of an input with id "email"
    parent_div = driver.find_element(
        By.XPATH, "//input[@id='email']/parent::div"
    )
    print(f"Parent class: {parent_div.get_attribute('class')}")

    # 3. Find all list items containing "Python"
    python_items = driver.find_elements(
        By.XPATH, "//li[contains(text(), 'Python')]"
    )
    print(f"Python items: {len(python_items)}")
    for item in python_items:
        print(f"  - {item.text}")
finally:
    driver.quit()`,
          hints: [
            'Use text()="exact text" for exact text matching in XPath',
            'Use /parent::div or /.. to navigate to the parent',
            'Use contains(text(), "substring") for partial text matching',
          ],
        },
      },
      {
        id: 'finding-elements-by-name-class-tag',
        title: 'Finding Elements by Name, Class, Tag',
        difficulty: 'beginner',
        tags: ['by-name', 'by-class-name', 'by-tag-name', 'locators'],
        sections: [
          {
            heading: 'Finding by Name Attribute',
            content:
              'The `By.NAME` locator finds elements by their `name` HTML attribute, which is most commonly used on form elements like `<input>`, `<select>`, and `<textarea>`. Unlike IDs, the `name` attribute does not have to be unique on a page -- multiple radio buttons often share the same name to form a group. When multiple elements share a name, `find_element()` returns the first match.\n\nThe `name` attribute is particularly important for form submission because it determines the key used when form data is sent to the server. This makes it a reliable locator for form fields, as developers rarely change `name` attributes (doing so would break server-side processing).',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/form")

# Find form fields by name
# HTML: <input name="username" type="text" />
username = driver.find_element(By.NAME, "username")
username.send_keys("testuser")

# HTML: <input name="password" type="password" />
password = driver.find_element(By.NAME, "password")
password.send_keys("secret123")

# HTML: <select name="country">...</select>
country = driver.find_element(By.NAME, "country")

# Radio buttons with the same name
# HTML: <input name="gender" type="radio" value="male" />
#       <input name="gender" type="radio" value="female" />
gender_options = driver.find_elements(By.NAME, "gender")
print(f"Gender options: {len(gender_options)}")

# Select a specific radio button
for option in gender_options:
    if option.get_attribute("value") == "male":
        option.click()
        break

driver.quit()`,
            tip: 'The `name` attribute is one of the most stable locators for form elements because changing it would break the form\'s server-side handling. Prefer `By.NAME` over `By.CLASS_NAME` for input fields when the name attribute is available.',
            analogy: 'The `name` attribute is like a person\'s role at a company. Multiple people can be "engineers" (same name), but if you ask for "the engineer," you get the first one you encounter. If you need a specific one, you combine the role with other details.',
          },
          {
            heading: 'Finding by Class Name',
            content:
              'The `By.CLASS_NAME` locator finds elements by a single CSS class. Note the important limitation: `By.CLASS_NAME` accepts only one class name, not multiple. If an element has `class="btn primary large"`, you can search for `By.CLASS_NAME, "btn"` or `By.CLASS_NAME, "primary"`, but NOT `By.CLASS_NAME, "btn primary"`. For multi-class matching, use `By.CSS_SELECTOR` instead.\n\nClass names are less reliable than IDs for unique identification because many elements typically share the same class. However, they are excellent for finding groups of similar elements, such as all cards on a page, all navigation links, or all error messages.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Find by a single class name
# HTML: <div class="card featured">...</div>
cards = driver.find_elements(By.CLASS_NAME, "card")
print(f"Found {len(cards)} cards")

# Get the first card
first_card = driver.find_element(By.CLASS_NAME, "card")
print(f"First card text: {first_card.text[:50]}")

# WRONG: Multiple classes with By.CLASS_NAME
# This will raise InvalidSelectorException!
# driver.find_element(By.CLASS_NAME, "card featured")

# CORRECT: Use CSS_SELECTOR for multiple classes
featured = driver.find_element(By.CSS_SELECTOR, ".card.featured")
print(f"Featured card: {featured.text[:50]}")

# Finding error messages
errors = driver.find_elements(By.CLASS_NAME, "error-message")
if errors:
    for err in errors:
        print(f"Error: {err.text}")
else:
    print("No errors on the page")

driver.quit()`,
            warning: '`By.CLASS_NAME` only accepts a single class name. Passing multiple classes like `"btn primary"` will raise an `InvalidSelectorException`. Use `By.CSS_SELECTOR` with `.btn.primary` to match elements with multiple classes.',
          },
          {
            heading: 'Finding by Tag Name',
            content:
              'The `By.TAG_NAME` locator finds elements by their HTML tag name, such as `div`, `input`, `a`, `p`, `h1`, etc. This is the broadest locator -- it matches all elements of a given type on the page. It is most useful when you want to collect all elements of a specific kind (all links, all images, all headings) or when targeting elements that are rare on the page, like `<form>` or `<table>`.\n\nTag name selectors are rarely specific enough for finding a single element, but they combine well with other techniques. For example, find a container by ID, then use `find_elements(By.TAG_NAME, "li")` on that container to get only its list items.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Find all links on the page
all_links = driver.find_elements(By.TAG_NAME, "a")
print(f"Total links: {len(all_links)}")
for link in all_links[:5]:  # Print first 5
    href = link.get_attribute("href")
    print(f"  {link.text} -> {href}")

# Find all images
images = driver.find_elements(By.TAG_NAME, "img")
print(f"Total images: {len(images)}")

# Find the first h1 heading
h1 = driver.find_element(By.TAG_NAME, "h1")
print(f"Page heading: {h1.text}")

# Scoped search: find elements within a container
nav = driver.find_element(By.TAG_NAME, "nav")
nav_links = nav.find_elements(By.TAG_NAME, "a")
print(f"Navigation links: {len(nav_links)}")

# Find all form elements
forms = driver.find_elements(By.TAG_NAME, "form")
print(f"Forms on page: {len(forms)}")
for form in forms:
    inputs = form.find_elements(By.TAG_NAME, "input")
    print(f"  Form with {len(inputs)} inputs")

driver.quit()`,
            note: 'You can call `find_element()` and `find_elements()` on any WebElement, not just on the driver. This scoped search only looks within that element\'s descendants, which is a powerful way to narrow down your search.',
          },
        ],
        quiz: [
          {
            question: 'What happens when you pass multiple class names to By.CLASS_NAME?',
            options: [
              'It finds elements with any of the classes',
              'It finds elements with all the classes',
              'It raises InvalidSelectorException',
              'It ignores the extra classes',
            ],
            correctIndex: 2,
            explanation: '`By.CLASS_NAME` only accepts a single class name. Passing multiple classes (e.g., "btn primary") raises an `InvalidSelectorException`. Use `By.CSS_SELECTOR` with `.btn.primary` instead.',
          },
          {
            question: 'Why is By.NAME a reliable locator for form inputs?',
            options: [
              'Name attributes are always unique',
              'Changing the name would break server-side form processing',
              'Browsers require name attributes',
              'Name is faster than ID',
            ],
            correctIndex: 1,
            explanation: 'The `name` attribute determines the key used when form data is sent to the server. Developers rarely change it because doing so would break the backend\'s ability to process the form.',
          },
          {
            question: 'How can you search for elements only within a specific container?',
            options: [
              'Use a global search with a longer selector',
              'Call find_element() on the container element instead of the driver',
              'Set a search scope in the driver options',
              'This is not possible in Selenium',
            ],
            correctIndex: 1,
            explanation: 'You can call `find_element()` and `find_elements()` on any WebElement, not just the driver. This performs a scoped search within that element\'s descendants only.',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to a page and: (1) finds all input fields by tag name, (2) finds a specific input by its name attribute, (3) finds all elements with class "highlight", and prints the count and details of each result.',
          starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/form")

# 1. Find all input fields by tag name

# 2. Find the input with name="email"

# 3. Find all elements with class "highlight"

driver.quit()`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/form")

try:
    # 1. Find all input fields by tag name
    inputs = driver.find_elements(By.TAG_NAME, "input")
    print(f"Total inputs: {len(inputs)}")
    for inp in inputs:
        print(f"  name={inp.get_attribute('name')}, type={inp.get_attribute('type')}")

    # 2. Find the input with name="email"
    email_input = driver.find_element(By.NAME, "email")
    print(f"Email input type: {email_input.get_attribute('type')}")

    # 3. Find all elements with class "highlight"
    highlights = driver.find_elements(By.CLASS_NAME, "highlight")
    print(f"Highlighted elements: {len(highlights)}")
    for h in highlights:
        print(f"  <{h.tag_name}>: {h.text[:40]}")
finally:
    driver.quit()`,
          hints: [
            'Use By.TAG_NAME, "input" to find all inputs',
            'Use By.NAME, "email" for the specific input',
            'Use By.CLASS_NAME with a single class name',
          ],
        },
      },
      {
        id: 'finding-multiple-elements',
        title: 'Finding Multiple Elements',
        difficulty: 'beginner',
        tags: ['find-elements', 'iteration', 'lists', 'bulk-operations'],
        sections: [
          {
            heading: 'find_element vs find_elements',
            content:
              'Selenium provides two methods for locating elements: `find_element()` (singular) returns a single WebElement, while `find_elements()` (plural) returns a list of all matching WebElements. The critical difference in error handling is that `find_element()` raises `NoSuchElementException` when no match is found, but `find_elements()` simply returns an empty list. This makes `find_elements()` safer for exploratory searches where you are not sure if elements exist.\n\nWhen `find_element()` finds multiple matches, it returns only the first one in DOM order. With `find_elements()`, you get all matches, which you can then iterate over, filter, or index into. Both methods support all the same locator strategies (By.ID, By.CSS_SELECTOR, By.XPATH, etc.).',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

driver = webdriver.Chrome()
driver.get("https://example.com")

# find_element: returns one element or raises exception
try:
    heading = driver.find_element(By.TAG_NAME, "h1")
    print(f"Heading: {heading.text}")
except NoSuchElementException:
    print("No h1 found")

# find_elements: returns a list (possibly empty)
paragraphs = driver.find_elements(By.TAG_NAME, "p")
print(f"Found {len(paragraphs)} paragraphs")

# Safe check: is an element present?
errors = driver.find_elements(By.CLASS_NAME, "error")
if errors:
    print(f"Found {len(errors)} errors")
else:
    print("No errors found (empty list, no exception)")

# find_element returns the FIRST match
first_link = driver.find_element(By.TAG_NAME, "a")
print(f"First link: {first_link.text}")

# find_elements returns ALL matches
all_links = driver.find_elements(By.TAG_NAME, "a")
print(f"All links: {len(all_links)}")

driver.quit()`,
            analogy: 'Think of `find_element()` as asking "Give me THE book about Python" at a library -- if there is none, the librarian says "Sorry, we do not have it" (exception). `find_elements()` is like asking "Give me ALL books about Python" -- if there are none, you get an empty cart (empty list), no apology needed.',
          },
          {
            heading: 'Iterating Over Elements',
            content:
              'Once you have a list of elements from `find_elements()`, you can iterate over them using standard Python loops, list comprehensions, and built-in functions. This is essential for tasks like scraping data from tables, clicking through search results, or collecting information from repeated page elements like product cards or news articles.\n\nRemember that each WebElement in the list is a live reference to an element in the browser. If the page changes (navigation, AJAX update, or DOM manipulation), these references can become stale. Always process elements promptly after finding them, or re-find them if the page has changed.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Basic iteration
links = driver.find_elements(By.TAG_NAME, "a")
for link in links:
    text = link.text
    href = link.get_attribute("href")
    print(f"Link: {text} -> {href}")

# List comprehension to extract data
link_texts = [link.text for link in links if link.text.strip()]
print(f"Non-empty link texts: {link_texts}")

# Enumerate for index tracking
for i, link in enumerate(links):
    print(f"  [{i}] {link.text}")

# Filter elements by property
visible_links = [l for l in links if l.is_displayed()]
print(f"Visible links: {len(visible_links)} of {len(links)}")

# Extract table data
driver.get("https://example.com/table")
rows = driver.find_elements(By.CSS_SELECTOR, "table tbody tr")
table_data = []
for row in rows:
    cells = row.find_elements(By.TAG_NAME, "td")
    row_data = [cell.text for cell in cells]
    table_data.append(row_data)
print(f"Table rows: {len(table_data)}")

driver.quit()`,
            tip: 'Use list comprehensions for clean, Pythonic element processing. `[el.text for el in elements]` is faster and more readable than a for loop that appends to a list.',
          },
          {
            heading: 'Practical Patterns for Multiple Elements',
            content:
              'Working with multiple elements is at the heart of many automation tasks. Common patterns include: collecting data from repeated elements (like product listings), interacting with items in a list (like selecting checkboxes), and building data structures from page content (like scraping tables into dictionaries). A robust pattern is to find a container first, then search within it to avoid matching unrelated elements elsewhere on the page.\n\nWhen you need to click multiple elements, be careful about stale references. Clicking a link that navigates to a new page invalidates all previously found elements. In such cases, you need to re-find elements after each navigation.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Pattern 1: Scoped search within a container
nav = driver.find_element(By.CSS_SELECTOR, "nav.main-nav")
nav_links = nav.find_elements(By.TAG_NAME, "a")
print(f"Nav links only: {len(nav_links)}")

# Pattern 2: Extract structured data
cards = driver.find_elements(By.CSS_SELECTOR, ".product-card")
products = []
for card in cards:
    product = {
        "name": card.find_element(By.CSS_SELECTOR, ".title").text,
        "price": card.find_element(By.CSS_SELECTOR, ".price").text,
        "in_stock": card.find_element(
            By.CSS_SELECTOR, ".stock"
        ).is_displayed(),
    }
    products.append(product)

# Pattern 3: Select checkboxes matching a condition
checkboxes = driver.find_elements(By.CSS_SELECTOR, "input[type='checkbox']")
for cb in checkboxes:
    if not cb.is_selected():
        cb.click()  # Check all unchecked boxes
print(f"Checked {len(checkboxes)} checkboxes")

# Pattern 4: Count and verify
expected_count = 10
items = driver.find_elements(By.CSS_SELECTOR, ".search-result")
assert len(items) == expected_count, (
    f"Expected {expected_count} results, got {len(items)}"
)

driver.quit()`,
            warning: 'After clicking a link that navigates to a new page, all previously found WebElement references become stale. Accessing them will raise `StaleElementReferenceException`. Always re-find elements after page navigation.',
          },
        ],
        quiz: [
          {
            question: 'What does find_elements() return when no elements match?',
            options: [
              'None',
              'Raises NoSuchElementException',
              'An empty list []',
              'A list with one None element',
            ],
            correctIndex: 2,
            explanation: '`find_elements()` returns an empty list `[]` when no elements match. Unlike `find_element()`, it never raises `NoSuchElementException`.',
          },
          {
            question: 'What happens to WebElement references after the page navigates?',
            options: [
              'They still work normally',
              'They become stale and raise StaleElementReferenceException',
              'They return None',
              'They automatically update to the new page',
            ],
            correctIndex: 1,
            explanation: 'After page navigation, all previously found WebElement references become stale because the DOM has been replaced. Accessing them raises `StaleElementReferenceException`.',
          },
          {
            question: 'How do you search for elements only within a specific container?',
            options: [
              'Pass a scope parameter to find_elements()',
              'Call find_elements() on the container WebElement',
              'Use a special "scoped" locator strategy',
              'Set driver.search_scope before calling find_elements()',
            ],
            correctIndex: 1,
            explanation: 'You call `find_elements()` on a WebElement (the container) instead of the driver. This searches only within that element\'s descendants.',
          },
        ],
        challenge: {
          prompt: 'Write a script that finds all links on a page, filters them to only those that are visible and have non-empty text, extracts each link\'s text and href into a list of dictionaries, and prints the results.',
          starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Find all links on the page

# Filter to visible links with non-empty text

# Extract text and href into a list of dicts

# Print the results

driver.quit()`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

try:
    all_links = driver.find_elements(By.TAG_NAME, "a")

    link_data = []
    for link in all_links:
        if link.is_displayed() and link.text.strip():
            link_data.append({
                "text": link.text.strip(),
                "href": link.get_attribute("href"),
            })

    print(f"Found {len(link_data)} visible links with text:")
    for item in link_data:
        print(f"  {item['text']} -> {item['href']}")
finally:
    driver.quit()`,
          hints: [
            'Use find_elements(By.TAG_NAME, "a") to get all links',
            'Use is_displayed() to check visibility and .text.strip() for non-empty text',
            'Build dictionaries with "text" and "href" keys',
          ],
        },
      },
    ],
  },
  /* ------------------------------------------------------------ */
  /*  Basic Interactions                                            */
  /* ------------------------------------------------------------ */
  {
    id: 'basic-interactions',
    label: 'Basic Interactions',
    icon: 'MousePointer',
    entries: [
      {
        id: 'clicking-elements',
        title: 'Clicking Elements',
        difficulty: 'beginner',
        tags: ['click', 'submit', 'double-click', 'actions', 'interaction'],
        sections: [
          {
            heading: 'Basic Click',
            content:
              'The `click()` method is the most fundamental interaction in Selenium. It simulates a mouse click on an element, just as if a user physically clicked it. Before clicking, Selenium scrolls the element into view if necessary and checks that the element is both visible and enabled. If the element is obscured by another element (like an overlay or popup), the click may fail with an `ElementClickInterceptedException`.\n\nYou can click on virtually any HTML element -- buttons, links, checkboxes, radio buttons, images, divs, spans, and more. The behavior depends on the element type: clicking a link navigates to a URL, clicking a checkbox toggles its state, and clicking a button may submit a form or trigger JavaScript.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/form")

# Click a button
login_btn = driver.find_element(By.ID, "login-button")
login_btn.click()

# Click a link (triggers navigation)
link = driver.find_element(By.CSS_SELECTOR, "a.nav-link")
link.click()
print(f"Navigated to: {driver.current_url}")

# Click a checkbox (toggles its state)
checkbox = driver.find_element(By.ID, "agree-terms")
print(f"Before click: {checkbox.is_selected()}")
checkbox.click()
print(f"After click: {checkbox.is_selected()}")

# Click a radio button
radio = driver.find_element(By.CSS_SELECTOR, "input[value='option-a']")
radio.click()
print(f"Selected: {radio.is_selected()}")

driver.quit()`,
            output: `Navigated to: https://example.com/dashboard
Before click: False
After click: True
Selected: True`,
            analogy: 'The `click()` method is like poking a touchscreen with your finger. Selenium moves the virtual pointer to the element, checks nothing is blocking it, and then pokes. The page reacts just as it would to a real touch.',
          },
          {
            heading: 'Submit Forms',
            content:
              'The `submit()` method is specifically designed for form elements. When called on any element within a `<form>`, it submits the form as if the user pressed Enter or clicked the submit button. This is different from `click()` because `submit()` works on any form element (not just the submit button) and it triggers the form\'s native submission behavior.\n\nHowever, `submit()` is less commonly used in modern Selenium scripts because many modern web applications use JavaScript to handle form submissions rather than native HTML form submission. In these cases, you should click the actual submit button instead, which triggers the JavaScript handlers. Use `submit()` only when dealing with traditional server-side form handling.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/login")

# Fill in form fields
username = driver.find_element(By.NAME, "username")
username.send_keys("testuser")

password = driver.find_element(By.NAME, "password")
password.send_keys("mypassword")

# Method 1: submit() on any form element
# This submits the entire form
password.submit()

# Method 2: Click the submit button (preferred for JS-heavy apps)
# submit_btn = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
# submit_btn.click()

# Method 3: Press Enter key (simulates keyboard submission)
# from selenium.webdriver.common.keys import Keys
# password.send_keys(Keys.RETURN)

print(f"After submit: {driver.current_url}")

driver.quit()`,
            tip: 'Prefer clicking the actual submit button over using `submit()` in modern web apps. Many single-page applications use JavaScript event handlers on the button, which `submit()` may bypass entirely.',
          },
          {
            heading: 'Double Click and Context Click',
            content:
              'For advanced mouse interactions like double-clicking and right-clicking (context click), Selenium provides the `ActionChains` class. ActionChains let you build a sequence of low-level mouse and keyboard actions, then execute them all at once. This is necessary because the simple `click()` method only performs single left-clicks.\n\nThe ActionChains pattern is "build then perform": you chain together multiple actions, then call `perform()` to execute them. Each action is queued up until `perform()` is called, at which point they execute in order. This allows complex interactions like drag-and-drop, hover-then-click, or click-and-hold.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains

driver = webdriver.Chrome()
driver.get("https://example.com")

actions = ActionChains(driver)

# Double-click an element
element = driver.find_element(By.ID, "editable-text")
actions.double_click(element).perform()
print("Double-clicked!")

# Right-click (context click)
target = driver.find_element(By.ID, "context-menu-target")
actions.context_click(target).perform()
print("Right-clicked -- context menu should appear")

# Hover over an element (move to element)
menu = driver.find_element(By.CSS_SELECTOR, ".dropdown-trigger")
actions.move_to_element(menu).perform()
print("Hovering over dropdown -- submenu should appear")

# Click after hovering (chained actions)
actions = ActionChains(driver)  # Create fresh chain
dropdown = driver.find_element(By.CSS_SELECTOR, ".dropdown-trigger")
actions.move_to_element(dropdown).perform()

# Now the submenu is visible, click an option
sub_item = driver.find_element(By.CSS_SELECTOR, ".dropdown-item")
sub_item.click()

driver.quit()`,
            note: 'Create a new `ActionChains` instance when starting a new sequence of actions. Reusing an old instance may carry over queued actions from a previous `perform()` call, leading to unexpected behavior.',
          },
        ],
        quiz: [
          {
            question: 'What exception is raised when another element is blocking the click target?',
            options: [
              'NoSuchElementException',
              'ElementClickInterceptedException',
              'StaleElementReferenceException',
              'ElementNotInteractableException',
            ],
            correctIndex: 1,
            explanation: '`ElementClickInterceptedException` is raised when another element (like an overlay, popup, or sticky header) is covering the target element, preventing the click from reaching it.',
          },
          {
            question: 'What is the difference between click() and submit()?',
            options: [
              'They are identical',
              'click() works on any element; submit() submits the containing form',
              'submit() is faster than click()',
              'click() only works on buttons',
            ],
            correctIndex: 1,
            explanation: '`click()` simulates a mouse click on any element. `submit()` triggers native form submission on the enclosing `<form>` element, regardless of which form element you call it on.',
          },
          {
            question: 'Which class is needed for double-click and right-click actions?',
            options: ['MouseActions', 'ActionChains', 'ClickHelper', 'EventDriver'],
            correctIndex: 1,
            explanation: '`ActionChains` from `selenium.webdriver.common.action_chains` provides advanced mouse interactions like double-click, right-click, hover, drag-and-drop, and more.',
          },
          {
            question: 'When should you prefer clicking the submit button over using submit()?',
            options: [
              'When the button is large',
              'When the form uses JavaScript handlers for submission',
              'When testing on Firefox',
              'When the form has only one field',
            ],
            correctIndex: 1,
            explanation: 'Modern web apps use JavaScript event handlers on submit buttons. Using `submit()` triggers native HTML form submission, which may bypass those handlers entirely.',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to a form page, fills in a username and password field, checks an "agree to terms" checkbox, and submits the form by clicking the submit button. Print the page URL before and after submission.',
          starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/register")

# Print current URL
# Fill in username (name="username")
# Fill in password (name="password")
# Check the terms checkbox (id="agree-terms")
# Click the submit button (id="submit-btn")
# Print the new URL

driver.quit()`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/register")

try:
    print(f"Before: {driver.current_url}")

    driver.find_element(By.NAME, "username").send_keys("testuser")
    driver.find_element(By.NAME, "password").send_keys("securePass123")

    terms = driver.find_element(By.ID, "agree-terms")
    if not terms.is_selected():
        terms.click()

    driver.find_element(By.ID, "submit-btn").click()
    print(f"After: {driver.current_url}")
finally:
    driver.quit()`,
          hints: [
            'Use send_keys() to type into input fields',
            'Check is_selected() before clicking the checkbox to avoid unchecking it',
            'Use click() on the submit button to trigger JavaScript handlers',
          ],
        },
      },
      {
        id: 'typing-and-clearing-text',
        title: 'Typing and Clearing Text',
        difficulty: 'beginner',
        tags: ['send-keys', 'clear', 'keyboard', 'input', 'keys'],
        sections: [
          {
            heading: 'Typing Text with send_keys',
            content:
              'The `send_keys()` method simulates typing on the keyboard by sending individual keystrokes to an element. It works on any element that accepts keyboard input, primarily `<input>` and `<textarea>` elements. Each character is sent as a separate keystroke, which means JavaScript `keydown`, `keypress`, and `keyup` events all fire normally -- exactly as if a real user were typing.\n\nAn important detail: `send_keys()` appends text to whatever is already in the field. If the field already contains "Hello" and you call `send_keys("World")`, the result is "HelloWorld". To replace the existing text, call `clear()` first. This append behavior is actually useful for building up values incrementally or testing auto-complete functionality.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/form")

# Type into a text field
search_box = driver.find_element(By.NAME, "search")
search_box.send_keys("Selenium Python tutorial")
print(f"Field value: {search_box.get_attribute('value')}")

# send_keys APPENDS to existing text
search_box.send_keys(" 2024")
print(f"After append: {search_box.get_attribute('value')}")

# Type into a textarea (multi-line)
comment = driver.find_element(By.ID, "comment")
comment.send_keys("First line")
comment.send_keys("\\nSecond line")  # Newline within the text
print(f"Comment: {comment.get_attribute('value')}")

# Type into a password field (characters are masked)
password = driver.find_element(By.NAME, "password")
password.send_keys("s3cur3P@ss!")
# The display shows dots, but the value is the actual text
print(f"Password value: {password.get_attribute('value')}")

driver.quit()`,
            output: `Field value: Selenium Python tutorial
After append: Selenium Python tutorial 2024
Comment: First line
Second line
Password value: s3cur3P@ss!`,
            analogy: 'Think of `send_keys()` as a person typing on a keyboard while looking at the screen. Each keystroke is real -- the browser sees keydown, keypress, and keyup events. This is different from directly setting the value property, which bypasses all keyboard events.',
          },
          {
            heading: 'Clearing Input Fields',
            content:
              'The `clear()` method removes all text from an input field or textarea. Under the hood, it triggers a `change` event on the element, which is important because many forms use this event to validate input. Always call `clear()` before `send_keys()` when you want to replace the existing value rather than append to it.\n\nIn some cases, `clear()` might not work as expected -- particularly with custom JavaScript input components (like React controlled inputs) that intercept and override the clear behavior. For these edge cases, you can use a keyboard shortcut to select all text and delete it manually.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import platform

driver = webdriver.Chrome()
driver.get("https://example.com/form")

# Standard clear + type pattern
field = driver.find_element(By.NAME, "username")
field.send_keys("old_value")
print(f"Before clear: {field.get_attribute('value')}")

field.clear()
print(f"After clear: {field.get_attribute('value')}")

field.send_keys("new_value")
print(f"After typing: {field.get_attribute('value')}")

# Fallback: Select all + delete (for stubborn fields)
stubborn_field = driver.find_element(By.NAME, "email")
stubborn_field.send_keys("old@email.com")

# Use Ctrl+A (or Cmd+A on Mac) then Delete
modifier = Keys.COMMAND if platform.system() == "Darwin" else Keys.CONTROL
stubborn_field.send_keys(modifier + "a")
stubborn_field.send_keys(Keys.DELETE)
stubborn_field.send_keys("new@email.com")
print(f"Stubborn field: {stubborn_field.get_attribute('value')}")

driver.quit()`,
            output: `Before clear: old_value
After clear:
After typing: new_value
Stubborn field: new@email.com`,
            tip: 'If `clear()` does not work on a custom input component, use `Ctrl+A` followed by `Delete` as a reliable alternative. This mimics what a real user would do to clear a field.',
          },
          {
            heading: 'Special Keys and Keyboard Shortcuts',
            content:
              'The `Keys` class provides constants for special keyboard keys like Enter, Tab, Escape, Arrow keys, and modifier keys (Ctrl, Shift, Alt). You can combine these with `send_keys()` to trigger keyboard shortcuts. Modifier keys can be combined with regular keys using the `+` operator to simulate key combinations like Ctrl+C (copy), Ctrl+V (paste), or Ctrl+A (select all).\n\nSpecial keys are essential for many automation scenarios: pressing Enter to submit a form, Tab to move to the next field, Escape to close a modal, or arrow keys to navigate dropdowns. They also let you test keyboard accessibility, which is an increasingly important aspect of web application quality.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome()
driver.get("https://example.com/form")

field = driver.find_element(By.NAME, "search")

# Press Enter to submit
field.send_keys("search query")
field.send_keys(Keys.RETURN)  # or Keys.ENTER

# Tab to next field
field1 = driver.find_element(By.NAME, "first_name")
field1.send_keys("John")
field1.send_keys(Keys.TAB)  # Focus moves to next field

# Escape to close a modal/dropdown
driver.find_element(By.TAG_NAME, "body").send_keys(Keys.ESCAPE)

# Arrow keys for navigation
dropdown = driver.find_element(By.ID, "country-select")
dropdown.click()
dropdown.send_keys(Keys.ARROW_DOWN)
dropdown.send_keys(Keys.ARROW_DOWN)
dropdown.send_keys(Keys.RETURN)  # Select highlighted option

# Keyboard shortcuts
field2 = driver.find_element(By.NAME, "notes")
field2.send_keys("Hello World")
field2.send_keys(Keys.CONTROL + "a")   # Select all
field2.send_keys(Keys.CONTROL + "c")   # Copy
field2.send_keys(Keys.TAB)              # Move to next field
next_field = driver.find_element(By.NAME, "notes_copy")
next_field.send_keys(Keys.CONTROL + "v")  # Paste

# Shift+Tab to go backwards
next_field.send_keys(Keys.SHIFT + Keys.TAB)

driver.quit()`,
            note: 'On macOS, use `Keys.COMMAND` instead of `Keys.CONTROL` for keyboard shortcuts like copy/paste. Use `platform.system()` to detect the OS and choose the right modifier key for cross-platform scripts.',
          },
        ],
        quiz: [
          {
            question: 'What does send_keys() do if the field already contains text?',
            options: [
              'Replaces the existing text',
              'Appends the new text to the existing text',
              'Clears the field first, then types',
              'Raises an exception',
            ],
            correctIndex: 1,
            explanation: '`send_keys()` appends text to whatever is already in the field. To replace existing text, call `clear()` before `send_keys()`.',
          },
          {
            question: 'What should you try if clear() does not work on a custom input?',
            options: [
              'Call clear() multiple times',
              'Use Ctrl+A followed by Delete keys',
              'Refresh the page',
              'Use a different browser',
            ],
            correctIndex: 1,
            explanation: 'Some custom JavaScript input components override `clear()` behavior. Using `Ctrl+A` then `Delete` via `send_keys()` mimics what a real user would do and reliably clears the field.',
          },
          {
            question: 'Which Keys constant simulates pressing the Enter key?',
            options: ['Keys.ENTER_KEY', 'Keys.ENTER or Keys.RETURN', 'Keys.SUBMIT', 'Keys.NEWLINE'],
            correctIndex: 1,
            explanation: 'Both `Keys.ENTER` and `Keys.RETURN` simulate pressing the Enter key. They are interchangeable for most purposes.',
          },
        ],
        challenge: {
          prompt: 'Write a script that fills in a search box, clears it, types a new query, presses Enter to submit, and then types into a second field using Tab to navigate from the first. Print the value of each field at each step.',
          starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome()
driver.get("https://example.com/form")

# Find the search box (name="search")
# Type "first query", print value
# Clear the field, print value
# Type "second query", print value
# Press Enter to submit
# Find another field (name="email"), type using Tab navigation

driver.quit()`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome()
driver.get("https://example.com/form")

try:
    search = driver.find_element(By.NAME, "search")
    search.send_keys("first query")
    print(f"Step 1: {search.get_attribute('value')}")

    search.clear()
    print(f"Step 2 (cleared): {search.get_attribute('value')}")

    search.send_keys("second query")
    print(f"Step 3: {search.get_attribute('value')}")

    search.send_keys(Keys.RETURN)
    print("Step 4: Submitted!")

    # Tab to next field and type
    name_field = driver.find_element(By.NAME, "name")
    name_field.send_keys("John")
    name_field.send_keys(Keys.TAB)

    email_field = driver.find_element(By.NAME, "email")
    email_field.send_keys("john@example.com")
    print(f"Email: {email_field.get_attribute('value')}")
finally:
    driver.quit()`,
          hints: [
            'Use clear() then send_keys() to replace text',
            'Use Keys.RETURN or Keys.ENTER to submit',
            'Use Keys.TAB to move focus to the next field',
          ],
        },
      },
      {
        id: 'getting-element-properties',
        title: 'Getting Element Properties',
        difficulty: 'beginner',
        tags: ['text', 'get-attribute', 'is-displayed', 'is-enabled', 'properties'],
        sections: [
          {
            heading: 'Reading Element Text',
            content:
              'The `.text` property returns the visible text content of an element and all its descendants. This is the text a user would see on the page, with HTML tags stripped out. It only includes text that is actually rendered -- hidden elements (via CSS `display: none` or `visibility: hidden`) return an empty string. This behavior is intentional: `.text` represents what a human user can read, not what exists in the raw HTML.\n\nFor input elements like `<input>` and `<textarea>`, the `.text` property returns an empty string because their content is stored in the `value` attribute, not as text nodes. To get the current content of an input, use `get_attribute("value")` instead.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Get visible text from a heading
heading = driver.find_element(By.TAG_NAME, "h1")
print(f"Heading: {heading.text}")

# Get text from a paragraph (includes nested element text)
# HTML: <p>Hello <strong>World</strong>!</p>
para = driver.find_element(By.TAG_NAME, "p")
print(f"Paragraph: {para.text}")  # "Hello World!"

# Input elements: .text is empty, use get_attribute("value")
search = driver.find_element(By.NAME, "search")
search.send_keys("test query")
print(f".text (empty): '{search.text}'")
print(f"value: '{search.get_attribute('value')}'")

# Hidden elements return empty text
# HTML: <span style="display:none">Secret</span>
hidden = driver.find_element(By.CSS_SELECTOR, ".hidden-text")
print(f"Hidden text: '{hidden.text}'")  # Empty string

# To get ALL text including hidden, use textContent attribute
full_text = hidden.get_attribute("textContent")
print(f"textContent: '{full_text}'")  # "Secret"

driver.quit()`,
            output: `Heading: Example Domain
Paragraph: Hello World!
.text (empty): ''
value: 'test query'
Hidden text: ''
textContent: 'Secret'`,
            analogy: 'The `.text` property works like reading a printed page -- you only see what is visible. `get_attribute("textContent")` is like reading the manuscript including all the crossed-out and margin notes. `.text` gives you the user\'s view; `textContent` gives you the author\'s full text.',
          },
          {
            heading: 'Reading Attributes with get_attribute',
            content:
              'The `get_attribute()` method retrieves the value of any HTML attribute on an element. This includes standard attributes like `href`, `src`, `class`, `id`, `type`, and `name`, as well as custom `data-*` attributes. It returns `None` if the attribute does not exist. For boolean attributes like `disabled`, `checked`, or `readonly`, it returns the string `"true"` if present and `None` if absent.\n\nBeyond HTML attributes, `get_attribute()` can also access DOM properties that do not correspond to HTML attributes. For example, `get_attribute("value")` returns the current value of an input field (which changes as the user types), while the HTML `value` attribute only stores the initial default value. Understanding the difference between attributes (set in HTML) and properties (managed by the DOM) is key to accurate element inspection.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

# Standard attributes
link = driver.find_element(By.TAG_NAME, "a")
print(f"href: {link.get_attribute('href')}")
print(f"text: {link.text}")

# Image attributes
img = driver.find_element(By.TAG_NAME, "img")
print(f"src: {img.get_attribute('src')}")
print(f"alt: {img.get_attribute('alt')}")

# Form element attributes
input_el = driver.find_element(By.NAME, "email")
print(f"type: {input_el.get_attribute('type')}")
print(f"placeholder: {input_el.get_attribute('placeholder')}")
print(f"name: {input_el.get_attribute('name')}")

# Data attributes
# HTML: <div data-product-id="123" data-category="electronics">
card = driver.find_element(By.CSS_SELECTOR, "[data-product-id]")
print(f"Product ID: {card.get_attribute('data-product-id')}")
print(f"Category: {card.get_attribute('data-category')}")

# Nonexistent attribute returns None
result = card.get_attribute("nonexistent")
print(f"Missing attr: {result}")  # None

# Boolean attributes
checkbox = driver.find_element(By.ID, "terms")
print(f"Checked: {checkbox.get_attribute('checked')}")  # "true" or None
disabled_btn = driver.find_element(By.ID, "submit")
print(f"Disabled: {disabled_btn.get_attribute('disabled')}")

# CSS class list (full class string)
el = driver.find_element(By.CSS_SELECTOR, ".card.featured")
print(f"Classes: {el.get_attribute('class')}")  # "card featured"

driver.quit()`,
            tip: 'Use `get_attribute("innerHTML")` to get the raw HTML inside an element, `get_attribute("outerHTML")` to get the element itself plus its HTML, and `get_attribute("textContent")` to get all text including hidden content.',
          },
          {
            heading: 'State Properties: displayed, enabled, selected',
            content:
              'Selenium provides three boolean properties to check an element\'s current state: `is_displayed()` checks if the element is visible to the user, `is_enabled()` checks if the element can be interacted with (not disabled), and `is_selected()` checks if a checkbox, radio button, or option is currently selected. These methods are essential for writing robust automation that adapts to the current page state.\n\n`is_displayed()` considers multiple CSS properties: `display: none`, `visibility: hidden`, `opacity: 0`, and whether the element has zero dimensions. It returns `True` only if the element would be visible to a human user. `is_enabled()` checks the `disabled` attribute on form elements. `is_selected()` applies only to elements that can be selected -- checkboxes, radio buttons, and `<option>` elements within `<select>` dropdowns.',
            code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/form")

# Check if an element is visible
modal = driver.find_element(By.ID, "popup-modal")
print(f"Modal visible: {modal.is_displayed()}")

# Check if a button is enabled
submit = driver.find_element(By.ID, "submit-btn")
print(f"Submit enabled: {submit.is_enabled()}")

# Only click if enabled
if submit.is_enabled():
    submit.click()
else:
    print("Button is disabled, cannot click")

# Check if a checkbox is selected
terms = driver.find_element(By.ID, "agree-terms")
print(f"Terms checked: {terms.is_selected()}")

# Toggle checkbox only if not already checked
if not terms.is_selected():
    terms.click()
    print("Checked the terms checkbox")

# Inspect multiple elements' states
inputs = driver.find_elements(By.TAG_NAME, "input")
for inp in inputs:
    state = {
        "name": inp.get_attribute("name"),
        "type": inp.get_attribute("type"),
        "displayed": inp.is_displayed(),
        "enabled": inp.is_enabled(),
        "selected": inp.is_selected() if inp.get_attribute("type") in ["checkbox", "radio"] else "N/A",
    }
    print(state)

# Get element tag name and size
element = driver.find_element(By.ID, "content")
print(f"Tag: {element.tag_name}")
print(f"Size: {element.size}")        # {'height': 400, 'width': 800}
print(f"Location: {element.location}")  # {'x': 100, 'y': 200}

driver.quit()`,
            note: 'The `is_displayed()` method does NOT check if the element is in the viewport (visible on screen without scrolling). An element at the bottom of a long page is still "displayed" even if you would need to scroll to see it. It only checks CSS visibility.',
          },
        ],
        quiz: [
          {
            question: 'Why does `.text` return an empty string for input elements?',
            options: [
              'Input elements cannot contain text',
              'Input content is stored in the value attribute, not as text nodes',
              'It is a Selenium bug',
              'You need to call get_text() instead',
            ],
            correctIndex: 1,
            explanation: 'Input elements store their content in the `value` attribute/property, not as text child nodes. Use `get_attribute("value")` to read the current content of an input field.',
          },
          {
            question: 'What does get_attribute() return for a nonexistent attribute?',
            options: ['Empty string ""', 'False', 'None', 'Raises an exception'],
            correctIndex: 2,
            explanation: '`get_attribute()` returns `None` when the specified attribute does not exist on the element. It does not raise an exception.',
          },
          {
            question: 'What does is_displayed() check?',
            options: [
              'Whether the element is in the viewport',
              'Whether the element is visible (not hidden by CSS)',
              'Whether the element has a display attribute',
              'Whether the element has been rendered by JavaScript',
            ],
            correctIndex: 1,
            explanation: '`is_displayed()` checks CSS visibility properties (display, visibility, opacity, dimensions). It returns True if the element would be visible to a user, regardless of scroll position.',
          },
          {
            question: 'Which method checks if a checkbox is currently checked?',
            options: ['is_checked()', 'is_selected()', 'get_attribute("checked")', 'is_enabled()'],
            correctIndex: 1,
            explanation: '`is_selected()` returns a boolean indicating whether a checkbox, radio button, or option is currently selected. While `get_attribute("checked")` also works, `is_selected()` is the preferred Selenium method.',
          },
        ],
        challenge: {
          prompt: 'Write a script that inspects a form page: find all input fields, and for each one print its name, type, whether it is displayed, enabled, and its current value. Then find all links and print their text and href.',
          starterCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/form")

# Find all input fields and print their properties

# Find all links and print text + href

driver.quit()`,
          solutionCode: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/form")

try:
    # Inspect all input fields
    inputs = driver.find_elements(By.TAG_NAME, "input")
    print(f"Found {len(inputs)} input fields:")
    for inp in inputs:
        print(f"  name={inp.get_attribute('name')}, "
              f"type={inp.get_attribute('type')}, "
              f"displayed={inp.is_displayed()}, "
              f"enabled={inp.is_enabled()}, "
              f"value='{inp.get_attribute('value')}'")

    # Inspect all links
    links = driver.find_elements(By.TAG_NAME, "a")
    print(f"\\nFound {len(links)} links:")
    for link in links:
        if link.is_displayed() and link.text.strip():
            print(f"  '{link.text}' -> {link.get_attribute('href')}")
finally:
    driver.quit()`,
          hints: [
            'Use find_elements(By.TAG_NAME, "input") to get all inputs',
            'Use get_attribute() for name, type, and value',
            'Use is_displayed() and is_enabled() for state checks',
            'Filter links by is_displayed() and non-empty text',
          ],
        },
      },
    ],
  },
];
