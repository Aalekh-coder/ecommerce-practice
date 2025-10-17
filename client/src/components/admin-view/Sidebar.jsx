import { ChartNoAxesCombined } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'




const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div className="flex items-center gap-2"  onClick={()=>navigate("/admin/dashboard")}>
          <ChartNoAxesCombined size='30'/>
          <h1  className='text-xl font-extrabold'>Admin Panel</h1>
        </div>
      </aside>
    </>
  )
}

export default Sidebar