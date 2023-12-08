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
export default function PostingReports() {
  return (
    <>
      <div className="container-postingReports flex">
        <div className="sideBar w-1/5 bg-navyblue-700 h-screen static left-0">
          <NavigationAdmin />
        </div>
        <div className="right w-full pt-10 shadow-lg">
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
                    <TableHead className="text-2xl text-navyblue-800 w-1/5 font-bold text-center">
                      Name
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 w-1/5 font-bold text-center">
                      Member Since
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 font-bold text-center">
                      Previous Rank
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 font-bold text-center">
                      Rating
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-lg text-center">
                      1
                    </TableCell>
                    <TableCell className="font-medium text-lg text-center">
                      Febrian Alexandro
                    </TableCell>
                    <TableCell className="font-medium text-lg text-center">
                      25 November 2023
                    </TableCell>
                    <TableCell className="font-medium text-lg text-center">
                      <div className="arrow">
                        <span>8</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-lg text-center">
                      4.00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-lg text-center">
                      2
                    </TableCell>
                    <TableCell className="font-medium text-lg text-center">
                      Febrian Alexandro
                    </TableCell>
                    <TableCell className="font-medium text-lg text-center">
                      25 November 2023
                    </TableCell>
                    <TableCell className="font-medium text-lg text-center">
                      1000
                    </TableCell>
                    <TableCell className="font-medium text-lg text-center">
                      4.00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-lg text-center">
                      3
                    </TableCell>
                    <TableCell className="font-medium text-lg text-center">
                      Febrian Alexandro
                    </TableCell>
                    <TableCell className="font-medium text-lg text-center">
                      25 November 2023
                    </TableCell>
                    <TableCell className="font-medium text-lg text-center">
                      1000
                    </TableCell>
                    <TableCell className="font-medium text-lg text-center">
                      4.00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-lg text-center">
                      4
                    </TableCell>
                    <TableCell className="font-medium text-lg text-center">
                      Febrian Alexandro
                    </TableCell>
                    <TableCell className="font-medium text-lg text-center">
                      25 November 2023
                    </TableCell>
                    <TableCell className="font-medium text-lg text-center">
                      1000
                    </TableCell>
                    <TableCell className="font-medium text-lg text-center">
                      4.00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
