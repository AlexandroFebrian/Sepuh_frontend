import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export default function FilteringAdmin() {
  {
    console.log(
      "FilteringAdmin.jsx jangan lupa dibenerin value select dan desainnya"
    );
  }

  return (
    <>
      <div className="container-filterAdmin  h-fit relative flex my-5">
        <div className="boxNavigationAdmin w-full flex justify-between mx-16 px-5 py-5">
          <div className="left flex gap-24">
            <div className="userDropdown flex gap-5 items-center">
              <p className="text-2xl font-sarabun font-semibold">User:</p>
              <select className="bg-ghostwhite-100 rounded-md px-3 py-2">
                <option value="freelancer">Freelancer</option>
                <option value="company">Company</option>
              </select>
            </div>
            <div className="orderByDropdown flex gap-5 items-center">
              <p className="text-2xl font-sarabun font-semibold">Order By:</p>
              <select className="bg-ghostwhite-100 rounded-md px-3 py-2">
                <option value="isiNanti">isiNanti</option>
                <option value="isiNanti">isiNanti</option>
              </select>
            </div>
            <div className="sortByDropdown flex gap-5 items-center">
              <p className="text-2xl font-sarabun font-semibold">Sort By:</p>
              <select className="bg-ghostwhite-100 rounded-md px-3 py-2">
                <option value="Descending">Descending</option>
                <option value="Ascending">Ascending</option>
              </select>
            </div>
          </div>

          <div className="searchBar flex gap-5 items-center w-1/4">
            <InputGroup borderRadius={10} size="md">
              <InputLeftElement
                pointerEvents="none"
                children={<Search2Icon color="navyblue.800" />}
              />
              <Input type="text" placeholder="Search" border="1px" />
            </InputGroup>
          </div>
        </div>
      </div>
    </>
  );
}
