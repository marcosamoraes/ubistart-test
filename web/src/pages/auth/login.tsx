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
import { FaLock, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

const CFaEnvelope = chakra(FaEnvelope);
const CFaLock = chakra(FaLock);

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const login = (e: any) => {
    e.preventDefault();
    const data = { email: email, password: password };
    api
      .post("/api/v1/auth/authenticate", data)
      .then((response) => {
        console.log(response);
        const token = response.data.access_token;
        localStorage.setItem('authToken', token);
        toast({
          title: 'Sucesso!',
          description: "Login realizado com sucesso!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate("/todo/list");
      })
      .catch((error) => {
        toast({
          title: 'Erro!',
          description: 'Falha ao realizar login, tente novamente',
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
        <Heading color="teal.400">TODO List - Login</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={login}>
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
                Entrar
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        <Link color="teal.500" to="/register">
          Cadastre-se
        </Link>
      </Box>
    </Flex>
  );
}
