'use client'
import Head from 'next/head'
import { ReactNode } from 'react'
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import CustomPagination from 'src/components/custom-pagination'

export default function Home() {
  return (
    <>
      <Head>
        <title>Shop</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <CustomPagination
        page={1}
        pageSize={5}
        rowLength={200}
        pageSizeOptions={[5, 10, 20, 30]}
        onChangePagination={() => {}}
      />
    </>
  )
}

Home.getLayout = (page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>
Home.guestGuard = false
Home.authGuard = false
