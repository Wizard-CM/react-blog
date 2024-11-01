import { Client, Databases, Query, ID } from "appwrite";
import config from "../config/config";

class otherFunc {
  client = new Client();
  databases;
  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
      .setProject("67063d5c0003cd312df2"); // Your project ID

    this.databases = new Databases(this.client);
  }

  async createComment({ commentator, comment, postId }) {
    try {
      return await this.databases.createDocument(
        config.appWriteDatabaseId, // databaseId
        config.appWriteCommentCollectionId, // collectionId
        ID.unique(), // documentId
        { commentator, comment, postId } // data
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getCommentsOfPost(postId) {
    try {
      return await this.databases.listDocuments(
        config.appWriteDatabaseId, // databaseId
        config.appWriteCommentCollectionId, // collectionId
        [Query.equal("postId", postId)] // queries (optional)
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async likePost({ postId, likes }) {
    try {
      await this.databases.updateDocument(
        config.appWriteDatabaseId, // databaseId
        config.appWriteCollectionId, // collectionId
        postId, // documentId
        {
          likes,
        } // data (optional)
      );
    } catch (error) {}
  }
}

const extraServices = new otherFunc();
export default extraServices;
