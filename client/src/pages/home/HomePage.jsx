import React from "react";
import { useState, useEffect } from "react";
import Navbaruser from '../../components/Navbaruser';
import SearchBar from '../../components/Searchbar';

export const HomePage = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbaruser/>
      <div className="flex-grow flex items-center justify-center">
        <SearchBar />
      </div>
    </div>
  )
};
