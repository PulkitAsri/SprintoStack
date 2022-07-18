import Head from "next/head";
import { AddNewTodo } from "../components/AddNewTodo";
import { TodoTask } from "../components/TodoTask";
import styles from "../styles/Home.module.css";
import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_TASK,
  CREATE_USER,
  GET_ALL_DATA,
  GET_ALL_TASKS,
} from "../graphql/queries";
import FiltersContainer from "../components/FiltersContainer";
import { AddNewUser } from "../components/AddNewUser";
import UserComponent from "../components/UserComponent";

export default function Home() {
  // const { loading, error, data } = useQuery(GET_ALL_TASKS);
  const { loading, error, data } = useQuery(GET_ALL_DATA);

  if (loading) return <span>Loading</span>;
  if (error) return <span>{error.message}</span>;

  console.log(data);

  const allUsersMap = {};
  data.allUsers.forEach((user) => {
    allUsersMap[user.id] = user;
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>TodoList</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.todos}>
          <h1 className={styles.title}>TodoList</h1>

          <AddNewTodo allUsers={data.allUsers} />
          <FiltersContainer />
          <div className={styles.grid}>
            {data.allTasks.map((todoTask) => (
              <TodoTask
                allUsers={allUsersMap}
                taskData={todoTask}
                key={todoTask.id}
              />
            ))}
          </div>
        </div>
        <div className={styles.teams}>
          <h3>The Team</h3>
          <AddNewUser />
          <div className={styles.grid}>
            {data.allUsers.map((user) => (
              <UserComponent userData={user} key={user.id} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
