import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/database";

import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import Blog_Item from "../components/Home/Blog_Item";
import Category from "../components/Home/category";
import { Container, Loader } from "../components";
import { month } from "../data";

const categories = ["All"];


const Newhome = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currCategory,setCurrCategory] = useState("All");

  // Fetching All Posts && getting categories
  useEffect(() => {
    appwriteService.getAllPosts().then((posts) => {
      if (posts) {
        // getting the categories
        posts.documents.map((post) => {
          const categoryFound = categories.find(
            (category) =>
              category.toLocaleUpperCase() == post.category.toLocaleUpperCase()
          );
          if (!categoryFound) categories.push(post.category);
        });
        setPosts(posts.documents);
        setLoader(false);
      }
    });
  }, []);

  
  // Logic for filtering posts based on category
  function categoryHandler(category) {
    setCurrCategory(category);
    const filteredPosts = posts.filter((post) => post.category == category);
    if (category != "All") setFilteredPosts(filteredPosts);
    else setFilteredPosts(posts);
  }
  
  if (loader) {
    return <Loader />;
  }
  return (
    <div className="w-full">
      <Container>
        <div className="parent flex gap-5 flex-col-reverse md:flex-row">
          <div className="home-left w-full md:w-[70%] min-h-96  md:border-r-[2px] border-gray-900 pe-5">
            <div className="w-full border-b-[1px] py-2 mb-3 border-gray-900 uppercase">
            <Heading>{currCategory}</Heading>
            </div>
            {filteredPosts.length > 0
              ? filteredPosts.map((post) => {
                  const newdate = new Date(post?.$createdAt);
                  return (
                    <Blog_Item key={post.$id} newdate={newdate} post={post} />
                  );
                })
              : posts.map((post) => {
                  const newdate = new Date(post?.$createdAt);
                  return (
                    <Blog_Item key={post.$id} newdate={newdate} post={post} />
                  );
                })}

            {posts.length == 0 && (
              <h2 className="text-3xl w-full font-semibold text-center">
                No Posts To Show
              </h2>
            )}
          </div>

          <div className="home-right w-full md:w-[30%]  ">
            <div className="top">
              <div className="my-3">
              <Heading>Available  Categories</Heading>
              </div>
              <div className="flex gap-3 flex-wrap">
                {categories.map((category, i) => (
                  <span
                    key={i}
                    onClick={() => {
                      categoryHandler(category);
                    }}
                  >
                    <Category>{category}</Category>
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden md:block bottom">
              <div className="my-3">
              <Heading>Trending</Heading>
              </div>
              {
                posts.slice(3).map(post => {
                  const newdate = new Date(post?.$createdAt)
                  return (
                    <Link to={`/post/${post.$id}`} className="" key={post.$id}>
                    <div className="flex gap-3 items-center border-b-[1px] border-gray-300 py-3">
                      <div className="left">
                        <img
                          src={appwriteService.getFilePreview(post?.featuredImage)}
                          className="w-24 h-16 shadow-sm object-cover"
                          alt=""
                        />
                      </div>
                      <div className="right w-full">
                        <div className="flex gap-3">
                          <p className="text-[0.7rem] font-mono capitalize">{post.userName}</p>
                          <p className="text-[0.7rem]">
                            {month[newdate?.getMonth()]} {newdate?.getDate()},
                            {newdate?.getFullYear()}
                          </p>
                        </div>
                        <h3 className="mt-2 font-semibold text-[0.8rem] capitalize">{post?.title}</h3>
                      </div>
                    </div>
                    </Link>
                  )
                })
              }
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Newhome;
