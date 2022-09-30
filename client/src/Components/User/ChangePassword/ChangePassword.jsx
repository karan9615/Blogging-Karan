import React from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import api from "../../../api";
import { useState } from "react";

const ChangePassword = ({forgot,setForgot}) => {

  const [formData,setFormData] = useState({
    oldpassword: "", 
    newpassword: "",
  }); 

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});
  }

  const handleSubmit = async () => {
    try {
      await api.put(`/api/user/update/password`,formData);
      setForgot(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
    <Modal 
      open={forgot}
      onClose={()=>setForgot(!forgot)}
      center
      animationDuration={500}
    >
    <div className="flex flex-col space-y-5 justify-center bg-[#52ab98] py-16 px-16  text-left">
      <div>
        <label className="text-white text-xl">Current Password: </label>
        <input type="password" value={formData.oldpassword} name="oldpassword" placeholder="Enter Current Password..."  className="border px-3 py-2" onChange={handleChange}/>
      </div>

      <div>
        <label className="text-white text-xl">New Password: </label>
        <input type="password" value={formData.newpassword} name="newpassword" placeholder="Enter New Password..." className="border px-3 py-2" onChange={handleChange} />
      </div>

      <div className="w-5/12 text-center px-4 py-2 bg-red-500 text-white cursor-pointer hover:scale-105 hover:translate-x-5 transition-all duration-700" onClick={handleSubmit}>
        Submit
      </div>
    </div>
    </Modal>
    </div>
  );
};

export default ChangePassword;
