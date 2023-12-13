/* eslint-disable no-unused-vars */
import NavigationAdmin from "../../../components/NavigationAdmin/NavigationAdmin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IncomeReportsViewModelAdmin from "./IncomeReportsViewModelAdmin";

export default function IncomeReports() {
  const { activity } = IncomeReportsViewModelAdmin();
  console.log("activity", activity);

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

  const adminFee = (amount) => {
    const adminFee = (amount * 10) / 100;
    return formatAmount(adminFee);
  };

  return (
    <>
      <div className="container-incomeReports flex min-h-screen max-h-fit">
        <div className="sidebar w-1/5">
          <NavigationAdmin />
        </div>

        <div className="right w-full pt-10 shadow-lg">
          <div className=" mb-10 px-10 pb-10">
            <div className="m-7">
              <div className="title">
                <h2 className="text-3xl font-semibold">Income Reports</h2>
              </div>
              <div className="filter flex gap-10 w-full bg-ghostwhite-100 px-5 py-3 my-2 rounded-md">
                <button className="bg-navyblue-800 text-white text-lg py-2 px-10 rounded-full">
                  Table
                </button>
                <button className="text-navyblue-800 text-lg py-2 px-10 rounded-full border-2 border-navyblue-800 hover:bg-navyblue-800 hover:text-white">
                  Chart
                </button>
                <button className="text-navyblue-800 text-lg py-2 px-10 rounded-full border-2 border-navyblue-800 hover:bg-navyblue-800 hover:text-white">
                  Graph
                </button>
              </div>

              <div className="table w-full bg-ghostwhite-100 rounded-md my-5">
                <Table>
                  <TableHeader className="border-b-2 border-navyblue-600">
                    <TableRow>
                      <TableHead className="text-2xl text-navyblue-800 font-bold">
                        Invoice ID
                      </TableHead>
                      <TableHead className="text-2xl text-navyblue-800 font-bold">
                        Date
                      </TableHead>
                      <TableHead className="text-2xl text-navyblue-800 font-bold">
                        Company
                      </TableHead>
                      <TableHead className="text-2xl text-navyblue-800 font-bold">
                        Freelancer
                      </TableHead>
                      <TableHead className="text-2xl text-navyblue-800 font-bold">
                        Total Amount
                      </TableHead>
                      <TableHead className="text-2xl text-navyblue-800 font-bold">
                        Admin fee
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activity.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-lg text-navyblue-800">
                            {item.invoice}
                          </TableCell>
                          <TableCell className="font-medium text-lg text-navyblue-800">
                            {/* {item.start_date} */}
                            {formatDate(item.start_date)}
                          </TableCell>
                          <TableCell className="font-medium text-lg text-navyblue-800">
                            {item.company}
                          </TableCell>
                          <TableCell className="font-medium text-lg text-navyblue-800">
                            {item.freelancer}
                          </TableCell>
                          <TableCell className="font-medium text-lg text-navyblue-800">
                            {formatAmount(item.deal_price)}
                          </TableCell>
                          <TableCell className="font-medium text-lg text-navyblue-800">
                            {adminFee(item.deal_price)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
