# Context for Claude - PFAS ID-FY Project

## Project Overview
Building PFAS ID-FY, a web app that helps users identify PFAS (forever chemicals) in everyday products and find safer alternatives.

## Current State
- Basic React app created and pushed to GitHub
- Have demo UI with risk meter, product search, and email capture
- Email capture needs to be connected to Google Forms
- Need to add real product database

## Key Resources
- GitHub: https://github.com/vkpe13/pfas-idfy
- Google Form ID: 1FAIpQLSe9UuK-Icl0k6l9pIjEDfzJ_u8LfswiLKe5s6FDsLHwy824gg
- Google Form Field ID: entry.127497103
- PDF Guide: https://drive.google.com/file/d/187rn5oNKB_tz61V29aQl_JilpVUIutf6/view?usp=sharing

## Design Decisions Made
1. Start with manual search (no complex barcode scanning)
2. Focus on 100 curated, high-impact products
3. Use inline styles for rapid development
4. Single component architecture for MVP
5. Firebase for backend (free tier)
6. Affiliate revenue first, then premium subscriptions

## Component Structure
- Single App.js file containing entire application
- States: activeView, searchTerm, selectedProduct, scannedProducts, etc.
- Views: dashboard, products, history, blog

## Next Priority
Replace default React app with PFAS app code and test functionality.

## For New Chat
Paste this entire document and say: "Continue building PFAS ID-FY from where we left off. Current task: [specific task]"