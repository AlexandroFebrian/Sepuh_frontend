import React, { useEffect, useState } from 'react'
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import InputFileButton from '../../components/InputFileButton/InputFileButton';
import { FaPaperclip } from 'react-icons/fa6';

export default function Freelancer() {
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

  return (
    <div className='w-full'>
      <Textarea
        placeholder="Type in here…"
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
  );
}

