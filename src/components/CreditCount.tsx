import React from "react";
import { useProfileContext } from '../context/CreditContext';

const CreditCount: React.FC = () => {
	const profileResponse = useProfileContext();

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