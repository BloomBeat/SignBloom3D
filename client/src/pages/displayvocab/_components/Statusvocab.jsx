import React, { useState, useEffect } from "react";
import axios from 'axios';

const StatusVocab = ({ vocabulary }) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(`/api/tickets/status/${vocabulary}`);
        if (response.data && response.data.status) {
          setStatus(response.data.status);
        }
      } catch (error) {
        console.error("Error fetching ticket status:", error);
        setStatus(null);
      }
    };

    if (vocabulary) {
      fetchStatus();
    }
  }, [vocabulary]);

  if (!status) {
    return null; // Hide the component if there's no status
  }

  let statusColor;
  let statusText;

  switch (status) {
    case "checking":
      statusColor = "bg-yellow-500";
      statusText = "Checking ticket validity";
      break;
    case "in_progress":
      statusColor = "bg-blue-500";
      statusText = "In progress editing";
      break;
    case "done":
      statusColor = "bg-green-500";
      statusText = "Done editing";
      break;
    default:
      statusColor = "bg-gray-500";
      statusText = "Unknown status";
  }

  return (
    <div className={`p-4 rounded-md text-white ${statusColor}`}>
      {statusText}
    </div>
  );
};

export default StatusVocab;
