import { useState } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { baseURL } from "../services/api-client";
import { useInterval } from "../hooks/useInterval";
import useNotes from '../hooks/useNotes'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";

const formSchema = z.object({
  youtube_url: z.string().url(),
})

type FormData = z.infer<typeof formSchema>;

// Tells typescript that my payload include a user_id property 
interface MyJwtPayload extends JwtPayload {
  user_id: number; 
}

interface Props {
  className?: string; // need to add if for custom component
	listId: number;
  onNoteCreated: () => void;
}

interface TaskResult {
  status: string;
}

function NoteForm({ className, listId, onNoteCreated }: Props) {
  const [delay, setDelay] = useState<number | null>(5000);
  const [taskIds, setTaskIds] = useState<string[]>([]);

  // 1. Define your form.
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      youtube_url: '',
    },
  });

  const { control, handleSubmit, formState, reset } = form;

  const { isSubmitting, isDirty, isValid } = formState;

  const { toast } = useToast();


  // Notes hook
  const { execute } = useNotes(undefined, undefined, 'post');

  // Polling logic
  useInterval<TaskResult>(async () => {
  if (taskIds.length > 0) {
    for (const taskId of taskIds) {
      const response = await fetch(`${baseURL}/notes/notes/check_task_status/${taskId}/`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.status === 'SUCCESS') {
        toast({ variant: "success", description: "Your note is ready!" });
        // Remove completed task ID from the array
        setTaskIds(prevTaskIds => prevTaskIds.filter(id => id !== taskId));
        onNoteCreated(); // Notify parent - ListDetail
      }
    }
    if (taskIds.length === 0) {
      setDelay(null); // Stop polling if no tasks left
    }
  }
}, delay);

  // Define a submit handler.
  const onSubmit = async (values: FormData) => {
    const token = localStorage.getItem('authTokens');
    
    if (!token) {
      toast({ variant: "default", description: "Please log in to comment." });
      return;
    }

    try {
      const owner = jwtDecode<MyJwtPayload>(token).user_id;
      const note_data = {
        youtube_url: values.youtube_url, 
        note_list: listId, 
        owner
      };
    
      // Call the API to create a note
      const response = await execute(note_data);
      setTaskIds(prevTaskIds => [...prevTaskIds, response.taskId])
      
      toast({ variant: "loading", description: "Your note is processing!" });
      reset();

    } catch (err) {
      if (err instanceof Error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error creating note:', err.message);
        }
        toast({ variant: "destructive", description: "You must be the list owner to create a note, if you are, please refresh." }); // write custom message later
        reset();
      }
    }
  };

  return (
  	<>
	  	<div className={`${className} rounded-lg bg-background p-4 outline outline-gray-100`}>
        <div className='items-start'>
  	  		<h3 className="text-lg font-bold">Create a new Note in this List</h3>
  		    <Form {...form} >
  		      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
  		        <FormField
  		          control={control}
  		          name="youtube_url"
  		          render={({ field }) => (
  		            <FormItem>
  		              <FormLabel>Youtube Video Link</FormLabel>
  		              <FormControl>
  		                <Input disabled={isSubmitting} placeholder="Paste the link here" {...field} />
  		              </FormControl>
  		              <FormDescription>
  		                Copy the link of your youtube video and paste here. Then let the magic happen!
  		              </FormDescription>
  		              <FormMessage />
  		            </FormItem>
  		          )}
  		        />
              {isSubmitting ? <div><LoaderCircle className="animate-spin text-rose-700" /><a>The agent is working on your note...</a></div>  : <Button type="submit" disabled={isSubmitting || !isDirty || !isValid}>Submit</Button> }
  		        <Toaster />
  		      </form>
  		    </Form>
  	    </div>
      </div>
    </>
  )  

}

export default NoteForm