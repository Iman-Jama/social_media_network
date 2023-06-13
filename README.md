# <u>**Social Media Backend**</u>

 <a href="https://www.mit.edu/~amini/LICENSE.md" alt="MIT License">
      <img src="https://img.shields.io/bower/l/css" /></a> 

## <u>Contents</u>
- [About](#About)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Routes](#routes)
- [Contact Me](#contact-me)

## <u>About</u>

This project is a backend implementation for a social media website using Express.js, Node.js, and Mongoose. It provides a set of routes to handle users, thoughts, and reactions. The backend API can be tested using tools like Insomnia.

## <u>Technologies Used</u>
-**Express.js**: Fast and minimalist web framework for Node.js<br>
-**Node.js**: JavaScript runtime environment<br>
-**Mongoose**: MongoDB object modeling tool<br>

## <u>Getting Started</u>
To get started with the project, follow these steps:<br>

Clone the repository: git clone <repository_url><br>
Install the dependencies: ```npm i expressJS && Mongoose```
Start the server: ```node index.js```<br>

## <u>Routes</u>

### **User Routes**
```GET /api/users: Get all users```<br>
```GET /api/users/:id: Get a single user by ID```<br>
```POST /api/users: Create a new user```<br>
```PUT /api/users/:id: Update a user by ID```<br>
```DELETE /api/users/:id: Delete a user by ID.```<br>

### **Thoughts Routes**
```GET /api/thoughts: Get all thoughts```<br>
```GET /api/thoughts/:id: Get a single thought by ID```<br>
```POST /api/thoughts: Create a new thought```<br>
```PUT /api/thoughts/:id: Update a thought by ID```<br>
```DELETE /api/thoughts/:id: Delete a thought by ID```<br>

### **Reactions Routes**
```POST /api/thoughts/:thoughtId/reactions: Create a new reaction for a thought```<br>
```DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Delete a reaction from a thought```<br>

## <u>Contact Me</u>

My github is: [iman-jama](https://github.com/iman-jama) <br>
My email is : iman.jama891@gmail.com

© IMAN JAMA 2023