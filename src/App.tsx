import { useState } from "react"
import { IconButton, ThemeProvider } from "@material-tailwind/react"

// Components
import EventsList from "./components/EventsList"
import Settings from "./components/Settings"

// Images
import logo from "./assets/faviconicon.png"

function App() {
  const [is12h, setIs12h] = useState(false)

  const theme = {
    select: {
      defaultProps: {
        color: "red",
        labelProps: { className: "text-white font-semibold" },
        menuProps: { className: "bg-gray-900 border-2 border-red-500 text-white" },
        className: "text-white",
        animate: {
          unmount: { y: 15 },
          mount: { y: 0 },
        },
      },

      styles: {
        base: {
          option: {
            initial: {
              background: "hover:bg-red-500 focus:bg-red-500",
              opacity: "hover:bg-opacity-30 focus:bg-opacity-30",
              color: "hover:text-white focus:text-white",
            },
            active: {
              bg: "bg-red-700 bg-opacity-80 hover:bg-opacity-80 focus:bg-opacity-80",
              color: "text-gray-200",
            },
          },
        }
      }
    },

    input: {
      defaultProps: {
        color: "red",
        labelProps: { className: "text-white font-semibold" },
        className: "text-white",
      },
    }
  }

  return (
    <ThemeProvider value={theme}>
      <div className="flex flex-col h-screen">
        <header className="p-5 bg-gray-800 rounded-lg m-4 flex justify-between items-center shadow-sm shadow-black">
          <div className="flex items-center">
            <a href="" className="flex items-center justify-center select-none">
              <img src={logo} alt="logo" className="w-14 h-14 sm:w-16 sm:h-16" />
              <span className="text-white text-4xl sm:text-5xl font-semibold ml-4 flex items-center ">TS Tracker</span>
            </a>
          </div>
          <div>
            <Settings is12h={is12h} setIs12h={setIs12h} />
          </div>
        </header>

        <main className="grow p-2">
          <EventsList is12h={is12h} setIs12h={setIs12h} />
        </main>

        <footer className="flex flex-col md:flex-row flex-wrap items-center justify-center bg-gray-800 py-4 mt-5 text-center md:justify-between rounded-lg mx-4 shadow-sm shadow-black">
          <p className="text-white md:ml-5">Not affiliated with TeamSport</p>
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 mt-2 md:mt-0 md:mr-5">
            <li>
              <a href="https://github.com/jkubaa/TS-Tracker" target="_blank">
                <IconButton className="rounded-full bg-[#333333] hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10" placeholder="">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </IconButton>
              </a>
            </li>
          </ul>
        </footer>
        <div className="pb-3"></div>
      </div>
    </ThemeProvider>
  )
}

export default App
