import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
// import PocketBase from "pocketbase";
import pb from "../../pb"


export default function EditBlog() {
  const { id } = useParams();
  const { state } = useLocation();
  const { record } = state || {};
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (record) {
      setFormData({
        title: record.title,
        body: record.body,
        image: record.image,
      });
    }
  }, [record]);

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const goToHomepage = () => {
    navigate("/")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const pb = new PocketBase("http://127.0.0.1:8090");
      const updateBlog = await pb.collection("blogs").update(id, formData)
    } catch (err) {
      console.log("ERROR: ", err);
    }
  };
  return (
    <>
      {/* <div className="border border-purple-800"> */}
      <div className="flex items-center justify-center font-font3 text-8xl text-purple-500 py-60">
        Edit Blog
      </div>
      <div className="flex items-center justify-center relative bottom-50">
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="w-full md:w-1/2 border border-purple-500 p-6 bg-white"
        >
          <div>
            <div className="flex flex-col mb-3">
              <label htmlFor="name" className="text-purple-500">
                Title
              </label>
              <input
                defaultValue={record.title}
                type="text"
                id="titleID"
                name="title"
                onChange={handleChange}
                className="px-3 py-2 bg-white border border-gray-900 focus:border-purple-500 focus:outline-none focus:text-purple-500"
                autocomplete="off"
              />
            </div>
            {/* <div className="flex flex-col mb-3">
            <label htmlFor="email" className="text-purple-500">Posted By</label>
            <input 
                type="email" id="postedbyInp" name="postedby"
                className="px-3 py-2 cursor-not-allowed bg-white border border-gray-900 focus:border-purple-500 focus:outline-none focus:text-purple-500"
                autocomplete="off"
                disabled
            />
        </div> */}
            <div className="flex flex-col mb-3">
              <label htmlFor="body" className="text-purple-500">
                Body
              </label>
              <textarea
                rows="4"
                id="bodyInp"
                name="body"
                defaultValue={record.body}
                onChange={handleChange}
                className="px-3 py-2 bg-white border border-gray-900 focus:border-purple-500 focus:outline-none focus:text-purple-500"
                autocomplete="off"
              ></textarea>
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="image" className="text-purple-500">
                Image
              </label>
              <input
                type="text"
                // REGEX FOR IMAGE URL
                defaultValue={record.image}
                onChange={handleChange}
                id="image"
                name="image"
                className="px-3 py-2 bg-white border border-gray-900 focus:border-purple-500 focus:outline-none focus:text-purple-500"
                autocomplete="off"
              />
            </div>
          </div>
          <div className="w-full pt-3">
            <button
              onClick={goToHomepage}
              type="submit"
              className="w-full bg-purple-200 text-purple-500 border border-purple-500 px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-purple-500 hover:text-white text-xl cursor-pointer"
            >
              Update
            </button>
          </div>
        </form>
      </div>

      {/* </div> */}
    </>
  );
}
