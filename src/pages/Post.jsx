import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/database";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;


  useEffect(() => {
    if (slug) {
      appwriteService.getSinglePost(slug).then((SinglePost) => {
        if (SinglePost) setPost(SinglePost);
        else navigate("/");
      });
    } 
    else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };


  
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex items-center flex-col mb-4 relative  rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post?.featuredImage)}
            alt={post.title}
            className="rounded-xl w-[400px] h-[400px] object-cover"
          />

          {isAuthor && (
            <div className="absolute right-[200px] top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button  className="mr-3 bg-green-900">
                  Edit
                </Button>
              </Link>
              <Button className="bg-red-900" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
          <h1 className="text-2xl font-bold mt-5 mb-2">{post.title}</h1>
        <div className="browser-css">{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  ) : null;
};

export default Post;
