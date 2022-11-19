import AddButton from "./AddButton"
import { useState, useEffect, useContext } from "react"
import Icon from "./Icon"
import { ClipboardDocumentIcon } from '@heroicons/react'
import DeleteButton from "./DeleteButton"
import AppContext from "@/AppContext"
import useTranslation from 'next-translate/useTranslation'
import AddUser from "./AddUser"
import { TrashIcon } from "@heroicons/react/20/solid"


export default function UserRows() {
    const {createUser, userList, deleteUser} = useContext(AppContext)
    
    let newUserList;
    const [tabs, setTabs] = useState('')
    const [editUser, setEditUser] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [open, setOpen] = useState(false)

    console.log(currentDisplay)

    const { t } = useTranslation('common');
    

    useEffect(() => {
      if (editUser){
        setOpen(true)
      }
    }, [editUser])
    
    return(
      <>{setOpen ? <AddUser user={editUser}/> : null}
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {userList.map((user) => (
          <li key={user.email} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</h3>
                  <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    {user.admin ? "Admin" : "User"}
                  </span>
                </div>
                {user.fines.map(fine => <p className="mt-1 truncate text-sm text-gray-500">{fine.reason} {fine.amount}</p>)}
              </div>
              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300">{user.age}</div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a
                    onClick={setEditUser(user)}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-3">Edit</span>
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    onClick={()=>deleteUser(user)}
                    className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    <TrashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-3">Delete</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>)

  
  }