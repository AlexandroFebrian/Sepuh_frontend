import NavigationAdmin from "../../../components/NavigationAdmin/NavigationAdmin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import MasterPostViewModel from "./MasterPostViewModel";
import Axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL;
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";

export default function MasterPost() {
  const { Users } = MasterPostViewModel();

  const [posts, setPosts] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [ListUsers, setListUsers] = useState([]);

  const fetchPosts = async (email) => {
    try {
      const response = await Axios.get(`${baseURL}/posts/${email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        setPosts(res.data);
        return res.data;
      });
      return response;
    } catch (err) {
      return err;
    }
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("default", { month: "long" });
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    return `${day} ${month} ${year}`;
  };
  useEffect(() => {
    Users.map((user, index) => {
      console.log("user", user);
      fetchPosts(user.email);
    });

    setListUsers(Users);
  }, [Users]);

  useEffect(() => {
    if (globalFilterValue) {
      const _filters = { ...filters };

      _filters["global"].value = globalFilterValue;

      setFilters(_filters);
      setListUsers(
        Users.filter((user) => {
          return (
            user.name.toLowerCase().includes(globalFilterValue.toLowerCase()) ||
            user.email.toLowerCase().includes(globalFilterValue.toLowerCase())
          );
        })
      );
    } else {
      setListUsers(Users);
    }
  }, [globalFilterValue]);

  return (
    <>
      <div className="container-masterPost flex">
        <div className="sidebar w-1/5">
          <NavigationAdmin />
        </div>

        <div className="right w-full pt-10 shadow-lg">
          <div className="px-10 pb-10">
            <div className="top flex justify-between items-center w-full my-5 mx-7">
              <input
                type="text"
                placeholder="Search"
                className="w-1/4 bg-ghostwhite-100 rounded-md px-5 py-2"
                onChange={(e) => {
                  setGlobalFilterValue(e.target.value);
                }}
              />
            </div>

            <div className="mx-7">
              <Table className="w-full bg-ghostwhite-100 rounded-md">
                <TableHeader className=" border-b-2 border-navyblue-600">
                  <TableRow>
                    <TableHead className="w-[100px] text-2xl text-navyblue-800 font-bold">
                      No
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 w-1/3 font-bold">
                      Name
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 w-1/3 font-bold">
                      Latest Date Upload
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 font-bold">
                      Highest Impressions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {ListUsers.map((user, index) => (
                    <TableRow
                      key={index}
                      onClick={() => {
                        console.log(
                          "Navigating to:",
                          `/admin/masterpost/details?email=${user.email}`
                        );

                        window.location.href = `/admin/masterpost/details?email=${user.email}`;
                      }}
                    >
                      <TableCell className="font-medium text-lg">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium text-lg">
                        {user.name}
                      </TableCell>
                      <TableCell className="font-medium text-lg">
                        {posts[index]?.posted_at
                          ? formatDate(posts[index]?.posted_at)
                          : "No Post"}
                      </TableCell>
                      <TableCell className="font-medium text-lg">
                        {posts[index]?.visitor
                          ? posts[index]?.visitor + " Visitor"
                          : "0 Visitor"}
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
