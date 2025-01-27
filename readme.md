# MyHTUSchedule

## Overview
MyHTUSchedule is a dynamic full-stack application designed to help HTU (Hussein Technical University) students track their progress in the upskilling program by managing course hours.

## Purpose
This project was created to address the need for a centralized system where students can:
- Track completed course hours
- Monitor remaining hours
- View course schedules
- Manage their upskilling program progress

## Tech Stack
### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

## Features
- **User Authentication**
  - Secure signup and signin using JWT
  - Protected routes for authenticated users

- **Course Management**
  - View all enrolled courses
  - Track hours completed per course
  - Dynamic progress calculation

- **Schedule Viewing**
  - Access course schedules
  - Time management tools

- **Progress Tracking**
  - Visual progress indicators
  - Hours completion status
  - Remaining hours calculator

## Installation

1. Clone the repository
```bash
git clone https://github.com/Anas-M-Ardah/HTU/tree/mySchedule
Install dependencies
BASH

cd mySchedule
npm install
Configure environment variables
BASH

# Create a .env file in the root directory and add:
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret
Run the application
BASH

npm start

Contributing
If you're a student at Hussein Technical University and want to contribute to this project, feel free to:

Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
Future Enhancements
Mobile application version
Integration with HTU's main system
Automated schedule generation
Peer progress comparison
Achievement system
Email notifications
Contact
Your Anas AlArdah - anas.m.ardah.email@gmail.com
