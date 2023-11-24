export default function AdminLogin() {
  return (
    <>
      <div className="container-adminLogin bg-ghostwhite-100 h-screen w-screen flex items-center justify-center">
        <div className="boxMid p-5 bg-ghostwhite-50 rounded-md">
          <h1 className="text-5xl font-mono p-3 ">Admin Login</h1>

          <form className="flex flex-col gap-3 p-3 ">
            <label className="text-3xl font-mono">Username</label>
            <input
              type="text"
              className="border-2 border-gray-400 rounded-md p-2"
            />
            <label className="text-3xl font-mono">Password</label>
            <input
              type="password"
              className="border-2 border-gray-400 rounded-md p-2"
            />
            <button className="border-2 border-gray-400 rounded-md p-2">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
