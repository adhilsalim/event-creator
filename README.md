# Event Creator

Event Creator is a web application developed as part of the IEEE SB AJCE WEB TEAM selection in 2021. This project allows users to create events, providing details such as event name, description, images, and tags. The application uses Firebase as the backend for data storage and management.

## Features

- Create and manage events.
- Add event details, including name, description, images, and tags.
- Store event data securely using Firebase.

## Getting Started

To set up and run the Event Creator project locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/adhilsalim/event-creator.git
   ```

2. **Firebase Configuration:**

   - Firebase credentials have been removed from the repository for security reasons.
   - You will need to specify your Firebase configuration in a file. Add your Firebase configuration details like this:

   ```javascript
   // firebaseConfig.js

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   export default firebaseConfig;
   ```

   Replace `YOUR_API_KEY`, `YOUR_AUTH_DOMAIN`, `YOUR_PROJECT_ID`, `YOUR_STORAGE_BUCKET`, `YOUR_MESSAGING_SENDER_ID`, and `YOUR_APP_ID` with your actual Firebase project credentials.

3. **Access the Application:**

   run the application using your personal live server.

## Technologies Used

- Firebase (Backend)
- HTML/CSS
- JavaScript


## Contact Information

If you have any questions, encounter issues, or would like to contribute to this project, please open up an issue.

---

[IEEE SB AJCE](https://ieeeajce.org/)
