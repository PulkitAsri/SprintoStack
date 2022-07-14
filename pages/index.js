import Head from "next/head";
import { AddNewTodo } from "../components/AddNewTodo";
import { TodoTask } from "../components/TodoTask";
import styles from "../styles/Home.module.css";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_TASK, GET_ALL_TASKS } from "../graphql/queries";
import FiltersContainer from "../components/FiltersContainer";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_TASKS);

  const [createNewTask]= useMutation(CREATE_TASK,{
    onCompleted: (data)=> window.location.reload()
  });

  const addTaskOnSubmit = (e, newTask) => {
    e.preventDefault();
    console.log(newTask);
    createNewTask({variables:newTask});
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

        <AddNewTodo onSubmit={addTaskOnSubmit} />
        <FiltersContainer />
        <div className={styles.grid}>
          {data.allTasks.map((todoTask) => (
            <TodoTask taskData={todoTask} key={todoTask.id} />
          ))}
        </div>
      </main>
    </div>
  );
}
