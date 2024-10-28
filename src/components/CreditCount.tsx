import React from "react";
import { Layers } from 'lucide-react';
import { useProfileContext } from '../context/CreditContext';

const CreditCount: React.FC = () => {
	const { profile }= useProfileContext();

	return (
		<>
			<div className="flex gap-1 text-sm text-rose-700">
				<div>
					{ profile && profile.profile ? profile.profile.credit : 0 }
				</div>
				<Layers className='text-rose-700 h-4 w-4 my-0.5' />
			</div>
		</>
	)
}

export default CreditCount