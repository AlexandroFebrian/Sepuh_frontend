/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";

export default function BankAccountViewModel() {
  const { checkToken, getUserProfile, getAllBankName, updateUserProfile } =
    fetch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.userDetail);

  const [profile, setProfile] = useState(null);

  const [bankName, setBankName] = useState([]);
  const [bankSelect, setBankSelect] = useState('');
  const [wait, setWait] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupButtonMessage, setPopupButtonMessage] = useState("");
  const [popupType, setPopupType] = useState(false);

  const [bannerFile, setBannerFile] = useState([]);
  const [bannerImageSrc, setBannerImageSrc] = useState([]);

  const [profileFile, setProfileFile] = useState([]);
  const [profileImageSrc, setProfileImageSrc] = useState([]);

  const [profileMemberSince, setProfileMemberSince] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileDateOfBirth, setProfileDateOfBirth] = useState("");
  const [profileHeadline, setProfileHeadline] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [profileCity, setProfileCity] = useState("");
  const [profileCountry, setProfileCountry] = useState("");
  const [profileAccountNumber, setProfileAccountNumber] = useState("");

  const [profileLastEducation, setProfileLastEducation] = useState("");
  const [profileCurrentEducation, setProfileCurrentEducation] = useState("");
  const [profileFieldOfStudy, setProfileFieldOfStudy] = useState("");
  const [profileYearofStudy, setProfileYearofStudy] = useState("");

  async function saveProfile(bank_name, account_number) {
    if (isNaN(account_number)) {
      alert("Account number must be a number");
      return;
    }
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
      bank_name: bank_name,
      account_number: account_number,
    };

    setWait(true);
    const response = await updateUserProfile(data, setWait, setPopup);

    if (response == undefined) {
      setPopupTitle("Network Error!");
      setPopupButtonMessage("Try Again");
      setPopupType(false);
      return;
    }

    if (response.status.toString()[0] != 2) {
      // console.log(response)
      setPopupTitle(response.data.message);
      setPopupButtonMessage("Try Again");
      setPopupType(false);
      return;
    }

    setPopupTitle("Update Profile Success");
    setPopupButtonMessage("Close");
    setPopupType(true);
    alert(response.data.message);
  }

  useEffect(() => {
    checkToken();
    window.scrollTo({ top: 0, behavior: "smooth" });
    getUserProfile(setProfile);

    getAllBankName(setBankName);

    return () => {
      setProfile(null);
    };
  }, []);

  useEffect(() => {
    if (profile != null) {
      setBannerImageSrc([profile.header_picture]);
      setProfileImageSrc([profile.profile_picture]);
      setProfileMemberSince(new Date(profile.create_at));
      setProfileName(profile.name);
      setProfileEmail(profile.email);
      setProfileDateOfBirth(
        profile.date_of_birth != null && new Date(profile.date_of_birth)
      );
      setBankSelect(profile.bank_name)
      setProfileHeadline(profile.headline);
      setProfileBio(profile.bio);
      setProfileCity(profile.city);
      setProfileCountry(profile.country);
      setProfileLastEducation(profile.last_education);
      setProfileCurrentEducation(profile.current_education);
      setProfileFieldOfStudy(profile.field_of_study);
      setProfileYearofStudy(profile.year_of_study);
      setProfileAccountNumber(profile.account_number);
    }
  }, [profile]);

  return {
    isLogin,
    user,
    profile,
    bankSelect,
    bankName,
    profileAccountNumber,
    setProfileAccountNumber,
    saveProfile,
  };
}
