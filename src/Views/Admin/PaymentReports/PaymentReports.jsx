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
export default function PaymentReports() {
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

  return (
    <>
      <NavigationAdmin />
      <div className="container-incomeReports mb-10 min-h-[calc(100vh-5rem)] px-10 pb-10">
        <div className="m-7">
          <div className="top">
            <Table>
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
                <TableRow>
                  <TableCell className="font-medium text-lg text-navyblue-800">
                    02 / 11 / 2022
                  </TableCell>
                  <TableCell className="font-medium text-lg text-navyblue-800">
                    PT. Dwimuria Investama
                  </TableCell>
                  <TableCell className="font-medium text-lg text-navyblue-800">
                    Felicia Pangestu
                  </TableCell>
                  <TableCell className="font-bold text-lg text-green-500">
                    Success
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
                    Felicia Pangestu
                  </TableCell>
                  <TableCell className="font-bold text-lg text-red-500">
                    Failed
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
