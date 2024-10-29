import useData from './useData';
import { List } from './useLists';

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
	endpointType: 'deduct' | 'add' | 'list' | 'profile' = 'deduct', 
	requestData?: any) => {
	
	const endpoint = 
		method === 'post'
		  ? `/users/users/create_user/`
		  : endpointType === 'list'
		  	? `/users/users/${userId}/lists/`
			  	: endpointType === 'profile'
			  	? `/users/profiles/user_profile/?user=${userId}`
		  		: endpointType === 'deduct'
				  	? `/users/profiles/deduct_credit/`
				  	: `/users/profiles/add_credit/`;

	return useData<User | ProfileResponse | List[]>(endpoint, method, requestData);
	}

export default useUsers;
