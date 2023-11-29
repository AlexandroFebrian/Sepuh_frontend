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
export default function IncomeReports() {
  const formatDescription = (description) => {
    if (description.length > 85) {
      return description.substring(0, 85) + "...";
    } else {
      return description;
    }
  };

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

  console.log(
    "Function of format amount and format description is available. TOLONG DIPAKE"
  );

  return (
    <>
      <NavigationAdmin />
      <div className="container-incomeReports mb-10 min-h-[calc(100vh-5rem)] px-10 pb-10">
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
                    Income Date
                  </TableHead>
                  <TableHead className="text-2xl text-navyblue-800 w-1/5 font-bold">
                    Company Name
                  </TableHead>
                  <TableHead className="text-2xl text-navyblue-800 w-1/2 font-bold">
                    Description
                  </TableHead>
                  <TableHead className="text-2xl text-navyblue-800 w-1/6 font-bold">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-lg text-navyblue-800">
                    02 / 11 / 2022
                  </TableCell>
                  <TableCell className="font-medium text-lg text-navyblue-800">
                    PT. Dwimuria Investama
                  </TableCell>
                  <TableCell className="font-medium text-lg text-navyblue-800">
                    {formatDescription(
                      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa, odit! Qui recusandae vitae quae et ducimus ratione ab expedita error quo quasi sapiente cum dignissimos fuga laborum culpa alias veritatis, optio obcaecati temporibus pariatur voluptates ipsum saepe. Impedit, ratione aliquid recusandae nulla vero eos accusamus suscipit? Fugit, a. Consequatur, voluptatum?"
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-lg text-navyblue-800">
                    {formatAmount(1000000)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-lg text-navyblue-800">
                    02 / 11 / 2022
                  </TableCell>
                  <TableCell className="font-medium text-lg text-navyblue-800">
                    PT. HM Sampoerna Tbk.
                  </TableCell>
                  <TableCell className="font-medium text-lg text-navyblue-800">
                    {formatDescription(
                      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa, odit! Qui recusandae vitae quae et ducimus ratione ab expedita error quo quasi sapiente cum dignissimos fuga laborum culpa alias veritatis, optio obcaecati temporibus pariatur voluptates ipsum saepe. Impedit, ratione aliquid recusandae nulla vero eos accusamus suscipit? Fugit, a. Consequatur, voluptatum?"
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-lg text-navyblue-800">
                    {formatAmount(500000)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
