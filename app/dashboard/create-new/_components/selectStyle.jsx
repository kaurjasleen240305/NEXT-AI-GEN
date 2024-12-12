import React from "react";
import Image  from "next/image";
import { useState } from "react";

function SelectStyle({onUserselect}){
    const styleOptions = [
        {
            name:'Realistic',
            image:'/real.jpg'
        },
        {
            name:'Cartoon',
            image:'/cartoon.jpg'
        },
        {
            name:'Comic',
            image:'/comic.jpg'
        },
        {
            name:'Historic',
            image:'/historic.jpg'
        },
        {
            name:'WaterColor',
            image:'/water.jpg'
        },
    ]
    const [selectStyle,setSelectedStyle] = useState();

    return(
        <div className="mt-7">
            <h2 className="font-bold text-2xl text-primary">Style</h2>
            <p className="text-gray-500 mb-5 mt-5">Select your video style?</p>
            <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3"}>
                {styleOptions.map((item,index)=>(
                    <div key={index} className={`relative hover:scale-105 transition-all cursor-pointer ${selectStyle==item.name && 'border-4 border-primary'}`}>
                       <Image src={item.image} width={100} height={100} className="h-48 object-cover rounded-lg w-full" 
                         onClick={()=>{
                            setSelectedStyle(item.name)
                            onUserselect('imageStyle',item.name)
                         }}
                       />
                       <h2 className="absolute p-1 bg-black text-center bottom-0 w-full text-white rounded-b-lg">{item.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectStyle;