import React from "react";
import s from "./Button.module.css"

type propsType = {
    value: string
    onClick: () => void
}

export const Button: React.FC<propsType> = React.memo((props: propsType) => {

    return <div className={s.buttonWrap}>
        <button className={s.button} onClick={props.onClick}>
            <span>{props.value}</span>
            <i></i>
        </button>
    </div>
    
})