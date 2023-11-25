import NavigationAdmin from "../../../components/NavigationAdmin/NavigationAdmin";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
export default function MasterUser() {
  return (
    <>
      <NavigationAdmin />
      <div className="container-masterUser mb-10 min-h-[calc(100vh-5rem)] p-10">
        <div className="bg-ghostwhite-100 mx-7">
          <TableContainer>
            <Table variant="simple" size={"lg"} textAlign={"center"}>
              <Thead className="border-b-2 border-navyblue-600">
                <Tr>
                  <Th fontSize={"2xl"} w={"5%"} textAlign={"center"}>
                    No
                  </Th>
                  <Th fontSize={"2xl"} w={"20%"} textAlign={"center"}>
                    Name
                  </Th>
                  <Th fontSize={"2xl"} w={"20%"} textAlign={"center"}>
                    Email
                  </Th>
                  <Th fontSize={"2xl"} w={"20%"} textAlign={"center"}>
                    Member Since
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
                  <Td textAlign={"center"} fontSize={"xl"}>
                    1
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    Febrian Alexandro
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    <a href="mailto:sepuh.official.cs@gmail.com">
                      Febrianalexandro@sepuh.com
                    </a>
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    25 November 2023
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    Banned on 27 November 2023
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    <div className="buttonAction flex gap-2 items-center justify-center">
                      <button className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 w-20">
                        Ban
                      </button>
                      <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-600 w-20">
                        Edit
                      </button>
                    </div>
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    2
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    Felicia Pangestu
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    <a href="mailto:sepuh.official.cs@gmail.com">
                      Feliciapangestu@sepuh.com
                    </a>
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    25 November 2023
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    Banned on 27 November 2023
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    <div className="buttonAction flex gap-2 items-center justify-center">
                      <button className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 w-20">
                        Ban
                      </button>
                      <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-600 w-20">
                        Edit
                      </button>
                    </div>
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    3
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    Ivan Susanto
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    <a href="mailto:sepuh.official.cs@gmail.com">
                      Ivansusanto@sepuh.com
                    </a>
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    25 November 2023
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    Banned on 27 November 2023
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    <div className="buttonAction flex gap-2 items-center justify-center">
                      <button className="bg-navyblue-500 text-white rounded-md px-3 py-2 hover:bg-navyblue-600 w-20">
                        Unban
                      </button>
                      <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-600 w-20">
                        Edit
                      </button>
                    </div>
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    4
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    Jonathan Wilbert Gunawan
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    <a href="mailto:sepuh.official.cs@gmail.com">
                      Jonathanwilbert@sepuh.com
                    </a>
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    25 November 2023
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    Banned on 27 November 2023
                  </Td>
                  <Td textAlign={"center"} fontSize={"xl"}>
                    <div className="buttonAction flex gap-2 items-center justify-center">
                      <button className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 w-20">
                        Ban
                      </button>
                      <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-600 w-20">
                        Edit
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
