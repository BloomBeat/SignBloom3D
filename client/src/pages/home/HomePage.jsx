import { useState, useEffect } from "react";

export const HomePage = () => {
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("/api")
  //     .then((response) => response.json())
  //     .then((data) => setMessage(data.message));
  // }, []);
  // return <div className="mt-10 flex w-full flex-col">{message}</div>;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch('/api/search'); // Replace with your API endpoint
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchSearchResults();
  }, []);

  return (
    <div>
   
     
    </div>
 
  )
};
