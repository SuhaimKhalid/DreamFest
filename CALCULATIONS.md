# 📊 DreamFest - Calculations Documentation

## Overview

This document explains all formulas, assumptions, and logic used in the DreamFest Festival Simulator.

The system calculates:

- Revenue
- CAPEX (Capital Expenditure)
- OPEX (Operational Expenditure)
- Profit
- Attendance simulation
- Festival comparison metrics

---

## 👥 Attendance Calculation

### Formula:

Attendance = Expected Audience × Growth Factor × Weather Multiplier

### Explanation:

- Attendance starts low and increases over festival days
- A growth factor is applied per day (linear increase)
- Weather affects attendance

### Weather Multipliers:

- Sunny = 1.2
- Cloudy = 1.0
- Rainy = 0.7

### Assumptions:

- Weather is randomly generated
- Growth is linear across festival duration

---

## 🎟 Revenue Calculation

### Formula:

Revenue = (Daily Attendance × Ticket Price) + Vendor Revenue

### Breakdown:

- Ticket revenue is calculated per day
- Vendor revenue is added as:
  Vendor Cost Per Day × Duration

### Assumptions:

- Default ticket price = £20 (if not provided)
- Vendors contribute fixed daily revenue

---

## 🏗 CAPEX (Capital Expenditure)

### Formula:

CAPEX = Stage Cost + Artist Fees

### Stage Costs:

- Main stage = £5000
- Secondary stage = £3000
- Small stage = £1500

### Artist Fees:

Sum of all artist fees in the festival

### Assumptions:

- CAPEX is a one-time setup cost
- Each stage has fixed cost based on size

---

## 🔁 OPEX (Operational Expenditure)

### Formula:

OPEX = (Staff Count × Staff Cost Per Person) × Duration

### Explanation:

- Each staff member has a fixed daily cost
- Total is multiplied by festival duration

### Assumptions:

- Staff cost per person = £100
- Cost is constant for all staff roles

---

## 💰 Profit Calculation

### Formula:

Profit = Total Revenue - (CAPEX + OPEX)

### Explanation:

- Total revenue includes tickets + vendors
- Total cost includes setup + operational cost

---

## 📊 Festival Comparison

When comparing two festivals:

- Profit Difference = Festival A - Festival B
- Revenue Difference = Festival A - Festival B
- Cost Difference = Festival A - Festival B
- Attendance Difference = Festival A - Festival B

---

## 📦 Exported Data

The system exports:

- Daily attendance
- Weather conditions
- Revenue per day
- Total revenue
- Total cost
- Profit

Formats supported:

- JSON (full structured data)
- CSV (table format)

---

## ⚠️ Assumptions

- No backend database used (localStorage only)
- Weather is randomly generated
- Vendor model is simplified
- No transport, electricity, or logistics costs included
- No inflation or dynamic pricing applied

---

## 🚀 Future Improvements

- Add energy consumption model
- Add logistics/toilet cost system
- Add dynamic ticket pricing
- Add AI-based attendance prediction
- Add multi-festival dashboard analytics

---

## 👨‍💻 Summary

This calculation system is designed to simulate a realistic but simplified festival economy model for educational and portfolio purposes.
