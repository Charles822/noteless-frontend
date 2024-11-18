import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import useLists from "../hooks/useLists";
import { List } from "../hooks/useLists";
import NotePreviewList from  "./NotePreviewList";
import NoteForm from './NoteForm';

const ListDetails: React.FC = () => {
  const params = useParams<{slug: string}>();
  const slug = params.slug;
  const [isCreated, setIsCreated] = useState(false);
  const { execute, data, error, isLoading } = useLists(slug);
  const list = data as List;

  const handleNoteCreated = () => {
   setIsCreated(true); // to notify the NotepreviewList component;
  };

  useEffect(() => {
    execute(); // Trigger fetching the list
  }, []); // need to add depency execute in prod server

  console.log(list);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading lists: {error.message}</p>;

  // Check if list is defined and not an array
  if (!list || Array.isArray(list)) return <p>No list available.</p>;

  return (
    <>
      <Helmet>
        <title>Noteless | {list.name}</title>
        <meta name="description" content={list.meta_description} />
      </Helmet>
      <div className="my-2 grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4 mb-10">
        <div className="col-span-1"></div>
        <div className="grid flex-1 col-span-3" >
          <h1 className="my-2 mb-10 text-2xl font-bold">{list.name}</h1>
          <h3 className="text-lg font-bold">About this List</h3>
          <div className=" grid flex-1 gap-4 lg:grid-cols-2 xl:grid-cols-2 justify-between text-sm text-stone-600">
            <ul>
              <li className='mb-2'><a className='font-medium text-black'>Purpose:</a> {list.description}</li>
              <li><a className='font-medium text-black'>Agent Role:</a> {list.agent_role.description}</li>
            </ul>
            <ul className="lg:mx-auto">
              <li><a className='font-medium text-black'>List created by</a><a className='text-rose-700'> @{list.owner.username}</a></li>
              <li><a className='font-medium text-black'>On:</a> {list.updated_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4">
        <NoteForm className="position-fix col-span-1" onNoteCreated={handleNoteCreated} listId={list.id}/>
        <NotePreviewList listSlug={list.slug} isCreated={isCreated} reset={() => setIsCreated(false)}/>
      </div>
    </>
  )
}

export default ListDetails

  











