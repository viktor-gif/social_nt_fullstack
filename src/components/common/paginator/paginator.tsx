import React, { useState } from "react"
import s from "./paginator.module.css"

type PropsType = {
    pageSize: number
    totalUsersCount: number | null
    currentPage: number
    setCurrentPage: (currentpage: number) => void
}

export const Paginator = (props: PropsType) => {
    const [currentPorsion, setCurrentPorsion] = useState(1)
    const [isAllPagesActive, setAllPagesActive] = useState(false)

    const porsionsSize = 3

    const pages = []
    const pagesNumber = props.totalUsersCount && Math.ceil(props.totalUsersCount / props.pageSize)

    const porsionsNumber = pagesNumber && Math.ceil(pagesNumber / porsionsSize)

    const leftPageNumber = currentPorsion * porsionsSize - (porsionsSize - 1)
    const rightPageNumber = currentPorsion * porsionsSize

    if (pagesNumber) {
        for (let i = 1; i <= pagesNumber; i++) {
            pages.push(i)
        }
    }

    const isNextButton = porsionsNumber && currentPorsion < porsionsNumber
    
    return <div>
        { 
            currentPorsion > 1 && <span onClick={() => {
                setCurrentPorsion(currentPorsion - 1)
            }}>prev</span>
        }
        <span>
            {pages
                .filter(page => (page >= leftPageNumber && page <= rightPageNumber))
                .map(p => {
                // @ts-ignor
                return <span className={s.paginator__pageButton + " " + (props.currentPage === p ? s.paginator__currentpage : "")}
                    key={p}
                    onClick={() => {
                        props.setCurrentPage(p)
                    }
                    }>
                    {p}
                </span>
                })
            }
        </span>
        <span>
            <span className={s.paginator__findPage}>
                <span onClick={() => isAllPagesActive ? setAllPagesActive(false) : setAllPagesActive(true)}>...</span>
                <div className={s.paginator__allPages + " " + (isAllPagesActive ? s.paginator__allPagesActive : "")}>
                    {
                        pages.map(p => {
                            return <span onClick={() => props.setCurrentPage(p)}>{p}</span>
                        })
                    }
                </div>
            </span>
            <span className={s.paginator__pageButton + " " + (props.currentPage === pages.length ? s.paginator__currentpage : "")}
                    onClick={() => {
                        props.setCurrentPage(pages.length)
                    }
                    }>{pages[pages.length - 1]}</span>
        </span>
        { 
            isNextButton && <span onClick={() => {
                setCurrentPorsion(currentPorsion + 1)
            }}>next</span>
        }
    </div>
}
