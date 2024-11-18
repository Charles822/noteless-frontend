import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className='flex flex-wrap justify-between items-center gap-2 text-xs text-stone-700 h-10 pl-20 pr-10'>
			<p >Copyright 2024 Metaverse Lab Limited</p>
			<div className='flex flex-wrap gap-2'>
				<Link to='/terms-of-service'>Terms of Service</Link>
				<Link to='/privacy'>Privacy Policy</Link>
			</div>
	
		</div>
	)
}

export default Footer