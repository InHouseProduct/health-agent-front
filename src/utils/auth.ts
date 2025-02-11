export const hasRole = (user: User | null, roleName: string): boolean => {
    return user?.roles?.some(role => role.name === roleName) || false;
};

export const hasPermission = (user: User | null, permissionName: string): boolean => {
    return user?.roles?.some(role => 
        role.permissions.some(permission => permission.name === permissionName)
    ) || false;
}; 