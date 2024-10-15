import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/database";
import { Container, Loader, Postcard } from "../components";
import UnderlineOnHover from "../components/HoverElement";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    appwriteService.getAllPosts().then((posts) => {
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
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap gap-3">
          {posts.length > 0 ? (
            posts.slice(0, 3).map((post) => (
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
          {posts.length > 3 && (
            <h3 className="w-full">

              <Link className="font-semibold text-xl inline-block w-full text-right" to="/all-posts">More Posts...</Link>
            </h3>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;
