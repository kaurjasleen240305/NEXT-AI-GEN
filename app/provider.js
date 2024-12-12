"use client"
import React, { useEffect } from 'react'
import {useUser} from "@clerk/nextjs"
import {db} from "../configs/db"
import {users} from "../configs/schema"
import {eq} from "drizzle-orm"

function Provider({children}){
    const {user} = useUser();

    const fullName = user?.fullName;
    const email = user?.primaryEmailAddress?.emailAddress;
    const imageUrl = user?.imageUrl;

    console.log(fullName);
    console.log(email);
    console.log(typeof(imageUrl))

    useEffect(()=>{
        user&&isnewUser();
    },[user]);

    const isnewUser = async()=>{
        const result = await db.select().from(users).where(eq(users.email,user?.primaryEmailAddress?.emailAddress));
        console.log(result);
        if(result.length === 0){
            await db.insert(users).values({
                name:fullName,
                email:email,
                imageUrl:imageUrl,
            })
        }
    }
    return(
        <div>
            {children}
        </div>
    )
}

export default Provider