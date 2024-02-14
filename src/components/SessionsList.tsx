import useSWR from "swr"
import axios from "axios"
import { Spinner } from "@material-tailwind/react"

import { useState } from "react"

// Components
import SessionEntry from "./SessionEntry"
import SessionFilter from "./SessionFilter"
//import PinnedSessions from "./PinnedSessions"
import SessionInvite from "./SessionInvite"


interface AccessTokenResponse {
    ClientKey: string,
    ServiceAddress: string,
    AccessToken: string
}

interface SessionResponse {
    proposals: any[]
}

export default function SessionsList(props: any) {
    const [startDate, setStartDate] = useState(new Date())
    const [productId, setProductId] = useState("666353")
    const apiKey = FetchAccessToken()

    const sessionsUrl: string = "https://booking-api18.sms-timing.com/api/dayplanner/dayplannerauto/teamsportnewcastle?date=" + startDate.toISOString() + "&productId=" + productId

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

    const { data, isLoading } = useSWR<SessionResponse>(() => apiKey ? sessionsUrl : false, fetcher)

    const sessionEntries = data?.proposals.map((proposal, index) => (
        <SessionEntry
            productId={productId}
            sessionName={proposal.blocks[0].block.name}
            sessionDate={proposal.blocks[0].block.start}
            sessionCapacity={proposal.blocks[0].block.capacity}
            sessionFreeSpots={proposal.blocks[0].block.freeSpots}
            is12h={props.is12h}
            key={index}
        />
    ))

    const noResults = (sessionEntries?.length == 0) && !isLoading

    return (
        <>
        <h1 className="text-white text-center text-2xl font-semibold mt-3">Karting Sessions List</h1>

        
        <SessionFilter startDate={startDate} setStartDate={setStartDate} setProductId={setProductId}/>

        {isLoading && <div className="flex justify-center my-10">
                        <Spinner className="h-8 w-8" color="red"/>
                    </div>}

        {noResults && <p className="text-center text-lg font-semibold text-white mt-8">No sessions found or sessions are all at capacity. Please try a different date or session.</p>}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
            {sessionEntries}
        </div>

        <SessionInvite apiKey={apiKey} is12h={props.is12h} />
        </>
    );
}

function FetchAccessToken() {
    const messageToken: string = "U2FsdGVkX1%2ByoQnYLlCRfDkEihGKenZ3d%2FDMATtpA1hGE4astDf8KJ%2Bzrt63MHII"
    const accessTokenUrl: string = "https://backend.sms-timing.com/api/connectioninfo/encrypted?message=" + messageToken + "&locationType=3&type=booking"
    const fetcher = (url: string) => 
        fetch(url)
        .then(response => response.json())
    const { data } = useSWR<AccessTokenResponse>(accessTokenUrl, fetcher, { revalidateOnFocus: false} )
    return data?.AccessToken
}
