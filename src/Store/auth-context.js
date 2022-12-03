import React from "react";
import { useState } from "react";


const AuthContext = React.createContext({
    // token : '',
    // isLoggedin : false,
    // login: (token)=>{},
    // logout: ()=>{},
});

export const AuthContextProvider=(props)=>{
  const initialtoken = localStorage.getItem('token')
    const [token, setToken] = useState(initialtoken);

    const userIsLoggedIn = !!token;
  console.log(userIsLoggedIn)
    const loginHandler = (token) => {
        console.log('login')
      setToken(token);
      localStorage.setItem('token',token)
    };
  
    const logoutHandler = () => {
      setToken(null);
      localStorage.removeItem('token')
    };
  
    const contextValue = {
      token: token,
      isLoggedIn: userIsLoggedIn ,
      login: loginHandler,
      logout: logoutHandler,
    };
  
    return (
      <AuthContext.Provider value={contextValue}>
        {props.children}
      </AuthContext.Provider>
    );
}
export default AuthContext;