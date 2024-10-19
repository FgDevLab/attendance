import { useEffect, useState } from "react";
import { List, Avatar, Card, Empty, message } from "antd";
import { FaRegClock, FaWifi } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import moment from "moment";
import axios from "axios";

export default function AttendanceMonitor() {
    const [attendances, setAttendance] = useState([]);

    const fetchAttendances = async () => {
        try {
            const response = await axios.get("/attendance");
            setAttendance(response.data);
        } catch (error) {
            console.log(error.response?.data?.message || "Failed to fetch attendances. Please try again.");
        }
    };

    useEffect(() => {
        fetchAttendances();
    }, []);

    const getAttendanceTitle = (type) => {
        if (type === 'in') {
            return <span className="text-blue-500 font-semibold">Clock-In</span>;
        } else if (type === 'out') {
            return <span className="text-red-500 font-semibold">Clock-Out</span>;
        }
    };

    return (
        <Card title="Attendance Monitor" className="w-full max-w-4xl mx-auto border rounded-lg">
            {attendances.length === 0 ? (
                <Empty description="No attendances found" /> 
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={attendances}
                    renderItem={attendance => (
                        <List.Item className="p-4 border-b last:border-none">
                            <List.Item.Meta
                                avatar={<Avatar src={attendance.photo} size={64} shape="square" />}
                                title={
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-semibold text-gray-800">{attendance.user.name}</span> 
                                        {getAttendanceTitle(attendance.type)}
                                    </div>
                                }
                                description={
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center text-gray-600">
                                            <FiMapPin className="mr-2" />
                                            <span>{attendance.location}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FaWifi className="mr-2" />
                                            <span>{attendance.ip}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FaRegClock className="mr-2" />
                                            <span>{moment(attendance.createdAt).format('MMMM Do YYYY, h:mm:ss A')}</span>
                                        </div>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            )}
        </Card>
    );
}
