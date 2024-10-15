import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/database"

const EditPost = () => {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();




  useEffect(() => {
    if (slug) {
      appwriteService.getSinglePost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);


  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
