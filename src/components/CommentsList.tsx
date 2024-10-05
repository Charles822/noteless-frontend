import { ReactNode, useState, useCallback, useEffect } from "react"
import { X }from "lucide-react"
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { baseURL } from "../services/api-client";
import useComments from "../hooks/useComments";
import { Comment } from "../hooks/useComments";

interface Props {
  noteId: number;
  isDeleted: (update: boolean) => void;
  isSubmitted: boolean;
  resetSubmission: () => void;
  resetDeletion: () => void;

}

// Tells typescript that my payload include a user_id property 
interface MyJwtPayload extends JwtPayload {
  user_id: number; 
}

const CommentsList = ({ noteId, isDeleted, isSubmitted, resetSubmission, resetDeletion }: Props) => { 
  const { execute, data, error, isLoading } = useComments(noteId, undefined, undefined, 'get', 'list');
  const comments = data?.comments as Comment[];
  const token = localStorage.getItem('authTokens');
  const userId = token ? (jwtDecode<MyJwtPayload>(token)).user_id : null;
  const { toast } = useToast();

  const deleteComment = useCallback(async (commentId: number) => {
    if (!token) {
      return;
    }
    
    try {
      const response = await fetch(`${baseURL}/interactions/comments/${commentId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${JSON.parse(token).access}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete comment');
        toast({variant: "destructive", description: "Your comment cannot be deleted at the moment!"});
      }

      isDeleted(true);
      // Refresh the comments list after deletion
      execute();

      setTimeout(() => {
      resetDeletion();
    }, 100); // Adjust the delay if necessary
      
      toast({variant: "success", description: "Your comment has been deleted successfully!"});
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
      console.error('Error deleting comment:', error);
      }
      toast({ variant: 'destructive', description: 'An unexpected error occurred. Please try again later.' });
    }
  }, []);

  useEffect(() => {
    execute(); // Trigger fetching the comment list
    resetSubmission();
  }, [isSubmitted]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note: {error.message}</p>;

  // Check if data is defined and not an array
  if (!comments || !Array.isArray(comments)) return <p className=' text-sm text-gray-700'>Be the first to comment on this note!</p>;

  // a delete button showed only to the comment owner
  const showButton = (comment_owner: number, element: ReactNode) => {
    if (comment_owner === userId)
      return element
  };

  return (
    <>
      <div >
        <h3 className="text-lg font-bold mb-6">Comments for this Note</h3>
        {comments && comments.map((comment) => 
          <div key={comment.id} className="mb-1">
            <Separator className='mb-2 my-2'/>
            <Card>
              <CardHeader>
                <div className="grid flex-1 gap-4 lg:grid-cols-7 xl:grid-cols-7 justify-between text-sm">
                  <span className="col-span-3 text-sm text-stone-600">From: <a className="text-rose-700"> @{comment.owner.username}</a></span>
                  <span className="col-span-3 text-sm text-stone-600">At: {comment.updated_at}</span>
                  <div className="flex justify-end items-center">
                  {showButton(comment.owner.id, (<Button 
                    variant="destructive" 
                    size="icon" 
                    className="p-01 w-4 h-4"
                    onClick={() => {
                    deleteComment(comment.id);
                  }} >
                    < X className="h-4 w-4" />
                  </Button>))}
                  </div>
                </div>
              </CardHeader>
                <CardContent className="grid flex-1 gap-4 lg:grid-cols-2 xl:grid-cols-2 justify-between text-sm">
                  <p className='text-sm text-stone-600'>{comment.text}</p>
                </CardContent>
              <CardFooter className="grid flex-1 gap-0 sm:px-6 sm:py-0 md:gap-0 lg:grid-cols-6 xl:grid-cols-6 mb-1">
              </CardFooter>
            </Card>
            <Toaster />
          </div>
        )}
      </div>
    </>
  )
}

export default CommentsList










