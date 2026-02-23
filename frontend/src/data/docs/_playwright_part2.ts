import type { DocCategory } from './types';

export const PW_PART2_CATEGORIES: DocCategory[] = [
  /* ================================================================== */
  /*  Category 4 — Waiting & Assertions                                  */
  /* ================================================================== */
  {
    id: 'pw-waiting-assertions',
    label: 'Waiting & Assertions',
    icon: 'Clock',
    entries: [
      {
        id: 'pw-wait-auto',
        title: 'Auto-waiting Mechanism',
        difficulty: 'beginner',
        tags: ['playwright', 'auto-wait', 'actionability', 'stability'],
        sections: [
          {
            heading: 'How Auto-waiting Works',
            content:
              'Playwright automatically waits for elements to be actionable before performing operations. When you call click(), fill(), or check(), Playwright checks that the element is visible, stable (not animating), enabled, and receiving pointer events (not obscured). This eliminates the vast majority of flaky test failures caused by timing issues.\n\nThe auto-wait applies to all actionable methods. If the element does not become actionable within the default timeout (30 seconds), the operation throws a TimeoutError with a descriptive message explaining which actionability check failed.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Playwright auto-waits for the button to be:
    # 1. Attached to DOM
    # 2. Visible (not hidden by CSS)
    # 3. Stable (not animating/moving)
    # 4. Enabled (not disabled)
    # 5. Receiving pointer events (not covered by overlay)
    page.click("#submit-button")
    print("Button clicked after auto-waiting")

    # fill() also auto-waits for the input to be ready
    page.fill("#email", "test@example.com")
    print("Input filled after auto-waiting")

    # No explicit waits needed!
    # Compare with Selenium where you would need:
    # WebDriverWait(driver, 10).until(EC.element_to_be_clickable(...))
    # element.click()

    browser.close()`,
            output: `Button clicked after auto-waiting
Input filled after auto-waiting`,
            analogy: 'Auto-waiting is like a polite person who waits for you to finish your sentence before responding. Playwright waits for the page to be ready before acting, rather than trying to interact with elements that are still loading or animating.',
          },
          {
            heading: 'Configuring Timeouts',
            content:
              'The default timeout for auto-waiting is 30 seconds. You can configure this at different levels: globally for the browser context, per-page, or per-action. Setting appropriate timeouts helps your tests fail faster when something is genuinely broken, rather than waiting the full 30 seconds.\n\nFor fast local tests, a 5-10 second timeout is usually sufficient. For CI/CD or testing against slow staging environments, you might want 15-30 seconds.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    # Set default timeout for all pages in this context
    context = browser.new_context()
    context.set_default_timeout(10000)  # 10 seconds

    page = context.new_page()

    # Override timeout for a specific page
    page.set_default_timeout(5000)  # 5 seconds

    page.goto("https://example.com")

    # Override timeout for a single action
    page.click("#slow-button", timeout=15000)  # 15 seconds for this click

    # Navigation timeout (separate from action timeout)
    page.set_default_navigation_timeout(20000)  # 20 seconds for page loads

    try:
        page.click("#nonexistent", timeout=3000)
    except Exception as e:
        print(f"Timed out after 3s: {type(e).__name__}")

    context.close()
    browser.close()`,
            output: `Timed out after 3s: TimeoutError`,
            tip: 'Set a lower default timeout (5-10s) and increase it only for specific slow operations. This makes tests fail faster and gives clearer feedback about what is slow.',
          },
          {
            heading: 'Waiting for Specific States',
            content:
              'While auto-waiting handles most cases, sometimes you need to explicitly wait for specific states. Playwright provides wait_for() on locators to wait for an element to reach a particular state: "attached" (in DOM), "detached" (removed from DOM), "visible", or "hidden".\n\nThis is useful when you need to wait for something to disappear (like a loading spinner) or for a specific element state before proceeding.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Wait for loading spinner to disappear
    page.locator(".loading-spinner").wait_for(state="hidden")
    print("Spinner gone!")

    # Wait for content to appear
    page.locator("#results").wait_for(state="visible")
    print("Results visible!")

    # Wait for element to be attached to DOM
    page.locator("#lazy-component").wait_for(state="attached")
    print("Component loaded into DOM")

    # Wait for element to be removed from DOM
    page.locator(".temp-notification").wait_for(state="detached")
    print("Notification removed")

    # Wait for page load states
    page.wait_for_load_state("networkidle")
    print("No more network requests")

    page.wait_for_load_state("domcontentloaded")
    print("DOM is ready")

    browser.close()`,
            output: `Spinner gone!
Results visible!
Component loaded into DOM
Notification removed
No more network requests
DOM is ready`,
          },
        ],
        quiz: [
          {
            question: 'What checks does Playwright auto-wait perform before clicking?',
            options: [
              'Only visibility',
              'Visible, stable, enabled, and receiving pointer events',
              'Only DOM attachment',
              'Visible and enabled only',
            ],
            correctIndex: 1,
            explanation: 'Playwright checks that the element is attached, visible, stable (not animating), enabled, and receiving pointer events (not covered by another element).',
          },
          {
            question: 'What is the default auto-wait timeout?',
            options: ['5 seconds', '10 seconds', '30 seconds', '60 seconds'],
            correctIndex: 2,
            explanation: 'The default timeout for auto-waiting is 30 seconds. This can be configured at the context, page, or individual action level.',
          },
          {
            question: 'How do you wait for an element to disappear?',
            options: [
              'wait_for(state="gone")',
              'wait_for(state="hidden")',
              'wait_for_invisible()',
              'wait_until_hidden()',
            ],
            correctIndex: 1,
            explanation: 'Use locator.wait_for(state="hidden") to wait for an element to become hidden, or state="detached" to wait for it to be removed from the DOM entirely.',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to a page, waits for a loading spinner (class "spinner") to become hidden, then waits for results (ID "results") to become visible, and prints their text.',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/data")

    # TODO: Wait for spinner to hide

    # TODO: Wait for results to be visible

    # TODO: Print results text

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/data")

    page.locator(".spinner").wait_for(state="hidden")
    print("Loading complete")

    page.locator("#results").wait_for(state="visible")
    text = page.locator("#results").text_content()
    print(f"Results: {text}")

    browser.close()`,
          hints: [
            'Use .wait_for(state="hidden") for the spinner.',
            'Use .wait_for(state="visible") for the results.',
            'Use .text_content() to get the element text.',
          ],
        },
      },
      {
        id: 'pw-wait-assertions',
        title: 'Web-first Assertions',
        difficulty: 'intermediate',
        tags: ['playwright', 'assertions', 'expect', 'testing'],
        sections: [
          {
            heading: 'Introduction to Web-first Assertions',
            content:
              'Playwright provides "web-first" assertions through the expect() function. Unlike regular assertions that check a value once and fail immediately, web-first assertions automatically retry until the condition is met or the timeout expires. This is crucial for testing dynamic web pages where content may take time to update.\n\nThe expect API is available through playwright.sync_api (or the pytest-playwright plugin). It covers element visibility, text content, attributes, counts, and more.',
            code: `from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Assert element is visible (retries automatically)
    expect(page.locator("h1")).to_be_visible()

    # Assert text content
    expect(page.locator("h1")).to_have_text("Example Domain")

    # Assert element contains text (substring)
    expect(page.locator("p")).to_contain_text("illustrative")

    # Assert element count
    expect(page.locator("a")).to_have_count(1)

    # Assert attribute value
    expect(page.locator("a")).to_have_attribute("href", "https://www.iana.org/domains/examples")

    # Assert element is enabled
    expect(page.locator("a")).to_be_enabled()

    print("All assertions passed!")
    browser.close()`,
            output: `All assertions passed!`,
            tip: 'Always prefer web-first assertions over manual checks. Instead of "assert element.text_content() == expected", use "expect(element).to_have_text(expected)" — it retries and gives better error messages.',
          },
          {
            heading: 'Negated Assertions',
            content:
              'You can negate any assertion using the not_to prefix. Negated assertions also retry — they wait for the condition to become false. This is useful for verifying that elements disappear, become disabled, or no longer contain certain text.\n\nThe retry behavior means that if an element currently matches the condition, the assertion will keep checking until it no longer matches or the timeout expires.',
            code: `from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Assert element is NOT visible
    expect(page.locator(".error-message")).not_to_be_visible()

    # Assert text does NOT contain
    expect(page.locator("h1")).not_to_contain_text("Error")

    # Assert element is NOT attached
    expect(page.locator("#deleted-item")).not_to_be_attached()

    # Assert element is NOT checked
    expect(page.locator("#checkbox")).not_to_be_checked()

    # Assert count is NOT zero (at least one match)
    expect(page.locator("p")).not_to_have_count(0)

    print("All negated assertions passed!")
    browser.close()`,
            output: `All negated assertions passed!`,
          },
          {
            heading: 'Page-level Assertions',
            content:
              'Beyond element assertions, Playwright supports page-level assertions for the URL and title. These are useful for verifying navigation completed correctly or that the page is in the expected state.\n\nPage assertions also support regex patterns for flexible matching.',
            code: `from playwright.sync_api import sync_playwright, expect
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Assert page title
    expect(page).to_have_title("Example Domain")

    # Assert title with regex
    expect(page).to_have_title(re.compile(r"Example.*"))

    # Assert URL
    expect(page).to_have_url("https://www.example.com/")

    # Assert URL with regex
    expect(page).to_have_url(re.compile(r".*example\\.com.*"))

    # Custom timeout for slow operations
    expect(page.locator("#slow-content")).to_be_visible(timeout=15000)

    print("All page assertions passed!")
    browser.close()`,
            output: `All page assertions passed!`,
            note: 'Web-first assertions have their own timeout (default 5 seconds) separate from the action timeout (default 30 seconds). Configure assertion timeout with expect.set_options(timeout=10000).',
          },
        ],
        quiz: [
          {
            question: 'How do web-first assertions differ from regular assertions?',
            options: [
              'They are faster',
              'They automatically retry until the condition is met',
              'They run in the browser',
              'They are asynchronous only',
            ],
            correctIndex: 1,
            explanation: 'Web-first assertions automatically retry the check until the condition passes or the timeout expires, making them resilient to timing issues.',
          },
          {
            question: 'How do you assert that an element is NOT visible?',
            options: [
              'expect(locator).to_be_invisible()',
              'expect(locator).not_to_be_visible()',
              'expect_not(locator).to_be_visible()',
              'expect(locator).to_be_hidden()',
            ],
            correctIndex: 1,
            explanation: 'Use the not_to prefix: expect(locator).not_to_be_visible(). All assertions have a negated counterpart.',
          },
          {
            question: 'Can you use regex with page title assertions?',
            options: ['No', 'Yes, using re.compile()', 'Only with URL assertions', 'Only with text assertions'],
            correctIndex: 1,
            explanation: 'Both to_have_title() and to_have_url() accept regex patterns via re.compile() for flexible matching.',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to "https://example.com", asserts the title contains "Example", asserts the heading h1 has text "Example Domain", and asserts there are no elements with class "error".',
          starterCode: `from playwright.sync_api import sync_playwright, expect
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # TODO: Assert title contains "Example"

    # TODO: Assert h1 text

    # TODO: Assert no .error elements

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright, expect
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    expect(page).to_have_title(re.compile(r".*Example.*"))
    expect(page.locator("h1")).to_have_text("Example Domain")
    expect(page.locator(".error")).not_to_be_attached()

    print("All assertions passed!")
    browser.close()`,
          hints: [
            'Use re.compile() for regex matching in to_have_title().',
            'Use to_have_text() for exact text assertions.',
            'Use not_to_be_attached() to verify elements do not exist in the DOM.',
          ],
        },
      },
      {
        id: 'pw-wait-page',
        title: 'Page-level Assertions',
        difficulty: 'intermediate',
        tags: ['playwright', 'page', 'assertions', 'url', 'title'],
        sections: [
          {
            heading: 'URL Assertions',
            content:
              'Testing navigation and URL state is fundamental to web testing. Playwright provides to_have_url() for page-level URL assertions. Like all web-first assertions, it retries until the URL matches, which is perfect for single-page apps where URL changes happen asynchronously after route transitions.\n\nYou can match exact URLs, use regex patterns, or combine URL assertions with element assertions to verify the complete page state.',
            code: `from playwright.sync_api import sync_playwright, expect
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # Navigate and verify URL
    page.goto("https://example.com")
    expect(page).to_have_url("https://www.example.com/")

    # URL with regex for flexible matching
    expect(page).to_have_url(re.compile(r"example\\.com"))

    # After clicking a link, verify navigation
    page.click("a")
    expect(page).to_have_url(re.compile(r"iana\\.org"))

    print(f"Final URL: {page.url}")
    browser.close()`,
            output: `Final URL: https://www.iana.org/domains/reserved`,
          },
          {
            heading: 'Title Assertions',
            content:
              'Page title assertions verify the document title, which is set by the <title> HTML element. This is useful for confirming navigation to the correct page, especially in multi-page applications where each page has a unique title.\n\nTitle assertions support both exact strings and regex patterns.',
            code: `from playwright.sync_api import sync_playwright, expect
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Exact title match
    expect(page).to_have_title("Example Domain")

    # Regex title match
    expect(page).to_have_title(re.compile(r"^Example"))

    # Negated: title should NOT contain "Error"
    expect(page).not_to_have_title(re.compile(r"Error"))

    # After navigation, verify new title
    page.click("a")
    expect(page).to_have_title(re.compile(r"IANA"))

    print(f"Title: {page.title()}")
    browser.close()`,
            output: `Title: IANA-managed Reserved Domains`,
          },
          {
            heading: 'Combining Page and Element Assertions',
            content:
              'The most robust tests combine page-level and element-level assertions. After navigation, verify both the URL/title and the content on the page. This catches edge cases where the URL is correct but content failed to load, or vice versa.\n\nA good pattern is: navigate -> assert URL -> assert key content visible -> interact -> assert result.',
            code: `from playwright.sync_api import sync_playwright, expect
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Verify we are on the right page
    expect(page).to_have_url(re.compile(r"example\\.com"))
    expect(page).to_have_title("Example Domain")

    # Verify key content is present
    expect(page.locator("h1")).to_be_visible()
    expect(page.locator("h1")).to_have_text("Example Domain")

    # Verify no error states
    expect(page.locator(".error")).not_to_be_attached()
    expect(page.locator(".loading")).not_to_be_visible()

    # Navigate and verify new page
    page.click("a")
    expect(page).to_have_url(re.compile(r"iana\\.org"))
    expect(page.locator("body")).to_contain_text("domain")

    print("Complete page verification passed!")
    browser.close()`,
            output: `Complete page verification passed!`,
            tip: 'Build a "page is ready" helper that checks URL, title, and key elements. Reuse it across tests for consistent verification.',
          },
        ],
        quiz: [
          {
            question: 'Do URL assertions retry like element assertions?',
            options: ['No, they check once', 'Yes, they retry until matched or timeout', 'Only with regex', 'Only in test mode'],
            correctIndex: 1,
            explanation: 'Page-level assertions (URL and title) are web-first assertions — they automatically retry until the condition is met or the timeout expires.',
          },
          {
            question: 'What is a good practice after navigating to a new page?',
            options: [
              'Only check the URL',
              'Only check the title',
              'Combine URL, title, and content assertions',
              'Wait 5 seconds and proceed',
            ],
            correctIndex: 2,
            explanation: 'Combining page-level assertions (URL, title) with element assertions (key content visible) provides the most thorough verification that navigation succeeded correctly.',
          },
          {
            question: 'How do you assert a URL matches a pattern?',
            options: [
              'expect(page).to_have_url("*example*")',
              'expect(page).to_have_url(re.compile(r"example"))',
              'expect(page).url_matches("example")',
              'expect(page).to_match_url("example")',
            ],
            correctIndex: 1,
            explanation: 'Use re.compile() to create a regex pattern and pass it to to_have_url() for flexible URL matching.',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to "https://example.com", verifies the URL, title, and h1 heading, then clicks the link and verifies the new page URL contains "iana".',
          starterCode: `from playwright.sync_api import sync_playwright, expect
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # TODO: Navigate and verify URL + title + heading

    # TODO: Click link and verify new URL

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright, expect
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    expect(page).to_have_url(re.compile(r"example\\.com"))
    expect(page).to_have_title("Example Domain")
    expect(page.locator("h1")).to_have_text("Example Domain")

    page.click("a")
    expect(page).to_have_url(re.compile(r"iana"))

    print("All verifications passed!")
    browser.close()`,
          hints: [
            'Use re.compile() for regex URL matching.',
            'Use to_have_title() for exact title assertion.',
            'Use to_have_text() on the h1 locator.',
          ],
        },
      },
      {
        id: 'pw-wait-custom',
        title: 'Custom Waiting Strategies',
        difficulty: 'advanced',
        tags: ['playwright', 'wait', 'custom', 'polling', 'evaluate'],
        sections: [
          {
            heading: 'wait_for_function',
            content:
              'page.wait_for_function() executes a JavaScript expression in the browser and waits until it returns a truthy value. This is powerful for waiting on custom conditions like JavaScript variables, DOM state, or application-specific readiness signals.\n\nThe function runs in the browser context, not in Python, so it has access to the DOM and window objects but not your Python variables.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Wait for a JavaScript variable to be set
    page.wait_for_function("window.appReady === true")
    print("App is ready!")

    # Wait for element count to reach a threshold
    page.wait_for_function(
        "document.querySelectorAll('.item').length >= 10"
    )
    print("At least 10 items loaded")

    # Wait with a polling interval
    page.wait_for_function(
        "document.querySelector('#status').textContent === 'Complete'",
        polling=1000  # Check every 1 second
    )
    print("Status is Complete")

    # Pass arguments from Python to the JS function
    page.wait_for_function(
        "selector => document.querySelector(selector) !== null",
        arg="#dynamic-element"
    )
    print("Dynamic element appeared")

    browser.close()`,
            output: `App is ready!
At least 10 items loaded
Status is Complete
Dynamic element appeared`,
          },
          {
            heading: 'wait_for_response and wait_for_request',
            content:
              'You can wait for specific network requests or responses using page.wait_for_response() and page.wait_for_request(). These accept a URL pattern (string or regex) or a predicate function. This is essential for testing AJAX-heavy applications where content loads after API calls complete.\n\nThese methods are context managers that should be entered BEFORE the action that triggers the request.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Wait for a specific API response
    with page.expect_response("**/api/data") as response_info:
        page.click("#load-data")
    response = response_info.value
    print(f"API status: {response.status}")
    print(f"API data: {response.json()['count']} items")

    # Wait for response matching a predicate
    with page.expect_response(
        lambda r: r.url.endswith("/api/search") and r.status == 200
    ) as resp:
        page.fill("#search", "test")
        page.press("#search", "Enter")
    data = resp.value.json()
    print(f"Search results: {data['total']}")

    # Wait for a request to be sent
    with page.expect_request("**/api/save") as req:
        page.click("#save-button")
    request = req.value
    print(f"Request method: {request.method}")
    print(f"Request body: {request.post_data}")

    browser.close()`,
            output: `API status: 200
API data: 42 items
Search results: 15
Request method: POST
Request body: {"action":"save"}`,
          },
          {
            heading: 'Waiting for Events',
            content:
              'Playwright can wait for various page events like console messages, downloads, dialogs, and WebSocket messages. These event-based waits are useful for testing features that communicate through non-standard channels.\n\nUse expect_event() for custom events and specific event handlers for common ones like expect_download(), expect_console_message(), and expect_popup().',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Wait for console message
    with page.expect_console_message() as msg:
        page.evaluate("console.log('Hello from JS')")
    print(f"Console: {msg.value.text}")

    # Wait for a download
    with page.expect_download() as dl:
        page.click("#download-link")
    download = dl.value
    print(f"Downloaded: {download.suggested_filename}")
    download.save_as(f"downloads/{download.suggested_filename}")

    # Wait for a dialog (alert/confirm/prompt)
    page.on("dialog", lambda dialog: dialog.accept())
    page.evaluate("alert('Test alert')")
    print("Dialog handled")

    # Wait for popup (new window)
    with page.expect_popup() as popup_info:
        page.click("a[target='_blank']")
    popup = popup_info.value
    popup.wait_for_load_state()
    print(f"Popup URL: {popup.url}")

    browser.close()`,
            output: `Console: Hello from JS
Downloaded: report.pdf
Dialog handled
Popup URL: https://www.iana.org/domains/reserved`,
            tip: 'Always set up event listeners BEFORE triggering the action that causes the event. If you click first and then wait, you might miss the event.',
          },
        ],
        quiz: [
          {
            question: 'Where does wait_for_function execute its code?',
            options: ['In Python', 'In the browser (JavaScript)', 'On the server', 'In a worker thread'],
            correctIndex: 1,
            explanation: 'wait_for_function executes the JavaScript expression in the browser context, giving it access to the DOM and window objects.',
          },
          {
            question: 'When should you enter the expect_response context manager?',
            options: [
              'After the action that triggers the request',
              'Before the action that triggers the request',
              'It does not matter',
              'Only during page load',
            ],
            correctIndex: 1,
            explanation: 'You must enter the context manager (set up the listener) BEFORE triggering the action, otherwise you might miss the response.',
          },
          {
            question: 'How do you handle a JavaScript alert dialog in Playwright?',
            options: [
              'page.switch_to.alert',
              'page.on("dialog", handler)',
              'page.accept_alert()',
              'page.handle_dialog()',
            ],
            correctIndex: 1,
            explanation: 'Register a dialog event handler with page.on("dialog", callback). The callback receives the dialog object and can accept, dismiss, or enter text.',
          },
        ],
        challenge: {
          prompt: 'Write a script that clicks a "Load Data" button, waits for the API response from "/api/data", prints the response status and JSON body, then waits for a console message and prints it.',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # TODO: Wait for API response when clicking Load Data

    # TODO: Print response status and JSON

    # TODO: Wait for console message and print

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    with page.expect_response("**/api/data") as resp:
        page.click("#load-data")
    response = resp.value
    print(f"Status: {response.status}")
    print(f"Data: {response.json()}")

    with page.expect_console_message() as msg:
        page.evaluate("console.log('Data loaded')")
    print(f"Console: {msg.value.text}")

    browser.close()`,
          hints: [
            'Use page.expect_response() as a context manager.',
            'Trigger the action INSIDE the with block.',
            'Access the response via resp.value.',
          ],
        },
      },
    ],
  },

  /* ================================================================== */
  /*  Category 5 — Navigation & Pages                                    */
  /* ================================================================== */
  {
    id: 'pw-navigation-pages',
    label: 'Navigation & Pages',
    icon: 'Globe',
    entries: [
      {
        id: 'pw-nav-page',
        title: 'Page Navigation',
        difficulty: 'beginner',
        tags: ['playwright', 'navigation', 'goto', 'back', 'forward'],
        sections: [
          {
            heading: 'Basic Navigation',
            content:
              'page.goto() is the primary navigation method. It loads a URL and waits for the page to reach the "load" state by default. You can change the wait behavior with the wait_until parameter: "load" (default), "domcontentloaded", "networkidle", or "commit" (earliest).\n\nPlaywright also provides go_back(), go_forward(), and reload() for browser-level navigation, mirroring the browser buttons.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # Navigate with default wait (load event)
    page.goto("https://example.com")
    print(f"URL: {page.url}")
    print(f"Title: {page.title()}")

    # Navigate with networkidle (wait for no network activity)
    page.goto("https://example.com/about", wait_until="networkidle")

    # Go back
    page.go_back()
    print(f"After back: {page.url}")

    # Go forward
    page.go_forward()
    print(f"After forward: {page.url}")

    # Reload the page
    page.reload()
    print(f"After reload: {page.url}")

    browser.close()`,
            output: `URL: https://www.example.com/
Title: Example Domain
After back: https://www.example.com/
After forward: https://www.example.com/about
After reload: https://www.example.com/about`,
          },
          {
            heading: 'Navigation Events',
            content:
              'For single-page applications where clicking a link changes the URL without a full page reload, use expect_navigation() or wait_for_url() to wait for the URL change. This is more reliable than arbitrary timeouts.\n\nwait_for_url() accepts a string, glob pattern, regex, or predicate function.',
            code: `from playwright.sync_api import sync_playwright
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Wait for navigation after clicking a link
    with page.expect_navigation():
        page.click("a")
    print(f"Navigated to: {page.url}")

    # Wait for specific URL pattern
    page.go_back()
    page.click("a")
    page.wait_for_url("**/domains/**")
    print(f"URL matches pattern: {page.url}")

    # Wait for URL with regex
    page.go_back()
    page.click("a")
    page.wait_for_url(re.compile(r"iana\\.org"))
    print(f"URL matches regex: {page.url}")

    browser.close()`,
            output: `Navigated to: https://www.iana.org/domains/reserved
URL matches pattern: https://www.iana.org/domains/reserved
URL matches regex: https://www.iana.org/domains/reserved`,
          },
          {
            heading: 'Page Load States',
            content:
              'Playwright can wait for different page load milestones using wait_for_load_state(). This is useful when you need to ensure specific resources are loaded before proceeding. The available states are: "load" (full page load), "domcontentloaded" (DOM is ready), and "networkidle" (no network requests for 500ms).\n\nThe "networkidle" state is particularly useful for ensuring all AJAX requests have completed.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # Navigate and wait for DOM content loaded (fast)
    page.goto("https://example.com", wait_until="domcontentloaded")
    print("DOM ready")

    # Then optionally wait for full load
    page.wait_for_load_state("load")
    print("Full load complete")

    # Wait for network to be idle (all AJAX done)
    page.wait_for_load_state("networkidle")
    print("Network idle")

    # Useful after actions that trigger AJAX
    page.click("#load-more")
    page.wait_for_load_state("networkidle")
    print("All data loaded after click")

    browser.close()`,
            output: `DOM ready
Full load complete
Network idle
All data loaded after click`,
          },
        ],
        quiz: [
          {
            question: 'What does wait_until="networkidle" mean?',
            options: [
              'No network requests exist',
              'No new network requests for 500ms',
              'The network cable is disconnected',
              'All images are loaded',
            ],
            correctIndex: 1,
            explanation: '"networkidle" waits until there are no more than 0 network connections for at least 500 milliseconds.',
          },
          {
            question: 'What is the default wait_until value for page.goto()?',
            options: ['domcontentloaded', 'load', 'networkidle', 'commit'],
            correctIndex: 1,
            explanation: 'The default is "load", which waits for the window load event (all resources including images and stylesheets are loaded).',
          },
          {
            question: 'How do you wait for a specific URL after an SPA navigation?',
            options: [
              'time.sleep(5)',
              'page.wait_for_url(pattern)',
              'page.wait_for_navigation()',
              'page.check_url(pattern)',
            ],
            correctIndex: 1,
            explanation: 'page.wait_for_url() waits for the URL to match the given pattern (string, glob, regex, or predicate).',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to "https://example.com" with "domcontentloaded" wait, then waits for full load state, clicks a link, and uses wait_for_url to verify the new URL.',
          starterCode: `from playwright.sync_api import sync_playwright
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # TODO: Navigate with domcontentloaded

    # TODO: Wait for full load

    # TODO: Click link and wait for URL change

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright
import re

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    page.goto("https://example.com", wait_until="domcontentloaded")
    print("DOM ready")

    page.wait_for_load_state("load")
    print("Fully loaded")

    page.click("a")
    page.wait_for_url(re.compile(r"iana\\.org"))
    print(f"New URL: {page.url}")

    browser.close()`,
          hints: [
            'Pass wait_until="domcontentloaded" to goto().',
            'Use page.wait_for_load_state("load") for full load.',
            'Use page.wait_for_url() with regex for URL verification.',
          ],
        },
      },
      {
        id: 'pw-nav-pages',
        title: 'Multiple Pages & Popups',
        difficulty: 'intermediate',
        tags: ['playwright', 'pages', 'popup', 'tabs', 'context'],
        sections: [
          {
            heading: 'Working with Multiple Pages',
            content:
              'In Playwright, each tab or window is a Page object within a BrowserContext. You can create new pages programmatically or catch pages opened by the website. All pages in the same context share cookies and session state.\n\nUnlike Selenium where you switch window handles, in Playwright you work with separate Page objects directly — no switching needed.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()

    # Create multiple pages
    page1 = context.new_page()
    page1.goto("https://example.com")

    page2 = context.new_page()
    page2.goto("https://example.com/about")

    # No need to "switch" - interact with either directly
    print(f"Page 1: {page1.title()}")
    print(f"Page 2: {page2.title()}")

    # List all pages in context
    print(f"Total pages: {len(context.pages)}")

    # Close a specific page
    page2.close()
    print(f"Pages after close: {len(context.pages)}")

    context.close()
    browser.close()`,
            output: `Page 1: Example Domain
Page 2: About - Example
Total pages: 2
Pages after close: 1`,
            tip: 'In Playwright, you do not need to "switch" between pages like in Selenium. Each Page is an independent object you interact with directly.',
          },
          {
            heading: 'Handling Popups',
            content:
              'When a website opens a new window or tab (via window.open or target="_blank"), Playwright captures it through the context\'s "page" event. Use expect_page() to wait for and get a reference to the new page.\n\nThe popup page starts loading immediately but you should call wait_for_load_state() before interacting with it to ensure it is ready.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://example.com")

    # Catch a popup opened by clicking a link
    with context.expect_page() as new_page_info:
        page.click("a[target='_blank']")
    popup = new_page_info.value

    # Wait for the popup to load
    popup.wait_for_load_state()
    print(f"Popup URL: {popup.url}")
    print(f"Popup title: {popup.title()}")

    # Interact with the popup
    content = popup.locator("body").text_content()
    print(f"Content length: {len(content)}")

    # Close the popup
    popup.close()

    # Original page is still accessible
    print(f"Original: {page.title()}")

    context.close()
    browser.close()`,
            output: `Popup URL: https://www.iana.org/domains/reserved
Popup title: IANA-managed Reserved Domains
Content length: 1523
Original: Example Domain`,
          },
          {
            heading: 'Page Events',
            content:
              'You can listen for various events on a page: "load", "domcontentloaded", "close", "console", "dialog", "request", "response", and more. Event listeners are useful for monitoring page behavior during tests or for handling unexpected events.\n\nThe "close" event is particularly useful for detecting when a page is closed unexpectedly.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    # Listen for console messages
    page.on("console", lambda msg: print(f"  Console [{msg.type}]: {msg.text}"))

    # Listen for page errors
    page.on("pageerror", lambda err: print(f"  Page Error: {err}"))

    # Listen for requests
    page.on("request", lambda req: print(f"  Request: {req.method} {req.url[:50]}"))

    page.goto("https://example.com")

    # Listen for new pages in context
    def on_page(new_page):
        print(f"  New page opened: {new_page.url}")
    context.on("page", on_page)

    # Trigger events
    page.evaluate("console.log('Hello')")
    page.evaluate("console.warn('Warning!')")

    context.close()
    browser.close()`,
            output: `  Request: GET https://www.example.com/
  Console [log]: Hello
  Console [warning]: Warning!`,
          },
        ],
        quiz: [
          {
            question: 'Do you need to "switch" between pages in Playwright like in Selenium?',
            options: ['Yes, using switch_to', 'No, each page is a separate object', 'Only for popups', 'Only in headed mode'],
            correctIndex: 1,
            explanation: 'In Playwright, each page is an independent Page object. You interact with pages directly without needing to switch focus.',
          },
          {
            question: 'How do you catch a popup opened by a website?',
            options: [
              'page.wait_for_popup()',
              'context.expect_page()',
              'browser.get_popup()',
              'page.on("popup")',
            ],
            correctIndex: 1,
            explanation: 'Use context.expect_page() as a context manager to wait for a new page to be created. It returns the new Page object.',
          },
          {
            question: 'What should you call after getting a popup page reference?',
            options: ['page.activate()', 'popup.wait_for_load_state()', 'popup.ready()', 'popup.init()'],
            correctIndex: 1,
            explanation: 'Call wait_for_load_state() on the popup to ensure it has finished loading before interacting with it.',
          },
        ],
        challenge: {
          prompt: 'Write a script that opens "https://example.com", catches the popup when clicking the link, waits for the popup to load, prints both the original page title and the popup title, then closes the popup.',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://example.com")

    # TODO: Catch popup when clicking the link

    # TODO: Wait for popup to load

    # TODO: Print both titles

    # TODO: Close popup

    context.close()
    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://example.com")

    with context.expect_page() as popup_info:
        page.click("a")
    popup = popup_info.value
    popup.wait_for_load_state()

    print(f"Original: {page.title()}")
    print(f"Popup: {popup.title()}")

    popup.close()
    context.close()
    browser.close()`,
          hints: [
            'Use context.expect_page() as a context manager.',
            'Call popup.wait_for_load_state() before accessing content.',
            'Use popup.close() to close the new page.',
          ],
        },
      },
      {
        id: 'pw-nav-frames',
        title: 'Frames & iFrames',
        difficulty: 'intermediate',
        tags: ['playwright', 'frames', 'iframe', 'frame_locator'],
        sections: [
          {
            heading: 'Working with Frames',
            content:
              'Playwright provides two ways to work with iframes: frame_locator() and the page.frame() method. frame_locator() is the recommended approach because it returns a FrameLocator that you can chain with regular locator methods, making the code clean and consistent.\n\nUnlike Selenium where you must switch context to a frame and back, Playwright lets you interact with frame content inline without switching.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Method 1: frame_locator (recommended)
    frame = page.frame_locator("#my-iframe")
    frame.locator("h1").click()
    text = frame.locator("p").text_content()
    print(f"Frame content: {text}")

    # Method 2: page.frame() by name
    frame2 = page.frame(name="content-frame")
    if frame2:
        heading = frame2.locator("h1").text_content()
        print(f"Frame heading: {heading}")

    # Method 3: page.frame() by URL
    frame3 = page.frame(url=lambda u: "embed" in u)
    if frame3:
        print(f"Found embed frame: {frame3.url}")

    # No switching needed! Interact with main page and frame freely
    main_title = page.locator("h1").text_content()
    frame_title = page.frame_locator("#my-iframe").locator("h1").text_content()
    print(f"Main: {main_title}, Frame: {frame_title}")

    browser.close()`,
            output: `Frame content: Content inside the iframe
Frame heading: Frame Page
Found embed frame: https://example.com/embed
Main: Example Domain, Frame: Frame Page`,
            tip: 'frame_locator() does not switch context — you can freely mix main page and frame interactions without switching back and forth.',
          },
          {
            heading: 'Nested Frames',
            content:
              'For nested frames (frames inside frames), chain frame_locator() calls. Each call goes one level deeper. This is much more intuitive than Selenium\'s approach of switching in and out of frames sequentially.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Access nested frame: outer iframe > inner iframe
    inner_content = (
        page.frame_locator("#outer-frame")
        .frame_locator("#inner-frame")
        .locator("p")
        .text_content()
    )
    print(f"Nested content: {inner_content}")

    # You can also store intermediate frame locators
    outer = page.frame_locator("#outer-frame")
    outer_text = outer.locator("h2").text_content()
    print(f"Outer frame: {outer_text}")

    inner = outer.frame_locator("#inner-frame")
    inner_text = inner.locator("h3").text_content()
    print(f"Inner frame: {inner_text}")

    browser.close()`,
            output: `Nested content: Deeply nested paragraph
Outer frame: Outer Frame Title
Inner frame: Inner Frame Title`,
          },
          {
            heading: 'Frame Assertions',
            content:
              'You can use all standard Playwright assertions with frame locators. The expect() function works with elements inside frames just like elements on the main page. frame_locator() elements support the full range of web-first assertions.',
            code: `from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    frame = page.frame_locator("#content-iframe")

    # Assert frame content is visible
    expect(frame.locator("h1")).to_be_visible()

    # Assert text content within frame
    expect(frame.locator("h1")).to_have_text("Frame Content")

    # Assert element count in frame
    expect(frame.locator("li")).to_have_count(5)

    # Assert input value in frame
    expect(frame.locator("#email")).to_have_value("default@example.com")

    print("All frame assertions passed!")
    browser.close()`,
            output: `All frame assertions passed!`,
          },
        ],
        quiz: [
          {
            question: 'What is the recommended way to work with iframes in Playwright?',
            options: [
              'page.switch_to_frame()',
              'page.frame_locator()',
              'page.frame()',
              'page.enter_frame()',
            ],
            correctIndex: 1,
            explanation: 'frame_locator() is the recommended approach. It returns a FrameLocator that chains with regular locator methods without context switching.',
          },
          {
            question: 'Do you need to switch back to the main page after interacting with a frame?',
            options: [
              'Yes, always',
              'No, frame_locator does not switch context',
              'Only in headless mode',
              'Only with nested frames',
            ],
            correctIndex: 1,
            explanation: 'frame_locator() does not switch the driver context. You can freely interact with both the main page and frame elements without switching.',
          },
          {
            question: 'How do you access nested frames?',
            options: [
              'page.frame_locator("#outer").frame_locator("#inner")',
              'page.nested_frame("#outer", "#inner")',
              'page.frame("#outer > #inner")',
              'page.deep_frame("#inner")',
            ],
            correctIndex: 0,
            explanation: 'Chain frame_locator() calls to navigate through nested frames. Each call goes one level deeper.',
          },
        ],
        challenge: {
          prompt: 'Write a script that accesses an iframe with ID "widget", reads the text of its h2 heading, then verifies the iframe contains at least 3 list items using an assertion.',
          starterCode: `from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # TODO: Access iframe "widget"

    # TODO: Read and print h2 text

    # TODO: Assert at least 3 list items

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    frame = page.frame_locator("#widget")
    heading = frame.locator("h2").text_content()
    print(f"Heading: {heading}")

    items = frame.locator("li")
    count = items.count()
    print(f"List items: {count}")
    assert count >= 3, f"Expected at least 3 items, got {count}"

    browser.close()`,
          hints: [
            'Use page.frame_locator("#widget") to access the iframe.',
            'Chain .locator("h2") on the frame locator.',
            'Use .count() to check the number of list items.',
          ],
        },
      },
      {
        id: 'pw-nav-dialogs',
        title: 'Dialogs & Alerts',
        difficulty: 'beginner',
        tags: ['playwright', 'dialog', 'alert', 'confirm', 'prompt'],
        sections: [
          {
            heading: 'Handling JavaScript Dialogs',
            content:
              'JavaScript dialogs (alert, confirm, prompt) are handled through event listeners in Playwright. Register a handler with page.on("dialog", callback) BEFORE triggering the dialog. The callback receives a Dialog object that you can accept, dismiss, or provide text input to.\n\nUnlike Selenium where you switch to the alert, in Playwright you handle dialogs through event-driven callbacks. If no handler is registered, Playwright automatically dismisses dialogs.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Handle alert - just accept it
    page.on("dialog", lambda dialog: dialog.accept())
    page.evaluate("alert('Hello!')")
    print("Alert handled")

    # Handle confirm - accept
    page.on("dialog", lambda dialog: dialog.accept())
    result = page.evaluate("confirm('Proceed?')")
    print(f"Confirm result: {result}")  # True

    # Handle confirm - dismiss
    page.once("dialog", lambda dialog: dialog.dismiss())
    result = page.evaluate("confirm('Delete?')")
    print(f"Dismiss result: {result}")  # False

    # Handle prompt - enter text
    page.once("dialog", lambda d: d.accept("Python"))
    result = page.evaluate("prompt('Language?')")
    print(f"Prompt result: {result}")  # "Python"

    browser.close()`,
            output: `Alert handled
Confirm result: True
Dismiss result: False
Prompt result: Python`,
            note: 'Use page.once("dialog", ...) for one-time handlers that automatically unregister. Use page.on("dialog", ...) for persistent handlers.',
          },
          {
            heading: 'Dialog Properties',
            content:
              'The Dialog object provides properties to inspect the dialog before deciding how to handle it. You can check the type (alert, confirm, prompt, beforeunload), the message text, and the default value (for prompts). This lets you write conditional handling logic.',
            code: `from playwright.sync_api import sync_playwright

def handle_dialog(dialog):
    print(f"Type: {dialog.type}")
    print(f"Message: {dialog.message}")
    if dialog.type == "prompt":
        print(f"Default: {dialog.default_value}")
        dialog.accept("Custom value")
    elif dialog.type == "confirm":
        if "delete" in dialog.message.lower():
            dialog.dismiss()  # Decline delete confirmations
            print("Declined delete")
        else:
            dialog.accept()
            print("Accepted")
    else:
        dialog.accept()
        print("Accepted alert")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    page.on("dialog", handle_dialog)

    # Trigger different dialog types
    page.evaluate("alert('Info message')")
    page.evaluate("confirm('Delete this item?')")
    page.evaluate("prompt('Enter name:', 'John')")

    browser.close()`,
            output: `Type: alert
Message: Info message
Accepted alert
Type: confirm
Message: Delete this item?
Declined delete
Type: prompt
Message: Enter name:
Default: John`,
          },
          {
            heading: 'Before Unload Dialogs',
            content:
              'The "beforeunload" dialog appears when navigating away from a page with unsaved changes. By default, Playwright does not trigger these dialogs. To handle them, you must register a listener and then trigger navigation.\n\nThis is mainly relevant for testing form pages where you want to verify the "unsaved changes" warning works correctly.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/form")

    # Add a beforeunload handler to the page
    page.evaluate("""
        window.addEventListener('beforeunload', (e) => {
            e.preventDefault();
            e.returnValue = '';
        });
    """)

    # Handle the beforeunload dialog
    page.once("dialog", lambda d: d.accept())

    # Navigate away - triggers beforeunload
    page.goto("https://example.com/other")
    print(f"Navigated to: {page.url}")

    browser.close()`,
            output: `Navigated to: https://www.example.com/other`,
            tip: 'beforeunload dialogs are browser-generated and cannot have custom messages in modern browsers. They always show a generic "Leave site?" message.',
          },
        ],
        quiz: [
          {
            question: 'How does Playwright handle dialogs differently from Selenium?',
            options: [
              'It does not support dialogs',
              'Through event listeners instead of switch_to.alert',
              'Through a special dialog page',
              'The same way as Selenium',
            ],
            correctIndex: 1,
            explanation: 'Playwright uses event-driven dialog handling through page.on("dialog", callback), rather than Selenium\'s switch_to.alert approach.',
          },
          {
            question: 'What happens if no dialog handler is registered?',
            options: [
              'The test hangs',
              'An error is thrown',
              'Playwright automatically dismisses the dialog',
              'The dialog stays open',
            ],
            correctIndex: 2,
            explanation: 'If no dialog handler is registered, Playwright automatically dismisses dialogs by default.',
          },
          {
            question: 'What is the difference between page.on() and page.once() for dialog handlers?',
            options: [
              'on() is sync, once() is async',
              'on() persists, once() fires once and unregisters',
              'once() is faster',
              'They are identical',
            ],
            correctIndex: 1,
            explanation: 'page.on() registers a persistent handler for all future dialogs. page.once() handles only the next dialog and automatically unregisters.',
          },
        ],
        challenge: {
          prompt: 'Write a dialog handler function that accepts alerts, dismisses confirms with "delete" in the message, and enters "Playwright" into prompts. Test it with all three dialog types.',
          starterCode: `from playwright.sync_api import sync_playwright

def handle_dialog(dialog):
    # TODO: Handle different dialog types
    pass

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")
    page.on("dialog", handle_dialog)

    # TODO: Trigger alert, confirm, and prompt

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

def handle_dialog(dialog):
    if dialog.type == "alert":
        dialog.accept()
        print(f"Alert accepted: {dialog.message}")
    elif dialog.type == "confirm":
        if "delete" in dialog.message.lower():
            dialog.dismiss()
            print(f"Confirm dismissed: {dialog.message}")
        else:
            dialog.accept()
    elif dialog.type == "prompt":
        dialog.accept("Playwright")
        print(f"Prompt answered: {dialog.message}")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")
    page.on("dialog", handle_dialog)

    page.evaluate("alert('Info')")
    page.evaluate("confirm('Delete item?')")
    result = page.evaluate("prompt('Tool?')")
    print(f"Prompt result: {result}")

    browser.close()`,
          hints: [
            'Check dialog.type for "alert", "confirm", "prompt".',
            'Use dialog.message to check the text content.',
            'Use dialog.accept("text") to enter text in prompts.',
          ],
        },
      },
    ],
  },

  /* ================================================================== */
  /*  Category 6 — Network                                               */
  /* ================================================================== */
  {
    id: 'pw-network',
    label: 'Network',
    icon: 'Wifi',
    entries: [
      {
        id: 'pw-net-intercept',
        title: 'Request Interception',
        difficulty: 'intermediate',
        tags: ['playwright', 'network', 'intercept', 'route', 'request'],
        sections: [
          {
            heading: 'Intercepting Requests',
            content:
              'Playwright can intercept network requests using page.route(). This lets you modify, block, or redirect requests before they reach the server. Route handlers receive a Route object that you can fulfill (with custom response), continue (with modifications), or abort.\n\nRequest interception is powerful for testing edge cases, mocking APIs, blocking analytics, and simulating error conditions.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # Block all image requests
    page.route("**/*.{png,jpg,jpeg,gif,svg}", lambda route: route.abort())

    # Modify a request header
    def add_header(route):
        headers = route.request.headers
        headers["X-Custom-Header"] = "test-value"
        route.continue_(headers=headers)

    page.route("**/api/**", add_header)

    # Redirect a request
    page.route(
        "**/old-endpoint",
        lambda route: route.fulfill(status=301, headers={"Location": "/new-endpoint"})
    )

    page.goto("https://example.com")
    print("Page loaded with intercepted requests")

    browser.close()`,
            output: `Page loaded with intercepted requests`,
          },
          {
            heading: 'Blocking and Aborting Requests',
            content:
              'route.abort() blocks a request entirely. This is useful for speeding up tests by blocking unnecessary resources like images, fonts, analytics scripts, and third-party trackers. You can abort with a specific error reason like "blockedbyclient" or "failed".\n\nBlocking resources can significantly speed up test execution, especially for media-heavy pages.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    blocked_types = {"image", "media", "font", "stylesheet"}
    blocked_domains = {"analytics.google.com", "facebook.com"}

    def handle_route(route):
        # Block by resource type
        if route.request.resource_type in blocked_types:
            route.abort()
            return

        # Block by domain
        from urllib.parse import urlparse
        domain = urlparse(route.request.url).hostname or ""
        if any(d in domain for d in blocked_domains):
            route.abort("blockedbyclient")
            return

        route.continue_()

    page.route("**/*", handle_route)

    page.goto("https://example.com")
    print("Page loaded (images, fonts, analytics blocked)")

    # Remove route handler when no longer needed
    page.unroute("**/*")
    print("Routes cleared")

    browser.close()`,
            output: `Page loaded (images, fonts, analytics blocked)
Routes cleared`,
            tip: 'Blocking images and fonts can speed up test execution by 30-50%. Consider enabling this globally in your test fixtures for faster test suites.',
          },
          {
            heading: 'Continuing with Modifications',
            content:
              'route.continue_() lets the request proceed to the server but with modifications. You can change the URL, method, headers, or POST data. This is useful for testing how your application handles different server responses or for adding authentication headers.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # Add auth header to all API requests
    def add_auth(route):
        headers = route.request.headers.copy()
        headers["Authorization"] = "Bearer test-token-123"
        route.continue_(headers=headers)

    page.route("**/api/**", add_auth)

    # Redirect API to mock server
    def redirect_api(route):
        url = route.request.url.replace(
            "https://api.production.com",
            "https://mock.local:3000"
        )
        route.continue_(url=url)

    page.route("**/api.production.com/**", redirect_api)

    # Modify POST body
    def modify_body(route):
        import json
        body = json.loads(route.request.post_data or "{}")
        body["test_mode"] = True
        route.continue_(post_data=json.dumps(body))

    page.route("**/api/submit", modify_body)

    page.goto("https://example.com")
    print("Requests modified in flight")

    browser.close()`,
            output: `Requests modified in flight`,
          },
        ],
        quiz: [
          {
            question: 'What are the three actions you can take on an intercepted route?',
            options: [
              'accept, reject, redirect',
              'fulfill, continue_, abort',
              'allow, block, modify',
              'pass, fail, redirect',
            ],
            correctIndex: 1,
            explanation: 'Route handlers can fulfill() (provide custom response), continue_() (proceed with optional modifications), or abort() (block the request).',
          },
          {
            question: 'How do you block all image requests?',
            options: [
              'page.block_images()',
              'page.route("**/*.{png,jpg}", lambda r: r.abort())',
              'page.filter_images(False)',
              'page.set_images(False)',
            ],
            correctIndex: 1,
            explanation: 'Use page.route() with a glob pattern for image extensions and abort the route to block images.',
          },
          {
            question: 'How do you remove a route handler?',
            options: ['page.clear_routes()', 'page.unroute(pattern)', 'page.remove_route()', 'page.route(pattern, None)'],
            correctIndex: 1,
            explanation: 'Use page.unroute(pattern) to remove a previously registered route handler.',
          },
        ],
        challenge: {
          prompt: 'Write a script that blocks all image requests, adds an "X-Test: true" header to all API requests, and navigates to "https://example.com".',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # TODO: Block image requests

    # TODO: Add header to API requests

    # TODO: Navigate

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    page.route("**/*.{png,jpg,jpeg,gif,svg}", lambda r: r.abort())

    def add_header(route):
        headers = route.request.headers.copy()
        headers["X-Test"] = "true"
        route.continue_(headers=headers)
    page.route("**/api/**", add_header)

    page.goto("https://example.com")
    print("Page loaded with route handlers")

    browser.close()`,
          hints: [
            'Use a glob pattern for image extensions.',
            'Copy headers before modifying to avoid issues.',
            'Use route.continue_(headers=...) for modified headers.',
          ],
        },
      },
      {
        id: 'pw-net-mock',
        title: 'Response Mocking',
        difficulty: 'intermediate',
        tags: ['playwright', 'mock', 'api', 'route', 'fulfill'],
        sections: [
          {
            heading: 'Mocking API Responses',
            content:
              'route.fulfill() lets you provide a custom response without hitting the actual server. This is essential for testing how your frontend handles different API responses — success, errors, empty data, and edge cases. You specify the status code, headers, and body.\n\nMocking is also useful for testing offline scenarios, testing error handling, and making tests independent of backend availability.',
            code: `from playwright.sync_api import sync_playwright
import json

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # Mock API response with JSON data
    def mock_users(route):
        route.fulfill(
            status=200,
            content_type="application/json",
            body=json.dumps({
                "users": [
                    {"id": 1, "name": "Alice"},
                    {"id": 2, "name": "Bob"},
                ],
                "total": 2,
            })
        )

    page.route("**/api/users", mock_users)

    # Mock error response
    def mock_error(route):
        route.fulfill(
            status=500,
            content_type="application/json",
            body=json.dumps({"error": "Internal server error"})
        )

    page.route("**/api/broken", mock_error)

    # Mock empty response
    page.route(
        "**/api/empty",
        lambda r: r.fulfill(status=200, body=json.dumps([]))
    )

    page.goto("https://example.com")
    print("API mocked successfully")

    browser.close()`,
            output: `API mocked successfully`,
          },
          {
            heading: 'Conditional Mocking',
            content:
              'You can create sophisticated mock handlers that return different responses based on the request URL, method, headers, or body. This lets you simulate realistic API behavior including pagination, search, filtering, and authentication checks.',
            code: `from playwright.sync_api import sync_playwright
import json

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    def mock_api(route):
        url = route.request.url
        method = route.request.method

        # GET /api/users?page=1
        if "page=1" in url:
            route.fulfill(body=json.dumps({"users": ["Alice", "Bob"], "page": 1}))
        elif "page=2" in url:
            route.fulfill(body=json.dumps({"users": ["Charlie"], "page": 2}))

        # POST /api/users
        elif method == "POST":
            body = json.loads(route.request.post_data or "{}")
            route.fulfill(
                status=201,
                body=json.dumps({"id": 99, **body})
            )

        # DELETE /api/users/1
        elif method == "DELETE":
            route.fulfill(status=204, body="")

        else:
            route.fulfill(status=404, body=json.dumps({"error": "Not found"}))

    page.route("**/api/users*", mock_api)

    page.goto("https://example.com")
    print("Conditional mock ready")

    browser.close()`,
            output: `Conditional mock ready`,
          },
          {
            heading: 'Mocking with File Data',
            content:
              'For complex mock data, you can load responses from files. This keeps your test code clean and makes it easy to update test data. You can use JSON files, HTML files, or any other format.\n\nThis approach also enables sharing mock data across multiple tests.',
            code: `from playwright.sync_api import sync_playwright
import json
from pathlib import Path

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # Mock from a JSON file
    def mock_from_file(route):
        data_file = Path("test_data/users.json")
        if data_file.exists():
            route.fulfill(
                status=200,
                content_type="application/json",
                body=data_file.read_text()
            )
        else:
            route.continue_()

    page.route("**/api/users", mock_from_file)

    # Mock HTML response
    def mock_html(route):
        route.fulfill(
            status=200,
            content_type="text/html",
            body="<html><body><h1>Mocked Page</h1></body></html>"
        )

    page.route("**/mocked-page", mock_html)

    # Fulfill with a file path directly
    page.route(
        "**/api/config",
        lambda r: r.fulfill(path="test_data/config.json")
    )

    page.goto("https://example.com")
    print("File-based mocks ready")

    browser.close()`,
            output: `File-based mocks ready`,
            tip: 'Keep mock data in a dedicated test_data/ directory. Name files to match the API endpoints they mock for easy discovery.',
          },
        ],
        quiz: [
          {
            question: 'What method provides a custom response for an intercepted request?',
            options: ['route.respond()', 'route.fulfill()', 'route.mock()', 'route.return_()'],
            correctIndex: 1,
            explanation: 'route.fulfill() provides a custom response with specified status, headers, and body without hitting the actual server.',
          },
          {
            question: 'What is a key benefit of mocking API responses?',
            options: [
              'It makes the browser faster',
              'Tests become independent of backend availability and state',
              'It reduces browser memory',
              'It eliminates the need for assertions',
            ],
            correctIndex: 1,
            explanation: 'Mocking makes tests deterministic and independent of the backend — they run the same way regardless of server state, network issues, or data changes.',
          },
          {
            question: 'How can you fulfill a route with data from a file?',
            options: [
              'route.fulfill(file="data.json")',
              'route.fulfill(path="data.json")',
              'route.from_file("data.json")',
              'route.load("data.json")',
            ],
            correctIndex: 1,
            explanation: 'route.fulfill(path="data.json") reads the file and uses its contents as the response body.',
          },
        ],
        challenge: {
          prompt: 'Write a script that mocks the "/api/products" endpoint to return a JSON list of 3 products, then navigates to a page that fetches products and verifies the mock data is displayed.',
          starterCode: `from playwright.sync_api import sync_playwright, expect
import json

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # TODO: Mock /api/products with 3 products

    # TODO: Navigate and verify

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright, expect
import json

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    products = [
        {"id": 1, "name": "Laptop", "price": 999},
        {"id": 2, "name": "Phone", "price": 699},
        {"id": 3, "name": "Tablet", "price": 499},
    ]

    page.route(
        "**/api/products",
        lambda r: r.fulfill(
            status=200,
            content_type="application/json",
            body=json.dumps(products)
        )
    )

    page.goto("https://example.com/shop")
    expect(page.locator(".product")).to_have_count(3)
    print("3 mocked products displayed!")

    browser.close()`,
          hints: [
            'Use json.dumps() to convert the list to a JSON string.',
            'Set content_type to "application/json".',
            'Use expect with to_have_count(3) to verify.',
          ],
        },
      },
      {
        id: 'pw-net-monitor',
        title: 'Network Monitoring',
        difficulty: 'intermediate',
        tags: ['playwright', 'network', 'monitor', 'request', 'response'],
        sections: [
          {
            heading: 'Monitoring Requests and Responses',
            content:
              'Playwright lets you listen to all network traffic through page.on("request") and page.on("response") events. This is useful for debugging, verifying that correct API calls are made, and monitoring performance.\n\nUnlike route handlers that can modify requests, event listeners only observe — they do not interfere with the request lifecycle.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # Monitor all requests
    requests = []
    page.on("request", lambda req: requests.append({
        "url": req.url,
        "method": req.method,
        "type": req.resource_type,
    }))

    # Monitor all responses
    responses = []
    page.on("response", lambda resp: responses.append({
        "url": resp.url,
        "status": resp.status,
    }))

    page.goto("https://example.com")

    # Analyze collected data
    print(f"Total requests: {len(requests)}")
    print(f"Total responses: {len(responses)}")

    # Show request types breakdown
    types = {}
    for r in requests:
        types[r["type"]] = types.get(r["type"], 0) + 1
    print(f"Request types: {types}")

    # Check for failed responses
    failed = [r for r in responses if r["status"] >= 400]
    print(f"Failed requests: {len(failed)}")

    browser.close()`,
            output: `Total requests: 2
Total responses: 2
Request types: {'document': 1, 'stylesheet': 1}
Failed requests: 0`,
          },
          {
            heading: 'Waiting for Specific Requests',
            content:
              'expect_request() and expect_response() let you wait for specific network events. They are context managers that should be set up before the action that triggers the request. This is essential for verifying that user actions trigger the correct API calls.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Wait for a specific API call
    with page.expect_response("**/api/data") as resp:
        page.click("#load-data")
    response = resp.value
    print(f"Status: {response.status}")
    data = response.json()
    print(f"Items: {len(data.get('items', []))}")

    # Wait with a predicate function
    with page.expect_response(
        lambda r: "/api/search" in r.url and r.status == 200
    ) as resp:
        page.fill("#search", "test")
        page.press("#search", "Enter")
    print(f"Search returned: {resp.value.json()}")

    # Wait for request to be sent (not response)
    with page.expect_request("**/api/save") as req:
        page.click("#save")
    request = req.value
    print(f"Saved with method: {request.method}")

    browser.close()`,
            output: `Status: 200
Items: 10
Search returned: {'results': ['item1', 'item2']}
Saved with method: POST`,
          },
          {
            heading: 'Network Performance Monitoring',
            content:
              'You can use network monitoring to measure API response times and identify slow requests. This is useful for performance testing and establishing baselines for critical user flows.',
            code: `from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # Track request timing
    timings = {}

    def on_request(request):
        timings[request.url] = {"start": time.time()}

    def on_response(response):
        url = response.url
        if url in timings:
            timings[url]["end"] = time.time()
            timings[url]["duration"] = timings[url]["end"] - timings[url]["start"]
            timings[url]["status"] = response.status

    page.on("request", on_request)
    page.on("response", on_response)

    page.goto("https://example.com")

    # Report timings
    print("\\nRequest Timings:")
    for url, data in timings.items():
        if "duration" in data:
            duration_ms = data["duration"] * 1000
            print(f"  {data['status']} {url[:60]} - {duration_ms:.0f}ms")

    # Find slowest request
    slowest = max(
        ((url, d) for url, d in timings.items() if "duration" in d),
        key=lambda x: x[1]["duration"],
        default=None
    )
    if slowest:
        print(f"\\nSlowest: {slowest[0][:60]} ({slowest[1]['duration']*1000:.0f}ms)")

    browser.close()`,
            output: `Request Timings:
  200 https://www.example.com/ - 245ms
  200 https://www.example.com/style.css - 89ms

Slowest: https://www.example.com/ (245ms)`,
          },
        ],
        quiz: [
          {
            question: 'Do network event listeners interfere with requests?',
            options: [
              'Yes, they can modify requests',
              'No, they only observe',
              'Only response listeners modify',
              'Only in headed mode',
            ],
            correctIndex: 1,
            explanation: 'Event listeners (page.on) only observe network traffic. To modify requests, use page.route() with route handlers.',
          },
          {
            question: 'When should you set up expect_response()?',
            options: [
              'After clicking the button',
              'Before the action that triggers the request',
              'During page.goto()',
              'In the page constructor',
            ],
            correctIndex: 1,
            explanation: 'Set up expect_response() before the action (inside a "with" block) to ensure you catch the response when it arrives.',
          },
          {
            question: 'How can you get the JSON body of a response?',
            options: [
              'response.body()',
              'response.json()',
              'response.data()',
              'response.content()',
            ],
            correctIndex: 1,
            explanation: 'Call response.json() to parse the response body as JSON and return a Python dict/list.',
          },
        ],
        challenge: {
          prompt: 'Write a script that monitors all network requests while navigating to a page, then prints the total number of requests, response types breakdown, and identifies any failed requests (status >= 400).',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # TODO: Set up request/response monitoring

    # TODO: Navigate to example.com

    # TODO: Print stats

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    requests = []
    responses = []

    page.on("request", lambda r: requests.append(r))
    page.on("response", lambda r: responses.append(r))

    page.goto("https://example.com")

    print(f"Total requests: {len(requests)}")

    types = {}
    for r in requests:
        t = r.resource_type
        types[t] = types.get(t, 0) + 1
    print(f"Types: {types}")

    failed = [r for r in responses if r.status >= 400]
    print(f"Failed: {len(failed)}")

    browser.close()`,
          hints: [
            'Use page.on("request", callback) and page.on("response", callback).',
            'Store request/response objects in lists.',
            'Filter responses where status >= 400 for failures.',
          ],
        },
      },
      {
        id: 'pw-net-har',
        title: 'HAR Recording & Replay',
        difficulty: 'advanced',
        tags: ['playwright', 'HAR', 'recording', 'replay', 'network'],
        sections: [
          {
            heading: 'Recording HAR Files',
            content:
              'HAR (HTTP Archive) files capture all network traffic during a browser session in a standard JSON format. Playwright can record HAR files automatically, which you can then use for replay, debugging, or analysis. The HAR file contains all requests, responses, headers, timing, and body data.\n\nTo record a HAR file, pass record_har_path when creating a browser context.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    # Create context with HAR recording
    context = browser.new_context(
        record_har_path="network.har",
        record_har_url_filter="**/api/**",  # Only record API calls
    )

    page = context.new_page()
    page.goto("https://example.com")
    page.click("#load-data")
    page.wait_for_load_state("networkidle")

    # Close context to finalize the HAR file
    context.close()
    browser.close()

    # The HAR file is now saved
    import json
    with open("network.har") as f:
        har = json.load(f)
    entries = har["log"]["entries"]
    print(f"Recorded {len(entries)} network entries")
    for entry in entries[:3]:
        print(f"  {entry['request']['method']} {entry['request']['url'][:50]}")`,
            output: `Recorded 5 network entries
  GET https://example.com/api/data
  GET https://example.com/api/users
  POST https://example.com/api/analytics`,
          },
          {
            heading: 'Replaying HAR Files',
            content:
              'Once you have a HAR file, you can replay it to mock network responses. This creates fully deterministic tests that do not depend on external servers. Playwright matches incoming requests against the HAR entries and serves the recorded responses.\n\nHAR replay is set up at the page level using page.route_from_har(). You can specify what to do when a request does not match any HAR entry.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    # Replay from HAR file
    page.route_from_har(
        "network.har",
        url="**/api/**",           # Only mock API calls
        not_found="fallback",      # Let non-matching requests through
    )

    # Alternative: abort non-matching requests
    # page.route_from_har("network.har", not_found="abort")

    page.goto("https://example.com")

    # API calls will be served from the HAR file
    page.click("#load-data")
    content = page.locator("#data-container").text_content()
    print(f"Data from HAR: {content[:50]}")

    context.close()
    browser.close()`,
            output: `Data from HAR: {"users": [{"id": 1, "name": "Alice"}...`,
          },
          {
            heading: 'HAR with Update Mode',
            content:
              'Playwright supports a "update" mode for HAR files. In this mode, if a request does not match any HAR entry, Playwright makes the real request, records the response, and adds it to the HAR file. This is useful for gradually building up your HAR mock data.\n\nThis approach lets you start with an empty HAR file and build it up by running your tests against the real server. Once complete, your tests can run entirely from the HAR file.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    # Update mode: use HAR when available, record new requests
    page.route_from_har(
        "api_responses.har",
        url="**/api/**",
        update=True,  # Record new responses into the HAR
    )

    page.goto("https://example.com")
    page.click("#load-users")     # First run: real request, recorded
    page.click("#load-products")  # First run: real request, recorded

    # After closing, HAR file is updated with new entries
    context.close()
    browser.close()

    # Second run: both requests served from HAR
    print("HAR file updated with new entries")
    print("Next run will use recorded responses")`,
            output: `HAR file updated with new entries
Next run will use recorded responses`,
            tip: 'Use update mode during development, then switch to regular replay (without update=True) for CI/CD. This ensures CI tests are deterministic while still making it easy to update mocks when APIs change.',
          },
        ],
        quiz: [
          {
            question: 'What is a HAR file?',
            options: [
              'A browser executable',
              'A JSON file capturing network traffic (HTTP Archive)',
              'A test configuration file',
              'A binary log file',
            ],
            correctIndex: 1,
            explanation: 'HAR (HTTP Archive) is a JSON-formatted file that records all HTTP requests and responses, including headers, bodies, and timing data.',
          },
          {
            question: 'What does the "update" mode do in route_from_har?',
            options: [
              'Updates the browser version',
              'Uses HAR when available and records new requests',
              'Deletes old HAR entries',
              'Updates request headers',
            ],
            correctIndex: 1,
            explanation: 'Update mode serves responses from the HAR file when available, and records real responses for unmatched requests, adding them to the HAR file.',
          },
          {
            question: 'What happens with not_found="abort"?',
            options: [
              'The test aborts',
              'Unmatched requests are aborted (blocked)',
              'The HAR file is deleted',
              'A warning is logged',
            ],
            correctIndex: 1,
            explanation: 'With not_found="abort", any request that does not match a HAR entry is blocked, ensuring all network calls are served from the recorded data.',
          },
        ],
        challenge: {
          prompt: 'Write a script that records a HAR file while navigating to "https://example.com", then in a second browser session, replays the HAR file and verifies the page loads correctly.',
          starterCode: `from playwright.sync_api import sync_playwright

# TODO: Record HAR

# TODO: Replay HAR`,
          solutionCode: `from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    # Step 1: Record
    browser = p.chromium.launch()
    context = browser.new_context(record_har_path="test.har")
    page = context.new_page()
    page.goto("https://example.com")
    context.close()
    browser.close()
    print("HAR recorded")

    # Step 2: Replay
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()
    page.route_from_har("test.har", not_found="fallback")
    page.goto("https://example.com")
    expect(page.locator("h1")).to_have_text("Example Domain")
    print("HAR replay verified!")
    context.close()
    browser.close()`,
          hints: [
            'Use record_har_path in new_context() for recording.',
            'Close the context to finalize the HAR file.',
            'Use page.route_from_har() for replay.',
          ],
        },
      },
    ],
  },
];
