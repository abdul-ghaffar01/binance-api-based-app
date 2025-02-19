import Link from 'next/link';
import React, { useState } from 'react'
import Button from '../ui/Button';
import { validateForm } from './utils';
import Image from 'next/image';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "Email is required", password: "Password is required" })
  const [showErrors, setShowErrors] = useState({ email: false, password: false })
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    // Resetting the values
    setErrors({ email: "", password: "" });
    setShowErrors({ email: false, password: false })
    setIsLoading(true);

    // validating the form values
    const isFormOk = validateForm(email, password, setErrors, setShowErrors);

    // If all the values provided are accurate
    if (isFormOk) {

    }
    console.log("Submitted the login form")
    setIsLoading(false);
  }

  const handleGoogleAuth = () => {
    console.log("Handling google auth")
  }

  const handleGithubAuth = () => {
    console.log("Handling github auth")
  }
  return (
    <div className='max-w-[400px] bg-box p-2 rounded-md shadow-lg mx-auto mt-5 border border-border'>
      <h1 className='text-center text-3xl font-bold text-foreground'>Login</h1>
      <form action="" className='mt-3' onSubmit={handleLogin}>

        {/* Email  */}
        <div className='w-full flex flex-col'>
          <label htmlFor="email" className='font-bold'>Email</label>
          <input
            className='p-2 outline-none rounded-md bg-background'
            id='email' type="email" placeholder='Email'
            onChange={(e) => { setEmail(e.target.value) }}
            value={email}
          />
          <p className={`text-red-500 mt-1 ${showErrors.email ? "block" : "hidden"}`}>{errors.email}</p>
        </div>

        {/* Password */}
        <div className='w-full flex flex-col mt-2'>
          <label htmlFor="password" className='font-bold'>Password</label>
          <div className='w-full relative'>
            <input
              className='p-2 outline-none rounded-md bg-background w-full'
              id='password' type="password" placeholder='Password'
              onChange={(e) => { setPassword(e.target.value) }}
              value={password}
            />
            {/* Eye icons */}
            <div className='absolute'>

            </div>
          </div>
          <p className={`text-red-500 mt-1 ${showErrors.email ? "block" : "hidden"}`}>{errors.password}</p>
        </div>

        {/* Forgot password section */}
        <Link
          className='mt-2 text-primary underline inline-block'
          href="forgot-password">Forgot password ?</Link>

        {/* Submit button */}
        <Button
          className='w-full mt-2'
          text="Login"
          type='submit'
          isLoading={isLoading}
          disabled={isLoading}
        />
      </form>

      {/* Other ways to login */}
      <div className='w-full h-fit flex items-center justify-center mt-4 relative'>
        <p className='bg-box z-[1] px-2 select-none'>
          Or
        </p>
        <hr className='bg-background absolute w-full' />
      </div>

      {/* All other ways */}
      <div className='w-full'>
        {/* Google authentication */}
        <div className="google w-full bg-background mt-1 rounded-md text-center">
          <Button className='w-full h-full bg-transparent' onClick={handleGoogleAuth}>
            {/* <Image src="" width={40} height={40} alt='Google Logo' /> */}
            <span>Google</span>
          </Button>
        </div>

        {/* Github authentication */}
        <div className="google w-full bg-background mt-1 rounded-md text-center">
          <Button className='w-full h-full bg-transparent' onClick={handleGithubAuth}>
            {/* <Image src="" width={40} height={40} alt='Google Logo' /> */}
            <span>Github</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login