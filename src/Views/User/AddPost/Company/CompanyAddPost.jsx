import React, { useEffect, useState } from 'react'
import { Avatar, Button } from '@chakra-ui/react';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import InputFileButton from '../../../../components/InputFileButton/InputFileButton';
import { FaPaperclip } from 'react-icons/fa6';
import { Combobox } from '../../../../components/ui/Combobox';
import CompanyAddPostViewModel from './CompanyAddPostViewModel';
import Popup from '../../../../components/Popup/Popup';

export default function CompanyAddPost() {
  const {
    projectName,
    text,
    category,
    file,
    setFile,
    imageSrcs,
    hashtag,
    minPrice,
    maxPrice,
    duration,
    durationType,
    setProjectName,
    setImageSrcs,
    setMinPrice,
    setMaxPrice,
    setDuration,
    setDurationType,
    descChange,
    user,
    addHashtag,
    hashtagChange,
    submit,
    wait,
    popup,
    popupTitle,
    popupButtonMessage,
    popupType,
    setWait,
    setPopup,
  } = CompanyAddPostViewModel()

  return (
    <>
      <Popup 
        wait={wait} 
        popup={popup} 
        setPopup={setPopup} 
        setWait={setWait} 
        popupType={popupType} 
        popupTitle={popupTitle} 
        popupButtonMessage={popupButtonMessage}
        className={"fixed top-0 left-0"}
      />

      <div className='w-full flex items-center'>
        <Avatar bg="ghostwhite.400" size={"lg"}/>
        <div className=' ml-5'>
          <h1 className='font-semibold text-xl'>{user.name}</h1>
        </div>
      </div>

      <div className='mt-5 flex items-center'>
        <p className='text-lg'>Name of the project: </p>
        <input type="text" placeholder='Name of the project' defaultValue={projectName} className='ml-3 w-[40%] h-9 px-3 border-2 border-navyblue-800 rounded-md' onChange={(e) => {setProjectName(e.target.value)}}/>
      </div>

      <div className='mt-5'>
        <Textarea
          placeholder="Description…"
          value={text}
          onChange={descChange}
          minRows={10}
          maxRows={10}
          style={{ width: '100%', minHeight: '100px' }}
          endDecorator={
            <div className='w-full px-3 py-2'>
              <Typography variant="body-xs" sx={{ ml: "auto", color: text.length > 1000 ? 'red' : 'inherit', textAlign: "right" }}>
                {text.trim().split(/\s+/).filter(Boolean).length} / 1000
              </Typography>
              <div className='w-full flex flex-wrap items-center'>
                {imageSrcs.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Uploaded File ${index + 1}`}
                    className="w-auto h-64 mt-2 object-cover rounded-md mr-2"
                    draggable="false"
                  />
                ))}
              </div>

            </div>
          }
        />
        
        <div className=' mt-5'>
          <InputFileButton className=" p-2 bg-navyblue-800 hover:bg-navyblue-700 rounded-full " file={file} setFile={setFile} imageSrcs={imageSrcs} setImageSrcs={setImageSrcs} multipleInput={true} showImage={true} multipleImage={true}>
            <FaPaperclip className='text-ghostwhite-50 w-full h-full -rotate-[44deg]' />
          </InputFileButton>
        </div>
        
        <div className='mt-5 relative'>
          <h1 className='font-semibold text-xl'>
            Hashtag <span className='font-bold'>(max. 3)</span> 
          </h1>
          <div className=' mt-2 flex items-baseline'>
            {
              hashtag.map((item, index) => {

                return (
                  <Combobox 
                    key={index}
                    title={`Select Hashtag ${index+1}`}
                    placeholder={"Search Hashtag"}
                    empty={"No Hashtag"}
                    items={category}
                    headerClassName={"w-auto px-6 h-10 mr-2 rounded-full border-2 border-navyblue-800 bg-transparent text-navyblue-800"}
                    contentClassName={""}
                    onSelect={(value) => {hashtagChange(value, index)}}
                  />
                )
              })
            }
            {
              hashtag.length < 3
              &&
              <Button
                variant={"outline"}
                borderColor={"navyblue.800"}
                borderWidth={2}
                rounded={"full"}
                margin={0}
                onClick={() => {addHashtag()}}
              >
                + Add a hashtag
              </Button>
            }
          </div>
        </div>
        

        <div className='mt-5 flex items-baseline h-22'>
          <h1 className='font-semibold text-xl'>Starting rate Rp</h1>
          <div className=' ml-4'>
            <div className='flex'>
              <input type="number" placeholder='Min' min={50000} className='mr-4 w-40 h-10 px-3 border-2 border-navyblue-800 rounded-md' onChange={(e) => {setMinPrice(parseInt(e.target.value) || 0)}}/>
              <h1 className='font-semibold text-xl'> - </h1>
              <input type="number" placeholder='Max' min={minPrice} className='ml-4 w-40 h-10 px-3 border-2 border-navyblue-800 rounded-md' onChange={(e) => {setMaxPrice(parseInt(e.target.value) || 0)}}/>

            </div>
            <div>
            {
                minPrice >= maxPrice
                &&
                <p className='text-red-600'>Min Price cannot be greater than Max Price</p>
              }
              {
                minPrice < 50000
                &&
                <p className='text-red-600'>Min Price cannot be less than 50000</p>
              }
            </div>
          </div>
        </div>

        <div className='mt-3 flex items-center'>
          <h1 className='font-semibold text-xl'>Duration</h1>
          <input type="number" defaultValue={duration} placeholder={durationType} className='ml-3 w-24 h-9 px-3 border-2 border-navyblue-800 rounded-md' onChange={(e) => {setDuration(e.target.value)}}/>
          <select className='ml-3 h-9 px-3 border-2 border-navyblue-800 rounded-md' onChange={(e) => {setDurationType(e.target.value)}}>
            <option value="Days">Days</option>
            <option value="Weeks">Weeks</option>
            <option value="Months">Months</option>
          </select>
          <div>
          </div>
        </div>

        <div className='mt-3 flex justify-end'>
          <Button
            variant={"solid"}
            color={"ghostwhite.50"}
            bgColor={"navyblue.800"}
            _hover={{ bg: "navyblue.700" }}
            transitionDuration={"300ms"}
            rounded={"full"}
            paddingX={"2.25rem"}
            fontSize={"lg"}
            onClick={() => {submit()}}
          >
            Post
          </Button>
        </div>
      </div>
    </>
  );
}
