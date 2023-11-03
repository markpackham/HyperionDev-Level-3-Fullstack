# Todo List

It includes the following:

- Bootstrap is used for modals and styling and included via the React Bootstrap UI library
- Concurrently so a simple "npm start" will install all modules and run the app at the same time
- Cors is added to prevent issues with both frontend and backend running locally
- DOMPurify is used to remove malicious code injections when dealing with forms
- Express to run as the backend server
- Formik for form validation feedback
- Jsonwebtoken to identify users and their access rights
- Nodemon to save the dev from having to constantly restart the server after changes
- React is used for the frontend created via Vite
- React Router Dom for site navigation
- Sweetalert2 for better looking alert messages
- Yup for form validation checks


## App Purpose

Demo use of JMT with access to a todo list.


## Requirements

Code was written in Node.JS version 21. Node should be at the very least version 18.



## Check node version

```
node --version
```

### Install Dependencies & Run

Frontend and Backend code is kept apart to make it easier to understand

#### First from within this directory start the Express backend
```
cd backend
npm start
```

#### Second from within this directory start the React frontend
```
cd backend
npm start
```