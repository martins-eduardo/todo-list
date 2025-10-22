import React from "react";
import useLocalStorage from "use-local-storage";
import { delay } from "../helpers/utils";
import { TASKS_KEY, type Task, TaskState } from "../models/task";

export default function useTask() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASKS_KEY, []);

  const [isUpdatingTask, setIsUpdatingTask] = React.useState(false);

  const [isDeletingTask, setIsDeletingTask] = React.useState(false);

  function prepareTask() {
    setTasks([
      ...tasks,
      {
        id: Math.random().toString(36).substring(2, 9),
        title: "",
        state: TaskState.Creating,
      },
    ]);
  }

  async function updateTask(
    id: string,
    payload: {
      title: Task["title"];
    },
  ) {
    setIsUpdatingTask(true);
    await delay(1000);

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              state: TaskState.Created,
              ...payload,
            }
          : task,
      ),
    );

    setIsUpdatingTask(false);
  }

  function updateTaskStatus(id: string, conclued: boolean) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              conclued,
            }
          : task,
      ),
    );
  }

  async function deleteTask(id: string) {
    setIsDeletingTask(true);

    await delay(1000);
    setTasks(tasks.filter((task) => task.id !== id));

    setIsDeletingTask(false);
  }

  return {
    prepareTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    isUpdatingTask,
    isDeletingTask,
  };
}
