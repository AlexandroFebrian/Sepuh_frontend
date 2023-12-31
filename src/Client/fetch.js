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

  async function verifyEmail(token) {
    try {
      return await client
        .get(`users/verify/${token}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function checkToken(cek) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .post("cekToken", { token: token })
        .then((res) => {
          dispatch(setIsLogin(true));
          dispatch(setUserDetail(res.data.data));
        })
        .catch((err) => {
          localStorage.removeItem("token");
          dispatch(setIsLogin(false));
          dispatch(setUserDetail(null));
          if (location.pathname == "/" || location.pathname == "/home") {
          } else {
            // navigate("/");
            if (cek) {
              cek(true);
            }
          }
        });
    } catch (error) {
      dispatch(setIsLogin(false));
      alert("error");
      // navigate("/");
      if (cek) {
        cek(true);
      }
    }
  }

  async function checkTokenAdmin(cek) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .post("cekTokenAdmin", { token: token })
        .then((res) => {
          console.log(res.data);
          dispatch(setIsLogin(true));
          dispatch(setUserDetail(res.data.data));
        })
        .catch((err) => {
          localStorage.removeItem("token");
          dispatch(setIsLogin(false));
          dispatch(setUserDetail(null));
          // navigate("/admin");
          //
        });
    } catch (error) {
      dispatch(setIsLogin(false));
      if (cek) {
        cek(true);
      }
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
          checkToken();
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

  async function getUserProfileByEmail(email, setProfile) {
    try {
      client
        .get(`users/profile/${email}`)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          alert("error");
        });
    } catch (error) {
      alert("error");
    }
  }

  async function getUserPostsByEmail(email, setPosts) {
    try {
      client
        .get(`posts/${email}`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          alert("error");
        });
    } catch (error) {
      alert("error");
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
          setMyPost(res.data);
        })
        .catch((err) => {
          alert("error");
        });
    } catch (error) {
      alert("error");
    }
  }

  async function getPostById(id, setPost) {
    try {
      return await client
        .get(`posts/details/${id}`)
        .then((res) => {
          // console.log(res.data[0]);
          if (setPost) {
            setPost(res.data[0]);
          }
          return res.data[0];
        })
        .catch((err) => {
          alert("error");
        });
    } catch (error) {
      alert("error");
    }
  }

  async function addViewPost(id) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .put(
          `posts/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
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
          localStorage.setItem("token", res.data.token);
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
          let filtered = res.data.users.filter((user) => {
            return user.status !== 0;
          });

          return {
            users: filtered,
            total: filtered.length,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.message);
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
        .get(`/chats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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
            message,
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

  async function addToList(postId, setWait, setPopup) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .post(
          `users/list`,
          {
            post_id: postId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
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

  async function removeFromList(postId, setWait, setPopup) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .put(
          `users/list`,
          {
            post_id: postId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
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

  async function getList(setList) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .get(`users/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setList(res.data);
        })
        .catch((err) => {
          alert("error");
        });
    } catch (error) {
      alert("error");
    }
  }

  async function createAgreements(email, minPrice, postId, setWait, setPopup) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .post(
          `agreements`,
          {
            email: email,
            post_id: postId,
            min_price: minPrice,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
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
    }
  }

  async function fetchActivity(setActivity) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .get("agreements", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res.data);g
          setActivity(res.data);
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function getActivityById(id, setActivity) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .get(`agreements/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setActivity(res.data);
          return res;
        })
        .catch((err) => {
          //NOT FOUND
          // console.log(err.response)
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function setDealPrice(
    agreementId,
    price,
    setActivity,
    setWait,
    setPopup
  ) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .put(
          `agreements/price`,
          {
            agreement_id: agreementId,
            deal_price: price,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async (res) => {
          setPopup(true);
          await getActivityById(agreementId, setActivity);
          return res;
        })
        .catch((err) => {
          setPopup(true);
          alert("error");
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function acceptAgreement(agreementId, setActivity, setWait, setPopup) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .put(
          `agreements/accept`,
          {
            agreement_id: agreementId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async (res) => {
          setPopup(true);
          await getActivityById(agreementId, setActivity);
          return res;
        })
        .catch((err) => {
          setPopup(true);
          alert("error");
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function rejectAgreement(agreementId, setActivity, setWait, setPopup) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .put(
          `agreements/status/reject`,
          {
            agreement_id: agreementId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async (res) => {
          setPopup(true);
          await getActivityById(agreementId, setActivity);
          return res;
        })
        .catch((err) => {
          setPopup(true);
          alert("error");
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function doneProject(agreementId, setActivity, setWait, setPopup) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .put(
          "agreements/status/done",
          {
            agreement_id: agreementId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async (res) => {
          setPopup(true);
          await getActivityById(agreementId, setActivity);
          return res;
        })
        .catch((err) => {
          setPopup(true);
          alert("error");
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function saveFileAgreement(
    agreementId,
    file,
    setActivity,
    setWait,
    setPopup
  ) {
    const token = localStorage.getItem("token");

    try {
      return await clientFile
        .post(
          `agreements/file`,
          {
            agreement_id: agreementId,
            file: file,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async (res) => {
          setPopup(true);
          await getActivityById(agreementId, setActivity);
          return res;
        })
        .catch((err) => {
          setPopup(true);
          alert("error");
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function agreementPayment(activity, openSnap, setActivity) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .post(
          "agreements/payment",
          {
            agreement_id: activity._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          openSnap(res.data.midtrans.token, res.data.invoice);
          return res;
        })
        .catch((err) => {
          alert("error");
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function setPaymentStatus(invoice, agreementId, setActivity) {
    try {
      return await client
        .post("agreements/dSfbZJgaMxGbGYFsRYDq", {
          transaction_status: "settlement",
          order_id: invoice,
        })
        .then(async (res) => {
          await getActivityById(agreementId, setActivity);
          return res;
        })
        .catch((err) => {
          alert("error");
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function acceptFile(agreementId, fileId, comment, setActivity) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .put(
          "agreements/file/accept",
          {
            agreement_id: agreementId,
            file_id: fileId,
            comment: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async (res) => {
          await getActivityById(agreementId, setActivity);
          return res;
        })
        .catch((err) => {
          alert("error");
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function rejectFile(agreementId, fileId, comment, setActivity) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .put(
          "agreements/file/reject",
          {
            agreement_id: agreementId,
            file_id: fileId,
            comment: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async (res) => {
          await getActivityById(agreementId, setActivity);
          return res;
        })
        .catch((err) => {
          alert("error");
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function submitReview(
    comment,
    rating,
    agreementId,
    setActivity,
    setWait,
    setPopup
  ) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .post(
          "posts/review",
          {
            comment: comment,
            rating: rating,
            agreement_id: agreementId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async (res) => {
          setPopup(true);
          await getActivityById(agreementId, setActivity);
          return res;
        })
        .catch((err) => {
          alert("error");
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function getAllBankName(setBankName) {
    try {
      return await client
        .get("bank")
        .then((res) => {
          setBankName(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("error fetching bank name");
          navigate("/");
        });
    } catch (error) {
      alert("Server Error");
      navigate("/");
    }
  }

  async function updateDocument(data) {
    const token = localStorage.getItem("token");

    try {
      console.log(data);
      return await clientFile
        .put("users/documents", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          alert("Document Updated");
          checkToken();
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function saveBankAccount(data) {
    const token = localStorage.getItem("token");
    // api/users/profile but data is bank_name and account_number
    try {
      return await client
        .put("users/profile", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          alert("Bank Account Updated");
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function createMessage(email) {
    const token = localStorage.getItem("token");
    try {
      return await client
        .post(
          "chats",
          {
            email: email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          localStorage.setItem("chat_with", JSON.stringify(res.data));
          navigate("/messages");
        })
        .catch((err) => {
          return err.response;
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function hireOrApply(email, setWait, setPopup) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .post(
          "users/hire",
          {
            email: email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
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
    }
  }

  async function changePassword(data) {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      return await client
        .put(
          "users/password",
          {
            old_password: data.old_password,
            new_password: data.new_password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function getAllAgreements() {
    const token = localStorage.getItem("token");
    try {
      return await client
        .get("agreements/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response;
        });
    } catch (error) {
      console.log("500 - Server Error");
    }
  }

  async function getUserNotifications(setNotifications) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .get("users/notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setNotifications(res.data);
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function hireAccept(notifId, setPopup, setNotifications) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .put(
          "users/hire/accept",
          {
            notification_id: notifId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setPopup(true);
          getUserNotifications(setNotifications);
          return res;
        })
        .catch((err) => {
          setPopup(true);
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function hireReject(notifId, setPopup, setNotifications) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .put(
          "users/hire/reject",
          {
            notification_id: notifId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setPopup(true);
          getUserNotifications(setNotifications);
          return res;
        })
        .catch((err) => {
          setPopup(true);
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function getEmployees(setEmployees) {
    const token = localStorage.getItem("token");

    try {
      return await client
        .get("users/employees", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setEmployees(res.data);
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  async function getAllAgreementsUser() {
    const token = localStorage.getItem("token");
    try {
      return await client
        .get("agreements", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response;
        });
    } catch (error) {
      alert("error");
    }
  }

  return {
    signIn,
    signUp,
    verifyEmail,
    checkToken,
    getCategory,
    getUserProfile,
    getUserProfileByEmail,
    getUserPostsByEmail,
    updateUserProfile,
    addPost,
    myPost,
    getPostById,
    addViewPost,
    fetchCompanyPost,
    fetchFreelancerPost,
    handleAdminLogin,
    getAllUser,
    BanUser,
    UnbanUser,
    getAllChats,
    sendMessage,
    addToList,
    removeFromList,
    getList,
    createAgreements,
    fetchActivity,
    getActivityById,
    setDealPrice,
    acceptAgreement,
    rejectAgreement,
    doneProject,
    agreementPayment,
    setPaymentStatus,
    saveFileAgreement,
    acceptFile,
    rejectFile,
    submitReview,
    getAllBankName,
    updateDocument,
    createMessage,
    hireOrApply,
    changePassword,
    getAllAgreements,
    getUserNotifications,
    hireAccept,
    hireReject,
    getEmployees,
    getAllAgreementsUser,
    checkTokenAdmin,
  };
}
