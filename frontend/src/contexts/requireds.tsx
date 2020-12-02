import React, {
  Dispatch,
  useContext,
  createContext,
  SetStateAction,
  useState
} from 'react'

import { Requireds } from 'types/api'

export function createCtx<ContextType>() {
  const ctx = createContext<ContextType | undefined>(undefined)
  function useCtx() {
    const c = useContext(ctx)
    if (!c) throw new Error('useCtx must be inside a Provider with a value')
    return c
  }
  return [useCtx, ctx.Provider] as const
}

type RequiredsContextType = {
  requireds: Requireds
  setRequireds: Dispatch<SetStateAction<Requireds>>
}

const [useRequireds, CtxProvider] = createCtx<RequiredsContextType>()

type Props = {
  children: React.ReactNode
}

const RequiredsProvider = ({ children }: Props) => {
  const [requireds, setRequireds] = useState({
    firstName: 0,
    surname: 0,
    email: 0,
    phone: 0,
    gender: 0,
    dateOfBirth: 0,
    comments: 0
  })
  return (
    <CtxProvider value={{ requireds, setRequireds }}>{children}</CtxProvider>
  )
}

export { RequiredsProvider, useRequireds }
