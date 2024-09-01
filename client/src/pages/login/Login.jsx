export const Login = () => {

    return (
        <div className="flex flex-row h-[calc(100%-4rem)]">
            <div className="w-1/2">test</div>
            <div className="flex flex-col justify-center items-center w-1/2 gap-8 text-2xl">
                <div className="text-6xl py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-base to-primary-content from-65%">
                    SignBloom3D
                </div>
                เข้าสู่ระบบ
                <div className="flex justify-center items-center w-72 h-fit border-2 rounded-lg border-gray-200">
                    <div className="w-full py-1 px-4">
                        <label className="text-sm">อีเมล</label  >
                    </div>
                </div>
            </div>
        </div>
    );
};
