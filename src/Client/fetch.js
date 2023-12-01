/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { setIsLogin, setUserDetail } from "../redux/UserSlice";
import { setCategory } from "../redux/PostSlice";
import { useDispatch, useSelector } from "react-redux";

export default function fetch() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userDetail);

  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const client = axios.create({
    baseURL,
    headers: {
      "Content-type": "application/json",
    },
  });

  const clientFile = axios.create({
    baseURL,
    headers: {
      "Content-type": "multipart/form-data",
    },
  });

  async function signIn(data, setWait, setPopup) {
    try {
      return await client
        .post("users/login", data)
        .then((res) => {
          setPopup(true);
          return res;
        })
        .catch((err) => {
          setPopup(true);
          return err.response;
        });
    } catch (error) {
      setWait(false);
      alert("error");
    }
  }

  async function signUp(data, setWait, setPopup) {
    try {
      return await client
        .post("users/register", data)
        .then((res) => {
          setPopup(true);
          return res;
        })
        .catch((err) => {
          setPopup(true);
          return err.response;
        });
    } catch (error) {
      setWait(false);
      alert("error");
    }
  }

  async function checkToken() {
    const token = localStorage.getItem("token");

    try {
      return await client
        .post("cekToken", { token: token })
        .then((res) => {
          dispatch(setIsLogin(true));
          dispatch(setUserDetail(res.data.data));
        })
        .catch((err) => {
          if (location.pathname == "/" || location.pathname == "/home") {
          } else {
            navigate("/");
          }
        });
    } catch (error) {
      alert("error");
      navigate("/");
    }
  }

  async function getUserProfile(setProfile) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .get("users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProfile(res.data);
          return res.data;
        })
        .catch((err) => {
          alert("error fetching user profile");
        });
    } catch (error) {
      alert("error");
      navigate("/");
    }
  }

  async function updateUserProfile(data, setWait, setPopup) {
    const token = localStorage.getItem("token");

    try {
      return await clientFile
        .put("users/profile", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setPopup(true);
          return res;
        })
        .catch((err) => {
          setPopup(true);
          return err.response;
        });
    } catch (error) {
      alert("error");
      navigate("/");
    }
  }

  async function getUserProfileByEmail(email){
    try {
      // client.get()
      // .then((res) => {

      // })
      // .catch((err) => {
      //   alert("error")
      // })
    } catch (error) {
      alert("error")
    }
  }

  async function getCategory() {
    try {
      return await client
        .get("category")
        .then((res) => {
          dispatch(setCategory(res.data));
        })
        .catch((err) => {
          alert("error fetching category");
          navigate("/");
        });
    } catch (error) {
      alert("error");
      navigate("/");
    }
  }

  async function addPost(data, setWait, setPopup) {
    const token = localStorage.getItem("token");

    try {
      return await clientFile
        .post("posts/add", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setPopup(true);
          return res;
        })
        .catch((err) => {
          setPopup(true);
          return err.response;
        });
    } catch (error) {
      alert("error");
      navigate("/");
    }
  }

  async function myPost(email, setMyPost) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .get(`posts/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setMyPost(res.data);
        })
        .catch((err) => {
          alert("error");
        });
    } catch (error) {
      alert("error");
    }
  }

  async function fetchCompanyPost(setCompanyPost) {
    try {
      return await client
        .get("posts/company")
        .then((res) => {
          setCompanyPost(res.data);
        })
        .catch((err) => {
          alert("error");
        });
    } catch (error) {
      alert("error");
    }
  }

  async function fetchFreelancerPost(setFreelancerPost) {
    try {
      return await client
        .get("posts/freelancer")
        .then((res) => {
          setFreelancerPost(res.data);
        })
        .catch((err) => {
          alert("error");
        });
    } catch (error) {
      alert("error");
    }
  }

  // ADMIN
  async function handleAdminLogin(data) {
    try {
      return await client
        .post("users/admin/login", data)
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    } catch (error) {
      console.log(error);
      alert("error");
    }
  }

  async function getAllUser() {
    const token = localStorage.getItem("token");

    try {
      return await client
        .get("users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          alert("error");
        });
    } catch (error) {
      alert("error");
    }
  }

  async function BanUser(email) {
    const token = localStorage.getItem("token");
    try {
      return await client
        .put(
          `users/ban/${email}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert("error");
    }
  }

  async function UnbanUser(email) {
    const token = localStorage.getItem("token");
    try {
      return await client
        .put(
          `users/unban/${email}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert("error");
    }
  }

  async function getAllChats(setContacts) {
    const token = localStorage.getItem("token");

    try {
      client
        .get(
          `/chats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setContacts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  async function sendMessage(receiver_id, message, setContacts) {
    const token = localStorage.getItem("token");

    try {
      client
        .post(
          `/chats/message`,
          {
            receiver_id,
            message
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setContacts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  return {
    signIn,
    signUp,
    checkToken,
    getCategory,
    getUserProfile,
    getUserProfileByEmail,
    updateUserProfile,
    addPost,
    myPost,
    fetchCompanyPost,
    fetchFreelancerPost,
    handleAdminLogin,
    getAllUser,
    BanUser,
    UnbanUser,
    getAllChats,
    sendMessage
  };
}
