import { useEffect, useState } from "react";
import Container from "../components/Container";
import moment from "moment-timezone";
import axios from "axios";
import Camera from "../components/Camera";
import AttendancePanel from "../components/AttendancePanel";
import { message, Modal } from "antd";
import { useNavigate } from "react-router-dom";

export default function Clockin() {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const [location, setLocation] = useState('');
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [timezone, setTimezone] = useState('');

    useEffect(() => {
        const tz = moment.tz.guess();
        setTimezone(tz); 
        setCurrentDate(moment().tz(tz).format('dddd, MMMM Do YYYY'));

        const timer = setInterval(() => {
            setCurrentTime(moment().tz(tz).format('HH:mm'));
        }, 1000);

        const fetchLocationAndIP = async () => {
            try {
                const response = await axios.get('https://ipapi.co/json/');
                setIpAddress(response.data.ip);
                const { city, region, country, latitude, longitude } = response.data;
                setLocation(`${city}, ${region}, ${country} (${latitude}, ${longitude})`);
            } catch (error) {
                console.error("Failed to fetch IP and location:", error);
                setIpAddress("IP not available");
                setLocation("Location not available");
            }
        };

        fetchLocationAndIP();

        return () => clearInterval(timer);
    }, []);

    const handleCapture = (image) => {
        setCapturedImage(image);
        setIsConfirmVisible(true);
    };

    const handleConfirmClockOut = async () => {
        try {
            const form = new FormData();
            form.append("photo", capturedImage);
            form.append("location", location);
            form.append("timezone", timezone);
            form.append("ip", ipAddress);
            await axios.post("/attendance/clockout", form);
            message.success("Clock Out Successful!");
            navigate("/");
        } catch (error) {
            message.error(error.response?.data?.message || "Failed to clock out. Please try again later.");
        }
        setIsConfirmVisible(false); 
    };

    const handleCancelClockOut = () => {
        setIsConfirmVisible(false);
        setCapturedImage(null); 
    };

    return (
        <Container hasBack={true} title={"Clock Out"}>
            <div className="w-full flex flex-col gap-3 py-3">
                <AttendancePanel date={`${currentDate} : ${currentTime}`} ip={ipAddress} location={location} />
                <Camera onCapture={handleCapture} captureLabel={"Clock Out"} />
                <Modal
                    title="Confirm Clock Out"
                    open={isConfirmVisible}
                    onOk={handleConfirmClockOut}
                    onCancel={handleCancelClockOut}
                    okText="Yes, Clock Out"
                    cancelText="Cancel"
                >
                    <p>Are you sure you want to clock out now?</p>
                </Modal>
            </div>
        </Container>
    );
}
