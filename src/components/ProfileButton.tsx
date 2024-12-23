import { useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
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
  //check to ensure the context is not undefined before accessing its properties
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  };
  
  const { logoutUser } = authContext;
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
            <DropdownMenuItem>
              <Link to='mailto:charles@voxelai.ai?subject=About%20Noteless'> 
              Support
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClick}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
	)
}

export default ProfileButton;