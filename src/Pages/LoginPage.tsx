import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from '../components/Logo';

export function LoginPage() {
  const {loginUser, user} = useContext(AuthContext)
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await loginUser(e);
    if (user) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Logo />
      <div className="grid gap-4 sm:px-6 sm:py-0 md:gap-0 lg:grid-cols-2 xl:grid-cols-2" >
        <h1 className="text-4xl font-semibold my-auto mx-10 px-20">Welcome back to <a className="underline decoration-rose-700"> Noteless</a>!</h1>
        <Card className="mx-auto my-10 max-w-sm hover:bg-white shadow outline outline-gray-100">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your username below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} >
            <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    name="username"
                    type="text"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link to="#" className="ml-auto inline-block text-sm underline">
                      Forgot your password?
                    </Link>
                  </div>
                  <Input name="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
