import config from "../config/config";
import { Client, Account, ID } from "appwrite";

// Why is this format used for authentication ? why not the documentation format used ?
// -> If documentation wala format is used , then we need to use the logic in sign-up component && login-component.
// -> 1st reason == If we have to change the platform , from appwrite to firebase , then we just have to make changes in one file and
//     every thing else will be sorted. We don't have to go to multiple components to change the logiv.

// -> 2st reason == auth-ko-logic along with component-ko-jsx will be a little messy.

// React app mah install gareko appwrite rah appwrite server sanga connection banauna ko lagi "Client" is used.
// Account is used to for CRUD operations with the user.

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl) // Your API Endpoint
      .setProject(config.appWriteProjectId); // Your project ID

    this.account = new Account(this.client);
  }

  // Account creation

  // hitesh code
  //   async createAccount({ name, email, password }) {
  //     try {
  //       const user = await this.account.create(
  //         ID.unique(),
  //         email,
  //         password,
  //         name
  //       );

  //       if (user) {
  //         // call another method
  //         return this.login({email,password})
  //       } else return user;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  // My code && chatgpt code
  async createAccount({ name, email, password }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // Call another method to log in after successful account creation
      return this.login({ email, password });
    } catch (error) {
      console.log("Appwrite Error : " + error);
      // throw error;
    }
  }

  // login
  async login({ email, password }) {
    try {
      //   return await this.account.createEmailPasswordSession(email, password);
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite Error : " + error);
      // throw error;
    }
  }

  // get current user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite Error : " + error.message);
      // If I throw error, whole webstie will get halted
      // throw error;
    }
  }

  // logout
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Error : " + error);
      // throw error;
    }
  }
}

const authService = new AuthService();
export default authService;


