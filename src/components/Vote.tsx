import { ReactNode, useState, useCallback, useEffect } from "react"
import {ArrowBigUp, ArrowBigDown}from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import useVotes from '../hooks/useVotes'

interface Props {
	noteId: number;
	userId: number;

}

const Vote = ({ noteId, userId }: Props) => {
	const [voteStatus, setVoteStatus] = useState<number | null>(null);
	const { execute, data, error } = useVotes(noteId, userId); // Fetch votes data
	const { execute: execute_patch } = useVotes(undefined, undefined, 'patch'); // update a vote
	const { execute: execute_post, data: new_vote_data } = useVotes(undefined, undefined, 'post'); // create a vote 
	const { execute: execute_votes_sum, data: votes_sum, error: votes_sum_error } = useVotes(noteId, undefined); // Get votes sum
	const [voteSum, setVoteSum] = useState<number>(0);
	const { toast } = useToast();

	// Fetch initial vote datas 
	const fetchData = useCallback(async () => {
	    try {
	      await execute();
	    } catch (error) {
	    	if (process.env.NODE_ENV === 'development') {
	      	console.error('Error fetching vote:', error);
	  		}
	      setVoteStatus(null); // or any default value
	    }
	}, [voteStatus]);

	useEffect(() => {
	  fetchData();
	}, [fetchData]);


	useEffect(() => {
		if (data && data.vote) {
			setVoteStatus(data.vote.vote);	
		} else {
	    setVoteStatus(null); // Default if no vote
	  }
  }, [data]); // need to add dependency execute in prod server


	// Load initial & updated votes count
	useEffect(() => {
	  const fetchVoteSum = async () => {
	    try {
	      await execute_votes_sum();
	    } catch (votes_sum_error) {
	    	if (process.env.NODE_ENV === 'development') {
	      	console.error('Error fetching votes sum:', votes_sum_error);
	  		}
	    }
	  };

	  fetchVoteSum();
	  
	}, [voteSum]);

	useEffect(() => {
		if (votes_sum && votes_sum.votes_sum) {
			setVoteSum(votes_sum.votes_sum)	
		} else {
	    setVoteSum(0) // Default if no vote
	  }
  }, [votes_sum]); // need to add dependency execute in prod server

	// prompt a user to login when clicking on a vote button while being logged out
	function check_login_status() {
    	const token = localStorage.getItem('authTokens');

		if (!token) {
			toast({ variant: "error", description: "Please log in to vote." });
		    return false;
		};

		return true;	
	}

    const updateVote = async (new_vote_value: number) => {
	    const previousVoteStatus = voteStatus;
	    const previousVoteSum = voteSum;
	    setVoteStatus(new_vote_value); // Optimistically update state

	    // Optimistically update VoteSum
	    (new_vote_value === 0 && voteStatus === 1)
	    	? setVoteSum(voteSum  => voteSum - 1)
	    	: (new_vote_value === 0 && voteStatus === -1)
	    		? setVoteSum(voteSum  => voteSum + 1)
	    		: setVoteSum(voteSum  => voteSum + (new_vote_value));

	    const vote_data = {
	      id: data.vote.id,
	      vote: new_vote_value,
	    };

	    try {
	      await execute_patch(vote_data);
	    } catch (error) {
	    	if (process.env.NODE_ENV === 'development') {
	      		console.error("Error updating vote:", error);
	  		}
	      setVoteStatus(previousVoteStatus); // Revert if there's an error
	      setVoteSum(previousVoteSum); // Optionally, revert optimistic update
	    }
  	};

  	// logic when a user press a vote button on a note for the first time
    const createVote = async (vote_value: number) => {
	    const previousVoteStatus = voteStatus;
	    const previousVoteSum = voteSum;
	    setVoteStatus(vote_value); // Optimistically update voteStatus 
	    (voteSum === 0 && vote_value === -1)
	    ? setVoteSum(0)
	    : setVoteSum(voteSum  => voteSum + (vote_value)); // Optimistically update VoteSum

	    const vote_data = {
	      note: noteId,
	      vote: vote_value,
	      owner: userId,
	    };

	    try {
	      await execute_post(vote_data);
	      if (new_vote_data)
	      	data = new_vote_data;
	    } catch (error) {
	    	if (process.env.NODE_ENV === 'development') {
	      	console.error("Error updating vote:", error);
	  		}
	      setVoteStatus(previousVoteStatus); // Revert if there's an error
	      setVoteSum(previousVoteSum); // Optionally, revert optimistic update
	    }
  	};

	const upColor = voteStatus === 1 ? 'text-rose-500 fill-rose-500' : 'text-gray-500';
  	const downColor = voteStatus === -1 ? 'text-rose-500 fill-rose-500' : 'text-gray-500';
  	const countColor = (voteStatus === -1 || voteStatus === 1) ? 'text-rose-700' : 'text-gray-500';

	return (
		<div className="flex items-center space-1 rounded-lg outline outline-gray-200 px-1  w-auto">
			<ArrowBigUp onClick={() => {
				if (!check_login_status()) return;
				voteStatus === 1 
					? updateVote(0) 
					: (voteStatus === 0 || voteStatus === -1)
					? updateVote(1) 
					: createVote(1)
				}}
				className={`${upColor}`}
				strokeWidth={1} />
			<div className={`text-sm ${countColor}`} >{voteSum}</div>
			<ArrowBigDown onClick={() => {
				if (!check_login_status()) return;				
				voteStatus === -1 
					? updateVote(0) 
					: (voteStatus === 0 || voteStatus === 1)
					? updateVote(-1) 
					: createVote(-1)
				}}
				className={`${downColor}`} 
				strokeWidth={1} />
		</div>
	)
}

export default Vote;