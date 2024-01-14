# Quiz App

# Tech Stack Used: ReactJs

## Overview

Welcome to my Quiz App!. It's a quiz application that allows users to test their knowledge on various topics through a timed quiz.

### Approach to the Problem

1. **Start Page:** Created a start page where users enter their email. Implemented regex validation for email input.
2. **Quiz Page:** 
- Developed the main quiz page featuring a 30-minute countdown timer.
- Included a section on the left with all question numbers.
- Each question number indicates whether the user has visited or attempted that question.
- Implemented different background colors for question numbers based on user activity.
  - **Visited Questions:** Marked with a distinct background color.
  - **Attempted Questions:** Highlighted with another background color.

Explanation regarding the color codes is available at the bottom of the quiz page for user reference.

3. **Responsive Design:** Ensured the app is responsive to various screen sizes.
4. **Report Page:** Displayed the final score, all questions, user answers, and correct answers. Added a "Try Again" button to restart the quiz.

### Components

1. **Start Page:** Accepts the user's email and validates it.
2. **Quiz Page:** Displays questions, options, and a countdown timer.
3. **Report Page:** Shows the final score and detailed results.

### Installation

1. Clone the repository: `git clone https://github.com/Hariom510/Quiz-App.git`
2. Navigate to the project folder: `cd Quiz-App`
3. Install dependencies: `npm install`
4. Start the app: `npm start`

### Assumptions Made

**API Limitation:**
- Due to issues with the provided API, which responded with a status code 429 (Too Many Requests), indicating that the rate limit imposed by the API server was exceeded.
- To overcome this limitation, the application stores the quiz results locally in the `QuizData.js` file present inside the src folder of Quiz-App.
- The stored data in `QuizData.js` maintains the structure of the API, ensuring compatibility with the original intended functionality.

### Challenges Faced

The main challenge was implementing the countdown timer, for which I referred to external resources on YouTube.

### Live Demo

[Quiz App Live Demo](https://hariomquizapp.netlify.app/)

### Video Preview

[Watch Video Preview](https://www.loom.com/share/ca190f001fdd4be687a1d2a5d4cce105?sid=05bd1626-39ad-485e-b773-0c9a449c4557)

### Screenshots

![Screenshot (438)](https://github.com/Hariom510/Quiz-App/assets/85151795/b127005d-93b7-4105-94ca-8e9ef545efc4)

![Screenshot (440)](https://github.com/Hariom510/Quiz-App/assets/85151795/b35e6620-1cd3-4e62-9dde-253c28030417)

![Screenshot (441)](https://github.com/Hariom510/Quiz-App/assets/85151795/df9c9ba6-db48-42f9-98dd-6af14766b4ec)
