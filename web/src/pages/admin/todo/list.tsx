import {
  Flex,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  chakra,
  Button,
  Container,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaCheck, FaPlus } from "react-icons/fa";
import api from "../../../services/api";
import * as moment from "moment";

const CFaEdit = chakra(FaEdit);
const CFaTrash = chakra(FaTrash);
const CFaCheck = chakra(FaCheck);
const CFaPlus = chakra(FaPlus);

export function TodoList() {
  const [authToken] = useState(localStorage.getItem("authToken"));
  const [taskList, setTaskList] = useState<any[]>([]);

  const toast = useToast();
  const navigate = useNavigate();

  const sortTasks = (tasks: any) => {
    const sorted = [...tasks].sort((task: any) => {
      if (task.finished_at) {
        return 1;
      } else if (moment(task.deadline).isAfter(moment())) {
        return -2;
      }
      return -1;
    });
    return sorted;
  };

  const taskBgColor = (task: any) => {
    let color = "inherit";
    if (task.finished_at) {
      color = "gray";
    } else if (moment(task.deadline).isAfter(moment())) {
      color = "red";
    }
    return color;
  };

  const getTasks = () => {
    api
      .get("/api/v1/tasks", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        const tasks = sortTasks(response.data.data);
        setTaskList(tasks);
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };

  const addTask = () => {
    navigate("/todo/add");
  };

  const editTask = (id: number) => {
    navigate(`/todo/edit/${id}`);
  };

  const deleteTask = (id: number) => {
    api
      .delete(`/api/v1/tasks/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        getTasks();
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };

  const finishTask = (id: number) => {
    api
      .put(`/api/v1/tasks/finish/${id}`, null, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        getTasks();
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
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
        <Heading>Todo List</Heading>
        <Container textAlign="right">
          <Link to={`/todo/add`}>
            <Button
              colorScheme="blue"
              size="md"
              onClick={() => {
                addTask();
              }}
            >
              <CFaPlus color="white" mr="2" />
              Cadastrar
            </Button>
          </Link>
        </Container>
        <TableContainer>
          <Table variant="simple" bgColor="white">
            <Thead>
              <Tr>
                <Th>Descrição</Th>
                <Th>Prazo</Th>
                <Th>Finalizo em</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {taskList.length > 0
                ? taskList.map((task) => (
                    <Tr
                      key={task.id}
                      style={{
                        backgroundColor: taskBgColor(task),
                      }}
                    >
                      <Td>{task.description}</Td>
                      <Td>{moment(task.deadline).format("DD/M/Y HH:mm")}</Td>
                      <Td>{task.finished_at}</Td>
                      <Td>
                        {!task.finished_at ? (
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
                            <Link to={`/todo/edit/${task.id}/${task.description}/${task.deadline}`}>
                              <Button
                                colorScheme="yellow"
                                size="xs"
                                onClick={() => {
                                  editTask(task.id);
                                }}
                              >
                                <CFaEdit color="black" />
                              </Button>
                            </Link>
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
                        ) : null}
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
