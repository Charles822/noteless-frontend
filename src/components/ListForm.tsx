import { useNavigate } from 'react-router-dom';
import { jwtDecode, JwtPayload } from 'jwt-decode';
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
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import useLists from '../hooks/useLists';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


// Tells typescript that my payload include a user_id property 
interface MyJwtPayload extends JwtPayload {
	user_id: number;
}


const formSchema = z.object({
  name: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Your list description must be at least 10 characters.",
  }),
  agent_role: z.string().min(10, {
    message: "The agent role must be at least 10 characters.",
  }),
})

type FormData = z.infer<typeof formSchema>;

function ListForm() {
  // 1. Define your form.
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      agent_role: '',
    },
  });

  const { control, handleSubmit, formState, reset } = form;

  const { isSubmitting, isDirty, isValid } = formState;

  const { toast } = useToast();

  const navigate = useNavigate();

  // we'll use this to convert the new list name into a slug for the redirection once the list is created
  const slugify = (text: string) => { 
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')    // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-')    // Replace multiple - with single -
    .replace(/^-+/, '')      // Trim - from start of text
    .replace(/-+$/, '');     // Trim - from end of text
};

  // Call useLists at the top level
  const { execute, error } = useLists(undefined, 'post');

  // 2. Define a submit handler.
  const onSubmit = async (values: FormData) => {
  	const token = localStorage.getItem('authTokens');
  	
  	if (!token) {
    	toast({ variant: "destructive", description: "Please log in to create a list." });
    	return;
  	}

    const owner = (jwtDecode<MyJwtPayload>(token)).user_id;
    const list_data = {
      name: values.name, 
      description: values.description, 
      agent_role_description: values.agent_role, 
      owner: owner
    };

    // prepare the slug for redirection
    const slug = slugify(values.name);

    // Call the API request here
    await execute(list_data);

    if (error) {
    	if (process.env.NODE_ENV === 'development') {
      	console.error('Error creating list:', error);
    	}
    	toast({ variant: "destructive", description: "Your list cannot be created at the moment!" });
    } else {
      await toast({variant: "success", description: "Your list has been created successfully!"});
      reset();
      navigate(`/list/${slug}`);
    }
  };

  return (
  	<>
	  	<h1 className="my-2 pl-6 text-2xl font-bold">Create a new List</h1>
	  	<div className="flex flex-col px-6 w-full md:w-4/6">
		    <Form {...form} >
		      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
		        <FormField
		          control={control}
		          name="name"
		          render={({ field }) => (
		            <FormItem>
		              <FormLabel>List Name</FormLabel>
		              <FormControl>
		                <Input placeholder="Ex: Find new game ideas" {...field} />
		              </FormControl>
		              <FormDescription>
		                People browse Lists by their name, give yours a good one!
		              </FormDescription>
		              <FormMessage />
		            </FormItem>
		          )}
		        />
		        <FormField
		          control={control}
		          name="description"
		          render={({ field }) => (
		            <FormItem>
		              <FormLabel>What's is the purpose of your List?</FormLabel>
		              <FormControl>
		                <Input placeholder="Ex: Get new game ideas from gaming podcasts " {...field} />
		              </FormControl>
		              <FormDescription>
		                Describe what your List does. Be as specific as possible if you want other members to interact with your List.
		              </FormDescription>
		              <FormMessage />
		            </FormItem>
		          )}
		        />
		        <FormField
		          control={control}
		          name="agent_role"
		          render={({ field }) => (
		            <FormItem>
		              <FormLabel>AI agent Role</FormLabel>
		              <FormControl>
		                <Textarea placeholder="Ex: Your an experienced game developer and entrepreneur..." {...field} />
		              </FormControl>
		              <FormDescription>
		                Give your AI agent the right role and expected output. 
		              </FormDescription>
		              <FormMessage />
		            </FormItem>
		          )}
		        />
		        <Button type="submit" disabled={isSubmitting || !isDirty || !isValid}>Submit</Button>
		        <Toaster />
		      </form>
		    </Form>
	    </div>
    </>
  )  

}

export default ListForm