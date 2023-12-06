import React, { useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
} from '@chakra-ui/react'
import fetch from '../../../../Client/fetch';

export default function WorkBox({file, user, activity, setActivity}) {
  // console.log(file)

  function downloadHandler(url, time) {
    const filename = time;

    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        // Create a blob URL for the file
        const blobUrl = URL.createObjectURL(blob);

        // Create an anchor tag
        const aTag = document.createElement("a");
        aTag.href = blobUrl;
        aTag.setAttribute("download", filename);

        // Append the anchor tag to the body
        document.body.appendChild(aTag);

        // Simulate a click to trigger the download
        aTag.click();

        // Remove the anchor tag from the body
        document.body.removeChild(aTag);

        // Revoke the blob URL to free up resources
        URL.revokeObjectURL(blobUrl);
      })
      .catch(error => {
          console.error("Error downloading file:", error);
      });
  }

  const newTime = new Date(file.time)
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  
  const formattedDate = newTime.toLocaleString(undefined, options);
  
  const time = formattedDate.replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/, "$3/$2/$1 $4:$5:$6");

  const { acceptFile, rejectFile } = fetch()

  const [comment, setComment] = useState("")
  const [err, setErr] = useState("")

  async function acceptHandler(){
    if(comment == ""){
      setErr("Please write your comments")
      return
    }

    const response = await acceptFile(activity._id, file._id, comment, setActivity)
  }

  async function rejectHandler(){
    if(comment == ""){
      setErr("Please write your comments")
      return
    }

    const response = await rejectFile(activity._id, file._id, comment, setActivity)
  }
  
  return (
    <>
      <Accordion allowToggle className='mb-3 bg-ghostwhite-100 rounded' >
        <AccordionItem border={"none"}>
          <div className='w-full flex items-center justify-between h-14'>
            <div className='flex h-full items-center ml-5'>
              <p className='mr-2'>
                {time}
              </p>
              {
                file.status == 0 && user?.role == "Freelancer"
                &&
                <div className=' border border-yellow-600 text-yellow-600 hover:bg-ghostwhite-50/80 transition-colors duration-300 px-8 rounded-full'>
                  Waiting for Review
                </div>
              }
              {
                file.status == 1
                &&
                <div className=' border border-green-600 text-green-600 hover:bg-ghostwhite-50/80 transition-colors duration-300 px-8 rounded-full'>
                  Accepted
                </div>
              }
              {
                file.status == -1
                &&
                <div className=' border border-red-600 text-red-600 hover:bg-ghostwhite-50/80 transition-colors duration-300 px-8 rounded-full'>
                  Rejected
                </div>
              }
              {
                user?.role == "Company" && file.status == 0
                &&
                <>
                  <Button
                    color="ghostwhite.50"
                    bg="green.500"
                    _hover={{ bg: "green.600", shadow: "lg" }}
                    _active={{ bg: "green.700" }}
                    paddingX={"2rem"}
                    height={"2.25rem"}
                    transitionDuration={"300ms"}
                    shadow={"md"}
                    marginRight={"0.5rem"}
                    onClick={() => {acceptHandler()}}
                  >
                    Accept
                  </Button>
                  <Button
                    color="ghostwhite.50"
                    bg="red.500"
                    _hover={{ bg: "red.600", shadow: "lg" }}
                    _active={{ bg: "red.700" }}
                    paddingX={"2rem"}
                    height={"2.25rem"}
                    transitionDuration={"300ms"}
                    shadow={"md"}
                    marginRight={"0.5rem"}
                    onClick={() => {rejectHandler()}}
                  >
                    Reject
                  </Button>
                  <span className='text-red-500'>{err}</span>
                </>
              }
            </div>
            <div className='flex h-full items-center'>
              <Button
                color="ghostwhite.50"
                bg="navyblue.800"
                _hover={{ bg: "navyblue.700", shadow: "lg" }}
                _active={{ bg: "navyblue.600" }}
                transitionDuration={"300ms"}
                shadow={"md"}
                paddingX={"2rem"}
                height={"2.25rem"}
                marginRight={"0.5rem"}
                onClick={() => {downloadHandler(file.name, time)}}
              >
                Download
              </Button>
              <AccordionButton width={"fit-content"} height={"full"}>
                <AccordionIcon />
              </AccordionButton>

            </div>
          </div>

          <AccordionPanel pb={4}>
            <h2 className='font-semibold'>Review comments:</h2>
            {
              user?.role == "Company" && file.status == 0
              &&
              <textarea className='w-full h-24 border border-gray-300 rounded-md p-2' placeholder='Write your comments here...' onChange={(e) => {setComment(e.target.value)}}></textarea>
            }
            {
              file.status != 0
              &&
              <div className=' whitespace-pre-line'>
                {
                  file?.comment
                }
              </div>

            }
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  )
}
