import axios from "axios";
import fetch from "../Client/fetch";
import { useDispatch } from "react-redux";
import { setIsLogin, setUserDetail } from "../redux/UserSlice";
import { useLocation } from "react-router-dom";

// const { checkToken } = fetch();

const baseURL = import.meta.env.VITE_BACKEND_URL;
const client = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});


export async function cekToken() {

  const token = localStorage.getItem("token");
  let cek = false
  
  await client
    .post("cekToken", { token: token })
    .then((res) => {
    })
    .catch((err) => {
      localStorage.removeItem("token");
      cek = true;
    });

  if(cek == true){
    throw new Response ("", {status: 403})
  }

  return "OK"
}
