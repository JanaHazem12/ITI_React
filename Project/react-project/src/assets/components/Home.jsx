import { React, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import PocketBase from "pocketbase";

export default function Home() {
  // SHOW EDIT/DELETE BUTTONS FOR BLOGS CREATED BY THE USER IN THE 'currently_logged_in' COLLECTION
  const [record, setRecord] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const handleConfirm = () => {
    alert("Action Confirmed!");
    setModalOpen(false);
  };

  const handleDelete = () => {
    // get the blog's id AND remove from DB
  }

  const handleEdit = () => {
    // get the blog's id AND edit
    // send the data to be edited as an object and replace with the ones already in the DB
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        const result = await pb.collection("blogs").getFullList({
          sort: "-created",
        });
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
      <div className="mt-30 font-semibold">
        <Link to="/add">
          <button className="h-10 w-70 rounded-md bg-purple-600 cursor-pointer text-white hover:bg-cyan-400 hover:text-purple-600">
            Add Blog
          </button>
        </Link>
      </div>
      <div className="flex flex-row gap-6 items-center justify-center bg-white p-4 h-screen">
        {record.map((rec) => (
          <div className="bg-white shadow-xl" key={rec.id}>
            <img
              src={rec.image}
              alt={rec.title}
              className="flex flex-col items-center justify-center inline-block object-cover w-[350px] h-[350px] p-[10px]"
            />
            <div className="flex flex-col items-center justify-center">
              <div className="font-bold">{rec.title}</div>
              <div className="flex flex-row gap-2 items-center justify-center">
                <div className="text-sm">
                  {new Date(rec.created).toLocaleString()}
                </div>
                <div>POSTED BY</div>
              </div>
              <div>{rec.body}</div>
              <br />
            </div>
            <div className="float-end">
              <Link to="/edit">
                <button className="hover:bg-green-200">
                  <FontAwesomeIcon
                    icon={faPencil}
                    className="text-gray-400 mr-2"
                  />
                </button>
              </Link>

              <button onClick={() => setModalOpen(true)}>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-gray-400 mr-2"
                />
              </button>
              <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirm}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
