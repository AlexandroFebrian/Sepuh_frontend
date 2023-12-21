// EDISI PUTUS ASA PAKE VIEW MODEL
import { useSearchParams } from "react-router-dom";
import DetailsPostViewModel from "./DetailsPostViewModel";

import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
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

  const [pagination, setPagination] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState(10);
  const [dataTampil, setDataTampil] = useState([]);

  const [globalFilterValue, setGlobalFilterValue] = useState(null);
  const [filters, setFilters] = useState({
    global: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  });

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

    const token = localStorage.getItem("token");
    const response = Axios.get(`${baseURL}/posts/admin/${emailSearch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setTotalData(res.data.length);
      setTotalPage(Math.ceil(res.data.length / limit));

      setDataTampil(
        res.data.slice(0 * limit, 0 * limit + limit).map((item) => item)
      );
    });
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

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  useEffect(() => {
    setDataTampil(
      dataDetailsPost.filter((item) => {
        if (globalFilterValue === null || globalFilterValue === "") {
          return item;
        } else if (
          item.title.toLowerCase().includes(globalFilterValue.toLowerCase()) ||
          item._id.toLowerCase().includes(globalFilterValue.toLowerCase())
        ) {
          return item;
        }
      })
    );
  }, [globalFilterValue]);

  useEffect(() => {
    setDataTampil(
      dataDetailsPost.slice(
        (pagination - 1) * limit,
        (pagination - 1) * limit + limit
      )
    );
  }, [dataDetailsPost]);

  return (
    <>
      <div className="container-details flex">
        <div className="sideBar w-1/6 fixed left-0">
          <NavigationAdmin />
        </div>
        <div className="right w-5/6 pt-10 absolute right-0 min-h-screen max-h-fit">
          <div className="top flex px-5 pb-5">
            <div className="backButton">
              <button
                className="backButton bg-yellow-500 p-2 rounded-lg"
                onClick={() => {
                  window.history.back();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  draggable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
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

          <div className="top flex justify-between items-center my-5 w-1/4 mx-7">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-ghostwhite-100 rounded-md px-5 py-2"
              onChange={(e) => {
                setGlobalFilterValue(e.target.value);
              }}
              defaultValue={globalFilterValue}
            />
          </div>
          {dataTampil.slice(
            (pagination - 1) * limit,
            (pagination - 1) * limit + limit
          ).length > 0 &&
            dataTampil
              .slice((pagination - 1) * limit, (pagination - 1) * limit + limit)
              .map((item, index) => {
                return (
                  <Accordion allowToggle key={index}>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <AccordionIcon />
                          <div className="title-details text-xl">
                            <div className="title capitalize">{item.title}</div>
                          </div>
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
                            <div className="title-details font-semibold text-2xl capitalize">
                              {item.title}
                              <div className="idHelper">
                                <div className="idDetails flex gap-2 text-lg">
                                  <div className="idDetails-text">ID :</div>
                                  <div className="idDetails-text">
                                    {item._id}
                                  </div>
                                </div>
                              </div>
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
                                  className="button-details bg-yellow-500 p-2 rounded-lg w-32 text-xl"
                                  onClick={() => {
                                    console.log(item.status)
                                    unsuspendPost(item._id);
                                  }}
                                >
                                  Unsuspend
                                </button>
                              ) : (
                                <button
                                  className="button-details  bg-yellow-500 p-2 rounded-lg w-32 text-xl"
                                  onClick={() => {
                                    console.log(item.status)
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

          {dataTampil.length <= 0 && (
            <div className="noData flex justify-center items-center">
              <div className="noData-text text-2xl font-semibold">No Data</div>
            </div>
          )}

          <div className="flex justify-center items-center gap-5 w-full my-5">
            <button
              className="bg-navyblue-500 text-white text-2xl px-5 py-2 rounded-md"
              onClick={() => {
                if (pagination > 1) {
                  setPagination(pagination - 1);
                }
              }}
            >
              Prev
            </button>
            <span className="text-2xl text-navyblue-800 font-bold ">
              {pagination}
            </span>
            <button
              className="bg-navyblue-500 text-white text-2xl px-5 py-2 rounded-md"
              onClick={() => {
                if (pagination < totalPage) {
                  setPagination(pagination + 1);
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
