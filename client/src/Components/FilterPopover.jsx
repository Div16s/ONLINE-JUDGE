import React from 'react'
import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { IoFilterSharp } from "react-icons/io5";
import {Text} from '@chakra-ui/react'
import { VStack, Flex } from '@chakra-ui/react'

const VerdictItem = ({verdict, setColumnFilters}) => {
    return (
        <Flex align="center" cursor={"pointer"} fontWeight={"bold"} borderRadius={5}
            _hover={{bg: "gray.700"}} p={1.5}
            onClick={
                () => {
                    setColumnFilters((prev) => prev.filter((filter) => filter.id !== "Verdict").concat({id: "Verdict", value: verdict.name}))
                }
            }
        >
            {verdict.name === "AC" ? <Text className='m-auto p-auto' color={"green.400"}>{verdict.name}</Text> : <Text className='m-auto p-auto' color={"red.400"}>{verdict.name}</Text>}
        </Flex>
    )
}

const Verdict = [{id:1,name:"AC"},{id:2,name:"WA"}];

export const FilterPopover = ({columnFilters, setColumnFilters}) => {
    return (
        <Popover isLazy>
            <PopoverTrigger>
                <Button size={"sm"} bg={"gray.800"} _hover={{bg:"gray.700"}} color={"white"} leftIcon={<IoFilterSharp />} fontSize={18}>
                    Filter
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody bg={"gray.800"}>
                    <Text fontSize="md" fontWeight="bold" mb={4}>
                        Filter By:
                    </Text>
                    <Text fontWeight="bold" color="gray.400" mb={1}>
                        Verdict
                    </Text>
                    <VStack align="flex-start" spacing={2}>
                        {Verdict.map((Verdict) => <VerdictItem verdict={Verdict} key={Verdict.id} setColumnFilters={setColumnFilters}/>)}
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
