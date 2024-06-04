import React, { useEffect, useState } from 'react'
import TableOne from './TableOne'
import { getTable } from '../apis/Table.jsx'

const TableList = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        try {
            (async () => {
                const data = await getTable();
                setTables(data);
            })()
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(true)
        }
    }, [loading]);

    return (
        <>
            <section className="py-5 sm:py-5 lg:py-6">
                <section className="py-2 sm:py-2 lg:py-2">
                    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Table List</h2>
                            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-white">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                        </div>
                        <form action="#" method="POST" className="max-w-xl mx-auto mt-5">
                            <div className="flex flex-col items-center sm:flex-row sm:justify-center">
                                <div className="flex-1 w-full min-w-0 px-4 sm:px-0">
                                    <label htmlFor="text" className="sr-only"></label>
                                    <input
                                        type="text"
                                        name="text"
                                        id="text"
                                        placeholder="Enter table name or table number"
                                        className="block outline-none w-full px-4 py-4 text-base text-black placeholder-gray-500 transition-all duration-200 border-transparent rounded-md caret-indigo-600 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                                        required
                                    />
                                </div>

                                <button type="submit" className="inline-flex items-center justify-center w-auto px-4 py-4 mt-4 font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md sm:ml-4 sm:mt-0 sm:w-auto hover:bg-indigo-700 focus:bg-indigo-700">
                                    Search
                                    <svg className="w-5 h-5 ml-3 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </form>

                        <div className="flex items-center justify-center px-8 mt-8 sm:px-0">
                            <svg className="flex-shrink-0 w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span className="ml-2 text-sm text-white"> Your data is complely secured with us. We don’t share with anyone. </span>
                        </div>
                    </div>
                </section>
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-3 mt-5">
                    <div className="grid grid-cols-1 gap-6 lg:gap-5 sm:grid-cols-2 md:grid-cols-4">
                        {
                            tables.map((table, index) => (
                                <TableOne key={index} table={table} />
                            ))
                        }
                    </div>
                </div>
            </section>
            <div className="join flex justify-center p-5">
                <input className="join-item btn btn-square bg-white" type="radio" name="options" aria-label="1" defaultChecked />
                <input className="join-item btn btn-square bg-white" type="radio" name="options" aria-label="2" />
                <input className="join-item btn btn-square bg-white" type="radio" name="options" aria-label="3" />
                <input className="join-item btn btn-square bg-white" type="radio" name="options" aria-label="4" />
            </div>
        </>

    )
}

export default TableList