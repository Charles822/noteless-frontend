import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import useComments from '../hooks/useComments'

const formSchema = z.object({
  text: z.string().min(2, {
    message: "Name must be at least 5 characters.",
  }),
})

type FormData = z.infer<typeof formSchema>;

interface Props {
	noteId: number;
	isSubmitted: (status: boolean) => void;
}

// Tells typescript that my payload include a user_id property 
interface MyJwtPayload extends JwtPayload {
  user_id: number; 
}

function CommentForm({ noteId, isSubmitted }: Props) {
  // 1. Define your form.
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  });

  const { control, handleSubmit, formState, reset } = form;
  const { isSubmitting, isDirty, isValid } = formState;
  const { toast } = useToast();

  // Call useLists at the top level, cannot directly use it inside onSubmit
  const { execute, error } = useComments(undefined, undefined, undefined, 'post', undefined);

  // 2. Define a submit handler.
  const onSubmit = async (values: FormData) => {
    const token = localStorage.getItem('authTokens');
    
    if (!token) {
      toast({ variant: "default", description: "Please log in to comment." });
      return;
    }

    const userId = token ? (jwtDecode<MyJwtPayload>(token)).user_id : null;
    const comment_data = {
      note: noteId, 
      text: values.text, 
      owner: userId,
    };

    // Call the API request here
    await execute(comment_data);

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to create a comment');
      }
      toast({variant: "destructive", description: "Your comment cannot be created at the moment!"});
    } else {
      toast({variant: "success", description: "Your comment has been created successfully!"});
      reset();
      isSubmitted(true);
    }
  };

  return (
  	<>
	  	<div className=''>
		    <Form {...form} >
		      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
		        <FormField
		          control={control}
		          name="text"
		          render={({ field }) => (
		            <FormItem>
		              <FormControl>
		                <Textarea placeholder="Write your comment here..." {...field} />
		              </FormControl>
		              <FormMessage />
		            </FormItem>
		          )}
		        />
		        <Button type="submit" disabled={isSubmitting || !isDirty || !isValid}>Post</Button>
		        <Toaster />
		      </form>
		    </Form>
	    </div>
    </>
  )  

}

export default CommentForm