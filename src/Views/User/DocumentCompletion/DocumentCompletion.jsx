import DocumentCompletionViewModel from "./DocumentCompletionViewModel";
import FreelancerProfileMenu from "../../../components/SidebarMenu/Freelancer/FreelancerProfileMenu/FreelancerProfileMenu";
import CompanyProfileMenu from "../../../components/SidebarMenu/Company/CompanyProfileMenu/CompanyProfileMenu";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaCircleExclamation } from "react-icons/fa6";

import { useRef } from "react";

export default function DocumentCompletion() {
  const { isLogin, user, updateDocument } = DocumentCompletionViewModel();

  const identityCard = useRef(null);
  const curriculumVitae = useRef(null);
  const portofolio = useRef(null);

  const handleUpdateDocument = () => {
    const data = {
      identityCard: identityCard.current.files[0],
      curriculumVitae: curriculumVitae.current.files[0],
      portofolio: portofolio.current.value,
    };

    if (data.identityCard && data.curriculumVitae && data.portofolio) {
      updateDocument(data);
    } else {
      alert("Please fill all fields");
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
                          <p className="text-xs text-gray-400">SVG, PNG, JPG</p>
                        </div>
                        <input
                          id="FileIdentityCard"
                          type="file"
                          className="hidden"
                          ref={identityCard}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="curriculumvitae px-10 py-4">
                  <h2 className="font-semibold text-xl text-navyblue-800">
                    Curriculum Vitae <span className="text-red-500">*</span>
                  </h2>
                  <div className="w-full h-full mt-2">
                    <div className="flex items-center justify-center w-full">
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
                        />
                      </label>
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
