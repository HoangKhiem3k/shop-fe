import axios from 'axios'
import { BASE_URL, CONFIG_API } from 'src/configs/api'
import { clearLocalUserData, getLocalUserData } from '../storage'
import { jwtDecode } from 'jwt-decode'
import { FC } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { UserDataType } from 'src/contexts/types'
import { useAuth } from 'src/hooks/useAuth'

type TAxiosInterceptor = {
  children: React.ReactNode
}

const handleRedirectLogin = (router: NextRouter, setUser: (data: UserDataType | null) => void) => {
  if (router.asPath !== '/') {
    router.replace({
      pathname: '/login',
      query: { returnUrl: router.asPath }
    })
  } else {
    router.replace('/login')
  }
  setUser(null)
  clearLocalUserData()
}

const instanceAxios = axios.create({ baseURL: BASE_URL })

const AxiosInterceptor: FC<TAxiosInterceptor> = ({ children }) => {
  const router = useRouter()
  const { setUser } = useAuth()

  instanceAxios.interceptors.request.use(async config => {
    const { accessToken, refreshToken } = getLocalUserData()
    if (accessToken) {
      const decodeAccessToken: any = jwtDecode(accessToken)
      if (decodeAccessToken?.exp > Date.now() / 1000) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      } else {
        if (refreshToken) {
          const deoodeRefreshToken: any = jwtDecode(refreshToken)
          if (deoodeRefreshToken?.exp > Date.now() / 1000) {
            await axios
              .post(
                `${CONFIG_API.AUTH.INDEX}/refresh-token`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${refreshToken}`
                  }
                }
              )
              .then(res => {
                const newAccessToken = res?.data?.data?.access_token
                if (newAccessToken) {
                  config.headers['Authorization'] = `Bearer ${newAccessToken}`
                } else {
                  handleRedirectLogin(router, setUser)
                }
              })
              .catch(e => {
                handleRedirectLogin(router, setUser)
              })
          } else {
            handleRedirectLogin(router, setUser)
          }
        } else {
          handleRedirectLogin(router, setUser)
        }
      }
    } else {
      handleRedirectLogin(router, setUser)
    }

    return config
  })

  instanceAxios.interceptors.response.use(response => {
    return response
  })

  return <>{children}</>
}
export default instanceAxios
export { AxiosInterceptor }
