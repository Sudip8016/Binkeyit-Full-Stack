import React, { useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useGlobalContext } from '../provider/GlobalProvider';

const Success = () => {
  const { fetchCartItem, fetchOrder } = useGlobalContext();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id"); // from Stripe redirect
  const location = useLocation();

  useEffect(() => {
    // Only fetch if session_id exists (means Stripe payment just completed)
    if (sessionId) {
      fetchCartItem?.();
      fetchOrder?.();
    }
  }, [sessionId]);

  return (
    <div className='m-2 w-full max-w-md bg-green-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
      <p className='text-green-800 font-bold text-lg text-center'>
        {location?.state?.text || sessionId ? "Payment" : "Order"} Successfully
      </p>
      <Link to="/" className="border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition-all px-4 py-1">
        Go To Home
      </Link>
    </div>
  );
};

export default Success;
