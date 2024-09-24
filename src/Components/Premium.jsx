import React from 'react'
import { PiCrownSimple } from 'react-icons/pi'
import StripeForm from './StripeCheckout'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const Premium = ({ premium }) => {
  const stripePromise = loadStripe(
    'pk_test_51Oo4CoH6PeUBS1wuzURCJDeKV9in1J6LvfX1Qz6OoKCviGhay3Zx4Famm028RWHoSmLZHEkf9EWTuuaoTgYgJkKR004VyRjFxa'
  )
  return (
    <>
      {premium ? (
        <h1>Thank you for being Premium member</h1>
      ) : (
        <div className='premium-container'>
          <h2>
            try little Premium{' '}
            <span>
              {' '}
              <PiCrownSimple size={40} />
            </span>
          </h2>
          <p>
            Little has a premium user account and it only coasts $5/month.
            Subscribe now and enjoy the amazing features on the premium plan
          </p>
          <div>
            <Elements stripe={stripePromise}>
              <StripeForm />
            </Elements>
          </div>
        </div>
      )}
    </>
  )
}

export default Premium
