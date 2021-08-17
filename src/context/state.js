import { createContext, useContext, useEffect, useState } from "react"
import config from "../config";

const AppContext = createContext();

const initialSharedState = {
    user: "",
    userToken: "",
    msg: false
}

export function AppWrapper({ children }) {
    const [sharedState, setSharedState] = useState(initialSharedState)
    useEffect(() => {
        const prevData = JSON.parse(localStorage.getItem(config.sharedState)) || {}
        setSharedState(prevState => ({ ...prevState, ...prevData }));
        setTimeout(() => {
            setSharedState(prevState => ({ ...prevState, msg: false }));
        }, 4000);
    }, [])
    
    const upDataState = (data) => {
        const prevData = JSON.parse(localStorage.getItem(config.sharedState)) || {}
        const newData = { ...prevData, ...data };
        localStorage.setItem(config.sharedState, JSON.stringify(newData))
        setSharedState(prevState => ({ ...prevState, ...newData }));
        
        if (data.msg) {
            setTimeout(() => {
                setSharedState(prevState => ({ ...prevState, msg: false }));
            }, 4000);
        }
    }

    return (
      <AppContext.Provider value={[sharedState, upDataState]}>
        {children}
      </AppContext.Provider>
    );
}


export function useAppContext() {
    return useContext(AppContext);
}
  