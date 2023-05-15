import { useState, useEffect } from 'react';
import { Session, getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '~/server/auth';
import { getSession, useSession, signOut } from "next-auth/react"
import { GetServerSideProps } from 'next';


const Navbar = () => {

  const { data: session } = useSession()
  function handleSignOut(){
    signOut()
  }
  
  return (
    <div className='fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-center'>
      <div className='container max-w-7xl mx-auto w-full flex justify-between items-center '>
        <div className="flex-grow">
        </div>
        {session ? User({ session, handleSignOut }) : Guest()}
  
      </div>
    </div>
  );
}

// Guest
function Guest(){
  return (
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>Guest Homepage</h3>

          <div className='flex justify-center'>
            <Link href={'/SignInPage'} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign In</Link>
          </div>
      </main>
  )
}

// Authorize User
function User({ session, handleSignOut }: { session: Session | null, handleSignOut: () => void }){

  return(
    <main className="container mx-auto text-center py-20">
      <div className='flex'>
          <h3 className='text-3xl font-bold'>Authorize User Homepage</h3>

          <div className='details  mt-5 px-10 py-1'>
            <h5>{session?.user?.email ?? ''}</h5>
          </div>

          <div className="flex justify-center">
            <button onClick={handleSignOut} className='mt-5 px-10 py-1  rounded-sm bg-gray-50'>Sign Out</button>
          </div>
          <div className='flex justify-center'>
            <Link href={'/CreateBlog'} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Write Blog</Link>
          </div>

          <div className='flex justify-center'>
            <Link href={`/Profile/${session?.user?.id ?? ''}`} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Profile Page</Link>
          </div>
          </div>
      </main>
  )
}



export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/SignInPage',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Navbar;