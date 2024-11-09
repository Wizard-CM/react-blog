import React, { useEffect, useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UnderlineOnHover from "../HoverElement";
import Menu from "../../SVG/Menu";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const [sideBar, setSideBar] = useState(false);


  useEffect(() => {
    window.addEventListener("resize",(e) => {
        if(window.screen.width > 640) setSideBar(false);
    })
  },[])

  // slug represents URL

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    // {
    //   // Jaba authStatus is logged in , taba matra this field will be shown
    //   name: "Allposts",
    //   slug: "/all-posts",
    //   active: authStatus,
    // },
    {
      // Jaba authStatus is logged in , taba matra this field will be shown
      name: "Myposts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      // Jaba authStatus is logged in , taba matra this field will be shown
      name: "Addpost",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="relative w-full border-[1px] border-gray-300 mb-4">
      <Container>
        <nav className="flex items-center justify-between py-8 gap-4">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Links */}
          <ul className="hidden sm:flex links gap-2">
            {navItems.map((navItem) => {
              return navItem.active ? (
                <NavLink
                  key={navItem.name}
                  to={navItem.slug}
                  className={({ isActive }) =>
                    `px-4 py-1  text-white rounded-full ${
                      isActive ? "bg-gray-600" : "bg-gray-900"
                    }`
                  }
                >
                  {/* <UnderlineOnHover navItem={navItem} /> */}
                  {navItem.name}
                </NavLink>
              ) : null;
            })}

            {/* Conditional Rendering of logout button */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          <div
            className="fixed top-9 right-8 z-[13] sm:hidden"
            onClick={() => {
              setSideBar((prev) => !prev);
            }}
          >
            <Menu />
          </div>


            <div className={`menu bg-white fixed z-[12] h-full w-[200px] top-0 flex ${sideBar ? "right-0":"-right-[100%]"} shadow-lg transition-all
            duration-500 ease-in-out`}>
              <ul className="flex flex-col links gap-2 px-5 w-full pt-24">
                {navItems.map((navItem) => {
                  return navItem.active ? (
                    <NavLink
                      key={navItem.name}
                      onClick={() => {
                        setSideBar((prev) => !prev);
                      }}
                      to={navItem.slug}
                      className={({ isActive }) =>
                        `  w-full border-b-[1px] py-3 border-gray-700`
                      }
                    >
                      {/* <UnderlineOnHover navItem={navItem} /> */}
                      {navItem.name}
                    </NavLink>
                  ) : null;
                })}

                {/* Conditional Rendering of logout button */}
                {authStatus && (
                  <li className="w-full border-b-[1px] py-3 border-gray-700">
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
