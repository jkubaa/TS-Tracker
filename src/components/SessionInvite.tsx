import React, { useEffect, useState } from "react"
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Spinner } from "@material-tailwind/react"
import useSWR from "swr"
import axios from "axios"

import SessionInviteEntry from "./SessionInviteEntry"

interface SessionResponse {
    proposals: any[]
}

export default function SessionInvite(props: any) {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(!open)
    const [productId, setProductId] = useState("666353")
    const [sessionExists, setSessionExists] = useState(false)
    const [clearUrl, setClearUrl] = useState(false)

    const queryParams = new URLSearchParams(window.location.search)
    const productIdParam = queryParams.get("pid")
    const sessionDateParam = queryParams.get("date")

    const sessionsUrl: string = "https://booking-api18.sms-timing.com/api/dayplanner/dayplannerauto/teamsportnewcastle?date=" + sessionDateParam

    const bookHref = "https://booking.sms-timing.com/teamsportnewcastle/book/product-list?adults=1&kids=0&productId=" + productIdParam  + "&people=1&datetime=" + sessionDateParam

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

    const { data, isLoading } = useSWR<SessionResponse>(() => sessionDateParam ? (props.apiKey ? sessionsUrl : false) : null, fetcher)

    useEffect(() => {
        if ((data?.proposals ?? []).length > 0) {
            setSessionExists(true)
        }
    }, [data])

    const sessionEntry = data?.proposals
        ?.filter((proposal) => proposal.blocks[0].block.start === sessionDateParam)
        ?.slice(0, 1) // Limit to one result
        ?.map((proposal, index) => (
            <SessionInviteEntry
                sessionName={proposal.blocks[0].block.name}
                sessionDate={proposal.blocks[0].block.start}
                sessionCapacity={proposal.blocks[0].block.capacity}
                sessionFreeSpots={proposal.blocks[0].block.freeSpots}
                key={index}
            />
        ))

    useEffect(() => {
        if (productIdParam && sessionDateParam && window.location.pathname.includes("/invite/")) {
            setProductId(productIdParam)
            setOpen(true);
        }
    }, [productIdParam, sessionDateParam])

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

            <DialogHeader className="text-white" placeholder="">You have been invited to a TeamSport Session!</DialogHeader>

            {isLoading && <div className="flex justify-center my-10">
                <Spinner className="h-8 w-8" color="red" />
            </div>}

            {sessionExists && <div>
                <DialogBody className="text-white" placeholder="">
                    {sessionEntry}
                    <br></br><br></br>On clicking the book button you will be redirected to TeamSport's booking website to complete your booking.
                    The session should be automatically added to your basket. 
                    <span className="font-semibold"> Please check that the correct session
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

            {!sessionExists && <div><DialogBody className="text-white" placeholder="">
                <p>Sorry, the session you have been invited to no longer exists or has been filled.</p>
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

