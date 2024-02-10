function SessionEntry() {
    return (
        <section className="text-white border border-white rounded-lg">
            <h2>Session name</h2>
            <p>Date: <span className="font-semibold">01/01/2024</span></p>
            <p>Slots: <span className="font-semibold">0 / 0</span></p>
            <a className="font-semibold text-stroke-3 rounded-lg bg-gradient-to-r from-red-300 to-red-500 hover:from-red-200 hover:to-red-400 
                            shadow-none hover:shadow-lg hover:shadow-gray-600 px-2.5 py-2 text-xl select-none cursor-pointer block w-[5%] my-2">Book</a>
        </section>
    )
}

export default SessionEntry;