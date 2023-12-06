import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
} from '@chakra-ui/react'

export default function WorkBox({file}) {
  console.log(file)

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
                file.status == 0
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  )
}
