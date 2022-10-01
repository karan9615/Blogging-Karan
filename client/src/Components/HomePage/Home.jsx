import { BookOutlined, LoadingOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import SmallCards from "../Cards/SmallCards";

const Home = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  // const getPosts = useCallback(
  //   async () => {
  //       try {
  //         const {data} = await api.get('/api/blog/posts');
  //         // console.log(data.data);
  //         setResponse(data.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //   },
  //   [],
  // );

  const getPosts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/blog/posts");
      // console.log(data.data);
      setResponse(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [render, setRender] = useState(true);

  useEffect(() => {
    if (render) {
      setRender(false);
      getPosts();
    }
  }, []);

  return (
    <div>
      <div className="w-full sm:pt-16 h-[500px] sm:flex justify-evenly overflow-hidden">
        <div className="sm:w-1/2 text-white bg-[#52ab98] flex flex-col text-left sm:pl-16 pl-10 py-20">
          <div className="text-6xl sm:text-8xl font-serif">
            Stay Curious
            <span
              className="text-[#2b6777] cursor-pointer"
              onClick={() => navigate("/user")}
            >
              .
            </span>
          </div>
          <div className="py-5 text-xl sm:text-2xl w-9/12">
            Discover stories, thinking, and expertise from writers on any topic.
          </div>
          <button className="w-1/2 sm:w-4/12 text-xl py-2 bg-[rgb(18,131,146)] rounded-3xl hover:translate-x-5 transition-all duration-300">
            Start reading
          </button>
        </div>
        <div className="hidden sm:block w-1/2 bg-[#2b6777]">
          <img
            src="https://img.freepik.com/free-vector/diary-concept-illustration_114360-3755.jpg?size=338&ext=jpg"
            alt=""
            className="absolute hover:rounded-t-2xl hover:rounded-bl-3xl hover:-translate-x-36 rounded-t-full rounded-bl-full right-5 top-36 outline outline-8 outline-green-300 shadow transition-all duration-700"
          />
        </div>
      </div>
      <div className="sm:hidden">
        <img
          src="https://img.freepik.com/free-vector/diary-concept-illustration_114360-3755.jpg?size=338&ext=jpg"
          alt=""
          className="absolute sm:hidden w-2/12  hover:-translate-x-4 hover:scale-110 rounded-t-full rounded-bl-full right-5 top-2/4 outline outline-4 outline-green-300 hover:shadow-2xl transition-all duration-700"
        />
      </div>

      <div className="text-left px-10 sm:px-16 mt-3 text-3xl flex items-center space-x-5">
        <BookOutlined className="text-gray-500" />
        <span className="text-gray-500">
          Let's See{" "}
          <hr className="outline-none border-none mt-1 py-[3px] rounded-2xl" />
        </span>
      </div>
      {loading ? (
        <LoadingOutlined className="text-3xl" />
      ) : (
        <div className="w-full flex flex-wrap justify-center px-10 sm:px-16 py-5">
          {response?.map((val, index) => (
            <SmallCards key={index} data={val} getPosts={getPosts} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
