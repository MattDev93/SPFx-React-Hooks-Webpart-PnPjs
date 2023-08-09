import * as React from "react";
import { ITaskListProps } from "../interfaces/ITaskListProps";

export default function TaskList(props: { taskList: ITaskListProps[]; title: string }) {
    return (
        <div className="taskList">
            <h2>{props.title}</h2>
            {props.taskList.map((item: ITaskListProps) => (
                <div
                    key={item.Id}
                >
                    <div>
                        <h3>{item.Title}</h3>
                        <p />
                        <h4>{item.Description}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
};