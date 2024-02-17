import { useEffect, useState } from "react"
import { IconButton, Dialog, DialogHeader, DialogBody, Select, Option } from "@material-tailwind/react"

export default function Settings(props: any) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const [selectedClockFormat, setClockFormat] = useState(localStorage.getItem("clockFormat") || "24h")

  const toggle12h = (value: string) => {
    if (value === "24h") {
      setClockFormat("24h")
      props.setIs12h(false)
    }
    else if (value === "12h") {
      setClockFormat("12h")
      props.setIs12h(true)
    }
  }

  useEffect(() => {
    localStorage.setItem("clockFormat", selectedClockFormat)
    if (selectedClockFormat === "24h") {
      props.setIs12h(false)
    }
    else if (selectedClockFormat === "12h") {
      props.setIs12h(true)
    }
  }, [selectedClockFormat])

  return (
    <>
      <div>
        <IconButton
          className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleOpen}
          placeholder="">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M13.9794 2.97636C12.7523 2.27761 11.2477 2.27761 10.0207 2.97636L7.59467 4.35783L7.59463 4.35776L7.58436 4.36378L5.17499 5.77401C3.95632 6.48731 3.20403 7.79031 3.19563 9.20235L3.17903 11.994L3.17896 11.994L3.17903 12.0059L3.19563 14.7976C3.20403 16.2097 3.95632 17.5127 5.17499 18.226L7.58436 19.6362L7.58433 19.6363L7.59467 19.6422L10.0207 21.0236C11.2477 21.7224 12.7523 21.7224 13.9794 21.0236L16.4053 19.6422L16.4054 19.6422L16.4157 19.6362L18.825 18.226C20.0437 17.5127 20.796 16.2097 20.8044 14.7976L20.821 12.0059H20.8211L20.821 11.994L20.8044 9.20235C20.796 7.7903 20.0437 6.4873 18.825 5.77401L16.4157 4.36378L16.4157 4.36371L16.4053 4.35783L13.9794 2.97636ZM11.0103 4.71433C11.6239 4.36496 12.3762 4.36496 12.9897 4.71433L15.4105 6.09285L17.8147 7.50008C18.4241 7.85673 18.8002 8.50823 18.8044 9.21425L18.821 12L18.8044 14.7857C18.8002 15.4918 18.4241 16.1433 17.8147 16.4999L15.4105 17.9072L12.9897 19.2857C12.3762 19.635 11.6239 19.635 11.0103 19.2857L8.58952 17.9071L6.18528 16.4999C5.57594 16.1433 5.1998 15.4918 5.1956 14.7857L5.17903 12L5.1956 9.21425C5.1998 8.50823 5.57594 7.85673 6.18528 7.50008L8.5895 6.09286L11.0103 4.71433ZM11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12ZM12 9C10.3432 9 9.00001 10.3431 9.00001 12C9.00001 13.6568 10.3432 15 12 15C13.6569 15 15 13.6568 15 12C15 10.3431 13.6569 9 12 9Z" fill="#010002" />
          </svg>
        </IconButton>
      </div>

      <Dialog open={open} handler={handleOpen} size="md" className="bg-gray-800" placeholder="">
        <DialogHeader className="text-white flex justify-between items-center" placeholder="">
          <span>Settings</span>
          <div>
            <IconButton className="rounded-full" onClick={handleOpen} placeholder="">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#ffffff"></path> 
              </svg>
            </IconButton>
          </div>
        </DialogHeader>
        <DialogBody className="text-white mb-5" placeholder="">
          <Select
            label="Clock format"
            size="md"
            value={selectedClockFormat}
            onChange={(value) => { toggle12h(value as string) }}
            placeholder=""
          >
            <Option value="24h">24-hour clock</Option>
            <Option value="12h">12-hour clock (AM/PM)</Option>
          </Select>
        </DialogBody>
      </Dialog>
    </>
  )
}