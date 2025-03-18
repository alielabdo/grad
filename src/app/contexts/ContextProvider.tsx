'use client';

import React,{useContext,createContext,useState,ReactNode} from 'react'

type RoleType = "CUSTOMER" | "DESIGNER";

interface StateContextType {
  role: RoleType;
  setRole: (role: RoleType) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<RoleType>("CUSTOMER");
 
  return (
    <StateContext.Provider value={{role,setRole}}>
      {children}
    </StateContext.Provider>
  )
}


export const useStateContext = (): StateContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a ContextProvider");
  }
  return context;
};