import { useState } from "react"
import { Button } from "@material-tailwind/react"

// Components
import EventsList from "./components/EventsList"

// Images
import logo from "./assets/faviconicon.png"

function App() {
  const [is12h, setIs12h] = useState(false)

  return (
    <div className="flex flex-col h-screen">
      <header className="p-5 bg-gray-800 rounded m-3 flex justify-between items-center">
        <div className="flex items-center">
          <a href="" className="flex items-center justify-center select-none">
            <img src={logo} alt="logo" className="w-14 h-14 sm:w-16 sm:h-16" />
            <span className="text-white text-4xl sm:text-5xl font-semibold ml-4 flex items-center ">TS Tracker</span>
          </a>
        </div>
        <div>
          <Button
            className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              if (is12h) { setIs12h(false) }
              else { setIs12h(true) }
            }}
            placeholder=""
          >
            12H/24H
          </Button>
        </div>
      </header>

      <main className="grow p-2">
        <EventsList is12h={is12h} />
      </main>

      <footer className="flex flex-row flex-wrap items-center justify-center bg-gray-800 py-4 mt-5 text-center md:justify-between rounded mx-3">
        <p className="text-white ml-5">Not affiliated with TeamSport</p>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 mr-5">
          <li>
            <a href="https://github.com/jkubaa/TS-Tracker" target="_blank">
              <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ul>
      </footer>

      <div className="pb-3"></div>
    </div>
  )
}

export default App
