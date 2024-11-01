
// Production grade approach
// This is done , so that the env varibles are always declared in a string format
const config = {
    appWriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appWriteCommentCollectionId:String(import.meta.env.VITE_APPWRITE_COMMENT_COLLECTION_ID)
}

export default config;
