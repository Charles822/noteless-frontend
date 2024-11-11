import useData from "./useData.ts";

export interface AgentRole {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface User {
  username: string;
}

export interface List {
	id: number;
	name: string;
	description: string;
	agent_role: AgentRole;
	owner: User;
	updated_at: string;
	created_at: string;
  slug: string;
  meta_description: string;
}

const useLists = (
    slug?: string, 
    method: 'get' | 'post' | 'patch' = 'get', 
    requestData?: { name: string; description: string; agent_role_description: string; owner: number },
    pageNumber?: number = 1) => {
  const endpoint = method === 'post'
    ? '/lists/lists/add_list/'
    : slug 
      ? `/lists/lists/${slug}/`
      : `/lists/lists/?page=${pageNumber}`;

  return useData<List | List[] >(endpoint, method, requestData);
}

export default useLists;
