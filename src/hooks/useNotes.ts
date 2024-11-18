import useData from "./useData.ts";

export interface Video {
  title: string;
  channel_name: string;
  youtube_url: string;
  duration: string;
  original_language: string;
  published_at: string;
}

export interface Response {
  agent_response: string;
}

export interface User {
	username: string;
}

export interface Note {
	id: number;
	video: Video;
	response: Response;
	note_list: number;
	owner: User;
	comments_count: number;
	votes_count: number;
	created_at: string;
	meta_description: string;
	slug: string;
}

export interface NotesResponse {
	count: number;
	next: string;
	previous: string;
	results: Note[];
}

const useNotes = (
		slug?: string, 
		noteSlug?: string, 
		method: 'get' | 'post' | 'patch' = 'get', 
		requestData?: { youtube_url: string; note_list: number; owner: number },
		pageNumber?: number) => {
	const endpoint = method === 'post'
	? `/notes/notes/add_note/`
	: noteSlug 
		? `/notes/notes/${noteSlug}/`
		: `/lists/lists/${slug}/notes/?page=${pageNumber}`;
	
	return useData<Note | Note[] | NotesResponse>(endpoint, method, requestData);
	}

export default useNotes;