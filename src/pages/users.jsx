import UserRows from "@/components/user/UserRows"
import AppContext from "../AppContext"
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Footer } from "@/components/Footer";
import { Header } from '@/components/Header'
import Head from 'next/head'
import AddUser from "@/components/user/AddUser";


export default function Users() {
  const {currentInfo} = useContext(AppContext)
  const router = useRouter()


  useEffect(() => {
    if (currentInfo.admin != true){
      router.push('/')
    }
  }, []);

    return (
        <>
        <Head>
          <title>Users - Library Management App</title>
          <meta
            name="description"
            content="The best online library around!"
          />
        </Head>
        <Header />
        <div className="container mx-auto flex flex-col justify-center w-10/12 items-center">
            <div className="p-4 max-w-md min-w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                  <h5 className=" flex text-xl font-bold leading-none text-slate-600 dark:text-white">Users</h5>
                  <AddUser/>
              </div>
              {/* <AddButton type={t('Ontology')} currentObject={currentDisplay} /> */}
                <div className="flow-root">
                <UserRows />
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}