// ** Next
import { NextPage } from 'next'
import { ReactNode } from 'react'

// ** View
import BlankLayout from 'src/views/layouts/BlankLayout'
import RegisterPage from 'src/views/pages/register'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <RegisterPage />
}
export default Index

Index.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
