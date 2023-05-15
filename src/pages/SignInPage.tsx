import React from "react";
import { FC } from "react";
import { signIn, signOut } from "next-auth/react"
import UserAuthForm from "./component/UserAuthForms";
import Link from "next/link";
import { useFormik } from "formik";
import login_validate from "~/lib/validate";
import { useRouter } from "next/router";


const SignInPage: FC = () => {
  const router = useRouter()
  //Formik hook
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate:login_validate,
    onSubmit
  })
  
  async function onSubmit(values: any) {
    console.log(values)
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/"
  })

  if (status && status.ok && status.url) {
    router.push(status.url);
    console.log(status)
    
  }
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
                  
                  placeholder="  john12@gmail.com"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...formik.getFieldProps('email')}

                />
              </div>
              {formik.errors.email  && formik.touched.email ? <span className="flex items-center text-rose-500">{formik.errors.email}</span>:<></>}
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
              {formik.errors.password && formik.touched.password ? <span className="flex items-center text-rose-500">{formik.errors.password}</span>:<></>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>


        </div>

        <div className=""> <UserAuthForm /></div>

        <p className='text-center text-gray-400 '>
          don't have an account yet? <Link href={'./Register'} className='text-blue-700'>Sign Up</Link>
        </p>

      </div>
    </>
  );
};

export default SignInPage;
