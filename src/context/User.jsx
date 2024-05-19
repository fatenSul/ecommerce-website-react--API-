import { useEffect } from "react";
import { createContext , useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({children}) => {
    return children
};

export default UserContextProvider;