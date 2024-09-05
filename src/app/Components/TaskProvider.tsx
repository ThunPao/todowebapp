"use client"
import React, { createContext, useContext, useState } from "react";
import { TaskColla } from "../utilities/task";

export const defaultTask: TaskColla = {
  task_id: 0,
  title: "",
  description: "",
  isChecked: false,
  due_date: new Date(),
};

type TaskContextType = {
  task: TaskColla;
  setTask: (task: TaskColla) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [task, setTask] = useState<TaskColla>(defaultTask);

  return (
      <TaskContext.Provider value={{ task, setTask }}>
          {children}
      </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
      throw new Error("useTask ไม่ได้อยู่ใน TaskProvider");
  }
  return context;
};
