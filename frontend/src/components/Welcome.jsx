import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Welcome() {
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const handleAvatarClick = () => {
        navigate("/account");
    };

    const getInitials = (fullName) => {
        return fullName
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase();
    };

    const fetchMe = async () => {
        try {
            const response = await axios.get("/user/me");
            setName(response.data.name);
        } catch (error) {
            console.error("Failed to fetch user details:", error);
        }
    };

    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <div className="border rounded-b-lg h-[7.5rem] px-6 py-4 flex items-center justify-between w-full relative overflow-hidden">
            <div className="flex flex-col relative z-10">
                <h1 className="text-2xl mb-1 font-semibold text-gray-800 tracking-wide">Hello, <span className="text-blue-500">{name}</span> </h1>
                <p className="text-gray-600 text-lg">Control Work Attendance</p>
            </div>
            <div className="relative z-10">
                <Avatar className="cursor-pointer bg-blue-500 text-white" size={50} onClick={handleAvatarClick}>
                    {getInitials(name)}
                </Avatar>
            </div>
        </div>
    );
}
