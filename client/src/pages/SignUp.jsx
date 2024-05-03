import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-5 mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side */}
        <div className="flex-1">
          <Link to="/" className="font-bold data:text-white: text-4xl">
            <span
              className="px-2 py-1 bg-gradient-to-r from-indigo-500
         via-purple-500 to bg-pink-500 rounded-lg text-white"
            >
              Shamin's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5 ">
            This is a demo project usgin reactJS and Taildwine. You can sign
            with your email and password or with google.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="username" id="username" />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput type="text" placeholder="name@company.com" id="email" />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="text" placeholder="password" id="password" />
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit">
              Sign Up
            </Button>
          </form>
          <div className="text-sm flex gap-2 mt-4">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500">sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
