import { FaRegClock, FaWifi } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";

export default function AttendancePanel({ date, ip, location }) {
    return (
        <div className="border p-6 flex flex-col gap-3 rounded-lg bg-white">
            <div className="flex flex-row items-center gap-3">
                <FaRegClock size={20} color="#4b5563" />
                <p className="text-gray-600 text-lg">{date}</p>
            </div>
            <div className="flex flex-row items-center gap-3">
                <FaWifi size={20} color="#4b5563" />
                <p className="text-gray-600 text-lg">IP : {ip}</p>
            </div>
            <div className="flex flex-row items-center gap-3">
                <FiMapPin size={20} color="#4b5563" />
                <p className="text-gray-600 text-lg">{location}</p>
            </div>
        </div>
    )
}