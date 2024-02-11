import React from "react"

// Date Picker imports
import {
    Input,
    Popover,
    PopoverHandler,
    PopoverContent,
    Select,
    Option
} from "@material-tailwind/react"
import { format } from "date-fns"
import enGb from 'date-fns/locale/en-GB'
import { DayPicker } from "react-day-picker"
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline"

export default function SessionFilter(props: any) {
    const disabledDays = {
        before: new Date(),
    }

    return (
        <div className="flex justify-center my-5">
            <div className="px-2 w-72">
                <Popover placement="bottom">
                    <PopoverHandler>
                        <Input
                            label="Select a Date"
                            color="red"
                            className="text-white"
                            onChange={() => null}
                            value={props.startDate ? [format(props.startDate, "PPPP", { locale: enGb })] : []}
                            crossOrigin=""
                        />
                    </PopoverHandler>
                    <PopoverContent placeholder="Enter content here" className="bg-gray-800">
                        <DayPicker
                            mode="single"
                            disabled={disabledDays}
                            selected={props.startDate}
                            onSelect={props.setStartDate}
                            showOutsideDays
                            className="border-0"
                            classNames={{
                                caption: "flex justify-center py-2 mb-4 relative items-center",
                                caption_label: "text-sm font-medium text-white",
                                nav: "flex items-center",
                                nav_button: "h-6 w-6 bg-transparent text-white hover:bg-red-50 p-1 rounded-md transition-colors duration-300",
                                nav_button_previous: "absolute left-1.5",
                                nav_button_next: "absolute right-1.5",
                                table: "w-full border-collapse",
                                head_row: "flex font-medium text-white",
                                head_cell: "m-0.5 w-9 font-normal text-sm",
                                row: "flex w-full mt-2",
                                cell: "text-white rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-red-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-red-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                day: "h-9 w-9 p-0 font-normal",
                                day_range_end: "day-range-end",
                                day_selected: "rounded-md bg-red-900 text-white hover:bg-red-900 hover:text-white focus:bg-red-900 focus:text-white",
                                day_today: "rounded-md bg-red-200 text-red-900",
                                day_outside: "day-outside text-red-500 opacity-50 aria-selected:bg-red-500 aria-selected:text-red-900 aria-selected:bg-opacity-10",
                                day_disabled: "text-gray-500 opacity-50",
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
                <Select placeholder="" label="Select the session type" animate={{ mount: { y: 0 }, unmount: { y: 20 } }} className="rounded-lg text-white" color="red" value="666353" onChange={(val) => props.setProductId(val)}> 
                    <Option value="666353">Adult Ultimate Race Experience</Option>
                    <Option value="7801970">#GRID - 342</Option>
                </Select>
            </div>

            <div className="w-72 px-2">
                <Select placeholder="" label="Select the venue" animate={{ mount: { y: 0 }, unmount: { y: 20 } }} value="Newcastle" className="rounded-lg text-white" color="red" onChange={() => null}> 
                    <Option value="Newcastle">Newcastle</Option>
                </Select>
            </div>
        </div>
    )
}