# Quiz Application

## Project

### 1 - System Requirements

#### 1. Functional Requirements

**Admin Management:**
- Allow admin to securely log in to access the quiz system.
- Enable admin registration and only can create 1 account .

**Quiz Management:**
- Allow admins to create, edit, and delete quiz questions and manage quiz timers.
- Provide a list of questions, options, and the correct answer for each question.
- Enable quiz questions to have a set timer.

**Quiz Participation:**
- Allow users to participate in quizzes with time limits and only with the username.
- Display one question at a time, with multiple-choice options.
- Provide the ability to review and change answers before submitting the quiz.


**Result Management:**
- Automatically calculate the score once the quiz is submitted based on correct answers.
- Show the final score to the user after the quiz ends.
- Allow users to view their result .

**Scoreboard and Statistics:**
- Display real-time scoreboard with user ranks based on quiz scores.
- Provide statistics such as total participants, average score, highest and lowest scores, and score distribution.


#### 2. Non-Functional Requirements

**Security:**
- Ensure secure user authentication with encryption for data transmission and storage.
- Implement input validation and sanitization to prevent SQL injections and XSS attacks.
- Use secure cookie-based authentication for user sessions.

**Performance:**
- The application should have quick response times (less than 2 seconds for page loads).
- Efficiently handle multiple concurrent quiz sessions.

### 2 - System Design

#### 1. Architecture

The system follows a client-server architecture with the **React** frontend, **Node.js/Express** backend, and a **MongoDB** database. **Socket.IO** is used for real-time quiz updates and scoreboard management.

#### 2. Database Design

**Entity-Relationship:**
- **Users**: Store information about admin .
- **Questions**: Contains the quiz questions, options, and correct answers.
- **Results**: Stores quiz results with the username, score, and timestamp.
- **Timers**: Manages the start and end time for each quiz session.

#### 3. API Endpoints

**Authentication Endpoints:** 
- POST /register: Register a The only admin.
- POST /login: Admin login.

**Question Management Endpoints:**
- POST /question: Add a new question (Admin only).
- GET /question/{quizId}: Get all questions for a quiz.
- PATCH /question/{id}: Update question by ID (Admin only).
- DELETE /question/{id}: Delete question by ID (Admin only).

**Result Management Endpoints:**
- POST /result: Submit quiz answers and generate a result.
- GET /result: Get all quiz results (Admin only).
- GET /result/{userId}: Get a user's quiz result history.
- GET /result/statistics Get all statistics.


**Timer Endpoints:**
- POST /timer: Set a timer for a quiz (Admin only).
- GET /timer: Get the active timer for the quiz.
- DELETE /timer: Remove the active timer (Admin only).
