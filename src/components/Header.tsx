import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { jwtDecode, JwtPayload } from 'jwt-decode';
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
				<Link to="/checkout">
					<p>Pricing</p>
				</Link>
				{ user ? (
					<>
						<CreditCount />
						<ProfileButton />
					</>) : (
					<Link to="/login">
						<Button>Login</Button>
					</Link>
					)
				}
			</div>
		</header>
	);
};

export default Header;