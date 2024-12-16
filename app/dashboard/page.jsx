'use client'
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import EmptyState from "./_components/EmptyState";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import VideoList from "./_components/VideoList";


function Dashboard() {
    const [videoList,setvideoList] = useState([]);
    const {user} = useUser();
    console.log(videoList)

    const GetVideoList = async()=>{
      console.log("lnhltj")
      const result = await db.select().from(VideoData).where(eq(VideoData?.createdBy,user?.primaryEmailAddress?.emailAddress));
      console.log(result);
      setvideoList(result);
    }

    useEffect(()=>{
      console.log("kjrgnjekt")
      user && GetVideoList();
    },[user])
    return (
      <div>
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-primary">Dashboard</h2>
          <Link href={'/dashboard/create-new'}>
           <Button>+ Create New</Button>
          </Link>
        </div>
        {videoList?.length==0 &&
          <div>
            <EmptyState/>
          </div> 
        }
        <VideoList videoList={videoList}/>
      </div>
    )
}

export default Dashboard;