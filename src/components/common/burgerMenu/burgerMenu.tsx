import s from "./burgerMenu.module.css"

type PropsType = {
    burgerClick: () => void
}

export const BurgerMenu = (props: PropsType) => {
    return <div className={s.burger}
        onClick={props.burgerClick} >
        <div className={s.burger__dots}></div>
    </div>
}