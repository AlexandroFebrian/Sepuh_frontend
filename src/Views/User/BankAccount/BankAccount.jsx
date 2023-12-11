import BankAccountViewModel from "./BankAccountViewModel";
import FreelancerProfileMenu from "../../../components/SidebarMenu/Freelancer/FreelancerProfileMenu/FreelancerProfileMenu";
import CompanyProfileMenu from "../../../components/SidebarMenu/Company/CompanyProfileMenu/CompanyProfileMenu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaCircleExclamation } from "react-icons/fa6";
import { Combobox } from "../../../components/ui/Combobox";
import { useState, useRef, useEffect } from "react";

export default function BankAccount() {
    const { isLogin, user, profileAccountNumber, setProfileAccountNumber, bankName, saveProfile } = BankAccountViewModel();
    // console.log(user);
    const [bank_name, setBank_name] = useState(user?.bank_name);
    // useEffect(() => {
    //     console.log(user?.accountNumber);
    // }, [user])
    // const accountNumber = useRef();
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
                        <div className="w-full py-6 px-10 bg-ghostwhite-100 rounded-md">
                            <h1 className="font-semibold text-xl">Bank Account</h1>

                            <div className="warningMessage">
                                <Alert className="w-full bg-yellow-500 py-3 px-3 mt-5 rounded-md flex items-center gap-3">
                                    <div className="left">
                                        <FaCircleExclamation className="text-3xl" />
                                    </div>
                                    <div className="right">
                                        <AlertTitle>
                                            Please ensure that the bank account you input is correct.
                                        </AlertTitle>
                                        <AlertDescription>
                                            The bank account you input will be used to receive your
                                            income.
                                        </AlertDescription>
                                    </div>
                                </Alert>
                            </div>

                            <div className="w-full mt-5 flex flex-col gap-1">
                                <label
                                    htmlFor="bankName"
                                    className="font-semibold text-lg text-navyblue-800"
                                >
                                    Bank Name <span className="text-red-500">*</span>
                                </label>
                                <Combobox
                                    title={"Select Bank Name"}
                                    placeholder={"Select Bank Name"}
                                    empty={"Bank Name not found"}
                                    headerClassName={"w-72 shadow-lg "}
                                    contentClassName={" pt-1 border-0 "}
                                    className="w-full rounded-md border-2 border-navyblue-600 py-2 px-3 mt-2"
                                    items={bankName}
                                    item={user?.bank_name}
                                    onSelect={(value) => {
                                        setBank_name(value);
                                        console.log(value);
                                    }}
                                />
                            </div>

                            <div className="w-full mt-5 ">
                                <label
                                    htmlFor="accountNumber"
                                    className="font-semibold text-lg text-navyblue-800"
                                >
                                    Account Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="accountNumber"
                                    id="accountNumber"
                                    className="w-full rounded-md border-2 border-navyblue-600 py-2 px-3 mt-2"
                                    placeholder="610xxxx"
                                    onChange={(e) => {setProfileAccountNumber(e.target.value)}}
                                    defaultValue={profileAccountNumber}
                                />
                            </div>

                            <div className="w-full mt-5 flex justify-end">
                                <button
                                    className="w-28 py-1 bg-navyblue-700 text-white rounded-lg font-semibold text-xl border-2 border-navyblue-700 hover:bg-navyblue-800 hover:text-white duration-300 font-mono"
                                    onClick={() => {
                                        saveProfile(bank_name, profileAccountNumber);
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right w-1/5"></div>
            </div>
        </>
    );
}
