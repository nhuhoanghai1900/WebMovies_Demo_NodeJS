import { readdirSync } from 'fs'
import { join } from 'path'

const getAsset = (type) => {
    const dir = join(process.cwd(), 'src', 'public', type) // lấy đường dẫn file chứa js + css có contenthash
    try {
        const files = readdirSync(dir) // truy cập vào toàn bộ
        const file = files.find(f => f.startsWith('app.') && f.endsWith(`.${type}`))
        return file ? `/${type}/${file}` : null

    } catch (err) {
        console.error('Error reading directory:', err)  //lỗi nếu không đọc được thư mục
        return null
    }
}

const assetMiddleware = (req, res, next) => {
    res.locals.cssFile = getAsset('css')
    res.locals.jsFile = getAsset('js')
    next()
}

export default assetMiddleware
