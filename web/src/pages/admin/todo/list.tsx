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
import { FaFilter } from "react-icons/fa";
import api from "../../../services/api";
import * as moment from "moment";

const CFaFilter = chakra(FaFilter);

export function TodoList() {
  const [authToken] = useState(localStorage.getItem("authToken"));
  const [taskList, setTaskList] = useState<any[]>([]);
  const [allTasks, setAllTasks] = useState<any[]>([]);
  const [lateTasksFiltered, setLateTasksFiltered] = useState<boolean>(false);

  const toast = useToast();
  const navigate = useNavigate();

  const sortTasks = (tasks: any) => {
    const sorted = [...tasks].sort((task: any) => {
      if (task.finished_at) {
        return 1;
      } else if (moment().isAfter(moment(task.deadline))) {
        return -1;
      }
      return 0;
    });
    return sorted;
  };

  const taskBgColor = (task: any) => {
    let color = "inherit";
    if (task.finished_at) {
      color = "gray";
    } else if (moment().isAfter(moment(task.deadline))) {
      color = "red";
    }
    return color;
  };

  const filterLateTasks = () => {
    if (!lateTasksFiltered) {
      setAllTasks([...taskList]);
      const tasks = [...taskList].filter((task: any) => {
        return moment().isAfter(moment(task.deadline));
      });
      setLateTasksFiltered(true);
      return setTaskList(tasks);
    } else {
      setLateTasksFiltered(false);
      return setTaskList(allTasks);
    }
  };

  const getTasks = () => {
    api
      .get("/api/v1/admin/tasks", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        const tasks = sortTasks(response.data.data);
        setTaskList(tasks);
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/admin/login");
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
          <Button
            colorScheme="blue"
            size="md"
            onClick={() => {
              filterLateTasks();
            }}
          >
            <CFaFilter color="white" mr="2" />
            Filtrar Tarefas Atrasadas
          </Button>
        </Container>
        <TableContainer>
          <Table variant="simple" bgColor="white">
            <Thead>
              <Tr>
                <Th>E-mail</Th>
                <Th>Descrição</Th>
                <Th>Prazo</Th>
                <Th>Finalizo em</Th>
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
                      <Td>{task.user.email}</Td>
                      <Td>{task.description}</Td>
                      <Td>
                        {moment(task.deadline).format("DD/MM/YYYY HH:mm")}
                      </Td>
                      <Td>{task.finished_at}</Td>
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
