import React from "react"
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tooltip
  } from "@material-tailwind/react"

export default function SessionEntry(props : any) {
    const dateTime: Date = new Date(props.sessionDate)
    const peopleBooked = props.sessionCapacity - props.sessionFreeSpots

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const arrivalTime = new Date(dateTime.getTime() - 40 * 60000);

    return (
        <section className="grid grid-cols-2 text-white border border-white rounded-lg text-center mx-3 my-4">
            <div className="pl-5 py-1">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold mt-2">{props.sessionName}</h2>
                    <ul className="list-none text-sm text-center leading-tight py-1 "> 
                        <Tooltip content="Date" placement="right" placeholder=""><li><p className="my-2">📅 <span className="font-semibold">{dateTime.toLocaleDateString()}</span></p></li></Tooltip>
                        <Tooltip content="Venue" placement="right" placeholder=""><li><p className="my-2">📍 <span className="font-semibold">Newcastle</span></p></li></Tooltip>
                        <li>
                            <p className="my-2">
                            <Tooltip content="Lights out time" placement="bottom" placeholder=""><span className="mr-1">🚥 <span className="font-semibold">{dateTime.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})}</span></span></Tooltip>
                            <Tooltip content="Arrive by time" placement="bottom" placeholder=""><span> 🚀 <span className="font-semibold">{arrivalTime.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})}</span></span></Tooltip>
                            </p>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col items-center justify-center mt-2 mb-4">
                    <Button onClick={handleOpen} variant="gradient" color="red" className="rounded-lg" placeholder="">Book</Button>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center text-center pr-5 py-1">
                <p className="text-sm">Slots left: <br></br><span className="font-bold italic text-5xl text-red-500">{props.sessionFreeSpots}/{props.sessionCapacity}</span></p>
                <p className="text-sm"><span className="font-semibold">{peopleBooked}</span> racers</p>
            </div>

            <Dialog open={open} handler={handleOpen} size="sm" className="bg-gray-800" placeholder="">
                    <DialogHeader className="text-white" placeholder="">You will be redirected to TeamSport</DialogHeader>
                    <DialogBody className="text-white" placeholder="">
                    Session details: <span className="font-bold">{props.sessionName}</span> at 
                    <span className="font-bold"> {dateTime.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})} </span>
                    (arrive by <span className="font-bold">{arrivalTime.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})}</span>) 
                    on <span className="font-bold">{dateTime.toLocaleDateString()}</span>. 
                    <br></br><br></br>You will be redirected to TeamSport's booking website to complete your booking.
                    <br></br>The session will be automatically added to your basket.
                    </DialogBody>
                    <DialogFooter placeholder="">
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                        placeholder=""
                    >
                        <span>Cancel</span>
                    </Button>
                    <a href="" target="_blank"><Button variant="gradient" color="green" onClick={handleOpen} placeholder="">
                        <span>Confirm</span>
                    </Button></a>
                    </DialogFooter>
                </Dialog>
                        
        </section>
    )
}