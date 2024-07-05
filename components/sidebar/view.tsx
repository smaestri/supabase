"use client"
import { useUserContext } from "@/app/AuthProvider";
import Link from "next/link";

export default function SideBar({categories} : {categories: any}) {
  const {userConnected} : any = useUserContext();
  if(!userConnected) {
    return <div>Please login</div>
  }
  const renderCategories = categories.map((cat: any) => {
    return (
      <div key={cat.id}>
        <Link href={{ pathname: `/list-books`, query: { categoryId: cat.id } }} >
          {cat.name}
          {/* (<Counter categoryId={cat.id} />) */}
        </Link></div>)
  })
  return (<div className="flex flex-col">
    {renderCategories}
  </div>
  )
}
