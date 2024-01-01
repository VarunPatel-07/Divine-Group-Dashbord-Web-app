"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import noteContext from "@/context/noteContext";
function Home() {
  const { push } = useRouter();
  const [Loading, setLoading] = useState(true);
  const context = useContext(noteContext);

  const { IsLogIn ,  AuthToken , FetchUserDetail } = context;
  useEffect(() => {
    
    if (IsLogIn.Is_Login_Status || IsLogIn.authToken!=="undefined") {
      setLoading(false);
      FetchUserDetail( AuthToken);
    } else {
      setLoading(true);
      push("/pages/login");
    }
   
  }, []);
  if (Loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          fontSize: "100px",
          color: "white",
        }}
      >
        Loading.....
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Home;
