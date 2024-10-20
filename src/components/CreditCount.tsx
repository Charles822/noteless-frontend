import useUsers from '../hooks/useUsers';
import { ProfileResponse } from '../hooks/useUsers';

interface Props {
	userId: number | null;
}

const CreditCount = ({ userId }: Props) => {
	console.log(userId);

	// Fetch credit value: Only call useUsers if userId is not null
	const userProfile = userId !== null 
	    ? useUsers(userId, 'get') 
	    : { execute: () => {}, data: null, error: null };

	const { execute, data } = userProfile;
	console.log(userProfile);
	const profileResponse = (data as ProfileResponse) ?? null;
	console.log(profileResponse);


	return (
		<div>
			Credit: { 
				profileResponse && profileResponse.profile ? profileResponse.profile.credit : 0
			}
		</div>
	)
}

export default CreditCount