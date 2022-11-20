import AppContext from "@/AppContext"
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Footer } from "@/components/Footer";
import { Header } from '@/components/Header'
import Head from 'next/head'
import BookRows from "@/components/book/BookRows";


export default function Books() {
  const {currentInfo} = useContext(AppContext)
  const router = useRouter()


    return (
        <>
        <Head>
          <title>Books - Library Management App</title>
          <meta
            name="description"
            content="The best online library around!"
          />
        </Head>
        <Header />
        <div className="container mx-auto flex flex-col justify-center w-10/12 items-center">
            <div className="p-4 max-w-md min-w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="flex mb-4 text-xl font-bold leading-none text-slate-600 dark:text-white">Books</h5>

            </div>
            {setOpen ? <EditUser user={editUser}/> : null}
            
              <BookRows />
        </div>
        <Footer />
        </>
    )
}