
export const convertRoleEnglish = (role: string) => {
    switch (role) {
        case "مدير" : return "ADMIN"
        case "متحكم": return "CONTROLLER"
        case "مدرس": return "TEACHER"
        default: return "UNKNOWN"
    } 
}