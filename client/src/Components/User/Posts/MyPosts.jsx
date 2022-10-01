import React, { useState, useCallback } from "react";
import {
  PushpinFilled,
  LikeOutlined,
  DislikeOutlined,
  EllipsisOutlined,
  LoadingOutlined,
  BookOutlined,
} from "@ant-design/icons";

import SmallCards from "../../Cards/SmallCards";
import api from "../../../api";
import { useEffect } from "react";

const MyPosts = () => {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const getPosts = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await api.get("/api/user/my/posts");
      setResponse(data.userBlogs);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="py-20">
      {/* {data.map((val, index) => (
          <Card key={index} item={val} />
        ))} */}
      <div className="text-left px-10 sm:px-16 text-3xl flex items-center space-x-5">
        <BookOutlined className="text-gray-500" />
        <span className="text-gray-500">
          My Blogs
          <hr className="outline-none border-none mt-1 py-[3px] rounded-2xl" />
        </span>
      </div>
      { loading ? <LoadingOutlined className="text-2xl" /> :
      <div className="w-full flex flex-wrap justify-center px-10 sm:px-16 py-5">
        {response?.map((val, index) => (
          <SmallCards key={index} data={val} getPosts={getPosts} />
        ))}
      </div>
     } 
    </div>
  );
};

export default MyPosts;
