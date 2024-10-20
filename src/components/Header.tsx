import { useContext } from "react";
import { Link } from "react-router-dom";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import AuthContext from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import CreditCount from './CreditCount';
import Logo from './Logo';
import ProfileButton from "./ProfileButton";
import SearchHeader from "./SearchHeader";

// Tells typescript that my payload include a user_id property 
interface MyJwtPayload extends JwtPayload {
  user_id: number; 
}

const Header = () => {
	//check to ensure the context is not undefined before accessing its properties
	const authContext = useContext(AuthContext);
	if (!authContext) {
    	throw new Error("AuthContext must be used within an AuthProvider");
  	}
  	
	const { user } = authContext;
	const token = localStorage.getItem('authTokens');
  	const userId = token ? (jwtDecode<MyJwtPayload>(token)).user_id : null;

	return (
		<header className="flex h-14 items-center gap-4 border-b bg-background px-4">
			<Logo />
			<SearchHeader />
			{user ? (
				<>
					<CreditCount userId={userId}/>
					<ProfileButton />
				</>
			) : (
				<Link to="/login">
					<Button>Login</Button>
				</Link>
			)}
		</header>
	);
};

export default Header;
