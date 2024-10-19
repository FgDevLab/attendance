import { useEffect, useState } from "react";
import { List, Avatar, Card, Empty, Modal } from "antd";
import { FaRegClock, FaWifi } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import moment from "moment";
import axios from "axios";

export default function AttendanceMonitor() {
    const [attendances, setAttendance] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedAttendance, setSelectedAttendance] = useState(null);

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
        return type === 'in' ? 
            <span className="text-blue-600 font-semibold">Clock-In</span> : 
            <span className="text-red-600 font-semibold">Clock-Out</span>;
    };

    const handleAttendanceClick = (attendance) => {
        setSelectedAttendance(attendance);
        setVisible(true);
    };

    const handleModalClose = () => {
        setVisible(false);
        setSelectedAttendance(null);
    };

    return (
        <Card title="Attendance Monitor" className="w-full max-w-4xl mx-auto border rounded-lg shadow-lg">
            {attendances.length === 0 ? (
                <Empty description="No attendances found" className="mt-10" />
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={attendances}
                    renderItem={attendance => (
                        <List.Item 
                            className="p-4 border-b last:border-none hover:bg-gray-100 transition-all duration-200 cursor-pointer" 
                            onClick={() => handleAttendanceClick(attendance)}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={attendance.photo} size={64} shape="square" />}
                                title={
                                    <div className="flex items-center pr-4 justify-between">
                                        <span className="text-xl font-semibold text-gray-800">{attendance.user.name}</span> 
                                        {getAttendanceTitle(attendance.type)}
                                    </div>
                                }
                                description={
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center text-gray-600">
                                            <FiMapPin className="mr-2 text-lg" />
                                            <span className="text-sm">{attendance.location}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FaWifi className="mr-2 text-lg" />
                                            <span className="text-sm">{attendance.ip}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FaRegClock className="mr-2 text-lg" />
                                            <span className="text-sm">{moment(attendance.createdAt).format('MMMM Do YYYY, h:mm:ss A')}</span>
                                        </div>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            )}

            {selectedAttendance && (
                <Modal
                    title={`${selectedAttendance.user.name} - Attendance Details`}
                    visible={visible}
                    onCancel={handleModalClose}
                    footer={null}
                    className="custom-modal"
                >
                    <div className="flex flex-col items-center">
                        <Avatar src={selectedAttendance.photo} size={128} shape="square" className="mb-4" />
                        <div className="text-lg font-semibold">{selectedAttendance.user.name}</div>
                        <div className="flex items-center text-gray-600 mt-2">
                            <FiMapPin className="mr-2 text-lg" />
                            <span>{selectedAttendance.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mt-1">
                            <FaWifi className="mr-2 text-lg" />
                            <span>{selectedAttendance.ip}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mt-1">
                            <FaRegClock className="mr-2 text-lg" />
                            <span>{moment(selectedAttendance.createdAt).format('MMMM Do YYYY, h:mm:ss A')}</span>
                        </div>
                    </div>
                </Modal>
            )}
        </Card>
    );
}
