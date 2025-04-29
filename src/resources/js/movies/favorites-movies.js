import { showToast, showToastDanger } from "../toastify/toastifyHeader.js"

document.addEventListener('DOMContentLoaded', async () => {
    const favoriteItem = document.querySelector('.favorite-item') //1.
    if (favoriteItem) {
        /////////////////////////
        const favoriteItemAll = document.querySelectorAll('.favorite-active-item') //2.1.
        const favoriteItemItem = document.querySelector('.favorite-active-item')  //2.2.
        const textActiveFav = favoriteItem.querySelector('.text-active-fav') //3.

        // xử lý sự kiện add favorite
        favoriteItem.addEventListener('click', async (e) => {
            e.preventDefault()
            console.log(e.currentTarget.href);

            const res = await fetch(e.currentTarget.href, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await res.json()
            if (!res.ok) {
                showToastDanger('Bạn phải đăng nhập')
            } else {
                showToast(data.message2)
                showToast(data.message)
                const movieId = favoriteItem.dataset?.id

                if (data.favorites.includes(movieId)) {
                    favoriteItemItem.classList.add('active-favorite')
                    favoriteItem.classList.add('active-favorite')
                    textActiveFav.textContent = 'Đã theo dõi'
                } else {
                    favoriteItemItem.classList.remove('active-favorite')
                    favoriteItem.classList.remove('active-favorite')
                    textActiveFav.textContent = 'Theo dõi'
                }
            }
        })

        // check user === true => next()
        const check = await fetch('/users/auth/check', {
            method: 'GET',
        })
        if (!check.ok) {
            return
        }

        // gọi lại dữ liệu người dùng lưu nút favorite UI
        const response = await fetch('/users/me/favorite', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        favoriteItemAll.forEach(fv => {
            const movieId = String(fv.dataset.id)
            if (String(data.favorites).includes(movieId)) {
                fv.classList.add('active-favorite')
                favoriteItem.classList.add('active-favorite')
                textActiveFav.textContent = 'Đã theo dõi'
            } else {
                fv.classList.remove('active-favorite')
                favoriteItem.classList.remove('active-favorite')
                textActiveFav.textContent = 'Theo dõi'
            }
        })
        //////////////////////////
    }
})