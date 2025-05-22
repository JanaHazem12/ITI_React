import { React, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";
import pb from "../../pb";

export default function Home() {
  // SHOW EDIT/DELETE BUTTONS FOR BLOGS CREATED BY THE USER IN THE 'currently_logged_in' COLLECTION
  // ADD BLOG SHOULD BE THERE IF I'M LOGGED IN
  // const pb = new PocketBase("http://127.0.0.1:8090");
  const navigate = useNavigate();

  const authID = pb.authStore.isValid ? pb.authStore.record.id : null;
  const [record, setRecord] = useState([]);
  const [blogCreator, setblogCreator] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPostsFound, setNoPosts] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [perPage, setBlogsPerPage] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await pb.collection("blogs").getList(page || 1, 2, {
          sort: "-created",
        });
        // const blogsPerPage = result.items.length;
        // const totalBlogsCount = totalBlogs.length;
        console.log("totalBlogs: ", result.totalItems);
        setTotalBlogs(result.totalItems);
        console.log("blogs per page: ", result.perPage);
        setBlogsPerPage(result.perPage);
        console.log("total pages: ", result.totalPages);
        setPage(result.page);
        setTotalPages(result.totalPages);
        console.log("result page: ", result.page);
        console.log("result items: ", result.items);
        // NO POSTS
        if (result.length == 0) {
          setNoPosts(true);
        }
        setRecord(result.items);
      } catch (err) {
        console.error("error fetching data", err);
      }
    };
    fetchData();
  }, [page]);

  const openDeleteModal = (id) => {
    setBlogToDelete(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;
    try {
      await pb.collection("blogs").delete(blogToDelete);
      // to avoid reloading the page when deleting a blog
      setRecord(record.filter((rec) => rec.id !== blogToDelete));
      setModalOpen(false);
      setBlogToDelete(null);
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const handleEdit = (id) => {
    const selectedBlog = record.find((rec) => rec.id === id);
    navigate(`/edit/${id}`, { state: { record: selectedBlog } });
  };

  // const handlePageClick = async (index) => {
  //   // THE PAGES GET THE CORRECT DATA BUT HOW DO I RENDER AGAIN IN ORDER TO VIEW THE DATA
  //   try{
  //     const result = await pb.collection("blogs").getList(index, 2, {
  //         sort: "-created",
  //       });
  //       console.log("RESULT: ", result.items); 
  //       // fetchData(index)
  //       setRecord(result.items);
  //       navigate(`/${index}`);
  //   } catch(err) {
  //     console.error("error fetching data", err);
  // }
  //   // `/${(index-1) * perPage}`
  // }

  const handlePageClick = (index) => {
    page = index;
    console.log("I'M HERE!!");
    navigate(`/${index}`);
  }

  useEffect(() => {
    // console.log("bbbbbbbbb");
    const fetchBlogCreators = async () => {
      const creators = {};
      for (const blog of record) {
        try {
          const blogWithCreator = await pb.collection("blogs").getOne(blog.id, {
            expand: "creator",
          });
          creators[blog.id] = blogWithCreator.expand.creator.username;
        } catch (err) {
          console.log("Error fetching creator for blog:", blog.id);
        }
      }
      setblogCreator(creators);
    };
    if (record.length > 0) {
      fetchBlogCreators();
    }
  }, [record]);

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
      <div className="flex justify-center items-center fixed inset-0 justify-self-center py-4">
        <div className="border border-red-500 bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &#x2715; {/* Close button */}
          </button>
          {children}
        </div>
      </div>
    );
  };

  const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="text-lg font-bold">Delete Blog</h2>
        <p className="text-gray-700">
          You're going to delete this blog. Are you sure ?
        </p>
        <div
          className="flex justify-center items-center
                          space-x-4 mt-4"
        >
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            onClick={onClose}
          >
            No, Keep it.
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={onConfirm}
          >
            Yes, Delete!
          </button>
        </div>
      </Modal>
    );
  };
  return (
    <>
      <div className="mt-20 font-semibold">
        {authID ? (
          <>
            <p className="text-purple-600 text-2xl mb-4">
              Welcome back{" "}
              <span className="ml-1 font-font1 text-purple-500 font-light">
                {pb.authStore.record.username
                  .split(" ", 1)
                  .join("")
                  .toUpperCase()}
              </span>{" "}
              ! <br></br>Ready to share your next blog?
            </p>
            <Link to="/add">
              <button className="h-10 w-70 rounded-md bg-purple-600 cursor-pointer text-white hover:bg-cyan-400 hover:text-white hover:font-semibold">
                Add Blog
              </button>
            </Link>
          </>
        ) : (
          <p className="text-purple-600 text-2xl">
            Want to share your own blog?{" "}
            <Link to="/login" className="underline hover:text-cyan-400">
              Log in
            </Link>{" "}
            or{" "}
            <Link to="/register" className="underline hover:text-cyan-400">
              sign up
            </Link>{" "}
            to get started!
          </p>
        )}
      </div>
      <br></br>
      <br></br>
      {isPostsFound && (
        <div className="text-[50px] text-purple-500 flex items-center justify-center w-full min-h-screen font-serif">
          No blogs yet? Kick things off by creating your first post!
        </div>
      )}
      <div className="w-full md:grid md:grid-cols-4 grid grid-cols-2 gap-4 bg-white">
        {!isPostsFound &&
          record.map((rec) => (
            <div
              className="hover:scale-105 duration-500 transition-transform bg-white shadow-xl"
              key={rec.id}
            >
              <img
                src={rec.image}
                alt={rec.title}
                className="w-full h-48 object-cover"
              />
              <div className="flex flex-col items-center justify-center">
                <div className="font-serif mt-5 text-[18px]">
                  {rec.title.toUpperCase()}
                </div>
                {/* hover:h-[200px] */}
                <div className="mt-2 h-[120px] truncate w-full px-2 py-2 sm:px-4 sm:py-4 text-gray-500 font-light text-left overflow-hidden transition-all duration-300 hover:overflow-y-auto hover:whitespace-normal">
                  {rec.body}
                </div>
              </div>
              {/* <hr className="text-gray-400"></hr> */}
              <div className="px-4 py-6 flex flex-row gap-4 justify-between text-sm">
                {blogCreator[rec.id] && (
                  <div className="text-purple-400 text-sm sm:text-base font-bold ml-1 sm:ml-2">
                    {/* MAKE THE 2ST LETTER UPPERCASE */}
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-slate-600 sm:mr-1 text-[12px] sm:text-[15px] sm:mb-0.5"
                    />
                    {blogCreator[rec.id]
                      ? blogCreator[rec.id].charAt(0).toUpperCase() +
                        blogCreator[rec.id].substring(1)
                      : ""}
                  </div>
                )}
                <div className="text-slate-600 text-[10px] sm:text-sm font-semibold mr-1 sm:mr-2">
                  {new Date(rec.created).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div className="flex gap-2 justify-end items-end mt-auto">
                {rec.creator === authID && (
                  <button onClick={() => handleEdit(rec.id)}>
                    <FontAwesomeIcon
                      icon={faPencil}
                      className="text-purple-400 hover:text-purple-600"
                    />
                  </button>
                )}
                {rec.creator === authID && (
                  <button onClick={() => openDeleteModal(rec.id)}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-red-400 mr-2 hover:text-red-600"
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            setBlogToDelete(null);
          }}
          onConfirm={handleDelete}
        />
      </div>
      <br />
      <ul className="flex justify-center gap-1 text-gray-900">
        <li>
          <a
            href="#"
            className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
            aria-label="Previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>

        {Array.from({ length: totalPages},(_, index) => (
          <li>
            <a
              // href={() => handlePageClick(page, perPage)}
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(page+1);
              }}
              // bg-indigo-600 border border-indigo-600
              className="block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium transition-colors hover:bg-gray-50"
              key={index}
            >
              {index+1}
              {/* {console.log("RECORD PAGE: ",totalBlogs)} */}
            </a>
          </li>
        ))}

        {/* the number of pages displayed down --> total blogs / total items per page (30/10 = 3) - DONE */}
        {/* when I click on p.2 for ex. I get the next 10 pages --> (record.page-1)*record.perPage */}

        <li>
          <a
            href="#"
            className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
            aria-label="Next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
      </ul>
    </>
  );
}

// TODO:
// LINE EPILIPSES ... in rec.body - done
// DON'T reload when deleting
// BLOG DESIGN - done
