import NavigationAdmin from "../../../components/NavigationAdmin/NavigationAdmin";
import FilteringAdmin from "../../../components/FilteringAdmin/FilteringAdmin";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
export default function MasterPost() {
  return (
    <>
      <NavigationAdmin />
      <FilteringAdmin />
      <div className="container-masterUser mb-10 min-h-[calc(100vh-5rem)] p-10">
        <div className="bg-ghostwhite-100 mx-7">
          <TableContainer>
            <Table variant="simple" size={"lg"}>
              <Thead className="border-b-2 border-navyblue-600">
                <Tr>
                  <Th fontSize={"2xl"} w={"5%"}>
                    No
                  </Th>
                  <Th fontSize={"2xl"} w={"20%"}>
                    Name
                  </Th>
                  <Th fontSize={"2xl"} w={"20%"}>
                    Date Upload
                  </Th>
                  <Th fontSize={"2xl"} w={"20%"}>
                    Impressions
                  </Th>
                  <Th fontSize={"2xl"} w={"20%"} textAlign={"center"}>
                    History Actions
                  </Th>
                  <Th fontSize={"2xl"} w={"15%"} textAlign={"center"}>
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* DUMMY DATA */}
                <Tr>
                  <Td fontSize={"xl"}>1</Td>
                  <Td fontSize={"xl"}>Febrian Alexandro</Td>
                  <Td fontSize={"xl"}>25 November 2023</Td>
                  <Td fontSize={"xl"}>1000</Td>
                  <Td fontSize={"xl"}>Banned on 27 November 2023</Td>
                  <Td fontSize={"xl"}>
                    <div className="buttonAction flex gap-2 items-center justify-center">
                      <button className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 w-20">
                        Ban
                      </button>
                      <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-600 w-24">
                        Suspend
                      </button>
                    </div>
                  </Td>
                </Tr>
                <Tr>
                  <Td fontSize={"xl"}>2</Td>
                  <Td fontSize={"xl"}>Felicia Pangestu</Td>
                  <Td fontSize={"xl"}>25 November 2023</Td>
                  <Td fontSize={"xl"}>1230</Td>
                  <Td fontSize={"xl"}>Banned on 27 November 2023</Td>
                  <Td fontSize={"xl"}>
                    <div className="buttonAction flex gap-2 items-center justify-center">
                      <button className="bg-navyblue-500 text-white rounded-md px-3 py-2 hover:bg-navyblue-600 w-20">
                        Unban
                      </button>
                      <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-600 w-24">
                        Suspend
                      </button>
                    </div>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
