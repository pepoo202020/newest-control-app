export const getRoleImage = (role: string) => {
    switch (role) {
        case 'ADMIN':
            return '/icons/admin.png'
        case 'CONTROLLER':
            return '/icons/controller.png'
        case 'TEACHER':
            return '/icons/teacher.png'
        default:
            return null

    }
}
