import React from 'react'
import { useStripe, useElements } from '@stripe/react-stripe-js'
import { api } from '../Core/config'
import useGlobal from '../Core/global'

function StripeForm () {
  const stripe = useStripe()
  const elements = useElements()
  const { init, user, setUser } = useGlobal() // Ensure setUser is available from useGlobal

  const handleSubmit = async event => {
    event.preventDefault()

    const response = await api.post('/premium/create-checkout-session/', {
      email: user.profile.user.email
    })

    const session = response.data

    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })

    if (result.error) {
      console.error(result.error.message)
    } else {
      // After the checkout session, update user status to premium
      const updateResponse = await api.post('/user/update-status/', {
        email: user.profile.user.email,
        status: true // Or whatever field you use to denote premium status
      })

      if (updateResponse.status === 200) {
        // Update user state in global context
        const updatedUser = {
          ...user,
          profile: { ...user.profile, isPremium: true }
        } // Example
        setUser(updatedUser)
      }
    }

    init()
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <CardElement /> */}
      <button
        style={{
          width: '100%'
        }}
        type='submit'
        disabled={!stripe || !elements}
      >
        Try Premium 20X Fast
      </button>
    </form>
  )
}

export default StripeForm
