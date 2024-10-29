import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className='flex justify-between items-center text-xs text-stone-700 h-10 pl-20 pr-10'>
			<p>Copyright 2024 Metaverse Lab Limited</p>
			<div className='flex gap-2'>
				<Link to='/terms-of-service'>Terms of Service</Link>
				<Link to='/privacy'>Privacy Policy</Link>
			</div>
	
		</div>
	)
}

export default Footer