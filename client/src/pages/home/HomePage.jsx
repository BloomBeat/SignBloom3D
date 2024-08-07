import React from "react";
import { useState, useEffect } from "react";
import Navbaruser from '../../components/Navbaruser';
import Searchbar from '../../components/Searchbar'

export const HomePage = () => {
  const [message, setMessage] = useState("");

  return (
    <div>
      <Navbaruser/>
      <Searchbar/>
    </div>
  )
};
