import React, { useEffect, useState } from "react"
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Spinner } from "@material-tailwind/react"
import useSWR from "swr"
import axios from "axios"

import SharedEventEntry from "./SharedEventEntry"

interface EventResponse {
    proposals: any[]
}

export default function SharedEvent(props: any) {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(!open)
    const [productId, setProductId] = useState("666353")
    const [eventExists, setEventExists] = useState(false)
    const [clearUrl, setClearUrl] = useState(false)

    const queryParams = new URLSearchParams(window.location.search)
    const productIdParam = queryParams.get("pid")
    const eventDateParam = queryParams.get("date")

    const eventsUrl: string = "https://booking-api18.sms-timing.com/api/dayplanner/dayplannerauto/teamsportnewcastle?date=" + eventDateParam

    const bookHref = "https://booking.sms-timing.com/teamsportnewcastle/book/product-list?adults=1&kids=0&productId=" + productIdParam + "&people=1&datetime=" + eventDateParam

    const tsApiBody = {
        "dynamicLines": null,
        "pageid": "660754",
        "productId": productId,
        "quantity": 1
    }

    const tsApiHeaders = {
        method: "POST",
        "X-Fast-AccessToken": props.apiKey
    }

    const fetcher = (url: string) =>
        axios.post(url, tsApiBody, { headers: tsApiHeaders })
            .then(response => response.data)

    const { data, isLoading } = useSWR<EventResponse>(() => eventDateParam ? (props.apiKey ? eventsUrl : false) : null, fetcher)

    // If the event data is not empty, set eventExists to true
    useEffect(() => {
        if ((data?.proposals ?? []).length > 0) {
            setEventExists(true)
        }
    }, [data])

    const eventEntry = data?.proposals
        ?.filter((proposal) => proposal.blocks[0].block.start === eventDateParam)
        ?.slice(0, 1) // Limit to one result
        ?.map((proposal, index) => (
            <SharedEventEntry
                eventName={proposal.blocks[0].block.name}
                eventDate={proposal.blocks[0].block.start}
                eventCapacity={proposal.blocks[0].block.capacity}
                eventFreeSpots={proposal.blocks[0].block.freeSpots}
                key={index}
            />
        ));

    // If the eventEntry is empty, set eventExists to false
    useEffect(() => {
        if (!eventEntry || eventEntry.length === 0) {
            setEventExists(false);
        }
    }, [eventEntry])

    useEffect(() => {
        if (productIdParam && eventDateParam && window.location.pathname.includes("/shared/")) {
            setProductId(productIdParam)
            setOpen(true);
        }
    }, [productIdParam, eventDateParam])

    useEffect(() => {
        if (clearUrl === true) {
            window.history.replaceState({}, document.title, window.location.origin)
            setClearUrl(false)
        }
    }, [clearUrl])

    return (
        <Dialog
            open={open}
            handler={() => {
                handleOpen()
                setClearUrl(true)
            }}
            size="md"
            className="bg-gray-800"
            placeholder="">

            <DialogHeader className="text-white" placeholder="">A TeamSport event has been shared with you!</DialogHeader>

            {isLoading && <div className="flex justify-center my-10">
                <Spinner className="h-8 w-8" color="red" />
            </div>}

            {eventExists && <div>
                <DialogBody className="text-white" placeholder="">
                    {eventEntry}
                    <br></br><br></br>On clicking the book button you will be redirected to TeamSport's booking website to complete your booking.
                    The event should be automatically added to your basket.
                    <span className="font-semibold"> Please check that the correct event
                        has been added to your basket before completing your booking.</span>
                </DialogBody>

                <DialogFooter placeholder="">
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => {
                            handleOpen()
                            setClearUrl(true)
                        }}
                        className="mr-1"
                        placeholder=""
                    >
                        <span>Close</span>
                    </Button>

                    <a href={bookHref} target="_blank"><Button variant="gradient" color="green" placeholder="">
                        <span>Book</span>
                    </Button></a>
                </DialogFooter> </div>}

            {!isLoading && !eventExists && <div><DialogBody className="text-white" placeholder="">
                <p>Sorry, this event is full or does not exist.</p>
            </DialogBody>
                <DialogFooter placeholder="">
                    <Button variant="text"
                        color="red"
                        onClick={() => {
                            handleOpen()
                            setClearUrl(true)
                        }}
                        placeholder="">
                        <span>Close</span>
                    </Button>
                </DialogFooter> </div>}
        </Dialog>
    )
}

