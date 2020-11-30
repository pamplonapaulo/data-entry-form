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
    firstName: true,
    surname: true,
    email: true,
    phone: true,
    gender: true,
    dateOfBirth: true
  })
  return (
    <CtxProvider value={{ requireds, setRequireds }}>{children}</CtxProvider>
  )
}

export { RequiredsProvider, useRequireds }
