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
	method: 'get' | 'post' | 'patch' = 'get', 
	requestData?: any) => {
	
	const endpoint = 
		method === 'post'
		  ? `/users/users/create_user/`
		  : method === 'get'
		  	? `/users/profiles/user_profile/?user=${userId}`
		  	: `/users/profiles/deduct_credit/`;

	return useData<User | ProfileResponse>(endpoint, method, requestData);
	}

export default useUsers;
