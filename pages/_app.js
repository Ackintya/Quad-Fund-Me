import '../styles/globals.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
function MyApp({ Component, pageProps }) {
    const router = useRouter();

  return (
    <div>
    
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="/" className="flex items-center">
              <img src='logo.png' className="h-20 mr-3 sm:h-15" alt="Flowbite Logo" />
              <span className="self-center text-2xl  font-semibold whitespace-nowrap dark:text-white">QuadFund Me</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="border inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link href="/">
                <a className={`block py-2 pl-3 pr-4 text-gray-700 rounded md:bg-transparent  md:p-0 dark:text-white aria-current="page" ${router.pathname == "/" ? "text-indigo-600" : "text-brand-darkblue"}`}>
        Home
    </a>
                </Link>
              </li>
              <li>
                <Link href="/create-item" > 
                <a className={`block py-2 pl-3 pr-4 text-gray-700 rounded md:bg-transparent  md:p-0 dark:text-white aria-current="page" ${router.pathname == "/create-item" ? "text-indigo-600" : "text-brand-darkblue"}`}>Add Project</a>

                </Link>
              </li>
              <li>
                <Link  href="/my-assets">
                <a className={`block py-2 pl-3 pr-4 text-gray-700 rounded md:bg-transparent  md:p-0 dark:text-white aria-current="page" ${router.pathname == "/my-assets" ? "text-indigo-600" : "text-brand-darkblue"}`}>My Pools</a>
                </Link>
              </li>
              <li>
                <Link href="/create-pool" >
                <a className={`block py-2 pl-3 pr-4 text-gray-700 rounded md:bg-transparent  md:p-0 dark:text-white aria-current="page" ${router.pathname == "/create-pool" ? "text-indigo-600" : "text-brand-darkblue"}`}>Create Pool</a>
                </Link>
              </li>
              <li>
                <Link href="/all-pool">
                <a className={`block py-2 pl-3 pr-4 text-gray-700 rounded md:bg-transparent  md:p-0 dark:text-white aria-current="page" ${router.pathname == "/all-pool" ? "text-indigo-600" : "text-brand-darkblue"}`}>All Pools</a>

                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Component {...pageProps} />
    </div>
  )
}

export default MyApp