"use client"

import {
   createContext, useContext, useState, ReactNode
} from "react"

interface ZoomSessionContextType {
   sessionId: string | null
   sessionName: string
   sessionKey: string
   setSessionId: (id: string | null) => void
}

const ZoomSessionContext = createContext<ZoomSessionContextType | null>(null)

export function ZoomSessionProvider ({
   sessionName, sessionKey, children
}: { sessionName: string, sessionKey: string, children: ReactNode }) {
   const [sessionId, setSessionId] = useState<string | null>(null)

   return (
      <ZoomSessionContext.Provider
         value={{
            sessionId,
            sessionName,
            sessionKey,
            setSessionId,
         }}
      >
         {children}
      </ZoomSessionContext.Provider>
   )
}

export const useZoomSession = () => {
   const context = useContext(ZoomSessionContext)

   console.log("context", context)

   if (!context) {
      throw new Error("useZoomSession must be used within a ZoomSessionProvider")
   }

   return context
}