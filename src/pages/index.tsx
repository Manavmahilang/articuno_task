import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import SignInPage from "./SignInPage";
import Register from "./Register";
import Blogs from "./component/Blogs";
import Navbar from "~/pages/component/Navbar";



const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
    
    <Blogs  />
    </>
  )
}

export default Home;
