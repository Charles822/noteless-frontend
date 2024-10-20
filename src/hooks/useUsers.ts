import useData from "./useData.ts";

export interface User {
	id: number;
	username: string;
}

export interface Profile {
	user: User;
	first_name: string;
	last_name: string;
	email: string;
	credit: number; 
}

export interface ProfileResponse {
	has_profile: boolean;
	profile: Profile;

}

const useUsers = (
	userId?: number,
	method: 'post' | 'get' | 'patch' = 'post' , 
	requestData?: any) => {
	
	const endpoint = method === 'post'
      ? `/users/users/create_user/`
      : method === 'get'
      	? `/users/profiles/user-profile/?user=${userId}/`
      	: method === 'patch'
      		? `/users/profiles/deduct-credit/?user=${userId}/`
      		: '';

	return useData<User>(endpoint, method, requestData);
	}

export default useUsers;
