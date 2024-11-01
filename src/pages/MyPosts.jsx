import React, { useEffect, useState } from "react";
import appwriteWriteServices from "../appwrite/database";
import { Container, Loader, Postcard } from "../components";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);


  // Getting posts of logged In User
  useEffect(() => {
    appwriteWriteServices.getAllPostOfCurrentUser().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setLoader(false);
      }
    });
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <Container>
        <div className="w-full flex flex-wrap gap-3 justify-center sm:justify-start">
          {posts.length > 0 ? (
            posts.map((post) => {
              const newdate = new Date(post?.$createdAt);
              return (
                <div key={post.$id} className="p-2 w-[300px]">
                  <Postcard {...post} newdate={newdate} />
                </div>
              )
            })
          ) : (
            <h2 className="text-3xl w-full font-semibold text-center">
              No Posts To Show
            </h2>
          )}
        </div>
      </Container>
    </div>
  );
};

export default MyPosts;
