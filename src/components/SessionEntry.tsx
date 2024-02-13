import React from "react"
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tooltip,
    IconButton
} from "@material-tailwind/react"
import { useCopyToClipboard } from "usehooks-ts"
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline"


export default function SessionEntry(props: any) {
    const [value, copy] = useCopyToClipboard()
    const [copied, setCopied] = React.useState(false)
    const [hoveringOverSection, setHoveringOverSection] = React.useState(false)

    const dateTime: Date = new Date(props.sessionDate)
    const peopleBooked = props.sessionCapacity - props.sessionFreeSpots

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(!open)

    const arrivalTime = new Date(dateTime.getTime() - 40 * 60000);

    const bookHref = "https://booking.sms-timing.com/teamsportnewcastle/book/product-list?adults=1&kids=0&productId=" + props.productId + "&people=1&datetime=" + dateTime.toISOString()
    const handleSectionHover = (isHovering: boolean) => {
        setHoveringOverSection(isHovering);
    };

    return (
        <>
            <section
                className="grid grid-cols-2 text-white border border-white rounded-lg text-center mx-3 my-4 relative"
                onMouseEnter={() => handleSectionHover(true)}
                onMouseLeave={() => handleSectionHover(false)}>
                {hoveringOverSection && (
                    <div className="absolute top-0 right-0 mt-2 mr-2">
                        <Tooltip content={copied ? "Copied" : "Copy invitation link"} placement="top" placeholder="">
                            <IconButton
                                onMouseLeave={() => setCopied(false)}
                                onClick={() => {
                                    copy("https://tstracker.pages.dev/invite/?pid=" + props.productId + "&date=" + props.sessionDate)
                                    setCopied(true);
                                }}
                                placeholder=""
                            >
                                {copied ? (
                                    <CheckIcon className="h-5 w-5 text-white" />
                                ) : (
                                    <DocumentDuplicateIcon className="h-5 w-5 text-white" />
                                )}
                            </IconButton>
                        </Tooltip>
                    </div>
                )}

                <div className="pl-5 py-1">
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-lg font-semibold mt-2">{props.sessionName}</h2>
                        <ul className="list-none text-sm text-center leading-tight py-1 ">
                            <Tooltip content="Date" placement="right" placeholder=""><li><p className="my-2">📅 <span className="font-semibold">{dateTime.toLocaleDateString()}</span></p></li></Tooltip>
                            <Tooltip content="Venue" placement="right" placeholder=""><li><p className="my-2">📍 <span className="font-semibold">Newcastle</span></p></li></Tooltip>
                            <li>
                                <p className="my-2">
                                    <Tooltip content="Arrive by time" placement="bottom" placeholder=""><span>🚀 <span className="font-semibold">{arrivalTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span></span></Tooltip>
                                    <Tooltip content="Lights out time" placement="bottom" placeholder=""><span className="mr-1">&nbsp;&nbsp;🚥 <span className="font-semibold">{dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span></span></Tooltip>
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
            </section>

            <Dialog open={open} handler={handleOpen} size="md" className="bg-gray-800" placeholder="">
                <DialogHeader className="text-white" placeholder="">You will be redirected to TeamSport to complete your booking</DialogHeader>
                <DialogBody className="text-white" placeholder="">
                    <section className="grid grid-cols-1 md:grid-cols-2 text-white text-center mx-3">
                        <div className="pl-5 py-1">
                            <div className="flex flex-col items-center justify-center">
                                <h2 className="text-2xl font-semibold mt-2">{props.sessionName}</h2>
                                <ul className="list-none text-lg text-left leading-tight py-1">
                                    <li><p className="my-2">📅 Date: <span className="font-semibold">{dateTime.toLocaleDateString()}</span></p></li>
                                    <li><p className="my-2">📍 Location: <span className="font-semibold">Newcastle</span></p></li>
                                    <li><p className="my-2">🚀 Arrive by: <span className="font-semibold">{arrivalTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span></p></li>
                                    <li><span className="mr-1">🚥 Lights out: <span className="font-semibold">{dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span></span></li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center text-center pr-5 py-1">
                            <p className="">Slots left: <br></br><span className="font-bold italic text-7xl text-red-500">{props.sessionFreeSpots}/{props.sessionCapacity}</span></p>
                            <p className=""><span className="font-semibold">{peopleBooked}</span> racers</p>
                        </div>
                    </section>
                    <br></br><br></br>The session should be automatically added to your basket. 
                    <span className="font-semibold"> Please check that the correct session
                    has been added to your basket before completing your booking.</span>
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

                    <a href={bookHref} target="_blank"><Button variant="gradient" color="green" onClick={handleOpen} placeholder="">
                        <span>Confirm</span>
                    </Button></a>
                </DialogFooter>
            </Dialog>
        </>
    )
}