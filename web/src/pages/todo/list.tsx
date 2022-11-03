import {
  Flex,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
  chakra,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import api from "../../services/api";
import * as moment from "moment";

const CFaEdit = chakra(FaEdit);
const CFaTrash = chakra(FaTrash);
const CFaCheck = chakra(FaCheck);

export function TodoList() {
  const [authToken] = useState(localStorage.getItem("authToken"));
  const [taskList, setTaskList] = useState<any[]>([]);

  const toast = useToast();
  const navigate = useNavigate();

  const getTasks = () => {
    api
      .get("/api/v1/tasks", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        setTaskList(response.data.data);
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };

  const editTask = (id: number) => {};

  const deleteTask = (id: number) => {
    
  };

  const finishTask = (id: number) => {
    
  };

  useEffect(() => {
    getTasks();
  }, []);

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
        <h1>Todo List</h1>
        <TableContainer>
          <Table variant="simple" bgColor="white">
            <Thead>
              <Tr>
                <Th>Descrição</Th>
                <Th>Prazo</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {taskList.length > 0
                ? taskList.map((task) => (
                    <Tr key={task.id}>
                      <Td>{task.description}</Td>
                      <Td>{moment(task.deadline).format("DD/M/Y HH:mm")}</Td>
                      <Td>
                        <Stack spacing={4} direction="row" align="center">
                          <Button
                            colorScheme="green"
                            size="xs"
                            onClick={() => {
                              finishTask(task.id);
                            }}
                          >
                            <CFaCheck color="white" />
                          </Button>
                          <Button
                            colorScheme="yellow"
                            size="xs"
                            onClick={() => {
                              editTask(task.id);
                            }}
                          >
                            <CFaEdit color="black" />
                          </Button>
                          <Button
                            colorScheme="red"
                            size="xs"
                            onClick={() => {
                              deleteTask(task.id);
                            }}
                          >
                            <CFaTrash color="white" />
                          </Button>
                        </Stack>
                      </Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </Flex>
  );
}
