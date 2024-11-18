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
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator";
import useUsers from "../hooks/useUsers"; 
import { MyListsResponse }from "../hooks/useUsers"; 
// Tells typescript that my payload include a user_id property 

interface Props {
  user_id: number;
}

const MyLists = ({ user_id }: Props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { execute, data, error, isLoading } = useUsers(user_id, 'get', 'list', undefined, pageNumber);
  const listsResponse = data as MyListsResponse ?? {};
  const lists = listsResponse.results

  // Pagination variables
  const handleNext = () => setPageNumber(prev => prev + 1);
  const handlePrevious = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const totalItems = listsResponse.count;
  const itemsPerPage = 10; // Adjust as needed
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    execute(); // Trigger fetching lists
  }, [pageNumber]); // need to add depency execute in prod server

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading your lists: {error.message}</p>;

  // Check if data is defined and an array
  if (!lists || !Array.isArray(lists)) return <p>You have not created any list yet.</p>;
  
  return (
    <>
      <div className="">
      <h2 className="my-2 px-6 text-xl font-bold">My Lists</h2>
        <div>
          {lists && lists.map((list) => 
            <div key={list.id} className="mb-2">
              <Separator className='gap-0'/>
              <Link to={`/list/${list.slug}`}>
                <Card>
                  <CardHeader>
                    <CardTitle className="my-2 text-md">{list.name}</CardTitle>
                    <CardDescription className="grid flex-1 gap-4 sm:md:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 justify-between">
                      <ul className="col-span-1">
                        <li>Purpose: {list.description}</li>
                        <li>Agent Role: {list.agent_role.description}</li>
                      </ul>
                      <ul className="col-span-1">
                        <li>List created by <a className="text-rose-700"> @{list.owner.username}</a></li>
                        <li>On: {list.updated_at}</li>
                      </ul>
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
                  <PaginationNext onClick={(pageNumber < totalPages) ? handleNext : () => {}} className={(pageNumber >= totalPages) ? 'text-rose-700' : ''} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
        </div>
      </div>
    </>
  )
}

export default MyLists



