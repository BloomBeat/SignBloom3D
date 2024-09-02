import {Link} from "react-router-dom";

export const Login = () => {

    return (
        <div className="flex flex-row h-[calc(100%-4rem)] justify-center">
            <div className="w-1/2 lg:flex hidden">test</div>
            <div className="flex flex-col justify-center items-center w-1/2 gap-8 text-2xl">
                <div className="text-6xl py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-base to-primary-content from-65%">
                    SignBloom3D
                </div>
                เข้าสู่ระบบ
                <div className="flex justify-center items-center w-72 h-fit border-2 rounded-lg border-gray-200">
                    <div className="w-full py-5 px-4 flex flex-col gap-5">
                        <div><div className="text-sm">อีเมล</div>
                            <input
                                className="w-full rounded-lg bg-white border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2"
                                label="email"
                            >
                            </input></div>


                        <div><div className="text-sm">รหัสผ่าน</div>
                            <input
                                className="w-full rounded-lg bg-white border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2"
                                label="email"
                            >
                            </input></div>

                        <button className="w-full bg-primary-base h-9 rounded-lg text-white text-sm">เข้าสู่ระบบ</button>
                    
                        <Link className="text-sm underline underline-offset-2">ลืมรหัสผ่าน</Link>
                    </div>
                </div>
                <Link className="text-sm">ยังไม่มีบัญชี ?</Link>
            </div>
        </div>
    );
};
