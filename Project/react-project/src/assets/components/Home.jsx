import { React, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";
import PocketBase from "pocketbase";

export default function Home() {
  // SHOW EDIT/DELETE BUTTONS FOR BLOGS CREATED BY THE USER IN THE 'currently_logged_in' COLLECTION
  const pb = new PocketBase("http://127.0.0.1:8090");
  const authID = pb.authStore.record.id;
  const [record, setRecord] = useState([]);
  const [blogCreator, setblogCreator] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const handleConfirm = () => {
    // alert("Action Confirmed!");
    setModalOpen(false);
    navigate("/");
  };
  const navigate = useNavigate();

  const handleDelete = () => {
    // get the blog's id AND remove from DB
  };

  // const authName = pb.authStore.record.username;
  // if (record.id === authID){
  //   setShowButtons(true)
  // } else{
  //   setShowButtons(false)
  // }

  const goToHomepage = async (id) => {
    setModalOpen(true);
    try {
      const pb = new PocketBase("http://127.0.0.1:8090");
      const deleteBlog = await pb.collection("blogs").delete(id);
      navigate("/");
    } catch (err) {
      console.log("ERROR");
    }
  };

  const handleEdit = (id) => {
    const selectedBlog = record.find((rec) => rec.id === id);
    navigate(`/edit/${id}`, { state: { record: selectedBlog } });
  };

  // useEffect(() => {
  //   const blogCreatorName = async (id) => {
  //     try {
  //       const pb = new PocketBase("http://127.0.0.1:8090");
  //       const getBlog = await pb.collection("blogs").getOne(id, {
  //         expand: "creator",
  //       });
  //       const getBlogCreator = getBlog.expand.creator.username;
  //       setblogCreator(getBlogCreator);
  //       // console.log("HEREEE", blogCreator);
  //     } catch (err) {
  //       console.log("Error: ", err.data);
  //     }
  //   };

  //   blogCreatorName(id);
  // }, [id]);

  useEffect(() => {
    const fetchBlogCreators = async () => {
      const pb = new PocketBase("http://127.0.0.1:8090");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        const result = await pb.collection("blogs").getFullList({
          sort: "-created",
        });
        // const getID = await pb.collection("blogs").getFirstListItem({`id="${isRecord.id}"`})
        setRecord(result);
      } catch (error) {
        console.error("error fetching data", error);
      }
    };
    fetchData();
  }, []);
  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 justify-self-center py-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
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
          <form onSubmit={handleDelete}>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={onConfirm}
            >
              Yes, Delete!
            </button>
          </form>
        </div>
      </Modal>
    );
  };
  return (
    <>
      <div className="mt-20 font-semibold">
        <Link to="/add">
          <button className="h-10 w-70 rounded-md bg-purple-600 cursor-pointer text-white hover:bg-cyan-400 hover:text-purple-600 hover:font-semibold">
            Add Blog
          </button>
        </Link>
      </div>
      <br></br>
      <div className="w-full grid grid-cols-4 gap-4 bg-white">
        {record.map((rec) => (
          <div className="bg-white shadow-xl" key={rec.id}>
            <img
              src={rec.image}
              alt={rec.title}
              className="flex flex-col items-center justify-center inline-block object-cover w-[350px] h-[350px] p-[10px]"
            />
            <div className="flex flex-col items-center justify-center">
              <div className="font-light font-serif text-[18px] text-gray-600">
                {rec.title.toUpperCase()}
              </div>
              <div className="flex flex-row gap-2 items-center justify-center">
                <div className="text-sm">
                  {new Date(rec.created).toLocaleString()}
                </div>
                {blogCreator[rec.id] && (
                  <div className="">
                    POSTED BY: {blogCreator[rec.id]}
                  </div>
                )}
              </div>
              <div className="text-gray-700 font-semibold text-left px-4">
                {rec.body}
              </div>
            </div>
            <div className="float-end align-text-bottom">
              {/* <Link to={`/edit/${rec.id}`}> */}
              {rec.creator === authID && (
                <button
                  className="hover:bg-green-200"
                  onClick={() => handleEdit(rec.id)}
                >
                  <FontAwesomeIcon
                    icon={faPencil}
                    className="text-gray-400 mr-2"
                  />
                </button>
              )}
              {/* </Link> */}

              {rec.creator === authID && (
                <button onClick={() => goToHomepage(rec.id)}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-gray-400 mr-2"
                  />
                </button>
              )}
            </div>

            <ConfirmationModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              onConfirm={handleConfirm}
            />
          </div>
        ))}
      </div>
    </>
  );
}


// TODO:
// LINE EPILIPSES ...