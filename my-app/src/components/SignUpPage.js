import React, {useRef,useState} from 'react'
import{ useAuth } from '../contexts/AuthContxt'


export default function SignUpPage() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const {createUser, currentUser} = useAuth()
  const [error,setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    try{
        setError('')
        setLoading(true)

        await createUser(emailRef.current.value, passwordRef.current.value);
        console.error('User created', currentUser)

    } catch(error) {
      console.error('Error creating user', error)
        setError('Cant create account')
    } finally{
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Sign Up</h1>
    
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit} className="Login">
        <label>Username: </label>
        <input type = "email" ref ={emailRef} required/> <br/>
        <label>Password: </label>
        <input type = "password" ref ={passwordRef} required/> <br/>
        <button disabled={loading} type="submit">{loading ? 'Creating profile...' : 'Create profile'}</button>
      </form>

    </>
  )
}
