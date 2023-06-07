import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const obj = [
  {
    path:"/department/addDept",
    name:"add department"
  },
  {
    path:"/department/manageDept",
    name:"manage department",
  }
]

const DeptLayout = () => {

  const location = useLocation();

  console.log(location.pathname)
  return (
    <div>
    <div className='flex  w-full justify-center'>
       {/* <Link to="addDept"> <button
        
            className="border-2 text-xl px-3   bg-[#0072C6] text-white py-2 rounded-xl mr-10">
            Add Department
          </button>
          </Link>
        <Link to="manageDept">  <button
           
            className="border-2  text-xl  px-2 mr-10   bg-[#0072C6] text-white py-2 rounded-xl">
            Manage Department
          </button>
          </Link> */}
            {obj.map((val,i)=>{
      return (
        <Link to={val.path} className={`border-2 text-xl px-3 capitalize   py-2 rounded-xl mr-10 ${location.pathname===val.path ? 'bg-green-500':'bg-white text-black'} transition-all delay-75 duration-200`}>{val.name}</Link>
      )
     })}
    </div>

   
          <div><Outlet /></div>
    </div>
  )
}

export default DeptLayout