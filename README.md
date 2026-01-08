# QA Engineer Practical Challenges 🧪

A collection of realistic debugging scenarios for interviewing QA Engineers. Each challenge simulates a real-world bug that requires investigation using browser DevTools.

## 🎯 Purpose

These challenges test a QA engineer's ability to:
- Use browser DevTools effectively (Console, Network tabs)
- Distinguish between frontend and backend issues
- Analyze API requests and responses
- Think critically about root causes
- Understand client-server architecture

## 🚀 Quick Start

### Option 1: Local Development
```bash
# Clone or download this repository
cd qa-challenges

# Start a local server (Python 3)
python3 -m http.server 8000

# Or using npm
npm start

# Open browser
open http://localhost:8000
```

### Option 2: GitHub Pages
Simply host this on GitHub Pages - no server needed! All challenges use client-side JavaScript to simulate API calls.

## 📋 Challenges

### Challenge 1: Silent Button
**Difficulty:** Medium  
**Scenario:** A checkout button appears to work but provides no feedback to the user.  
**Skills tested:** Network tab analysis, HTTP status codes, error handling

**Key Learning:** Backend returns proper error (422 Unprocessable Entity), but frontend doesn't display it to the user.

---

### Challenge 2: Vanishing Data
**Difficulty:** Medium  
**Scenario:** Products disappear when filtering by category, despite existing in the database.  
**Skills tested:** Query parameter analysis, data validation, debugging logic

**Key Learning:** Frontend sends wrong category ID (123 instead of 456), backend correctly returns empty results.

---

### Challenge 3: Infinite Loader
**Difficulty:** Hard  
**Scenario:** Profile page shows loading spinner indefinitely.  
**Skills tested:** Timeout analysis, performance issues, understanding infrastructure

**Key Learning:** Backend doesn't respond (504 Gateway Timeout after 60s), indicating server/infrastructure issue.

## 🎓 Interview Guidelines

### For Interviewers:
1. Ask candidate to open DevTools before starting
2. Don't reveal the answers - let them discover
3. Ask follow-up questions:
   - "Is this a frontend or backend issue?"
   - "How would you write a bug report for this?"
   - "What would you suggest to prevent this?"

### For Candidates:
- Take your time to investigate
- Use all DevTools tabs (Console, Network, Elements)
- Check request payload AND response
- Consider user experience implications
- Think about where the fix should be implemented

## 🛠️ Technical Details

- Pure HTML/CSS/JavaScript (no frameworks)
- Mock APIs using JavaScript Promises
- Console logs simulate real Network tab behavior
- Works offline - perfect for interviews
- Mobile-responsive design

## 📝 Expected Solutions

<details>
<summary><strong>Challenge 1: Silent Button</strong></summary>

**Issue:** Frontend bug - error handling missing  
**Root Cause:** Backend returns 422 with error message, but frontend doesn't display it  
**Fix Location:** Frontend - add error message display in catch block  
**Severity:** High - poor UX, user doesn't know what's wrong  
</details>

<details>
<summary><strong>Challenge 2: Vanishing Data</strong></summary>

**Issue:** Frontend bug - wrong data sent  
**Root Cause:** HTML dropdown has category ID "123", but real ID is "456"  
**Fix Location:** Frontend - correct the category IDs in the select options  
**Severity:** Critical - feature completely broken  
</details>

<details>
<summary><strong>Challenge 3: Infinite Loader</strong></summary>

**Issue:** Backend/Infrastructure bug  
**Root Cause:** Server doesn't respond within reasonable time (504 timeout)  
**Fix Location:** Backend - optimize query, add caching, or fix infrastructure  
**Secondary Issue:** Frontend should handle timeouts gracefully  
**Severity:** Critical - page unusable  
</details>

## 🎨 Customization

Feel free to:
- Modify the scenarios to match your tech stack
- Add more challenges
- Adjust difficulty levels
- Customize the design

## 📄 License

MIT License - feel free to use for your interviews!

## 🤝 Contributing

Suggestions for new challenges? Open an issue or PR!

---

**Made for better QA interviews** • Happy Debugging! 🐛
