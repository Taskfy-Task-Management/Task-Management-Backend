<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Task Management Backend

This is the backend service for the Task Management application, built using **NestJS**, **Prisma ORM**, and **MySQL**. It provides APIs for managing tasks, projects, user authentication, and watchlists.

---

## Features

- User Authentication (Register, Login)
- Project Management (Create, Read, Update, Delete Projects)
- Task Management (Add, Retrieve, Delete Tasks by Project)
- Watchlist Management (Add and Remove Tasks from Watchlist)

---

## Prerequisites

Before running the project, ensure the following are installed on your device:

1. **Node.js** (v16 or later)
   - Download and install from [Node.js Official Site](https://nodejs.org/).
2. **npm** (comes with Node.js) or **yarn**
3. **MySQL**
   - Install MySQL and ensure it is running. Refer to [MySQL Installation Guide](https://dev.mysql.com/doc/refman/8.0/en/installing.html).
4. **Git** (optional, for cloning the repository)
   - Download from [Git Official Site](https://git-scm.com/).

---

## Installation

Follow these steps to set up the backend service:

### 1. Clone the Repository

```bash
# Clone the repository
$ git clone https://github.com/Taskfy-Task-Management/task-management-backend.git

# Navigate into the backend directory
$ cd task-management-backend
```

### 2. Install Dependencies

Run the following command to install all required Node.js dependencies:

```bash
$ npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root and configure it with your database and application settings:

```env
DATABASE_URL="mysql://<username>:<password>@localhost:3306/task_management"
JWT_SECRET="your-jwt-secret-key"
```

Replace `<username>` and `<password>` with your MySQL credentials.

### 4. Initialize the Database

1. Run Prisma migrations to set up the database schema:

   ```bash
   $ npx prisma migrate dev --name init
   ```

2. Verify the database is set up correctly:

   ```bash
   $ npx prisma studio
   ```

   This will open Prisma Studio in your browser, where you can view and manage the database.

---

## Running the Application

Start the backend server:

```bash
$ npm run start:dev
```

The server will start at `http://localhost:3000` by default.

### Testing the API

Use tools like **Postman** or **cURL** to interact with the APIs. Here are some example endpoints:

- **Register a User**:
  ```
  POST /auth/register
  Body: { "name": "John", "email": "john@example.com", "password": "password123" }
  ```

- **Login**:
  ```
  POST /auth/login
  Body: { "email": "john@example.com", "password": "password123" }
  ```

- **Create a Project**:
  ```
  POST /projects
  Body: { "name": "Project 1", "description": "First project", "userId": 1 }
  ```

Refer to the **Routes and API Documentation** section for more details.

---

## Directory Structure

```plaintext
task-management-backend/
├── src/
│   ├── auth/               # Authentication module
│   ├── prisma/             # Prisma database service
│   ├── projects/           # Projects module
│   ├── tasks/              # Tasks module
│   ├── watchlist/          # Watchlist module
│   └── main.ts             # Application entry point
├── prisma/
│   ├── schema.prisma       # Prisma schema
├── .env                    # Environment variables (not committed)
├── package.json            # Project metadata and dependencies
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

---

## Deployment

### 1. Production Build

To build the project for production, run:

```bash
$ npm run build
```

The build output will be in the `dist` folder.

### 2. Running the Built Application

Run the built application using:

```bash
$ npm run start:prod
```

---

## Troubleshooting

1. **Database Connection Issues**:
   - Ensure MySQL is running and the credentials in `.env` are correct.
   - Test the connection using a MySQL client.

2. **Port Conflicts**:
   - If `localhost:3000` is already in use, change the port in `src/main.ts`:
     ```typescript
     await app.listen(4000);
     ```

3. **Dependency Errors**:
   - Run `npm install` to ensure all dependencies are installed.
   - Clear npm cache and reinstall:
     ```bash
     $ npm cache clean --force
     $ npm install
     ```

---

## Contributing

If you'd like to contribute to this project:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For questions or support, contact:
- **Author**: Ihab Faour
- **Email**: iaf08@mail.aub.edu
