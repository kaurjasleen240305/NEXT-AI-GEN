"use client"
import {React,useState} from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import { videoDataContext } from "../_context/VideoDataContext";

function DashboardLayout({children}){
  const [videoData,setVideoData] = useState([]);
    return(
      <videoDataContext.Provider value={[videoData,setVideoData]}>
        <div>
          <div className="hidden md:block h-screen bg-white fixed mt-[65px]">
           <SideNav/>
          </div> 
          <div>
          <Header/>
          <div className="md:ml-64 p-10">
          {children}
          </div>
          </div> 
        </div>
        </videoDataContext.Provider>
    )
}

export default DashboardLayout;