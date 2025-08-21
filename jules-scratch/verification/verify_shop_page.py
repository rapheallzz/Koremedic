import os
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Listen for console events and print them
    page.on("console", lambda msg: print(f"Browser console: {msg.text}"))

    page.goto("http://localhost:8000/shop.html")
    page.wait_for_timeout(2000) # wait for 2 seconds
    page.screenshot(path="jules-scratch/verification/verification.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
