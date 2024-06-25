import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  Center,
  Grid,
  Box,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Spinner,
  Divider,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../atoms/userAtom';
import { useRef, useState, useEffect } from 'react';
import { usePreviewImg } from '../../hooks/usePreviewImg';
import { useShowToast } from '../../hooks/useShowToast';

const MotionBox = motion(Box);

export const UserProfileEdit = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    name: user.name,
    email: user.email,
    password: '',
  });
  const [analytics, setAnalytics] = useState(null);
  const showToast = useShowToast();
  const fileRef = useRef(null);
  const { handleImageChange, imgUrl } = usePreviewImg();
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/analytics/${user.email}`);
        const data = await res.json();
        console.log(data);
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, [user._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updating) return;
    setUpdating(true);

    try {
      const res = await fetch(`http://localhost:8000/api/user/profile/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
      });

      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }
      showToast('Success', data.message, 'success');
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setUpdating(false);
    }
  };



  const renderCircularProgress = (label, solved, total) => {
    let color;
    switch (label.toLowerCase()) {
      case 'easy':
        color = 'rgb(0, 187, 0)';
        break;
      case 'medium':
        color = '#ccbb11';
        break;
      case 'hard':
        color = 'red.500';
        break;
      default:
        color = 'gray.400';
    }
  
    return (
      <MotionBox
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        textAlign="center"
        p={4}
      >
        <CircularProgress value={(solved / total) * 100} size="120px" color={color}>
          <CircularProgressLabel fontWeight={"bold"} color={color}>{`${solved}/${total}`}</CircularProgressLabel>
        </CircularProgress>
        <Text mt={2} fontSize="lg" fontWeight={"bold"} color={color}>{label}</Text>
      </MotionBox>
    );
  };

return (
  <Flex minH={'100vh'} align={'center'} justify={'center'} bg='gray.900' p={6}>
    <Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={6} w='full' maxW='6xl'>
      <Box bg='gray.200' my={10} p={6} rounded='xl' bgGradient={['linear(to-b, black, gray.700)']}>
        <Heading color='white' mb={6} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Insights
        </Heading>
        {!analytics ? (
          <Center>
            <Spinner size='xl' color='white'/>
          </Center>
        ) : (
          <>
            <Text fontSize='xl' color='gray.900' p={1} w={"-moz-fit-content"} borderRadius={"sm"} bg={"white"} fontFamily={"monospace"} fontWeight={"bold"} mb={4}>
              Total Questions: {analytics.totalQuestions}
            </Text>
            <Text fontSize='lg' color='gray.50' fontFamily={"monospace"} fontWeight={"semi-bold"} mb={4}>
              Solved Questions: {analytics.solvedQuestions}
            </Text>
            <Divider color='gray.100' size={2} />
            <Heading color='white' fontSize={{ base: 'xl', sm: '2xl' }} mb={4}>
              Category Wise:
            </Heading>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {renderCircularProgress('Easy', analytics.easy.solved, analytics.easy.total)}
              {renderCircularProgress('Medium', analytics.medium.solved, analytics.medium.total)}
              {renderCircularProgress('Hard', analytics.hard.solved, analytics.hard.total)}
            </Grid>
          </>
        )}
      </Box>

      {/* User Profile Edit Form */}
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={4}
          w={'full'}
          bg='gray.50'
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={10}
          bgGradient={['linear(to-t, black, blue.800)']}
        >
          <Heading color='white' lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Edit Profile
          </Heading>
          <FormControl>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size={'xl'} boxShadow={'md'} src={imgUrl || user.profilePic} />
              </Center>
              <Center w='full'>
                <Button
                  w='full'
                  color={'gray.700'}
                  backgroundColor='gray.100'
                  _hover={{ backgroundColor: 'gray.300' }}
                  onClick={() => fileRef.current.click()}
                >
                  Change Avatar
                </Button>
                <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
              </Center>
            </Stack>
          </FormControl>
          <FormControl id='userName' isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder='UserName'
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              _placeholder={{ color: 'gray.500' }}
              type='text'
              variant={"filled"}
            />
          </FormControl>
          <FormControl id='email' isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              variant={"filled"}
              placeholder='your-email@example.com'
              _placeholder={{ color: 'gray.500' }}
              type='email'
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </FormControl>
          <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              variant={"filled"}
              placeholder='password'
              _placeholder={{ color: 'gray.500' }}
              type='password'
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w='full'
              _hover={{
                bg: 'red.500',
              }}
            >
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w='full'
              _hover={{
                bg: 'blue.500',
              }}
              isLoading={updating}
              type='submit'
            >
              Update
            </Button>
          </Stack>
        </Stack>
      </form>
    </Grid>
  </Flex>
);
};


// ------------------------------------------------------------------------------------------------ //

// import {
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
//   Stack,
//   Avatar,
//   Center,
// } from '@chakra-ui/react'
// import { useRecoilState } from 'recoil'
// import { userAtom } from '../../atoms/userAtom'
// import { useRef, useState } from 'react'
// import { usePreviewImg } from '../../hooks/usePreviewImg'
// import { useShowToast } from '../../hooks/useShowToast'

// export const UserProfileEdit = () => {
//   const [user, setUser] = useRecoilState(userAtom);
//   const [inputs, setInputs] = useState({
//     name: user.name,
//     email: user.email,
//     password: '',
//   })
//   const showToast = useShowToast();
//   const fileRef = useRef(null);
//   const { handleImageChange, imgUrl } = usePreviewImg();
//   const [updating, setUpdating] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (updating) return;
//     setUpdating(true);

//     try {
//       const res = await fetch(`http://localhost:8000/api/user/profile/${user._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ ...inputs, profilePic: imgUrl })
//       });

//       const data = await res.json();
//       console.log(data);
//       if (data.error) {
//         showToast('Error', data.error, 'error');
//         return;
//       }
//       showToast('Success', data.message, 'success');
//       localStorage.setItem('userInfo', JSON.stringify(data.user));
//       setUser(data.user);
//     } catch (error) {
//       showToast('Error', error.message, 'error');
//     } finally {
//       setUpdating(false);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <Flex
//         minH={'100vh'}
//         align={'center'}
//         justify={'center'}
//         bg='gray.900'
//       >
//         <Stack
//           spacing={4}
//           w={'full'}
//           maxW={'lg'}
//           bg='gray.50'
//           rounded={'xl'}
//           boxShadow={'lg'}
//           p={6}
//           my={12}>
//           <Heading color='black' lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
//             Edit Profile
//           </Heading>
//           <FormControl>
//             <Stack direction={['column', 'row']} spacing={6}>
//               <Center>
//                 <Avatar size={"xl"} boxShadow={"md"} src={imgUrl || user.profilePic} />
//               </Center>
//               <Center w="full">
//                 <Button w="full" color={"gray.700"} backgroundColor='gray.100' _hover={{"backgroundColor":"gray.200"}} onClick={() => fileRef.current.click()}>Change Avatar</Button>
//                 <Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
//               </Center>
//             </Stack>
//           </FormControl>
//           <FormControl id="userName" isRequired>
//             <FormLabel color={"gray.800"}>User name</FormLabel>
//             <Input
//               color={"black"}
//               placeholder="UserName"
//               value={inputs.name}
//               onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
//               _placeholder={{ color: 'gray.500' }}
//               type="text"
//             />
//           </FormControl>
//           <FormControl id="email" isRequired>
//             <FormLabel color={"gray.800"}>Email address</FormLabel>
//             <Input
//               color={"black"}
//               placeholder="your-email@example.com"
//               _placeholder={{ color: 'gray.500' }}
//               type="email"
//               value={inputs.email}
//               onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
//             />
//           </FormControl>
//           <FormControl id="password" isRequired>
//             <FormLabel color={"gray.800"}>Password</FormLabel>
//             <Input
//               color={"black"}
//               placeholder="password"
//               _placeholder={{ color: 'gray.500' }}
//               type="password"
//               onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
//             />
//           </FormControl>
//           <Stack spacing={6} direction={['column', 'row']}>
//             <Button
//               bg={'red.400'}
//               color={'white'}
//               w="full"
//               _hover={{
//                 bg: 'red.500',
//               }}>
//               Cancel
//             </Button>
//             <Button
//               bg={'blue.400'}
//               color={'white'}
//               w="full"
//               _hover={{
//                 bg: 'blue.500',
//               }}
//               isLoading={updating}
//               onClick={handleSubmit}
//             >
//               Update
//             </Button>
//           </Stack>
//         </Stack>
//       </Flex>
//     </form>
//   )
// }
