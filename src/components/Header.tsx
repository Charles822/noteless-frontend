import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import Logo from '../components/Logo';
import ProfileButton from "./ProfileButton";
import SearchHeader from "./SearchHeader";

const Header = () => {
	//check to ensure the context is not undefined before accessing its properties
	const authContext = useContext(AuthContext);
	if (!authContext) {
    	throw new Error("AuthContext must be used within an AuthProvider");
  	}
  	
	const { user } = authContext;

	return (
		<header className="flex h-14 items-center gap-4 border-b bg-background px-4">
			<Logo />
			<SearchHeader />
			{user ? (
				<ProfileButton />
			) : (
				<Link to="/login">
					<Button>Login</Button>
				</Link>
			)}
		</header>
	);
};

export default Header;
