"use client";
import React, { useState } from "react";
import axios from "axios";
import NoteContext from "./noteContext";
const ContextApi = ({ children }) => {
  const Host = "http://localhost:500";
  const initialState = [];
  const [content, setcontent] = useState(initialState);


  const contextValue = {
    content,
  };
  return (
    <NoteContext.Provider value={contextValue}>{children}</NoteContext.Provider>
  );
};
export default ContextApi;
