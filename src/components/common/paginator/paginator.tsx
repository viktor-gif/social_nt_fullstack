import React, { useState } from "react"
import s from "./paginator.module.css"

type PropsType = {
    pageSize: number
    totalUsersCount: number | null
    currentPage: number
    setCurrentPage: (currentpage: number) => void
}

export const Paginator = React.memo((props: PropsType) => {
    const [currentPorsion, setCurrentPorsion] = useState(1)
    const [isAllPagesActive, setAllPagesActive] = useState(false)
    const [currentPosition, setCurrentPosition] = useState(1)
    const [isIndicator, setIndicator] = useState(true)

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
    return <div className={s.paginator}>
        { 
            currentPorsion > 1 && <div
                className={s.arrow + " " + s.arrow_left}
                onClick={() => {
                setCurrentPorsion(currentPorsion - 1)
                setIndicator(false)
            }}></div>
        }

        <div className={s.paginator__pages}>
            <ul>
                {pages
                    .filter(page => (page >= leftPageNumber && page <= rightPageNumber))
                    .map(p => {
                    // @ts-ignor
                        
                            console.log(currentPosition)
                        // const currentPageInPorsion = p / 3 - currentPorsion + 1
                        const currentPageInPorsion = p / 3 - (currentPorsion - 1)
                        return <li className={s.paginator__pageButton + " " + (props.currentPage === p ? s.paginator__currentpage : "")
                    }
                        key={p}
                        onClick={() => {
                            props.setCurrentPage(p)
                            if (!isIndicator) {
                                setIndicator(true)
                            }
                            if (currentPageInPorsion < 0.5) {
                                setCurrentPosition(1)
                            } else if (currentPageInPorsion < 0.9) {
                                setCurrentPosition(2)
                            } else {
                                setCurrentPosition(3)
                            }
                        }
                        }
                            // style={{--clr: '#f44336'}}
                            // style="--clr: #f44336"
                        >
                            <span className={s.pageNumber_wrap}>
                                <span className={s.pageNumber}>{p}</span>
                            </span>
                    </li>
                    })
                }
                <li className={s.paginator__pageButton}>
                    <span onClick={() => isAllPagesActive ? setAllPagesActive(false) : setAllPagesActive(true)}
                    className={s.pageNumber_wrap} >
                        <span className={s.pageNumber}>...</span>
                    </span>
                    <div className={s.paginator__allPages + " " + (isAllPagesActive ? s.paginator__allPagesActive : "")}>
                        {
                            pages.map(p => {
                                const currentPageInPorsion = p / 3 - (currentPorsion - 1)
                                return <span
                                    key={p} onClick={() => {
                                        setCurrentPorsion(Math.ceil(p / porsionsSize))
                                        props.setCurrentPage(p)

                                        if (currentPageInPorsion < 0.5) {
                                            setCurrentPosition(1)
                                        } else if (currentPageInPorsion < 0.9) {
                                            setCurrentPosition(2)
                                        } else {
                                            setCurrentPosition(3)
                                        }

                                        
                                    }
                                    }
                                    className={s.allPages_pageNumber}>{p}</span>
                            })
                        }
                    </div>
                </li>
                <li className={s.paginator__pageButton + " " + (props.currentPage === pages.length ? s.paginator__currentpage : "")}
                        onClick={() => {
                            props.setCurrentPage(pages.length)
                            setCurrentPosition(4)
                            if (!isIndicator) {
                                setIndicator(true)
                            }
                        }
                        }>
                    <span className={s.pageNumber_wrap}>
                        <span className={s.pageNumber}>{pages[pages.length - 1]}</span>
                    </span>
                </li>
                <div className={s.indicator + " " + s['indicator' + currentPosition] + " " + (!isIndicator && s.indicator_remove)}>

                </div>
            </ul>
        </div>

        { 
            isNextButton && <div
                className={s.arrow}
                onClick={() => {
                setCurrentPorsion(currentPorsion + 1)
                setIndicator(false)
            }}></div>
        }
    </div>
})
