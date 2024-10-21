import { useEffect } from "react"
import useUsers from '../hooks/useUsers';
import { ProfileResponse } from '../hooks/useUsers';

interface Props {
	userId: number | null;
}

const CreditCount = ({ userId }: Props) => {
	// Fetch credit value: Only call useUsers if userId is not null
	const userProfile = userId !== null 
	    ? useUsers(userId) 
	    : { execute: () => {}, data: null, error: null };
	const { execute, data } = useUsers(userId) 
	const profileResponse = (data as ProfileResponse) ?? null;

	// Fetch initial profile data 
	useEffect(() => {
		execute();
	}, []);


	return (
		<>
			<div className="flex gap-1 text-sm text-rose-700">
				<div>
					{ profileResponse && profileResponse.profile ? profileResponse.profile.credit : 0 }
				</div>
				<p>credits</p>
			</div>
		</>
	)
}

export default CreditCount