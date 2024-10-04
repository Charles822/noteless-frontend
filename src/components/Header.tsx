import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import Logo from '../components/Logo';
import ProfileButton from "./ProfileButton";
import SearchHeader from "./SearchHeader";

const Header = () => {
	const { user } = useContext(AuthContext);

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
