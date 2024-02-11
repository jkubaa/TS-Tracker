import { Button } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react"

function SessionEntry(props : any) {
    const dateTime: Date = new Date(props.sessionDate)
    const peopleBooked = props.sessionCapacity - props.sessionFreeSpots

    return (
        <section className="grid grid-cols-2 text-white border border-white rounded-lg text-center m-2 my-4">
            <div>
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold mt-2">{props.sessionName}</h2>
                    <p className="my-2">🕒 <span className="font-semibold">{dateTime.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})}</span></p>
                </div>

                <div className="flex flex-col items-center justify-center mt-2 mb-4">
                    <a href=""><Button variant="gradient" color="red" className="rounded-lg" placeholder="">Book</Button></a>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center">
                <p className="text-sm">Slots left: <br></br><span className="font-bold italic text-4xl text-red-500">{props.sessionFreeSpots}/{props.sessionCapacity}</span></p>
                <p className="text-sm"><span className="font-semibold">{peopleBooked}</span> racers booked</p>
            </div>


            
        </section>
    )
}

export default SessionEntry;