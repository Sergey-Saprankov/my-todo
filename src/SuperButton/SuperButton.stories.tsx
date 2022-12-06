import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {SuperButton} from "./SuperButton";
import AddIcon from "@mui/icons-material/Add";
import {actions} from "@storybook/addon-actions";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TodoList/SuperButton',
    component: SuperButton,
    parameters: {
        backgrounds: {
            default: 'dark'
        }
    },
    args: {
        title: "ADD NEW TODO",
        backgroundColor: '#a7bcdc',
        color: "#7a0000",
        endIcon: <AddIcon/>
    },
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SuperButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SuperButton> = (args) => <SuperButton {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//     backgroundColor: 'red',
//     color: "#000",
//     title: 'new title'
// }

export const Secondary = Template.bind({});

Secondary.args = {
    title: "ADD NEW TASK",
    backgroundColor: '#c5d1c5',
    color: "#000",
    endIcon: <AddIcon/>
}