"use client"
import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Textarea } from "@/components/ui/textarea"
  import { useState } from "react";

function SelectTopic({onUserSelect}){
    const options = [
        'Custom Prompt',
        'Random AI Story',
        'Scary Story',
        'Bed Time Story',
        'Motivational',
        'Fun Facts'
    ]
    const [selectedTopic,setSelectedTopic] = useState()
    return(
        <div>
            <h2 className="font-bold text-2xl text-primary">CONTENT</h2>
            <p className="text-gray-500">What is the topic of your video ?</p>
            <Select onValueChange={(value)=>{
                setSelectedTopic(value);
                value!='Custom Prompt'&&onUserSelect('topic',value)
                }}>
               <SelectTrigger className="w-full mt-2 p-6 text-lg">
                 <SelectValue placeholder="Content Type" />
               </SelectTrigger>
               <SelectContent>
                {options.map((item,index)=>(
                   <SelectItem value={item} key={index}>{item}</SelectItem>
                ))} 
               </SelectContent>
             </Select>  

             {selectedTopic == 'Custom Prompt' &&
               <Textarea onChange={(e)=>onUserSelect('topic',e.target.value)} className='mt-3' placeholder='Type the topic on which you want to generate the video'/>
             }           
     
        </div>
    )
}

export default SelectTopic