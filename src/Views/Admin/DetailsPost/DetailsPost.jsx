// EDISI PUTUS ASA PAKE VIEW MODEL
import { useSearchParams } from "react-router-dom";
// import DetailsPostViewModel from "./DetailsPostViewModel";
import { useEffect, useState } from "react";
import Axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL;

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
    // localhost:3000/api/posts/admin/:email
    const response = await Axios.get(`${baseURL}/posts/admin/${emailSearch}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  return (
    <>
      <div className="container-details">
        {dataDetailsPost.map((item, index) => {
          return (
            <Accordion allowToggle key={index}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <AccordionIcon />
                    <div className="title-details">{item.title}</div>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <div className="container-details">
                    <div className="container-details-image">
                      {item.image.map((item, index) => {
                        return (
                          <img
                            className="image-details"
                            src={item}
                            alt="image-details"
                            key={index}
                          />
                        );
                      })}
                    </div>
                    <div className="container-details-description">
                      <div className="description-details">
                        {item.description}
                      </div>
                      <div className="description-details">
                        {item.hashtag.map((item, index) => {
                          return (
                            <div className="hashtag-details" key={index}>
                              <div className="hashtag-details-text">{item}</div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="description-details">
                        <div className="hashtag-details">
                          <div className="hashtag-details-text">
                            {item.min_price}
                          </div>
                        </div>
                        <div className="hashtag-details">
                          <div className="hashtag-details-text">
                            {item.max_price}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container-details-button">
                      {/* <button
                        className="button-details  bg-yellow-500 mx-5 p-2"
                        onClick={() => {
                          suspendPost(item.id);
                        }}
                      >
                        Suspend
                      </button>
                      <button
                        className="button-details bg-yellow-500 mx-5 p-2"
                        onClick={() => {
                          unsuspendPost(item.id);
                        }}
                      >
                        Unsuspend
                      </button> */}

                      {item.status === -1 ? (
                        <button
                          className="button-details bg-yellow-500 mx-5 p-2"
                          onClick={() => {
                            unsuspendPost(item._id);
                          }}
                        >
                          Unsuspend
                        </button>
                      ) : (
                        <button
                          className="button-details  bg-yellow-500 mx-5 p-2"
                          onClick={() => {
                            suspendPost(item._id);
                          }}
                        >
                          Suspend
                        </button>
                      )}
                    </div>
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </>
  );
}
