import { createContext, useState } from "react";

export const postContext=createContext()
export default function PostContext({children}){
    const [post,setPost]=useState([])
    return(
        <postContext.Provider value={[post,setPost]}>
            {children}
        </postContext.Provider>
    )
}
