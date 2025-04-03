
export const convertRoleArabic = (role: string) => {
    switch (role) {
        case "ADMIN" : return "المدير"
        case "CONTROLLER": return "المشرف"
        case "TEACHER": return "المدرس"
        default: return "غير معروف"
    } 
}