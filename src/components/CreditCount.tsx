import React, { useEffect, useContext } from "react";
import AuthContext from '../context/AuthContext';
import { Link } from "react-router-dom";
import { Layers } from 'lucide-react';
import { useProfileContext } from '../context/CreditContext';

const CreditCount: React.FC = () => {
	const { profile, refetchProfile } = useProfileContext();
	// const authContext = useContext(AuthContext);

// 	useEffect(() => {
  //   // This effect runs whenever the component mounts to refresh the count when a user login
  //   refetchProfile();
  // }, []);

	return (
		<>
			<div className="flex gap-1 text-sm text-rose-700">
				<Link to="/checkout" className='flex gap-1'>
					<div>
						{ profile && profile.profile ? profile.profile.credit : 0 }
					</div>
					<Layers className='text-rose-700 h-4 w-4 my-0.5' />
				</Link>
			</div>
		</>
	)
}

export default CreditCount