import React, { useState } from 'react'
import { Avatar } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa6";

export default function ProfileBox({profile, post}) {
  const [content, setContent] = useState("Description")

  const member = new Date(profile?.create_at)
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const displayFormattedText = () => {
    // Replace newline characters with HTML line break tags
    const formattedText = profile.bio.replace(/\n/g, '<br>');
    return { __html: formattedText };
  };



  return (
    <div className="w-full max-h-full bg-lightblue-100 rounded mt-5 relative">
      <div className="absolute top-0 w-full h-36 rounded-t bg-stone-300" style={{ backgroundImage: `url('${profile.header_picture}')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
      </div>

      <div className="pt-10 pb-5">
        <div className="w-full px-8">
          <Avatar size="2xl" src={profile.profile_picture} className='mr-4' border={"1px"} color={"blackAlpha.800"}/>
        </div>
        
        <div className="w-full px-8 mt-5">
          <h1 className="font-bold text-3xl">{profile.name}</h1>
          <p className="text-md">{profile.headline}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {profile?.country} &#x2022; <FaStar className="ml-2 text-yellow-500" /> {profile?.rating}
            </div>
            <div>
              Member since {monthNames[member?.getMonth()]} {member?.getFullYear()}
            </div>

          </div>
        </div>

      </div>
      
      <hr className=" border-navyblue-800" />

      <div className="w-full flex items-center h-12">
        <button 
          className={`w-[50%] h-full flex items-center justify-center font-semibold text-lg border-b-[3px] ${content == "Description" && "border-navyblue-800"} ${content != "Description" && "border-lightblue-100 hover:border-ghostwhite-200"} hover:bg-ghostwhite-200 transition-colors duration-300`}
          onClick={() => {setContent("Description")}}
        >
          Description
        </button>

        <button 
          className={`w-[50%] h-full flex items-center justify-center font-semibold text-lg border-b-[3px] ${content == "Posts" && "border-navyblue-800"} ${content != "Posts" && "border-lightblue-100 hover:border-ghostwhite-200"} hover:bg-ghostwhite-200 transition-colors duration-300`}
          onClick={() => {setContent("Posts")}}
        >
          Posts
        </button>
      </div>

      <div className="px-7 py-7 max-h-[calc(100vh-35rem)] min-h-fit overflow-y-auto">
        {
          content == "Description"
          &&
          <div dangerouslySetInnerHTML={displayFormattedText()} />
        }
        {
          content == "Posts"
          &&
          <div className=''>
            
          </div>
        }
      </div>
    </div>
  )
}
