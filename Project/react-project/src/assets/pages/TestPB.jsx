import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";

export default function TestPB() {
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
      <div className="flex items-center justify-center font-font3 text-8xl text-purple-500 py-60">
        Edit Blog
      </div>
      <div className="p-4 border border-red-500 text-red-500">
        {record.map((rec) => (
          <div>
            <span>{rec.title}</span><br />
            <span>{rec.body}</span>
          </div>
        ))}
      </div>
    </>
  );
}
