import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import { User }from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const ProfileButton = () => {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await logoutUser(); // If logoutUser returns a promise
      navigate('/', { replace: true });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Logout failed:', error);
      }
    }
  };
	
  return (
		<DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <User />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClick}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
	)
}

export default ProfileButton;