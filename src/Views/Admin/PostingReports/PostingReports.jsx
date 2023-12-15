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
      console.log(a.posted_at);
      return new Date(b.posted_at) - new Date(a.posted_at);
    });
    setPost(sortedData);
  }, []);

  const getAverageRating = (email) => {
    const data = post.filter((item) => item.posted_by.email === email);
    const banyakData = data.length;
    const jumlahRating = data.reduce((acc, item) => {
      return acc + item.avg_rating;
    }, 0);
    const average = jumlahRating / banyakData;
    return average.toFixed(2);
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("default", { month: "long" });
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <>
      <div className="container-postingReports flex">
        <div className="sideBar w-1/6 bg-navyblue-700 h-screen static left-0">
          <NavigationAdmin />
        </div>
        <div className="right w-5/6 pt-10 absolute right-0">
          <div className="mb-10 min-h-[calc(100vh-5rem)] px-10 pb-10">
            <div className="container m-7 mx-auto">
              <div className="top flex justify-between items-center w-full my-10">
                <div className="left w-1/4">
                  <Select>
                    <SelectTrigger className="w-1/2 bg-navyblue-800 text-white text-lg py-6">
                      <SelectValue placeholder="October 2023" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthyear">Month Year</SelectItem>
                      <SelectItem value="bulantahun">Bulan Tahun</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="center w-1/2">
                  <h2 className="text-4xl font-semibold text-center">
                    Top 5 Most Popular Posting October 2023
                  </h2>
                </div>
                <div className="right w-1/4 flex justify-end">
                  <Select>
                    <SelectTrigger className="w-1/2 bg-navyblue-800 text-white text-lg py-6">
                      <SelectValue placeholder="Freelancer" />
                    </SelectTrigger>
                    <SelectContent>
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

                {Users.map((user, index) => (
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
                      <TableCell className="font-medium text-lg text-center">
                        {getAverageRating(user.email)}
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
