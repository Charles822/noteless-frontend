import { jwtDecode, JwtPayload } from 'jwt-decode';
import MyLists from './Mylists';


interface MyJwtPayload extends JwtPayload {
  user_id: number;
}


const MyContents = () => {
	const token = localStorage.getItem('authTokens');
	const owner = (jwtDecode<MyJwtPayload>(token)).user_id;

	return (
		<div className='flex gap-4 justify-center'>
			<div>
				<MyLists user_id={owner} />
			</div>
			
		</div>
	)
}

export default MyContents