'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import EmptyState from "./_components/EmptyState";


function Dashboard() {
    const [videoList,setvideoList] = useState([]);
    console.log(videoList)
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

      </div>
    )
}

export default Dashboard;