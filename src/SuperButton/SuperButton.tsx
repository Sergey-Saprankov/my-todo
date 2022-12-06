import React from "react";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsVariantOverrides} from "@mui/material/Button/Button";
import {Button} from "@mui/material";
import s from './SuperButton.module.css'


type SuperButtonType = {
    endIcon?: React.ReactNode
    title: string
    callBack: () => void
    backgroundColor?: string
    color?: string
}


export const SuperButton: React.FC<SuperButtonType> = React.memo(({endIcon, callBack, title, backgroundColor, color}) => {
    console.log('button')
    return (

        <Button  style={{backgroundColor: backgroundColor, color: color}} onClick={callBack} endIcon={endIcon}>
            {title}
        </Button>

    )
})