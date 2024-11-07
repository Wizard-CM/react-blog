import {
  Client,
  Databases,
  Storage,
  Query,
  ID,
  Permission,
  Role,
} from "appwrite";
import config from "../config/config";
import authService from "./auth"

let id = 0;

class Services {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
      .setProject("67063d5c0003cd312df2"); // Your project ID

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status,category, userId,userName ,blurHash}) {
    try {
      return await this.databases.createDocument(
        config.appWriteDatabaseId, // databaseId
        config.appWriteCollectionId, // collectionId
        slug, // documentId
        {
          // data
          title,
          content,
          featuredImage,
          status,
          userId,
          category,
          userName,
          blurHash
        },
      );
    } catch (error) {
      console.log("Appwrite Service :" + error);
      // throw error;
      return false;
    }
  }

  async updatePost({ title, slug, content, featuredImage, status }) {
    try {
      await this.databases.updateDocument(
        config.appWriteDatabaseId, // databaseId
        config.appWriteCollectionId, // collectionId
        slug, // documentId
        {
          // data
          title,
          content,
          featuredImage,
          status,
        }
      );

      return true;
    } catch (error) {
      console.log("Appwrite Service :" + error);
      // throw error;
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appWriteDatabaseId, // databaseId
        config.appWriteCollectionId, // collectionId
        slug // documentId
      );

      // This will signify that the document is deleted
      return true;
    } catch (error) {
      console.log("Appwrite Service :" + error);
      // This will signify that the document is not deleted
      return false;
    }
  }

  async getSinglePost(slug) {
    try {
      return await this.databases.getDocument(
        config.appWriteDatabaseId, // databaseId
        config.appWriteCollectionId, // collectionId
        slug // documentId
      );
    } catch (error) {
      console.log("Appwrite Service :" + error);
      // throw error;
    }
  }

  async getAllPosts() {
    try {
      return await this.databases.listDocuments(
        config.appWriteDatabaseId, // databaseId
        config.appWriteCollectionId // collectionId
      );
    } catch (error) {
      console.log("Appwrite Service :" + error);
      // throw error;
    }
  }

  async getAllPostOfCurrentUser(){
    try {
      const userData = await authService.getCurrentUser();


     return await this.databases.listDocuments(
        config.appWriteDatabaseId, // databaseId
        config.appWriteCollectionId, // collectionId
        [Query.equal("userId", userData.$id)] // queries (optional)
    );
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  // Files related ( bucket-Photo )
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appWriteBucketId, // bucketId
        ID.unique(), // fileId
        file, // file
        [] // permissions (optional)
      );
    } catch (error) {
      console.log("Appwrite Service :" + error);
      return error;
    }
  }

  async deleteFile(fileID) {
    try {
      await this.bucket.deleteFile(
        config.appWriteBucketId, // bucketId
        fileID // fileId
      );

      return true;
    } catch (error) {
      console.log("Appwrite Service :" + error);
      return false;
    }
  }

   getFilePreview(fileID) {
    try {
      return this.bucket.getFilePreview(
        config.appWriteBucketId, // bucketId
        fileID // fileId
      );
    } catch (error) {
      console.log("Appwrite Service :" + error);
      return error;
    }
  }
}

const services = new Services();
export default services;
