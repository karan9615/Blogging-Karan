import {
  CommentOutlined,
  DeleteFilled,
  EditFilled,
  HeartFilled,
  HeartOutlined,
  LeftSquareFilled,
  RightSquareFilled,
  SendOutlined,
  UserOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { Toaster, toast } from "react-hot-toast";

import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";

const EditCaption = ({ data, editModal, setEditModal, getPosts }) => {
  const [formData, setFormData] = useState({
    caption: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await api.put(`/api/blog/post/${data._id}`, formData);
      setFormData({
        caption: "",
      });
      getPosts();
      setEditModal(false);
      toast.success("Updated Succesffully");
      setLoading(false);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      open={editModal}
      onClose={() => setEditModal(false)}
      center
      animationDuration={500}
    >
      <div className="w-96 border my-5 py-3 px-5 shadow-xl bg-[#2b6777] text-white">
        <div className="w-full my-2">
          <span className="text-xl">Current Title: </span>
          <span className="text-lg">{data?.caption}</span>
        </div>
        <div className="my-4">
          <label className="text-xl">New Title: </label>
          <input
            className="px-2 py-1 text-black outline outline-1 outline-gray-400 hover: "
            name="newCaption"
            placeholder="Enter New Title..."
            value={formData?.caption}
            onChange={(e) =>
              setFormData({ ...formData, caption: e.target.value })
            }
          />
          <div
            onClick={handleSubmit}
            className="cursor-pointer px-2 py-2 mt-8 mb-4  border-2 border-[#52ab98] hover:bg-[#52ab98] hover:text-white w-1/3 text-center transition-all duration-700"
          >
            {loading ? (
              <LoadingOutlined className="text-2xl flex justify-center items-center" />
            ) : (
              "Update"
            )}
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder="false" />
    </Modal>
  );
};

const CommentForm = ({ commentform, setCommentform, data, getPosts }) => {
  // console.log(data)
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    comment: "",
  });

  const handleDeleteComment = async (e, userId, blogId) => {
    e.preventDefault();
    try {
      // console.log("user.ID",userId);
      setLoading(true);
      await api.delete(`/api/blog/post/comment/${blogId}`, {
        commentId: userId,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (formData.comment) {
        setLoading(true);
        await api.put(`/api/blog/post/comment/${data._id}`, formData);
        // data = temp.data.blog;
        setFormData({
          comment: "",
        });
        setLoading(false);
        getPosts();
      } else {
        // console.log("Enter Some Value");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={commentform}
        onClose={() => setCommentform(!commentform)}
        center
        animationDuration={500}
      >
        <div className="sm:w-96">
          <div className="my-1">Add Comment</div>
          <div className="flex items-center ">
            <input
              type="text"
              name="comment_val"
              placeholder="Comment..."
              className="w-full my-2 px-2 py-2"
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
            />
            {loading ? (
              <LoadingOutlined />
            ) : (
              <SendOutlined
                className="flex items-center ml-2 text-2xl"
                onClick={handleSubmit}
              />
            )}
          </div>
          <ul className="my-1">
            {data?.comments?.map((val, index) => (
              <li
                key={index}
                className="flex justify-between items-center my-2"
              >
                {val?.comment}
                <span className="flex justify-center text-xs sm:text-md">
                  {val.user._id ===
                    JSON.parse(localStorage.getItem("userId")) && (
                    <DeleteFilled
                      className="mx-3 flex items-center cursor-pointer"
                      onClick={(e) => handleDeleteComment(e, val._id, data._id)}
                    />
                  )}
                  <img
                    src=""
                    alt=""
                    className="h-5 w-5 bg-gray-600  rounded-full"
                  />
                  <span>{val?.user?.name}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Toaster />
      </Modal>
    </div>
  );
};

const MiniCards = ({ data }) => {
  // console.log(data)
  const navigate = useNavigate();
  var date = new Date(data?.createdAt);
  date = date.toDateString();
  return (
    <div
      className="mx-5 cursor-pointer"
      onClick={() => navigate(`/largecard/${data?._id}`)}
    >
      <div className="relative w-48 h-52">
        <div className="absolute z-10 top-2 left-3 text-sm text-gray-400">
          Created at-{date}
        </div>
        <div className="absolute z-10 top-[100px] text-center  text-white text-2xl">
          {data?.caption}
        </div>
        <div className="relative overflow-hidden transition-all duration-700">
          <img
            src="https://images.unsplash.com/photo-1663825162561-8399b6907932?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="relative hover:scale-125 h-52 w-full  transition-all duration-700"
          />
        </div>
      </div>
    </div>
  );
};

const GeneralUserProfile = ({ openUser, setOpenUser, data }) => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUserPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/user/userposts/${data.owner._id}`);
      setResponse(res.data.userBlogs);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);

  return (
    <Modal
      open={openUser}
      onClose={() => setOpenUser(!openUser)}
      center
      animationDuration={500}
    >
      <div className="w-[760px] h-96">
        <div className="">
          <div className="fixed border sm:w-1/2 px-3 py-2 bg-gray-100 text-gray-600 flex items-center space-x-5">
            <UserOutlined className="text-2xl text-white bg-[#2b6777] rounded-full p-4 px-5" />
            <div>
              <div>Name: {data?.owner?.name}</div>
              <div>Email: {data?.owner?.email}</div>
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingOutlined className="text-4xl relative flex items-center justify-center top-[150px] w-full" />
        ) : (
          <div className="relative flex items-center top-[150px] w-full">
            <div className="relative overflow-x-auto">
              <div className="flex">
                {response?.map((val, index) => (
                  <MiniCards key={index} data={val} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

const SmallCards = ({ data, getPosts }) => {
  // console.log(data);
  const navigate = useNavigate();
  const [commentform, setCommentform] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [loading,setLoading] = useState(false);

  function createMarkup(val) {
    return { __html: val };
  }

  const handleDeleteBlog = useCallback(async () => {
    try {
      setLoading(true)
      const res = await api.delete(`/api/blog/post/${data._id}`);
      setLoading(false)
      getPosts();
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  }, [data._id, getPosts]);

  const handleLike = useCallback(async () => {
    try {
      await api.get(`/api/blog/post/${data._id}`);
      // console.log(test);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  }, [getPosts]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  var date = new Date(data?.createdAt);
  date = date.toDateString();
  return (
    <div className="relative text-left my-3 sm:w-1/4 sm:mx-10 p-2 bg-[#2b6777] text-white">
      <div className=" h-52 bg-gray-200">
        <div className="absolute z-10 top-5 left-5 text-sm text-gray-400">
          Created at-{date}
        </div>
        {data?.owner?._id === JSON.parse(localStorage.getItem("userId")) && (
          <div className="text-white absolute z-10 right-5 top-5 space-x-5 ">
            <EditFilled onClick={() => setEditModal(true)} />
            <DeleteFilled onClick={handleDeleteBlog} />
          </div>
        )}
        <div className="relative overflow-hidden transition-all duration-700">
          <img
            src="https://images.unsplash.com/photo-1663825162561-8399b6907932?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="relative hover:scale-125 h-52 w-full  transition-all duration-700"
          />
        </div>
      </div>
      <div className="p-3">
        <div className="text-2xl">{data?.caption}</div>
        <div className="relative overflow-hidden">
          <div className="h-12">
            <div dangerouslySetInnerHTML={createMarkup(data?.content)}></div>
          </div>
        </div>
        <button
          className="my-2 px-2 py-1 bg-[#52ab98] hover:translate-x-1 hover:bg-[#44a893] transition-all duration-500"
          onClick={() => navigate(`/largecard/${data._id}`)}
        >
          Read More...
        </button>
      </div>
      <hr />
      <div className="flex justify-between p-2 items-center">
        <div className="flex items-center space-x-3">
          {data?.likes?.filter(
            (val) => val._id === JSON.parse(localStorage.getItem("userId"))
          ).length === 1 ? (
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
          <span>{data?.likes?.length}</span>
          <CommentOutlined
            className=" transition-all duration-500 cursor-pointer"
            onClick={() => setCommentform(true)}
          />
          <span>{data?.comments?.length}</span>
        </div>
        <div
          className="flex justify-around items-center space-x-1  cursor-pointer"
          onClick={() => setOpenUser(true)}
        >
          <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
          <div>{data?.owner?.name}</div>
        </div>
      </div>
      <EditCaption
        data={data}
        editModal={editModal}
        setEditModal={setEditModal}
        getPosts={getPosts}
      />
      <CommentForm
        commentform={commentform}
        setCommentform={setCommentform}
        data={data}
        getPosts={getPosts}
      />
      <GeneralUserProfile
        openUser={openUser}
        setOpenUser={setOpenUser}
        data={data}
      />
    </div>
  );
};

export default SmallCards;
