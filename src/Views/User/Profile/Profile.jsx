import React, { useEffect, useState } from 'react'
import InputFileButton from '../../../components/InputFileButton/InputFileButton'
import ProfileViewModel from './ProfileViewModel'
import { Avatar, Button, Input } from '@chakra-ui/react'
import Popup from '../../../components/Popup/Popup'
import FreelancerProfileMenu from '../../../components/SidebarMenu/Freelancer/FreelancerProfileMenu/FreelancerProfileMenu'
import CompanyProfileMenu from '../../../components/SidebarMenu/Company/CompanyProfileMenu/CompanyProfileMenu'

export default function Profile() {
  const { 
    isLogin, 
    user,
    bannerFile,
    bannerImageSrc,
    profileFile,
    profileImageSrc,
    profileMemberSince,
    profileName,
    profileEmail,
    profileDateOfBirth,
    profileHeadline,
    profileBio,
    profileCity,
    profileCountry,
    profileLastEducation,
    profileCurrentEducation,
    profileFieldOfStudy,
    profileYearofStudy,
    formattedDate,
    setBannerFile,
    setBannerImageSrc,
    setProfileFile,
    setProfileImageSrc,
    setProfileDateOfBirth,
    setProfileHeadline,
    setProfileBio,
    setProfileCity,
    setProfileCountry,
    setProfileLastEducation,
    setProfileCurrentEducation,
    setProfileFieldOfStudy,
    setProfileYearofStudy,
    saveProfile,
    wait,
    setWait,
    popup,
    setPopup,
    popupType,
    popupTitle,
    popupButtonMessage
  } = ProfileViewModel()

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  return (
    <>
      <div className=" h-fit relative flex">
        <Popup 
          wait={wait} 
          popup={popup} 
          setPopup={setPopup} 
          setWait={setWait} 
          popupType={popupType} 
          popupTitle={popupTitle} 
          popupButtonMessage={popupButtonMessage}
        />
        <div className="left w-1/5 ">
          <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem]">
            {
              isLogin && user.role == "Freelancer"
              &&
              <FreelancerProfileMenu />
            }
            {
              isLogin && user.role == "Company"
              &&
              <CompanyProfileMenu />
            }
            
          </div>
        </div>
        <div className="mid w-3/5">
          <div className=" min-h-[calc(100vh-5rem)] h-fit border-l-2 border-navyblue-600 z-0 px-10 py-10">
            <div className='w-full bg-ghostwhite-100 rounded py-6 px-10'>
              <h1 className='font-semibold text-xl'>Personal Information</h1>
              <div 
                className='mt-5 w-full h-64 px-10 bg-stone-300 flex items-center justify-end '
                style={{ backgroundImage: `url(${bannerImageSrc[0]})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <InputFileButton 
                  key={1}
                  index={1}
                  className=" px-4 w-auto bg-ghostwhite-50 hover:bg-ghostwhite-100 rounded"
                  file={bannerFile}
                  setFile={setBannerFile}
                  imageSrcs={bannerImageSrc}
                  setImageSrcs={setBannerImageSrc}
                  showImage={true}
                > 
                  Upload
                </InputFileButton>
              </div>

              <div className='w-full mt-5 px-20'>
                <div className='w-full '>
                  <div className='w-full flex justify-between items-center'>
                    <div className='flex items-center'>
                      <Avatar size="lg" src={profileImageSrc[0]} className='mr-4' border={"1px"} color={"blackAlpha.800"}/>
                      <InputFileButton 
                        key={2}
                        index={2}
                        className=" px-10 bg-ghostwhite-50 hover:bg-ghostwhite-200 rounded"
                        file={profileFile}
                        setFile={setProfileFile}
                        imageSrcs={profileImageSrc}
                        setImageSrcs={setProfileImageSrc}
                        showImage={true}
                      > 
                        Upload
                      </InputFileButton>
                    </div>
                    <div>
                      <p>
                        Member since {profileMemberSince && profileMemberSince.getDate()} {profileMemberSince && monthNames[profileMemberSince.getMonth()]} {profileMemberSince && profileMemberSince.getFullYear()}
                      </p>
                    </div>
                  </div>

                  <div className='mt-5'>
                    <div>
                      Name:
                      <Input 
                        placeholder="Name" 
                        variant={"outline"}
                        defaultValue={profileName} 
                        disabled={true}
                        className='mt-1 border border-gray-800 text-gray-900 block flex-1 min-w-0 w-full text-sm' 
                        backgroundColor={"white"}
                      />
                    </div>

                    <div className='mt-3'>
                      Email:
                      <Input 
                        placeholder="Email" 
                        variant={"outline"}
                        defaultValue={profileEmail} 
                        disabled={true}
                        className='mt-1 border border-gray-800 text-gray-900 block flex-1 min-w-0 w-full text-sm' 
                        backgroundColor={"white"}
                      />
                    </div>

                    {
                      user.role == "Freelancer"
                      &&
                      <div className='mt-3'>
                        Date of Birth*:
                        <input type="date" name="" id="" className='ml-3 py-1 px-2 rounded' 
                          value={(profileDateOfBirth && profileDateOfBirth != null && profileDateOfBirth != "Invalid Date" && formattedDate != "--") ? formattedDate : ""} onChange={(e) => {setProfileDateOfBirth(new Date(e.target.value))}} 
                        />
                      </div>
                    }

                    <div className='mt-3'>
                      Headline*:
                      <Input 
                        placeholder="Headline" 
                        variant={"outline"}
                        defaultValue={profileHeadline} 
                        className='mt-1 border border-gray-800 text-gray-900 block flex-1 min-w-0 w-full text-sm' 
                        backgroundColor={"white"}
                        onChange={(e) => {setProfileHeadline(e.target.value)}}
                      />
                    </div>

                    <div className='mt-3'>
                      Bio:
                      <textarea name="" id="" placeholder='About me' className='w-full h-40 py-2 px-3 resize-none rounded-md' defaultValue={profileBio} onChange={(e) => {setProfileBio(e.target.value)}}>
                        
                      </textarea>
                    </div>

                    <div className='mt-3'>
                      City:
                      <Input 
                        placeholder="City" 
                        variant={"outline"}
                        defaultValue={profileCity} 
                        className='mt-1 border border-gray-800 text-gray-900 block flex-1 min-w-0 w-full text-sm' 
                        backgroundColor={"white"}
                        onChange={(e) => {setProfileCity(e.target.value)}}
                      />
                    </div>

                    <div className='mt-3'>
                      Country:
                      <Input 
                        placeholder="Country" 
                        variant={"outline"}
                        defaultValue={profileCountry} 
                        className='mt-1 border border-gray-800 text-gray-900 block flex-1 min-w-0 w-full text-sm' 
                        backgroundColor={"white"}
                        onChange={(e) => {setProfileCountry(e.target.value)}}
                      />
                    </div>
                  </div>

                </div>

              </div>

              {
                user.role == "Freelancer"
                &&
                <div className='w-full mt-10'>
                  <h1 className='font-semibold text-xl'>Education</h1>

                  <div className='w-full mt-4 pl-8 pr-20'>
                    <div className='mt-3'>
                      Last Education:
                      <Input 
                        placeholder="Last Education" 
                        variant={"outline"}
                        defaultValue={profileLastEducation} 
                        className='mt-1 border border-gray-800 text-gray-900 block flex-1 min-w-0 w-full text-sm' 
                        backgroundColor={"white"}
                        onChange={(e) => {setProfileLastEducation(e.target.value)}}
                      />
                    </div>
                  </div>

                  <div className='w-full mt-4 pl-8 pr-20'>
                    <div className='mt-3'>
                      Current Education:
                      <Input 
                        placeholder="Current Education" 
                        variant={"outline"}
                        defaultValue={profileCurrentEducation}
                        className='mt-1 border border-gray-800 text-gray-900 block flex-1 min-w-0 w-full text-sm' 
                        backgroundColor={"white"}
                        onChange={(e) => {setProfileCurrentEducation(e.target.value)}}
                      />
                    </div>
                  </div>

                  <div className='w-full mt-4 pl-8 pr-20'>
                    <div className='mt-3'>
                      Field of Study:
                      <Input 
                        placeholder="Field of Study" 
                        variant={"outline"}
                        defaultValue={profileFieldOfStudy} 
                        className='mt-1 border border-gray-800 text-gray-900 block flex-1 min-w-0 w-full text-sm' 
                        backgroundColor={"white"}
                        onChange={(e) => {setProfileFieldOfStudy(e.target.value)}}
                      />
                    </div>
                  </div>

                  <div className='w-full mt-4 pl-8 pr-20'>
                    <div className='mt-3'>
                      Year of Study:
                      <Input 
                        type='number'
                        min={0}
                        placeholder="Year of Study" 
                        variant={"outline"}
                        defaultValue={profileYearofStudy}
                        className='mt-1 border border-gray-800 text-gray-900 block flex-1 min-w-0 w-full text-sm' 
                        backgroundColor={"white"}
                        onChange={(e) => {setProfileYearofStudy(e.target.value)}}
                      />
                    </div>
                  </div>
                </div>
              }

              <div className='w-full flex justify-end items-center mt-8'>
                <Button 
                  variant={"solid"}
                  color={"ghostwhite.50"}
                  bgColor={"navyblue.800"}
                  _hover={{ bg: "navyblue.700" }}
                  transitionDuration={"300ms"}
                  paddingX={"2rem"}
                  paddingY={"1.5rem"}
                  fontSize={"lg"}
                  onClick={() => {saveProfile()}}
                >
                  Save
                </Button>
              </div>

            </div>
          </div>
        </div>
        <div className="right w-1/5">
          
        </div>
      </div>
    </>
  )
}
