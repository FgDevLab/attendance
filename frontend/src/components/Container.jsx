import { Button } from "antd"
import { useNavigate } from 'react-router-dom';
import { BiHomeAlt } from "react-icons/bi";
import { FaRegUser, FaArrowLeft } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const TopNavigation = ({ title, hasBack }) => {
    const navigate = useNavigate();

    return (
        title && (
            <div className="bg-white border py-3 px-6 flex items-center md:w-2/4 w-full mx-auto justify-between">
                {hasBack && (
                    <Button type="text" size="large" shape="circle" onClick={() => navigate(-1)} icon={<FaArrowLeft />} ></Button>
                )}
                <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
                <div className="w-10" />
            </div>
        )
    );
};

export default function Container({ children, title, hasBack }) {
    return (
        <div className="h-screen flex flex-col justify-between">
            <TopNavigation title={title} hasBack={hasBack} />
            <div className="flex-1 overflow-y-auto">
                <div className="md:w-2/4 w-full mx-auto">
                    {children}
                </div>
            </div>

            <div className="bg-white border fixed bottom-0 left-0 right-0 w-full md:w-2/4 mx-auto flex justify-around py-3">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "flex flex-col items-center justify-center text-blue-500"
                            : "flex flex-col items-center justify-center text-gray-500 hover:text-blue-500"
                    }
                >
                    <BiHomeAlt className="text-2xl" />
                    <span className="text-xs mt-1">Home</span>
                </NavLink>

                <NavLink
                    to="/account"
                    className={({ isActive }) =>
                        isActive
                            ? "flex flex-col items-center justify-center text-blue-500"
                            : "flex flex-col items-center justify-center text-gray-500 hover:text-blue-500"
                    }
                >
                    <FaRegUser className="text-2xl" />
                    <span className="text-xs mt-1">Account</span>
                </NavLink>
            </div>
        </div>
    );
}
