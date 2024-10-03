import useData from "./useData.ts";

export interface User {
	id: number;
	username: string;
}

const useUsers = (
	method: 'post',  
	requestData?: any) => {
	
	const endpoint = method === 'post'
      ? `/users/users/create_user/`
      : '';

	return useData<User>(endpoint, method, requestData);
	}

export default useUsers;
