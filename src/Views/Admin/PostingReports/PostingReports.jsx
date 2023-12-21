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
import PostingReportsViewModelAdmin from "./PostingReportsViewModel";

const baseURL = import.meta.env.VITE_BACKEND_URL;
import Axios from "axios";

export default function PostingReports() {
  const { Users } = PostingReportsViewModelAdmin();

  const [post, setPost] = useState([]);
  const [postCompany, setPostCompany] = useState([]);
  const [postFreelancer, setPostFreelancer] = useState([]);
  const [listUser, setListUser] = useState([]);
  const getPostsCompany = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(`${baseURL}/posts/company`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setPostCompany(res.data);
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  };

  const getPostsFreelancer = async () => {
    const token = localStorage.getItem("token");
    const response = await Axios.get(`${baseURL}/posts/freelancer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setPostFreelancer(res.data);
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    getPostsCompany();
    getPostsFreelancer();

    const data = [...postCompany, ...postFreelancer];
    const sortedData = data.sort((a, b) => {
      return new Date(b.posted_at) - new Date(a.posted_at);
    });
    setPost(sortedData);
  }, []);

  const getHighestPostRating = (email) => {
    const data = post.filter((item) => item.posted_by.email === email);
    const sortedData = data.sort((a, b) => {
      return b.avg_rating - a.avg_rating;
    });

    if (sortedData.length > 0) {
      return sortedData[0].avg_rating;
    } else {
      return 0;
    }
  };

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
  const [monthNow, setMonthNow] = useState("All Time");

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

  const handleRoleChange = (e) => {
    const value = e;

    if (value === "freelancer") {
      const data = Users.filter((user) => user.role === "Freelancer");
      setListUser(data);
    } else if (value === "company") {
      const data = Users.filter((user) => user.role === "Company");
      setListUser(data);
    } else {
      setListUser(Users);
    }
  };

  useEffect(() => {
    setListUser(Users);
  }, [Users]);

  useEffect(() => {
    const data = [...postCompany, ...postFreelancer];
    const sortedData = data.sort((a, b) => {
      return new Date(b.posted_at) - new Date(a.posted_at);
    });
    setPost(sortedData);
  }, [postCompany, postFreelancer]);

  return (
    <>
      <div className="container-postingReports flex">
        <div className="sideBar w-1/6 bg-navyblue-700 h-screen fixed left-0">
          <NavigationAdmin />
        </div>
        <div className="right w-5/6 pt-10 absolute right-0">
          <div className="mb-10 min-h-[calc(100vh-5rem)] px-10 pb-10">
            <div className="container m-7 mx-auto">
              <div className="top flex justify-between items-center w-full my-10">
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
                    {/* Top 5 Most Popular Posting October 2023 */}
                    Top 5 Most Popular Posting of {monthNow}
                  </h2>
                </div>
                <div className="right w-1/4 flex justify-end">
                  <Select
                    onValueChange={handleRoleChange}
                    className="w-1/2 bg-navyblue-800 text-white text-lg py-6"
                  >
                    <SelectTrigger className="w-1/2 bg-navyblue-800 text-white text-lg py-6">
                      <SelectValue placeholder="All User" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All User">All User</SelectItem>
                      <SelectItem value="freelancer">Freelancer</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Table className="w-full bg-ghostwhite-100 rounded-md">
                <TableHeader className="border-b-2 border-navyblue-600">
                  <TableRow>
                    <TableHead className="w-[100px] text-2xl text-navyblue-800 font-bold text-center">
                      No
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 w-1/3 font-bold text-center">
                      Name
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 w-1/3 font-bold text-center">
                      Member Since
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 font-bold text-center">
                      Average Rating
                    </TableHead>
                  </TableRow>
                </TableHeader>

                {listUser.map((user, index) => (
                  <TableBody key={index}>
                    <TableRow>
                      <TableCell className="font-medium text-lg text-center">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium text-lg text-center">
                        {user.name}
                      </TableCell>
                      <TableCell className="font-medium text-lg text-center">
                        {formatDate(user.create_at)}
                      </TableCell>
                      <TableCell className="font-medium text-lg text-center flex justify-center items-center gap-2">
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
                        </span>
                        {getHighestPostRating(user.email)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
