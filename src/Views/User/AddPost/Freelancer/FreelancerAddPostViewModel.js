import { useSelector } from "react-redux";
import fetch from "../../../../Client/fetch";
import { useEffect, useState } from "react";

export default function AddPostViewModel(){
  const { checkToken } = fetch();

  const user = useSelector((state) => state.user.userDetail)
  const category = useSelector((state) => state.post.category)

  const [text, setText] = useState('');
  const [file, setFile] = useState([]);
  const [imageSrcs, setImageSrcs] = useState([]);
  const [hashtag, setHashtag] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  function descChange (event) {
    const inputText = event.target.value;
    // Remove extra spaces and count words
    const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;

    // Limit to 1000 words
    if (wordCount <= 1000) {
      setText(inputText);
    }
  };

  function addHashtag(){
    setHashtag(prev => [...prev, ""])
    console.log("add")
  }

  function hashtagChange(value, index){
    const temp = [...hashtag]
    temp[index] = value
    setHashtag(temp)

  }

  useEffect(() => {
    checkToken();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  return {
    user,
    category,
    text,
    file,
    imageSrcs,
    hashtag,
    minPrice,
    maxPrice,
    setFile,
    setImageSrcs,
    setMinPrice,
    setMaxPrice,
    addHashtag,
    descChange,
    hashtagChange,
  }
}