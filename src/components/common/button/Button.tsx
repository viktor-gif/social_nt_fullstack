import React from "react";
import s from "./Button.module.css"

type propsType = {
    value: string
    onClick?: () => void
    size?: string
}

export const Button: React.FC<propsType> = React.memo((props: propsType) => {

    return <div className={s.buttonWrap}>
        <button type="submit"
            className={s.button + " " + s[props.size || '']}
            onClick={props.onClick}
        >
            <span>{props.value}</span>
            <i></i>
        </button>
    </div>
    
})