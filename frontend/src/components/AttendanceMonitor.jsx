import { useState } from "react";
import { List, Avatar, Card } from "antd";
import { FaRegClock, FaWifi } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import moment from "moment";

export default function AttendanceMonitor() {
    const [attendances] = useState([
        {
            "id": 1,
            "userId": 1,
            "type": "in",
            "location": "Semarang, Central Java, ID (-6.9932, 110.4215)",
            "ip": "114.10.44.72",
            "photo": "https://figan-cdn.s3.ap-southeast-1.amazonaws.com/17ac057e-1cbc-4bbb-b71e-7bc5a332de12-clockin.png",
            "createdAt": "2024-10-19 09:00:54",
            "updatedAt": "2024-10-19 09:00:54",
            "user": {
                "id": 1,
                "name": "Figan",
                "email": "employee@example.com"
            }
        },
        {
            "id": 2,
            "userId": 1,
            "type": "out",
            "location": "Semarang, Central Java, ID (-6.9932, 110.4215)",
            "ip": "114.10.44.72",
            "photo": "https://figan-cdn.s3.ap-southeast-1.amazonaws.com/a59eab86-f742-43f1-87a4-96b8fcb1e0cb-clockin.png",
            "createdAt": "2024-10-19 09:03:24",
            "updatedAt": "2024-10-19 09:03:24",
            "user": {
                "id": 1,
                "name": "Figan",
                "email": "employee@example.com"
            }
        }
    ]);

    const getAttendanceTitle = (type) => {
        if (type === 'in') {
            return <span className="text-blue-500 font-semibold" >Clock-In</span>;
        } else if (type === 'out') {
            return <span className="text-red-500 font-semibold">Clock-Out</span>;
        }
    };

    return (
        <Card title="Attendance Monitor" className="w-full max-w-4xl mx-auto border rounded-lg">
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
        </Card>
    );
}
