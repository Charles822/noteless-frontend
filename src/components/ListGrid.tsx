import { useEffect, useState } from 'react';
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator";
import useLists from "../hooks/useLists"; 
import { List }from "../hooks/useLists"; 

const ListGrid = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { execute, data, error, isLoading } = useLists(undefined, 'get', undefined, pageNumber);
  const listsResponse = (data as List[]) ?? [];
  const lists = listsResponse.results;

  console.log(lists);

  // Pagination variables
  const handleNext = () => setPageNumber(prev => prev + 1);
  const handlePrevious = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const totalItems = listsResponse.count;
  const itemsPerPage = 10; // Adjust as needed
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    execute(); // Trigger fetching lists
  }, [pageNumber]); // need to add depency execute in prod server

  console.log(lists);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading lists: {error.message}</p>;

  // Check if data is defined and an array
  if (!lists || !Array.isArray(lists)) return <p>No lists available.</p>;
  
  return (
    <>
      <h1 className="my-2 w-full px-6 text-2xl font-bold">All Lists</h1>
      <div >
        {lists && lists.map((list) => 
          <div key={list.id} className="flex flex-col w-5/6 p-4 mb-0">
            <Separator className='gap-0'/>
            <Link to={`/list/${list.slug}`}>
              <Card>
                <CardHeader>
                  <CardTitle className="my-2 text-md">{list.name}</CardTitle>
                  <CardDescription className="flex w-full ">
                    <div className='w-3/5'>
                      <ul >
                        <li>Purpose: {list.description}</li>
                        <li>Agent Role: {list.agent_role.description}</li>
                      </ul>
                    </div>
                    <div className="flex flex-col w-2/5 items-end">
                      <ul >
                        <li>List created by <a className="text-rose-700"> @{list.owner.username}</a></li>
                        <li>On: {list.updated_at}</li>
                      </ul>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                </CardFooter>
              </Card>
            </Link>
          </div>
        )}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={handlePrevious} />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={(pageNumber < totalPages) ? handleNext : null} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
      </div>
    </>
  )
}

export default ListGrid



