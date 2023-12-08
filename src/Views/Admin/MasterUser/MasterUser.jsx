import NavigationAdmin from "../../../components/NavigationAdmin/NavigationAdmin";
import FilteringAdmin from "../../../components/FilteringAdmin/FilteringAdmin";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MasterUserViewModel from "./MasterUserViewModel";
import { useEffect } from "react";

export default function MasterUser() {
  const dateFormat = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // const Users = MasterUserViewModel();
  // const banUserVM = MasterUserViewModel();
  // const unbanUserVM = MasterUserViewModel();
  // const Status = MasterUserViewModel();

  const { Users, BanUserVM, UnbanUserVM, Status, SetStatus } =
    MasterUserViewModel();
  const banUser = (email) => {
    // AKU GATAU KENAPA BENTUKNYA GINI HEHEHEHE
    BanUserVM(email);
  };

  const unbanUser = (email) => {
    UnbanUserVM(email);
  };

  useEffect(() => {
    document.title = "Master User - Sepuh";
  }, []);

  return (
    <>
      <div className="container-masteruser flex">
        <div className="sidebar w-1/5">
          <NavigationAdmin />
        </div>
        <div className="right w-full pt-10 shadow-lg">
          <div className="mb-10 min-h-[calc(100vh-5rem)] px-10 pb-10 w-full">
            <div className="mx-7">
              <Table className="w-full bg-ghostwhite-100 rounded-md">
                <TableHeader className="border-b-2 border-navyblue-600">
                  <TableRow>
                    <TableHead className="w-[100px] text-2xl text-navyblue-800 font-bold">
                      No
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 w-1/5 font-bold">
                      Name
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 w-1/5 font-bold">
                      Email
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 font-bold">
                      Member Since
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 font-bold">
                      History Actions
                    </TableHead>
                    <TableHead className="text-center text-2xl text-navyblue-800 w-1/5 font-bold">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-lg">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium text-lg">
                        {user.name}
                      </TableCell>
                      <TableCell className="font-medium text-lg">
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </TableCell>
                      <TableCell className="font-medium text-lg">
                        {dateFormat(user.create_at)}
                      </TableCell>
                      <TableCell className="font-medium text-lg">
                        {user.history.length > 0
                          ? `Banned on ${dateFormat(user.history)}`
                          : "Not banned"}
                      </TableCell>
                      <TableCell className="font-medium text-lg">
                        <div className="buttonAction flex gap-2 items-center justify-center">
                          {Status[index] === -1 && (
                            <button
                              className=" bg-navyblue-500 text-white rounded-md px-3 py-2 hover:bg-navyblue-600  w-20"
                              onClick={() => {
                                unbanUser(user.email);
                                Status[index] = 1;
                                SetStatus([...Status]);
                              }}
                            >
                              Unban
                            </button>
                          )}

                          {Status[index] === 1 && (
                            <button
                              className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 w-20"
                              onClick={() => {
                                banUser(user.email);
                                Status[index] = -1;
                                SetStatus([...Status]);
                              }}
                            >
                              Ban
                            </button>
                          )}

                          <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-600 w-20">
                            Edit
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
