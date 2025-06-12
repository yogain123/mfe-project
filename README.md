# Micro Frontend Architecture Learning Project

## 🎯 Overview

This project demonstrates a complete **Micro Frontend (MFE) architecture** using **Webpack Module Federation** with React 17. It's designed to teach you everything from basic concepts to advanced production-ready patterns.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        SHELL APP                            │
│                     (Port: 3000)                            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              HEADER MFE (Component)                 │    │
│  │                 (Port: 3001)                        │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │   PRODUCTS MFE  │  │   ORDERS MFE    │                   │
│  │   (Full Page)   │  │   (Full Page)   │                   │
│  │   Port: 3002    │  │   Port: 3003    │                   │
│  └─────────────────┘  └─────────────────┘                   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         USER PROFILE MFE (Component)                │    │
│  │              (Port: 3004)                           │    │
│  │    (Can be embedded in other MFEs)                  │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

<strong>Please refer /docs for detailed explanation of the project.</strong>

---

**Happy Learning! 🎉**

This project covers everything you need to understand Micro Frontend architecture in a production environment.

<img width="1509" alt="Screenshot 2025-06-12 at 12 40 06 PM" src="https://github.com/user-attachments/assets/6053b0ba-573c-459f-a8fd-bb4eb2dac61c" />

<img width="1512" alt="Screenshot 2025-06-12 at 12 39 52 PM" src="https://github.com/user-attachments/assets/6a74dc58-0430-49c7-a048-0f79336770e4" />

