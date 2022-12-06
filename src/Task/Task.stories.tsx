import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AddIcon from "@mui/icons-material/Add";
import {actions} from "@storybook/addon-actions";
import {Task} from "./Task";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TodoList/Task',
    component: Task,
    parameters: {
        backgrounds: {
            default: 'dark'
        }
    },
    args: {
        task: {
            taskId: '1',
            taskTitle: 'Low Priority',
            priority: 'low',
            description: '',
            isDone: false,
        }
    },
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskLowPriority = Template.bind({});

export const TaskMiddlePriority = Template.bind({});

TaskMiddlePriority.args = {
    task: {
        taskId: '2',
        taskTitle: 'Middle Priority',
        priority: 'middle',
        description: '',
        isDone: false,
    }
}

export const TaskHighPriority = Template.bind({});
TaskHighPriority.args = {
    task: {
        taskId: '3',
        taskTitle: 'High Priority',
        priority: 'high',
        description: '',
        isDone: false,
    }
}

export const TaskIsDone = Template.bind({});

TaskIsDone.args = {
    task: {
        taskId: '4',
        taskTitle: 'IsDone',
        priority: 'done',
        description: '',
        isDone: true,
    }
}

export const ChangeTaskPriority = Template.bind({});

ChangeTaskPriority.args = {
    task: {
        taskId: '1',
        taskTitle: 'Low Priority',
        priority: 'low',
        description: '',
        isDone: false,
    },
    onChangeTaskPriority: (priority: string, todoListId: string, taskId: string, isDone: boolean) => actions(priority = 'high')
}