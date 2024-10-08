import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../hooks/api.js";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(
                '/user/login',
                { email, password },
                { withCredentials: true }
            );
            window.location.reload();
        } catch (error) {
            toast.error(error.response.data.error || "An error occured");
        }
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    return (
        <div className="flex flex-row h-[calc(100%-4rem)] justify-center">
            <div className="w-1/2 lg:flex hidden bg-secondary-content"></div>
            <div className="flex flex-col justify-center items-center w-1/2 gap-8 text-2xl">
                <div className="text-6xl py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-base to-primary-content from-65%">
                    SignBloom3D
                </div>
                เข้าสู่ระบบ
                <div className="flex justify-center items-center w-72 h-fit border-2 rounded-lg border-gray-200">
                    <form className="w-full py-5 px-4 flex flex-col gap-5" onSubmit={handleLogin}>
                        <div><label htmlFor="email" className="text-sm">อีเมล</label>
                            <input
                                type="text"
                                id="email"
                                className="w-full h-9 text-sm rounded-lg bg-white border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2"
                                placeholder="กรอกอีเมลที่นี่"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </input></div>


                        <div className="relative"><label htmlFor="password" className="text-sm">รหัสผ่าน</label>
                            <div className="absolute right-2 bottom-2 cursor-pointer select-none" onClick={togglePasswordVisibility}>{!isPasswordVisible ? <EyeSlashIcon className="h-5" /> : <EyeIcon className="h-5" />}</div>
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                id="password"
                                className="w-full h-9 text-sm rounded-lg bg-white border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2"
                                placeholder="กรอกรหัสผ่านที่นี่"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </input></div>

                        <button id="submit" className="w-full bg-primary-base h-9 rounded-lg text-white text-sm">เข้าสู่ระบบ</button>

                        <Link className="text-sm underline underline-offset-2">ลืมรหัสผ่าน</Link>
                    </form>
                </div>
                <Link className="text-sm">ยังไม่มีบัญชี ?</Link>
            </div>
        </div>
    );
};
