import { jwtDecode, JwtPayload } from 'jwt-decode';
import MyLists from './Mylists';
import MyNotes from './MyNotes';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


interface MyJwtPayload extends JwtPayload {
  user_id: number;
}


const MyContents = () => {
	const token = localStorage.getItem('authTokens');
	const owner = (jwtDecode<MyJwtPayload>(token)).user_id;

	return (
		<div className='' >
			<h1 className="pl-4 text-2xl font-bold mb-2 my-2">My Contents</h1>
		    <Tabs defaultValue="lists" className="pl-4 w-5/6">
		      <TabsList className="grid w-full grid-cols-2 my-2 items-center">
		        <TabsTrigger value="lists">My Lists</TabsTrigger>
		        <TabsTrigger value="notes">My Notes</TabsTrigger>
		      </TabsList>
		      <TabsContent value="lists">
				<MyLists user_id={owner} />
		      </TabsContent>
		      <TabsContent value="notes">
		        <MyNotes user_id={owner} />
		      </TabsContent>
		    </Tabs>
	    </div>
	);
}

export default MyContents

