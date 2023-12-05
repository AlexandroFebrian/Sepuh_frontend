import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import fetch from "../../../../Client/fetch";


export default function DetailActivityViewModel(){
  const { checkToken, getActivityById, setDealPrice, acceptAgreement } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);
  
  const { actId } = useParams();
  // console.log(actId)

  const [activity, setActivity] = useState()
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [priceBefore, setPriceBefore] = useState(0)
  const [price, setPrice] = useState(0)

  const [file, setFile] = useState([])

  useEffect(() => {
    checkToken();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
  }, [])

  useEffect(() => {
    if(user && actId){
      getActivityById(actId, setActivity)
    }
  }, [user, actId])

  useEffect(() => {
    console.log(activity)

    if(!activity) return

    setMinPrice(new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
    }).format(activity?.post.min_price));
  
    setMaxPrice(new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
    }).format(activity?.post.max_price));

    setPriceBefore(new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
    }).format(activity?.deal_price));
  }, [activity])

  async function changeBidHandler(){
    await setDealPrice(activity?._id, price, setActivity)
  }

  async function acceptBidHandler(){
    await acceptAgreement(activity?._id, setActivity)
  }

  useEffect(() => {
    console.log(file)
  }, [file])

  return {
    isLogin,
    user,
    activity,
    minPrice,
    maxPrice,
    priceBefore,
    setPrice,
    changeBidHandler,
    acceptBidHandler,
    file,
    setFile,
  }
}