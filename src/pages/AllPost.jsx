import React, { useEffect, useState } from "react";
import { Container, Loader, Postcard } from "../components";
import services from "../appwrite/database";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {}, []);
  services.getAllPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
      setLoader(false);
    }
  });

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap gap-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.$id}
                className="p-2 w-[32%] border-[1px] border- border-dotted"
              >
                <Postcard {...post} />
              </div>
            ))
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

export default AllPost;
