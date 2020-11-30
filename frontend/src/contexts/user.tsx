import React, {
  Dispatch,
  useContext,
  createContext,
  SetStateAction,
  useState
} from 'react'

import { User } from 'types/api'

export function createCtx<ContextType>() {
  const ctx = createContext<ContextType | undefined>(undefined)
  function useCtx() {
    const c = useContext(ctx)
    if (!c) throw new Error('useCtx must be inside a Provider with a value')
    return c
  }
  return [useCtx, ctx.Provider] as const
}

type UserContextType = {
  userData: User
  setUserData: Dispatch<SetStateAction<User>>
}

const [useUser, CtxProvider] = createCtx<UserContextType>()

type Props = {
  children: React.ReactNode
}

const UserProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState({
    firstName: '',
    surname: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    comments: ''
  })
  return <CtxProvider value={{ userData, setUserData }}>{children}</CtxProvider>
}

export { UserProvider, useUser }
