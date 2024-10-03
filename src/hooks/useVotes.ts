import useData from "./useData.ts";

export interface Vote {
	id: number;
	note: number;
	vote: Response;
	owner: number;
}

const useVotes = (noteId?: number, userId?: number,  method: 'get' | 'post' | 'patch' = 'get', requestData?: any) => {
	const endpoint = method === 'post'
	? `/interactions/votes/add_vote/`
	: method === 'patch'
		? `/interactions/votes/patch_vote/`
		: userId
			? `/interactions/votes/user_vote/?note=${noteId}&owner=${userId}`
			: `/interactions/votes/votes_sum/?note=${noteId}`;

	return useData<Vote>(endpoint, method, requestData);
	}

export default useVotes;

