import NavigationAdmin from "../../../components/NavigationAdmin/NavigationAdmin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import UserReportsViewModel from "./UserReportsViewModel";

export default function UserReports() {
  const { Users } = UserReportsViewModel();

  const [listUser, setListUser] = useState([]);
  const [monthNow, setMonthNow] = useState("All Time");

  const formatDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("default", { month: "long" });
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const uniqueMonthsAndYears = new Set();
  Users.map((user, index) => {
    const date = new Date(user.create_at);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    uniqueMonthsAndYears.add(`${month} ${year}`);
  });

  uniqueMonthsAndYears.add("All Time");

  useEffect(() => {
    setListUser(Users);
  }, [Users]);

  const handleChangeSelect = (e) => {
    const value = e;

    if (value !== "All Time") {
      const data = Users.filter((user) => {
        const date = new Date(user.create_at);
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        return `${month} ${year}` === value;
      });

      setListUser(data);
      setMonthNow(value);
    } else {
      setListUser(Users);
      setMonthNow(value);
    }
  };

  return (
    <>
      <div className="container-userReports flex">
        <div className="sidebar w-1/6 bg-navyblue-700 h-screen fixed left-0">
          <NavigationAdmin />
        </div>

        <div className="right w-5/6 pt-10 absolute right-0">
          <div className=" mb-10 px-10 pb-10">
            <div className="container m-7 mx-auto">
              <div className="top flex items-center w-full my-10">
                <div className="left w-1/4">
                  <Select onValueChange={handleChangeSelect}>
                    <SelectTrigger className="w-3/4 bg-navyblue-800 text-white text-lg py-6">
                      <SelectValue placeholder="Member Since" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(uniqueMonthsAndYears).map(
                        (monthYear, index) => (
                          <SelectItem key={index} value={monthYear}>
                            {monthYear}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="center w-1/2">
                  <h2 className="text-4xl font-semibold text-center">
                    {/* `Top 5 Most Popular Users  */}
                    {monthNow === "All Time"
                      ? "Top 5 Most Popular Users of All Time"
                      : `Top 5 Most Popular Users of ${monthNow}`}
                  </h2>
                </div>
              </div>

              <Table className="w-full bg-ghostwhite-100 rounded-md shadow-lg">
                <TableHeader className="border-b-2 border-navyblue-600">
                  <TableRow>
                    <TableHead className="w-[100px] text-2xl text-navyblue-800 font-bold text-center">
                      No
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 w-1/4 font-bold text-center">
                      Name
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 w-1/2 font-bold text-center">
                      Member Since
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 w-1/2 font-bold text-center">
                      Rating
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listUser.slice(0, 5).map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-lg text-center">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium text-lg text-center">
                        {user.name}
                      </TableCell>
                      <TableCell className="font-medium text-lg text-center">
                        {/* {user.create_at} */}
                        {formatDate(user.create_at)}
                      </TableCell>
                      <TableCell className="font-medium text-lg text-center">
                        {/* {user.rating} */}
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current text-yellow-400"
                          >
                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                          </svg>

                          {user.rating}
                        </span>
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
