import React, { Suspense,useEffect, useState, useRef } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./_components/Model";
import CustomBtn from "../../components/Button";
// import StatusVocab from "./_components/Statusvocab";
import api from '../../hooks/api';

const DisplayVocab = () => {
  const{ id:idParam} = useParams();
  const id = decodeURIComponent(idParam)
  const [data, setData] = useState({});
  const [animationClip, setAnimationClip] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);  

  //Fetch vocab data
  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const response = await api.get(`http://localhost:3000/api/vocab/word/${id}`);
        setData(response.data); 
        setError(null);
        setLoading(false); 
      } catch (err) {
        console.error("Error fetching vocabularies:", err);
        setError("Error fetching vocabularies. Please try again later.");
        setLoading(false);
      }
    }; 
    fetchVocabularies();

  }, [id]);

  // Fetch animation 
  useEffect(() => {
    const fetchAnimationClip = async () => {
      try {
        const animationId = data._id; // Assuming the animation clip ID is part of the vocab data
        const response = await api.get(`https://recorder.justsigns.co/api/animation/clip/66d3dee508841b0af4120272`);
        setAnimationClip(response.data.animationClip); // Using the _id as the prop for the Model component
      } catch (err) {
        console.error("Error fetching animation clip:", err);
        setAnimationClip(null);
      }
    };
    fetchAnimationClip();

  }, [data.animation_clip_id, id]);

  // Handle click to pause/play
  const handleModelClick=()=>{
    setIsPaused(prev => !prev);
  };

  //Update elapsed time every second
  const handleAnimationTimeUpdate = (elapsed, duration) => {
    setElapsedTime(elapsed);
    setAnimationDuration(duration);
  };
  
  const handleReportIssue = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="m-4 h-full flex">
        <figure className="w-1/2 bg-gray-100 rounded-lg p-4">
          <Canvas 
            onClick={handleModelClick} 
            camera={{ position: [0, 1, 1.5], fov:80
          }}> 
            <Suspense fallback={null}>
            <ambientLight intensity={4} />
            <directionalLight position={[5, 10, 7.5]} intensity={1}/>
            <Model 
              animationClip={animationClip}
              isPaused={isPaused} 
              onAnimationTimeUpdate={handleAnimationTimeUpdate}
            /> 
            <OrbitControls
              enableRotate={false}
              enableZoom={false}
              enablePan={false}
              target={[0, 1, 0]}
            />
            </Suspense>
          </Canvas>
        </figure>

        <div className="w-1/2 p-10 flex flex-col">
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
              <a className="text-xl font-semibold">
                หมวดหมู่ :{" "}
                <span className="font-normal">{data.category || "N/A"}</span>
              </a> 
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
              {/* <StatusVocab vocabulary={vocabulary} /> */}

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
