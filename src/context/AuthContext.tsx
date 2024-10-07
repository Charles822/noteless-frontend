import React, { createContext, useState, useEffect } from 'react'
import  { jwtDecode } from 'jwt-decode';
import { baseURL } from "../services/api-client";

interface UserType {
  // Define the properties according to the decoded token structure
  username: string;
}

interface AuthTokensType {
  access: string;
  refresh: string;
}

interface AuthContextType {
  user: UserType | null;
  authTokens: AuthTokensType | null;
  loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const tokens = localStorage.getItem('authTokens');
    let [user, setUser] = useState<UserType | null>(() => {
        return tokens ? jwtDecode(tokens) : null;
    });
    let [authTokens, setAuthTokens] = useState<AuthTokensType | null>(() => {   
      return tokens ? JSON.parse(tokens) : null;
    });
    let [loading, setLoading] = useState(true)

    let loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement;
        const username = (target.elements.namedItem('username') as HTMLInputElement).value;
        const password = (target.elements.namedItem('password') as HTMLInputElement).value;
        const response = await fetch(`${baseURL}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        let data = await response.json();

        if(data){
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
        } else {
            let error = await response.json();
            alert(error.detail || 'Login failed!');
        }
    }

        let logoutUser = () => {
          localStorage.removeItem('authTokens');
          setAuthTokens(null);
          setUser(null);
          // Redirect or perform other cleanup actions
        };

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    const updateToken = async () => {
        if (!authTokens?.refresh) {
            if (process.env.NODE_ENV === 'development') {
                console.error('No refresh token available');
            }
            return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({refresh:authTokens?.refresh})
        })

        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        } else {
            if (process.env.NODE_ENV === 'development') {
                console.error('Failed to refresh token:', data);
            }
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(loading && authTokens && authTokens.refresh){
            updateToken();
            setLoading(false);
        }
        const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
        let interval = setInterval(()=>{
            if(authTokens && authTokens.refresh){
                updateToken()
            }
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval)

    },[authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}