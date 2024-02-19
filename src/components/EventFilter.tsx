import React, { useEffect, useState } from "react"

// Date Picker imports
import { Input, Popover, PopoverHandler, PopoverContent, Select, Option } from "@material-tailwind/react"
import { format } from "date-fns"
import enGb from 'date-fns/locale/en-GB'
import { DayPicker } from "react-day-picker"
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline"

export default function EventFilter(props: any) {
    const [isGridFilterEnabled, setIsGridEnabled] = useState(false)

    // Calendar functions
    const isToday = (date: Date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    }

    const disabledDays = (date: Date) => {
        const day = date.getDay();
        const today = new Date();
        if (isGridFilterEnabled) {
            return day !== 1 && day !== 4 || (date < today && !isToday(date))
        } else {
            return day === -1 || (date < today && !isToday(date))
        }
    }
    // End of calendar functions

    const handleSwitchToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsGridEnabled(event.target.checked)
    }

    useEffect(() => {
        if (isGridFilterEnabled) {
            props.setProductId("7801970")
        } else {
            props.setProductId("666353")
        }
    }, [isGridFilterEnabled])

    return (
        <div className="grid grid-col text-white rounded-lg mb-4">
            <div className="flex items-center justify-center">
                <label htmlFor="public" className="mt-px mb-0 mx-4 font-semibold text-white cursor-pointer select-none">
                    Public
                </label>
                <div className="inline-flex items-center">
                    <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                        <input id="switch-2" type="checkbox"
                            className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-red-500 peer-checked:border-red-500 peer-checked:before:bg-red-500"
                            onChange={handleSwitchToggle} />
                        <label htmlFor="switch-2"
                            className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-red-500 peer-checked:before:bg-red-500">
                            <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                                data-ripple-dark="true"></div>
                        </label>
                    </div>
                </div>
                <label htmlFor="grid" className="mt-px mb-0 mx-4 font-semibold text-white cursor-pointer select-none">
                    #GRID
                </label>
            </div>

            <div className="flex flex-col mt-5 lg:flex-row justify-center items-center">
                <div className="px-2 w-72 mb-4 lg:mb-0">
                    <Popover placement="bottom" animate={{ mount: { y: 0 }, unmount: { y: 15 } }}>
                        <PopoverHandler>
                            <Input
                                label="Date"      
                                className="cursor-pointer"
                                onChange={() => null}
                                value={props.startDate ? [format(props.startDate, "PPPP", { locale: enGb })] : []}
                                crossOrigin=""
                                onFocus={(e) => e.target.readOnly = true}
                            />
                        </PopoverHandler>
                        <PopoverContent className="bg-gray-900 border-2 border-red-500" placeholder="">
                            <DayPicker
                                mode="single"
                                required
                                disabled={disabledDays}
                                selected={props.startDate}
                                onSelect={props.setStartDate}
                                showOutsideDays
                                className="border-0"
                                classNames={{
                                    caption: "flex justify-center py-2 mb-4 relative items-center",
                                    caption_label: "text-sm font-medium text-white",
                                    nav: "flex items-center",
                                    nav_button: "h-6 w-6 bg-transparent text-white hover:bg-red-800 p-1 rounded-md transition-colors duration-300",
                                    nav_button_previous: "absolute left-1.5",
                                    nav_button_next: "absolute right-1.5",
                                    table: "w-full border-collapse",
                                    head_row: "flex font-medium text-white",
                                    head_cell: "m-0.5 w-9 font-normal text-sm",
                                    row: "flex w-full mt-2",
                                    cell: "text-white hover:bg-red-800/30 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-red-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-red-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                    day: "h-9 w-9 p-0 font-normal",
                                    day_range_end: "day-range-end",
                                    day_selected: "rounded-md bg-red-900 text-white hover:bg-red-700 hover:text-white focus:bg-red-900 focus:text-white",
                                    day_today: "rounded-md border-2 border-red-900 text-white",
                                    day_outside: "day-outside text-white opacity-50 aria-selected:bg-red-500 aria-selected:text-red-900 aria-selected:bg-opacity-10",
                                    day_disabled: "text-gray-600 opacity-50 line-through ",
                                    day_hidden: "invisible",
                                }}
                                components={{
                                    IconLeft: ({ ...props }) => (
                                        <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                                    ),
                                    IconRight: ({ ...props }) => (
                                        <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                                    ),
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="w-72 px-2">
                    <Select placeholder="" label="Track" value="Newcastle" onChange={() => null}>
                        <Option value="Newcastle">Newcastle</Option>
                    </Select>
                </div>

                {!isGridFilterEnabled && <div className="w-72 px-2 mb-4 lg:mb-0">
                    <Select placeholder="" label="Event" value="666353" onChange={(val) => props.setProductId(val)}>
                        <Option value="666353">Adult Ultimate Race Experience</Option>
                        <Option value="22087459">Adult Combat Karts</Option>
                        <Option value="104013">Three4Two</Option>
                        <Option value="104476">Student, NHS & Forces Karting</Option>
                        <Option value="103969">50 Lap Race</Option>
                    </Select>
                </div>}

                {isGridFilterEnabled && <div className="w-72 px-2 mb-4 lg:mb-0">
                    <Select placeholder="" label="Event" value="7801970" onChange={(val) => props.setProductId(val)}>
                        <Option value="7801970">#GRID 342 - SOCIAL+</Option>
                        <Option value="33404672">#GRID Series - CLUB+</Option>
                        <Option value="5013415">#GRID Tin Tops - CLUB+</Option>
                    </Select>
                </div>}

            </div>
        </div>
    )
}