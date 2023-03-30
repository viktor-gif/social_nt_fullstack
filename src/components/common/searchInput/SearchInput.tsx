import { ChangeEvent } from "react";
import s from "./SearchInput.module.css"
import {SearchOutline} from "react-ionicons"

type propsType = {
    value?: string
    placeholder: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyPress?: any
}

export const SearchInput = (props: propsType) => {
    return (
        <div className={s.searchUsers}>
            <input
                value={props.value} 
                onChange={props.onChange}
                placeholder={props.placeholder}
                onKeyPress={props.onKeyPress} />
            
            {/* @ts-ignore */}
            <SearchOutline className={s.SearchIcon} color="#555"/>
        </div>
    )
}