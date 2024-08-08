import React from "react";
import { useState, useEffect } from "react";
import Navbaruser from '../../components/Navbaruser';
import SearchBar from '../../components/Searchbar';
import Btn from '../../components/Botton';

export const HomePage = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbaruser/>
      <div className="flex-grow flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <SearchBar/>
          <Btn label="ดาวน์โหลด"/>
        </div>
      </div>
    </div>
  )
};