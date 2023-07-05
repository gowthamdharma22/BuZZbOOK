import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const menuRef = React.useRef(null);
  const navRef = React.useRef(null);

  const navClick = () => {
    if (menuRef.current.classList.contains("bx-x")) {
      menuRef.current.classList.remove("bx-x");
      navRef.current.classList.remove("active");
    } else {
      menuRef.current.classList.add("bx-x");
      navRef.current.classList.add("active");
    }
  };

  const handleClick = () => {
    toast("Adios, amigo!", {
      icon: "👋",
      duration: 1000,
      style: {
        color: "#101010",
        backgroundColor: "#f3ebeb",
        padding: "18px",
        fontSize: "15px",
      },
    });
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/");
  };

  return (
    <>
      <div className="nav">
        <div className="name">
          <img
            src="img/B (Black bg).png"
            alt="Logo"
            className="logo"
            width="100px"
          />
          <Link className="link-tit" to="/">
            {" "}
            BuZZbOOK
          </Link>
        </div>
        <div className="links">
          <div className="linkss" ref={navRef}>
            <Link className="link" to="/" onClick={navClick}>
              <i class="fi fi-br-home"></i> Home
            </Link>
            <Link className="link" to="/create" onClick={navClick}>
              <span id="plus">
                <i class="fa-regular fa-square-plus fa"></i>  
              </span>
               Create
            </Link>
            {!cookies.access_token ? (
              <Link className="link" to="/auth" onClick={navClick}>
                Login/Sign-up
              </Link>
            ) : (
              <>
                <Link className="link" to="/saved" onClick={navClick}>
                  <i class="fi fi-br-bookmark"></i> Saved
                </Link>
                <button className="nav-btn" onClick={handleClick}>
                  {" "}
                  Logout{" "}
                </button>
              </>
            )}
          </div>
        </div>
        <i
          className="bx bx-menu"
          id="menu"
          ref={menuRef}
          onClick={navClick}
        ></i>
      </div>
    </>
  );
}

export default Navbar;
