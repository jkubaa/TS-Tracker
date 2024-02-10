
import SessionsList from './components/SessionsList'

function App() {
  return (
    <>
    <header className="p-2 bg-gray-800">
      <h1 className="text-white text-center text-2xl font-semibold">TS-Tracker</h1>
    </header>

    <main className="p-2">
        <SessionsList />
    </main>

    <footer className="p-2 bg-gray-800">
      <p className="text-white text-center">Not affiliated with TeamSport</p>
    </footer>
    </>
  )
}

export default App
