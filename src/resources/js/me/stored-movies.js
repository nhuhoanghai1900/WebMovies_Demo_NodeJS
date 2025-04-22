document.addEventListener('DOMContentLoaded', () => {
    var id, deleteForm = document.forms['delete-soft-movies-form']
    const deleteMoviesModal = document.getElementById('delete-movies-modal-01')
    const btndeleteMoviesModal = document.getElementById('btn__delete-movies-modal')

    if (deleteMoviesModal) {
        //lắng nghe sự kiện show confirm
        deleteMoviesModal.addEventListener('show.bs.modal', e => {
            const button = e.relatedTarget
            id = button.getAttribute('data-id')

            //lắng nghe sự kiện click của nút 'xóa' trong confirm 
            btndeleteMoviesModal.onclick = function () {
                deleteForm.action = '/movies/' + id + '?_method=DELETE'
                deleteForm.submit() // Gửi biểu mẫu deleteForm để thực hiện yêu cầu xóa
            }
        })
    }

    const checkBox = document.querySelector('#checkBox-all')
    const checkItems = document.querySelectorAll('input[name="Ids[]"]')
    const checkItem = document.querySelector('input[name="Ids[]"]')
    const btnDisabled = document.querySelector('#btn-disabled')
    const containerForm = document.forms['container-form']

    if (checkBox) {
        checkBox.addEventListener('change', () => {
            const isCheckedAll = checkBox.checked
            checkItems.forEach(item => {
                item.checked = isCheckedAll // chọn / bỏ tất cả
            })
            btnActiveCheck()
        })
    }

    // Bắt sự kiện thay đổi của từng checkbox con
    checkItems.forEach(e => {
        e.addEventListener('change', () => {
            const isCheckedAll = Array.from(checkItems).every(item => item.checked)
            checkBox.checked = isCheckedAll
            btnActiveCheck()
        })
    })

    function btnActiveCheck() {
        const checkCount = document.querySelectorAll('input[name="Ids[]"]:checked').length
        checkCount > 0 ? btnDisabled.disabled = false : btnDisabled.disabled = true
    }
    if (btnDisabled) {
        btnDisabled.addEventListener('click', (e) => {
            const floatingSelect = document.getElementById('floatingSelect')
            if (floatingSelect.value === '') {
                e.preventDefault()
                floatingSelect.reportValidity() // validate thủ công
            } else {
                containerForm.submit()
            }
        })
    }

})
