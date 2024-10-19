import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useState, useEffect } from "react";
import moment from "moment-timezone";
import axios from "axios";

export default function AttendanceDashboard() {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [clockInTime, setClockInTime] = useState(null);
    const [clockOutTime, setClockOutTime] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const tz = moment.tz.guess();  

        fetchMe(tz);

        const timer = setInterval(() => {
            setCurrentTime(moment().tz(tz).format('h:mm:ss A'));
            setCurrentDate(moment().tz(tz).format('dddd, MMMM Do YYYY'));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const fetchMe = async (tz) => {
        try {
            const response = await axios.get("/attendance/me", {
                params: {
                    timezone: tz
                }
            });
            const records = response.data;

            const clockInRecord = records.find(record => record.type === 'in');
            const clockOutRecord = records.find(record => record.type === 'out');

            if (clockInRecord) {
                setClockInTime(moment(clockInRecord.createdAt).tz(tz).format('h:mm A'));
            }
            if (clockOutRecord) {
                setClockOutTime(moment(clockOutRecord.createdAt).tz(tz).format('h:mm A'));
            }
        } catch (error) {
            console.error("Failed to fetch attendance detail:", error);
        }
    };

    const calculateTotalHours = () => {
        let end;

        if (clockOutTime) {
            end = moment(clockOutTime, 'h:mm A');
        } else {
            end = moment();
        }

        if (clockInTime) {
            const start = moment(clockInTime, 'h:mm A');
            const duration = moment.duration(end.diff(start));

            const hours = String(Math.floor(duration.asHours())).padStart(2, '0');
            const minutes = String(duration.minutes()).padStart(2, '0');
            const seconds = String(duration.seconds()).padStart(2, '0');

            return `${hours}:${minutes}:${seconds}`;
        }

        return 'N/A';
    };

    const handleClockIn = () => {
        navigate("/clockin");
    };

    const handleClockOut = () => {
        navigate("/clockout");
    };

    return (
        <div className="border p-6 rounded-lg bg-white">
            <div className="flex flex-col mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">{currentTime}</h2>
                <p className="text-gray-600 text-lg">{currentDate}</p>
            </div>

            <div className="flex justify-between items-center mb-6">
                <Button
                    type="primary"
                    className="w-1/2 mr-2"
                    size="large"
                    onClick={handleClockIn}
                    disabled={!!clockInTime}
                >
                    Clock In
                </Button>
                <Button
                    type="primary"
                    className="w-1/2 ml-2"
                    size="large"
                    onClick={handleClockOut}
                    disabled={!clockInTime || !!clockOutTime}
                >
                    Clock Out
                </Button>
            </div>

            <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Today's Attendance</h3>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-500">Clock In:</p>
                        <p className="font-semibold text-gray-700">{clockInTime || "Not Clocked In"}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Clock Out:</p>
                        <p className="font-semibold text-gray-700">{clockOutTime || "Not Clocked Out"}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Total Hours:</p>
                        <p className="font-semibold text-gray-700">{calculateTotalHours()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
