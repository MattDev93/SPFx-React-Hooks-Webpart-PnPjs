import * as React from 'react';
import { ITasksDashboardWebPartProps } from '../interfaces/ITasksDashboardWebPartProps';
import { ITaskListProps } from '../interfaces/ITaskListProps';
import TaskList from './TaskList';
import { useState, useEffect } from 'react';
import { getSP } from "../../../pnpjs-config";
import { SPFI } from "@pnp/sp";

// Converted to functional component to leverage React Hooks
export default function TasksDashboard(props: ITasksDashboardWebPartProps) {

  // Get Web Part Context using pnpjs-config file
  const sp: SPFI = getSP();

  // Creating the taskList property and define the setter method to update the list state. This replaces the this.setState(); method we use with React class components.
  // Setting the initial value of the taskList to an empty array of ITaskListProps by passing it into the constructor.
  const [taskList, setTaskList] = useState<ITaskListProps[]>([])

  // Initiating the component. In class components, we use the 'componentDidMount' and 'componentDidUpdate' lifecycle methods to handle this scenario.
  // The way you do this same thing with hooks is to add a useEffect method with an empty dependency array.
  // The useEffect() method can hook into whenever the taskList state property changes by passing it into the dependency array. By changing the state, that triggers React to re-render the component to display the new values.
  useEffect(() => {
    sp.web.lists
      .getByTitle("Tasks")
      .items.getAll()
      .then((items: ITaskListProps[]) => {
        setTaskList(items);
      })
      .catch((error) => {
        console.error("Error Loading Tasks List Data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Tasks Dashboard</h1>
      <h2>Description: {props.description} </h2>
      <TaskList taskList={taskList} title='All Tasks' />
    </div>
  );
}
