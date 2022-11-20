import { useState, useContext, Fragment, useRef } from "react"
import AppContext from "@/AppContext"
import { Dialog, Transition } from '@headlessui/react'

import { 
  UserUpdateForm 
} from '../ui-components';

const EditUser = ({user}) => {
    const cancelButtonRef = useRef(null)

    const [open, setOpen] = useState(true)
    
      console.log(user)
      if (user){
    return (
        <>
            <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                  {console.log(user.fines)}
                <UserUpdateForm
                  User={user}
                  onSuccess={() => setOpen(false)}
                  onClose={() => setOpen(false)}
                />
            </Transition.Child>
            </Dialog>
            </Transition.Root>
                
      </>
    )}
    return null
}

export default EditUser