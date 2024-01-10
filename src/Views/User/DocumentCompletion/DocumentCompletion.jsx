import DocumentCompletionViewModel from "./DocumentCompletionViewModel";
import FreelancerProfileMenu from "../../../components/SidebarMenu/Freelancer/FreelancerProfileMenu/FreelancerProfileMenu";
import CompanyProfileMenu from "../../../components/SidebarMenu/Company/CompanyProfileMenu/CompanyProfileMenu";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaCircleExclamation } from "react-icons/fa6";

import { useRef, useState } from "react";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export default function DocumentCompletion() {
  const { isLogin, user, updateDocument, checkToken } =
    DocumentCompletionViewModel();
  const [tempIDCard, setTempIDCard] = useState(null);
  const [tempCV, setTempCV] = useState(null);

  const identityCard = useRef();
  const curriculumVitae = useRef();
  const portofolio = useRef();

  const handleUpdateDocument = () => {
    const data = {
      identity_card: tempIDCard,
      curriculum_vitae: tempCV,
      portofolio: portofolio.current.value,
    };

    if (
      !data.identity_card ||
      !data.curriculum_vitae ||
      data.portofolio == ""
    ) {
      alert("All data must be filled!");
      return;
    } else {
      updateDocument(data);
      checkToken();
    }
  };

  const formatName = (name) => {
    if (name.length > 15) {
      return name.substr(0, 15) + "...";
    } else {
      return name;
    }
  };

  return (
    <>
      <div className=" h-fit relative flex">
        <div className="left w-1/5 ">
          <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem]">
            {isLogin && user?.role == "Freelancer" && <FreelancerProfileMenu />}
            {isLogin && user?.role == "Company" && <CompanyProfileMenu />}
          </div>
        </div>
        <div className="mid w-3/5">
          <div className=" min-h-[calc(100vh-5rem)] h-fit border-l-2 border-navyblue-600 z-0 px-10 py-10">
            <div className="w-full rounded py-6 px-10">
              <h1 className="font-semibold text-xl">Document Completion</h1>
              <div className="warningMessage">
                <Alert className="w-full bg-yellow-500 py-5 px-3 mt-5 rounded-md flex items-center gap-3">
                  <div className="left">
                    <FaCircleExclamation className="text-3xl " />
                  </div>
                  <div className="right">
                    <AlertTitle>
                      Complete your profile and documents to enroll in the
                      program.
                    </AlertTitle>
                    <AlertDescription>
                      Your Information will be securely stored. Please ensure
                      that the documents you submit are accurate and up to date.
                    </AlertDescription>
                  </div>
                </Alert>
              </div>

              <div className="w-full mt-5 bg-ghostwhite-100 h-full rounded-md">
                <div className="identitycard px-10 py-4">
                  <h2 className="font-semibold text-xl text-navyblue-800">
                    Identity Card <span className="text-red-500">*</span>
                  </h2>
                  <div className="w-full h-full mt-2">
                    <div className="flex items-center justify-center w-full">
                      {user?.identity_card || tempIDCard ? (
                        <div className="bg-ghostwhite-50 flex flex-col items-center justify-center w-full h-64 border-dashed border-2 border-navyblue-600 rounded-md ">
                          <div className="flex items-center justify-between px-2 py-5 h-full w-full">
                            <img
                              src={
                                user?.identity_card == ""
                                  ? URL.createObjectURL(tempIDCard)
                                  : // : `http://localhost:3000/api/public/${user?.identity_card}`
                                    `${baseURL}/public/${user?.identity_card}`
                              }
                              alt="identity card"
                              className="w-1/2 h-full object-cover"
                            />

                            <div className="button w-1/2 flex items-center justify-center ">
                              <input
                                type="file"
                                id="files"
                                className="hidden"
                                onChange={(e) => {
                                  setTempIDCard(e.target.files[0]);
                                }}
                                ref={identityCard}
                                accept="image/*"
                              />
                              <label
                                htmlFor="files"
                                className="w-1/2 h-fit flex items-center justify-center bg-navyblue-600 text-white rounded-md py-2 px-4 hover:bg-navyblue-800 duration-300 text-xl"
                              >
                                <span className="font-semibold w-fit">
                                  {tempIDCard
                                    ? formatName(tempIDCard.name)
                                    : "Change"}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <label
                          htmlFor="FileIdentityCard"
                          className="flex flex-col items-center justify-center w-full h-64 border-dashed cursor-pointer bg-ghostwhite-50 hover:bg-ghostwhite-200 duration-300 border-2 border-navyblue-600 rounded-md "
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-400">
                              SVG, PNG, JPG
                            </p>
                          </div>
                          <input
                            id="FileIdentityCard"
                            type="file"
                            className="hidden"
                            ref={identityCard}
                            onChange={(e) => {
                              console.log("e", e.target.files[0]);
                              setTempIDCard(e.target.files[0]);
                            }}
                          />
                        </label>
                      )}

                      {/* {tempIDCard && user?.identity_card == "" && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="bg-ghostwhite-50 flex flex-col items-center justify-center w-full h-64 border-dashed border-2 border-navyblue-600 rounded-md ">
                            <div className="flex items-center justify-between px-2 py-5 h-full w-full">
                              <img
                                src={URL.createObjectURL(tempIDCard)}
                                alt="identity card"
                                className="w-1/2 h-full object-cover"
                              />

                              <div className="button w-1/2 flex items-center justify-center ">
                                <input
                                  type="file"
                                  id="files"
                                  className="hidden"
                                  onChange={(e) => {
                                    setTempIDCard(e.target.files[0]);
                                    console.log(e.target.files[0]);
                                  }}
                                  ref={identityCard}
                                />
                                <label
                                  htmlFor="files"
                                  className="w-1/2 h-fit flex items-center justify-center bg-navyblue-600 text-white rounded-md py-2 px-4 hover:bg-navyblue-800 duration-300 text-xl"
                                >
                                  <span className="font-semibold w-fit">
                                    {tempIDCard
                                      ? formatName(tempIDCard.name)
                                      : "Change"}
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
                <div className="curriculumvitae px-10 py-4">
                  <h2 className="font-semibold text-xl text-navyblue-800">
                    Curriculum Vitae <span className="text-red-500">*</span>
                  </h2>
                  <div className="w-full h-full mt-2">
                    <div className="flex items-center justify-center w-full">
                      {user?.curriculum_vitae || tempCV ? (
                        <div className="bg-ghostwhite-50 flex flex-col items-center justify-center w-full h-64 border-dashed border-2 border-navyblue-600 rounded-md ">
                          <div className="flex items-center justify-around px-2 py-5 h-full w-full">
                            <div className="left flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <span className="ml-2 font-semibold">
                                {user?.curriculum_vitae == ""
                                  ? formatName(tempCV.name)
                                  : formatName(user?.curriculum_vitae)}
                              </span>
                            </div>

                            <div className="button w-1/2 flex flex-col items-center justify-center ">
                              <div className="files w-full flex items-center justify-center">
                                <input
                                  type="file"
                                  id="cv"
                                  className="hidden"
                                  onChange={(e) => {
                                    setTempCV(e.target.files[0]);
                                  }}
                                  accept=".pdf"
                                  ref={curriculumVitae}
                                />
                                <label
                                  htmlFor="cv"
                                  className="w-1/2 h-fit flex items-center justify-center bg-navyblue-600 text-white rounded-md py-2 px-4 hover:bg-navyblue-800 duration-300 text-xl"
                                >
                                  <span className="font-semibold w-fit">
                                    {tempCV
                                      ? formatName(tempCV.name)
                                      : "Change"}
                                  </span>
                                </label>
                              </div>
                              <span className="helperText text-xs text-gray-500 ml-2">
                                PDF
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <label
                          htmlFor="FileCurriculumVitae"
                          className="flex flex-col items-center justify-center w-full h-64 border-dashed cursor-pointer bg-ghostwhite-50 hover:bg-ghostwhite-200 duration-300 border-2 border-navyblue-600 rounded-md "
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-400">PDF</p>
                          </div>
                          <input
                            id="FileCurriculumVitae"
                            type="file"
                            className="hidden"
                            ref={curriculumVitae}
                            onChange={(e) => {
                              setTempCV(e.target.files[0]);
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
                <div className="Portofolio px-10 py-4">
                  <h2 className="font-semibold text-xl text-navyblue-800">
                    Portofolio <span className="text-red-500">*</span>
                  </h2>
                  <div className="w-full h-full mt-2">
                    <div className="flex items-center justify-center w-full">
                      <textarea
                        name="portofolio"
                        id="portofolio"
                        cols="30"
                        rows="10"
                        className="w-full h-full border-2 border-navyblue-600 rounded-md p-2 resize-none"
                        placeholder="https://www.portofolio.com"
                        ref={portofolio}
                        defaultValue={user?.portofolio}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-end px-10 py-3">
                  <button
                    className="bg-navyblue-600 text-white w-32 py-2 rounded-md hover:bg-navyblue-800 duration-300"
                    onClick={handleUpdateDocument}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right w-1/5"></div>
      </div>
    </>
  );
}
