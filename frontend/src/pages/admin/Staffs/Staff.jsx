import React from 'react'
import StaffWorking from './../../../components/StaffWorking';
import StaffResting from '../../../components/StaffResting';

const Staff = () => {
    return (
        <>
            <section class="py-5 sm:py-6 lg:py-10 px-10 rouned-md">
                <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div class="max-w-2xl mx-auto text-left sm:text-center">
                        <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Get full access to Celebration</h2>
                    </div>
                    <div class="mt-5 space-y-8 sm:space-x-12 sm:mt-6 sm:flex sm:items-start sm:justify-center sm:space-y-0 md:space-x-20 lg:mt-8">
                        <div class="flex items-start">
                            <svg class="flex-shrink-0 text-orange-400 w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                            <div class="ml-4">
                                <h3 class="text-xl font-semibold text-white">130+ Blocks</h3>
                                <p class="mt-1.5 text-base text-white">Ready to use</p>
                            </div>
                        </div>

                        <div class="flex items-start">
                            <svg class="flex-shrink-0 text-orange-400 w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                            <div class="ml-4">
                                <h3 class="text-xl font-semibold text-white">14 Pages</h3>
                                <p class="mt-1.5 text-base text-white">Make it live</p>
                            </div>
                        </div>

                        <div class="flex items-start">
                            <svg class="flex-shrink-0 text-orange-400 w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                            <div class="ml-4">
                                <h3 class="text-xl font-semibold text-white">Easy Access</h3>
                                <p class="mt-1.5 text-base text-white">Anyone can use</p>
                            </div>
                        </div>
                    </div>

                    <form action="#" method="POST" class="max-w-xl mx-auto mt-12">
                        <div class="sm:p-2 sm:bg-white sm:border-2 sm:border-transparent sm:rounded-full sm:focus-within:border-blue-600 sm:focus-within:ring-1 sm:focus-within:ring-blue-600">
                            <div class="flex flex-col items-start sm:flex-row sm:justify-center">
                                <div class="flex-1 w-full min-w-0">
                                    <div class="relative text-gray-400 focus-within:text-gray-600">
                                        <label for="text" class="sr-only"></label>
                                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            name="text"
                                            id="text"
                                            placeholder="Enter Staff's Name"
                                            class="block outline-none w-full py-4 pl-10 pr-4 text-base text-black placeholder-gray-500 transition-all duration-200 border-transparent rounded-full focus:border-transparent focus:ring-0 caret-blue-600"
                                            required=""
                                        />
                                    </div>
                                </div>

                                <button type="submit" class="inline-flex items-center justify-center w-auto px-4 py-4 mt-4 font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full sm:ml-4 sm:mt-0 sm:w-auto hover:bg-blue-700 focus:bg-blue-700">
                                    Search Staff
                                    <svg class="w-5 h-5 ml-3 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>

                    <div class="flex items-center justify-start mt-8 sm:justify-center sm:px-0">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                        <span class="ml-2 text-sm text-white"> Your data is complely secured with us. We don’t share with anyone. </span>
                    </div>
                </div>
                <div class="py-5 sm:py-5 lg:py-6 bg-white mx-20 px-10 rounded-lg mt-10 ">
                    <div role="tablist" className="tabs tabs-bordered mx-auto ">
                        <input type="radio" name="my_tabs_1" role="tab" className="tab px-10 text-lg font-bold" aria-label="Tab 1" />
                        <div role="tabpanel" className="tab-content p-10 ">
                        </div>
                        <input type="radio" name="my_tabs_1" role="tab" className="tab px-10 text-lg font-bold " aria-label="Tab 2" defaultChecked />
                        <div role="tabpanel" className="tab-content p-10 ">
                            <StaffWorking />
                        </div>
                        <input type="radio" name="my_tabs_1" role="tab" className="tab px-10 text-lg font-bold" aria-label="Tab 3" />
                        <div role="tabpanel" className="tab-content p-10">
                            <StaffResting />
                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}

export default Staff