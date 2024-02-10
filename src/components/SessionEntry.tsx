

function SessionEntry(props : any) {
    
    const [date, time] = props.sessionDate.split("T")

    const peopleBooked = props.sessionCapacity - props.sessionFreeSpots

    return (
        <section className="text-white border border-white rounded-lg text-center m-2 my-4">
            <h2 className="text-lg font-semibold">{props.sessionName}</h2>
            <p>Time: <span className="font-semibold">{time}</span></p>
            <p>Slots left: <span className="font-semibold">{props.sessionFreeSpots} / {props.sessionCapacity}</span></p>
            <p className="text-sm"><span className="font-semibold">{peopleBooked}</span> racers booked</p>
            <a className="font-semibold text-stroke-3 rounded-lg bg-gradient-to-r from-red-300 to-red-500 hover:from-red-200 hover:to-red-400 
                            shadow-none hover:shadow-lg hover:shadow-gray-600 px-2.5 py-2 text-xl select-none cursor-pointer block mx-5 my-3">Book</a>
        </section>
    )
}

export default SessionEntry;