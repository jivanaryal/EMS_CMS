import React from "react";


const data = [
  {
    title:"Available Position",
    num:"24",
    intro:"4 urgents needed"
  },
  {
    title:"Available Position",
    num:"24",
    intro:"4 urgents needed"
  },
  {
    title:"Available Position",
    num:"24",
    intro:"4 urgents needed"
  },
  {
    title:"Available Position",
    num:"24",
    intro:"4 urgents needed"
  },
  {
    title:"Available Position",
    num:"24",
    intro:"4 urgents needed"
  },
  {
    title:"Available Position",
    num:"24",
    intro:"4 urgents needed"
  },
]

const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-4 place-items-center">
        {data.map((val,i)=>{
          return (
            <div key={i} className="bg-red-500 p-4 rounded-xl"> 
              <div>{val.title}</div>
              <div>{val.num}</div>
              <div>{val.intro}</div>
            </div>
          )
        })}
      </div>
      
    </div>
  )
};

export default Dashboard;
