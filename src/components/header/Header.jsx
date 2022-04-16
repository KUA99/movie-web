import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Movie,
  LiveTv,
  PlaylistAddCheck,
  SearchOutlined,
  AccountCircle,
  Menu,
  Close,
} from "@material-ui/icons";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";

import { setUserLogin, setUserLogOut } from "../../features/user/userSlice";
import { auth } from "../../firebase/firebase";
import "./header.scss";
import logo from "../../assets/img/logoheader.png";
import { category } from "../../api/theMovieDBApi";

const headerNavList = [
  {
    title: "Home",
    path: "/",
    icon: <Home className="nav-icon" />,
  },
  {
    title: "Movies",
    path: "/movie",
    icon: <Movie className="nav-icon" />,
  },
  {
    title: "TV Series",
    path: "/tv",
    icon: <LiveTv className="nav-icon" />,
  },
];

const Header = () => {
  const { pathname } = useLocation();
  let navigate = useNavigate();
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const searchBtn = useRef(null);

  const active = headerNavList.findIndex(
    (navItem) => navItem.path === pathname
  );

  const [keyword, setKeyword] = useState("");
  const [selectType, setSelectType] = useState("movie");
  const [isScroll, setIsScroll] = useState(false);

  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.name);
  const userEmail = useSelector((state) => state.user.email);
  const userPhoto = useSelector((state) => state.user.photo);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScroll(window.pageYOffset === 0 ? false : true);
    });
    //clean up
    window.removeEventListener("scroll", () => {
      setIsScroll(window.pageYOffset === 0 ? false : true);
    });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        saveUser(user);
      }
    });
  }, [userName]);

  const handleSearch = () => {
    if (keyword.trim().length > 0) {
      navigate(`/${category[selectType]}/search/${keyword}`);
      setKeyword("");
    }
  };

  const handleAuth = async () => {
    if (!userName) {
      try {
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider);
        const userInfo = res.user;
        saveUser(userInfo);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await signOut(auth);
        dispatch(setUserLogOut());
      } catch (error) {
        console.log(error);
      }
    }
  };

  const saveUser = (user) => {
    const action = setUserLogin({
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    });
    dispatch(action);
  };

  const handelShowSearchBar = () => {
    searchBtn.current.style.display = "block";
  };

  const handleShowMenu = () => {
    navRef.current.style.transform = "translateY(68px)";
  };

  const handleCloseMenu = () => {
    navRef.current.style.transform = "translateY(-200px)";
  };

  return (
    <div ref={headerRef} className={isScroll ? "header scroll" : "header"}>
      <div className="header-wrapper container">
        <div className="header-left">
          <Menu className="menu-icon" onClick={handleShowMenu} />
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Website logo" />
            </Link>
          </div>
          <ul className="nav" ref={navRef}>
            {headerNavList.map((navItem, index) => (
              <li
                key={index}
                className={active === index ? "nav-item active" : "nav-item"}
              >
                <Link to={navItem.path} className="header-nav-link">
                  {navItem.icon}
                  {navItem.title}
                </Link>
              </li>
            ))}
            <Close className="close-menu-btn" onClick={handleCloseMenu} />
          </ul>
        </div>
        <div className="header-right">
          <SearchOutlined
            className="show-search-btn"
            onClick={handelShowSearchBar}
          />
          <div className="search-container" ref={searchBtn}>
            <div className="select-wrapper">
              <select
                value={selectType}
                onChange={(e) => setSelectType(e.target.value)}
                name="type"
                id="type"
              >
                <option value="movie">movie</option>
                <option value="tv">TV series</option>
              </select>
            </div>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              type="text"
              placeholder="Enter some movie, series..."
            />
            <button className="search-btn" onClick={handleSearch}>
              <SearchOutlined className="search-btn-icon" />
            </button>
          </div>
          <div className="account-avatar">
            {!userName ? (
              <AccountCircle className="account-icon" />
            ) : (
              <img src={userPhoto} alt="user logo" className="account-image" />
            )}

            <span className="account-state" onClick={handleAuth}>
              {userName ? "log out" : "log in"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
