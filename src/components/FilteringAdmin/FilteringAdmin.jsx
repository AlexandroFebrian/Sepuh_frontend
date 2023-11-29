/* eslint-disable react/no-children-prop */
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilteringAdmin() {
  return (
    <>
      <div className="container-filterAdmin  h-fit relative flex my-5">
        <div className="boxNavigationAdmin w-full flex justify-between mx-16 px-5 py-5">
          <div className="left flex gap-14 w-3/4 pr-16">
            <div className="userDropdown flex items-center w-1/3 ">
              <p className="text-2xl font-sarabun font-semibold w-1/4">User:</p>
              <Select>
                <SelectTrigger className="w-1/2 bg-navyblue-800 text-white text-md">
                  <SelectValue placeholder="Freelancer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="orderByDropdown flex items-center w-1/3 ">
              <p className="text-2xl font-sarabun font-semibold w-1/3">
                Order By:
              </p>
              <Select>
                <SelectTrigger className="w-1/2 bg-navyblue-800 text-white text-md">
                  <SelectValue placeholder="Descending" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ascending">Ascending</SelectItem>
                  <SelectItem value="descending">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="orderByDropdown flex items-center w-1/3 ">
              <p className="text-2xl font-sarabun font-semibold w-1/4">
                Sort By:
              </p>
              <Select>
                <SelectTrigger className="w-1/2 bg-navyblue-800 text-white text-md">
                  <SelectValue placeholder="ISINANTI" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ISINANTI">ISINANTI</SelectItem>
                  <SelectItem value="ISINANTI">ISINANTI</SelectItem>
                </SelectContent>
              </Select>
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
