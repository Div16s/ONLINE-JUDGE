import React from 'react'
import { HStack, InputGroup } from '@chakra-ui/react'
import { InputRightElement } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Icon, SearchIcon } from '@chakra-ui/icons'
import { FilterPopover } from './FilterPopover'
export const Filters = ({columnFilters, setColumnFilters}) => {
    const problemName = columnFilters.find((filter) => filter.id === "Problem_name")?.value || "";
    const onFilterChange = (id,value) => setColumnFilters((prev) => prev.filter(
        (filter) => filter.id !== id).concat({id,value})
    );
    return (
        <HStack mb={6} >
            <InputGroup size={"sm"} maxW={"12rem"}>
                <InputRightElement pointerEvents="none">
                    <Icon as={SearchIcon} />
                </InputRightElement>
                <Input
                    type="text"
                    placeholder="Search Problem"
                    borderRadius={5}
                    value={problemName}
                    onChange={(e) => onFilterChange("Problem_name", e.target.value)}
                />
            </InputGroup>
            <FilterPopover columnFilters={columnFilters} setColumnFilters={setColumnFilters}/>
        </HStack>
    )
}
