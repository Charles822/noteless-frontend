import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Logo from '../components/Logo';
import Footer from '../components/Footer';

const NotFoundPage = () => {
	return (
		<>
		<div className='flex flex-col items-center h-screen w-full'>
			<div className='self-start'>
				<Logo />
			</div>
			<div className='coreContainer flex flex-col gap-4 w-1/2 h-full justify-start items-center text-center mt-20'>
				<h1 className='text-xl md:text-2xl font-semibold '>Content Not Found</h1>
				<div className='text-base md:text-lg '>
					You got lost but I got your back :)
				</div>	
				<Button className='w-40'>
					<Link to='/'>Take me back!</Link>
				</Button>
			</div>
			<div className='w-full'>
          		<Footer />
        	</div>
		</div>
		</>
	)
}

export default NotFoundPage;