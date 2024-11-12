import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import logo from '../assets/notelesslogo.png';

const Logo = () => {
	return (
		<div >
			<Link to="/" className='flex'>
				<Button
					  variant="ghost"
				      size="icon"
				      className="overflow-hidden rounded-full mx-4 my-4 mr-1"
				      >
				        
			          <img
			            src={logo}
			            width={28}
			            height={28}
			            alt="Noteless Logo"
			            className="overflow-hidden rounded-full"
			          />
				        
			    </Button>
			    <p className='content-center text-lg font-semibold'>Noteless</p>
		    </Link>
	    </div>
	)
}

export default Logo