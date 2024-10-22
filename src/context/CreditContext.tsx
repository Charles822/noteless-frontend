import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import useUsers from '../hooks/useUsers';
import { ProfileResponse } from '../hooks/useUsers';
import { baseURL } from "../services/api-client";

// Context definition
const ProfileContext = createContext<ProfileResponse | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

// Tells typescript that my payload include a user_id property 
interface MyJwtPayload extends JwtPayload {
  user_id: number; 
}

// fetch userId
const token = localStorage.getItem('authTokens');
const userId = token ? (jwtDecode<MyJwtPayload>(token)).user_id : null;

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
	const [profile, setProfile] = useState<ProfileResponse | null>(null);
	console.log('provider being called');

	useEffect(() => {
	  if (userId) {
	    const fetchProfile = async () => {
	      try {
	        const response = await fetch(`${baseURL}/users/profiles/user_profile/?user=${userId}`);
	        const data: ProfileResponse = await response.json();
	        setProfile(data);
	      } catch (error) {
	        console.error('Error fetching profile:', error);
	      }
	    };

	    fetchProfile();
	  }
}, [userId]);

	return (
		<ProfileContext.Provider value={profile}>
		  {children}
		</ProfileContext.Provider>
	);
};

// Custom hook
export function useProfileContext() {
  const profile = useContext(ProfileContext);

  if (profile === undefined) {
  	throw new Error('useProfileContext must be used within a ProfileProvider');
  }

  return profile;
}