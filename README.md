
# Portfolio Platform Using Node.js

## Table of Contents

1. [Project Description](#project-description)
2. [Features](#features)
3. [Setup Instructions](#setup-instructions)
4. [API Endpoints](#api-endpoints)
5. [Authentication & Authorization](#authentication--authorization)
6. [Role-Based Access Control](#role-based-access-control)
7. [Portfolio Management](#portfolio-management)
8. [API Integrations](#api-integrations)
9. [Design Decisions](#design-decisions)
10. [Screenshots](#screenshots)
11. [Credits](#credits)

---

## Project Description

This project is a portfolio platform built using **Node.js**, **Express**, and **MongoDB**, allowing administrators and editors to manage portfolio items effectively. Users can register, log in, and perform actions based on their roles. Admins have full control over the platform, while editors have restricted access.

---

## Features

- **Authentication & Authorization**:
  - Secure user registration and login with hashed passwords.
  - Two-factor authentication (2FA) setup using an authenticator app.
  - Role-based access control (admin and editor).

- **Portfolio Management**:
  - Admins can create, update, and delete portfolio items.
  - Editors can only create items.

- **API Integration & Visualization**:
  - Integration with two third-party APIs.
  - Data visualization using charts and graphs.

- **Notifications**:
  - Welcome email upon registration.
  - Email notifications for specific events.

- **Responsive Design**:
  - Fully responsive UI built with **EJS** and **CSS**.

---

## Setup Instructions

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (Ensure IP access from any location)
- **npm** (Package Manager)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and configure the following:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/portfolio_project
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Visit the application:
   ```
   http://localhost:3000
   ```

---

## API Endpoints

### Authentication

| Method | Endpoint       | Description           |
|--------|----------------|-----------------------|
| POST   | `/auth/login`  | User login            |
| POST   | `/auth/register` | User registration     |
| GET    | `/auth/logout` | User logout           |

### Portfolio Management

| Method | Endpoint                 | Description                    |
|--------|--------------------------|--------------------------------|
| GET    | `/admin/images`          | Fetch portfolio items          |
| POST   | `/admin/images`          | Add a new portfolio item       |
| POST   | `/admin/images/delete/:id` | Delete a portfolio item (admin)|

---

## Authentication & Authorization

1. **Registration**:
   - Users provide email, password, first name, last name, age, and gender.
   - Passwords are securely hashed using **bcrypt**.
   - A welcome email is sent upon successful registration.

2. **Login**:
   - Validates email and password.
   - If 2FA is enabled, the user must provide a valid code.

3. **Role-Based Access**:
   - **Admin**: Full access to create, update, and delete items.
   - **Editor**: Restricted to creating items.

---

## Portfolio Management

- Each portfolio item includes:
  - Three images in a carousel.
  - Title, description, and timestamps for creation and update.
- Admin users can manage all items.
- Editors can add items but cannot edit or delete them.

---

## API Integrations

1. **Financial Data**:
   - Displays financial trends using real-time data.
   - Interactive charts provide insights.

2. **News API**:
   - Shows recent news updates related to the portfolio's theme.

---

## Design Decisions

- **Modular Code Structure**:
  - Separate routes, models, and controllers for scalability.
- **Security**:
  - Used **bcrypt** for hashing passwords.
  - Implemented session cookies for secure user sessions.
- **Responsive Design**:
  - User-friendly interface for both mobile and desktop users.

---

## Screenshots

### 1. Registration Page

![Registration Page](path_to_screenshot)

### 2. Login Page

![Login Page](path_to_screenshot)

### 3. Portfolio Page

![Portfolio Page](path_to_screenshot)

### 4. Admin Panel

![Admin Panel](path_to_screenshot)

---

## Credits

- Developed by: **[Your Name]**
- Group: **[Your Group]**
- Contact: **[Your Email]**
- Frameworks and Tools: **Node.js**, **MongoDB**, **Express**, **Nodemailer**

--- 
