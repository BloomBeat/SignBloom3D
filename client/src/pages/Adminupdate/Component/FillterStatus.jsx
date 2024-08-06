import React,{useState} from "react";

const StatusFilter =({onfilterchange}) => {
    const[selectedstatus , setselectedstatus]=useState('Onhold');

    const statuses=[Ongoing,Onhold,Rejected,Finished]
    const handlestatuschange = (status) => {
        setselectedstatus(status);
        selectedstatus(status)
    }

    return(
        <div className="status-fillter">
            <select 
                value={selectedstatus}
                onChange={handlestatuschange}
                className="select select-bordered w-full max-w-xs"
            >
             {statuses.map((status)=>(
                <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
            ))}
            </select>
        </div>
    )
};

export default StatusFilter;

 