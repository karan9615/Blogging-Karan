import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {convertToHTML} from "draft-convert"
import api from "../../api";


const TextEditor = ({ onSubmit }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // const [image,setImage] = useState("");
  const [formData,setFormData] = useState({
    caption: "", 
    content: ""
  })

  const handleSubmit = async () => {
    try {
      const res = await api.post("/api/blog/post/upload",formData);
      setFormData({caption: "",content: ""}); 
      window.location.href="/"
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="py-24 px-5 z-10 sm:px-24 flex flex-col flex-start">
      <div className="flex items-center my-3">
        <label className="text-xl">Title: </label>
        <input type="text" name="caption" value={formData.caption} placeholder="Enter title.." className="ml-4 sm:ml-10 px-2 py-2 border" onChange={(e)=>setFormData({...formData,caption: e.target.value})} />
      </div>
      <div className="flex items-center my-3">
        <label className="text-xl">Image: </label>
        <input type="file" name="title" placeholder=".." className="ml-5 px-2 py-2 border" /> 

      </div>
      <form className="border border-1 shadow-xl">
        {/* <h2>Using CKEditor 5 from source in React</h2> */}
        <Editor
          editorState={editorState}
          onEditorStateChange={(editorState) => {setEditorState(editorState); setFormData({...formData,content: (convertToHTML(editorState.getCurrentContent()))})}}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
        <div
          className="btn px-2 py-1 bg-[#234fff] mx-5 text-white my-3 cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </div>
      </form>
    </div>
  );
};

export default TextEditor;
