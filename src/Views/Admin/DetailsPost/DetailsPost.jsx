// EDISI PUTUS ASA PAKE VIEW MODEL
import { useSearchParams } from "react-router-dom";
import DetailsPostViewModel from "./DetailsPostViewModel";
import { useEffect, useState } from "react";
import Axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL;
import NavigationAdmin from "../../../components/NavigationAdmin/NavigationAdmin";
import { FaEye } from "react-icons/fa";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export default function DetailsPost() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [emailSearch, setEmailSearch] = useState(email);
  const [dataDetailsPost, setDataDetailsPost] = useState([]);

  const getDetailsPost = async () => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    const response = await Axios.get(`${baseURL}/posts/admin/${emailSearch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setDataDetailsPost(res.data);
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  };

  const suspendPost = async (id) => {
    const token = localStorage.getItem("token");

    const response = await Axios.put(
      `${baseURL}/posts/suspend/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        getDetailsPost();
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  };

  const unsuspendPost = async (id) => {
    const token = localStorage.getItem("token");

    const response = await Axios.put(
      `${baseURL}/posts/unsuspend/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        getDetailsPost();
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    getDetailsPost();
  }, [emailSearch]);

  const formatAmount = (amount) => {
    const amountString = amount.toString();
    const amountLength = amountString.length;
    let amountFormatted = "";
    for (let i = 0; i < amountLength; i++) {
      if ((amountLength - i) % 3 === 0 && i !== 0) {
        amountFormatted += ".";
      }
      amountFormatted += amountString[i];
    }
    amountFormatted = "Rp. " + amountFormatted + ",00";
    return amountFormatted;
  };

  return (
    <>
      <div className="container-details flex">
        <div className="sideBar w-1/6 fixed left-0">
          <NavigationAdmin />
        </div>
        <div className="right w-5/6 pt-10 absolute right-0">
          <div className="top flex px-5 pb-5">
            <div className="backButton">
              <button
                className="backButton bg-yellow-500 p-2 rounded-lg"
                onClick={() => {
                  window.history.back();
                }}
              >
                Back
              </button>
            </div>
            <div className="boxUserData px-5">
              <div className="userData">
                <div className="contentUserData text-3xl font-semibold ">
                  {emailSearch} Details Post
                </div>
              </div>
            </div>
          </div>
          {console.log("dataDetailsPost", dataDetailsPost)}
          {dataDetailsPost.map((item, index) => {
            return (
              <Accordion allowToggle key={index}>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <AccordionIcon />
                      <div className="title-details text-xl">{item.title}</div>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <div className="container-details">
                      <div className="container-details-image grid grid-cols-3 gap-5">
                        {item.image.map((item, index) => {
                          return (
                            <img
                              className="image-details h-full"
                              src={item}
                              alt="image-details"
                              key={index}
                              draggable="false"
                            />
                          );
                        })}
                      </div>
                      <div className="topDetails flex justify-between">
                        <div className="title-details font-semibold text-2xl">
                          {item.title}
                        </div>

                        <div className="price">
                          <div className="price-details flex gap-2 text-xl">
                            <div className="price-details-text">
                              {formatAmount(item.min_price)}
                            </div>
                            <div className="price-details-text">-</div>
                            <div className="price-details-text">
                              {formatAmount(item.max_price)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="container-details-description">
                        <div className="description-details font-semibold px-5">
                          {item.description.length <= 0 ? (
                            <div className="description-details-text">
                              No description
                            </div>
                          ) : (
                            item.description
                          )}
                        </div>
                        <div className="description-details">
                          {item.hashtag.map((item, index) => {
                            return (
                              <div className="hashtag-details" key={index}>
                                <div className="hashtag-details-text flex gap-3 px-5">
                                  {item.split(" ").map((item, index) => {
                                    return (
                                      <div
                                        className="hashtag"
                                        key={index}
                                      >{`#${item}`}</div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="bottom flex justify-between px-5 mt-5 items-center">
                        <div className="visitors">
                          <div className="visitors-details flex gap-2 text-xl items-center">
                            <div className="visitors-details-text">
                              <FaEye />
                            </div>
                            <div className="visitors-details-text">
                              {item.visitor} Visitors
                            </div>
                          </div>
                        </div>
                        <div className="container-details-button flex items-center justify-end mr-5">
                          {item.status === -1 ? (
                            <button
                              className="button-details bg-yellow-500 p-2 rounded-lg w-24 text-xl"
                              onClick={() => {
                                unsuspendPost(item._id);
                              }}
                            >
                              Unsuspend
                            </button>
                          ) : (
                            <button
                              className="button-details  bg-yellow-500 p-2 rounded-lg w-24 text-xl"
                              onClick={() => {
                                suspendPost(item._id);
                              }}
                            >
                              Suspend
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            );
          })}

          {dataDetailsPost.length <= 0 ? (
            <div className="container-details flex justify-center items-center">
              <div className="no-data-details text-2xl font-semibold">
                No data
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
