import { useEffect, useState } from "react"

import SessionEntry from "./SessionEntry";
import useSWR, { Fetcher } from 'swr'

interface AccessTokenResponse {
    ClientKey: string,
    ServiceAddress: string,
    AccessToken: string
}

function SessionsList() {
    const accessTokenUrl: string = "https://backend.sms-timing.com/api/connectioninfo/encrypted?message=U2FYdGVkX19I1GUtROBK1w%2B2YxHDxGwW582h0a%2BLf2KQihI1sndOHoPnZGr1AnVE&locationType=3&type=booking"
    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR<AccessTokenResponse>(accessTokenUrl, fetcher, { revalidateOnFocus: false})
    const apiKey = data?.AccessToken
    console.log(apiKey)

    //const [sessions, setSessions] = useState([])

    return (
        <>
            <h1 className="text-white text-center text-2xl font-semibold">Sessions List</h1>
            <SessionEntry />
        </>
    );
}




export default SessionsList;
