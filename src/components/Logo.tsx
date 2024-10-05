import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import logo from '../assets/notelesslogo.png';

const Logo = () => {
	return (
		<div className='flex col-2'>
			<Button
				  variant="default"
			      size="icon"
			      className="overflow-hidden rounded-full mx-4 my-4 mr-1"
			      >
			        <Link to="/">
			          <img
			            src={logo}
			            width={28}
			            height={28}
			            alt="Noteless Logo"
			            className="overflow-hidden rounded-full"
			          />
			        </Link>
		    </Button>
		    <p className='content-center text-lg font-semibold'>Noteless</p>
	    </div>
	)
}

export default Logo