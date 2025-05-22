import { React, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";
import { getAllBlogs, deleteBlog } from "../../api";
import { Toaster, toast } from 'react-hot-toast';
// import pb from "../../pb";


export default function Home() {
  // SHOW EDIT/DELETE BUTTONS FOR BLOGS CREATED BY THE USER IN THE 'currently_logged_in' COLLECTION
  // ADD BLOG SHOULD BE THERE IF I'M LOGGED IN
  // const pb = new PocketBase("http://127.0.0.1:8090");
  const navigate = useNavigate();

  // const authID = pb.authStore.isValid ? pb.authStore.record.id : null;
  const [record, setRecord] = useState([]);
  const [blogCreator, setblogCreator] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPostsFound, setNoPosts] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const result = await pb.collection("blogs").getFullList({
        //   sort: "-created",
        // });
        const result = await getAllBlogs();
        console.log("BLOGS: ", result);
        // NO POSTS
        if (result.length == 0) {
          setNoPosts(true);
        }
        setRecord(result);
      } catch (err) {
        if(err.response.status === 401){
          toast.error('Token expired, Please login.');
          console.log("TOKEN EXPIRED !");
          navigate("/login");
        }
        console.error("error fetching data", err);
      }
    };
    fetchData();
  }, []);

  const openDeleteModal = (id) => {
    setBlogToDelete(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;
    try {
      // await pb.collection("blogs").delete(blogToDelete);
      // to avoid reloading the page when deleting a blog
      await deleteBlog(blogToDelete); 
      setRecord(record.filter((rec) => rec.id !== blogToDelete));
      console.log("RECORDS: ", record);
      toast.success('Blog deleted successfully!');
      setModalOpen(false);
      setBlogToDelete(null);
      // navigate("/");
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const handleEdit = (id) => {
    const selectedBlog = record.find((rec) => rec.id === id);
    navigate(`/edit/${id}`, { state: { record: selectedBlog } });
  };

  useEffect(() => {
    // console.log("bbbbbbbbb");
    const fetchBlogCreators = async () => {
      const creators = {};
      for (const blog of record) {
        try {
          // const blogWithCreator = await pb.collection("blogs").getOne(blog.id, {
          //   expand: "creator",
          // });
          creators[blog.id] = blogCreator.expand.creator.username;
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
 <Toaster position="top-center" />
    <div className="mt-20 font-semibold">
        {localStorage.getItem('token') ? (
          <>
            <p className="text-purple-600 text-2xl mb-4">
              Welcome back{" "}
              <span className="ml-1 font-font1 text-purple-500 font-light">
                {localStorage.getItem('username').toUpperCase()}
              </span>{" "}
              ! <br />Ready to share your next blog?
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

      <br />
      <br />
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
                <div className="mt-2 h-[120px] truncate w-full px-2 py-2 sm:px-4 sm:py-4 text-gray-500 font-light text-left overflow-hidden transition-all duration-300 hover:overflow-y-auto hover:whitespace-normal">
                  {rec.body}
                </div>
              </div>
              <div className="flex flex-row gap-4 justify-between text-sm">
                {/* {blogCreator[rec.id] && ( */}
                  <div className="text-purple-400 text-sm sm:text-base font-bold ml-1 sm:ml-2">
                    {/* {blogCreator[rec.id]
                      ? blogCreator[rec.id].charAt(0).toUpperCase() +
                        blogCreator[rec.id].substring(1)
                      : ""} */}
                      <FontAwesomeIcon
                      icon={faUser}
                      className="text-purple-600 mr-2" />{rec.creator['username']}
                  </div>
                {/* )} */}
                <div className="text-slate-600 text-[10px] sm:text-sm font-semibold mr-1 sm:mr-2">
                  {new Date(rec.created_at).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div className="flex gap-2 justify-end items-end mt-auto">
                {/* {console.log("REC CREATOR ID:",rec.creator.id)}
                {console.log("LOCAL STORAGE ID:",localStorage)} */}
                {rec.creator['username'] === localStorage.getItem('username') &&
                  (<><button onClick={() => handleEdit(rec.id)}>
                  <FontAwesomeIcon
                    icon={faPencil}
                    className="text-purple-400 hover:text-purple-600" />
                </button><button onClick={() => openDeleteModal(rec.id)}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-red-400 mr-2 hover:text-red-600" />
                  </button></>)}
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
    </>
  );
}