import useData from "./useData.ts";

export interface User {
	username: string;
}

export interface Comment {
	id: number;
	note: number;
	text: string;
	owner: User;
	updated_at: string;
}

const useComments = (
	noteId?: number, 
	userId?: number,
	commentId?: number,  
	method: 'get' | 'post' | 'patch' | 'delete' = 'get', 
	endpointType?: 'count' | 'list' = 'list', 
	requestData?: any) => {
	
	const endpoint = method === 'post'
      ? `/interactions/comments/add_comment/`
      : method === 'patch'
      ? `/interactions/comments/patch_comment/`
      : method === 'delete'
      ? `/interactions/comments/${commentId}/`
      : endpointType === 'count'
      ? `/interactions/comments/comments_count/?note=${noteId}`
      : `/interactions/comments/note_comments/?note=${noteId}`;

	return useData<Comment>(endpoint, method, requestData);
	}

export default useComments;
