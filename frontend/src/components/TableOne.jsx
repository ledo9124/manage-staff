import React, { useState } from 'react'
import StopWatch from './StopWatch';
import { closeTable, openTable } from '../apis/Table.jsx';

const TableOne = ({ table }) => {
    const [currTable, setCurrTable] = useState(table);

    const handleClickBtn = async () => {
        if (!currTable.status) {
            const data = await openTable(currTable._id);
            if (data) {
                setCurrTable(data);
            }
        } else {
            const data = await closeTable(currTable._id);
            if (data) {
                setCurrTable(data);
            }
        }
    }

    let [bg, border, btn] = ["bg-white", "border-dark-600", "btn-success"];
    if (currTable.status) {
        [bg, border, btn] = ["bg-sky-300", "border-sky-600", "btn-error"];
    }

    return (
        <div className={`flex flex-col ${bg} ${border} rounded-md`}>
            <div className="flex flex-col justify-between flex-1 p-5">
                <div className="flex-1 bg-[url('../../public/images/bg-1.webp')] bg-cover bg-center rounded-md">
                    <blockquote>
                        <div className="relative group cursor-pointer text-sky-50 overflow-hidden h-20 w-full rounded-md bg-bg-poker bg-cover p-2 flex justify-center items-center font-extrabold ">
                            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-900"></div>
                            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-32 h-32 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-800"></div>
                            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-24 h-24 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-700"></div>
                            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-14 h-14 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-600"></div>
                            <p className="z-10 px-6 py-2 hover:bg-[rgba(0,0,0,0.4)] rounded-md">{table.name}</p>
                        </div>
                    </blockquote>
                </div>
                <div className="mt-8">
                    <div className="w-full h-0 mb-8 border-t-2 border-gray-300 border-dotted"></div>
                    <div className="flex items-center">
                        <img
                            className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                            src={currTable.userId?._id ? currTable.userId?.profilePic : "../../public/images/bg-1.webp"}
                            alt=""
                        />
                        <div className="ml-3">
                            <p className="text-base font-semibold text-gray-800 truncate text-[12px] lg:text-md">
                                {currTable.userId?._id ? currTable.userId?.fullName : "Empty Table"}
                            </p>
                            <p className="text-base text-gray-500 truncate text-[12px] lg:text-md">
                                Staff
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-between items-center gap-2">
                    {
                        currTable.status &&
                        (<button className="btn btn-warning text-white">
                            <StopWatch />
                        </button>)
                    }
                    <button className={`btn ${btn} text-white flex-1`} onClick={handleClickBtn}>
                        {currTable.status ? "Close" : "Open"}
                    </button>
                    {/* <button className="btn btn-error">Close</button> */}

                </div>

            </div>
        </div>
    )
}

export default TableOne