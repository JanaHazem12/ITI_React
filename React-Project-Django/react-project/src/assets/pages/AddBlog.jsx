import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createBlog } from "../../api";
import { Toaster, toast } from 'react-hot-toast';

export default function AddBlog() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    body: "",
  });
  const [titleReq, setTitleReq] = useState("");
  const [imgReq, setImgReq] = useState("");
  const [imgRegex, setImgRegex] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error messages when user types
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // check authentication first
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setImgRegex("");
    setImgReq("");
    setTitleReq("");
    setError("");
    
    let isValid = true;

    if (formData.title.length === 0) {
      setTitleReq("Title is required");
      isValid = false;
    }
    if (formData.image.length === 0) {
      setImgReq("Image is required");
      setImgRegex("");
      isValid = false;
    }

    // regex for image URL
    const imgRegex = /(https?:\/\/.*\.(?:png|jpg))/i;
    if (!imgRegex.test(formData.image) && formData.image.length !== 0) {
      setImgRegex("Please enter a valid image URL.");
      setImgReq("");
      isValid = false;
    }

    if (isValid) {
      try {
        await createBlog(formData);
        toast.success('Blog added successfully !');
        navigate("/");
      } catch (err) {
        // if(err.response.status === 401){
        //   toast.error('Token expired, Please login.');
        //   console.log("TOKEN EXPIRED !");
        //   navigate("/login");
        // }
        console.error("Error creating blog:", err.response?.data);
        setError(err.response?.data?.detail || "Failed to create blog. Please try again.");
      }
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex items-center justify-center font-font3 text-8xl text-purple-500 py-60">
        Add Blog
      </div>
      <div className="flex items-center justify-center relative bottom-50">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 border border-purple-500 p-6 bg-white"
        >
          {error && (
            <div className="mb-4 text-red-600 text-center">{error}</div>
          )}
          <div>
            <div className="flex flex-col mb-3">
              <label htmlFor="title" className="text-purple-500">
                Title
              </label>
              <input
                maxLength="40"
                value={formData.title}
                onChange={handleChange}
                type="text"
                id="titleID"
                name="title"
                className="px-3 py-2 bg-white border border-gray-900 focus:border-purple-500 focus:outline-none focus:text-purple-500"
                autoComplete="off"
              />
            </div>
            {titleReq && (
              <p className="text-red-600 text-left text-sm">{titleReq}</p>
            )}
            <div className="flex flex-col mb-3">
              <label htmlFor="body" className="text-purple-500">
                Body
              </label>
              <textarea
                maxLength="200"
                value={formData.body}
                onChange={handleChange}
                rows="4"
                id="bodyInp"
                name="body"
                className="px-3 py-2 bg-white border border-gray-900 focus:border-purple-500 focus:outline-none focus:text-purple-500"
                autoComplete="off"
              ></textarea>
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="image" className="text-purple-500">
                Image
              </label>
              <input
                value={formData.image}
                onChange={handleChange}
                type="text"
                id="imageID"
                name="image"
                className="px-3 py-2 bg-white border border-gray-900 focus:border-purple-500 focus:outline-none focus:text-purple-500"
                autoComplete="off"
              />
            </div>
            {imgRegex && (
              <p className="text-red-600 text-left text-sm">{imgRegex}</p>
            )}
            {imgReq && (
              <p className="text-red-600 text-left text-sm">{imgReq}</p>
            )}
          </div>
          <div className="w-full pt-3">
            <button
              type="submit"
              className="w-full bg-purple-200 text-purple-500 border border-purple-500 px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-purple-500 hover:text-white text-xl cursor-pointer"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}