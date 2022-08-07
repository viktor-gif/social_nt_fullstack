export const formatDate = (date: string) => {
    const msFromAddComment = Date.now() - new Date(date).getTime()
    const min = msFromAddComment / 1000 / 60
    const h = min / 60
    const day = h / 24
    const month = day / 30
    const year = month / 12

    let dataText = "Щойно"
    if (min >= 1 && min < 60) {
        dataText = `${Math.floor(min)} хв.`
    } else if (h >= 1 && h < 24) {
        dataText = `${Math.floor(h)} год.`
    } else if (day >= 1 && day < 2) {
        dataText = `Вчора`
    } else if (day > 2 && day < 30) {
        dataText = `${Math.floor(day)} дн.`
    } else if (month >= 1 && month < 12) {
        dataText = `${Math.floor(month)} міс.`
    } else if (year >= 1) {
        dataText = `${Math.floor(year)} р.`
    }

    return dataText
}