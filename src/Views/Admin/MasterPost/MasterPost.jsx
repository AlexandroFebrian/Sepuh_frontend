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

export default function MasterPost() {
  const { Users } = MasterPostViewModel();
  const [ListUsers, setListUsers] = useState([]);
  const [postCompany, setPostCompany] = useState([]);
  const [postFreelancer, setPostFreelancer] = useState([]);
  const [post, setPost] = useState([]);

  const [pagination, setPagination] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(10);
  const [limit, setLimit] = useState(10);

  const [globalFilterValue, setGlobalFilterValue] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="relative mb-6h-fit">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg
            className="svg-icon search-icon"
            aria-labelledby="title desc"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 19.9 19.7"
            width="20"
            height="20"
          >
            <g className="search-path" fill="none" stroke="currentColor">
              <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
              <circle cx="8" cy="8" r="7" />
            </g>
          </svg>
        </div>
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
          className="border border-gray-300 text-gray-900 text-md block w-1/4 pl-10 p-2.5 rounded-md focus:ring-navyblue-500 focus:border-navyblue-500 focus:outline-none bg-ghostwhite-50"
        />
      </div>
    );
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("default", { month: "long" });
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

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

  const getHighestImpressions = (userEmail) => {
    const data = post.filter((item) => {
      return item.posted_by.email === userEmail;
    });
    const sortedData = data.sort((a, b) => {
      return b.visitor - a.visitor;
    });

    if (sortedData.length > 0) {
      return sortedData[0].visitor;
    } else {
      return 0;
    }
  };

  const getLatestDateUpload = (userEmail) => {
    const data = post.filter((item) => {
      return item.posted_by.email === userEmail;
    });
    const sortedData = data.sort((a, b) => {
      return new Date(b.posted_at) - new Date(a.posted_at);
    });

    if (sortedData.length > 0) {
      return formatDate(sortedData[0].posted_at);
    } else {
      return "-";
    }
  };

  useEffect(() => {
    const data = [...postCompany, ...postFreelancer];
    const sortedData = data.sort((a, b) => {
      console.log(a.posted_at);
      return new Date(b.posted_at) - new Date(a.posted_at);
    });
    setPost(sortedData);
    setTotalPage(Math.ceil(ListUsers.length / limit));
  }, [ListUsers]);

  useEffect(() => {
    setTimeout(() => {
      setListUsers(Users);
    }, 200);
  }, [Users]);

  useEffect(() => {
    const data = [...postCompany, ...postFreelancer];
    const sortedData = data.sort((a, b) => {
      console.log(a.posted_at);
      return new Date(b.posted_at) - new Date(a.posted_at);
    });
    setPost(sortedData);
  }, []);

  return (
    <>
      <div className="container-masterPost flex">
        <div className="sidebar w-1/6 fixed left-0">
          <NavigationAdmin />
        </div>

        <div className="right w-5/6 pt-10 absolute right-0">
          <div className="px-10 pb-10">
            <div className="top flex justify-between items-center w-full my-5 mx-7">
              <input
                type="text"
                placeholder="Search"
                className="w-1/4 bg-ghostwhite-100 rounded-md px-5 py-2"
                onChange={(e) => {
                  setGlobalFilterValue(e.target.value);
                }}
                defaultValue={globalFilterValue}
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
                  {ListUsers.slice(
                    (pagination - 1) * limit,
                    pagination * limit
                  ).map((user, index) => {
                    return (
                      <TableRow
                        key={index}
                        className="hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          window.location.href = `/admin/masterpost/details?email=${user.email}`;
                        }}
                      >
                        <TableCell className=" text-navyblue-800 text-2xl">
                          {index + 1}
                        </TableCell>
                        <TableCell className=" text-navyblue-800 text-2xl">
                          {user.name}
                        </TableCell>
                        <TableCell className=" text-navyblue-800 text-2xl">
                          {getLatestDateUpload(user.email)}
                        </TableCell>
                        <TableCell className=" text-navyblue-800 text-2xl">
                          {getHighestImpressions(user.email)} Visitor
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <div className="flex justify-center items-center gap-5 mt-10 ">
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

              {/*<DataTable
                value={Users}
                removableSort
                className="flex flex-col gap-5 p-datatable-sm w-full bg-ghostwhite-100 rounded-md p-5"
                paginator
                rows={10}
                rowsPerPageOptions={[10, 20, 30]}
                paginatorTemplate=" PrevPageLink PageLinks NextPageLink CurrentPageReport"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                emptyMessage="No users found"
                dataKey="id"
                filters={filters}
                filterDisplay="row"
                globalFilterFields={["email", "name"]}
                header={renderHeader()}
              >
                <Column
                  field="name"
                  header={
                    <span className="text-navyblue-800 font-bold mr-2 text-3xl font-sarabun">
                      Name
                    </span>
                  }
                  sortable
                  className="text-navyblue-800 text-2xl"
                />
                <Column
                  field="email"
                  header={
                    <span className="text-navyblue-800 font-bold mr-2 text-3xl font-sarabun">
                      Email
                    </span>
                  }
                  sortable
                  className="text-navyblue-800 text-2xl"
                />
                <Column
                  field="latest_date_upload"
                  header={
                    <span className="text-navyblue-800 font-bold mr-2 text-3xl font-sarabun">
                      Latest Date Upload
                    </span>
                  }
                  sortable
                  className="text-navyblue-800 text-2xl"
                  body={(rowData) => {
                    return getLatestDateUpload(rowData.email);
                  }}
                />
                <Column
                  field="highest_impressions"
                  // header="Highest Impressions"
                  header={
                    <span className="text-navyblue-800 font-bold mr-2 text-3xl font-sarabun">
                      Highest Impressions
                    </span>
                  }
                  sortable
                  className="text-navyblue-800 text-2xl"
                  body={(rowData) => {
                    return getHighestImpressions(rowData.email) + " Visitor";
                  }}
                />
              </DataTable>*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
