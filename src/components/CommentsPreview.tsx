import { ReactNode, useState, useCallback, useEffect } from "react"
import { MessageCircle }from "lucide-react"
import useComments from '../hooks/useComments'

interface Props {
	noteId: number;
	updateAfterDelete: boolean;
	updateAfterPost: boolean;
}

const CommentsPreview = ({ noteId, updateAfterDelete, updateAfterPost }: Props) => {
	const [commentCount, setCommentCount] = useState<number>(0);
	const { execute, data, error } = useComments(noteId, undefined, undefined, 'get', 'count'); // Fetch votes data

	// Fetch initial vote datas 
	const fetchCommentCount = useCallback(async () => {
	    try {
	      await execute();
	    } catch (error) {
	    	if (process.env.NODE_ENV === 'development') {
	      	console.error('Error fetching comment:', error);
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
		if (data && data.comments_count) {
			setCommentCount(data.comments_count);
		} else {
	    setCommentCount(0); // or any default value
	  }
  }, [data]); // need to add dependency execute in prod server

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