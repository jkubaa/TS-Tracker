import { useEffect, useState } from "react"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import enGB from "date-fns/locale/en-GB"

export default function SessionFilter(props : any) {

    return (
        <div className="flex justify-center my-3">
            <DatePicker
                className="rounded-lg"
                showIcon
                selected={props.startDate}
                onChange={props.setStartDate}
                minDate={new Date()}
                locale={enGB}
                dateFormat="P"
            />

            <select className="rounded-lg ml-4" onChange={(e) => props.setProductId(e.target.value)}>
                <option value="666353">Adult Race Session</option>
                <option value="7801970">#GRID - 342</option>
            </select>
        </div>
    );
}