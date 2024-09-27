import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
/* import Model from "./_components/Model"; */
import CustomBtn from "../../components/Button";
import { Link } from "react-router-dom";
import StatusVocab from "./_components/Statusvocab";
import axios from 'axios';

const DisplayVocab = () => {
  const { category:categoryParam, vocabulary:vocabParam } = useParams();
  const category = decodeURIComponent(categoryParam)
  const vocabulary = decodeURIComponent(vocabParam)
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/vocab/word/${category}`);
        setData(response.data);
        setError(null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching vocabularies:", err);
        setError("Error fetching vocabularies. Please try again later.");
        setLoading(false);
      }
    };

    if (category) {
      fetchVocabularies();
    }
  }, [category, vocabulary, error]);

  const modelUrl = `/models/${vocabulary}.glb`;

  const handleReportIssue = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="m-4 h-full flex">
        <figure className="w-1/2 bg-gray-100 rounded-lg p-4">
          <Canvas camera={{ position: [0, 1, 1.2], fov: 45 }}>
            <ambientLight intensity={4} />
            <directionalLight position={[5, 10, 7.5]} intensity={1}/>
            {/* <Model
              modelUrl={modelUrl}
              position={[0, 0, 0]}
              scale={[0.01, 0.01, 0.01]}
            />  */}
            <OrbitControls
              enableRotate={false}
              enableZoom={false}
              enablePan={false}
              target={[0, 1, 0]}
            />
          </Canvas>
        </figure>

        <div className="w-1/2 p-10 flex flex-col">
          <h1 className="font-bold text-4xl">{vocabulary}</h1>
          <div className="divider"></div>

          {loading ? (
            <div className="text-primary">Loading vocabulary...</div>
          ) : error ? (
            <div className="text-primary">
              {error}
              <button
                onClick={handleReportIssue}
                className="btn btn-warning mt-2"
              >
                Report Issue
              </button>
            </div>
          ) : (
            // word detail
            <div className="flex flex-col gap-3">
              <a className="text-xl font-semibold">
                ชื่อคำ : <span className="font-bold">{data.name || "N/A"}</span>
              </a>
              <a className="text-xl font-semibold">
                ชนิดของคำ :{" "}
                <span className="font-normal">{data.parts_of_speech || "N/A"}</span>
              </a>
              {/* <a className="text-xl font-semibold">
                หมวดหมู่ :{" "}
                <span className="font-normal">{data.category || "N/A"}</span>
              </a> */}
              <a className="text-xl font-semibold">
                ความหมาย :{" "}
                <span className="font-normal">{data.description || "N/A"}</span>
              </a>
              <a className="text-xl font-semibold">
                อัดวันที่ :{" "}
                <span className="font-normal">{data.created_at || "N/A"}</span>
              </a>
              <a className="text-xl font-semibold">
                อัดโดย :{" "}
                <span className="font-normal">{data.author || "N/A"}</span>
              </a>
              <div className="divider"></div>

              {data.picture && (
                <img
                  src={data.picture}
                  alt={data.word}
                  className="w-40 mx-auto"
                />
              )}

              {/* StatusVocab component */}
              <StatusVocab vocabulary={vocabulary} />

              {/* Button controls */}
              <div className="flex gap-4 p-4">
                <Link to="/vocabulary">
                <CustomBtn
                  label="ดูคำอื่นๆ"
                  className="btn btn-secondary w-1/2 text-center"
                  />
                  </Link>
                <CustomBtn
                  label="ดาวน์โหลด"
                  className="btn btn-info w-1/2 text-center"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal for reporting issues */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">รายงานปัญหาที่พบ</h2>
            <p>โปรดระบุปัญหาที่พบ:</p>
            <textarea className="w-full p-2 border mb-4"></textarea>
            <div className="flex justify-end gap-4">
              <CustomBtn
                label="ส่งปัญหา"
                className="btn btn-primary"
                onClick={() => setIsModalOpen(false)}
              />
              <CustomBtn
                label="ยกเลิก"
                className="btn btn-secondary"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayVocab;
