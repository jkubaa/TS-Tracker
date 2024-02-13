import React, { useEffect } from "react"
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Spinner
} from "@material-tailwind/react"
import SessionEntry from "./SessionEntry"

export default function PinnedSessions() {
    const [open, setOpen] = React.useState(true)
    const [hidden, setHidden] = React.useState(true)

    const isLoading = false
    const noResults = false

    const handleOpen = (value: any) => setOpen(open === value ? 0 : value)

    useEffect(() => {
        setHidden(true)
    }, [])

    return (
        <>
            {!hidden && <Accordion open={open} className="px-3 pb-5 bg-gray-800 rounded" placeholder="">
                <AccordionHeader onClick={() => handleOpen(1)} className="text-white hover:text-gray-400" placeholder="">
                    📌 Pinned Sessions (0)
                </AccordionHeader>


                <AccordionBody>
                    {isLoading && <div className="flex justify-center my-10">
                        <Spinner className="h-8 w-8" color="red" />
                    </div>}

                    {noResults && <p className="text-center text-lg font-semibold text-white mt-8">No pinned sessions found. They may be at capacity.</p>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <SessionEntry />
                    </div>
                </AccordionBody>
 
            </Accordion>}
        </>
    )
}