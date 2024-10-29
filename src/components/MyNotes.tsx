import { useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UrlLink } from '../utils/Formatting';
import useUsers from "../hooks/useUsers";
import { Note } from "../hooks/useNotes";
import CommentsPreview from './CommentsPreview';
import Vote from './Vote';

interface Props {
  user_id: number; 
}

const MyNotes= ({ user_id }: Props) => {
  const { execute, data, error, isLoading } = useUsers(user_id, 'get', 'notes');
  const notes = (data as Note[]) ?? [];

  useEffect(() => {
    execute(); // Trigger fetching the notes list
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading  your notes: {error.message}</p>;

  // Check if data is defined and not an array
  if (!notes || !Array.isArray(notes)) return <p>You have not created notes yet.</p>;
  
  return (
    <>
      <div className="">
        <h2 className="text-xl font-bold mb-2 my-2">My Notes</h2>
        {notes && notes.map((note) => 
          <div key={note.id} className="mb-2">
            <Separator className='gap-0 mb-1'/>
              <Card>
                <Link to={`/note/${note.slug}`}>
                  <CardHeader>
                    <CardTitle className="my-2 text-md">{note.video.title}</CardTitle>
                    <CardDescription className="grid gap-2 lg:grid-cols-2 xl:grid-cols-2">
                      <ul>
                        <li>Channel: {note.video.channel_name}</li>
                        <li>
                          <UrlLink url={note.video.youtube_url} />
                        </li>
                        <li>Original language: {note.video.original_language}</li>
                        <li>Published date: {note.video.published_at}</li>
                      </ul>
                      <ul>
                        <li>Note created by {note.owner.username}</li>
                        <li>On: {note.created_at}</li>
                      </ul>
                    </CardDescription>
                  </CardHeader>
                </Link>
                <CardFooter className="flex items-center justify-start gap-4 sm:px-6 sm:py-1.5">
                  <Vote noteId={note.id} userId={user_id} ></Vote>
                  <CommentsPreview noteId={note.id} updateAfterDelete={false} updateAfterPost={false}></CommentsPreview>
                </CardFooter>
              </Card>
          </div>
        )}
      </div>
    </>
  )
}

export default MyNotes