import { Menu, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import DropdownMenuItem from "./DropdownMenuItem"

export default function DropdownMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="inline-flex justify-center rounded-lg border border-zinc-700 dark:border-zinc-300 px-2 py-2 text-sm font-medium shadow-sm hover:bg-blue-200 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
          aria-label="menu"
        >

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100" 
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-zinc-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-zinc-400 dark:divide-zinc-700">
          <div className="py-1">
            <div className="px-3 py-2 font-bold text-md">
              Categories
            </div>
            <DropdownMenuItem href="/categories/primer">
              Primer
            </DropdownMenuItem>
            <DropdownMenuItem href="/categories/dev-basics">
              Dev Basics
            </DropdownMenuItem>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}