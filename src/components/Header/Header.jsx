import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UnderlineOnHover from "../HoverElement";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  // const navigate = useNavigate();

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
    {
      // Jaba authStatus is logged in , taba matra this field will be shown
      name: "AllPosts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      // Jaba authStatus is logged in , taba matra this field will be shown
      name: "AddPost",
      slug: "/add-post",
      active: authStatus,
    },
  ];


  return (
    <header className="w-full border-b-[1px] border-gray-600">
      <Container>
        <nav className="flex items-center justify-between h-28">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          {/* Links */}
          <ul className="links flex gap-10">
            {navItems.map((navItem) => {
              return navItem.active ? (
                <li key={navItem.name}>
                   <UnderlineOnHover navItem={navItem} />
                </li>
              ) : null;
            })}

            {/* Conditional Rendering of logout button */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
