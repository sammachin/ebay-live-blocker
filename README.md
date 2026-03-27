# eBay Live Blocker

A lightweight Browser extension that hides all "eBay Live" shopping content from eBay pages — no more live auction banners, live stream sections, or "Watch Live" prompts cluttering up your browsing.

## Demo

[![eBay Live Blocker Demo](https://img.youtube.com/vi/oH0D3I6b_Z8/0.jpg)](https://youtu.be/oH0D3I6b_Z8)

## Features

- Blocks eBay Live sections, banners, and cards on page load
- Also catches content that eBay lazy-loads in after the initial render
- Works across **18 eBay country sites** (see full list below)
- No permissions required — runs entirely in the page, no data collected

## Supported Sites

| Site | Domain |
|------|--------|
| USA | ebay.com |
| UK | ebay.co.uk |
| Australia | ebay.com.au |
| Austria | ebay.at |
| Belgium | ebay.be |
| Canada | ebay.ca |
| France | ebay.fr |
| Germany | ebay.de |
| Hong Kong | ebay.com.hk |
| India | ebay.in |
| Ireland | ebay.ie |
| Italy | ebay.it |
| Malaysia | ebay.com.my |
| Netherlands | ebay.nl |
| Philippines | ebay.ph |
| Poland | ebay.pl |
| Singapore | ebay.com.sg |
| Spain | ebay.es |
| Switzerland | ebay.ch |

## Installation

1. Download and unzip `ebay-live-blocker.zip`
2. Open Chrome and navigate to `chrome://extensions`
3. Enable **Developer mode** using the toggle in the top-right corner
4. Click **Load unpacked** and select the `ebay-live-blocker` folder
5. Done — the extension activates automatically on any supported eBay site

## How It Works

The extension uses two complementary strategies:

- **Selector-based blocking** — hides elements whose class, ID, or data attributes contain `live` (targeting eBay's internal module system)
- **Text-based blocking** — scans headings and labels for phrases like "eBay Live", "Live Shopping", "Watch Live", etc., then walks up the DOM to remove the entire enclosing section

A `MutationObserver` watches for dynamically injected content and re-runs the blocker whenever eBay loads new sections into the page.

## Updating

If you already have the extension loaded and want to update to a newer version:

1. Replace the contents of the `ebay-live-blocker` folder with the new files
2. Go to `chrome://extensions`
3. Click the **refresh icon** on the eBay Live Blocker card

## License

MIT