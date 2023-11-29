import { useSelector } from "react-redux";
import fetch from "../../../../Client/fetch";
import { useEffect, useState } from "react";

export default function AddPostViewModel() {
  const { checkToken, addPost } = fetch();

  const user = useSelector((state) => state.user.userDetail);
  const category = useSelector((state) => state.post.category);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState([]);
  const [imageSrcs, setImageSrcs] = useState([]);
  const [hashtag, setHashtag] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [wait, setWait] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupButtonMessage, setPopupButtonMessage] = useState("");
  const [popupType, setPopupType] = useState(false);

  function descChange(event) {
    const inputText = event.target.value;
    // Remove extra spaces and count words
    const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;

    // Limit to 1000 words
    if (wordCount <= 1000) {
      setText(inputText);
    }
  }

  function addHashtag() {
    setHashtag((prev) => [...prev, ""]);
    console.log("add");
  }

  function hashtagChange(value, index) {
    const temp = [...hashtag];
    temp[index] = value;
    setHashtag(temp);
  }

  useEffect(() => {
    checkToken();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  async function submit() {
    const data = {
      title: title,
      description: text,
      image: file,
      hashtag: hashtag,
      min_price: minPrice,
      max_price: maxPrice,
    };
    console.log(data);

    setWait(true);

    window.scrollTo({ top: 0, behavior: "smooth" });

    const response = await addPost(data, setWait, setPopup);

    if (response == undefined) {
      setPopupTitle("Network Error!");
      setPopupButtonMessage("Try Again");
      setPopupType(false);
      return;
    }

    if (response.status.toString()[0] != 2) {
      setPopupTitle(response.data.message);
      setPopupButtonMessage("Try Again");
      setPopupType(false);
      return;
    }

    setPopupTitle("Add Post Success");
    setPopupButtonMessage("Close");
    setPopupType(true);
  }

  return {
    user,
    category,
    title,
    text,
    file,
    imageSrcs,
    hashtag,
    minPrice,
    maxPrice,
    setTitle,
    setFile,
    setImageSrcs,
    setMinPrice,
    setMaxPrice,
    addHashtag,
    descChange,
    hashtagChange,
    submit,
    wait,
    popup,
    popupTitle,
    popupButtonMessage,
    popupType,
    setWait,
    setPopup,
  };
}
