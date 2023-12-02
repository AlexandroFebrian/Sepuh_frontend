import React, { useState } from 'react'
import { Avatar, Button } from "@chakra-ui/react";
import { FaStar, FaRegUser } from "react-icons/fa6";
import ContentBox from '../../../components/ContentBox/CompanyContentBox/CompanyContentBox';
import { Link } from 'react-router-dom';

export default function ProfileBox({profile, posts}) {
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
          <div className='w-full flex justify-between items-center'>
            <h1 className="font-bold text-3xl">{profile.name} &#x2022; {profile.role}</h1>
            <div>
              <Link className='mr-2'>
                <Button
                  variant={"outline"}
                  borderColor={"navyblue.800"}
                  color={"navyblue.800"}
                >
                  Message
                </Button>
              </Link>

              <Link>
                <Button
                  color={"white"}
                  bg={"navyblue.800"}
                  _hover={{ bg: "navyblue.700" }}
                  _active={{ bg: "navyblue.600" }}
                >
                  Apply
                </Button>
              </Link>
            </div>
          </div>
          <p className="text-md">{profile.headline}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {profile?.country} &#x2022; <FaStar className="ml-2 text-yellow-500" /> {profile?.rating}
            </div>
            <div className='flex items-center'>
              <FaRegUser /> &nbsp; Member since {monthNames[member?.getMonth()]} {member?.getFullYear()}
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
          <div className='w-full h-fit bg-ghostwhite-50 rounded px-4 py-4' dangerouslySetInnerHTML={displayFormattedText()} />
        }
        {
          content == "Posts"
          &&
          posts.map((post, idx) => {
            return <ContentBox item={post} key={idx} />
          })
        }
      </div>
    </div>
  )
}
