import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import useNotes from "../hooks/useNotes";
import { UrlLink, TextWithLineBreaks } from '../utils/Formatting';
import Vote from './Vote';
import CommentsPreview from './CommentsPreview';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';

// Tells typescript that my payload include a user_id property 
interface MyJwtPayload extends JwtPayload {
  user_id: number; 
}

const NoteDetailsCard = () => {
  const params = useParams<{noteSlug: string}>();
  const { execute, data: note, error, isLoading } = useNotes(undefined, params.noteSlug);
  const [isSubmitted, setStatus] = useState(false);
  const token = localStorage.getItem('authTokens');
  const userId = token ? (jwtDecode<MyJwtPayload>(token)).user_id : null;
  const [isDeleted, setUpdateCount] = useState(false);

  useEffect(() => {
    execute(); // Trigger fetching the note
  }, []); // need to add depency execute in prod server

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note: {error.message}</p>;

  // Check if data is defined and not an array
  if (!note || Array.isArray(note)) return <p>No note available.</p>;

  return (
    <>
      <Helmet>
        <title>Noteless | {note.video.title}</title>
        <meta name="description" content={note.meta_description} />
      </Helmet>
      <div className="grid flex-1 items-start justify-between gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
        <Card className="hover:bg-white">
          <CardHeader>
            <CardTitle className="my-2">{note.video.title}</CardTitle>
            <CardDescription className="grid flex-1 gap-4 lg:grid-cols-2 xl:grid-cols-2 justify-between">
              <ul>
                <li>Channel: {note.video.channel_name}</li>
                <li>
                  <UrlLink url={note.video.youtube_url} />
                </li>
                <li>Original language: {note.video.original_language}</li>
                <li>Published date: {note.video.published_at}</li>
              </ul>
              <ul>
                <li>Note created by <a className="text-rose-700"> @{note.owner.username}</a></li>
                <li>On: {note.created_at}</li>
              </ul>
            </CardDescription>
          </CardHeader>
          <Separator className="my-2 mx-auto w-2/3"/>
          <CardContent>
            <h3 className="my-2 text-rose-700">Agent Response</h3>
            <TextWithLineBreaks text={note.response.agent_response} />
          </CardContent>
          <CardFooter className="flex items-center justify-start gap-4 sm:px-6 sm:py-1.5">
            <Vote noteId={note.id} userId={userId} ></Vote>
            <CommentsPreview noteId={note.id} updateAfterDelete={isDeleted} updateAfterPost={isSubmitted} ></CommentsPreview>
          </CardFooter>
        </Card>
        <div className="items-start md:w-1/2" >
          <CommentForm isSubmitted={status => setStatus(status)} noteId={note.id} />
        </div>
        <div className="grid flex-1 gap-4 sm:px-6 sm:py-0 md:gap-0 lg:grid-cols-3 xl:grid-cols-3" >
          <div className="grid flex-1 col-span-2" >
          <CommentsList noteId={note.id} isDeleted={update => setUpdateCount(update)} isSubmitted={isSubmitted} resetSubmission={() => setStatus(false)} resetDeletion={() => setUpdateCount(false)} />
        </div>
        </div>
      </div>
    </>
  )
}

export default NoteDetailsCard










