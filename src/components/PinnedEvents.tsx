import { useEffect, useState } from "react"
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Spinner
} from "@material-tailwind/react"

export default function PinnedEvents() {
    const [open, setOpen] = useState(1)
    const [noResults, setNoResults] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setNoResults(false)
        setIsLoading(true)
    }, [])

    const handleOpen = (value: any) => setOpen(open === value ? 0 : value)

    return (
        <>
            <div className="mt-6 mb-3 sm:mt-7 sm:mb-5 sm:mx-10 px-3 pb-5 bg-gray-800 rounded">
                <Accordion open={open === 1} placeholder="">
                    <AccordionHeader onClick={() => handleOpen(1)} className="text-white hover:text-gray-400" placeholder="">
                        📌 Pinned Events (0)
                    </AccordionHeader>

                    <AccordionBody>
                        {isLoading && <div className="flex justify-center my-10">
                            <Spinner className="h-8 w-8" color="red" />
                        </div>}

                        {noResults && <p className="text-center text-lg font-semibold text-white mt-5">No pinned events found. They may be at capacity.</p>}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                        </div>
                    </AccordionBody>
                </Accordion>
            </div>
        </>
    )
}