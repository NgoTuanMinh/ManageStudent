
export const formatColorMark = ((mark: number) => {
    if (mark >= 8) return 'green';
    else if (mark >= 4) return 'orange';
    else return 'red';
})

export const formatGender = ((gender: string) => {
    if (!gender) return ''
    else return `${gender[0].toUpperCase()}${gender.slice(1)}`
})