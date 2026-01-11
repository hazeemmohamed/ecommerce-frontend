import { Navigate, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import auth from "../config/firebase"
import React from "react"

const ADMIN_UID = "xP1OPGz6cvOIInLm4ynomBiRyBi2"

const AdminRoute = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsub()
  }, [])

  if (loading) return null // or spinner

  if (!user) return <Navigate to="/" />
  if (user.uid !== ADMIN_UID) return <Navigate to="/" />

  return <Outlet />
}

export default AdminRoute
