import NavigationAdmin from "../../../components/NavigationAdmin/NavigationAdmin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MasterPostViewModel from "./MasterPostViewModel";
export default function MasterPost() {
  const { Users } = MasterPostViewModel();

  return (
    <>
      <div className="container-masterPost flex">
        <div className="sidebar w-1/5">
          <NavigationAdmin />
        </div>

        <div className="right w-full pt-10 shadow-lg">
          <div className="px-10 pb-10">
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
                {/* <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-lg">1</TableCell>
                    <TableCell className="font-medium text-lg">
                      Febrian Alexandro
                    </TableCell>
                    <TableCell className="font-medium text-lg">
                      25 November 2023
                    </TableCell>
                    <TableCell className="font-medium text-lg">1000</TableCell>
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
                  </TableRow>
                </TableBody> */}

                <TableBody>
                  {Users.map((user, index) => (
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
                        {user.date}
                      </TableCell>
                      <TableCell className="font-medium text-lg">
                        {user.impression}
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
