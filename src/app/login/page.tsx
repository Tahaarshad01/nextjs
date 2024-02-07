"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from 'react-hot-toast'

export const signInPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const emailChange = (e: any) => {
    setUser({ ...user, email: e.target.value });
  };

  const passwodChange = (e: any) => {
    setUser({ ...user, password: e.target.value });
  };
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      console.log("Login success", response.data)
      toast.success("Login Sucess")
      router.push("/profile");
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true)
    }
  }, [user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "processing" : "Login"}</h1>
      <hr />
      <label htmlFor="username">email</label>
      <input
        placeholder="Enter email"
        value={user.email}
        type="email"
        id="email"
        onChange={emailChange}
      ></input>
      <label htmlFor="username">password</label>
      <input
        placeholder="Enter password"
        value={user.password}
        type="password"
        id="password"
        onChange={passwodChange}
      ></input>
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onLogin}
      >
        Login
      </button>
      <Link href={"/signup"}>SignUp</Link>
    </div>
  );
};

export default signInPage;
