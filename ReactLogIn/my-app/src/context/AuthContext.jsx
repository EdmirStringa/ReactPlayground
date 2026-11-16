import React from 'react'
import { createContext, useContext, useState } from 'react';
import api from '../api/axios';
import {jwtDecode} from 'jwt-decode';
const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [token,setToken] = useState(localStorage.getItem('token'));
    const user = token? decodeUser(token) : null;
    async function login(username, password){
        const res = await api.post('/auth/login',{username,password});
        localStorage.setItem('token',res.data.accessToken);
        setToken(res.data.accessToken);
    }
   function decodeUser(token){
    const decoded = jwtDecode(token);
    return{
        username: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
    };
   }
   function logout(){
    localStorage.removeItem('token');
    setToken(null);
   }
    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);