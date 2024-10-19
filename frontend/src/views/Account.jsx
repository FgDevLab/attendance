import { useEffect, useState } from "react";
import Container from "../components/Container";
import axios from "axios";
import { Avatar, Input, Button, message, Form } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Account() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        bio: "",
        name: "",
        email: "",
        role: "",
    });
    const [form] = Form.useForm();

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
            setProfile(response.data);

            form.setFieldsValue({
                name: response.data.name,
                email: response.data.email,
                bio: response.data.bio,
            });
        } catch (error) {
            console.error("Failed to fetch user details:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSaveProfile = async () => {
        try {
            await form.validateFields(); 
            await axios.put("/user", profile);
            message.success("Profile updated successfully!"); 
        } catch (error) {
            if (error.errorFields) {
                message.error("Please fill out all required fields.");
            } else {
                message.error("Failed to update profile.");
            }
            console.error("Error updating profile:", error);
        }
    };

    const handleLogout = () => {
        Cookies.remove("auth-token");
        Cookies.remove("auth-role");
        Cookies.remove("location");
        navigate("/login");
    };

    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <Container hasBack={false} title={"Account"}>
            <div className="w-full flex flex-col gap-3 py-3">
                <div className="border rounded-lg h-[7.5rem] px-6 py-4 flex items-center justify-between w-full relative overflow-hidden">
                    <div className="flex flex-col relative z-10">
                        <h1 className="text-2xl mb-1 font-semibold text-gray-800 tracking-wide">
                            <span className="text-blue-500">{profile.name}</span>
                        </h1>
                        <p className="text-gray-600 text-lg">{profile.role}</p>
                    </div>
                    <div className="relative z-10">
                        <Avatar className="cursor-pointer bg-blue-500 text-white" size={50}>
                            {getInitials(profile.name)}
                        </Avatar>
                    </div>
                </div>

                <Form form={form} layout="vertical" className="border p-6 rounded-lg bg-white flex flex-col">
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            className="py-2"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="py-2"
                            disabled
                        />
                    </Form.Item>

                    <Form.Item
                        label="Bio"
                        name="bio"
                        rules={[{ required: true, message: 'Please input your bio!' }]}
                    >
                        <Input.TextArea
                            name="bio"
                            value={profile.bio}
                            onChange={handleInputChange}
                            placeholder="Bio"
                            className="py-2"
                        />
                    </Form.Item>

                    <Button size="large" type="primary" onClick={handleSaveProfile} className="w-full mt-4">
                        Save Profile
                    </Button>
                    <Button size="large" onClick={handleLogout} className="w-full mt-4">
                        Logout
                    </Button>
                </Form>
            </div>
        </Container>
    );
}
