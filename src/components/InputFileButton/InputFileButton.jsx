import * as React from 'react';

export default function InputFileButton({className, children, file, setFile, imageSrcs, setImageSrcs, multiple, showImage}) {

  const handleFileChange = (event) => {
    const files = event.target.files;
    setFile([...file, ...files]);

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

    Promise.all(imagePromises).then((srcs) => {
      setImageSrcs([...imageSrcs, ...srcs]);
    });
  };

  return (
    <>
      <div className={`w-10 h-10 ${className}`}>
        <label htmlFor="coba" >
          <div className={`w-10 h-10 p-[0.6rem] bg-navyblue-800 hover:bg-navyblue-700 transition-colors duration-300 cursor-pointer rounded-full flex justify-center items-center ${className}`}>
            {children}
          </div>
        </label>

      </div>
      <input type="file" id="coba" className='hidden' onChange={handleFileChange} multiple={multiple || false} />
    </>
  );
}