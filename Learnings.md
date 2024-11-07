# Software Development Kit(SDK) of company ?
=> An SDK from a company provides all the tools, libraries, and resources you need to integrate that company's services into your software application
=> eg : When you install Appwrite in your React application using npm i appwrite, you're using the Appwrite SDK.

# Client
-> now to create connection between SDK installed in your application and the server of the company , Client method is used.
-> It creates a connection by providing the your project's private-keys.
-> Eg: by using Client method you are creating connection between , appwrite SDK and appwrite server.

This is the flow of using any SASS || BASS in your application


# Environment Varibles
-> env variables are those secret varibles which is not meant to be exposed publicly.
-> Incase of vite , env variables must be created in the root of the project, since it's the convention vite follows.


# what is a session ?
In Appwrite, a "session" represents a period in which a user is authenticated and has access to your application. When you're using the Appwrite SDK in your React application, a session is created when a user logs in. This session helps manage the user's authentication state, meaning the user won't need to log in again each time they access the app during this period.


# querying in appwrite database
-> you need to set the "indexes" property of the "attribute" through which you want to "query" your documents.


//--------------------------------------------------------------------------------------------------------------------------------------//

# login functionality : 
login garda, session created and returned from backend --> session contains userId --> through userId we can grab the user.

# signup functionality :
signup garda, new account is created and returned from the backend --> then manually login functionality is called, so that the signed up user don't need to login just after signing up.

# role of session in login and logout functionality :
Jaba login is done , a new session for that user is created --> Jaba logout is done , the session is deleted.


# protected routes : What is the functionality that it is providing ?

# class creation for appwrite related services

# try-catch for handling asyncronous operations
-> try-catch block will catch the "rejected-promise".
-> When an async function returns a rejected promise , it throws an exception && exeception is catched by the try-catch block.

# cors(cross origin resource sharing) integration in my application through appwrite 
cors bhanne bittikai , backend ko part mah major fixes huncha


