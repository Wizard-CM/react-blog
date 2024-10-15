# Appwrite auth.js
1. createAccount
2. login
3. logout
4. getCurrentUser

# Appwrite database.js
// post related

# redux authslice
1. login : updates the global state
2. logout : updates the global state

//---------------------------------------------------------------------------------------------------------------------------------------//
# what is a session ?
-> In Appwrite, a "session" represents a period in which a user is authenticated and has access to your application. When you're using the Appwrite SDK in your React application, a session is created when a user logs in. This session helps manage the user's authentication state, meaning the user won't need to log in again each time they access the app during this period.


# login functionality
-> appwrite login-handler will return a session of logged-In user --> session contains the "UserID" of new user , 
-> and now tyo "UserId" ko through , I will call the getCurrentUser fn of authFile.
-> now , I will get the user's information.


# signup functionality
-> It will create the user and returns the created user.


# Work Done
0. database mah bucket setup for uploading-post and deleting-post
1. Redux setup -> authslice -> login and logout reducer functions.
2. App.jsx file load hune bittikai , database check if user -->  logged in or not --> acc to it login || logout reducer functions are called.
3. Components are designed

//---------------------------------------------------------------------------------------------------------------------------------------//

# react-router  leh error dirako cha

# confused with input-component
# confused with select-component
# authLayout component mah confusion
# post-form wala component kei bujena ( once more : https://youtu.be/-6LvNku2nJE?si=EcY2IWeddoIGktkA)

# controller in react-hook-form

// what does form's control mean ?

# To remember : how navItems are displayed Conditionally ?
# navlinks lai conditionally render garnu paryo and navlinks ko corresponding page lai pani conditionally render garnu paryo.
# navlinks ko pages lai conditionally render garna "authLayout" component is used as a wrapper. 


//---------------------------------------------------------------------------------------------------------------------------------------//

# cors integration in my application thorugh appwrite 
# cors bhanne bittikai , backend ko part mah major fixes huncha