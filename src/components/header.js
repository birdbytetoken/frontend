import { useState } from 'react';
import {isBrowser} from 'react-device-detect';
import { useAppContext } from '../context/state';

export default function Header({ }) {
  const [navbar, toggleNavbar] = useState(false);
  const [sharedState, setSharedState] = useAppContext()

  const logout = () => {
    setSharedState({ user: {}, userToken: "" })
    window.location.href = '/'
  }

  const buy = (e) => {
    e.preventDefault()
    setSharedState({ msg: true });
  }
    
  return (
    <div>
      
      <nav
      className="bg-gradient top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg shadow"
    >
      <div
        className="container px-4 mx-auto flex flex-wrap items-center justify-between"
      >
        <div
          className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
        >
        <a
        className="text-white text-sm font-bold leading-relaxed inline-block mr4 py-2 whitespace-nowrap uppercase"
        href="/"
        >
            
        <img
        alt="logo"
        src="/images/BIB-PNG.png"
              width="100"
              height="60"
                          className="inline-block"
      />
      
            </a>
            
            <button
                      className="toggle-button cursor-pointer text-xl leading-none px-3 py-1 rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                      type="button"
                      onClick={() => toggleNavbar(!navbar)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      
        {(navbar || isBrowser) &&
        <div
          className="lg:flex flex-grow items-center bg-gradient lg:bg-opacity-0 lg:shadow-none">
          <ul
            className="flex flex-col lg:flex-row list-none lg:ml-auto items-center"
          >
            <li className="inline-block relative">
              <a
                className="hover:text-white text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                href="/features"
              >
                Features
              </a>
            </li>
            <li className="inline-block relative">
              <a
                className="hover:text-white text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                href="/whybirdbyte"
              >
                Why BirdByte?
              </a>
            </li>
            <li className="inline-block relative">
              <a
                className="hover:text-white text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                href="/roadmap"
              >
                Roadmap
              </a>
            </li>
            <li className="inline-block relative">
              <a
                className="hover:text-white text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/tokenomics"
                  // target="_blank"
              >
                Tokenomics
              </a>
            </li>
            <li className="inline-block relative">
              <a
                className="btn hover:text-white text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                href="/roadmap"
              >
                About us
              </a>
            </li>
            {sharedState?.user?.id &&
            <li className="inline-block relative">
              <button
                className="btn hover:text-white text-white px-3 py-4 mt-2 md:mt-0 lg:py-2 flex items-center text-xs uppercase font-bold md:ml-2"
                onClick={logout}
              >
                logout
              </button>
            </li>
              }
            
          </ul>
        </div>

        }
      </div>
      </nav>
      {/* {sharedState.msg && 
        <div className="absolute top-3 md:top-24 bg-darkPurple block w-full p-4 z-50">
        <i className="fa fa-exclamation-triangle mr-2"></i>  
        You cannot buy at the moment. Presale starts on the 12th. Join telegram to participate.</div>
      } */}
    </div>
  )
}