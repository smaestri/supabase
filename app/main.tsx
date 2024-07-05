"use client"
import { useUserContext } from "./AuthProvider";

export default function Home() {
  const { userConnected }: any = useUserContext();
  console.log('userConnected in home', userConnected)
  if (!userConnected) {
    return <div>Please login</div>
  }
  return <div>Bienvenue</div>

}
