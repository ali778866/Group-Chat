import React from 'react'
import { GoPerson } from "react-icons/go";
import contact from "../../public/contact.json"

function ChatApp() {
    return (
        <>
            <div className='px-10'>
                <div className='fixed top-0 w-full z-40 bg-[rgba(10, 10, 10, 0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg'>
                    <div className="mx-auto px-4">
                        <div className="flex justify-between items-center h-10">
                            <img href="#home" src="/icon.png" alt="logo" className="w-10 text-white" />
                        </div>
                    </div>
                </div>
                <div className='pt-10 pb-5 flex h-screen'>
                    <div className='relative w-3/4 border hidden md:block border-red-500'>
                        <div className="flex flex-col-reverse overflow-y-auto pb-[80px] px-4 h-full">
                            <div className="chat chat-start ">
                                <div className="chat-bubble bg-white/75 text-black max-w-3xl">
                                    It's over Anakin,
                                    <br />
                                    I have the high ground.
                                </div>
                            </div>
                            <div className="chat chat-end">
                                <div className="chat-bubble bg-white/75 text-black max-w-3xl">
                                    You underestimate my power!
                                </div>
                            </div>
                        </div>
                        <div className='absolute bottom-0 w-full px-4 py-2 flex gap-2 border border-red'>
                            <input type="text" placeholder="Type here" className="input flex-1 min-w-0" />
                            <button className='btn btn-primary w-[80px]'>Send</button>
                        </div>
                    </div>

                    <div className='w-full md:w-1/4 border border-red-500 p-y-2'>
                        {contact.map((contact) => {
                            return (<div className='flex pl-5'>
                                <GoPerson className='w-10 h-10 p-1 m-1 bg-slate-600 border rounded-3xl' />
                                <div className='px-3 gap-y-[-1px]'>
                                    <div className='text-lg translate-y-[1px]'>
                                        {contact.name}
                                    </div>
                                    <div className='text-sm text-slate-400 translate-y-[-3px]'>{contact.phone}</div>
                                </div>
                            </div>);
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatApp
