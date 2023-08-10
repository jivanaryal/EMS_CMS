import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useParams } from "react-router";
import { get } from "../../../services/api";

const ChatHistory = () => {
  const [singleTask, setSingleTask] = useState([]);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    get(`/task_history/single/${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setSingleTask(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const historyRef = useRef(null);

  const handleDownloadPDF = () => {
    const input = historyRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("chat_history.pdf");
    });
  };

  return (
    <div className="grid place-content-center  ">
      <div className="border-gray-400 border-2 mt-4 overflow-x-auto p-4 ">
        <div className="p-2 text-center font-bold md:text-lg text-base bg-mainColor border-2 text-white">
          Task History Report
        </div>
        <div ref={historyRef}>
          {singleTask.map((val, i) => (
            <div className="body border-gray-400 border-2 md:text-sm text-[11px] bg-gradient-to-r from-[#c1d6eb] to-[#ebeaf0]   ">
              <div className="finish px-2 grid grid-cols-4 border-b-2 border-gray-400  hover:bg-gray-100">
                <p className="font-semibold border-gray-400 border-r-2 py-5">
                  Task Status
                </p>
                <p className="px-2 py-5">{val.status}</p>
              </div>
              <div className="finish px-2 grid grid-cols-4 border-b-2 border-gray-400  hover:bg-gray-100">
                <p className="font-semibold border-gray-400 border-r-2 py-5">
                  Time
                </p>
                <p className="px-2 py-5">{val.time}</p>
              </div>
              {/* remarks */}
              <div className="assign px-2 grid grid-cols-4 border-b-2 border-gray-400  hover:bg-gray-100">
                <p className="font-semibold border-gray-400 border-r-2 py-5 col-span-1">
                  Employee Final Remarks
                </p>
                <p className="capitalize py-5 px-2 col-span-3">
                  {val.emp_final_remark}
                </p>
              </div>
              <div className="assign px-2 grid grid-cols-4 border-b-2 border-gray-400  hover:bg-gray-100">
                <p className="font-semibold border-gray-400 border-r-2 py-5 col-span-1">
                  Issues and Roadbacks
                </p>
                <p className="capitalize py-5 px-2 col-span-3">{val.issues}</p>
              </div>
              <div className="assign px-2 grid grid-cols-4  hover:bg-gray-100">
                <p className="font-semibold border-gray-400 border-r-2 py-5 col-span-1">
                  Resources Used
                </p>
                <p className="capitalize py-5 px-2 col-span-3">
                  {val.resources}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-4 py-2 px-4 bg-mainColor hover:bg-blue-600 text-white rounded"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ChatHistory;
