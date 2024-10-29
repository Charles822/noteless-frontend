import useData from './useData';
import { List } from './useLists';
import { Note } from './useNotes';

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
	endpointType: 'deduct' | 'add' | 'list' | 'notes' = 'deduct', 
	requestData?: any) => {
	
	const endpoint = 
		method === 'post'
		  ? `/users/users/create_user/`
		  : endpointType === 'list'
		  	? `/users/users/${userId}/lists/`
			  	: endpointType === 'notes'
			  	? `/users/users/${userId}/notes/`
		  		: endpointType === 'deduct'
				  	? `/users/profiles/deduct_credit/`
				  	: `/users/profiles/add_credit/`;

	return useData<User | ProfileResponse | List[] | Note[]>(endpoint, method, requestData);
	}

export default useUsers;
