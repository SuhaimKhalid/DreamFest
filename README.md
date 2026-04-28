# 🎪 DreamFest - Festival Simulator App

## Overview

DreamFest is a local web application that allows users to design, simulate, and compare music festivals. Users can create festival setups with artists, stages, vendors, and staff, then run simulations to calculate attendance, revenue, cost, and profit under different conditions.

The app also supports saving, exporting, and comparing multiple festival setups.

---

## 🚀 Features

- Create and design music festivals
- Add artists, stages, vendors, and staff
- Simulate festival performance (attendance, weather impact, revenue)
- Calculate financial metrics:
  - CAPEX (setup cost)
  - OPEX (running cost)
  - Revenue
  - Profit
- Save festival simulations in localStorage
- Compare different festival setups
- Export results as:
  - JSON file
  - CSV file
- Unit tests for core calculation logic (Jest)

---

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- React Bootstrap
- FontAwesome Icons
- Jest
- ts-jest
- LocalStorage

---

## ▶️ How to Run the App

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Open in browser

```
http://localhost:5173
```

---

## 🧪 How to Run Tests

```bash
npm test
```

Tests include:

- Revenue calculation
- CAPEX calculation
- OPEX calculation
- Profit calculation

---

## 📦 Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
 ├── Utilities/
 │    ├── calculations.ts
 │    ├── Type.ts
 ├── components/
 ├── pages/
 ├── __tests__/
```

---

## 📊 Calculations

### Revenue

Revenue = (Daily Attendance × Ticket Price) + Vendor Revenue  
Ticket price default = £20

---

### CAPEX

CAPEX = Stage Cost + Artist Fees

Main stage = £5000  
Secondary stage = £3000  
Small stage = £1500

---

### OPEX

OPEX = (Staff Count × Staff Cost Per Person) × Duration  
Staff cost = £100 per person

---

### Profit

Profit = Total Revenue - (CAPEX + OPEX)

---

### Attendance

Attendance = Expected Audience × Growth Factor × Weather Multiplier

Weather:

- Sunny = 1.2
- Cloudy = 1.0
- Rainy = 0.7

---

## 📊 Comparison Logic

- Profit Difference = A - B
- Revenue Difference = A - B
- Cost Difference = A - B
- Attendance Difference = A - B

---

## 📦 Export Features

- JSON export (full simulation data)
- CSV export (day-wise breakdown + summary)

---

## ⚠️ Assumptions

- No backend (uses localStorage only)
- Weather is randomly generated
- Vendor revenue is simplified
- No logistics/transport/energy cost included

---

## 🚀 Future Improvements

- Energy usage tracking
- Logistics cost system
- Dynamic ticket pricing
- AI-based attendance prediction

---

## 👨‍💻 Author

DreamFest built using React + TypeScript + Jest
