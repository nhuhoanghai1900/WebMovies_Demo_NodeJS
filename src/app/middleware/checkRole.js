function checkRole(allowedRoles) {
    return (req, res, next) => {        
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Hành động từ chối: Bạn không đủ quyền hạn' });
        }
        next();
    };
}
export default checkRole