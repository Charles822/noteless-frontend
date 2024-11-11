import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { jwtDecode, JwtPayload } from 'jwt-decode';
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator";
import { UrlLink } from '../utils/Formatting';
import useNotes from "../hooks/useNotes";
import { Note } from "../hooks/useNotes";
import CommentsPreview from './CommentsPreview';
import ClientPagination from './ClientPagination';
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
  const [pageNumber, setPageNumber] = useState(1);
  const { execute, data, error, isLoading } = useNotes(listSlug, undefined, 'get', undefined, pageNumber);
  const notesResponse = (data as Note[]) ?? [];
  const notes = notesResponse.results;

  
  const token = localStorage.getItem('authTokens');
  const userId = token ? (jwtDecode<MyJwtPayload>(token)).user_id : null;
  // Pagination variables
  const handleNext = () => setPageNumber(prev => prev + 1);
  const handlePrevious = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const totalItems = notesResponse.count;
  const itemsPerPage = 10; // Adjust as needed
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // const [displayedNotes, setDisplayedNotes] = useState<Note[]>(notes);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [notesPerPage, setNotesPerPage] = useState(5);

  // const lastNoteIndex = currentPage * notesPerPage;
  // const firstNoteIndex = lastNoteIndex - notesPerPage;
  // const currentNotes = notes.slice(firstNoteIndex, lastNoteIndex);

  useEffect(() => {
    execute(); // Trigger fetching the notes list
    reset(); 
  }, [isCreated, pageNumber]);

  console.log(notes);
  console.log(pageNumber);

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
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={handlePrevious} />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={(pageNumber < totalPages) ? handleNext : null} className={(pageNumber >= totalPages) ? 'text-rose-700' : ''} />
              </PaginationItem>
            </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}



export default NotePreviewList;


//  <PaginationSection totalNotes={notes.length} notesPerPage={notesPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />

// function PaginationSection({
//   totalNotes,
//   notesPerPage,
//   currentPage,
//   setCurrentPage,
// }: {totalNotes: any,
//   notesPerPage: any,
//   currentPage: any,
//   setCurrentPage: any,}
//   ) 
// {

//   // Rule to define the number of pages dynamically
//   let pages = [];
//   for (let numberOfPages = 1; numberOfPages <= Math.ceil(totalNotes / notesPerPage); numberOfPages++) {
//     pages.push(numberOfPages);
//   }

//   const handleNextPage = () => {
//     if (currentPage < pages.length) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//       <Pagination>
//         <PaginationContent>
//           <PaginationItem>
//             <PaginationPrevious onClick={() => handlePrevPage()} />
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationNext onClick={() => handleNextPage()} />
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>
//     )

// }


