import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/database";
import { Button, Container, Loader } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import extraServices from "../appwrite/otherFunc";
import Like from "../SVG/Like";
import { month } from "../data";

const Post = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(null);
  const [loader, setLoading] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const newdate = new Date(post?.$createdAt);
  const userData = useSelector((state) => state.auth.userData);
  // post ko userId and loggedIn userId match garyo bhane matra , the user can edit the post
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  // Fetching Post through slug
  useEffect(() => {
    if (slug) {
      appwriteService.getSinglePost(slug).then((SinglePost) => {
        if (SinglePost) {
          setPost(SinglePost);
          setLikes(SinglePost.likes);
          setLoading(false);
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  // Fetching all the comments related to current post
  useEffect(() => {
    extraServices.getCommentsOfPost(slug).then((commentsDoc) => {
      if (comments.length != commentsDoc.documents.length) {
        setComments(commentsDoc.documents);
      }
    });
  }, [comments]);

  const onSubmit = (data) => {
    const commentObj = {
      commentator: data.commentator,
      comment: data.comment,
      postId: slug,
    };

    extraServices.createComment(commentObj).then((comment) => {
      setComments((prev) => [
        ...prev,
        {
          commentator: data.commentator,
          comment: data.comment,
          postId: slug,
          $createdAt: new Date(),
        },
      ]);
    });

    reset({
      commentator: "",
      comment: "",
    });
  };
  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  const handleLike = () => {
    setLikes((prev) => prev + 1);
    extraServices.likePost({ postId: slug, likes: likes + 1 });
  };

  if (loader) {
    return <Loader />;
  }

  return post ? (
    <div className="py-8 w-full">
      <Container>
        <div className="w-full flex flex-col md:flex-row gap-5 border-b-[1px] border-gray-900 pb-4">
          <div className="left w-full md:w-[40%]">
            <img
              src={appwriteService.getFilePreview(post?.featuredImage)}
              alt={post.title}
              className="rounded-xl min-w-[300px] w-full h-[400px] object-cover"
            />
          </div>

          <div className="right w-full md:w-[55%] text-center md:text-start">
            <div className="flex gap-3 font-mono w-full justify-center md:justify-start">
              <p className="text-[0.8rem] capitalize">
                Author : {post.userName}
              </p>
              <p className="text-[0.8rem]">
                {month[newdate?.getMonth()]} {newdate?.getDate()},
                {newdate?.getFullYear()}
              </p>
            </div>

            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-3">
              {post.title}
            </h3>
            <span className="browser-css text-gray-700">
              {parse(post.content)}
            </span>
            <div className="flex items-center gap-4 w-full justify-center md:justify-start">
              <button className="my-2 px-2 bg-[#F0F0F0] border-[1px] text-[0.9rem] font-serif rounded-lg capitalize text-blue-600">
                {post.category}
              </button>
              <div className="flex items-center">
                <Like />
                <p className=" px-1  text-[0.7rem]  font-bold">{likes}</p>
              </div>
            </div>

            {isAuthor && (
              <div className="my-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="mr-3 bg-green-600">Edit</Button>
                </Link>
                <Button className="bg-red-600" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
            <button
              onClick={handleLike}
              className="mr-3 px-5 py-2 rounded-md border-2 border-gray-900"
            >
              Like
            </button>
          </div>
        </div>

        <h3 className="text-5xl font-serif my-9 text-center">
          Comments Section
        </h3>
        <div className="flex gap-5 flex-col md:flex-row">
          <div className="left w-full md:w-[40%] md:border-r-[1px]  pr-4 border-gray-900 ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full mt-4 gap-3"
            >
              <input
                placeholder="Enter Commentator Name.."
                className="border-[2px] px-3 py-2"
                {...register("commentator", {
                  required: "Name of commentator is required",
                })}
              />
              {errors.commentator && (
                <p className="text-red-600 text-[0.8rem] m-0" role="alert">
                  {errors.commentator?.message}
                </p>
              )}

              <textarea
                placeholder="Comment..."
                rows={10}
                className="border-[2px] px-3 py-2"
                {...register("comment", { required: "Comment is required" })}
              ></textarea>
              {errors.comment && (
                <p className="text-red-600 text-[0.8rem] m-0" role="alert">
                  {errors.comment?.message}
                </p>
              )}
              <button className="bg-gray-900 text-white py-2 rounded-md">
                Create Comment
              </button>
            </form>
          </div>
          <div className="right  w-full md:w-[55%] ">
            {comments.length > 0 ? (
              comments.map((comment, i) => {
                const newdate = new Date(comment.$createdAt);
                return (
                  <div key={i} className="border-b-[1px] border-gray-300 p-3">
                    <div className="flex gap-3 font-mono">
                      <p className="text-[0.7rem] capitalize">
                        {comment.commentator}
                      </p>
                      <p className="text-[0.7rem]">
                        {month[newdate?.getMonth()]} {newdate?.getDate()},
                        {newdate?.getFullYear()}
                      </p>
                    </div>
                    <h4 className="text-xl">{comment.comment}</h4>
                  </div>
                );
              })
            ) : (
              <h3 className="text-3xl text-center w-full mt-10">
                No Comments To Show
              </h3>
            )}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
};

export default Post;

{
}
