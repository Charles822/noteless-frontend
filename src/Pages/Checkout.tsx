import React, { useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Button } from "@/components/ui/button"
import { baseURL } from "../services/api-client";
import useUsers from '../hooks/useUsers';


// Tells typescript that my payload include a user_id property 
interface MyJwtPayload extends JwtPayload {
  user_id: number; 
}

const ProductDisplay = () => (
  <div className='flex flex-2'>
    <section>
      <div>
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
        <h3>50 Notes Pack</h3>
        <h5>$15.00</h5>
        </div>
      </div>
      <form action={`${baseURL}/api/stripe/create-checkout-session-pack1`} method="POST">
        <Button type="submit">
          Checkout
        </Button>
      </form>
    </section>
    <section>
      <div>
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
        <h3>100 Notes Pack</h3>
        <h5>$30.00</h5>
        </div>
      </div>
      <form action={`${baseURL}/api/stripe/create-checkout-session-pack2`} method="POST">
        <Button type="submit">
          Checkout
        </Button>
      </form>
    </section>
  </div>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Checkout() {
  const [message, setMessage] = useState("");
  const [credit, setCredit] = useState(50);
  const token = localStorage.getItem('authTokens');
  const owner = jwtDecode<MyJwtPayload>(token).user_id;

  // Initialize user hook to distribute credit
  const { execute } = useUsers(undefined, 'patch', 'add');

  // Get the necessary arguments for our add_credit endpoint
  const credit_data = {
        user: owner,
        credit: credit,
      };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    console.log(query);

    if (query.get("success")) {
      execute(credit_data);
      setMessage(`Order placed! ${credit} has been added to your account.`);
      console.log('credit distributed');
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}