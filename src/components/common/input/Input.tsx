import React, { ChangeEvent } from "react";
import s from "./Input.module.css"

type propsType = {
    value?: number
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    inputTypeStyle?: string
    type?: string
}

export const Input: React.FC<propsType> = (props: propsType) => {

    return <div className={s.inputWrap}>
        <input className={s.input} 
                // + ' ' + s[props.inputTypeStyle]
                    value={props.value} onChange={props.onChange}
                    placeholder={props.placeholder} type={props.type}
                />
        <input type="text" className={s.input} />
            </div>
    
}