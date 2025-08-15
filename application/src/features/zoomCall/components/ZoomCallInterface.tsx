"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import uiToolkit, { SuspensionViewValue } from "@zoom/videosdk-ui-toolkit"
import "@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css";
import { useZoomSession } from "../contexts/ZoomSessionContext"
import { getZoomTokenAction } from "../actions/ZoomSessionActions"



export default function ZoomCallInterface ({
   username, setIsLoading,
   allowScreenShare = false,
   className = ""
}: {
   username: string
   setIsLoading: (isLoading: boolean) => void
   allowScreenShare?: boolean
   className?: string
}) {
   const containerRef = useRef<HTMLDivElement>(null)
   const sessionJoinedRef = useRef(false)
   const {
      setSessionId, sessionName, sessionKey
   } = useZoomSession()
   const isHost = useSearchParams()
      .get("ishost") === "true"

   useEffect(() => {
      const initiZoom = async () => {
         if (!username) {
            return
         }

         const {
            errorMessage, token
         } = await getZoomTokenAction(sessionName, username, sessionKey, isHost ? "host" : "participant")
         if (errorMessage) {
            console.error("Error getting zoom token", errorMessage)
            toast.error(errorMessage)
            return
         }

         if (!token) {
            console.error("Error getting zoom token", token)
            toast.error("Error getting zoom token")
            return
         }

         if (!containerRef.current) {
            console.error("No container found")
            return
         }

         uiToolkit.joinSession(containerRef.current, {
            sessionName,
            userName: username,
            sessionIdleTimeoutMins: 60 * 6, // 6 hours
            videoSDKJWT: token,
            language: "es-MX",
            featuresOptions: {
               virtualBackground: {
                  enable: true,
                  allowVirtualBackgroundUpload: true,
               },
               caption: {
                  enable: false
               },
               invite: {
                  enable: false
               },
               theme: {
                  enable: true,
                  defaultTheme: "light"
               },
               phone: {
                  enable: false
               },
               subsession: {
                  enable: false
               },
               feedback: {
                  enable: false
               },
               settings: {
                  enable: isHost
               },
               troubleshoot: {
                  enable: false
               },
               header: {
                  enable: false
               },
               viewMode: {
                  enable: true,
                  defaultViewMode: "gallery" as SuspensionViewValue,
                  viewModes: ["minimized", "speaker", "gallery"] as SuspensionViewValue[],
               },
               audio: {
                  enable: true,
                  backgroundNoiseSuppression: true,
               },
               leave: {
                  enable: false
               },
               share: {
                  enable: allowScreenShare,
               },
               chat: {
                  enable: false,
                  enableEmoji: false
               }
            }
         })

         uiToolkit.onSessionJoined(async () => {
            console.log("Session joined")
            // Store the session ID in context
            const sessionInfo = uiToolkit.getSessionInfo()
            if (sessionInfo?.sessionId) {
               setSessionId(sessionInfo.sessionId)
            }
         })

         uiToolkit.onSessionClosed(() => {
            setSessionId(null)
            console.log("Session closed")
         })

         // Mark session as successfully joined.
         sessionJoinedRef.current = true
         setIsLoading(false)
      }

      initiZoom()

      const handleBeforeUnload = () => {
         uiToolkit.leaveSession()
      }
      window.addEventListener('beforeunload', handleBeforeUnload)

      return () => {
         window.removeEventListener('beforeunload', handleBeforeUnload)
         // if (sessionJoinedRef.current) {
         //    setSessionId(null) // Clear sessionId on unmount
         //    uiToolkit.leaveSession()
         // }
      }
   }, [username, sessionKey, sessionName, setSessionId, isHost, setIsLoading, allowScreenShare])

   return (
      <div ref={containerRef}
         id="sessionContainer"
         className={`!rounded-3xl !aspect-video ${className}`}
      />
   )
}