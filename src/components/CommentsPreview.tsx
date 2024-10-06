import { useState, useCallback, useEffect } from "react";
import { MessageCircle }from "lucide-react";
import useComments from '../hooks/useComments';
import { CommentsCount } from '../hooks/useComments';

interface Props {
	noteId: number;
	updateAfterDelete: boolean;
	updateAfterPost: boolean;
}

const CommentsPreview = ({ noteId, updateAfterDelete, updateAfterPost }: Props) => {
	const [commentCount, setCommentCount] = useState<number>(0);
	const { execute, data } = useComments(noteId, undefined, 'get', 'count'); // Fetch votes data
	const comments_count_response = (data as CommentsCount) ?? null;

	// Fetch initial vote datas 
	const fetchCommentCount = useCallback(async () => {
	    try {
	      await execute();
	    } catch (err) {
	    	if (process.env.NODE_ENV === 'development') {
	      	console.error('Error fetching comment:', err);
	    	}
	      setCommentCount(0); // or any default value
	    }
	}, []);

  useEffect(() => {
      fetchCommentCount();
  }, [fetchCommentCount]);

  useEffect(() => {
  	if (updateAfterDelete || updateAfterPost) {
  		fetchCommentCount();
  	}
  }, [updateAfterDelete, updateAfterPost]);

	useEffect(() => {
		if (comments_count_response && comments_count_response.comments_count) {
			setCommentCount(comments_count_response.comments_count);
		} else {
	    setCommentCount(0); // or any default value
	  }
  }, [comments_count_response]); // need to add dependency execute in prod server

	return (
		<div className="flex items-center space-2 rounded-lg outline outline-gray-200 px-3 py-0.5 w-auto">
			<MessageCircle
				color='grey'
				strokeWidth={1}
				size={20} />
			<div className="text-sm text-stone-600" >{commentCount}</div>
		</div>
	)
}

export default CommentsPreview