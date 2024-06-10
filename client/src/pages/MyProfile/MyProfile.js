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
} from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { userAtom } from '../../atoms/userAtom'
import { useRef, useState } from 'react'
import { usePreviewImg } from '../../hooks/usePreviewImg'
import { useShowToast } from '../../hooks/useShowToast'

export const UserProfileEdit = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    name: user.name,
    email: user.email,
    password: '',
  })
  const showToast = useShowToast();
  const fileRef = useRef(null);
  const { handleImageChange, imgUrl } = usePreviewImg();
  const [updating, setUpdating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updating) return;
    setUpdating(true);

    try {
      const res = await fetch(`http://localhost:8000/profile/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...inputs, profilePic: imgUrl })
      });

      const data = await res.json();
      console.log(data);
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
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg='gray.900'
      >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'lg'}
          bg='gray.50'
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading color='black' lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Edit Profile
          </Heading>
          <FormControl>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size={"xl"} boxShadow={"md"} src={imgUrl || user.profilePic} />
              </Center>
              <Center w="full">
                <Button w="full" color={"gray.700"} backgroundColor='gray.100' _hover={{"backgroundColor":"gray.200"}} onClick={() => fileRef.current.click()}>Change Avatar</Button>
                <Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel color={"gray.800"}>User name</FormLabel>
            <Input
              color={"black"}
              placeholder="UserName"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel color={"gray.800"}>Email address</FormLabel>
            <Input
              color={"black"}
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel color={"gray.800"}>Password</FormLabel>
            <Input
              color={"black"}
              placeholder="password"
              _placeholder={{ color: 'gray.500' }}
              type="password"
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              isLoading={updating}  
              onClick={handleSubmit}
            >
              Update
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  )
}
