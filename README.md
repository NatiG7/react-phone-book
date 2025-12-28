# 💀 SECURE_CONTACTS_V1 // TERMINAL EDITION

> A React-based Contact Management System with a Cyber-Security aesthetic.
> Engineered for data segmentation, role-based access control, and visual clarity.

## ⚡ SYSTEM STATUS: ONLINE

This application manages personnel records with a focus on modular architecture and strict component separation.
It features a custom "Neon/Terminal" design system without relying on external UI libraries.

---

## 🛠️ CORE MODULES

### 1. ACCESS CONTROL (Auth)
* **Role-Based Access:** Admin (Read/Write/Delete) vs User (Read Only).
* **Security:** Simulated JWT logic using React Context.
* **Visuals:** Hex-grid login screen with "glitch" validation effects.

### 2. DATA MANAGEMENT (CRUD)
* **Live Search:** Real-time filtering by Name, Phone, or Email.
* **Sorting:** Toggle Ascending/Descending order.
* **Edit/Update:** Unified Modal interface for adding and modifying records.
* **Validation:** Regex-enforced patterns for Israeli Phone numbers and Standard Emails.

### 3. SEGMENTATION (Groups)
* **Folder Structure:** Tab-based navigation to filter contacts by relationship (Friends, Work, Family).
* **Path Tracing:** Dynamic breadcrumb display (e.g., `root/contacts/work/`).

---

## 📂 ARCHITECTURE (STRICT MODULARITY)

This project follows a strict **"Folder-Per-Component"** rule.
Every visual component resides in its own directory with a dedicated CSS Module.

```text
src/
├── components/
│   ├── common/         # Inputs, Modals (Shared UI)
│   ├── contacts/       # Card, List, Form (Domain Specific)
│   └── layout/         # Header, Footer, Navbar, Wrapper
├── context/            # Logic Providers (No UI)
├── hooks/              # Custom Hooks (useAuth, useData)
├── pages/              # Route Views (Home, Login, Directory)
└── services/           # API fetchers
```

---

## 🚀 DEPLOYMENT PROTOCOL

1.  **Initialize Node Modules:**
    ```bash
    npm install
    ```

2.  **Execute Dev Environment:**
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    ```bash
    npm run build
    ```

---

## 👤 DEFAULT CREDENTIALS

| ROLE  | USERNAME | PASSWORD | PERMISSIONS |
| :--- | :--- | :--- | :--- |
| **Root** | `admin` | `123` | FULL ACCESS |
| **User** | `user` | `123` | READ ONLY |