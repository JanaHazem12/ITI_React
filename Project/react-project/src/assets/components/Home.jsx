import { React, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import PocketBase from "pocketbase";

export default function Home() {
  const [record, setRecord] = useState([]);
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
              <button className="hover:bg-green-200">
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-gray-400 mr-2"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
