import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";


export default function ProfileViewModel(){
  const { checkToken, getUserProfile, updateUserProfile } = fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  const [profile, setProfile] = useState(null)

  const [bannerFile, setBannerFile] = useState([]);
  const [bannerImageSrc, setBannerImageSrc] = useState([]);

  const [profileFile, setProfileFile] = useState([]);
  const [profileImageSrc, setProfileImageSrc] = useState([]);

  const [profileMemberSince, setProfileMemberSince] = useState("")
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileDateOfBirth, setProfileDateOfBirth] = useState("");
  const [profileHeadline, setProfileHeadline] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [profileCity, setProfileCity] = useState("");
  const [profileCountry, setProfileCountry] = useState("");

  const [profileLastEducation, setProfileLastEducation] = useState("");
  const [profileCurrentEducation, setProfileCurrentEducation] = useState("");
  const [profileFieldOfStudy, setProfileFieldOfStudy] = useState("");
  const [profileYearofStudy, setProfileYearofStudy] = useState("");

  const [wait, setWait] = useState(false)
  const [popup, setPopup] = useState(false)
  const [popupTitle, setPopupTitle] = useState("")
  const [popupMessage, setPopupMessage] = useState("")
  const [popupSubMessage, setPopupSubMessage] = useState("")
  const [popupButtonMessage, setPopupButtonMessage] = useState("")
  const [popupType, setPopupType] = useState(false)

  useEffect(() => {
    checkToken();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getUserProfile(setProfile)
    
    return () => {
      setProfile(null)
    }
  }, [])

  useEffect(() => {
    if(profile != null){
      setBannerImageSrc([profile.header_picture])
      setProfileImageSrc([profile.profile_picture])
      setProfileMemberSince(new Date(profile.create_at))
      setProfileName(profile.name)
      setProfileEmail(profile.email)
      setProfileDateOfBirth(new Date(profile.date_of_birth))
      setProfileHeadline(profile.headline)
      setProfileBio(profile.bio)
      setProfileCity(profile.city)
      setProfileCountry(profile.country)
      setProfileLastEducation(profile.last_education)
      setProfileCurrentEducation(profile.current_education)
      setProfileFieldOfStudy(profile.field_of_study)
      setProfileYearofStudy(profile.year_of_study)
    }
  }, [profile])

  const [dd, setDD] = useState("");
  const [mm, setMM] = useState("");
  const [yyyy, setYYYY] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [reRender, setReRender] = useState(false)

  useEffect(() => {
    if(profileDateOfBirth){
      setReRender(!reRender)
    }
  }, [profileDateOfBirth])

  useEffect(() => {
    if(profileDateOfBirth){
      setDD(String(profileDateOfBirth.getDate()).padStart(2, '0'))
      setMM(String(profileDateOfBirth.getMonth() + 1).padStart(2, '0'))
      setYYYY(String(profileDateOfBirth.getFullYear()))
      setFormattedDate(`${yyyy}-${mm}-${dd}`)
    }
  }, [reRender, profileDateOfBirth])

  async function saveProfile(){
    const data = {
      header_picture: bannerFile.length == 0 ? undefined : bannerFile[0],
      profile_picture: profileFile.length == 0 ? undefined : profileFile[0],
      date_of_birth: profileDateOfBirth,
      headline: profileHeadline,
      bio: profileBio,
      city: profileCity,
      country: profileCountry,
      last_education: profileLastEducation,
      current_education: profileCurrentEducation,
      field_of_study: profileFieldOfStudy,
      year_of_study: profileYearofStudy,
    }

    setWait(true)

    window.scrollTo({ top: document.body.scrollHeight/4, behavior: 'smooth' });

    const response = await updateUserProfile(data, setWait, setPopup)

    if(response == undefined){
      setPopupTitle("Network Error!")
      setPopupButtonMessage("Try Again")
      setPopupType(false)
      return
    }

    if(response.status.toString()[0] != 2){
      // console.log(response)
      setPopupTitle(response.data.message)
      setPopupButtonMessage("Try Again")
      setPopupType(false)
      return
    }

    setPopupTitle("Success Update Profile")
    setPopupButtonMessage("Close")
    setPopupType(true)
  }

  return {
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
    popup,
    popupTitle,
    popupButtonMessage,
    popupType,
    setPopup,
    setWait
  }
}