import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

const CFaUserAlt = chakra(FaUserAlt);
const CFaEnvelope = chakra(FaEnvelope);
const CFaLock = chakra(FaLock);

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const register = (e: any) => {
    e.preventDefault();
    const data = { name: name, email: email, password: password };
    api
      .post("/api/v1/auth/register", data)
      .then((response) => {
        toast({
          title: 'Sucesso!',
          description: response.data,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate("/login");
      })
      .catch((error) => {
        toast({
          title: 'Erro!',
          description: 'E-mail já cadastrado',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      });
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">TODO List - Cadastro</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={register}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Nome"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaEnvelope color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Cadastrar
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        <Link color="teal.500" to="/login">
          Fazer Login
        </Link>
      </Box>
    </Flex>
  );
}
