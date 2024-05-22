import { createContext, useState } from "react";

export const otherContext=createContext()
export default function OtherContext({children}){
    const [other,setOther]=useState(null)
    return(
        <otherContext.Provider value={[other,setOther]}>
            {children}
        </otherContext.Provider>
    )
}
