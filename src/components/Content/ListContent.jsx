import React, { useEffect, useState } from 'react'
import NowHiring from '../NowHiring/NowHiring'
import { Combobox } from '../ui/Combobox'
import ContentViewModel from './ContentViewModel'
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListContentViewModel from './ListContentViewModel';
import ListContentBox from '../ContentBox/ListContentBox/ListContentBox';
import Popup from '../Popup/Popup';

export default function ListContent() {
  const navigate = useNavigate()
  const category = useSelector((state) => state.post.category)

  const { isLogin, categoryFilter, setCategoryFilter, list, setList, searchs } = ListContentViewModel()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  function comboBoxSelect(value){
    sessionStorage.setItem("category", value)
    setCategoryFilter(value)
  }

  useEffect(() => {
    console.log(list)
  }, [list])

  const [wait, setWait] = useState(false)
  const [popup, setPopup] = useState(false)
  const [popupTitle, setPopupTitle] = useState("")
  const [popupButtonMessage, setPopupButtonMessage] = useState("")
  const [popupType, setPopupType] = useState(false)

  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (wait) {
      
      setPosition(window.scrollY);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [wait]);

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
        className={`fixed w-screen h-screen left-0`}
        style={{ top: `${position}px` }}
      />

      <div className='w-full h-16'>
        {
          isLogin
          &&
          <Combobox 
            title={"Select Category"} 
            placeholder={"Search Category"} 
            empty={"No category found"} 
            items={category} 
            headerClassName={"w-72 shadow-lg"}
            contentClassName={" pt-1 border-0"}
            item={categoryFilter}
            onSelect={(value) => {comboBoxSelect(value)}}
          />
        }
      </div>
      
      <div className='w-full pt-3 flex justify-between min-h-[calc(100vh-15rem)] h-fit'>
        <div className='w-[calc(100%-5rem)] mr-10'>
          {
            list.map((item, idx) => {
              if(
                item.title.toLowerCase().includes(searchs.toLowerCase())
                &&
                item.hashtag.find(tag => tag.toLowerCase().includes(categoryFilter.toLowerCase()))
              )
              return <ListContentBox item={item} setList={setList} setWait={setWait} setPopup={setPopup} setPopupTitle={setPopupTitle} setPopupButtonMessage={setPopupButtonMessage} setPopupType={setPopupType} key={idx} />
            })
          }
        </div>
        
        {
          isLogin
          &&
          <div className=' w-16 2xl:w-20 relative'>
            <button className=' w-16 h-16 2xl:w-20 2xl:h-20 p-[0.4rem] bg-navyblue-800 hover:bg-navyblue-700 transition-colors duration-300 rounded-full flex justify-center items-center sticky top-[88%]' onClick={() => (navigate("/addpost"))}>
              <div className='w-full h-full rounded-full border-[0.15rem] border-ghostwhite-50 flex justify-center items-center'>
                <FaPlus className=' text-ghostwhite-50 2xl:w-10 2xl:h-10 w-8 h-8'/>
              </div>
            </button>
          </div>
        }
      </div>
      
      
    </>
  )
}
