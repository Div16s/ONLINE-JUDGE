import { useRecoilValue } from 'recoil';
import { userAtom } from '../../atoms/userAtom';
import { Text, Image, Box, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import './home.css';

const MotionBox = motion(Box);

export const Home = () => {
  const user = useRecoilValue(userAtom);
  return (
    <Flex 
      className='home-container' 
      justifyContent='center' 
      alignItems='center' 
      minHeight='100vh' 
      position='relative'
    >
      <Box className='centered-text' textAlign='center' minHeight={'100vh'}>
        <Box className='home-page-text' maxWidth='800px' margin='0 auto' position='relative'>
        <Flex dir='row' gap={2} justifyContent={"center"} alignItems={"center"} mb={5}>
          <Text as='h1' color='green.400' w={420} fontFamily='Montserrat' fontWeight={"bold"}>
           {` cout << Welcome back ${user.name} << '\\n';`} 
          </Text>
          {/* <Image src='Chipset.png' w={20} h={20}/> */}
        </Flex>
          <Box
            position="absolute"
            left="0"
            bottom="0"
            transform="rotate(-90deg) translateX(-11%)"
            transformOrigin="bottom left"
            width="650px"
          >
            <Text as="h4" fontFamily="Montserrat" fontWeight="bold">
             {" < Unleash Your Code Wizardry in the CodeSphere /> "}
            </Text>
          </Box>
          <Box
            position="absolute"
            right="0"
            bottom="0"
            transform="rotate(90deg) translateX(10%)"
            transformOrigin="bottom right"
            width="650px"
          >
            <Text as="h4" fontFamily="Montserrat" fontWeight="bold">
              {" { Where Ideas Become Functional Art } "}
            </Text>
          </Box>
          <Image src='coding_bg2.png' w={500} h={500} />
        </Box>
      </Box>
    </Flex>
  );
};
