import React from "react";

export default function addBlog() {
  return (
    <>
      <div className="flex items-center justify-center font-font3 text-8xl text-purple-500 py-60">
        Add Blog
      </div>
      <div className="flex items-center justify-center relative bottom-50">
        <form
          action="#"
          method="POST"
          class="w-full md:w-1/2 border border-purple-500 p-6 bg-white"
        >
          <div>
            <div class="flex flex-col mb-3">
              <label htmlFor="name" className="text-purple-500">
                Title
              </label>
              <input
                type="text"
                id="titleID"
                name="title"
                class="px-3 py-2 bg-white border border-gray-900 focus:border-purple-500 focus:outline-none focus:text-purple-500"
                autocomplete="off"
              />
            </div>
            <div class="flex flex-col mb-3">
              <label htmlFor="body" className="text-purple-500">
                Body
              </label>
              <textarea
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
                type="text"
                // REGEX FOR IMAGE URL
                id="imageID"
                name="image"
                class="px-3 py-2 bg-white border border-gray-900 focus:border-purple-500 focus:outline-none focus:text-purple-500"
                autocomplete="off"
              />
            </div>
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
