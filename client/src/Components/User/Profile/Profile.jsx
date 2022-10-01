import { UserOutlined, HeartFilled, RiseOutlined,LoadingOutlined } from "@ant-design/icons";
import React,{useCallback} from "react";
import { useState, useEffect } from "react";
import api from "../../../api";
import {Toaster,toast} from "react-hot-toast"

const Tag = ({ name }) => {
  return (
    <div className="border  text-center text-sm   px-2 py-1 mx-1 text-gray-300 hover:text-white hover:bg-gray-500 transition-all duration-300 cursor-pointer">
      {name}
    </div>
  );
};

const Profile = () => {
  const [updateBtn, setUpdateBtn] = useState(false);
  const [response, setResponse] = useState({});
  const [loading,setLoading] = useState(false);
  const handleUpdateBtn = () => {
    setUpdateBtn(!updateBtn);
  };
  const [updateForm,setUpdateForm] = useState({
    name: response?.name || "", 
    email: response?.email || "",
  })
  const getUserProfile = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.get("/api/user/me");
      setResponse(data.data.user)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  },[]);

  const handleUpdateProfile = async () => {
    try {
      // console.log(updateForm)
      setLoading(true)
      await api.put("/api/user/update/profile",updateForm)
      // console.log("done update")
      setLoading(false)
      toast.success("Updated Successfully")
      getUserProfile();
      setUpdateBtn(false)
    } catch (error) {
      console.log(error)
    }
  }; 

  const handleDeleteAccount = async () => {
    try {
      setLoading(true)
      localStorage.removeItem("userToken"); 
      localStorage.removeItem("userId")
      await api.delete("/api/user/delete/me"); 
      setLoading(false)
      toast.success("Deleted Successfully"); 
      getUserProfile();
    } catch (error) {
      console.log(error)
    }
    
    window.location.href="/";
  }

  const handleChange = (e) => [
    setUpdateForm({...updateForm,[e.target.name]: e.target.value})
  ]

  useEffect(() => {
  getUserProfile();
  setResponse(response)
  // console.log(response)
  }, [])
  

  return (
    <div className="sm:flex relative justify-center px-10 py-16 bg-[#52ab98] min-h-screen">
      <UserOutlined className="sm:mt-16  sm:scale-[150%] absolute left-[15%] sm:left-[20%] top-[15%] sm:top-[20%] text-5xl text-white shadow-2xl peer-hover:bg-[#52ab98] peer-hover:-translate-x-[80%] sm:peer-hover:-translate-x-11 transition-all duration-700 bg-[#2b6777] p-7 px-8 rounded-full" />

      <div className="mt-32 sm:mt-16 text-left text-white sm:h-96 peer rounded-3xl ">
        <ul className="text-xl py-14 sm:py-10 px-3 sm:px-16 leading-9">
          {/* <li>
            <span className="text-gray-800 font-normal">Username:</span>{" "}
            Karan0_0Gupta
          </li> */}
          <li>
            <span className="text-gray-800 font-normal">Name:</span>{" "}
            {!updateBtn ? (
              response.name
            ) : (
              <input
                type="text"
                name="name"
                placeholder="Enter Name..."
                className="px-2 py-1 my-2 rounded-xl text-black"
                value={updateForm.name}
                onChange={handleChange}
              />
            )}
          </li>
          <li>
            <span className="text-gray-800 font-normal">Email:</span>{" "}
            {!updateBtn ? (
              response.email
            ) : (
              <input
                type="text"
                name="email"
                placeholder="Enter Email..."
                className="px-2 py-1 my-2 rounded-xl text-black"
                value={updateForm.email}
                onChange={handleChange}
              />
            )}
          </li>
          {/* <li>
            <span className="text-gray-800 font-normal">Address:</span> Unknown
          </li>
          <li className="flex">
            <span className="text-gray-800 font-normal">Intersets:</span>
            <div className="flex items-center">
              <Tag name={"Politics"} />
              <Tag name={"Science"} />
              <Tag name={"Technology"} />
            </div>
          </li> */}
          <li>
            <span className="text-gray-800">No. Of Blogs Published:</span>
            <span className="ml-1">{response.posts?.length}</span>
          </li>
          {/* <li>
            <span className="text-gray-800">Liked: </span>
            <span className="ml-1">56</span>
          </li> */}
          {/* <li>
            <span className="text-gray-800">Disliked:</span>
            <span className="ml-1">56</span>
          </li> */}
          {/* <li>
            <span className="text-gray-800">Commented:</span>
            <span className="ml-1">56</span>
          </li> */}
          {
            updateBtn && <div className="w-1/3 my-2 px-3 py-1 bg-[#ce0000] text-white text-md items-center justify-center text-center cursor-pointer hover:shadow-lg" onClick={handleUpdateProfile}>{ loading ? <LoadingOutlined className="" /> :"Update"}</div>
          }
        </ul>
      </div>
      <div className="">
        {!updateBtn ? (
          <div
            className={`absolute w-6/12 transition-all duration-700 sm:w-2/12 top-[75%] sm:top-[49%] right-[35%] sm:right-[15%] px-3 py-2 sm:px-5 sm:py-3 bg-[#f2f2f2] text-gray-600 hover:scale-105 hover:translate-y-1 hover:translate-z-5 hover:shadow-xl cursor-pointer`}
            onClick={handleUpdateBtn}
          >
            Update Account
          </div>
        ) : (
          <div
            className={`absolute w-6/12 transition-all duration-700 sm:w-2/12 ${updateBtn?"top-[85%]":"top-[75%]"} sm:top-[49%] right-[35%] sm:right-[15%] px-3 py-2 sm:px-5 sm:py-3 bg-[#f2f2f2] text-gray-600 hover:scale-105 hover:translate-y-1 hover:translate-z-5 hover:shadow-xl cursor-pointer transition-all duration-500`}
            onClick={handleUpdateBtn}
          >
            Cancel Update
          </div>
        )}
        <div className={`absolute w-6/12 transition-all duration-700 sm:w-2/12 ${updateBtn?"top-[92%]":"top-[82%]"} sm:top-[59%] right-[35%] sm:right-[15%] px-3 py-2 sm:px-5 sm:py-3 bg-[#f2f2f2] text-gray-600 hover:scale-105 hover:translate-y-1 hover:translate-z-5 hover:shadow-xl cursor-pointer transition-all duration-500`} onClick={handleDeleteAccount} >
          Delete Account
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Profile;
