import React from 'react'

const TableOne = () => {
    return (
        <div className="flex flex-col bg-white border border-gray-200 rounded-md">
            <div className="flex flex-col justify-between flex-1 p-8">
                <div className="flex-1">
                    <blockquote>
                        <div className="relative group cursor-pointer text-sky-50  overflow-hidden h-20 w-full rounded-md bg-bg-poker bg-cover p-2 flex justify-center items-center font-extrabold">
                            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-900"></div>
                            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-32 h-32 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-800"></div>
                            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-24 h-24 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-700"></div>
                            <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-14 h-14 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-600"></div>
                            <p className="z-10">table 1</p>
                        </div>
                    </blockquote>
                </div>
                <div className="mt-8">
                    <div className="w-full h-0 mb-8 border-t-2 border-gray-200 border-dotted" />
                    <div className="flex items-center">
                        <img
                            className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                            src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/8/avatar-1.jpg"
                            alt=""
                        />
                        <div className="ml-3">
                            <p className="text-base font-semibold text-gray-800 truncate">
                                Staff
                            </p>
                            <p className="text-base text-gray-500 truncate">
                                President of Sales
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableOne