'use client'
import React from "react";
import { FC } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { registerValidate } from "~/lib/validate";
import { createUser } from "~/pages/api/auth/prisma";
import { useRouter } from "next/router";

const SignInPage: FC = () => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      cpassword: ''
    },
    validate: registerValidate,
    onSubmit
  })

  async function onSubmit(values: any) {
    console.log(values)
    const options = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)

    }

    await fetch('http://localhost:3000/api/auth/sign', options)
      .then(res => res.json())
      .then((data) => {
        if (data) router.push('http://localhost:3000')
      })
  }


  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  placeholder="  john12@gmail.com"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...formik.getFieldProps('email')}
                />
              </div>
              {formik.errors.email && formik.touched.email ? <span className="flex items-center text-rose-500">{formik.errors.email}</span> : <></>}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  placeholder="  ********"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...formik.getFieldProps('password')}
                />
              </div>
              {formik.errors.password && formik.touched.password ? <span className="flex items-center text-rose-500">{formik.errors.password}</span> : <></>}
            </div>
            <div>
              <label
                htmlFor="cpassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="cpassword"
                  placeholder="  ********"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...formik.getFieldProps('cpassword')}
                />
              </div>
              {formik.errors.cpassword && formik.touched.cpassword ? <span className="flex items-center text-rose-500">{formik.errors.cpassword}</span> : <></>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <p className='text-center text-gray-400 py-3 '>
          Back To <Link href={'./SignInPage'} className='text-blue-700'>Sign In</Link>
        </p>

      </div>
    </>
  );
};

export default SignInPage;
