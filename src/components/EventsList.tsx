import { useEffect, useState } from "react"
import useSWR from "swr"
import axios from "axios"
import { Spinner, Option } from "@material-tailwind/react"

// Components
import EventEntry from "./EventEntry"
import EventFilter from "./EventFilter"
import SharedEvent from "./SharedEvent"
//import PinnedEvents from "./PinnedEvents"

interface LocationEventsResponse {
    name: string,
    defaultName: string,
    id: string,
    products: Array<{
        id: string
        name: string
        productGroup: string
        resourceKind: string
        isMembersOnly: boolean
    }>
}

interface AccessTokenResponse {
    ClientKey: string,
    ServiceAddress: string,
    AccessToken: string
}

interface EventsResponse {
    proposals: any[]
}

interface LocationsResponse {
    clientsInfo: Array<{
        clientKey: string,
        name: string,
        baseAddress: string,
    }>,
}

export default function EventsList(props: any) {
    const [startDate, setStartDate] = useState(new Date())
    const [selectedLocation, setSelectedLocation] = useState("")
    const [locationBaseAddress, setLocationBaseAddress] = useState("")

    useEffect(() => {
        if (selectedLocation) {
            const selectedLocationBaseAddress = locations?.clientsInfo.find((location) => location.clientKey === selectedLocation)?.baseAddress
            setLocationBaseAddress(selectedLocationBaseAddress ?? "")
        }

    }, [selectedLocation])

    // Fetch locations from API
    const locationsUrl: string = "https://backend.sms-timing.com/api/cluster/clusterinfo/teamsportnewcastle"

    const locationsFetcher = (url: string) =>
        fetch(url)
            .then(response => response.json())

    const { data: locations, isLoading: locationsLoading } = useSWR<LocationsResponse | undefined>(locationsUrl, locationsFetcher, { revalidateOnFocus: false })

    const locationEntries = locations?.clientsInfo.map((location) => (
        <Option key={location.clientKey} value={location.clientKey}>{location.name}</Option>
    ))

    // Fetch the access token to allow further querying of the API 
    const apiKey = FetchAccessToken()

    // Fetch the available activities for the current location and date
    const locationActivitiesFetcher = (url: string) =>
        fetch(url, { headers: { "X-Fast-AccessToken": apiKey ?? "" } })
            .then(response => response.json())

    const locationEventsUrl: string = "https://booking-api" + locationBaseAddress + ".sms-timing.com/api/page/" + selectedLocation + "?date=" + startDate.toISOString()
    // TO DO: whenever location changes, fetch the new locationBaseAddress

    const { data: fetchedActivities, isLoading: fetchedActivitiesLoading } =
        useSWR<Array<LocationEventsResponse> | undefined>((() => selectedLocation && locationBaseAddress ? locationEventsUrl : false), locationActivitiesFetcher, { revalidateOnFocus: false })

    function filterEventOptions(name: string, eventKind: string): boolean {
        if (eventKind === "Race") {
            return true
        } else {
            return false
        }
    }

    const filteredEventOptions = fetchedActivities?.flatMap(event => event.products.filter(product => filterEventOptions(product.name, product.resourceKind)))
    const activityOptions = filteredEventOptions?.map(product => <Option key={product.id} value={product.id}>{product.name}</Option>)

    useEffect(() => {
        if (fetchedActivities) {
            const defaultProductId = fetchedActivities[0].products[0].id
            setProductId(defaultProductId)
        }
    }, [fetchedActivities])

    // Fetch events from API
    const [productId, setProductId] = useState<string>("")
    const eventsUrl: string = "https://booking-api" + locationBaseAddress + ".sms-timing.com/api/dayplanner/dayplannerauto/" + selectedLocation + "?date=" + startDate.toISOString() + "&productId=" + productId
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

    const eventsFetcher = (url: string) =>
        axios.post(url, tsApiBody, { headers: tsApiHeaders })
            .then(response => response.data)

    const { data, isLoading } = useSWR<EventsResponse>(() => apiKey && locationBaseAddress && selectedLocation && productId ? eventsUrl : false, eventsFetcher)

    const eventEntries = data?.proposals.map((proposal, index) => (
        <EventEntry
            productId={productId}
            eventName={proposal.blocks[0].block.name}
            // Add location to event entry
            eventDate={proposal.blocks[0].block.start}
            eventCapacity={proposal.blocks[0].block.capacity}
            eventFreeSpots={proposal.blocks[0].block.freeSpots}
            is12h={props.is12h}
            key={index}
        />
    ))
    // End of fetching events from API

    const noResults = (eventEntries?.length == 0) && !isLoading

    return (
        <>
            <EventFilter
                startDate={startDate}
                setStartDate={setStartDate}
                locationsLoading={locationsLoading}
                locationEntries={locationEntries}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                setProductId={setProductId}
                locationEventsLoading={fetchedActivitiesLoading}
                eventEntries={activityOptions} />

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
