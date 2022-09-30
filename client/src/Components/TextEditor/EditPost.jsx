import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditPost = ({ onSubmit }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [image,setImage] = useState("");
  return (
    <div className="py-24 px-5 sm:px-24 flex flex-col flex-start">
      <div className="flex items-center my-3">
        <label className="text-xl">Title: </label>
        <input type="text" name="title" placeholder="Enter title.." className="ml-5 sm:ml-10 px-2 py-2 border" />
      </div>
      <div className="flex items-center my-3">
        <label className="text-xl">Image: </label>
        <input type="file" name="title" placeholder=".." className="ml-5 px-2 py-2 border" /> 

      </div>
      <form className="border border-1 shadow-xl">
        {/* <h2>Using CKEditor 5 from source in React</h2> */}
        <Editor
          editorState={editorState}
          onEditorStateChange={(editorState) => setEditorState(editorState)}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
        <button
          type="submit"
          className="btn px-2 py-1 bg-[#234fff] mx-5 text-white my-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditPost;
