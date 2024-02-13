

export default function SessionInviteEntry(props : any) {
    const dateTime: Date = new Date(props.sessionDate)
    const peopleBooked = props.sessionCapacity - props.sessionFreeSpots
    const arrivalTime = new Date(dateTime.getTime() - 40 * 60000);

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 text-white text-center mx-3">
            <div className="pl-5 py-1">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-semibold mt-2">{props.sessionName}</h2>
                    <ul className="list-none text-lg text-left leading-tight py-1"> 
                        <li><p className="my-2">📅 Date: <span className="font-semibold">{dateTime.toLocaleDateString()}</span></p></li>
                        <li><p className="my-2">📍 Location: <span className="font-semibold">Newcastle</span></p></li>
                        <li><p className="my-2">🚀 Arrive by: <span className="font-semibold">{arrivalTime.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})}</span></p></li>
                        <li><span className="mr-1"> 🚥 Lights out: <span className="font-semibold">{dateTime.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})}</span></span></li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center text-center pr-5 py-1">
                <p className="">Slots left: <br></br><span className="font-bold italic text-7xl text-red-500">{props.sessionFreeSpots}/{props.sessionCapacity}</span></p>
                <p className=""><span className="font-semibold">{peopleBooked}</span> racers</p>
            </div>               
        </section>
    )
}