import Link from 'next/link';

export function LoginForm() {
  return (
    <form className="z-10 max-w-lg p-8 m-4 bg-white text-gray-800 border border-gray-200 rounded-lg flex flex-col justify-center items-center gap-8 md:p-4 md:gap-4">
      <h1 className="text-[1.25rem] font-semibold">Livemode Single-Sign-On Portal</h1>
      <p className="text-sm">
        This is the general log-in page for your Bundesliga content. After your
        log-in you will be redirected automatically to the various platforms
      </p>

      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm">E-mail</label>
          <input type="email" placeholder="E-mail address" className="w-full p-2 border border-gray-300 bg-gray-100 text-gray-800 rounded-sm focus:outline-none" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm">Password</label>
          <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 bg-gray-100 text-gray-800 rounded-sm focus:outline-none" />
        </div>
      </div>
      
      <button className="w-full p-2 bg-green-500 text-white rounded-sm transition-opacity duration-200 hover:opacity-80">Sign in</button>

      <div className="w-full flex flex-col gap-1 items-center">
        <Link href="/forgot-your-password"><span className="text-sm text-gray-500 text-center hover:text-gray-800 hover:underline">Forgot your password?</span></Link>
        <Link href="/request-an-account"><span className="text-sm text-gray-500 text-center hover:text-gray-800 hover:underline">Request an account</span></Link>
      </div>

    </form>
  );
}
