import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import useLists from "../hooks/useLists"
import NotePreviewList from  "./NotePreviewList"
import NoteForm from './NoteForm'

const ListDetails: React.FC = () => {
  const params = useParams<{slug: string}>();
  const slug = params.slug;
  const [isCreated, setIsCreated] = useState(false);
  const { execute, data, error, isLoading } = useLists(slug);

  const handleNoteCreated = () => {
   setIsCreated(true); // to notify the NotepreviewList component;
  };

  useEffect(() => {
    execute(); // Trigger fetching the list
  }, []); // need to add depency execute in prod server

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading lists: {error.message}</p>;

  // Check if data is defined and not an array
  if (!data || Array.isArray(data)) return <p>No list available.</p>;

  return (
    <>
      <Helmet>
        <title>Noteless | {data.name}</title>
        <meta name="description" content={data.meta_description} />
      </Helmet>
      <div className="my-2 grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4 mb-10">
        <div className="col-span-1"></div>
        <div className="grid flex-1 col-span-3" >
          <h1 className="my-2 mb-10 text-2xl font-bold">{data.name}</h1>
          <h3 className="text-lg font-bold">About this List</h3>
          <div className=" grid flex-1 gap-4 lg:grid-cols-2 xl:grid-cols-2 justify-between text-sm text-stone-600">
            <ul>
              <li className='mb-2'><a className='font-medium text-black'>Purpose:</a> {data.description}</li>
              <li><a className='font-medium text-black'>Agent Role:</a> {data.agent_role.description}</li>
            </ul>
            <ul className="lg:mx-auto">
              <li><a className='font-medium text-black'>List created by</a><a className='text-rose-700'> @{data.owner.username}</a></li>
              <li><a className='font-medium text-black'>On:</a> {data.updated_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4">
        <NoteForm className="position-fix col-span-1" onNoteCreated={handleNoteCreated} listId={data.id}/>
        <NotePreviewList listSlug={data.slug} isCreated={isCreated} reset={() => setIsCreated(false)}/>
      </div>
    </>
  )
}

export default ListDetails

  











