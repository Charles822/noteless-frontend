import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Layers, CircleCheckBig } from 'lucide-react';
import QueryString from 'query-string';
import { baseURL } from "../services/api-client";
import useUsers from '../hooks/useUsers';
import Logo from '../components/Logo';


// Tells typescript that my payload include a user_id property 
interface MyJwtPayload extends JwtPayload {
  user_id: number; 
}


const ProductDisplay = ({ token }) => {
  const { toast } = useToast();

  const handleClick = (event) => {
    if (!token) {
      event.preventDefault();
      toast({ variant: "destructive", description: 'Please log in to purchase.' });
    }
  };

  return (
    <>
      <div className='flex flex-row items-center justify-between mb-4'>
        <Logo />
        {!token ? <div className='flex gap-1 items-center'><p className='hidden 530:flex text-stone-500'>New to Noteless? Sign up now</p><Link to='/signup'><Button className="mx-2" >Get free credits</Button></Link></div> : null}
      </div>
      <div className='flex flex-col gap-2 items-center'>
        <h1 className='text-2xl md:text-3xl flex flex-col items-center text-center my-2'>
          <a>Start extracting content from hundreds of <a className="underline decoration-rose-700">hours of Youtube videos</a>.
          </a>
        </h1>
        <h2 className='text-xl md:text-2xl text-center'>Launch Price Offers - Save up to <a className='text-rose-700'>60%</a></h2>
        <p className='text-stone-500 text-center'>No unnecessary subscription plan. All our packages are one off purchases.</p>
      </div>
      <div className="grid gap-2 sm:px-6 sm:py-0 md:grid-cols-3" >
        <Card className="mx-auto my-10 max-w-sm hover:bg-white shadow outline outline-gray-100">
          <CardHeader className='flex flex-col items-center'>
            <CardTitle className="text-2xl">50 Notes Pack</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4 items-center'>
            <Layers className="h-10 w-10 text-rose-500" />
            <div className='flex flex-col'>
              <h5 className='text-xl font-semibold'>USD14</h5><h5 className='line-through text-stone-500'>USD29</h5>
            </div>
            <CardDescription className='flex flex-col items-center'>
              <p>Get 50 credits to generate up to 50 notes</p>
              <p className='text-rose-700'>One-off purchase</p>
            </CardDescription>
            <form action={`${baseURL}/api/stripe/create-checkout-session-pack1`} method="POST">
              <Button type="submit" onClick={handleClick}>
                Buy now
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="mx-auto my-10 max-w-sm hover:bg-white shadow outline outline-gray-100">
          <CardHeader className='flex flex-col items-center'>
            <CardTitle className="text-2xl">100 Notes Pack</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4 items-center'>
            <Layers className="h-10 w-10 text-rose-500" />
            <div className='flex flex-col'>
              <h5 className='text-xl font-semibold'>USD29</h5><h5 className='line-through text-stone-500'>USD59</h5>
            </div>
            <CardDescription className='flex flex-col items-center'>
              <p>Get 100 credits to generate up to 100 notes</p>
              <p className='text-rose-700'>One-off purchase</p>
            </CardDescription>
            <form action={`${baseURL}/api/stripe/create-checkout-session-pack2`} method="POST">
              <Button type="submit" onClick={handleClick}>
                Buy now
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="mx-auto my-10 max-w-sm hover:bg-white shadow outline outline-gray-100">
          <CardHeader className='flex flex-col items-center'>
            <CardTitle className="text-2xl">500 Notes Pack</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4 items-center'>
            <Layers className="h-10 w-10 text-rose-500" />
            <div className='flex flex-col'>
              <h5 className='text-xl font-semibold'>USD119</h5><h5 className='line-through text-stone-500'>USD299</h5>
            </div>
            <CardDescription className='flex flex-col items-center'>
              <p>Get 500 credits to generate up to 500 notes</p>
              <p className='text-rose-700'>One-off purchase</p>
            </CardDescription>
            <form action={`${baseURL}/api/stripe/create-checkout-session-pack3`} method="POST">
              <Button type="submit" onClick={handleClick}>
                Buy now
              </Button>
            </form>
          </CardContent>
        </Card>
        <Toaster />
      </div>
    </>
  );
};

const Message = ({ message }) => {
  const navigate = useNavigate();

    useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 5000);

    return () => clearTimeout(timer); // Cleanup function
  }, [navigate]);

  return (
      <>
        <Logo />
        <div className='flex flex-col items-center justify-center h-48 gap-2'>
          <div className='flex flex-row justify-center gap-2'>
            <CircleCheckBig className='text-green-500' />
            <p>{message}</p>
          </div>
          <p className='text-stone-700 text-sm'>If you are not being redirected, click <a onClick={navigate('/', { replace: true })} className='text-rose-500 underline'>here</a>.</p>
        </div>
      </>
  );
}

export default function Checkout() {
  const [message, setMessage] = useState("");
  const token = localStorage.getItem('authTokens');
  const owner = token ? jwtDecode<MyJwtPayload>(token).user_id : null;
  const location = useLocation();

  // Initialize user hook to distribute credit
  const { execute } = useUsers(undefined, 'patch', 'add');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    // const query = new URLSearchParams(window.location.search);
    const values = QueryString.parse(location.search);
    console.log(values);
    const product_id = values.product_id
    console.log(product_id);

    if (values.success && product_id) {
      const credit =
        product_id === 'prod_R5rTPmubeChRMz' ? 50 
        : product_id === 'prod_R6dDRuy9ZZcwCe' ? 100
        : product_id === 'prod_R6xnZCLfbtRFcg' ? 500
        : 0; // Default to 0 if no match
      
      if (credit > 0) {
        execute({ user: owner, credit: credit });
        setMessage(`Thanks a ton for your purchase! ${credit} credits have been added to your account.`);
        console.log('credit distributed');
      } else {
        setMessage("Invalid product ID. Please contact support.");
      }
    }

    if (values.canceled) {
      setMessage(
        "Order canceled -- let us know if there is anything else we can do to improve your experience on Noteless."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay token={token} />
  );
}