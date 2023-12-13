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
    const response = await Axios.get(`${baseURL}posts/${emailSearch}`)
      .then((res) => {
        setDataDetailsPost(res.data);
        return res.data;
      })
      .catch((err) => {
        return err;
      });
    console.log(response);
  };

  useEffect(() => {
    getDetailsPost();
  }, [emailSearch]);

  return (
    <>
      <div className="container-details">
        {/* 
        {
        "_id": "656d59c028ccaf0df87bd4b1",
        "title": "nyoba post kelas",
        "duration": 0,
        "duration_type": "",
        "description": "sfas ddasd as\r\ndas\r\n as\r\ndasd\r\ndasd \r\ndqwdwqd qwd qw\r\nd ",
        "image": [
            "http://localhost:3000/api/public/1701665216203-366641969.png",
            "http://localhost:3000/api/public/1701665216221-962164971.png"
        ],
        "hashtag": [
            "machine learning",
            "deep learning"
        ],
        "min_price": 50000,
        "max_price": 125000,
        "avg_rating": 5,
        "visitor": 0,
        "comments": [
            {
                "user_id": "655f1b6fe3d040af039b2dbc",
                "rating": 5,
                "comment": "coba",
                "_id": "65719a9cd15af9551d6de265",
                "comment_by": {
                    "name": "Febrian test",
                    "email": "cingkwok120@gmail.com",
                    "headline": "Machine Learning Cohort at Bangkit Academy",
                    "date_of_birth": "2003-02-03T00:00:00.000Z",
                    "bio": "My name is Febrian Alexandro, a passionate individual eager to delve into the realm of machine learning. I identify as male and was born on Feb 5, 2003, in Indonesia.",
                    "city": "Surabaya",
                    "country": "Indonesia",
                    "last_education": "High School",
                    "current_education": "Bachelor Degree",
                    "field_of_study": "Informatics",
                    "year_of_study": 4,
                    "header_picture": "1701052123170-374891553.png",
                    "profile_picture": "http://localhost:3000/api/public/1701003158363-700251323.png",
                    "role": "Freelancer",
                    "balance": 4990000,
                    "rating": 4.25,
                    "account_number": "523413412",
                    "notifications": [
                        {
                            "from": "65640432f45407c27c6f34c4",
                            "message": "Accept",
                            "category": "Applied Accept",
                            "link": "/api/users/profile/febrian.a21@mhs.istts.ac.id",
                            "read": false,
                            "time": "2023-12-13T14:53:27.969Z",
                            "status": 0,
                            "_id": "6579c56741311ad91257f0d2"
                        }
                    ],
                    "employees": [],
                    "history": [],
                    "list": [
                        "6568738211e18ecbb22db2ed",
                        "657811ef3591b62498509ddc",
                        "6568733011e18ecbb22db2d8"
                    ],
                    "status": 1,
                    "create_at": "2023-11-26T09:50:44.299Z",
                    "update_at": "2023-12-13T14:53:27.970Z",
                    "bank_name": "bank bni",
                    "curriculum_vitae": "",
                    "identity_card": "",
                    "portofolio": "123123"
                }
            }
        ],
        "posted_by": {
            "name": "Febrian test",
            "email": "cingkwok120@gmail.com",
            "headline": "Machine Learning Cohort at Bangkit Academy",
            "date_of_birth": "2003-02-03T00:00:00.000Z",
            "bio": "My name is Febrian Alexandro, a passionate individual eager to delve into the realm of machine learning. I identify as male and was born on Feb 5, 2003, in Indonesia.",
            "city": "Surabaya",
            "country": "Indonesia",
            "last_education": "High School",
            "current_education": "Bachelor Degree",
            "field_of_study": "Informatics",
            "year_of_study": 4,
            "header_picture": "1701052123170-374891553.png",
            "profile_picture": "http://localhost:3000/api/public/1701003158363-700251323.png",
            "role": "Freelancer",
            "balance": 4990000,
            "rating": 4.25,
            "account_number": "523413412",
            "notifications": [
                {
                    "from": "65640432f45407c27c6f34c4",
                    "message": "Accept",
                    "category": "Applied Accept",
                    "link": "/api/users/profile/febrian.a21@mhs.istts.ac.id",
                    "read": false,
                    "time": "2023-12-13T14:53:27.969Z",
                    "status": 0,
                    "_id": "6579c56741311ad91257f0d2"
                }
            ],
            "employees": [],
            "history": [],
            "list": [
                "6568738211e18ecbb22db2ed",
                "657811ef3591b62498509ddc",
                "6568733011e18ecbb22db2d8"
            ],
            "status": 1,
            "create_at": "2023-11-26T09:50:44.299Z",
            "update_at": "2023-12-13T14:53:27.970Z",
            "bank_name": "bank bni",
            "curriculum_vitae": "",
            "identity_card": "",
            "portofolio": "123123"
        },
        "status": 1,
        "posted_at": "2023-12-04T04:46:56.248Z"
    },
        */}

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
