import React, { useState, useEffect ,useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  HeartFilled,
  EditFilled,
  DeleteFilled,
  HeartOutlined,
} from "@ant-design/icons";
import api from "../../api";

import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";

const EditCaption = ({response,editModal,setEditModal}) => {
  const [formData,setFormData] = useState({
    caption: ""
  }); 

  const handleSubmit = async () => {
    try {
      const res = await api.put(`/api/blog/post/${response._id}`,formData);
      setFormData({
        caption: ""
      })
      setEditModal(false)
      // console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Modal open={editModal} onClose={()=>setEditModal(false)} center animationDuration={500} >
      <div className="w-96 border my-5 py-3 px-5 shadow-xl bg-[#2b6777] text-white">
        <div className="w-full my-2">
          <span className="text-xl">Current Title: </span>
          <span className="text-lg">{response.caption}</span>
        </div>
        <div className="my-4">
          <label className="text-xl">New Title: </label>
          <input className="px-2 py-1 text-black outline outline-1 outline-gray-400 hover: " name="newCaption" placeholder="Enter New Title..." value={formData.caption} onChange={(e)=>setFormData({...formData,caption: e.target.value})} />
          <div onClick={handleSubmit} className="cursor-pointer px-2 py-2 mt-8 mb-4  border-2 border-[#52ab98] hover:bg-[#52ab98] hover:text-white w-1/3 text-center transition-all duration-700">Update</div>
        </div>
      </div>
    </Modal>
  );
};


const LargeCards = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState({});
  const [formData, setFormData] = useState({
    comment: "",
  });
  
  const [editModal,setEditModal] = useState(false)

  const [like, setLike] = useState(false);
  const userId = useParams();
  // console.log(userId.id)

  const handleDeleteBlog = async () => {
    try {
      const res = await api.delete(`/api/blog/post/${userId.id}`);
      getThisPost();
      console.log(res);
      window.location.href ="/"
    } catch (error) {
      console.log(error);
    }
  };
  
  const getThisPost = useCallback(async () => {
    try {
      const temp = await api.get(`/api/blog/post/this/${userId.id}`);
      setResponse(temp.data.data);
      // console.log(response)
    } catch (error) {
      console.log(error);
    }
  },[userId.id]);

  const handleCommentSubmit = async () => {
      try {
        if (formData.comment) {
          await api.put(`/api/blog/post/comment/${userId.id}`,formData);
          // data = temp.data.blog;
          setFormData({
            comment: "",
          });
          getThisPost();
        } else {
          // console.log("Enter Some Value");
        }
      } catch (error) {
        console.log(error);
      }
    }

  
    const handleLike = async () => {
      try {
        await api.get(`/api/blog/post/${userId.id}`);
        // console.log(test);
      } catch (error) {
        console.log(error);
      }
    };
  


  useEffect(() => {
    getThisPost();
    const ress = response.likes?.filter(
      (val) => val._id === JSON.parse(localStorage.getItem("userId"))
    );
    setLike(ress?.length === 1 ? true : false);
  }, [handleLike,handleDeleteBlog]);

  function createMarkup(val) {
    return { __html: val };
  }

  return (
    <div className="py-24 text-left px-10">
      <div className="text-xl flex space-x-5 sm:float-right my-3">
      <EditFilled onClick={()=>setEditModal(true)} />
      <DeleteFilled onClick={handleDeleteBlog} />
      </div>
      <div className="text-4xl flex flex-wrap sm:px-10">
        <div className="relative overflow-hidden sm:h-64 sm:p-2 hover:shadow-xl bg-gray-200 outline-gray-500 outline-double">
          <img
            src="https://images.unsplash.com/photo-1663825162561-8399b6907932?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="hover:scale-110 transition-all duration-700"
          />
        </div>
        <div className="flex flex-col justify-start sm:w-4/12 sm:mx-24 text-sm text-gray-600">
          <div className="relative overflow-hidden w-full text-2xl mt-4 sm:mt-0 uppercase font-semibold underline underline-offset-8 text-gray-700">
            {response.caption}
          </div>
          <div className="text-lg mt-10 hidden sm:block">
            Created by: Username
          </div>
          <div className="text-lg hidden sm:block">Created on: 22/10/2022</div>
          <div className="hidden sm:block">
            <div className="flex items-center space-x-5 text-xl mt-10">
            {like ? (
            <HeartFilled
              className="text-red-500 hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              onClick={handleLike}
            />
          ) : (
            <HeartOutlined
              className="hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              onClick={handleLike}
            />
          )}
            </div>
          </div>
        </div>
      </div>
      <div className="sm:px-10 py-5 text-lg text-justify text-gray-600">
        <div className="relative overflow-hidden">
          <div className="">
            <div dangerouslySetInnerHTML={createMarkup(response.content)}></div>
          </div>
        </div>
      </div>
      <form className="sm:px-10">
        <div className="block sm:hidden">
          <div className="flex items-center space-x-5 text-xl">
          {like ? (
            <HeartFilled
              className="text-red-500 hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              onClick={handleLike}
            />
          ) : (
            <HeartOutlined
              className="hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              onClick={handleLike}
            />
          )}
          </div>
        </div>
        <div className="text-lg mt-2 block sm:hidden">Created by: {response.owner?.name}</div>
        <div className="text-lg block sm:hidden">Created on: {(new Date(response?.createdAt)).toDateString()}</div>

        <label className="font-semibold mt-5 sm:mt-0 text-xl text-[#2b6777] w-full">
          Add Comment
        </label>
        <textarea
          placeholder="add your comment..."
          className="w-full h-24 mt-3 border px-2 py-2"
          name="comment_val"
          value={formData.comment}
          onChange={(e)=>{setFormData({...formData,comment: e.target.value})}}
        />
        <div className="flex flex-wrap sm:w-1/12 py-2 text-white bg-[#2b6777] justify-center cursor-pointer hover:bg-[#2f5d69]" onClick={handleCommentSubmit}>
          Submit
        </div>

        <ul className="my-1 border px-2 py-1">
            {response.comments?.map((val, index) => (
              <li key={index} className="flex justify-between items-center my-2">
                {val.comment}
                <span className="flex justify-center text-xs sm:text-md">
                  <img
                    src=""
                    alt=""
                    className="h-5 w-5 bg-gray-600  rounded-full"
                  />
                  <span>{val.user?.name}</span>
                </span>
              </li>
            ))}
          </ul>

      </form>
      <EditCaption response={response} editModal={editModal} setEditModal={setEditModal} />
    </div>
  );
};

export default LargeCards;
