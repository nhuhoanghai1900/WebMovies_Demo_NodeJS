import mongoose from "mongoose"
import Users from "../models/Users.js"

class FavoritesController {
    async favorites(req, res, next) {
        try {
            const { movieId } = req.params;
            const user = await Users.findById(req.user._id)
            const index = user.favorites.findIndex(index => index.equals(movieId))

            if (index === -1) {
                user.favorites.push(movieId)
                await user.save()
                res.status(200).json(
                    {
                        message: 'Theo Dõi thành công!',
                        message2: 'Xem trong hồ sơ của bạn!',
                        favorites: user.favorites
                    })
            } else {
                user.favorites.splice(index, 1)
                await user.save()
                res.status(200).json(
                    {
                        message: 'Đã hủy theo Dõi!',
                        message2: 'Xóa khỏi hồ sơ của bạn!',
                        favorites: user.favorites
                    })
            }
        } catch (error) {
            console.error('Error tại controller:', error)
            res.status(500).json({ message: 'BE: Lỗi khi thêm phim yêu thích' })
        }
    }
}

export default new FavoritesController()
