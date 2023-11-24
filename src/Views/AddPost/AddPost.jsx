import React, { useEffect, useState } from 'react'
import MenuLogin from "../../components/SidebarMenu/MenuLogin/MenuLogin";
import NowHiring from '../../components/NowHiring/NowHiring'
import { Avatar } from '@chakra-ui/react';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import InputFileButton from '../../components/InputFileButton/InputFileButton';
import { FaPaperclip } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

export default function AddPost() {
  const user = useSelector((state) => state.user.userDetail)

  const [text, setText] = useState('');
  const [file, setFile] = useState([]);
  const [imageSrcs, setImageSrcs] = useState([]);

  const handleChange = (event) => {
    const inputText = event.target.value;
    // Remove extra spaces and count words
    const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;

    // Limit to 1000 words
    if (wordCount <= 1000) {
      setText(inputText);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  return (
    <>
      <div className=" h-fit relative flex">
        <div className="left w-1/5 ">
          <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem]">
            <MenuLogin />
          </div>
        </div>
        <div className="mid w-3/4">
          <div className=" min-h-[calc(100vh-5rem)] h-fit border-l-2 border-navyblue-600 z-0 px-10 py-10">
            <h1 className='font-bold text-3xl'>New Post</h1>
            <div className='w-full bg-ghostwhite-100 mt-5 p-7 rounded shadow-lg'>
              <div className='w-full flex items-center'>
                <Avatar bg="ghostwhite.400" size={"lg"}/>
                <div className=' ml-5'>
                  <h1 className='font-semibold text-xl'>{user.name}</h1>
                  <h2>Ini Headline</h2>
                </div>


              </div>

              <div className='mt-5'>
                <Textarea
                  placeholder="Description…"
                  value={text}
                  onChange={handleChange}
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
                  <InputFileButton file={file} setFile={setFile} imageSrcs={imageSrcs} setImageSrcs={setImageSrcs} multiple={true} showImage={true} >
                    <FaPaperclip className='text-ghostwhite-50 w-full h-full -rotate-[44deg]' />
                  </InputFileButton>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="right w-1/4">
          <NowHiring />
        </div>
      </div>
      
    </>
  )
}
