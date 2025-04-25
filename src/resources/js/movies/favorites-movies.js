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
            const res = await fetch(e.currentTarget.href, {
                method: 'POST', // hoặc 'GET' tùy server
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const data = await res.json()
            if (!res.ok) {
                console.log(data.message);

                showToastDanger('Bạn phải đăng nhập')
            } else {
                showToast(data.message2)
                showToast(data.message)
                const movieId = favoriteItem.dataset?.id

                if (data.favorites.includes(movieId)) {
                    favoriteItemItem.classList.add('active-favorite')
                    textActiveFav.textContent = 'Đã theo dõi'
                } else {
                    favoriteItemItem.classList.remove('active-favorite')
                    textActiveFav.textContent = 'Theo dõi'
                }
            }
        })

        // gọi lại dữ liệu người dùng lưu nút favorite UI
        const res = await fetch('/users/me/favorite', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json()
        favoriteItemAll.forEach(fv => {
            const movieId = String(fv.dataset.id)
            if (String(data.favorites).includes(movieId)) {
                fv.classList.add('active-favorite')
                textActiveFav.textContent = 'Đã theo dõi'
            } else {
                fv.classList.remove('active-favorite')
                textActiveFav.textContent = 'Theo dõi'
            }
        })
        //////////////////////////
    }
})