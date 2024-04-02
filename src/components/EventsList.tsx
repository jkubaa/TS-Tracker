import { useState } from "react"
import useSWR from "swr"
import axios from "axios"
import { Spinner } from "@material-tailwind/react"

// Components
import EventEntry from "./EventEntry"
import EventFilter from "./EventFilter"
import SharedEvent from "./SharedEvent"
//import PinnedEvents from "./PinnedEvents"


interface AccessTokenResponse {
    ClientKey: string,
    ServiceAddress: string,
    AccessToken: string
}

interface EventsResponse {
    proposals: any[]
}

export default function EventsList(props: any) {
    const [startDate, setStartDate] = useState(new Date())
    const [productId, setProductId] = useState("666353")
    const apiKey = FetchAccessToken()

    // TEMPORARY: Set the date to the next day, will need to fix the calendar as it currently selects the day before
    const eventsUrl: string = "https://booking-api18.sms-timing.com/api/dayplanner/dayplannerauto/teamsportnewcastle?date=" + new Date(startDate.getTime() + 24 * 60 * 60 * 1000).toISOString() + "&productId=" + productId

    const tsApiBody = {
        "dynamicLines": null,
        "pageid": "660754",
        "productId": productId,
        "quantity": 1
    }

    const tsApiHeaders = {
        method: "POST",
        "X-Fast-AccessToken": apiKey
    }

    const fetcher = (url: string) =>
        axios.post(url, tsApiBody, { headers: tsApiHeaders })
            .then(response => response.data)

    const { data, isLoading } = useSWR<EventsResponse>(() => apiKey ? eventsUrl : false, fetcher)

    const eventEntries = data?.proposals.map((proposal, index) => (
        <EventEntry
            productId={productId}
            eventName={proposal.blocks[0].block.name}
            eventDate={proposal.blocks[0].block.start}
            eventCapacity={proposal.blocks[0].block.capacity}
            eventFreeSpots={proposal.blocks[0].block.freeSpots}
            is12h={props.is12h}
            key={index}
        />
    ))

    const noResults = (eventEntries?.length == 0) && !isLoading

    /* Disabled for now as it may need to be reworked or removed
    const goToPreviousDay = () => {
        const previousDate = new Date(startDate)
        previousDate.setDate(previousDate.getDate() - 1)
        setStartDate(previousDate)
    }

    const goToNextDay = () => {
        const nextDate = new Date(startDate)
        nextDate.setDate(nextDate.getDate() + 1)
        setStartDate(nextDate)
    }
    
    Return html
    <div className="flex flex-col sm:flex-row justify-between my-5">
        <Button variant="outlined" className="hover:bg-red-900/25  border-red-500 text-white font-bold py-2 px-4 rounded mx-5 mb-3 w-44" onClick={goToPreviousDay} placeholder="">Search previous day</Button>
        <Button variant="outlined" className="hover:bg-red-900/25  border-red-500 text-white font-bold py-2 px-4 rounded mx-5 mb-3 w-44" onClick={goToNextDay} placeholder="">Search next day</Button>
    </div>
    */

    return (
        <>
            <EventFilter startDate={startDate} setStartDate={setStartDate} setProductId={setProductId} />

            {isLoading && <div className="flex justify-center my-10">
                <Spinner className="h-8 w-8" color="red" />
            </div>}

            {noResults && <div className="flex flex-col items-center">
            <p className="text-center text-lg font-semibold text-white mt-8">No events found or events are all at capacity. Please try a different date or event.</p>
            </div>}

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                {eventEntries}
            </div>

            <SharedEvent apiKey={apiKey} is12h={props.is12h} />
        </>
    );
}

function FetchAccessToken() {
    const messageToken: string = "U2FsdGVkX1%2ByoQnYLlCRfDkEihGKenZ3d%2FDMATtpA1hGE4astDf8KJ%2Bzrt63MHII"
    const accessTokenUrl: string = "https://backend.sms-timing.com/api/connectioninfo/encrypted?message=" + messageToken + "&locationType=3&type=booking"
    const fetcher = (url: string) =>
        fetch(url)
            .then(response => response.json())
    const { data } = useSWR<AccessTokenResponse>(accessTokenUrl, fetcher, { revalidateOnFocus: false })
    return data?.AccessToken
}
