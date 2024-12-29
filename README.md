# LINKIT
<div align="center">
  <img src="./frontend/src/utils/images/header.png" alt="banner" />
</div>
<div align="center">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/priyamaggarwal18/Linkit?style=for-the-badge&color=green">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/priyamaggarwal18/Linkit?style=for-the-badge&color=green">
    <img alt="GitHub forks" src="https://img.shields.io/github/forks/priyamaggarwal18/Linkit?style=for-the-badge&color=green">
    <img alt="Last commit" src="https://img.shields.io/github/last-commit/priyamaggarwal18/Linkit?style=for-the-badge&color=green">
</div>

# 

**```Linkit```** is a feature-rich and user-friendly platform that simplifies sharing, shortening, and managing URLs. It provides robust analytics and seamless integrations, all within a clean, intuitive interface. Whether you're an individual looking to organize links or a business aiming to track engagement, Linkit offers everything you need in one place.

<br>

## Table of Contents

- [Key Features](#key-features)
- [How To Use this Project](#how-to-use-this-project)
- [Check Responsive](#check-responsive)
- [Concepts Used](#concepts-used)
- [Future Scope](#future-scope)

<br>

## Key Features

- **Custom Dashboard**: Generate a personalized dashboard displaying all your links and associated analytics in one place.
- **Link Generation**: Easily create and manage all your links after registering and signing in to your account.
- **Analytics Dashboard**: Track clicks, referrers, and geolocation data for each link.
- **User Authentication**: Login and signup functionality with secure data handling using local storage.
- **Link Management**: Edit, delete, and organize your links with ease.
- **Responsive Design**: Ensures a seamless experience across devices, from desktops to mobile phones.


<br>

## How to Use This Project

### Prerequisites:
- Make sure you have [Node.js](https://nodejs.org/en/) installed.
- A GitHub account to clone the repository.
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account to set up the database.
- (Optional) A text editor like [VS Code](https://code.visualstudio.com/).

### Steps to Get Started:

1. **Clone the Repository:**
   Open your terminal and run the following command:
   ```bash
   git clone https://github.com/priyamaggarwal18/Linkit.git
   ```
   
2. **Navigate to the Project Directory:**
   Once the repository is cloned, navigate to the project folder:
   ```bash
   cd Linkit
   ```
3. **Navigate to Frontend and Backend Folders:**
   Navigate to both `frontend` and `backend` directories individually and install dependencies by running:
   ```bash
   cd frontend
   npm install
   ```
   Then, in another terminal:
   ```bash
   cd backend
   npm install
   ```
4. **Run the Project:**
   Start both the frontend and backend servers by running:
   ```bash
   npm start
   ```
   The frontend will be available locally on `http://localhost:3000` and the backend on `http://localhost:8080`.


<br>

## Concepts Used

- **MERN Stack**: Utilized MongoDB for the database, Express.js for the backend, React for the frontend, and Node.js for the runtime environment.
- **Cloudinary Integration**: Integrated Cloudinary to manage and store images efficiently.
- **Multer Middleware**: Used Multer for handling file uploads in the backend.
- **React Environment Variables**: Configured React environment variables for secure and seamless integration.
- **Event Handling**: Managed user interactions like form submissions and button clicks to dynamically update the UI.
- **Responsive Design**: Built with CSS Grid and Flexbox to ensure optimal viewing on devices of all sizes.
- **Data Validation**: Ensured all URLs are valid and formatted correctly before being shortened.
- **Analytics Integration**: Provided basic insights into link performance directly within the app.



<br>

## Future Scope
To make **Linkit** even more versatile and user-friendly, the following features are planned:

- **User Profiles**: Allow users to customize their profiles with profile pictures and personal information.
- **Enhanced Security**: Implement token-based authentication for added security.
- **Advanced Analytics**: Provide in-depth insights like user behavior, click patterns, and heatmaps.
- **Tagging and Categorization**: Enable users to tag and organize their links for better management.
- **Team Collaboration**: Introduce features for teams to share and manage links collectively.
- **Browser Extensions**: Develop extensions for Chrome and Firefox to shorten links directly from the browser.

These enhancements aim to transform Linkit into a comprehensive tool for link management and analytics.

<br>



