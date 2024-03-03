// AdminLogin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();

  const BASEURL = process.env.REACT_APP_BASEURL;

  const handleLogin = () => {
    const Email = `email=${email}`
    const pass = `password=${password}`
    // console.log('j')
    if (email && password) {
      const url = `${BASEURL}/admin/login?${Email}&${pass}`
      fetch(url)
        .then((res) => {
          console.log(res)
          if (res.ok) {
            return res.json()
          } else {
            return null
          }

          

        })
        .then((res) => {
          if (res) {
            navigate('/admin/profile', { state: { logedIn: true, userEmail: email } });
            setAlert('success')
          }
          else {
            // alert(res.message)
            setAlert('Incorrect Details')
          }
        })
        .catch((error)=>{
          console.log(error);
        })
    } else {
      setAlert('All fields are required');
    }
  };

  const handleEmailVerification = () => {
    // setAlert('already verified')
    const Email = `email=${email}`
    if (email) {
      const url = `${BASEURL}/admin/find?${Email}`
      fetch(url)
        .then((res) => {

          if (res.ok) {
            return res.json()
          } else {
            return ' '
          }

        })
        .then((res) => {
          console.log(res)
          if (res.length > 1) {
            setAlert('More than one accound found')
            return
          }
          if (res.length < 1) {
            setAlert('Account not found')
            return
          }
          if (res[0].isVerified) {
            setAlert('Already Verified')
          } else {
            const name = res[0].name;
            navigate('/verification/emailVerificationLink', { state: { email: email, name: name } });
          }

        })
    } else {
      setAlert('Please enter valid Email');
    }
  }

  return (
    <div className="flex items-center justify-center h-screen  bg-gradient-to-r from-blue-500 to-purple-500 ">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
        {alert && <p className="text-red-500 mb-4">{alert}</p>}
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="username">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handleLogin}
        >
          Login
        </button>
        <Link to="/admin/forgot-password" className="block text-blue-500 hover:underline mt-4">
          Forgot Password?
        </Link>
        <Link onClick={handleEmailVerification} className="block text-blue-500 hover:underline mt-2">
          Verify Email
        </Link>
        <Link to="/admin/signup" className="block text-blue-500 hover:underline mt-2">
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;
