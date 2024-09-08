"use client"
import React, { createContext, useContext, useState } from "react";
import { TaskColla } from "../utilities/task";

export const defaultTask: TaskColla = {
  task_id: 0,
  title: "",
  description: "",
  isChecked: false,
  due_date: new Date(),
  status: "PENDING",
  priority: "LOW"
};

type TaskContextType = {
  task: TaskColla;
  setTask: (task: TaskColla) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [task, setTask] = useState<TaskColla>(defaultTask);
  const [isLoading, setIsLoading] = useState(false); // loading state
  return (
      <TaskContext.Provider value={{ task, setTask,isLoading,setIsLoading }}>
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
