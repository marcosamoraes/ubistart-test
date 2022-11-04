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
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

export function TodoEdit() {
  const [authToken] = useState(localStorage.getItem("authToken"));
  const {id, description, deadline} = useParams();
  let [descriptionEdit, setDescription] = useState(description);
  let [deadlineEdit, setDeadline] = useState(deadline);

  const toast = useToast();
  const navigate = useNavigate();

  const updateTask = (e: any) => {
    e.preventDefault();
    const data = { description: descriptionEdit, deadline: deadlineEdit };
    api
      .put(`/api/v1/tasks/${id}`, data, {
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
          description: "Falha ao editar tarefa, tente novamente",
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
          <form onSubmit={updateTask}>
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
                    value={descriptionEdit}
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
                    value={deadlineEdit}
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
                Editar
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
