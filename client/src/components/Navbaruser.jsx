import React from "react";

const Navbaruser = () => {

    return(
        <div className="navbar bg-base-100 border-b">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">SignPose3D</a>
            </div>
            <div className="navbar-end">
                <ul className="menu menu-horizontal px-1">
                    <li><a>คำศัพท์</a></li>
                    <li><a>สนับสนุน</a></li>
                    <li><a>เกี่ยวกับเรา</a></li>
                </ul>
                <div className="flex gap-2">
                    <a className="btn btn-primary text-primary-content">เข้าสู่ระบบ</a>
                    <a className="btn btn-secondary text-secondary-content">ลงทะเบียน</a>
                </div>
            </div>
        </div>
    )
}

export default Navbaruser;


