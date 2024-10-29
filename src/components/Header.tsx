import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import CreditCount from './CreditCount';
import Logo from './Logo';
import ProfileButton from "./ProfileButton";
import SearchHeader from "./SearchHeader";

const Header: React.FC = () => {
	//check to ensure the context is not undefined before accessing its properties
	const authContext = useContext(AuthContext);
	if (!authContext) {
    	throw new Error("AuthContext must be used within an AuthProvider");
  	}
  	
	const { user } = authContext;

	return (
		<header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4">
			<Logo />
			<div className="flex items-center gap-4 ">
				{ user ? (
					<>	
						<Link to="/checkout">
							<Button className='bg-transparent border border-rose-500 font-normal text-rose-700 hover:text-white h-6 p-1 '>Buy Credits</Button>
						</Link>
						<CreditCount />
						<ProfileButton />
					</>) : (
					<div>
						<Link to="/checkout">
							<p>Pricing</p>
						</Link>
						<Link to="/login">
							<Button>Login</Button>
						</Link>
					</div>
					)
				}
			</div>
		</header>
	);
};

export default Header;