/* eslint-disable no-unused-vars */
import NavigationAdmin from "../../../components/NavigationAdmin/NavigationAdmin";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { useEffect, useState } from "react";
import PaymentReportsViewModelAdmin from "./PaymentReportsViewModel";
export default function PaymentReports() {
  const { activity } = PaymentReportsViewModelAdmin();
  const [ListActivity, setListActivity] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(10);
  const [limit, setLimit] = useState(10);
  const [globalFilterValue, setGlobalFilterValue] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    setTotalData(activity.length);
    setListActivity(activity);
  }, [activity]);

  const formatAmount = (amount) => {
    const amountString = amount.toString();
    const amountLength = amountString.length;
    let amountFormatted = "";
    for (let i = 0; i < amountLength; i++) {
      if ((amountLength - i) % 3 === 0 && i !== 0) {
        amountFormatted += ".";
      }
      amountFormatted += amountString[i];
    }
    amountFormatted = "Rp. " + amountFormatted + ",00";
    return amountFormatted;
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("default", { month: "long" });
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

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

  return (
    <>
      <div className="container-masterPost flex">
        <div className="sidebar w-1/6 fixed left-0">
          <NavigationAdmin />
        </div>

        <div className="right w-5/6 pt-10 absolute right-0">
          <div className="mb-10 px-10 pb-10">
            <div className="m-7">
              <div className="top">
                {/* <Table>
                  <TableHeader className="border-b-2 border-navyblue-600">
                    <TableRow>
                      <TableHead className="text-2xl text-navyblue-800 font-bold">
                        Payment date
                      </TableHead>
                      <TableHead className="text-2xl text-navyblue-800 w-1/5 font-bold">
                        Company Name
                      </TableHead>
                      <TableHead className="text-2xl text-navyblue-800 w-1/5 font-bold">
                        Freelancer
                      </TableHead>
                      <TableHead className="text-2xl text-navyblue-800 w-1/5 font-bold">
                        Status
                      </TableHead>
                      <TableHead className="text-2xl text-navyblue-800 w-1/5 font-bold">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {ListActivity.slice(0, limit).map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-lg text-navyblue-800">
                            {formatDate(item.start_date)}
                          </TableCell>
                          <TableCell className="font-medium text-lg text-navyblue-800">
                            {item.company.name}
                          </TableCell>
                          <TableCell className="font-medium text-lg text-navyblue-800">
                            {item.freelancer.name}
                          </TableCell>
                          {item.status === 2 ? (
                            <TableCell className="font-bold text-lg text-green-500">
                              Success
                            </TableCell>
                          ) : (
                            <TableCell className="font-bold text-lg text-red-500">
                              Failed
                            </TableCell>
                          )}
                          <TableCell className="font-medium text-lg text-navyblue-800">
                            {formatAmount(item.deal_price)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table> */}

                <div className="table w-full rounded-md my-5 ">
                  <DataTable
                    value={ListActivity}
                    removableSort
                    className="flex flex-col gap-5 w-full bg-ghostwhite-100 rounded-md p-5"
                    paginator
                    rows={20}
                    rowsPerPageOptions={[10, 20, 30]}
                    paginatorTemplate=" PrevPageLink PageLinks NextPageLink CurrentPageReport"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} data"
                    emptyMessage="No data found"
                    dataKey="id"
                    filters={filters}
                    filterDisplay="row"
                    globalFilterFields={[
                      "start_date",
                      "company.name",
                      "freelancer.name",
                      "status",
                      "deal_price",
                    ]}
                    header={renderHeader()}
                  >
                    <Column
                      header={
                        <span className="text-navyblue-800 font-bold mr-2 text-3xl font-sarabun border-navyblue-700">
                          Payment date
                        </span>
                      }
                      body={(rowData) => {
                        return (
                          <span className="font-medium h-full">
                            {formatDate(rowData.start_date)}
                          </span>
                        );
                      }}
                      sortable
                      className="w-1/4 text-xl font-sarabun"
                    ></Column>
                    <Column
                      field="company.name"
                      header={
                        <span className="text-navyblue-800 font-bold mr-2 text-3xl font-sarabun">
                          Company Name
                        </span>
                      }
                      sortable
                      className="w-1/4 text-xl font-sarabun"
                    ></Column>
                    <Column
                      field="freelancer.name"
                      header={
                        <span className="text-navyblue-800 font-bold mr-2 text-3xl font-sarabun">
                          Freelancer
                        </span>
                      }
                      sortable
                      className="w-1/4 text-xl font-sarabun"
                    ></Column>
                    <Column
                      field="deal_price"
                      header={
                        <span className="text-navyblue-800 font-bold mr-2 text-3xl font-sarabun">
                          Amount
                        </span>
                      }
                      sortable
                      className="w-1/5 text-xl font-sarabun"
                      body={(rowData) => {
                        return (
                          <span className="font-medium h-full">
                            {formatAmount(rowData.deal_price)}
                          </span>
                        );
                      }}
                    ></Column>
                    <Column
                      header={
                        <span className="text-navyblue-800 font-bold mr-2 text-3xl font-sarabun">
                          Status
                        </span>
                      }
                      body={(rowData) => {
                        return (
                          <span className="font-medium h-full">
                            {rowData.status === 2 ? (
                              <span className="font-bold text-lg text-green-500">
                                Success
                              </span>
                            ) : (
                              <span className="font-bold text-lg text-red-500">
                                Failed
                              </span>
                            )}
                          </span>
                        );
                      }}
                      sortable
                      className="w-1/6 text-xl font-sarabun"
                    ></Column>
                  </DataTable>
                </div>
                {/* <div className="pagination flex justify-end mt-5">
                  <div className="pagination-container flex gap-3">
                    <div className="pagination-button flex justify-center items-center bg-navyblue-700 text-white rounded-lg w-10 h-10">
                      <button
                        className="font-bold text-2xl"
                        onClick={() => {
                          if (pagination > 1) {
                            setPagination(pagination - 1);
                          }
                        }}
                      >
                        -
                      </button>
                    </div>
                    <div className="pagination-number flex justify-center items-center bg-navyblue-700 text-white rounded-lg w-10 h-10">
                      <button className="font-bold text-2xl">
                        {pagination}
                      </button>
                    </div>
                    <div className="pagination-button flex justify-center items-center bg-navyblue-700 text-white rounded-lg w-10 h-10">
                      <button
                        className="font-bold text-2xl"
                        onClick={() => {
                          if (pagination < totalPage) {
                            setPagination(pagination + 1);
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
