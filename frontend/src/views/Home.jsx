import Container from "../components/Container";
import Welcome from "../components/Welcome";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AttendanceMonitor from "../components/AttendanceMonitor";
import AttendanceDashboard from "../components/AttendanceDashboard";

export default function Home() {

    const [role, setRole] = useState("")

    useEffect(() => {
        setRole(Cookies.get("auth-role"))
    }, [])

    return (
        <Container>
            <div className="flex flex-col gap-6">
                <Welcome />
                {role === 'employee' && <AttendanceDashboard />}
                {role === 'admin' && <AttendanceMonitor />}
            </div>
        </Container>
    );
}
