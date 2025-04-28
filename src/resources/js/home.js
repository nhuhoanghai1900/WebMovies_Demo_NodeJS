document.addEventListener('DOMContentLoaded', () => {
    // handle scroll-container - view home
    const slider = document.querySelector('.scroll-container')
    let isDown = false, isDragging = false, startX, scrollLeft

    if (slider) {
        slider.addEventListener('mousedown', e => {
            isDown = true
            isDragging = false
            startX = e.pageX - slider.offsetLeft
            scrollLeft = slider.scrollLeft
            slider.classList.add('dragging')
        })

        slider.addEventListener('mouseleave', () => {
            isDown = false
            slider.classList.remove('dragging')
        })

        slider.addEventListener('mouseup', () => {
            isDown = false
            slider.classList.remove('dragging')
        })

        slider.addEventListener('mousemove', e => {
            if (!isDown) return
            isDragging = true
            e.preventDefault()
            slider.scrollLeft = scrollLeft - (e.pageX - slider.offsetLeft - startX)
        })

        slider.querySelectorAll('a').forEach(link => link.addEventListener('click', e => {
            if (isDragging) {
                e.preventDefault()
            }
        }))
    }
})