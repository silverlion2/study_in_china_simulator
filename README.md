<div align="center">
  <img src="https://socialify.git.ci/silverlion2/study_in_china_simulator/image?description=1&font=Inter&language=1&name=1&owner=1&pattern=Formal&theme=Dark" alt="Sim Panda - Study in China Simulator" width="600" />

  # Sim Panda - Study in China Simulator 🐼

  [![Build & Release Windows](https://github.com/silverlion2/study_in_china_simulator/actions/workflows/build-release.yml/badge.svg)](https://github.com/silverlion2/study_in_china_simulator/actions/workflows/build-release.yml)
  [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
  [![Made with React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Packaged with Electron](https://img.shields.io/badge/Electron-191970?style=flat&logo=Electron&logoColor=white)](https://www.electronjs.org/)

  **A High-Fidelity, Choice-Driven RPG Life Simulator built with React and Electron.**

</div>

## 📥 Download and Play

You can download the compiled Windows `.exe` installer directly from the GitHub Cloud servers.

👉 **[Download the Latest Windows Release Here](https://github.com/silverlion2/study_in_china_simulator/releases/latest)**

---

## 🎮 Game Overview

**Sim Panda** is an immersive lifestyle simulator that puts you in the shoes of an international student navigating the exciting, challenging, and culturally rich process of studying abroad in China.

Using a precise turn-based weekly schedule, players must balance their `Academic` stats, `Social` influence, `Mental Health`, and `RMB Finances`. Will you grind coding algorithms to get a Baidu internship? Build Guanxi by clubbing in Sanlitun? Or master HSK 6 and become a cultural ambassador? It's up to you.

## ✨ Features

- **Dynamic Turn-Based Scheduling:** Manage 36 weeks of actions across distinct Epochs (Application, Pre-Departure, In-China).
- **RPG Stat System:** Track Grades, Social Capital (Guanxi), Stress levels, and Funds. Every choice has trade-offs.
- **Narrative Story Engine:** 10+ distinct endings based on complex condition thresholds. 
- **Authentic Localization:** True-to-life mechanics featuring Health Kits, Visa interviews, WeChat interactions, and iconic real-world locations (like Wudaokou and Sanlitun).
- **SimPad Tablet Interface:** Immersive UI that mimics modern device tracking for your milestones, stats, and storyline.

## 🛠️ Local Development

To run the simulator locally in its Electron container or browser:

```bash
# 1. Clone the repository
git clone https://github.com/silverlion2/study_in_china_simulator.git
cd study_in_china_simulator

# 2. Install dependencies (for Electron desktop wrapping)
npm install

# 3. Play via Desktop Client
npm start
```
*Note: If you only want to play in your browser, just double click `index.html`!*

## 🏗️ System Architecture

The project is structured to be highly pure, eschewing complicated bundle tooling (like Webpack) in favor of a raw React string-injected `build.js` pipeline. 

- `data/`: Contains the JSON node tree logic for event handling.
- `engine/`: The core `GameState.js` and `EventSystem.js` maintaining state without Redux.
- `components/`: Modular React components tracking specific UI functions (like the `TabletInterface`).

## 📜 License
ISC License
