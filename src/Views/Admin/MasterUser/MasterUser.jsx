import NavigationAdmin from "../../../components/NavigationAdmin/NavigationAdmin";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

import MasterUserViewModel from "./MasterUserViewModel";
import { useEffect, useState } from "react";

export default function MasterUser() {
  const [ListUsers, setListUsers] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const { Users, BanUserVM, UnbanUserVM } = MasterUserViewModel();
  const banUser = (email) => {
    BanUserVM(email);
  };

  const unbanUser = (email) => {
    UnbanUserVM(email);
  };

  useEffect(() => {
    document.title = "Master User - Sepuh";
  }, []);

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
          className="border border-gray-300 text-gray-900 text-md block w-1/4 pl-10 p-2.5 rounded-md focus:ring-navyblue-500 focus:border-navyblue-500 focus:outline-none"
        />
      </div>
    );
  };

  const formatdate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <>
      <div className="container-masteruser flex">
        <div className="sidebar w-1/5">
          <NavigationAdmin />
        </div>
        <div className="right w-full pt-10 shadow-lg">
          <div className="mb-10 min-h-[calc(100vh-5rem)] px-10 pb-10 w-full">
            <div className="mx-7">
              <div className="title">
                <h2 className="text-3xl font-semibold">Master User</h2>
              </div>
              <div className="table w-full rounded-md my-5 ">
                <DataTable
                  value={Users}
                  removableSort
                  className="flex flex-col gap-5 p-datatable-sm w-full bg-ghostwhite-100 rounded-md p-5"
                  paginator
                  rows={10}
                  rowsPerPageOptions={[10, 20, 30]}
                  paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                  emptyMessage="No users found"
                  dataKey="id"
                  filters={filters}
                  filterDisplay="row"
                  globalFilterFields={[
                    "email",
                    "name",
                    "role",
                    "create_at",
                    "update_at",
                  ]}
                  header={renderHeader()}
                >
                  <Column
                    field="email"
                    // header="Email"
                    header={
                      <span className="text-navyblue-800 font-bold mr-2 text-3xl font-sarabun">
                        Email
                      </span>
                    }
                    sortable
                    className="w-1/5 text-xl font-sarabun"
                  ></Column>
                  <Column
                    field="name"
                    header={
                      <span className="text-navyblue-800 font-bold mr-2 text-3xl font-sarabun">
                        Name
                      </span>
                    }
                    sortable
                    className="w-1/6 text-xl font-sarabun"
                  ></Column>
                  <Column
                    field="role"
                    header={
                      <span className="text-navyblue-800 font-bold mr-2 text-3xl font-sarabun">
                        Role
                      </span>
                    }
                    sortable
                    className="w-1/6 text-xl font-sarabun"
                  ></Column>
                  <Column
                    field="create_at"
                    header={
                      <span className="text-navyblue-800 font-bold mr-2 text-3xl font-sarabun">
                        Member Since
                      </span>
                    }
                    sortable
                    className="w-1/5 text-xl font-sarabun"
                    body={(rowData) => {
                      return (
                        <span className="font-medium h-full">
                          {formatdate(rowData.create_at)}
                        </span>
                      );
                    }}
                  ></Column>
                  <Column
                    field="update_at"
                    header={
                      <span className="text-navyblue-800 font-bold mr-2 text-3xl font-sarabun">
                        History Action
                      </span>
                    }
                    sortable
                    className="w-1/4"
                    body={(rowData) => {
                      return (
                        <span className="font-medium h-full text-xl font-sarabun">
                          {rowData.create_at != rowData.update_at
                            ? `Banned on ${formatdate(rowData.update_at)}`
                            : "Not banned"}
                        </span>
                      );
                    }}
                  ></Column>
                  <Column
                    className="w-1/6"
                    header={
                      <span className="text-navyblue-800 font-bold mr-2 text-3xl font-sarabun ">
                        Action
                      </span>
                    }
                    body={(rowData) => {
                      return (
                        <div className="buttonAction flex gap-2 text-xl font-sarabun">
                          {rowData.status === -1 && (
                            <button
                              className=" bg-navyblue-500 text-white rounded-md px-3 py-2 hover:bg-navyblue-600  w-24"
                              onClick={() => {
                                unbanUser(rowData.email);
                                rowData.status = 1;
                                setListUsers([...ListUsers]);
                              }}
                            >
                              Unban
                            </button>
                          )}

                          {rowData.status === 1 && (
                            <button
                              className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 w-24"
                              onClick={() => {
                                banUser(rowData.email);
                                rowData.status = -1;
                                setListUsers([...ListUsers]);
                              }}
                            >
                              Ban
                            </button>
                          )}
                        </div>
                      );
                    }}
                  ></Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
