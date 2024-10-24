import React from "react";
import { useProfileContext } from '../context/CreditContext';

const CreditCount: React.FC = () => {
	const { profile }= useProfileContext();

	return (
		<>
			<div className="flex gap-1 text-sm text-rose-700">
				<div>
					{ profile && profile.profile ? profile.profile.credit : 0 }
				</div>
				<p>credits</p>
			</div>
		</>
	)
}

export default CreditCount