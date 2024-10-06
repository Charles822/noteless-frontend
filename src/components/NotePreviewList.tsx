import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UrlLink } from '../utils/Formatting';
import useNotes from "../hooks/useNotes";
import { Note } from "../hooks/useNotes";
import CommentsPreview from './CommentsPreview';
import Vote from './Vote';

interface Props {
  listSlug: string;
  isCreated: boolean; // to notify this component to refresh upon creation of a new note
  reset: () => void; // notify ListDetails that this component has been refresh and reset the value
}

// Tells typescript that my payload include a user_id property 
interface MyJwtPayload extends JwtPayload {
  user_id: number; 
}

const NotePreviewList = ({ listSlug, isCreated, reset }: Props) => {
  const { execute, data, error, isLoading } = useNotes(listSlug);
  const notes = (data as Note[]) ?? [];
  const token = localStorage.getItem('authTokens');
  const userId = token ? (jwtDecode<MyJwtPayload>(token)).user_id : null;

  useEffect(() => {
    execute(); // Trigger fetching the comment list
    reset(); 
  }, [isCreated]); // need to add depency execute in prod server

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note: {error.message}</p>;

  // Check if data is defined and not an array
  if (!notes || !Array.isArray(notes)) return <p>No notes available.</p>;

  // Tell the users when there are no notes yet in a list
  function noNotesMessage() {
    if (notes.length === 0) return <p>No notes available in this list yet.</p>;
  }
  
  return (
    <>
      <div className="col-span-3">
        <h3 className="text-lg font-bold mb-6">Notes in this List</h3>
        {noNotesMessage()}
        {notes && notes.map((note) => 
          <div key={note.id} className="mb-2">
            <Separator className='gap-0 mb-1'/>
              <Card>
                <Link to={`/note/${note.slug}`}>
                  <CardHeader>
                    <CardTitle className="my-2 text-md">{note.video.title}</CardTitle>
                    <CardDescription className="grid gap-4 lg:grid-cols-2 xl:grid-cols-2 justify-between">
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
                  <Vote noteId={note.id} userId={userId} ></Vote>
                  <CommentsPreview noteId={note.id} updateAfterDelete={false} updateAfterPost={false}></CommentsPreview>
                </CardFooter>
              </Card>
          </div>
        )}
      </div>
    </>
  )
}

export default NotePreviewList;