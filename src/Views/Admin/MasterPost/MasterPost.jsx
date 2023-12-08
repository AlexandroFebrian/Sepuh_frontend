import NavigationAdmin from "../../../components/NavigationAdmin/NavigationAdmin";
import FilteringAdmin from "../../../components/FilteringAdmin/FilteringAdmin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function MasterPost() {
  return (
    <>
      <div className="container-masterPost flex">
        <div className="sidebar w-1/5 bg-navyblue-700 h-screen static left-0">
          <NavigationAdmin />
        </div>

        <div className="right w-full pt-10 shadow-lg">
          <div className=" mb-10 min-h-[calc(100vh-5rem)] px-10 pb-10">
            <div className="bg-ghostwhite-100 mx-7">
              <Table className="w-full bg-ghostwhite-100 rounded-md">
                <TableHeader className="border-b-2 border-navyblue-600">
                  <TableRow>
                    <TableHead className="w-[100px] text-2xl text-navyblue-800 font-bold">
                      No
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 w-1/5 font-bold">
                      Name
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 w-1/5 font-bold">
                      Date Upload
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 font-bold">
                      Impressions
                    </TableHead>
                    <TableHead className="text-2xl text-navyblue-800 font-bold">
                      History Actions
                    </TableHead>
                    <TableHead className="text-center text-2xl text-navyblue-800 w-1/5 font-bold">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-lg">1</TableCell>
                    <TableCell className="font-medium text-lg">
                      Febrian Alexandro
                    </TableCell>
                    <TableCell className="font-medium text-lg">
                      25 November 2023
                    </TableCell>
                    <TableCell className="font-medium text-lg">1000</TableCell>
                    <TableCell className="font-medium text-lg">
                      Banned on 27 November 2023
                    </TableCell>
                    <TableCell className="font-medium text-lg">
                      <div className="buttonAction flex gap-2 items-center justify-center">
                        <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-600 w-24">
                          Suspend
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-lg">2</TableCell>
                    <TableCell className="font-medium text-lg">
                      Felicia Pangestu
                    </TableCell>
                    <TableCell className="font-medium text-lg">
                      25 November 2023
                    </TableCell>
                    <TableCell className="font-medium text-lg">1230</TableCell>
                    <TableCell className="font-medium text-lg">
                      Banned on 27 November 2023
                    </TableCell>
                    <TableCell className="font-medium text-lg">
                      <div className="buttonAction flex gap-2 items-center justify-center">
                        <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-600 w-24">
                          Suspend
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-lg">3</TableCell>
                    <TableCell className="font-medium text-lg">
                      Felicia Pangestu
                    </TableCell>
                    <TableCell className="font-medium text-lg">
                      25 November 2023
                    </TableCell>
                    <TableCell className="font-medium text-lg">1230</TableCell>
                    <TableCell className="font-medium text-lg">
                      Banned on 27 November 2023
                    </TableCell>
                    <TableCell className="font-medium text-lg">
                      <div className="buttonAction flex gap-2 items-center justify-center">
                        <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-600 w-24">
                          Suspend
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-lg">4</TableCell>
                    <TableCell className="font-medium text-lg">
                      Jonathan Wilbert Gunawan
                    </TableCell>
                    <TableCell className="font-medium text-lg">
                      25 November 2023
                    </TableCell>
                    <TableCell className="font-medium text-lg">1230</TableCell>
                    <TableCell className="font-medium text-lg">
                      Banned on 27 November 2023
                    </TableCell>
                    <TableCell className="font-medium text-lg">
                      <div className="buttonAction flex gap-2 items-center justify-center">
                        <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-600 w-24">
                          Suspend
                        </button>
                      </div>
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
