import type { DocCategory } from './types';

export const PW_PART3_CATEGORIES: DocCategory[] = [
  /* ================================================================== */
  /*  Category 7 — Screenshots and Visual Testing                       */
  /* ================================================================== */
  {
    id: 'pw-screenshots-visual',
    label: 'Screenshots and Visual Testing',
    icon: 'Camera',
    entries: [
      /* -------------------------------------------------------------- */
      /*  Taking Screenshots                                            */
      /* -------------------------------------------------------------- */
      {
        id: 'pw-taking-screenshots',
        title: 'Taking Screenshots',
        difficulty: 'beginner',
        tags: ['screenshots', 'visual', 'debugging', 'playwright'],
        sections: [
          {
            heading: 'Full Page Screenshots',
            content:
              'Playwright makes it trivially easy to capture a screenshot of any page at any point during your script. The page.screenshot() method returns raw bytes by default and can also write directly to a file. A full-page screenshot captures everything — including content that is below the visible viewport — by passing the full_page parameter.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Save a viewport-only screenshot
    page.screenshot(path="viewport.png")

    # Save a full-page screenshot (scrolls automatically)
    page.screenshot(path="fullpage.png", full_page=True)

    browser.close()`,
            output: `# Two files created:
# viewport.png  — captures only the visible viewport
# fullpage.png  — captures the entire scrollable page`,
            tip: 'Full-page screenshots stitch together multiple viewport-sized captures internally, so very long pages may produce large image files.',
            analogy: 'Think of a viewport screenshot as a photo taken through a window — you only see what the frame allows. A full-page screenshot is like unrolling the entire scroll and photographing the whole thing at once.',
          },
          {
            heading: 'Element Screenshots',
            content:
              'Instead of capturing the whole page, you can take a screenshot of a specific element. This is perfect for visual regression testing of individual components like buttons, cards, or navigation bars. Playwright automatically scrolls the element into view before capturing it.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Screenshot a specific element
    heading = page.locator("h1")
    heading.screenshot(path="heading.png")

    # Screenshot a more complex component
    nav = page.locator("nav").first
    nav.screenshot(path="navigation.png")

    browser.close()`,
            output: `# heading.png — contains only the <h1> element pixels
# navigation.png — contains only the <nav> element pixels`,
            tip: 'Element screenshots respect CSS transforms, borders, and box shadows. The captured area is the bounding box of the element.',
          },
          {
            heading: 'Clip Region',
            content:
              'The clip parameter lets you capture a specific rectangular region of the page defined by x, y, width, and height coordinates. This is useful when you want a precise area that does not correspond to a single DOM element.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Capture a specific rectangle (top-left 400x300 area)
    page.screenshot(
        path="clipped.png",
        clip={"x": 0, "y": 0, "width": 400, "height": 300}
    )

    # Capture a region in the middle of the page
    page.screenshot(
        path="middle.png",
        clip={"x": 100, "y": 200, "width": 600, "height": 400}
    )

    browser.close()`,
            output: `# clipped.png — 400x300 pixel image from top-left corner
# middle.png  — 600x400 pixel image from coordinates (100, 200)`,
            analogy: 'Clipping is like placing a rectangular stencil on a painting — only the area inside the cutout is captured.',
          },
          {
            heading: 'Screenshot Options',
            content:
              'Playwright supports additional options for screenshots including image type (png or jpeg), quality for JPEG images, transparency handling, and custom animations behavior. You can also capture screenshots as base64-encoded bytes for embedding directly in reports.',
            code: `from playwright.sync_api import sync_playwright
import base64

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # JPEG with quality setting
    page.screenshot(path="page.jpg", type="jpeg", quality=80)

    # PNG with transparent background (for pages with no bg)
    page.screenshot(path="transparent.png", omit_background=True)

    # Get screenshot as bytes (no file saved)
    img_bytes = page.screenshot()
    encoded = base64.b64encode(img_bytes).decode()
    print(f"Base64 length: {len(encoded)}")

    # Disable animations before capturing
    page.screenshot(path="static.png", animations="disabled")

    browser.close()`,
            output: `Base64 length: 14832`,
            tip: 'Use animations="disabled" to freeze CSS animations and transitions at their current state, ensuring deterministic screenshots for visual comparison.',
          },
        ],
        quiz: [
          {
            question: 'Which parameter captures the entire scrollable page, not just the viewport?',
            options: ['scroll=True', 'full_page=True', 'entire=True', 'capture_all=True'],
            correctIndex: 1,
            explanation: 'The full_page=True parameter tells Playwright to scroll the page and stitch together a screenshot of all content, not just the visible viewport.',
          },
          {
            question: 'How do you take a screenshot of a specific element?',
            options: [
              'page.screenshot(element="h1")',
              'page.capture_element("h1")',
              'page.locator("h1").screenshot(path="h1.png")',
              'page.screenshot(selector="h1")',
            ],
            correctIndex: 2,
            explanation: 'You call .screenshot() directly on a locator object. First create the locator with page.locator(), then call .screenshot() on it.',
          },
          {
            question: 'What does the clip parameter accept?',
            options: [
              'A CSS selector string',
              'A dictionary with x, y, width, height',
              'A tuple of (x, y, width, height)',
              'A bounding box element',
            ],
            correctIndex: 1,
            explanation: 'The clip parameter takes a dictionary with keys x, y, width, and height that define the rectangular region to capture.',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to "https://example.com", takes a full-page screenshot, takes an element screenshot of the first <p> tag, and takes a clipped screenshot of the top-left 300x200 region. Save them as "full.png", "paragraph.png", and "clip.png" respectively.',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # TODO: Full-page screenshot -> "full.png"

    # TODO: Element screenshot of first <p> -> "paragraph.png"

    # TODO: Clipped screenshot (0,0,300,200) -> "clip.png"

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    page.screenshot(path="full.png", full_page=True)

    page.locator("p").first.screenshot(path="paragraph.png")

    page.screenshot(
        path="clip.png",
        clip={"x": 0, "y": 0, "width": 300, "height": 200}
    )

    browser.close()`,
          hints: [
            'Use full_page=True for the full-page screenshot.',
            'Use page.locator("p").first to get the first paragraph element.',
            'The clip parameter takes a dict with x, y, width, and height keys.',
          ],
        },
      },

      /* -------------------------------------------------------------- */
      /*  Video Recording                                               */
      /* -------------------------------------------------------------- */
      {
        id: 'pw-video-recording',
        title: 'Video Recording',
        difficulty: 'intermediate',
        tags: ['video', 'recording', 'debugging', 'playwright'],
        sections: [
          {
            heading: 'Enabling Video Recording',
            content:
              'Playwright can record a video of the entire browser session. Video recording is configured at the browser context level, not the page level, because the context manages the lifecycle. You specify a directory where Playwright will save .webm video files. Recording starts automatically when a page is created and stops when the context is closed.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    # Create context with video recording enabled
    context = browser.new_context(
        record_video_dir="videos/"
    )

    page = context.new_page()
    page.goto("https://example.com")
    page.click("text=More information")
    page.wait_for_timeout(2000)

    # Close context to finalize the video
    context.close()
    browser.close()`,
            output: `# A .webm video file is saved in the videos/ directory
# e.g., videos/a1b2c3d4e5f6.webm`,
            tip: 'You must close the context (not just the page) for the video file to be finalized and written to disk.',
            analogy: 'Think of record_video_dir like pressing the record button on a security camera — everything that happens on the page is captured until you turn it off by closing the context.',
          },
          {
            heading: 'Video Size Configuration',
            content:
              'By default, the recorded video matches the viewport size. You can override this with the record_video_size parameter to produce smaller or custom-sized videos. This is helpful when you want to reduce file size or standardize video dimensions across different tests.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    # Record video with custom dimensions
    context = browser.new_context(
        record_video_dir="videos/",
        record_video_size={"width": 800, "height": 600}
    )

    page = context.new_page()
    page.goto("https://example.com")
    page.wait_for_timeout(1000)

    context.close()
    browser.close()`,
            output: `# Video saved at 800x600 resolution in videos/ directory`,
          },
          {
            heading: 'Accessing the Video Path',
            content:
              'After recording, you often need the actual file path of the saved video — for example, to attach it to a test report or rename it. The page.video.path() method returns the path. Note that the path is only available after the page or context has been closed, because Playwright finalizes the file at that point.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(record_video_dir="videos/")
    page = context.new_page()

    page.goto("https://example.com")

    # Get the video path (available after page closes)
    video_path = page.video.path()
    print(f"Video will be saved to: {video_path}")

    # Close to finalize
    context.close()
    print(f"Video saved at: {video_path}")

    browser.close()`,
            output: `Video will be saved to: videos/7f8a9b0c1d2e.webm
Video saved at: videos/7f8a9b0c1d2e.webm`,
            tip: 'Use page.video.save_as("custom_name.webm") to copy the video to a specific path with a meaningful name before closing the context.',
          },
          {
            heading: 'Saving with Custom Names',
            content:
              'The default video file name is a random hex string, which is not very descriptive. You can use page.video.save_as() to copy the video to a meaningful path. This is especially useful in test frameworks where you want to name videos after the test case.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(record_video_dir="videos/")
    page = context.new_page()

    page.goto("https://example.com")
    page.click("text=More information")

    # Save with a custom name
    page.video.save_as("videos/homepage_navigation.webm")

    context.close()
    browser.close()
    print("Video saved as homepage_navigation.webm")`,
            output: `Video saved as homepage_navigation.webm`,
          },
        ],
        quiz: [
          {
            question: 'At what level is video recording configured in Playwright?',
            options: ['Page level', 'Browser level', 'Browser context level', 'Frame level'],
            correctIndex: 2,
            explanation: 'Video recording is configured when creating a browser context via the record_video_dir parameter on browser.new_context().',
          },
          {
            question: 'When is the video file finalized and written to disk?',
            options: [
              'Immediately after each navigation',
              'When the page is closed',
              'When the browser context is closed',
              'When browser.close() is called',
            ],
            correctIndex: 2,
            explanation: 'The video file is finalized when the browser context is closed. You must close the context for the video to be complete and playable.',
          },
          {
            question: 'How do you save a video with a custom file name?',
            options: [
              'page.video.rename("name.webm")',
              'page.video.save_as("name.webm")',
              'context.save_video("name.webm")',
              'page.screenshot(video="name.webm")',
            ],
            correctIndex: 1,
            explanation: 'page.video.save_as() copies the recorded video to a specific path with a custom name.',
          },
        ],
        challenge: {
          prompt: 'Write a script that records a video at 1024x768 resolution while navigating to "https://example.com" and clicking on any link. Save the video with the custom name "test_recording.webm" in a "recordings/" directory.',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    # TODO: Create context with video recording at 1024x768

    # TODO: Navigate and interact

    # TODO: Save video with custom name

    # TODO: Clean up

    pass`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    context = browser.new_context(
        record_video_dir="recordings/",
        record_video_size={"width": 1024, "height": 768}
    )

    page = context.new_page()
    page.goto("https://example.com")
    page.click("a")

    page.video.save_as("recordings/test_recording.webm")
    context.close()
    browser.close()`,
          hints: [
            'Use record_video_dir and record_video_size in browser.new_context().',
            'Call page.video.save_as() before closing the context.',
            'Remember to close the context, not just the browser.',
          ],
        },
      },

      /* -------------------------------------------------------------- */
      /*  Visual Comparison                                             */
      /* -------------------------------------------------------------- */
      {
        id: 'pw-visual-comparison',
        title: 'Visual Comparison',
        difficulty: 'advanced',
        tags: ['visual-testing', 'snapshot', 'regression', 'playwright'],
        sections: [
          {
            heading: 'Snapshot-Based Visual Testing',
            content:
              'Visual comparison testing captures a screenshot and compares it pixel-by-pixel against a previously saved "golden" reference image. If the images differ beyond a configurable threshold, the test fails. This catches unintended visual regressions — a misaligned button, a color change, a broken layout — that functional tests would miss entirely.',
            code: `# Using pytest-playwright with the snapshot plugin
# Install: pip install pytest-playwright pytest-playwright-visual

# test_visual.py
from playwright.sync_api import Page

def test_homepage_visual(page: Page):
    page.goto("https://example.com")

    # Compare full page against stored snapshot
    assert page.screenshot() == page.screenshot()  # conceptual

    # With pytest-playwright-visual or similar plugin:
    # expect(page).to_have_screenshot("homepage.png")`,
            tip: 'The first run creates the reference snapshot. Subsequent runs compare against it. Commit snapshots to version control so the whole team shares the same baselines.',
            analogy: 'Visual testing is like an art restorer comparing a painting against a high-resolution photo taken before shipping. Any scratch, discoloration, or warping is immediately visible in a side-by-side comparison.',
          },
          {
            heading: 'Pixel Comparison with Threshold',
            content:
              'Exact pixel matching is often too strict — anti-aliasing differences between operating systems or minor rendering variations can cause false failures. The max_diff_pixel_ratio and threshold parameters let you tolerate small differences. The threshold controls the color-distance sensitivity per pixel, while max_diff_pixel_ratio sets the percentage of pixels allowed to differ.',
            code: `# Using Playwright's built-in visual comparison (Node.js-style API)
# In Python, you typically use a helper library or manual comparison.

from playwright.sync_api import sync_playwright
from PIL import Image
import math

def pixel_diff(img1_path, img2_path, threshold=0.1):
    """Compare two images and return the ratio of different pixels."""
    img1 = Image.open(img1_path).convert("RGB")
    img2 = Image.open(img2_path).convert("RGB")

    if img1.size != img2.size:
        return 1.0  # completely different

    pixels1 = list(img1.getdata())
    pixels2 = list(img2.getdata())
    total = len(pixels1)
    diff_count = 0

    for p1, p2 in zip(pixels1, pixels2):
        distance = math.sqrt(sum((a - b) ** 2 for a, b in zip(p1, p2)))
        # Normalize to 0-1 range (max distance is ~441 for RGB)
        if distance / 441.67 > threshold:
            diff_count += 1

    return diff_count / total

# Usage in a test
ratio = pixel_diff("baseline.png", "current.png", threshold=0.1)
assert ratio < 0.01, f"Visual diff too large: {ratio:.2%} pixels differ"
print(f"Pixel diff ratio: {ratio:.4f}")`,
            output: `Pixel diff ratio: 0.0023`,
          },
          {
            heading: 'Updating Snapshots',
            content:
              'When you intentionally change the UI, existing snapshots become outdated and tests will fail. You need a way to update the baseline images. Most visual testing tools provide a flag or command to regenerate all snapshots. In a manual setup, you simply overwrite the baseline files with new captures.',
            code: `# Manual snapshot management approach
import os
import shutil
from playwright.sync_api import sync_playwright

SNAPSHOT_DIR = "snapshots"
UPDATE_SNAPSHOTS = os.environ.get("UPDATE_SNAPSHOTS", "false") == "true"

def visual_assert(page, name):
    """Take screenshot and compare or update snapshot."""
    current_path = f"current_{name}"
    baseline_path = os.path.join(SNAPSHOT_DIR, name)

    page.screenshot(path=current_path)

    if UPDATE_SNAPSHOTS or not os.path.exists(baseline_path):
        os.makedirs(SNAPSHOT_DIR, exist_ok=True)
        shutil.copy(current_path, baseline_path)
        print(f"Updated snapshot: {name}")
        return

    # Compare (simplified — use a real diff library in practice)
    current_size = os.path.getsize(current_path)
    baseline_size = os.path.getsize(baseline_path)
    assert abs(current_size - baseline_size) < 1000, (
        f"Snapshot mismatch for {name}"
    )
    print(f"Snapshot matched: {name}")

# Usage
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    visual_assert(page, "homepage.png")
    browser.close()`,
            output: `Updated snapshot: homepage.png`,
            tip: 'Run with UPDATE_SNAPSHOTS=true to regenerate baselines. In CI, never set this flag so that real regressions are caught.',
          },
        ],
        quiz: [
          {
            question: 'What is the main purpose of visual comparison testing?',
            options: [
              'To check if JavaScript functions return correct values',
              'To catch unintended visual regressions in the UI',
              'To measure page load performance',
              'To validate HTML structure',
            ],
            correctIndex: 1,
            explanation: 'Visual comparison testing captures screenshots and compares them against baselines to catch unintended visual changes like broken layouts, color changes, or misaligned elements.',
          },
          {
            question: 'Why is a threshold used in pixel comparison?',
            options: [
              'To make tests run faster',
              'To reduce screenshot file size',
              'To tolerate minor rendering differences across environments',
              'To limit the number of screenshots taken',
            ],
            correctIndex: 2,
            explanation: 'Different operating systems, browsers, and rendering engines may produce slight pixel-level differences (anti-aliasing, font rendering). A threshold prevents these from causing false failures.',
          },
          {
            question: 'When should you update visual snapshots?',
            options: [
              'Before every test run',
              'Only when you intentionally changed the UI',
              'After every deployment',
              'Never — snapshots should remain static',
            ],
            correctIndex: 1,
            explanation: 'Snapshots should only be updated when the UI has intentionally changed. Updating them routinely would defeat the purpose of catching regressions.',
          },
        ],
        challenge: {
          prompt: 'Write a visual_test function that takes a Playwright page and a snapshot name. It should capture a screenshot, check if a baseline exists in "baselines/" directory, save as baseline if not, and compare file sizes if it does (assert within 500 bytes). Include an environment variable check for UPDATE_SNAPSHOTS.',
          starterCode: `import os
import shutil

BASELINE_DIR = "baselines"

def visual_test(page, snapshot_name):
    # TODO: Check UPDATE_SNAPSHOTS environment variable

    # TODO: Take screenshot to a temp path

    # TODO: If updating or no baseline exists, save as baseline

    # TODO: Otherwise, compare against baseline

    pass`,
          solutionCode: `import os
import shutil

BASELINE_DIR = "baselines"

def visual_test(page, snapshot_name):
    update = os.environ.get("UPDATE_SNAPSHOTS", "false") == "true"
    temp_path = f"tmp_{snapshot_name}"
    baseline_path = os.path.join(BASELINE_DIR, snapshot_name)

    page.screenshot(path=temp_path)

    if update or not os.path.exists(baseline_path):
        os.makedirs(BASELINE_DIR, exist_ok=True)
        shutil.copy(temp_path, baseline_path)
        print(f"Baseline saved: {snapshot_name}")
        return

    current_size = os.path.getsize(temp_path)
    baseline_size = os.path.getsize(baseline_path)
    assert abs(current_size - baseline_size) < 500, (
        f"Visual mismatch: {snapshot_name} "
        f"(diff={abs(current_size - baseline_size)} bytes)"
    )
    print(f"Visual match: {snapshot_name}")`,
          hints: [
            'Use os.environ.get() to check for the UPDATE_SNAPSHOTS variable.',
            'Use os.path.exists() to check if the baseline file already exists.',
            'Use os.path.getsize() to compare file sizes as a simple diff metric.',
          ],
        },
      },

      /* -------------------------------------------------------------- */
      /*  Tracing                                                       */
      /* -------------------------------------------------------------- */
      {
        id: 'pw-tracing',
        title: 'Tracing',
        difficulty: 'intermediate',
        tags: ['tracing', 'debugging', 'trace-viewer', 'playwright'],
        sections: [
          {
            heading: 'Starting a Trace',
            content:
              'Playwright tracing records a detailed log of every action, network request, DOM snapshot, and console message during a browser session. This trace can be viewed in the Playwright Trace Viewer — a powerful GUI that lets you step through each action and inspect the page state at that exact moment. Tracing is configured on the browser context.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()

    # Start tracing with screenshots and snapshots
    context.tracing.start(
        screenshots=True,
        snapshots=True,
        sources=True
    )

    page = context.new_page()
    page.goto("https://example.com")
    page.click("text=More information")

    # Stop tracing and save to a zip file
    context.tracing.stop(path="trace.zip")

    context.close()
    browser.close()`,
            output: `# trace.zip file created containing:
# - Action log with timestamps
# - DOM snapshots at each step
# - Screenshots at each step
# - Network request/response data
# - Console messages`,
            tip: 'Enable sources=True to include your test source code in the trace, making it easier to correlate actions with your script lines.',
            analogy: 'A trace is like a flight recorder (black box) for your browser session. After something goes wrong, you can replay every moment to understand exactly what happened.',
          },
          {
            heading: 'Viewing Traces',
            content:
              'The Playwright Trace Viewer is a web-based tool that opens the trace.zip file and presents a timeline of every action. You can click on any action to see the DOM snapshot, screenshot, network activity, and console output at that exact moment. It is an incredibly powerful debugging tool.',
            code: `# Open the trace viewer from the command line:
# playwright show-trace trace.zip

# Or in Python, you can open it programmatically:
import subprocess
subprocess.run(["playwright", "show-trace", "trace.zip"])

# The trace viewer shows:
# 1. Timeline of all actions (click, goto, fill, etc.)
# 2. Before/After screenshots for each action
# 3. DOM snapshot — you can inspect elements
# 4. Network tab — all requests and responses
# 5. Console tab — all console.log messages
# 6. Source tab — your test code with highlighted line`,
            output: `# Opens the Trace Viewer GUI in your default browser
# Navigate through actions using the timeline
# Inspect page state at each step`,
          },
          {
            heading: 'Tracing in Tests',
            content:
              'In a real test suite, you often want to record traces only when tests fail — recording every test would be wasteful. A common pattern is to start tracing before each test and only save the trace file when a failure is detected. This gives you a detailed recording for debugging without slowing down passing tests.',
            code: `# conftest.py — pytest fixture for conditional tracing
import pytest
from playwright.sync_api import sync_playwright

@pytest.fixture(scope="function")
def traced_page():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        context.tracing.start(screenshots=True, snapshots=True)
        page = context.new_page()

        yield page

        # After the test, check if it failed
        # and save trace accordingly
        context.tracing.stop(path="trace.zip")
        context.close()
        browser.close()

# test_example.py
def test_navigation(traced_page):
    traced_page.goto("https://example.com")
    assert "Example" in traced_page.title()`,
            output: `# trace.zip is created after each test
# In practice, check request.node.rep_call.failed to
# conditionally save only on failure`,
            tip: 'Use pytest hooks like @pytest.hookimpl(tryfirst=True) with request.node to detect test failure and save traces only for failing tests.',
          },
          {
            heading: 'Trace Chunks for Long Sessions',
            content:
              'For long-running sessions, you can create multiple trace chunks using tracing.start_chunk() and tracing.stop_chunk(). Each chunk captures a segment of the session, allowing you to isolate specific parts of a complex workflow without creating one enormous trace file.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()

    # Start the tracing session
    context.tracing.start(screenshots=True, snapshots=True)

    page = context.new_page()

    # Chunk 1: Login flow
    context.tracing.start_chunk()
    page.goto("https://example.com/login")
    page.fill("#username", "user")
    page.fill("#password", "pass")
    page.click("button[type=submit]")
    context.tracing.stop_chunk(path="trace_login.zip")

    # Chunk 2: Dashboard interaction
    context.tracing.start_chunk()
    page.goto("https://example.com/dashboard")
    page.click("text=Settings")
    context.tracing.stop_chunk(path="trace_dashboard.zip")

    context.tracing.stop()
    context.close()
    browser.close()`,
            output: `# trace_login.zip     — contains only the login flow
# trace_dashboard.zip — contains only the dashboard flow`,
          },
        ],
        quiz: [
          {
            question: 'What format is a Playwright trace saved in?',
            options: ['JSON file', 'HAR archive', 'ZIP file', 'SQLite database'],
            correctIndex: 2,
            explanation: 'Playwright saves traces as .zip files that contain action logs, DOM snapshots, screenshots, and network data. The Trace Viewer opens these zip files.',
          },
          {
            question: 'Which command opens the Playwright Trace Viewer?',
            options: [
              'playwright view trace.zip',
              'playwright show-trace trace.zip',
              'playwright open-trace trace.zip',
              'playwright debug trace.zip',
            ],
            correctIndex: 1,
            explanation: 'The command "playwright show-trace trace.zip" opens the Trace Viewer GUI where you can inspect every action and page state.',
          },
          {
            question: 'What does sources=True do when starting a trace?',
            options: [
              'Records page source HTML',
              'Includes your test source code in the trace',
              'Captures all JavaScript files loaded by the page',
              'Enables source maps for CSS',
            ],
            correctIndex: 1,
            explanation: 'sources=True includes your test script source code in the trace, so the Trace Viewer can show which line of your code triggered each action.',
          },
          {
            question: 'What is the purpose of start_chunk() and stop_chunk()?',
            options: [
              'To pause and resume the browser',
              'To split a long trace into smaller, focused segments',
              'To record video in chunks',
              'To run tests in parallel chunks',
            ],
            correctIndex: 1,
            explanation: 'start_chunk() and stop_chunk() let you break a long tracing session into separate zip files, each capturing a specific part of the workflow.',
          },
        ],
        challenge: {
          prompt: 'Write a pytest fixture called "traced_page" that starts tracing with screenshots and snapshots enabled, yields a page object, and saves the trace to "traces/test_trace.zip" after the test completes. Then write a simple test that uses this fixture to navigate to "https://example.com" and assert the title contains "Example".',
          starterCode: `import pytest
from playwright.sync_api import sync_playwright

@pytest.fixture
def traced_page():
    # TODO: Launch browser, create context, start tracing

    # TODO: Yield the page

    # TODO: Stop tracing, save to "traces/test_trace.zip", clean up
    pass

def test_homepage(traced_page):
    # TODO: Navigate and assert title
    pass`,
          solutionCode: `import pytest
from playwright.sync_api import sync_playwright

@pytest.fixture
def traced_page():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        context.tracing.start(screenshots=True, snapshots=True)
        page = context.new_page()

        yield page

        context.tracing.stop(path="traces/test_trace.zip")
        context.close()
        browser.close()

def test_homepage(traced_page):
    traced_page.goto("https://example.com")
    assert "Example" in traced_page.title()`,
          hints: [
            'Use context.tracing.start() with screenshots=True and snapshots=True.',
            'yield the page so the test body runs between setup and teardown.',
            'Call context.tracing.stop(path=...) in the teardown section after yield.',
          ],
        },
      },
    ],
  },

  /* ================================================================== */
  /*  Category 8 — Testing with Playwright Test                         */
  /* ================================================================== */
  {
    id: 'pw-testing-framework',
    label: 'Testing with Playwright Test',
    icon: 'TestTube',
    entries: [
      /* -------------------------------------------------------------- */
      /*  pytest-playwright Plugin                                      */
      /* -------------------------------------------------------------- */
      {
        id: 'pw-pytest-plugin',
        title: 'pytest-playwright Plugin',
        difficulty: 'intermediate',
        tags: ['pytest', 'plugin', 'fixtures', 'testing'],
        sections: [
          {
            heading: 'Installation and Setup',
            content:
              'The pytest-playwright plugin provides convenient pytest fixtures that automatically manage browser lifecycle, contexts, and pages. Instead of manually launching browsers and creating pages in every test, you simply declare the fixtures you need and pytest-playwright handles the rest. Install it alongside Playwright and its browsers.',
            code: `# Install pytest-playwright
# pip install pytest-playwright
# playwright install

# A simple test using the page fixture — no setup needed!
# test_example.py

def test_homepage_title(page):
    page.goto("https://example.com")
    assert page.title() == "Example Domain"

def test_homepage_heading(page):
    page.goto("https://example.com")
    heading = page.locator("h1")
    assert heading.text_content() == "Example Domain"`,
            output: `$ pytest test_example.py -v
test_example.py::test_homepage_title PASSED
test_example.py::test_homepage_heading PASSED
========= 2 passed in 3.21s =========`,
            tip: 'Each test function gets its own fresh page instance, so tests are fully isolated from one another by default.',
            analogy: 'pytest-playwright fixtures are like a hotel concierge — you just ask for what you need (a page, a browser, a context) and it is prepared for you without any effort on your part.',
          },
          {
            heading: 'Built-in Fixtures',
            content:
              'pytest-playwright provides several fixtures out of the box: page (a fresh page per test), context (a browser context), browser (a browser instance), and browser_name (the name of the current browser). The page fixture is by far the most commonly used — it gives you a ready-to-use Page object with a fresh context.',
            code: `# Using different fixtures
# test_fixtures.py

def test_with_page(page):
    """Most common — get a fresh page."""
    page.goto("https://example.com")
    assert page.title() == "Example Domain"

def test_with_context(context):
    """Get a context to create multiple pages."""
    page1 = context.new_page()
    page2 = context.new_page()
    page1.goto("https://example.com")
    page2.goto("https://example.com")
    assert page1.title() == page2.title()

def test_with_browser(browser):
    """Get the browser to create custom contexts."""
    context = browser.new_context(
        viewport={"width": 1920, "height": 1080}
    )
    page = context.new_page()
    page.goto("https://example.com")
    assert page.title() == "Example Domain"
    context.close()

def test_browser_name(browser_name):
    """Check which browser is running."""
    assert browser_name in ["chromium", "firefox", "webkit"]
    print(f"Running on: {browser_name}")`,
            output: `$ pytest test_fixtures.py -v
test_fixtures.py::test_with_page PASSED
test_fixtures.py::test_with_context PASSED
test_fixtures.py::test_with_browser PASSED
test_fixtures.py::test_browser_name PASSED`,
          },
          {
            heading: 'Conftest Configuration',
            content:
              'You can customize browser launch options, context options, and other settings through conftest.py fixtures. Override the browser_context_args fixture to set default viewport, locale, or other context-level settings. Override browser_type_launch_args for browser launch options like headless mode or slow motion.',
            code: `# conftest.py
import pytest

@pytest.fixture(scope="session")
def browser_type_launch_args(browser_type_launch_args):
    """Customize browser launch options."""
    return {
        **browser_type_launch_args,
        "headless": True,
        "slow_mo": 100,  # slow down actions by 100ms
    }

@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    """Customize context options for all tests."""
    return {
        **browser_context_args,
        "viewport": {"width": 1280, "height": 720},
        "locale": "en-US",
        "timezone_id": "America/New_York",
    }

# test_configured.py
def test_viewport_is_set(page):
    page.goto("https://example.com")
    size = page.viewport_size
    assert size["width"] == 1280
    assert size["height"] == 720`,
            output: `$ pytest test_configured.py -v
test_configured.py::test_viewport_is_set PASSED`,
            tip: 'Use session scope for browser launch args and context args to avoid re-launching the browser for every single test, which saves significant time.',
          },
          {
            heading: 'Running Across Browsers',
            content:
              'pytest-playwright supports running your tests across multiple browsers with a simple command-line flag. Use --browser to specify which browser to test against. You can pass this flag multiple times to run the entire suite on multiple browsers in a single command.',
            code: `# Run tests on Chromium (default)
# pytest test_example.py

# Run tests on Firefox
# pytest test_example.py --browser firefox

# Run tests on WebKit
# pytest test_example.py --browser webkit

# Run on ALL browsers (tests run 3x)
# pytest test_example.py --browser chromium --browser firefox --browser webkit

# test_crossbrowser.py
def test_works_everywhere(page, browser_name):
    page.goto("https://example.com")
    print(f"Testing on {browser_name}")
    assert "Example" in page.title()`,
            output: `$ pytest test_crossbrowser.py --browser chromium --browser firefox -v
test_crossbrowser.py::test_works_everywhere[chromium] PASSED
test_crossbrowser.py::test_works_everywhere[firefox] PASSED
========= 2 passed in 5.67s =========`,
          },
        ],
        quiz: [
          {
            question: 'What does the "page" fixture in pytest-playwright provide?',
            options: [
              'A raw HTML string of the current page',
              'A fresh Playwright Page object with its own context',
              'A dictionary of page metadata',
              'A URL string to navigate to',
            ],
            correctIndex: 1,
            explanation: 'The page fixture provides a fully initialized Playwright Page object with its own browser context, ready for navigation and interaction.',
          },
          {
            question: 'How do you run tests on Firefox using pytest-playwright?',
            options: [
              'pytest --engine firefox',
              'pytest --browser firefox',
              'pytest --driver firefox',
              'pytest --use-firefox',
            ],
            correctIndex: 1,
            explanation: 'The --browser flag tells pytest-playwright which browser to use. Pass "firefox" to run tests on Firefox.',
          },
          {
            question: 'Where do you customize browser context settings like viewport and locale?',
            options: [
              'In a playwright.config.py file',
              'In the test function parameters',
              'By overriding browser_context_args in conftest.py',
              'In environment variables',
            ],
            correctIndex: 2,
            explanation: 'Override the browser_context_args fixture in conftest.py to set default context options like viewport, locale, and timezone for all tests.',
          },
        ],
        challenge: {
          prompt: 'Create a conftest.py that sets the browser to launch in headless mode with slow_mo of 200ms, configures the default viewport to 1920x1080, and sets the locale to "en-GB". Then write a test that verifies the viewport width is 1920.',
          starterCode: `# conftest.py
import pytest

@pytest.fixture(scope="session")
def browser_type_launch_args(browser_type_launch_args):
    # TODO: Add headless and slow_mo settings
    pass

@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    # TODO: Set viewport and locale
    pass

# test_config.py
def test_viewport_width(page):
    # TODO: Assert viewport width is 1920
    pass`,
          solutionCode: `# conftest.py
import pytest

@pytest.fixture(scope="session")
def browser_type_launch_args(browser_type_launch_args):
    return {
        **browser_type_launch_args,
        "headless": True,
        "slow_mo": 200,
    }

@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    return {
        **browser_context_args,
        "viewport": {"width": 1920, "height": 1080},
        "locale": "en-GB",
    }

# test_config.py
def test_viewport_width(page):
    page.goto("https://example.com")
    assert page.viewport_size["width"] == 1920`,
          hints: [
            'Spread the existing args with **browser_type_launch_args to preserve defaults.',
            'Use "viewport": {"width": 1920, "height": 1080} in the context args.',
            'Access page.viewport_size to get a dict with width and height.',
          ],
        },
      },

      /* -------------------------------------------------------------- */
      /*  Test Organization                                             */
      /* -------------------------------------------------------------- */
      {
        id: 'pw-test-organization',
        title: 'Test Organization',
        difficulty: 'intermediate',
        tags: ['pytest', 'markers', 'parametrize', 'organization'],
        sections: [
          {
            heading: 'Test File Structure',
            content:
              'Organizing Playwright tests follows standard pytest conventions. Group related tests in files named test_*.py. Use directories to separate test categories. A well-organized test suite is easier to maintain, run selectively, and debug when failures occur.',
            code: `# Recommended directory structure:
# tests/
#   conftest.py            # shared fixtures
#   test_auth.py           # authentication tests
#   test_navigation.py     # navigation tests
#   test_forms.py          # form submission tests
#   pages/                 # page objects (optional)
#     login_page.py
#     dashboard_page.py

# test_auth.py
class TestLogin:
    def test_valid_login(self, page):
        page.goto("https://example.com/login")
        page.fill("#username", "admin")
        page.fill("#password", "password123")
        page.click("button[type=submit]")
        assert page.url == "https://example.com/dashboard"

    def test_invalid_login(self, page):
        page.goto("https://example.com/login")
        page.fill("#username", "admin")
        page.fill("#password", "wrong")
        page.click("button[type=submit]")
        assert page.locator(".error").is_visible()`,
            output: `$ pytest tests/ -v
tests/test_auth.py::TestLogin::test_valid_login PASSED
tests/test_auth.py::TestLogin::test_invalid_login PASSED`,
            tip: 'Group related tests into classes. This makes it easy to run a specific group: pytest tests/test_auth.py::TestLogin.',
          },
          {
            heading: 'Pytest Markers',
            content:
              'Markers let you tag tests with metadata so you can selectively run subsets. Mark tests as slow, smoke, regression, or any custom category. Use the -m flag to filter tests by marker when running pytest. Register custom markers in pytest.ini or pyproject.toml to avoid warnings.',
            code: `# pyproject.toml
# [tool.pytest.ini_options]
# markers = [
#     "smoke: quick sanity checks",
#     "regression: full regression suite",
#     "slow: tests that take a long time",
# ]

import pytest

@pytest.mark.smoke
def test_homepage_loads(page):
    page.goto("https://example.com")
    assert page.title() == "Example Domain"

@pytest.mark.regression
def test_all_links_work(page):
    page.goto("https://example.com")
    links = page.locator("a").all()
    for link in links:
        href = link.get_attribute("href")
        assert href is not None

@pytest.mark.slow
def test_full_user_journey(page):
    page.goto("https://example.com")
    # ... many steps ...
    assert True`,
            output: `# Run only smoke tests:
$ pytest -m smoke -v
test_org.py::test_homepage_loads PASSED
========= 1 passed in 1.23s =========

# Run everything except slow tests:
$ pytest -m "not slow" -v`,
          },
          {
            heading: 'Parametrize',
            content:
              'The @pytest.mark.parametrize decorator runs the same test with different input values. This is perfect for testing the same behavior across multiple URLs, screen sizes, user roles, or input data without writing separate test functions.',
            code: `import pytest

@pytest.mark.parametrize("url,expected_title", [
    ("https://example.com", "Example Domain"),
    ("https://www.iana.org/", "Internet Assigned Numbers Authority"),
])
def test_page_titles(page, url, expected_title):
    page.goto(url)
    assert page.title() == expected_title

@pytest.mark.parametrize("viewport_width", [320, 768, 1024, 1920])
def test_responsive_layout(browser, viewport_width):
    context = browser.new_context(
        viewport={"width": viewport_width, "height": 720}
    )
    page = context.new_page()
    page.goto("https://example.com")
    assert page.locator("h1").is_visible()
    context.close()`,
            output: `$ pytest test_param.py -v
test_param.py::test_page_titles[https://example.com-Example Domain] PASSED
test_param.py::test_page_titles[https://www.iana.org/-Internet...] PASSED
test_param.py::test_responsive_layout[320] PASSED
test_param.py::test_responsive_layout[768] PASSED
test_param.py::test_responsive_layout[1024] PASSED
test_param.py::test_responsive_layout[1920] PASSED`,
            analogy: 'Parametrize is like a mail-merge — you write the template once and it generates a personalized copy for each set of inputs.',
          },
          {
            heading: 'Skip and Xfail',
            content:
              'Use @pytest.mark.skip to unconditionally skip a test and @pytest.mark.skipif to skip conditionally (e.g., only on certain platforms). Use @pytest.mark.xfail to mark a test as expected to fail — useful for known bugs or features not yet implemented.',
            code: `import pytest
import sys

@pytest.mark.skip(reason="Feature not implemented yet")
def test_dark_mode(page):
    page.goto("https://example.com")
    # ... dark mode assertions ...

@pytest.mark.skipif(
    sys.platform == "win32",
    reason="WebKit not supported on Windows"
)
def test_webkit_specific(page):
    page.goto("https://example.com")
    assert page.title() == "Example Domain"

@pytest.mark.xfail(reason="Known bug #1234 — header misaligned")
def test_header_alignment(page):
    page.goto("https://example.com")
    header = page.locator("header")
    box = header.bounding_box()
    assert box["x"] == 0  # This is expected to fail`,
            output: `$ pytest test_skip.py -v
test_skip.py::test_dark_mode SKIPPED (Feature not implemented yet)
test_skip.py::test_webkit_specific PASSED
test_skip.py::test_header_alignment XFAIL (Known bug #1234)
========= 1 passed, 1 skipped, 1 xfailed in 2.10s =========`,
            tip: 'Use xfail instead of skip for known bugs. If the bug gets fixed, pytest will report it as XPASS (unexpectedly passing), alerting you to remove the marker.',
          },
        ],
        quiz: [
          {
            question: 'How do you run only tests marked as "smoke" with pytest?',
            options: [
              'pytest --only smoke',
              'pytest -m smoke',
              'pytest --marker smoke',
              'pytest -k smoke',
            ],
            correctIndex: 1,
            explanation: 'The -m flag filters tests by marker expression. "pytest -m smoke" runs only tests decorated with @pytest.mark.smoke.',
          },
          {
            question: 'What does @pytest.mark.xfail indicate?',
            options: [
              'The test should be skipped entirely',
              'The test is expected to fail due to a known issue',
              'The test should fail fast on error',
              'The test should be excluded from reports',
            ],
            correctIndex: 1,
            explanation: 'xfail marks a test as expected to fail. It runs the test but does not count the failure as an error. If it unexpectedly passes, pytest reports it as XPASS.',
          },
          {
            question: 'What does @pytest.mark.parametrize do?',
            options: [
              'Runs the test in parallel across multiple CPUs',
              'Runs the same test multiple times with different input values',
              'Parametrizes the browser type for cross-browser testing',
              'Sets configuration parameters for the test',
            ],
            correctIndex: 1,
            explanation: 'parametrize runs the same test function multiple times, once for each set of parameter values you provide, creating separate test cases.',
          },
        ],
        challenge: {
          prompt: 'Write a test file with: 1) A parametrized test that checks page titles for at least 2 different URLs. 2) A test marked as "smoke" that verifies a heading is visible. 3) A test marked as skip with a reason. Use the page fixture from pytest-playwright.',
          starterCode: `import pytest

# TODO: Parametrized test for page titles

# TODO: Smoke test for heading visibility

# TODO: Skipped test with reason`,
          solutionCode: `import pytest

@pytest.mark.parametrize("url,expected_title", [
    ("https://example.com", "Example Domain"),
    ("https://www.iana.org/", "Internet Assigned Numbers Authority"),
])
def test_page_titles(page, url, expected_title):
    page.goto(url)
    assert page.title() == expected_title

@pytest.mark.smoke
def test_heading_visible(page):
    page.goto("https://example.com")
    assert page.locator("h1").is_visible()

@pytest.mark.skip(reason="Waiting for dark mode feature implementation")
def test_dark_mode_toggle(page):
    page.goto("https://example.com")
    page.click("#dark-mode-toggle")
    assert page.locator("body.dark").is_visible()`,
          hints: [
            'Use @pytest.mark.parametrize with a list of tuples for test data.',
            'Decorate with @pytest.mark.smoke for the smoke test.',
            'Use @pytest.mark.skip(reason="...") to skip with a message.',
          ],
        },
      },

      /* -------------------------------------------------------------- */
      /*  Parallel Execution                                            */
      /* -------------------------------------------------------------- */
      {
        id: 'pw-parallel-execution',
        title: 'Parallel Execution',
        difficulty: 'advanced',
        tags: ['parallel', 'xdist', 'performance', 'isolation'],
        sections: [
          {
            heading: 'pytest-xdist for Parallel Tests',
            content:
              'Running tests sequentially can be painfully slow for large suites. The pytest-xdist plugin distributes tests across multiple worker processes, dramatically reducing total execution time. Each worker gets its own browser instance, ensuring complete isolation. Install it with pip and use the -n flag to specify the number of workers.',
            code: `# Install pytest-xdist
# pip install pytest-xdist

# Run tests with 4 parallel workers
# pytest tests/ -n 4

# Auto-detect CPU count and use that many workers
# pytest tests/ -n auto

# test_parallel.py
def test_page_one(page):
    page.goto("https://example.com")
    assert page.title() == "Example Domain"

def test_page_two(page):
    page.goto("https://example.com")
    assert page.locator("h1").text_content() == "Example Domain"

def test_page_three(page):
    page.goto("https://example.com")
    links = page.locator("a").count()
    assert links > 0`,
            output: `$ pytest tests/ -n 4 -v
[gw0] PASSED test_parallel.py::test_page_one
[gw1] PASSED test_parallel.py::test_page_two
[gw2] PASSED test_parallel.py::test_page_three
========= 3 passed in 1.87s =========
# Compare: sequential run took 4.52s`,
            tip: 'Start with -n auto which uses all available CPU cores. If you encounter resource issues, reduce the number to -n 2 or -n 4.',
            analogy: 'Parallel testing is like opening multiple checkout lanes at a grocery store — the total throughput increases even though each lane works at the same speed.',
          },
          {
            heading: 'Browser Context Isolation',
            content:
              'When running tests in parallel, isolation is critical. Each test must not affect any other test. Playwright browser contexts provide perfect isolation — each context has its own cookies, localStorage, and session state. The pytest-playwright plugin creates a fresh context for each test by default, making parallel execution safe.',
            code: `# Each test gets its own isolated context automatically
# test_isolation.py

def test_login_user_a(page):
    """This test's cookies do NOT leak to other tests."""
    page.goto("https://example.com")
    # Simulate setting a cookie
    page.context.add_cookies([{
        "name": "user",
        "value": "alice",
        "url": "https://example.com"
    }])
    cookies = page.context.cookies()
    assert any(c["name"] == "user" for c in cookies)

def test_login_user_b(page):
    """This test has a completely fresh context."""
    page.goto("https://example.com")
    cookies = page.context.cookies()
    # No cookies from test_login_user_a leak here
    assert not any(c["name"] == "user" for c in cookies)

def test_clean_storage(page):
    """localStorage is also isolated per context."""
    page.goto("https://example.com")
    page.evaluate("localStorage.setItem('key', 'value')")
    value = page.evaluate("localStorage.getItem('key')")
    assert value == "value"
    # Other tests won't see this localStorage entry`,
            output: `$ pytest test_isolation.py -n 3 -v
[gw0] PASSED test_isolation.py::test_login_user_a
[gw1] PASSED test_isolation.py::test_login_user_b
[gw2] PASSED test_isolation.py::test_clean_storage`,
          },
          {
            heading: 'Sharing Browser Across Workers',
            content:
              'By default, each xdist worker launches its own browser process. For large worker counts, this can consume significant memory. You can share a single browser across workers by using a session-scoped fixture and creating separate contexts per test. This approach balances isolation with resource efficiency.',
            code: `# conftest.py — optimized for parallel execution
import pytest
from playwright.sync_api import sync_playwright

@pytest.fixture(scope="session")
def browser_instance():
    """One browser per worker process."""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        yield browser
        browser.close()

@pytest.fixture
def isolated_page(browser_instance):
    """Fresh context + page per test for isolation."""
    context = browser_instance.new_context()
    page = context.new_page()
    yield page
    context.close()

# test_shared_browser.py
def test_one(isolated_page):
    isolated_page.goto("https://example.com")
    assert isolated_page.title() == "Example Domain"

def test_two(isolated_page):
    isolated_page.goto("https://example.com")
    assert isolated_page.locator("h1").is_visible()`,
            output: `$ pytest test_shared_browser.py -n 2 -v
[gw0] PASSED test_shared_browser.py::test_one
[gw1] PASSED test_shared_browser.py::test_two
========= 2 passed in 2.03s =========`,
            tip: 'With xdist, each worker (gw0, gw1, ...) is a separate process. Session-scoped fixtures are shared within a single worker, not across workers.',
          },
        ],
        quiz: [
          {
            question: 'Which pytest plugin enables parallel test execution?',
            options: ['pytest-parallel', 'pytest-xdist', 'pytest-concurrent', 'pytest-multiproc'],
            correctIndex: 1,
            explanation: 'pytest-xdist is the standard plugin for distributing tests across multiple worker processes. Use -n to specify the number of workers.',
          },
          {
            question: 'What does "pytest -n auto" do?',
            options: [
              'Automatically names test cases',
              'Runs tests with one worker per available CPU core',
              'Automatically retries failed tests',
              'Enables automatic browser detection',
            ],
            correctIndex: 1,
            explanation: '"auto" tells pytest-xdist to detect the number of CPU cores and create that many parallel workers.',
          },
          {
            question: 'How does Playwright ensure test isolation in parallel runs?',
            options: [
              'By using separate browser executables',
              'By running each test in a separate Docker container',
              'By creating a fresh browser context per test',
              'By clearing the database after each test',
            ],
            correctIndex: 2,
            explanation: 'Each test gets its own browser context, which provides isolated cookies, localStorage, and session state. This ensures tests do not interfere with each other.',
          },
        ],
        challenge: {
          prompt: 'Write a conftest.py with a session-scoped browser fixture and a function-scoped isolated_page fixture that creates a new context per test. Then write two test functions that each set a different cookie and verify they do not interfere with each other.',
          starterCode: `# conftest.py
import pytest
from playwright.sync_api import sync_playwright

# TODO: Session-scoped browser fixture

# TODO: Function-scoped isolated_page fixture

# test_parallel_isolation.py
def test_cookie_a(isolated_page):
    # TODO: Set cookie "user"="alice" and verify
    pass

def test_cookie_b(isolated_page):
    # TODO: Verify no "user" cookie exists (isolation)
    pass`,
          solutionCode: `# conftest.py
import pytest
from playwright.sync_api import sync_playwright

@pytest.fixture(scope="session")
def browser_instance():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        yield browser
        browser.close()

@pytest.fixture
def isolated_page(browser_instance):
    context = browser_instance.new_context()
    page = context.new_page()
    yield page
    context.close()

# test_parallel_isolation.py
def test_cookie_a(isolated_page):
    isolated_page.goto("https://example.com")
    isolated_page.context.add_cookies([{
        "name": "user",
        "value": "alice",
        "url": "https://example.com"
    }])
    cookies = isolated_page.context.cookies()
    assert any(c["value"] == "alice" for c in cookies)

def test_cookie_b(isolated_page):
    isolated_page.goto("https://example.com")
    cookies = isolated_page.context.cookies()
    assert not any(c["name"] == "user" for c in cookies)`,
          hints: [
            'Use scope="session" for the browser fixture to share it within a worker.',
            'Create a new context in the isolated_page fixture and close it after yield.',
            'Use context.add_cookies() to set cookies and context.cookies() to read them.',
          ],
        },
      },

      /* -------------------------------------------------------------- */
      /*  Test Reporting                                                */
      /* -------------------------------------------------------------- */
      {
        id: 'pw-test-reporting',
        title: 'Test Reporting',
        difficulty: 'intermediate',
        tags: ['reporting', 'html', 'allure', 'screenshots-on-failure'],
        sections: [
          {
            heading: 'pytest-html Reports',
            content:
              'The pytest-html plugin generates a self-contained HTML report with test results, durations, and optional extras like screenshots and logs. It is the simplest way to produce a shareable test report from your Playwright test suite.',
            code: `# Install: pip install pytest-html

# Run tests and generate HTML report
# pytest tests/ --html=report.html --self-contained-html

# conftest.py — attach screenshot on failure
import pytest

@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()

    if report.when == "call" and report.failed:
        page = item.funcargs.get("page")
        if page:
            screenshot = page.screenshot()
            import base64
            encoded = base64.b64encode(screenshot).decode()

            # Attach to pytest-html report
            extra = getattr(report, "extra", [])
            from pytest_html import extras
            extra.append(extras.image(encoded, mime_type="image/png"))
            report.extra = extra`,
            output: `$ pytest tests/ --html=report.html --self-contained-html
========= 5 passed, 1 failed in 8.32s =========
# report.html generated with embedded screenshots for failures`,
            tip: 'Use --self-contained-html to embed all CSS and images in a single file, making it easy to share via email or Slack.',
          },
          {
            heading: 'Allure Reporting',
            content:
              'Allure is a more sophisticated reporting framework that produces interactive, visually rich reports with categorization, history trends, and attachment support. It works well for larger teams and CI/CD pipelines where you need detailed insight into test health over time.',
            code: `# Install: pip install allure-pytest
# Also install Allure CLI: brew install allure (macOS)

# Run tests with Allure data collection
# pytest tests/ --alluredir=allure-results

# Generate and open the report
# allure serve allure-results

# test_with_allure.py
import allure

@allure.feature("Authentication")
@allure.story("Login")
@allure.severity(allure.severity_level.CRITICAL)
def test_login_flow(page):
    with allure.step("Navigate to login page"):
        page.goto("https://example.com/login")

    with allure.step("Enter credentials"):
        page.fill("#username", "admin")
        page.fill("#password", "password")

    with allure.step("Submit form"):
        page.click("button[type=submit]")

    with allure.step("Verify dashboard"):
        assert "dashboard" in page.url`,
            output: `$ pytest tests/ --alluredir=allure-results
========= 3 passed in 4.12s =========
$ allure serve allure-results
# Opens interactive HTML report in browser`,
            analogy: 'If pytest-html is a snapshot photo of your test results, Allure is a full documentary — with chapters, timelines, and behind-the-scenes footage.',
          },
          {
            heading: 'Screenshots on Failure',
            content:
              'Automatically capturing a screenshot when a test fails is one of the most valuable debugging practices. The screenshot shows exactly what the page looked like at the moment of failure, often making the root cause immediately obvious. You can implement this with a pytest fixture or hook.',
            code: `# conftest.py — automatic screenshots on failure
import pytest
import os

@pytest.fixture(autouse=True)
def screenshot_on_failure(request, page):
    """Automatically capture screenshot when a test fails."""
    yield  # Run the test

    # Check if the test failed
    if request.node.rep_call and request.node.rep_call.failed:
        test_name = request.node.name
        screenshot_dir = "screenshots/failures"
        os.makedirs(screenshot_dir, exist_ok=True)

        screenshot_path = os.path.join(
            screenshot_dir, f"{test_name}.png"
        )
        page.screenshot(path=screenshot_path)
        print(f"Failure screenshot: {screenshot_path}")

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """Make test result available to fixtures."""
    outcome = yield
    rep = outcome.get_result()
    setattr(item, f"rep_{rep.when}", rep)`,
            output: `$ pytest tests/ -v
tests/test_ui.py::test_button_click FAILED
Failure screenshot: screenshots/failures/test_button_click.png
========= 1 failed in 2.34s =========`,
            tip: 'Combine screenshots with tracing for a complete debugging package: the screenshot shows the final state, and the trace shows how you got there.',
          },
          {
            heading: 'Video on Failure',
            content:
              'For complex failures, a video of the entire test execution is even more valuable than a single screenshot. You can configure your test suite to record video for every test but only keep the recordings for failed tests, deleting the rest to save disk space.',
            code: `# conftest.py — video recording with cleanup
import pytest
import os
from playwright.sync_api import sync_playwright

@pytest.fixture
def video_page(request):
    """Record video, keep only on failure."""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(
            record_video_dir="videos/tmp/"
        )
        page = context.new_page()

        yield page

        video_path = page.video.path()

        # Save with test name if failed
        if hasattr(request.node, "rep_call") and \\
                request.node.rep_call.failed:
            test_name = request.node.name
            os.makedirs("videos/failures", exist_ok=True)
            page.video.save_as(
                f"videos/failures/{test_name}.webm"
            )
            print(f"Failure video: videos/failures/{test_name}.webm")

        context.close()
        browser.close()

        # Clean up temp video
        if os.path.exists(video_path):
            os.remove(video_path)

# test_with_video.py
def test_navigation(video_page):
    video_page.goto("https://example.com")
    video_page.click("text=More information")
    assert "iana" in video_page.url`,
            output: `$ pytest test_with_video.py -v
test_with_video.py::test_navigation FAILED
Failure video: videos/failures/test_navigation.webm
========= 1 failed in 3.56s =========`,
          },
        ],
        quiz: [
          {
            question: 'Which flag generates a self-contained HTML report with pytest-html?',
            options: [
              '--html=report.html --embed-assets',
              '--html=report.html --self-contained-html',
              '--report=html --inline',
              '--html-report --standalone',
            ],
            correctIndex: 1,
            explanation: 'Use --html=report.html --self-contained-html to generate a single HTML file with all CSS, JS, and images embedded.',
          },
          {
            question: 'What is the advantage of Allure reports over pytest-html?',
            options: [
              'Allure is faster to generate',
              'Allure provides interactive reports with history trends and categorization',
              'Allure does not require any installation',
              'Allure works without pytest',
            ],
            correctIndex: 1,
            explanation: 'Allure produces interactive, visually rich reports with features like test history, trend graphs, categorization by feature/story, and detailed step breakdowns.',
          },
          {
            question: 'How do you make the test result available to fixtures for screenshot-on-failure?',
            options: [
              'Use the @pytest.mark.failure_hook decorator',
              'Import the result from pytest directly',
              'Use pytest_runtest_makereport hook to attach result to the item',
              'Check sys.last_traceback in the fixture',
            ],
            correctIndex: 2,
            explanation: 'The pytest_runtest_makereport hook captures the test result and attaches it to the test item, making it accessible in fixtures via request.node.',
          },
        ],
        challenge: {
          prompt: 'Write a conftest.py with an autouse fixture that captures a screenshot to "failures/{test_name}.png" whenever a test fails. Include the necessary pytest_runtest_makereport hook. Then write a test that intentionally fails so the screenshot is captured.',
          starterCode: `# conftest.py
import pytest
import os

# TODO: pytest_runtest_makereport hook

# TODO: autouse fixture for screenshot on failure

# test_failing.py
def test_intentional_failure(page):
    # TODO: Navigate and make a failing assertion
    pass`,
          solutionCode: `# conftest.py
import pytest
import os

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    rep = outcome.get_result()
    setattr(item, f"rep_{rep.when}", rep)

@pytest.fixture(autouse=True)
def screenshot_on_failure(request, page):
    yield
    if hasattr(request.node, "rep_call") and request.node.rep_call.failed:
        os.makedirs("failures", exist_ok=True)
        test_name = request.node.name
        page.screenshot(path=f"failures/{test_name}.png")

# test_failing.py
def test_intentional_failure(page):
    page.goto("https://example.com")
    assert page.title() == "This Will Not Match"`,
          hints: [
            'Use @pytest.hookimpl(tryfirst=True, hookwrapper=True) for the hook.',
            'Use setattr(item, f"rep_{rep.when}", rep) to store the result.',
            'Check request.node.rep_call.failed in the fixture after yield.',
          ],
        },
      },
    ],
  },

  /* ================================================================== */
  /*  Category 9 — Advanced Playwright                                  */
  /* ================================================================== */
  {
    id: 'pw-advanced',
    label: 'Advanced Playwright',
    icon: 'Settings',
    entries: [
      /* -------------------------------------------------------------- */
      /*  Authentication Handling                                       */
      /* -------------------------------------------------------------- */
      {
        id: 'pw-authentication',
        title: 'Authentication Handling',
        difficulty: 'intermediate',
        tags: ['auth', 'storage-state', 'login', 'session'],
        sections: [
          {
            heading: 'The Problem with Repeated Login',
            content:
              'Most web applications require authentication. If every test starts by navigating to the login page, filling in credentials, and clicking submit, you waste significant time and create fragile tests that break whenever the login UI changes. Playwright solves this with storage state — the ability to save and restore a complete authentication state including cookies and localStorage.',
            code: `# The SLOW way — login in every test
from playwright.sync_api import sync_playwright

def login(page):
    """This runs for EVERY test — slow and fragile."""
    page.goto("https://myapp.com/login")
    page.fill("#email", "user@example.com")
    page.fill("#password", "secretpass")
    page.click("button[type=submit]")
    page.wait_for_url("**/dashboard")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    login(page)  # 2-3 seconds every time
    # ... actual test ...
    browser.close()`,
            output: `# Each test spends 2-3 seconds just logging in
# With 100 tests, that is 200-300 seconds wasted!`,
            analogy: 'Logging in for every test is like showing your ID at every door in an office building. Storage state is like getting a badge at the front desk that opens all doors for the rest of the day.',
          },
          {
            heading: 'Saving Storage State',
            content:
              'After logging in once, you can save the entire authentication state — cookies, localStorage, sessionStorage — to a JSON file. This file can then be loaded into new browser contexts, instantly putting them in an authenticated state without actually performing the login flow.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    # Perform login ONCE
    page.goto("https://myapp.com/login")
    page.fill("#email", "user@example.com")
    page.fill("#password", "secretpass")
    page.click("button[type=submit]")
    page.wait_for_url("**/dashboard")

    # Save the authenticated state
    context.storage_state(path="auth_state.json")
    print("Authentication state saved!")

    context.close()
    browser.close()`,
            output: `Authentication state saved!
# auth_state.json now contains cookies and localStorage`,
            tip: 'The auth_state.json file contains sensitive session data. Add it to .gitignore and regenerate it in CI/CD pipelines.',
          },
          {
            heading: 'Reusing Storage State',
            content:
              'Now that you have the authentication state saved, every subsequent test can create a new context that is already logged in. This is dramatically faster because no network requests or UI interactions are needed for authentication. The context starts with all cookies and storage pre-populated.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    # Create a context with saved auth state — already logged in!
    context = browser.new_context(
        storage_state="auth_state.json"
    )
    page = context.new_page()

    # Go directly to protected page — no login needed
    page.goto("https://myapp.com/dashboard")
    assert "Dashboard" in page.title()
    print("Accessed dashboard without logging in!")

    context.close()
    browser.close()`,
            output: `Accessed dashboard without logging in!`,
          },
          {
            heading: 'Global Setup with pytest',
            content:
              'In a test suite, the best practice is to perform login once in a session-scoped fixture (global setup) and reuse the storage state across all tests. This pattern combines the speed of pre-authenticated contexts with the isolation of separate contexts per test.',
            code: `# conftest.py
import pytest
from playwright.sync_api import sync_playwright

@pytest.fixture(scope="session")
def auth_state(tmp_path_factory):
    """Login once, save state for all tests."""
    state_path = str(
        tmp_path_factory.mktemp("auth") / "state.json"
    )

    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        page = context.new_page()

        page.goto("https://myapp.com/login")
        page.fill("#email", "admin@example.com")
        page.fill("#password", "adminpass")
        page.click("button[type=submit]")
        page.wait_for_url("**/dashboard")

        context.storage_state(path=state_path)
        context.close()
        browser.close()

    return state_path

@pytest.fixture
def authed_page(browser, auth_state):
    """Each test gets a fresh context with auth."""
    context = browser.new_context(storage_state=auth_state)
    page = context.new_page()
    yield page
    context.close()

# test_dashboard.py
def test_dashboard_loads(authed_page):
    authed_page.goto("https://myapp.com/dashboard")
    assert authed_page.locator("h1").text_content() == "Dashboard"

def test_settings_page(authed_page):
    authed_page.goto("https://myapp.com/settings")
    assert authed_page.locator("h1").text_content() == "Settings"`,
            output: `$ pytest tests/ -v
tests/test_dashboard.py::test_dashboard_loads PASSED
tests/test_dashboard.py::test_settings_page PASSED
========= 2 passed in 2.11s =========
# Login happened only ONCE for the entire session`,
          },
        ],
        quiz: [
          {
            question: 'What does storage_state save?',
            options: [
              'Only cookies',
              'Only localStorage',
              'Cookies and localStorage',
              'The entire page HTML',
            ],
            correctIndex: 2,
            explanation: 'storage_state saves both cookies and localStorage to a JSON file, capturing the complete authentication state of the browser context.',
          },
          {
            question: 'How do you create a pre-authenticated browser context?',
            options: [
              'browser.new_context(login="auth_state.json")',
              'browser.new_context(storage_state="auth_state.json")',
              'browser.new_context(cookies="auth_state.json")',
              'browser.authenticate("auth_state.json")',
            ],
            correctIndex: 1,
            explanation: 'Pass storage_state="path/to/state.json" to browser.new_context() to create a context that is already authenticated.',
          },
          {
            question: 'Why use a session-scoped fixture for authentication?',
            options: [
              'Session scope is required by Playwright',
              'To login once and reuse the state across all tests in the session',
              'To keep the browser open between tests',
              'To avoid creating auth_state.json',
            ],
            correctIndex: 1,
            explanation: 'A session-scoped fixture runs once for the entire test session. This means login happens exactly once, and the saved state is reused by all tests, saving significant time.',
          },
        ],
        challenge: {
          prompt: 'Write a session-scoped pytest fixture that logs into "https://example.com/login" with email "test@test.com" and password "pass123", saves the storage state, and returns the path. Then write a fixture that creates authenticated pages using that state.',
          starterCode: `import pytest
from playwright.sync_api import sync_playwright

@pytest.fixture(scope="session")
def auth_state_path(tmp_path_factory):
    # TODO: Login and save storage state
    pass

@pytest.fixture
def logged_in_page(browser, auth_state_path):
    # TODO: Create authenticated context and page
    pass`,
          solutionCode: `import pytest
from playwright.sync_api import sync_playwright

@pytest.fixture(scope="session")
def auth_state_path(tmp_path_factory):
    state_path = str(tmp_path_factory.mktemp("auth") / "state.json")
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        page = context.new_page()
        page.goto("https://example.com/login")
        page.fill("#email", "test@test.com")
        page.fill("#password", "pass123")
        page.click("button[type=submit]")
        page.wait_for_url("**/dashboard")
        context.storage_state(path=state_path)
        context.close()
        browser.close()
    return state_path

@pytest.fixture
def logged_in_page(browser, auth_state_path):
    context = browser.new_context(storage_state=auth_state_path)
    page = context.new_page()
    yield page
    context.close()`,
          hints: [
            'Use tmp_path_factory.mktemp() to create a temporary directory for the state file.',
            'Call context.storage_state(path=...) after successful login.',
            'In the page fixture, pass storage_state to browser.new_context().',
          ],
        },
      },

      /* -------------------------------------------------------------- */
      /*  JavaScript Evaluation                                         */
      /* -------------------------------------------------------------- */
      {
        id: 'pw-javascript-evaluation',
        title: 'JavaScript Evaluation',
        difficulty: 'intermediate',
        tags: ['evaluate', 'javascript', 'dom', 'browser-context'],
        sections: [
          {
            heading: 'Basic Evaluation with evaluate()',
            content:
              'The page.evaluate() method runs JavaScript code inside the browser page and returns the result to your Python script. This is the bridge between your test code (Python) and the browser environment (JavaScript). You can access any browser API — the DOM, window, localStorage, computed styles, and more.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Get the page title via JavaScript
    title = page.evaluate("document.title")
    print(f"Title: {title}")

    # Get the current URL
    url = page.evaluate("window.location.href")
    print(f"URL: {url}")

    # Calculate something in the browser
    result = page.evaluate("2 + 2")
    print(f"2 + 2 = {result}")

    # Access computed styles
    bg_color = page.evaluate("""
        window.getComputedStyle(document.body)
            .getPropertyValue('background-color')
    """)
    print(f"Background: {bg_color}")

    browser.close()`,
            output: `Title: Example Domain
URL: https://example.com/
2 + 2 = 4
Background: rgba(0, 0, 0, 0)`,
            tip: 'evaluate() automatically serializes JavaScript return values to Python equivalents: JS objects become dicts, arrays become lists, numbers become ints/floats.',
            analogy: 'evaluate() is like sending a messenger into the browser world with a question — they go in, ask JavaScript, and bring the answer back to Python.',
          },
          {
            heading: 'Passing Arguments to evaluate()',
            content:
              'You can pass Python values as arguments to the JavaScript expression. This is safer than string interpolation because Playwright handles serialization properly, avoiding injection issues and type conversion problems.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Pass a single argument
    result = page.evaluate("x => x * 2", 21)
    print(f"21 * 2 = {result}")

    # Pass multiple arguments via an object
    result = page.evaluate(
        "({a, b}) => a + b",
        {"a": 10, "b": 32}
    )
    print(f"10 + 32 = {result}")

    # Use arguments to query the DOM
    tag_name = "h1"
    text = page.evaluate(
        "tag => document.querySelector(tag).textContent",
        tag_name
    )
    print(f"<{tag_name}> text: {text}")

    # Set localStorage with Python values
    page.evaluate(
        "([key, value]) => localStorage.setItem(key, value)",
        ["my_key", "my_value"]
    )
    stored = page.evaluate(
        "key => localStorage.getItem(key)",
        "my_key"
    )
    print(f"Stored: {stored}")

    browser.close()`,
            output: `21 * 2 = 42
10 + 32 = 42
<h1> text: Example Domain
Stored: my_value`,
          },
          {
            heading: 'evaluate_handle() for DOM References',
            content:
              'While evaluate() returns serialized values (strings, numbers, dicts), evaluate_handle() returns a JSHandle — a reference to a live JavaScript object in the browser. This is useful when you need to work with DOM elements, functions, or complex objects that cannot be serialized.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Get a handle to a DOM element
    heading_handle = page.evaluate_handle(
        "document.querySelector('h1')"
    )
    print(f"Handle type: {heading_handle}")

    # Use the handle in subsequent evaluations
    text = page.evaluate("el => el.textContent", heading_handle)
    print(f"Heading text: {text}")

    tag = page.evaluate("el => el.tagName", heading_handle)
    print(f"Tag name: {tag}")

    # Get a handle to the window object
    window = page.evaluate_handle("window")
    inner_width = page.evaluate(
        "win => win.innerWidth", window
    )
    print(f"Window width: {inner_width}")

    # Clean up handles when done
    heading_handle.dispose()
    window.dispose()

    browser.close()`,
            output: `Handle type: JSHandle@node
Heading text: Example Domain
Tag name: H1
Window width: 1280`,
            tip: 'Always dispose of JSHandles when you are done with them to prevent memory leaks in the browser process.',
          },
        ],
        quiz: [
          {
            question: 'What does page.evaluate() return?',
            options: [
              'A JSHandle reference to a browser object',
              'The serialized Python equivalent of the JavaScript return value',
              'A Promise that must be awaited',
              'A string representation of the result',
            ],
            correctIndex: 1,
            explanation: 'evaluate() runs JavaScript in the browser and returns the serialized result as a Python value. JS objects become dicts, arrays become lists, etc.',
          },
          {
            question: 'How do you safely pass a Python variable to a JavaScript expression?',
            options: [
              'Use f-string interpolation: page.evaluate(f"document.title + \\"{var}\\\"")',
              'Pass it as the second argument: page.evaluate("x => x * 2", my_var)',
              'Set it as a global variable first',
              'Convert it to JSON string manually',
            ],
            correctIndex: 1,
            explanation: 'Pass Python values as the second argument to evaluate(). Playwright handles serialization safely, avoiding injection risks and type issues.',
          },
          {
            question: 'When should you use evaluate_handle() instead of evaluate()?',
            options: [
              'When the result is a simple string or number',
              'When you need a live reference to a browser object like a DOM element',
              'When the JavaScript function is async',
              'When running code in a Web Worker',
            ],
            correctIndex: 1,
            explanation: 'evaluate_handle() returns a JSHandle — a live reference to a JavaScript object. Use it when you need to pass the object to other evaluations or when the object cannot be serialized.',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to "https://example.com", uses evaluate() to get the number of <a> tags on the page, uses evaluate with an argument to find an element by tag name and get its text, and uses evaluate_handle() to get a reference to the <h1> element and then extract its text content.',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # TODO: Count <a> tags using evaluate

    # TODO: Get text of element by tag name (pass tag as argument)

    # TODO: Use evaluate_handle to get <h1>, then extract text

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    link_count = page.evaluate(
        "document.querySelectorAll('a').length"
    )
    print(f"Links: {link_count}")

    text = page.evaluate(
        "tag => document.querySelector(tag).textContent",
        "h1"
    )
    print(f"H1 text: {text}")

    handle = page.evaluate_handle("document.querySelector('h1')")
    handle_text = page.evaluate("el => el.textContent", handle)
    print(f"Handle text: {handle_text}")
    handle.dispose()

    browser.close()`,
          hints: [
            'Use document.querySelectorAll("a").length to count links.',
            'Pass the tag name as the second argument to evaluate().',
            'Use evaluate_handle() to get a JSHandle, then pass it to evaluate() to extract properties.',
          ],
        },
      },

      /* -------------------------------------------------------------- */
      /*  Emulation                                                     */
      /* -------------------------------------------------------------- */
      {
        id: 'pw-emulation',
        title: 'Emulation',
        difficulty: 'intermediate',
        tags: ['emulation', 'devices', 'geolocation', 'viewport'],
        sections: [
          {
            heading: 'Device Emulation',
            content:
              'Playwright includes a device registry with pre-configured settings for popular devices like iPhone, iPad, Pixel, and Galaxy. When you emulate a device, Playwright sets the viewport size, device scale factor, user agent string, and touch support to match that device. This is far more convenient than manually configuring each parameter.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    # Get device descriptor for iPhone 13
    iphone = p.devices["iPhone 13"]
    print(f"iPhone 13 config: {iphone}")

    browser = p.chromium.launch()

    # Create context with iPhone 13 emulation
    context = browser.new_context(**iphone)
    page = context.new_page()

    page.goto("https://example.com")
    print(f"Viewport: {page.viewport_size}")
    print(f"Title: {page.title()}")

    page.screenshot(path="iphone_view.png")

    context.close()
    browser.close()`,
            output: `iPhone 13 config: {'user_agent': 'Mozilla/5.0 (iPhone; ...', 'viewport': {'width': 390, 'height': 844}, ...}
Viewport: {'width': 390, 'height': 844}
Title: Example Domain`,
            analogy: 'Device emulation is like trying on different pairs of glasses — each device gives the browser a different perspective on the same page.',
          },
          {
            heading: 'Geolocation and Locale',
            content:
              'You can emulate a specific geographic location, language locale, and timezone. This is essential for testing location-based features, internationalization (i18n), and timezone-sensitive functionality without physically being in that location.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    # Emulate being in Tokyo, Japan
    context = browser.new_context(
        geolocation={"latitude": 35.6762, "longitude": 139.6503},
        permissions=["geolocation"],
        locale="ja-JP",
        timezone_id="Asia/Tokyo",
    )

    page = context.new_page()

    # Check the emulated locale
    locale = page.evaluate("navigator.language")
    print(f"Browser locale: {locale}")

    # Check the emulated timezone
    tz = page.evaluate(
        "Intl.DateTimeFormat().resolvedOptions().timeZone"
    )
    print(f"Timezone: {tz}")

    # Check geolocation
    geo = page.evaluate("""
        new Promise(resolve =>
            navigator.geolocation.getCurrentPosition(
                pos => resolve({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                })
            )
        )
    """)
    print(f"Geolocation: {geo}")

    context.close()
    browser.close()`,
            output: `Browser locale: ja-JP
Timezone: Asia/Tokyo
Geolocation: {'lat': 35.6762, 'lng': 139.6503}`,
            tip: 'Remember to include "geolocation" in the permissions list when setting geolocation, otherwise the browser will prompt for permission and the script will hang.',
          },
          {
            heading: 'Color Scheme and Viewport',
            content:
              'Playwright can emulate the user preference for light or dark color scheme, which triggers CSS media query @media (prefers-color-scheme: dark). You can also set custom viewport sizes to test responsive layouts at specific breakpoints.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    # Emulate dark mode
    dark_context = browser.new_context(
        color_scheme="dark",
        viewport={"width": 1920, "height": 1080}
    )
    dark_page = dark_context.new_page()
    dark_page.goto("https://example.com")

    scheme = dark_page.evaluate(
        "window.matchMedia('(prefers-color-scheme: dark)').matches"
    )
    print(f"Dark mode active: {scheme}")
    dark_page.screenshot(path="dark_mode.png")
    dark_context.close()

    # Emulate light mode on a mobile viewport
    light_context = browser.new_context(
        color_scheme="light",
        viewport={"width": 375, "height": 667}
    )
    light_page = light_context.new_page()
    light_page.goto("https://example.com")

    scheme = light_page.evaluate(
        "window.matchMedia('(prefers-color-scheme: light)').matches"
    )
    print(f"Light mode active: {scheme}")
    light_page.screenshot(path="light_mobile.png")
    light_context.close()

    browser.close()`,
            output: `Dark mode active: True
Light mode active: True`,
          },
        ],
        quiz: [
          {
            question: 'How do you access pre-configured device descriptors in Playwright?',
            options: [
              'playwright.get_device("iPhone 13")',
              'p.devices["iPhone 13"]',
              'Device.from_name("iPhone 13")',
              'browser.emulate("iPhone 13")',
            ],
            correctIndex: 1,
            explanation: 'Device descriptors are available on the Playwright instance via p.devices["Device Name"]. Spread the descriptor into browser.new_context().',
          },
          {
            question: 'What must you include in permissions when setting geolocation?',
            options: [
              '"location"',
              '"gps"',
              '"geolocation"',
              '"navigator.geolocation"',
            ],
            correctIndex: 2,
            explanation: 'You must include "geolocation" in the permissions list so the browser does not prompt for permission, which would block your script.',
          },
          {
            question: 'Which parameter emulates dark mode in Playwright?',
            options: [
              'theme="dark"',
              'color_scheme="dark"',
              'dark_mode=True',
              'prefers_color_scheme="dark"',
            ],
            correctIndex: 1,
            explanation: 'The color_scheme parameter on browser.new_context() accepts "dark", "light", or "no-preference" to emulate the user preference.',
          },
        ],
        challenge: {
          prompt: 'Write a script that creates two browser contexts: one emulating an iPhone 13 in dark mode located in Paris (lat: 48.8566, lng: 2.3522, locale: "fr-FR", timezone: "Europe/Paris"), and another with a desktop viewport of 1920x1080 in light mode. Take a screenshot from each context.',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    # TODO: iPhone 13 context with dark mode + Paris geolocation

    # TODO: Desktop context with light mode + 1920x1080

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    iphone = p.devices["iPhone 13"]
    mobile_ctx = browser.new_context(
        **iphone,
        color_scheme="dark",
        geolocation={"latitude": 48.8566, "longitude": 2.3522},
        permissions=["geolocation"],
        locale="fr-FR",
        timezone_id="Europe/Paris",
    )
    mobile_page = mobile_ctx.new_page()
    mobile_page.goto("https://example.com")
    mobile_page.screenshot(path="iphone_paris_dark.png")
    mobile_ctx.close()

    desktop_ctx = browser.new_context(
        color_scheme="light",
        viewport={"width": 1920, "height": 1080},
    )
    desktop_page = desktop_ctx.new_page()
    desktop_page.goto("https://example.com")
    desktop_page.screenshot(path="desktop_light.png")
    desktop_ctx.close()

    browser.close()`,
          hints: [
            'Spread the device descriptor with **iphone and add extra parameters.',
            'Include permissions=["geolocation"] when setting geolocation.',
            'Use color_scheme="dark" or "light" for color scheme emulation.',
          ],
        },
      },

      /* -------------------------------------------------------------- */
      /*  Browser Download Path                                         */
      /* -------------------------------------------------------------- */
      {
        id: 'pw-download-handling',
        title: 'Browser Download Path',
        difficulty: 'beginner',
        tags: ['downloads', 'files', 'save_as', 'wait'],
        sections: [
          {
            heading: 'Handling File Downloads',
            content:
              'When a page triggers a file download, Playwright intercepts it and provides a Download object. Unlike a real browser that saves files to a Downloads folder, Playwright captures the download in memory and lets you decide where (or whether) to save it. You use page.expect_download() as a context manager to wait for the download event.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/downloads")

    # Wait for the download to start
    with page.expect_download() as download_info:
        page.click("a#download-link")  # triggers download

    download = download_info.value

    # Inspect download metadata
    print(f"Suggested filename: {download.suggested_filename}")
    print(f"URL: {download.url}")

    browser.close()`,
            output: `Suggested filename: report.pdf
URL: https://example.com/files/report.pdf`,
            tip: 'expect_download() must wrap the action that triggers the download. If you click first and then try to wait, you may miss the event.',
            analogy: 'expect_download() is like setting up a catcher before the pitcher throws — you have to be ready to catch before the ball is in the air.',
          },
          {
            heading: 'Saving Downloads with save_as()',
            content:
              'Once you have the Download object, use save_as() to save the file to a specific path on disk. You can also read the download as a stream or get the temporary path where Playwright stored it. The download stays available until the browser context is closed.',
            code: `from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/downloads")

    with page.expect_download() as download_info:
        page.click("a#download-csv")

    download = download_info.value

    # Save to a specific path
    save_path = "downloaded_files/data.csv"
    os.makedirs("downloaded_files", exist_ok=True)
    download.save_as(save_path)
    print(f"File saved to: {save_path}")

    # Check that the file exists and has content
    file_size = os.path.getsize(save_path)
    print(f"File size: {file_size} bytes")

    # Alternative: get the temp path
    temp_path = download.path()
    print(f"Temp path: {temp_path}")

    browser.close()`,
            output: `File saved to: downloaded_files/data.csv
File size: 2048 bytes
Temp path: /tmp/playwright-downloads/abc123/data.csv`,
          },
          {
            heading: 'Download Events and Multiple Files',
            content:
              'For pages that trigger multiple downloads, you can listen for download events or use multiple expect_download() blocks. You can also set accept_downloads in the browser context to control whether downloads are accepted at all.',
            code: `from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch()

    # Accept downloads explicitly (this is the default)
    context = browser.new_context(accept_downloads=True)
    page = context.new_page()
    page.goto("https://example.com/downloads")

    # Handle multiple downloads
    downloads = []

    def handle_download(download):
        filename = download.suggested_filename
        save_path = f"downloads/{filename}"
        os.makedirs("downloads", exist_ok=True)
        download.save_as(save_path)
        downloads.append(save_path)
        print(f"Downloaded: {filename}")

    page.on("download", handle_download)

    # Click a button that triggers multiple downloads
    page.click("#download-all")
    page.wait_for_timeout(3000)  # wait for downloads

    print(f"Total downloads: {len(downloads)}")

    context.close()
    browser.close()`,
            output: `Downloaded: report.pdf
Downloaded: data.csv
Downloaded: summary.xlsx
Total downloads: 3`,
            tip: 'When handling multiple downloads with event listeners, add a wait after clicking to ensure all downloads have time to complete before closing the context.',
          },
        ],
        quiz: [
          {
            question: 'How do you wait for a download to start in Playwright?',
            options: [
              'page.wait_for_download()',
              'page.expect_download() as a context manager',
              'page.on_download(callback)',
              'download = page.download()',
            ],
            correctIndex: 1,
            explanation: 'Use "with page.expect_download() as download_info:" as a context manager that wraps the action triggering the download.',
          },
          {
            question: 'How do you save a downloaded file to a specific path?',
            options: [
              'download.write("path/file.pdf")',
              'download.save_as("path/file.pdf")',
              'download.export("path/file.pdf")',
              'download.to_file("path/file.pdf")',
            ],
            correctIndex: 1,
            explanation: 'The download.save_as() method saves the downloaded file to the specified path on disk.',
          },
          {
            question: 'What does download.suggested_filename return?',
            options: [
              'The URL of the download',
              'The MIME type of the file',
              'The filename suggested by the server or link',
              'The temporary file path',
            ],
            correctIndex: 2,
            explanation: 'suggested_filename returns the filename from the Content-Disposition header or the URL, representing the server-suggested name for the file.',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to a page, clicks a download link, waits for the download, prints the suggested filename, and saves the file to "output/{suggested_filename}". Create the output directory if it does not exist.',
          starterCode: `from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/downloads")

    # TODO: Wait for download after clicking "#download-btn"

    # TODO: Get suggested filename

    # TODO: Save to output/ directory

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com/downloads")

    with page.expect_download() as download_info:
        page.click("#download-btn")

    download = download_info.value
    filename = download.suggested_filename
    print(f"Downloading: {filename}")

    os.makedirs("output", exist_ok=True)
    download.save_as(f"output/{filename}")
    print(f"Saved to: output/{filename}")

    browser.close()`,
          hints: [
            'Wrap the click in a "with page.expect_download() as download_info:" block.',
            'Access download_info.value to get the Download object.',
            'Use os.makedirs("output", exist_ok=True) to create the directory safely.',
          ],
        },
      },

      /* -------------------------------------------------------------- */
      /*  Accessibility Testing                                         */
      /* -------------------------------------------------------------- */
      {
        id: 'pw-accessibility',
        title: 'Accessibility Testing',
        difficulty: 'intermediate',
        tags: ['accessibility', 'a11y', 'aria', 'screen-reader'],
        sections: [
          {
            heading: 'Accessibility Snapshots',
            content:
              'Playwright can capture an accessibility snapshot of the page — a tree representation of how assistive technologies like screen readers perceive the content. This tree shows ARIA roles, names, values, and states for every accessible element. It is invaluable for verifying that your page is properly structured for users who rely on assistive technology.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Get the full accessibility tree
    snapshot = page.accessibility.snapshot()
    print(f"Root role: {snapshot['role']}")
    print(f"Root name: {snapshot['name']}")
    print(f"Children: {len(snapshot.get('children', []))}")

    # Pretty-print the tree structure
    def print_tree(node, indent=0):
        role = node.get("role", "none")
        name = node.get("name", "")
        prefix = "  " * indent
        print(f"{prefix}{role}: {name}")
        for child in node.get("children", []):
            print_tree(child, indent + 1)

    print_tree(snapshot)

    browser.close()`,
            output: `Root role: WebArea
Root name: Example Domain
Children: 1
WebArea: Example Domain
  heading: Example Domain
  paragraph:
    text: This domain is for use in illustrative examples...
  link: More information...`,
            analogy: 'An accessibility snapshot is like reading the blueprint of a building to verify all exits are marked, all signs are in place, and all pathways are navigable — without actually walking through the building yourself.',
          },
          {
            heading: 'ARIA Role-Based Testing',
            content:
              'Playwright locators support ARIA roles natively through page.get_by_role(). This lets you find and interact with elements the same way a screen reader would — by their semantic role rather than CSS selectors. This approach makes tests more resilient and validates that ARIA roles are correctly assigned.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Find elements by their ARIA role
    heading = page.get_by_role("heading", name="Example Domain")
    assert heading.is_visible()
    print(f"Heading found: {heading.text_content()}")

    # Find all links
    links = page.get_by_role("link")
    link_count = links.count()
    print(f"Links on page: {link_count}")

    # Click a link by its accessible name
    page.get_by_role("link", name="More information").click()
    print(f"Navigated to: {page.url}")

    browser.close()`,
            output: `Heading found: Example Domain
Links on page: 1
Navigated to: https://www.iana.org/help/example-domains`,
            tip: 'Using get_by_role() in your tests serves double duty: it tests functionality AND validates that ARIA roles are correctly applied.',
          },
          {
            heading: 'Checking Accessible Names and Labels',
            content:
              'Every interactive element should have an accessible name — the text that a screen reader announces. Playwright makes it easy to verify that buttons, inputs, and links have proper accessible names by using get_by_role() with the name parameter or by inspecting the accessibility tree.',
            code: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # Set up a page with form elements
    page.set_content("""
        <form>
            <label for="email">Email Address</label>
            <input id="email" type="email" />

            <label for="password">Password</label>
            <input id="password" type="password" />

            <button type="submit">Sign In</button>
        </form>
    """)

    # Verify elements are findable by accessible names
    email_input = page.get_by_role("textbox", name="Email Address")
    assert email_input.is_visible()
    print("Email input has correct accessible name")

    submit_btn = page.get_by_role("button", name="Sign In")
    assert submit_btn.is_visible()
    print("Submit button has correct accessible name")

    # Fill using accessible names
    page.get_by_label("Email Address").fill("user@test.com")
    page.get_by_label("Password").fill("secret")
    print("Form filled using accessible labels")

    # Verify via accessibility snapshot
    snapshot = page.accessibility.snapshot()
    names = [
        child.get("name")
        for child in snapshot.get("children", [])
        if child.get("name")
    ]
    print(f"Accessible names found: {names}")

    browser.close()`,
            output: `Email input has correct accessible name
Submit button has correct accessible name
Form filled using accessible labels
Accessible names found: ['Email Address', 'Password', 'Sign In']`,
          },
          {
            heading: 'Automated Accessibility Audits',
            content:
              'For comprehensive accessibility auditing, you can integrate Playwright with libraries like axe-core via the axe-playwright-python package. This runs the industry-standard axe accessibility engine against your page and reports all WCAG violations with detailed information about what is wrong and how to fix it.',
            code: `# Install: pip install axe-playwright-python

# test_a11y.py
from playwright.sync_api import sync_playwright

# Simplified audit using evaluate and axe-core CDN
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")

    # Inject axe-core and run audit
    page.evaluate("""
        async () => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.2/axe.min.js';
            document.head.appendChild(script);
            await new Promise(resolve => script.onload = resolve);
        }
    """)

    results = page.evaluate("() => axe.run()")
    violations = results.get("violations", [])

    if violations:
        for v in violations:
            print(f"Violation: {v['id']}")
            print(f"  Impact: {v['impact']}")
            print(f"  Description: {v['description']}")
            print(f"  Affected: {len(v['nodes'])} elements")
    else:
        print("No accessibility violations found!")

    browser.close()`,
            output: `No accessibility violations found!`,
            tip: 'Run accessibility audits as part of your CI/CD pipeline. Fail the build on critical or serious violations to prevent accessibility regressions from reaching production.',
          },
        ],
        quiz: [
          {
            question: 'What does page.accessibility.snapshot() return?',
            options: [
              'A screenshot optimized for color-blind users',
              'A tree representation of the page as seen by assistive technology',
              'A list of WCAG violations',
              'The page HTML with ARIA attributes highlighted',
            ],
            correctIndex: 1,
            explanation: 'accessibility.snapshot() returns a tree structure showing ARIA roles, names, values, and states — representing how screen readers and other assistive technologies perceive the page.',
          },
          {
            question: 'What is the advantage of using get_by_role() in tests?',
            options: [
              'It runs faster than CSS selectors',
              'It tests functionality while also validating ARIA roles are correct',
              'It works across all browsers equally',
              'It does not require the page to be loaded',
            ],
            correctIndex: 1,
            explanation: 'get_by_role() finds elements the same way assistive technology does. Using it in tests validates both the functionality and the accessibility of the UI.',
          },
          {
            question: 'What is axe-core used for?',
            options: [
              'Parsing HTML into an accessibility tree',
              'Running automated WCAG compliance audits',
              'Converting pages to screen-reader friendly format',
              'Generating ARIA attributes automatically',
            ],
            correctIndex: 1,
            explanation: 'axe-core is an industry-standard accessibility testing engine that audits pages for WCAG violations and reports issues with severity, description, and remediation guidance.',
          },
        ],
        challenge: {
          prompt: 'Write a script that navigates to a page with a form (use set_content to create a form with labeled inputs), captures the accessibility snapshot, and verifies that: 1) every input has an accessible name, 2) there is a button with role "button", 3) the heading is found by role. Use get_by_role() for assertions.',
          starterCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # TODO: Set page content with a form containing:
    # - An <h1> heading
    # - A labeled email input
    # - A labeled password input
    # - A submit button

    # TODO: Verify heading by role

    # TODO: Verify inputs by role and accessible name

    # TODO: Verify button by role

    # TODO: Print accessibility snapshot

    browser.close()`,
          solutionCode: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    page.set_content("""
        <h1>Login Form</h1>
        <form>
            <label for="email">Email</label>
            <input id="email" type="email" />
            <label for="pass">Password</label>
            <input id="pass" type="password" />
            <button type="submit">Log In</button>
        </form>
    """)

    heading = page.get_by_role("heading", name="Login Form")
    assert heading.is_visible()
    print("Heading verified")

    email = page.get_by_role("textbox", name="Email")
    assert email.is_visible()
    print("Email input verified")

    button = page.get_by_role("button", name="Log In")
    assert button.is_visible()
    print("Button verified")

    snapshot = page.accessibility.snapshot()
    def print_tree(node, indent=0):
        role = node.get("role", "")
        name = node.get("name", "")
        print(f"{'  ' * indent}{role}: {name}")
        for child in node.get("children", []):
            print_tree(child, indent + 1)
    print_tree(snapshot)

    browser.close()`,
          hints: [
            'Use page.set_content() to create HTML with properly labeled form elements.',
            'Use get_by_role("heading"), get_by_role("textbox"), and get_by_role("button").',
            'The accessibility snapshot is a nested dict with "role", "name", and "children" keys.',
          ],
        },
      },
    ],
  },

  /* ================================================================== */
  /*  Category 10 — Page Object Pattern                                 */
  /* ================================================================== */
  {
    id: 'pw-page-object-pattern',
    label: 'Page Object Pattern',
    icon: 'Layout',
    entries: [
      /* -------------------------------------------------------------- */
      /*  POM with Playwright                                           */
      /* -------------------------------------------------------------- */
      {
        id: 'pw-pom-basics',
        title: 'POM with Playwright',
        difficulty: 'intermediate',
        tags: ['page-object', 'design-pattern', 'encapsulation', 'maintainability'],
        sections: [
          {
            heading: 'What is the Page Object Model?',
            content:
              'The Page Object Model (POM) is a design pattern that encapsulates page-specific locators and interactions into dedicated classes. Instead of scattering selectors and action sequences throughout your tests, you define them once in a page object. Tests then call high-level methods like login_page.login("user", "pass") instead of repeating fill/click sequences. This makes tests more readable, reduces duplication, and means that when the UI changes, you update one class instead of dozens of tests.',
            code: `# pages/login_page.py
from playwright.sync_api import Page

class LoginPage:
    """Encapsulates all interactions with the login page."""

    URL = "https://myapp.com/login"

    def __init__(self, page: Page):
        self.page = page
        # Define locators as properties
        self.email_input = page.locator("#email")
        self.password_input = page.locator("#password")
        self.submit_button = page.locator("button[type=submit]")
        self.error_message = page.locator(".error-message")

    def navigate(self):
        """Go to the login page."""
        self.page.goto(self.URL)
        return self

    def login(self, email: str, password: str):
        """Fill in credentials and submit."""
        self.email_input.fill(email)
        self.password_input.fill(password)
        self.submit_button.click()
        return self

    def get_error(self) -> str:
        """Get the error message text."""
        return self.error_message.text_content()`,
            tip: 'Return self from action methods to enable fluent chaining: login_page.navigate().login("user", "pass").',
            analogy: 'A page object is like a TV remote — you press "Volume Up" without caring which infrared signal is sent. The remote encapsulates the complexity so you interact at a higher level.',
          },
          {
            heading: 'Using Page Objects in Tests',
            content:
              'With the page object defined, tests become remarkably clean and declarative. They read almost like English descriptions of what should happen. If a selector changes (say the email input ID changes from #email to #user-email), you update the LoginPage class once and all tests continue to work.',
            code: `# test_login.py
from pages.login_page import LoginPage

def test_successful_login(page):
    login_page = LoginPage(page)
    login_page.navigate()
    login_page.login("admin@example.com", "password123")

    # After successful login, verify we reach the dashboard
    assert page.url.endswith("/dashboard")
    assert page.locator("h1").text_content() == "Dashboard"

def test_invalid_credentials(page):
    login_page = LoginPage(page)
    login_page.navigate()
    login_page.login("admin@example.com", "wrongpassword")

    error = login_page.get_error()
    assert error == "Invalid email or password"

def test_empty_form_submission(page):
    login_page = LoginPage(page)
    login_page.navigate()
    login_page.login("", "")

    error = login_page.get_error()
    assert "required" in error.lower()`,
            output: `$ pytest test_login.py -v
test_login.py::test_successful_login PASSED
test_login.py::test_invalid_credentials PASSED
test_login.py::test_empty_form_submission PASSED`,
          },
          {
            heading: 'Page Object with Navigation Methods',
            content:
              'A well-designed page object includes navigation methods that return other page objects. For example, after a successful login, the LoginPage.login() method could return a DashboardPage object. This creates a natural flow that mirrors the user journey through the application.',
            code: `# pages/dashboard_page.py
from playwright.sync_api import Page

class DashboardPage:
    def __init__(self, page: Page):
        self.page = page
        self.welcome_heading = page.locator("h1.welcome")
        self.logout_button = page.locator("#logout")
        self.settings_link = page.locator("a[href='/settings']")

    def get_welcome_text(self) -> str:
        return self.welcome_heading.text_content()

    def logout(self):
        self.logout_button.click()
        from pages.login_page import LoginPage
        return LoginPage(self.page)

    def go_to_settings(self):
        self.settings_link.click()
        from pages.settings_page import SettingsPage
        return SettingsPage(self.page)


# Updated LoginPage with return type
# pages/login_page.py
from playwright.sync_api import Page

class LoginPage:
    URL = "https://myapp.com/login"

    def __init__(self, page: Page):
        self.page = page
        self.email_input = page.locator("#email")
        self.password_input = page.locator("#password")
        self.submit_button = page.locator("button[type=submit]")

    def navigate(self):
        self.page.goto(self.URL)
        return self

    def login(self, email: str, password: str):
        self.email_input.fill(email)
        self.password_input.fill(password)
        self.submit_button.click()
        # Return the page you navigate TO
        from pages.dashboard_page import DashboardPage
        return DashboardPage(self.page)


# test_navigation.py — clean, readable tests
def test_login_and_navigate(page):
    login_page = LoginPage(page)
    dashboard = login_page.navigate().login("admin@test.com", "pass")
    assert "Welcome" in dashboard.get_welcome_text()`,
            output: `$ pytest test_navigation.py -v
test_navigation.py::test_login_and_navigate PASSED`,
            tip: 'Use lazy imports (inside methods) to avoid circular import issues when page objects reference each other.',
          },
        ],
        quiz: [
          {
            question: 'What is the main benefit of the Page Object Model?',
            options: [
              'Tests run faster because locators are cached',
              'Selectors and interactions are encapsulated in one place, reducing duplication',
              'It enables parallel test execution',
              'It automatically generates test cases',
            ],
            correctIndex: 1,
            explanation: 'POM encapsulates page-specific selectors and actions in a single class. When the UI changes, you update one class instead of every test that uses that page.',
          },
          {
            question: 'Why should page object action methods return self or another page object?',
            options: [
              'To save memory',
              'To enable method chaining and represent navigation flow',
              'To prevent garbage collection',
              'It is required by Playwright',
            ],
            correctIndex: 1,
            explanation: 'Returning self enables fluent method chaining (page.navigate().login()). Returning another page object represents navigation — login() returns DashboardPage because that is where the user ends up.',
          },
          {
            question: 'Where should locator definitions live in the Page Object Model?',
            options: [
              'In the test files directly',
              'In a global configuration file',
              'In the page object class constructor or as properties',
              'In environment variables',
            ],
            correctIndex: 2,
            explanation: 'Locators should be defined in the page object class — typically in the __init__ method or as properties. This centralizes all selectors for a page in one place.',
          },
        ],
        challenge: {
          prompt: 'Create a SearchPage page object class that encapsulates: a navigate method, a search method that fills a search input and clicks a search button, and a get_results_count method. Then write a test that uses this page object to search for "playwright" and verify results are returned.',
          starterCode: `# pages/search_page.py
from playwright.sync_api import Page

class SearchPage:
    URL = "https://example.com/search"

    def __init__(self, page: Page):
        self.page = page
        # TODO: Define locators

    def navigate(self):
        # TODO
        pass

    def search(self, query: str):
        # TODO
        pass

    def get_results_count(self) -> int:
        # TODO
        pass

# test_search.py
def test_search_returns_results(page):
    # TODO: Use SearchPage to search and verify results
    pass`,
          solutionCode: `# pages/search_page.py
from playwright.sync_api import Page

class SearchPage:
    URL = "https://example.com/search"

    def __init__(self, page: Page):
        self.page = page
        self.search_input = page.locator("#search-input")
        self.search_button = page.locator("#search-btn")
        self.results = page.locator(".search-result")

    def navigate(self):
        self.page.goto(self.URL)
        return self

    def search(self, query: str):
        self.search_input.fill(query)
        self.search_button.click()
        return self

    def get_results_count(self) -> int:
        return self.results.count()

# test_search.py
def test_search_returns_results(page):
    search_page = SearchPage(page)
    search_page.navigate().search("playwright")
    assert search_page.get_results_count() > 0`,
          hints: [
            'Define locators in __init__ using page.locator().',
            'Return self from navigate() and search() for chaining.',
            'Use .count() on a locator to get the number of matching elements.',
          ],
        },
      },

      /* -------------------------------------------------------------- */
      /*  Component Objects                                             */
      /* -------------------------------------------------------------- */
      {
        id: 'pw-component-objects',
        title: 'Component Objects',
        difficulty: 'advanced',
        tags: ['component', 'reusable', 'composition', 'design-pattern'],
        sections: [
          {
            heading: 'From Pages to Components',
            content:
              'Large web applications have shared UI components that appear on multiple pages — navigation bars, modals, data tables, dropdown menus, toast notifications. If every page object reimplements interactions with these shared components, you get duplication. Component objects solve this by encapsulating a reusable UI component into its own class that can be composed into any page object.',
            code: `# components/navbar.py
from playwright.sync_api import Page, Locator

class NavBar:
    """Reusable component for the navigation bar."""

    def __init__(self, page: Page):
        self.page = page
        self.root = page.locator("nav.main-nav")
        self.logo = self.root.locator(".logo")
        self.search_input = self.root.locator("#nav-search")
        self.user_menu = self.root.locator("#user-menu")
        self.logout_link = self.root.locator("a.logout")

    def search(self, query: str):
        self.search_input.fill(query)
        self.search_input.press("Enter")
        return self

    def open_user_menu(self):
        self.user_menu.click()
        return self

    def logout(self):
        self.open_user_menu()
        self.logout_link.click()
        return self

    def get_username(self) -> str:
        return self.user_menu.text_content().strip()


# components/modal.py
class Modal:
    """Reusable component for modal dialogs."""

    def __init__(self, page: Page):
        self.page = page
        self.overlay = page.locator(".modal-overlay")
        self.content = page.locator(".modal-content")
        self.close_button = page.locator(".modal-close")
        self.confirm_button = page.locator(".modal-confirm")
        self.cancel_button = page.locator(".modal-cancel")

    def is_open(self) -> bool:
        return self.overlay.is_visible()

    def close(self):
        self.close_button.click()
        self.overlay.wait_for(state="hidden")

    def confirm(self):
        self.confirm_button.click()
        self.overlay.wait_for(state="hidden")

    def cancel(self):
        self.cancel_button.click()
        self.overlay.wait_for(state="hidden")

    def get_text(self) -> str:
        return self.content.text_content()`,
            analogy: 'Component objects are like LEGO bricks — each brick (component) is self-contained and reusable. You snap them together to build different structures (page objects) without reinventing each brick every time.',
          },
          {
            heading: 'Composing Page Objects with Components',
            content:
              'A page object composes component objects by instantiating them as attributes. The DashboardPage does not re-define navbar locators — it reuses the NavBar component. If the navbar HTML changes, you update NavBar once and every page object that uses it is automatically fixed.',
            code: `# pages/dashboard_page.py
from playwright.sync_api import Page
from components.navbar import NavBar
from components.modal import Modal

class DashboardPage:
    URL = "https://myapp.com/dashboard"

    def __init__(self, page: Page):
        self.page = page
        # Compose components
        self.navbar = NavBar(page)
        self.modal = Modal(page)
        # Page-specific locators
        self.stats_cards = page.locator(".stats-card")
        self.delete_button = page.locator("#delete-account")

    def navigate(self):
        self.page.goto(self.URL)
        return self

    def get_stat_count(self) -> int:
        return self.stats_cards.count()

    def delete_account(self):
        self.delete_button.click()
        # Modal appears — use the modal component
        assert self.modal.is_open()
        return self.modal


# pages/settings_page.py
class SettingsPage:
    URL = "https://myapp.com/settings"

    def __init__(self, page: Page):
        self.page = page
        self.navbar = NavBar(page)  # Same NavBar component!
        self.theme_select = page.locator("#theme")

    def navigate(self):
        self.page.goto(self.URL)
        return self

    def change_theme(self, theme: str):
        self.theme_select.select_option(theme)
        return self


# test_composed.py
def test_navbar_search_on_dashboard(page):
    dashboard = DashboardPage(page)
    dashboard.navigate()
    dashboard.navbar.search("quarterly report")
    assert "search" in page.url

def test_delete_with_confirmation(page):
    dashboard = DashboardPage(page)
    dashboard.navigate()
    modal = dashboard.delete_account()
    assert modal.is_open()
    modal.cancel()  # Changed our mind
    assert not modal.is_open()`,
            output: `$ pytest test_composed.py -v
test_composed.py::test_navbar_search_on_dashboard PASSED
test_composed.py::test_delete_with_confirmation PASSED`,
            tip: 'Keep component objects focused on a single UI component. If a component becomes complex (like a data table with sorting, filtering, and pagination), consider breaking it into sub-components.',
          },
          {
            heading: 'Scoped Component Objects',
            content:
              'When a page has multiple instances of the same component (e.g., several cards or list items), you can create a scoped component that operates within a specific locator context. Instead of searching the entire page, the component searches within its root element.',
            code: `# components/card.py
from playwright.sync_api import Locator

class Card:
    """A reusable card component scoped to a root locator."""

    def __init__(self, root: Locator):
        self.root = root
        self.title = root.locator(".card-title")
        self.description = root.locator(".card-description")
        self.action_button = root.locator(".card-action")

    def get_title(self) -> str:
        return self.title.text_content()

    def get_description(self) -> str:
        return self.description.text_content()

    def click_action(self):
        self.action_button.click()


# pages/products_page.py
from playwright.sync_api import Page
from components.card import Card

class ProductsPage:
    def __init__(self, page: Page):
        self.page = page
        self._card_locators = page.locator(".product-card")

    def navigate(self):
        self.page.goto("https://myapp.com/products")
        return self

    def get_card(self, index: int) -> Card:
        """Get a specific card by index."""
        return Card(self._card_locators.nth(index))

    def get_card_count(self) -> int:
        return self._card_locators.count()

    def get_all_titles(self) -> list:
        count = self.get_card_count()
        return [
            self.get_card(i).get_title() for i in range(count)
        ]


# test_products.py
def test_product_cards(page):
    products = ProductsPage(page)
    products.navigate()

    assert products.get_card_count() > 0

    first_card = products.get_card(0)
    assert first_card.get_title() != ""

    titles = products.get_all_titles()
    print(f"Products: {titles}")`,
            output: `$ pytest test_products.py -v
test_products.py::test_product_cards PASSED
Products: ['Widget Pro', 'Gadget Plus', 'Tool Master']`,
          },
        ],
        quiz: [
          {
            question: 'What problem do component objects solve?',
            options: [
              'Slow test execution',
              'Duplication of shared UI component interactions across page objects',
              'Browser compatibility issues',
              'Test data management',
            ],
            correctIndex: 1,
            explanation: 'Component objects encapsulate reusable UI components (navbar, modals, cards) in dedicated classes, eliminating duplication when multiple page objects interact with the same component.',
          },
          {
            question: 'How does a page object use a component object?',
            options: [
              'By inheriting from it',
              'By instantiating it as an attribute in the constructor',
              'By importing its locators as constants',
              'By registering it in a global component registry',
            ],
            correctIndex: 1,
            explanation: 'A page object creates component instances as attributes: self.navbar = NavBar(page). This is composition, which is more flexible than inheritance.',
          },
          {
            question: 'What is a scoped component object?',
            options: [
              'A component that only works on one page',
              'A component that receives a root Locator and searches only within that element',
              'A component with limited methods',
              'A component defined inside a test function',
            ],
            correctIndex: 1,
            explanation: 'A scoped component takes a root Locator (not the full Page) and defines all its locators relative to that root. This allows multiple instances on the same page, each operating independently.',
          },
        ],
        challenge: {
          prompt: 'Create a DataTable component object that takes a root locator and provides methods to: get_row_count(), get_cell_text(row, col), and click_row(row). Then create a UsersPage that composes this DataTable and has a method to find a user by name. Write a test verifying the table has at least one row.',
          starterCode: `# components/data_table.py
from playwright.sync_api import Locator

class DataTable:
    def __init__(self, root: Locator):
        # TODO: Define locators for rows and cells
        pass

    def get_row_count(self) -> int:
        # TODO
        pass

    def get_cell_text(self, row: int, col: int) -> str:
        # TODO
        pass

    def click_row(self, row: int):
        # TODO
        pass

# pages/users_page.py
class UsersPage:
    def __init__(self, page):
        # TODO: Compose DataTable
        pass

    def find_user_by_name(self, name: str) -> int:
        # TODO: Return row index or -1
        pass`,
          solutionCode: `# components/data_table.py
from playwright.sync_api import Locator

class DataTable:
    def __init__(self, root: Locator):
        self.root = root
        self.rows = root.locator("tbody tr")

    def get_row_count(self) -> int:
        return self.rows.count()

    def get_cell_text(self, row: int, col: int) -> str:
        return self.rows.nth(row).locator("td").nth(col).text_content()

    def click_row(self, row: int):
        self.rows.nth(row).click()


# pages/users_page.py
from playwright.sync_api import Page
from components.data_table import DataTable

class UsersPage:
    def __init__(self, page: Page):
        self.page = page
        self.table = DataTable(page.locator("#users-table"))

    def navigate(self):
        self.page.goto("https://myapp.com/users")
        return self

    def find_user_by_name(self, name: str) -> int:
        for i in range(self.table.get_row_count()):
            if name in self.table.get_cell_text(i, 0):
                return i
        return -1


# test_users.py
def test_users_table_has_rows(page):
    users_page = UsersPage(page)
    users_page.navigate()
    assert users_page.table.get_row_count() > 0`,
          hints: [
            'Use root.locator("tbody tr") to select table rows.',
            'Use .nth(row).locator("td").nth(col) to get a specific cell.',
            'Iterate through rows in find_user_by_name to find the matching row.',
          ],
        },
      },

      /* -------------------------------------------------------------- */
      /*  Fixtures for POM                                              */
      /* -------------------------------------------------------------- */
      {
        id: 'pw-fixtures-for-pom',
        title: 'Fixtures for POM',
        difficulty: 'advanced',
        tags: ['fixtures', 'dependency-injection', 'pytest', 'page-object'],
        sections: [
          {
            heading: 'Page Object Fixtures',
            content:
              'Instead of manually instantiating page objects in every test, you can define pytest fixtures that create and configure them. This is dependency injection — your tests declare which page objects they need, and pytest provides fully initialized instances. This further reduces boilerplate and centralizes setup logic.',
            code: `# conftest.py
import pytest
from pages.login_page import LoginPage
from pages.dashboard_page import DashboardPage

@pytest.fixture
def login_page(page):
    """Provide a LoginPage instance."""
    lp = LoginPage(page)
    lp.navigate()
    return lp

@pytest.fixture
def dashboard_page(page):
    """Provide a DashboardPage instance."""
    dp = DashboardPage(page)
    dp.navigate()
    return dp

# test_auth.py — clean and minimal
def test_login_success(login_page):
    login_page.login("admin@test.com", "password123")
    # Page object handles everything

def test_login_failure(login_page):
    login_page.login("admin@test.com", "wrong")
    assert login_page.get_error() == "Invalid credentials"

# test_dashboard.py
def test_dashboard_stats(dashboard_page):
    assert dashboard_page.get_stat_count() > 0`,
            output: `$ pytest test_auth.py test_dashboard.py -v
test_auth.py::test_login_success PASSED
test_auth.py::test_login_failure PASSED
test_dashboard.py::test_dashboard_stats PASSED`,
            tip: 'Name your fixtures after the page objects they provide (login_page, dashboard_page). This makes the test parameter lists self-documenting.',
            analogy: 'Fixtures are like a prep cook in a kitchen. The chef (your test) just asks for a prepped ingredient (page object), and the prep cook handles all the washing, chopping, and measuring beforehand.',
          },
          {
            heading: 'Authenticated Page Object Fixtures',
            content:
              'A common pattern is to chain fixtures: one fixture handles authentication and another builds on it to provide an authenticated page object. This avoids duplicating login logic and leverages storage state for speed.',
            code: `# conftest.py
import pytest
from playwright.sync_api import sync_playwright
from pages.login_page import LoginPage
from pages.dashboard_page import DashboardPage
from pages.settings_page import SettingsPage

@pytest.fixture(scope="session")
def auth_state(tmp_path_factory):
    """Login once, save auth state for the session."""
    state_path = str(
        tmp_path_factory.mktemp("auth") / "state.json"
    )
    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context()
        pg = ctx.new_page()
        LoginPage(pg).navigate().login("admin@test.com", "pass")
        ctx.storage_state(path=state_path)
        ctx.close()
        browser.close()
    return state_path

@pytest.fixture
def authed_page(browser, auth_state):
    """Provide an authenticated page."""
    context = browser.new_context(storage_state=auth_state)
    page = context.new_page()
    yield page
    context.close()

@pytest.fixture
def dashboard(authed_page):
    """Provide an authenticated DashboardPage."""
    dp = DashboardPage(authed_page)
    dp.navigate()
    return dp

@pytest.fixture
def settings(authed_page):
    """Provide an authenticated SettingsPage."""
    sp = SettingsPage(authed_page)
    sp.navigate()
    return sp

# test_authenticated.py — no login boilerplate at all!
def test_dashboard_welcome(dashboard):
    text = dashboard.get_welcome_text()
    assert "Welcome" in text

def test_change_theme(settings):
    settings.change_theme("dark")
    assert settings.get_current_theme() == "dark"`,
            output: `$ pytest test_authenticated.py -v
test_authenticated.py::test_dashboard_welcome PASSED
test_authenticated.py::test_change_theme PASSED
# Login happened only ONCE for the entire session`,
          },
          {
            heading: 'Parameterized Page Object Fixtures',
            content:
              'You can create fixture factories that accept parameters, allowing tests to request page objects with different configurations. This is useful when you need to test with different user roles, viewport sizes, or feature flags.',
            code: `# conftest.py
import pytest
from pages.dashboard_page import DashboardPage

@pytest.fixture(params=[
    {"width": 1920, "height": 1080, "name": "desktop"},
    {"width": 768, "height": 1024, "name": "tablet"},
    {"width": 375, "height": 667, "name": "mobile"},
])
def responsive_dashboard(request, browser):
    """Provide DashboardPage at different viewport sizes."""
    viewport = request.param
    context = browser.new_context(
        viewport={
            "width": viewport["width"],
            "height": viewport["height"]
        }
    )
    page = context.new_page()
    dp = DashboardPage(page)
    dp.navigate()
    dp.viewport_name = viewport["name"]

    yield dp

    context.close()


# Factory fixture pattern for custom page objects
@pytest.fixture
def make_page_object(browser):
    """Factory fixture — create page objects with custom config."""
    contexts = []

    def _make(page_class, viewport=None, auth_state=None):
        ctx_args = {}
        if viewport:
            ctx_args["viewport"] = viewport
        if auth_state:
            ctx_args["storage_state"] = auth_state

        context = browser.new_context(**ctx_args)
        contexts.append(context)
        page = context.new_page()
        return page_class(page)

    yield _make

    for ctx in contexts:
        ctx.close()


# test_responsive.py
def test_sidebar_visible_on_desktop(responsive_dashboard):
    if responsive_dashboard.viewport_name == "desktop":
        assert responsive_dashboard.sidebar.is_visible()

def test_hamburger_on_mobile(responsive_dashboard):
    if responsive_dashboard.viewport_name == "mobile":
        assert responsive_dashboard.hamburger_menu.is_visible()

# test_factory.py
def test_with_factory(make_page_object):
    dashboard = make_page_object(
        DashboardPage,
        viewport={"width": 1920, "height": 1080}
    )
    dashboard.navigate()
    assert dashboard.get_stat_count() > 0`,
            output: `$ pytest test_responsive.py -v
test_responsive.py::test_sidebar_visible_on_desktop[desktop] PASSED
test_responsive.py::test_sidebar_visible_on_desktop[tablet] PASSED
test_responsive.py::test_sidebar_visible_on_desktop[mobile] PASSED
test_responsive.py::test_hamburger_on_mobile[desktop] PASSED
test_responsive.py::test_hamburger_on_mobile[tablet] PASSED
test_responsive.py::test_hamburger_on_mobile[mobile] PASSED`,
            tip: 'The factory fixture pattern is extremely powerful. It lets each test customize its page object while the fixture handles context lifecycle and cleanup.',
          },
        ],
        quiz: [
          {
            question: 'What is the benefit of providing page objects through fixtures?',
            options: [
              'Tests run in parallel automatically',
              'Tests declare dependencies and receive pre-configured page objects, reducing boilerplate',
              'Page objects are cached globally for speed',
              'Fixtures make page objects immutable',
            ],
            correctIndex: 1,
            explanation: 'Fixtures provide dependency injection — tests declare which page objects they need as parameters, and pytest creates and configures them automatically, eliminating manual instantiation and setup.',
          },
          {
            question: 'How do you create an authenticated page object fixture?',
            options: [
              'Add @pytest.mark.authenticated to the test',
              'Chain fixtures: auth_state -> authed_page -> page_object',
              'Use a special AuthenticatedPage base class',
              'Set environment variables for credentials',
            ],
            correctIndex: 1,
            explanation: 'Chain fixtures together: a session-scoped fixture saves auth state, another fixture creates an authenticated page using that state, and a third creates the page object on that authenticated page.',
          },
          {
            question: 'What is a factory fixture?',
            options: [
              'A fixture that creates other fixtures at runtime',
              'A fixture that yields a function for creating configured objects on demand',
              'A fixture that runs in a separate process',
              'A fixture defined in a factory module',
            ],
            correctIndex: 1,
            explanation: 'A factory fixture yields a function (e.g., _make) that tests call to create objects with custom configuration. The fixture handles cleanup when the test ends.',
          },
          {
            question: 'How do parameterized fixtures work for responsive testing?',
            options: [
              'They run the test once with a random viewport',
              'They create a separate test case for each parameter set',
              'They resize the browser during the test',
              'They only run on the largest viewport',
            ],
            correctIndex: 1,
            explanation: 'A fixture with @pytest.fixture(params=[...]) creates a separate test invocation for each parameter set. A test using the responsive fixture runs once per viewport size.',
          },
        ],
        challenge: {
          prompt: 'Create a conftest.py with: 1) A session-scoped auth_state fixture that logs in and saves storage state. 2) An authed_page fixture that creates an authenticated page. 3) A dashboard fixture that provides a DashboardPage. 4) A factory fixture called make_page that accepts a page class and optional viewport. Write a test using the dashboard fixture and another using the factory.',
          starterCode: `# conftest.py
import pytest
from playwright.sync_api import sync_playwright

# TODO: auth_state fixture (session-scoped)

# TODO: authed_page fixture

# TODO: dashboard fixture

# TODO: make_page factory fixture

# test_pom_fixtures.py
def test_with_dashboard(dashboard):
    # TODO
    pass

def test_with_factory(make_page):
    # TODO
    pass`,
          solutionCode: `# conftest.py
import pytest
from playwright.sync_api import sync_playwright
from pages.login_page import LoginPage
from pages.dashboard_page import DashboardPage

@pytest.fixture(scope="session")
def auth_state(tmp_path_factory):
    path = str(tmp_path_factory.mktemp("auth") / "state.json")
    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context()
        pg = ctx.new_page()
        LoginPage(pg).navigate().login("admin@test.com", "pass")
        ctx.storage_state(path=path)
        ctx.close()
        browser.close()
    return path

@pytest.fixture
def authed_page(browser, auth_state):
    context = browser.new_context(storage_state=auth_state)
    page = context.new_page()
    yield page
    context.close()

@pytest.fixture
def dashboard(authed_page):
    dp = DashboardPage(authed_page)
    dp.navigate()
    return dp

@pytest.fixture
def make_page(browser):
    contexts = []
    def _make(page_class, viewport=None):
        ctx_args = {}
        if viewport:
            ctx_args["viewport"] = viewport
        context = browser.new_context(**ctx_args)
        contexts.append(context)
        page = context.new_page()
        return page_class(page)
    yield _make
    for ctx in contexts:
        ctx.close()

# test_pom_fixtures.py
def test_with_dashboard(dashboard):
    assert dashboard.get_stat_count() > 0

def test_with_factory(make_page):
    dp = make_page(DashboardPage, viewport={"width": 1920, "height": 1080})
    dp.navigate()
    assert dp.get_stat_count() > 0`,
          hints: [
            'The auth_state fixture uses sync_playwright and saves via ctx.storage_state(path=...).',
            'The authed_page fixture creates a context with storage_state and yields the page.',
            'The factory fixture yields a function and cleans up all created contexts after the test.',
          ],
        },
      },
    ],
  },
];
