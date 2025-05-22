import React, { useState } from "react";
import PocketBase from "pocketbase";
import { useNavigate } from "react-router";
import pb from "../../pb";

export default function addBlog() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    body: "",
    creator: "",
  });
  const [titleReq, setTitleReq] = useState("");
  const [imgReq, setImgReq] = useState("");
  const [imgRegex, setImgRegex] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImgRegex("");
    setImgReq("");
    setTitleReq("");
    let isValid = true;

    if (formData.title.length == 0) {
      setTitleReq("Title is required");
      isValid = false;
    }
    if (formData.image.length == 0) {
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
        // const pb = new PocketBase("http://127.0.0.1:8090");
        const creator_id = pb.authStore.record.id;
        console.log("creator_id", creator_id);
        const record = await pb.collection("blogs").create({
          title: formData.title,
          body: formData.body,
          image: formData.image,
          creator: creator_id,
        });
        // toast({
        //   title: "Blog added",
        //   description: "Blog added successfully.",
        //   status: "success",
        // });
        navigate("/");
      } catch (err) {
        console.error("Status:", err.status); // HTTP status code
        console.error("Data:", err.data); // Response data
        console.error("Original Error:", err.originalError); // Underlying error
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center font-font3 text-8xl text-purple-500 py-60">
        Add Blog
      </div>
      <div className="flex items-center justify-center relative bottom-50">
        <form
          onSubmit={handleSubmit}
          class="w-full md:w-1/2 border border-purple-500 p-6 bg-white"
        >
          <div>
            <div class="flex flex-col mb-3">
              <label htmlFor="name" className="text-purple-500">
                Title
              </label>
              <input
                maxLength="40"
                value={formData.title}
                onChange={handleChange}
                type="text"
                id="titleID"
                name="title"
                class="px-3 py-2 bg-white border border-gray-900 focus:border-purple-500 focus:outline-none focus:text-purple-500"
                autocomplete="off"
              />
            </div>
            {titleReq && (
              <p className="text-red-600 text-left text-sm">{titleReq}</p>
            )}
            <div class="flex flex-col mb-3">
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
                class="px-3 py-2 bg-white border border-gray-900 focus:border-purple-500 focus:outline-none focus:text-purple-500"
                autocomplete="off"
              ></textarea>
            </div>
            <div class="flex flex-col mb-3">
              <label htmlFor="image" className="text-purple-500">
                Image
              </label>
              <input
                value={formData.image}
                onChange={handleChange}
                type="text"
                // REGEX FOR IMAGE URL
                id="imageID"
                name="image"
                class="px-3 py-2 bg-white border border-gray-900 focus:border-purple-500 focus:outline-none focus:text-purple-500"
                autocomplete="off"
              />
            </div>
            {imgRegex && (
              <p className="text-red-600 text-left text-sm">{imgRegex}</p>
            )}
            {imgReq && (
              <p className="text-red-600 text-left text-sm">{imgReq}</p>
            )}
          </div>
          <div class="w-full pt-3">
            <button
              type="submit"
              class="w-full bg-purple-200 text-purple-500 border border-purple-500 px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-purple-500 hover:text-white text-xl cursor-pointer"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
