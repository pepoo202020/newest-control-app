
export const convertRoleEnglish = (role: string) => {
    switch (role) {
        case "مدير" : return "ADMIN"
        case "مشرف": return "CONTROLLER"
        case "مدرس": return "TEACHER"
        default: return "UNKNOWN"
    } 
}