import * as React from 'react';

export default function InputFileButton({className, index, children, file, setFile, imageSrcs, setImageSrcs, multipleInput, showImage, multipleImage}) {

  const handleFileChange = (event) => {
    console.log(index)
    const files = event.target.files;
    if(multipleImage){
      setFile([...file, ...files]);

    }else{
      setFile([...files]);
    }

    if(!showImage) return;

    // Read and display images
    const imagePromises = Array.from(files).map(file => {
      
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    });

    if(multipleImage){
      Promise.all(imagePromises).then((srcs) => {
        setImageSrcs([...imageSrcs, ...srcs]);
      });
    }else{
      Promise.all(imagePromises).then((srcs) => {
        setImageSrcs([...srcs]);
      });
    }
  };

  return (
    <>
      <div className={`w-fit h-fit`}>
        <label htmlFor={`custom${index}`} >
          <div className={`w-10 h-10 transition-colors duration-300 cursor-pointer flex justify-center items-center ${className}`}>
            {children}
          </div>
        </label>

      </div>
      <input type="file" id={`custom${index}`} className='hidden' onChange={handleFileChange} multiple={multipleInput || false} />
    </>
  );
}