import { useState, useEffect, useContext } from "react"
import AppContext from "@/AppContext"
import AddBook from "./AddBook"
import { MagnifyingGlassIcon, TrashIcon, ClipboardDocumentIcon } from "@heroicons/react/20/solid"
import { TextField } from "@aws-amplify/ui-react"
import EditBook from "./EditBook"


export default function BookRows() {
    const {bookList, deleteBook} = useContext(AppContext)
    
    const [editBook, setEditBook] = useState('')
    const [searchString, setSearchString] = useState('')
    const [open, setOpen] = useState(false)
    const [showAddBook, setShowAddBook] = useState(false)

    const [newBookList, setNewBookList] = useState(bookList)
    

    useEffect(() => {
      if (editBook){
        setOpen(true)
      }
    }, [editBook])

    const handleSearchString = (e) => {
      setNewBookList(bookList.filter((o) =>o.name.toLowerCase().includes(searchString.toLowerCase())))
      setSearchString(e.target.value)
    }
    
    return(
      <>
      <AddBook book={editBook}/>
      {open ? <EditBook book={editBook}/> : null}
      <TextField
            placeholder="Search book"
            variant="outlined"
            value={searchString}
            onChange={(e) => handleSearchString(e)}
          />
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {newBookList.map((book) =>
          <li key={book.title} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">{book.title}</h3>
                  <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    {book.admin ? "Admin" : "book"}
                  </span>
                </div>
                {book.fines.map(fine => <p className="mt-1 truncate text-sm text-gray-500">{fine.reason} {fine.amount}</p>)}
              </div>
              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300">{book.age}</div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a
                    onClick={setEditBook(book)}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-3">Edit</span>
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    onClick={()=>deleteBook(book)}
                    className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    <TrashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-3">Delete</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
    </>)

  
  }