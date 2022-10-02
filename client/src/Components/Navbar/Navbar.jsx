import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  GoogleCircleFilled,
  SearchOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  InstagramFilled,
  LinkedinFilled,
  LoadingOutlined,
} from "@ant-design/icons";

import GoogleLogin from "react-google-login";

import ChangePassword from "../User/ChangePassword/ChangePassword";

import api from "../../api/index";

import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";

const token = localStorage.getItem("userToken");

const SignUpPhase = ({ closeModal, loginState, handleLoginState }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("/api/user/register", formData);
      localStorage.setItem("userToken", JSON.stringify(data.token));
      localStorage.setItem("userId", JSON.stringify(data.user._id));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    window.location.href = "/";
    // closeModal();
    // navigate("/")
  };

  
  const responseGoogle = async googleData => {
    // const res = await fetch("/auth/google", {
    //     method: "POST",
    //     body: JSON.stringify({
    //     token: googleData.tokenId
    //   }),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    try{
    const res = await api.post('/api/user/authgoogle',JSON.stringify({token: googleData.tokenId}))
    console.log(res)
    localStorage.setItem("userToken", JSON.stringify(res.token));
    localStorage.setItem("userId", JSON.stringify(res.user._id));
    }
    catch(error){
      console.log(error)
    }
    // store returned user somehow
  }


  const inputStyle =
    "bg-[#edf6ff] px-2 py-2 my-1 rounded-xl outline-none border-none hover:outline hover:outline-2 hover:outline-[#52ab98] focus:outline focus:outline-2 focus:outline-[#52ab98]";

  return (
    <div className="px-10">
      <form className="flex flex-col text-left text-black">
        <label className="mt-2 text-[#2b6777]" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          className={inputStyle}
          value={formData.email}
          onChange={handleChange}
        />
        <label className="mt-3 text-[#2b6777]" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          className={inputStyle}
          value={formData.name}
          onChange={handleChange}
        />
        <label className="mt-3 text-[#2b6777]" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          className={inputStyle}
          value={formData.password}
          onChange={handleChange}
        />
        <div
          className="w-1/2 px-2 mx-auto py-2 text-white hover:bg-[#d31717] bg-[#f30f0f] justify-center text-center mt-3 cursor-pointer"
          onClick={handleSignUp}
        >
          <div className="relative overflow-hidden hover:scale-125 transition-all duration-700">
            {loading ? <LoadingOutlined className="" /> : "Register"}
          </div>
        </div>
      </form>
      <div className="text-lg text-center mx-auto my-3 text-[#2b6777] font-semibold">
        OR
      </div>
      <a
        href
        className="mx-auto flex items-center justify-center space-x-2 px-2 py-1 bg-[#2b6777]  cursor-pointer"
      >
        <span className="text-white">Signup With Google</span>{" "}
        <GoogleCircleFilled className="text-3xl text-white" />
      </a>

      <GoogleLogin
        clientId="976666646942-a0sbfuafr7d1cpbgbs9m34ge0lev31nm.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />

      <div className="my-5">
        Already have an account?{" "}
        <button
          className="text-blue-600 hover:underline hover:underline-offset-2"
          onClick={handleLoginState}
        >
          Signin
        </button>{" "}
        here
      </div>
    </div>
  );
};

const SignInPhase = ({ handleLoginState }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignin = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("/api/user/login", formData);
      // console.log(data)
      // console.log(data.user);
      localStorage.setItem("userToken", JSON.stringify(data.token));
      localStorage.setItem("userId", JSON.stringify(data.user._id));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    window.location.href = "/";
    // closeModal();
    // navigate('/')
  };

    
  const responseGoogle = async googleData => {
    // const res = await fetch("/auth/google", {
    //     method: "POST",
    //     body: JSON.stringify({
    //     token: googleData.tokenId
    //   }),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    try{
    const res = await api.post('/api/user/authgoogle',JSON.stringify({token: googleData.tokenId}))
    console.log(res)
    localStorage.setItem("userToken", JSON.stringify(res.token));
    localStorage.setItem("userId", JSON.stringify(res.user._id));
    }
    catch(error){
      console.log(error)
    }
    // store returned user somehow
  }


  const handleForgotPassword = async () => {
    try {
      if (formData.email) {
        setLoading(true);
        await api.post("/api/user/forgot/password", { email: formData.email });
        setLoading(false);
      } else {
        alert("Please type your email..");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputStyle =
    "bg-[#edf6ff] px-2 py-2 my-1 rounded-xl outline-none border-none hover:outline hover:outline-2 hover:outline-[#52ab98] focus:outline focus:outline-2 focus:outline-[#52ab98]";

  return (
    <div className="px-10">
      <form className="flex flex-col text-left text-black">
        <label className="mt-3 text-[#2b6777]" htmlFor="name">
          Email
        </label>
        <input
          type="text"
          name="email"
          className={inputStyle}
          value={formData.email}
          onChange={handleChange}
        />
        <label className="mt-3 text-[#2b6777]" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          className={inputStyle}
          value={formData.password}
          onChange={handleChange}
        />
        <div
          className="mx-auto w-1/2 bg-[#f01616] hover:bg-[#d81331] cursor-pointer text-white px-2 py-2 text-center justify-center mt-3"
          onClick={handleSignin}
        >
          <div className="relative overflow-hidden hover:scale-125 transition-all duration-700">
            {loading ? <LoadingOutlined /> : "Login"}
          </div>
        </div>
      </form>
      <div className="text-lg text-center my-3 text-[#2b6777] font-semibold">
        OR
      </div>
      <div className=" mx-auto flex items-center justify-center space-x-2 px-2 py-1 bg-[#2b6777]  cursor-pointer">
        <span className="text-white">Signin With Google</span>{" "}
        <GoogleCircleFilled className="text-3xl text-white" />
      </div>
      
      <GoogleLogin
        clientId="976666646942-a0sbfuafr7d1cpbgbs9m34ge0lev31nm.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <div className="my-5">
        Don't have an account?{" "}
        <button
          className="text-blue-600 hover:underline hover:underline-offset-2"
          onClick={handleLoginState}
        >
          Signup
        </button>{" "}
        here
      </div>
      <div
        className="flex items-center justify-center text-blue-600 hover:underline cursor-pointer"
        onClick={handleForgotPassword}
      >
        Forgot Password
      </div>
    </div>
  );
};

const LoginModal = ({ signUp, handleSignUp }) => {
  const [loginState, setLoginState] = useState(false); // false means signup is active and true means signin is active

  const handleLoginState = () => {
    setLoginState(!loginState);
  };

  return (
    <Modal
      open={signUp}
      onClose={handleSignUp}
      center
      // closeIcon={""}
      // classNames={{
      //   overlayAnimationIn: 'customEnterOverlayAnimation',
      //   overlayAnimationOut: 'customLeaveOverlayAnimation',
      //   modalAnimationIn: 'customEnterModalAnimation',
      //   modalAnimationOut: 'customLeaveModalAnimation',
      // }}
      animationDuration={500}
    >
      <div className="relative overflow-hidden">
        {loginState === false ? (
          <SignUpPhase
            loginState={loginState}
            handleLoginState={handleLoginState}
            closeModal={handleSignUp}
          />
        ) : (
          <SignInPhase
            loginState={loginState}
            handleLoginState={handleLoginState}
            closeModal={handleSignUp}
          />
        )}
      </div>
    </Modal>
  );
};

const Navbar = () => {
  const [signUp, setSignUp] = useState(false);
  const [menuBtn, setMenuBtn] = useState(false);
  const [userBtn, setUserBtn] = useState(false);
  const [forgot, setForgot] = useState(false);

  const navigate = useNavigate();

  const handleUserBtn = () => {
    setUserBtn(!userBtn);
  };

  const handleMenuBtn = () => {
    setUserBtn(false);
    setMenuBtn(!menuBtn);
  };
  const handleSignUp = () => {
    setSignUp(!signUp);
  };

  const handleLogout = async () => {
    try {
      await api.get("/api/user/logout");
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const menuButton =
    "px-2 py-1 cursor-pointer hover:bg-[#52ab98] hover:text-white transition-all duration-200 rounded";

  const iconButton =
    "p-2 rounded-full hover:bg-white hover:text-[#2bb688] transition-all duration-700";

  return (
    <div className="">
      <div className="fixed z-50 w-full flex items-center justify-between px-10 py-3 bg-[#f2f2f2]">
        <div
          className="text-2xl flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUI5CZUdIrZtnJMrK7EQRp3tKeqW2nxNHJ3w&usqp=CAU"
            alt=""
            className="h-10 w-10 bg-black rounded-full border-2 border-[#2b6777]"
          />
          <span className="pl-3  font-semibold text-[#2b6777]">Blogsparks</span>
        </div>
        <div className="hidden sm:flex outline-none bg-white items-center">
          <SearchOutlined className="px-2 py-1 " />
          <input
            type="text"
            name="search_bar"
            className="outline-none px-2 py-1"
            placeholder="Search..."
          />
        </div>
        <ul className="hidden sm:flex space-x-5">
          <li
            className={menuButton}
            onClick={() => {
              navigate("/");
              setUserBtn(false);
            }}
          >
            Home
          </li>
          {!token ? (
            <li className={menuButton} onClick={handleSignUp}>
              SignIn/SignUp
            </li>
          ) : (
            <li className="px-2 py-1 space-x-5" onClick="">
              <span className={menuButton} onClick={handleUserBtn}>
                User
              </span>
              <span className={menuButton} onClick={handleLogout}>
                Logout
              </span>
            </li>
          )}
        </ul>
        {menuBtn ? (
          <MenuUnfoldOutlined
            className="sm:hidden text-3xl transition-all duration-200"
            onClick={handleMenuBtn}
          />
        ) : (
          <MenuFoldOutlined
            className="sm:hidden text-3xl tansition-all duration-1000"
            onClick={handleMenuBtn}
          />
        )}
        {
          <div
            className={`flex flex-col items-center sm:hidden w-3/4 z-50 h-screen bg-[#2b6777] shadow-2xl absolute ${
              menuBtn ? "right-0" : "-right-full"
            } top-16 transition-all duration-1000 sm:hidden text-white`}
          >
            <div className="flex flex-row my-4  outline-none text-black bg-white items-center">
              <SearchOutlined className="px-2 py-1" />
              <input
                type="text"
                name="serach_bar"
                className="outline-none px-2 py-1"
                placeholder="Search..."
              />
            </div>
            <ul className="text-xl">
              <li
                className={`my-2 ${menuButton}`}
                onClick={() => {
                  navigate("/");
                  handleMenuBtn();
                }}
              >
                Home
              </li>
              {!token ? (
                <li className={menuButton} onClick={handleSignUp}>
                  SignIn/SignUp
                </li>
              ) : (
                <li className="px-2 py-1 flex flex-col" onClick="">
                  <span className={menuButton} onClick={handleUserBtn}>
                    User
                  </span>
                  <span className={menuButton} onClick={handleLogout}>
                    Logout
                  </span>
                </li>
              )}
              <li className="flex justify-around mt-10">
                <GoogleCircleFilled className={iconButton} />
                <LinkedinFilled className={iconButton} />
                <InstagramFilled className={iconButton} />
              </li>
            </ul>
          </div>
        }
        {userBtn && (
          <ul
            className={`absolute z-50 right-16 top-[225px] sm:right-20 sm:top-[64px] sm:text-gray-500 text-left rounded-b-xl shadow-xl transition-all duration-1000`}
          >
            <li
              className="hover:text-white px-3 py-1  bg-[#d6e1e9] hover:bg-[#52ab98] transition-all duration-500 cursor-pointer"
              onClick={() => {
                navigate("/profile");
                handleMenuBtn();
              }}
            >
              Profile
            </li>
            <li
              className="hover:text-white px-3 py-1  bg-[#d6e1e9] hover:bg-[#52ab98] transition-all duration-500  cursor-pointer"
              onClick={() => {
                navigate("/texteditor");
                handleMenuBtn();
              }}
            >
              Create Posts
            </li>
            <li
              className="hover:text-white px-3 py-1  bg-[#d6e1e9] hover:bg-[#52ab98] transition-all duration-500 cursor-pointer"
              onClick={() => {
                navigate("/myposts");
                handleMenuBtn();
              }}
            >
              My Posts
            </li>

            <li
              className="hover:text-white px-3 py-1  bg-[#d6e1e9] hover:bg-[#52ab98] transition-all duration-500 cursor-pointer"
              onClick={() => {
                setForgot(true);
                handleMenuBtn();
              }}
            >
              Update Password
            </li>
          </ul>
        )}
      </div>
      <ChangePassword forgot={forgot} setForgot={setForgot} />
      <LoginModal signUp={signUp} handleSignUp={handleSignUp} />
    </div>
  );
};

export default Navbar;
