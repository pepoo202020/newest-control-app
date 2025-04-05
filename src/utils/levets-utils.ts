export const getHighPriorityLevel = (level_name: string) => {
    if (level_name.includes('الاول')) {
        return 1
    } else if (level_name.includes('الثاني')) {
        return 2
    } else if (level_name.includes('الثالث')) {
        return 3
    } else if (level_name.includes('الرابع')) {
        return 4
    } else if (level_name.includes('الخامس')) {
        return 5
    } else {
        return 0
    }
}

export const setLevelStyle = (level_priority: number) => {
    switch (level_priority) {
        case 1:
            return 'green-500'
        case 2:
            return 'blue-500'
        case 3:
            return 'yellow-500'
        case 4:
            return 'orange-500'
        case 5:
            return 'red-500'
        default:
            return 'gray-500'
    }
}
