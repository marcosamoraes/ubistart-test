import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export function TodoAdd() {
  const [authToken] = useState(localStorage.getItem("authToken"));
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const storeTask = (e: any) => {
    e.preventDefault();
    const data = { description: description, deadline: deadline };
    api
      .post("/api/v1/tasks", data, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        toast({
          title: "Sucesso!",
          description: response.data,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/todo/list");
      })
      .catch((error) => {
        toast({
          title: "Erro!",
          description: "Falha ao cadastrar tarefa, tente novamente",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
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
        <Heading color="teal.400">Cadastro</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={storeTask}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    type="datetime-local"
                    placeholder="Prazo"
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                  />
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
    </Flex>
  );
}
