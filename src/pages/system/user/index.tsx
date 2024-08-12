// ** Import Next
import { NextPage } from 'next'

// ** views

import { PERMISSIONS } from 'src/configs/permission'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <h1>User</h1>
}

Index.permission = [PERMISSIONS.SYSTEM.USER.VIEW]
export default Index
