import useData from "./useData.ts";

export interface VoteResponse {
	has_voted: boolean;
	vote: Vote;

}

export interface VoteSum {
	votes_sum: number;
}

export interface Vote {
	id: number;
	note: number;
	vote: number;
	owner: number;
}

const useVotes = (noteId?: number, userId?: number,  method: 'get' | 'post' | 'patch' = 'get', requestData?: any) => {
	const endpoint = method === 'post'
	? `/interactions/votes/add_vote/`
	: method === 'patch'
		? `/interactions/votes/patch_vote/`
		: userId
			? `/interactions/votes/user_vote/?note=${noteId}&owner=${userId}` // Revert a VoteResponse object
			: `/interactions/votes/votes_sum/?note=${noteId}`;

	return useData<Vote | VoteResponse | VoteSum>(endpoint, method, requestData);
	}

export default useVotes;

