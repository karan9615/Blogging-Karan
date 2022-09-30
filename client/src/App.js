import React from "react";
import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/HomePage/Home";
import LargeCards from "./Components/Cards/LargeCards";
import Profile from "./Components/User/Profile/Profile";
import TextEditor from "./Components/TextEditor/TextEditor";
import MyPosts from "./Components/User/Posts/MyPosts";
import EditPost from "./Components/TextEditor/EditPost";

function App() {
  return (
    <div className="App bg-[#fffcfc] min-h-screen">
      <BrowserRouter>
       <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/largecard/:id" element={<LargeCards />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/texteditor" element={<TextEditor />} />
          <Route path="/myposts" element={<MyPosts />} />
          <Route path="/EditPost" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
// #2b6777 darkest green
// #c8d8e4 gray
// #ffffff white
// #f2f2f2 gray+white ( light gray )
// #52ab98 green
