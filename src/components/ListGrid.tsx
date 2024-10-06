import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useLists from "../hooks/useLists"; 
import { List }from "../hooks/useLists"; 

const ListGrid = () => {
  const { execute, data, error, isLoading } = useLists();
  const lists = (data as List[]) ?? [];

  useEffect(() => {
    execute(); // Trigger fetching lists
  }, []); // need to add depency execute in prod server

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading lists: {error.message}</p>;

  // Check if data is defined and an array
  if (!lists || !Array.isArray(lists)) return <p>No lists available.</p>;
  
  return (
    <>
      <h1 className="my-2 px-6 text-2xl font-bold">All Lists</h1>
      <div>
        {lists && lists.map((list) => 
          <div key={list.id} className="grid w-5/6 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-2 lg:grid-cols-1 xl:grid-cols-1 mb-2">
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
      </div>
    </>
  )
}

export default ListGrid



