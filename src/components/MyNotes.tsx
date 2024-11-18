import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator";
import { UrlLink } from '../utils/Formatting';
import useUsers from "../hooks/useUsers";
import { MyNotesResponse} from "../hooks/useUsers";
import CommentsPreview from './CommentsPreview';
import Vote from './Vote';

interface Props {
  user_id: number; 
}

const MyNotes= ({ user_id }: Props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { execute, data, error, isLoading } = useUsers(user_id, 'get', 'notes', undefined, pageNumber);
  const notesResponse = data as MyNotesResponse ?? {};
  const notes = notesResponse.results

    // Pagination variables
  const handleNext = () => setPageNumber(prev => prev + 1);
  const handlePrevious = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const totalItems = notesResponse.count;
  const itemsPerPage = 10; // Adjust as needed
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    execute(); // Trigger fetching the notes list
  }, [pageNumber]);

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
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={handlePrevious} />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={(pageNumber < totalPages) ? handleNext : () => {}} className={(pageNumber >= totalPages) ? 'text-rose-700' : ''} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
      </div>
    </>
  )
}

export default MyNotes