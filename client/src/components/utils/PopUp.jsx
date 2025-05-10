import React from 'react'
import { BiCross } from 'react-icons/bi'

export default function PopUp() {
  return (
    <div id="popup-modal" tabindex="-1" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                    <BiCross/>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                    <p>403</p>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">vous n'etes pas autorizé à faire cette action</h3>
                </div>
            </div>
        </div>
    </div>
  )
}
