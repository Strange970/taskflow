# 🧭 Taskflow — Fullstack Task Management App

Taskflow is a modern fullstack task management application built with **Laravel**, **React**, **Inertia.js**, and **Tailwind CSS**.  
It allows users to organize projects across multiple boards, manage tasks visually via drag-and-drop, and customize their workspace with dark mode.

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React, Inertia.js, Tailwind CSS |
| **Backend** | Laravel 12.37, PHP 8.4 |
| **Database** | MySQL / SQLite / PostgreSQL |
| **Auth** | Laravel Breeze (React + Inertia stack) |
| **Extras** | Dark Mode, Modal UI, Drag-and-Drop, Responsive Design |

---

## ✨ Key Features

- 🧩 **Multi-Board Kanban Interface** – Create, rename, and manage multiple project boards.  
- 🪄 **Drag-and-Drop Tasks** – Seamlessly reorder tasks and move them across categories.  
- 📝 **Task Detail Modal** – Edit task title, description, due date, and priority in a modal view.  
- 🌙 **Dark Mode Toggle** – Switch between light and dark themes using a unified ThemeProvider.  
- 👥 **User Authentication** – Secure login/register system powered by Laravel Breeze.  
- ⚡ **Real-Time Inertia Navigation** – Fast, SPA-like transitions between Laravel routes.  
- 🧠 **Persistent Data (Planned)** – Future upgrade to sync tasks/boards with the backend via Inertia API calls.

---

## 🧰 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
composer install
npm install
```

Copy environment configuration:

```bash
cp .env.example .env
php artisan key:generate
```

Configure your `.env` file for your database (MySQL or SQLite).

---

## 💻 Run the App

Start your Laravel backend and Vite development server:

```bash
php artisan serve
npm run dev
```

Visit:

```
http://127.0.0.1:8000
```

✅ Laravel serves the backend  
✅ Vite serves the React front-end (HMR enabled)  

---

## 🚀 Deployment (Production)

To build optimized frontend assets:

```bash
npm run build
```

Then deploy your Laravel app as usual on your preferred platform (e.g., Laravel Forge, Vercel, or VPS).

---

## 🔮 Planned Enhancements

- 💾 Persist boards and tasks to database via Inertia POST/PUT
- 🧍‍♂️ User avatars, assignees & tags
- 🏷️ Priority and deadline tracking
- 🔔 Task notifications
- 🧭 Board sharing & collaboration features

---

## 🧑‍💻 Author

**Abdeljalil Tallab (Strange970)**  
Fullstack Developer | Passionate about Laravel, React, and modern web engineering  
📬 *Open to collaboration and new opportunities.*

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.
