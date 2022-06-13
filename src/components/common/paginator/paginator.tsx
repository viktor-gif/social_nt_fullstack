import React from "react"
import s from "./paginator.module.css"

type PropsType = {
    pageSize: number
    totalUsersCount: number | null

    setCurrentPage: (currentpage: number) => void
}

export const Paginator = (props: PropsType) => {
    const pages = []
    const pagesNumber = props.totalUsersCount && Math.ceil(props.totalUsersCount / props.pageSize)
    if (pagesNumber) {
        for (let i = 1; i <= pagesNumber; i++) {
            pages.push(i)
        }
    }
    
    return <div>
        {pages.map(p => {
            return <span className={s.paginator__pageButton}
                key={p}
                onClick={() => {
                    props.setCurrentPage(p)
                }
                }>
                {p}
            </span>
        })}
    </div>
}
