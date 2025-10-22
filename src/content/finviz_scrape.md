# Finviz Scraper

_Time travel for traders on a budget_

## 🔍 The Problem

[Finviz.com](https://finviz.com) was a go-to financial website for a trading community of ~8,000 members. However, there was a critical missing feature: the ability to go back and see which stocks were moving on specific days in the past.

**The Market Gap**: Only expensive premium tools ($200-300/month) offered this "time travel" functionality, putting it out of reach for most community members.

## 💡 The Solution

I built a custom scraper that gave access to historical market data and moving stocks pre-market on a particular day:

### Core Functionality

- **Daily Crawling**: Automated scraper captures Finviz data every day
- **Smart Categorization**: Percentage move, sector and combination of both
- **Calendar View**: Simple, intuitive interface to browse historical data by date
- **Search & Filter**: Powerful search to find specific stocks or patterns

### The Impact

Traders could now:

- Review what they missed on any given day
- Identify common patterns in winning setups
- Learn from historical price action without breaking the bank

## 🛠️ Technical Stack

Built for reliability and scalability:

- **Frontend**: Vue.js for reactive UI
- **Backend**: Node.js for scraping and API
- **Database**: MongoDB for flexible data storage
- **Hosting**: Firebase for deployment

## 🎯 Community Value

This tool made expensive functionality accessible to everyday traders, enabling pattern recognition and strategy improvement for the entire 8k+ member community.
