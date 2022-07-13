import Head from "next/head";
import Image from "next/image";
import { AddNewTodo } from "../components/AddNewTodo";
import { TodoTask } from "../components/TodoTask";
import styles from "../styles/Home.module.css";
import { useQuery, gql } from "@apollo/client";

const GET_ALL_TASKS = gql`
  {
    allTasks {
      taskDescription
      dueDate
      id
      priority
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_TASKS);

  const onSubmit = (e, newTodoEditText) => {
    e.preventDefault();
    console.log(newTodoEditText);
  };

  if (loading) return <span>Loading</span>;
  if (error) return <span>{error.message}</span>;

  console.log(data);

  return (
    <div className={styles.container}>
      <Head>
        <title>TodoList</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>TodoList</h1>

        <AddNewTodo onSubmit={onSubmit} />
        <div className={styles.grid}>
          {data.allTasks.map((todoTask) => (
            <TodoTask taskData={todoTask} key={todoTask.id} />
          ))}
        </div>
      </main>
    </div>
  );
}
