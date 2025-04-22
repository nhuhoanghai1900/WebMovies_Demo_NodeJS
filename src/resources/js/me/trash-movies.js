document.addEventListener('DOMContentLoaded', () => {
    //khởi tạo các giá trị
    var id
    var deleteForm = document.forms['delete-movies-form']
    var restoreForm = document.forms['restore-movies-form']
    const deleteMoviesModal = document.getElementById('delete-movies-modal')
    const btndeleteMoviesModal = document.getElementById('btn__delete-movies-modal')

    if (deleteMoviesModal) {
        //lắng nghe sự kiện show confirm
        deleteMoviesModal.addEventListener('show.bs.modal', e => {
            const button = e.relatedTarget //Lấy ra vị trí của nút bấm kích hoạt modal confirm
            //từ vị trí nút bấm trên ---> trích xuất giá trị 'data-id' từ nút bấm
            id = button.getAttribute('data-id')

            //lắng nghe sự kiện click của nút 'xóa' trong confirm 
            btndeleteMoviesModal.onclick = function () {
                // Đặt thuộc tính action của biểu mẫu deleteForm để gửi yêu cầu DELETE đến đường dẫn '/movies/' kèm theo id
                deleteForm.action = '/movies/' + id + '/force?_method=DELETE'
                deleteForm.submit() // Gửi biểu mẫu deleteForm để thực hiện yêu cầu xóa
            }
        })
    }

    //Restore click handler
    document.querySelectorAll('.btn-restore').forEach(btn => btn.addEventListener('click', e => {
        e.preventDefault()
        id = e.currentTarget.getAttribute('data-id')
        restoreForm.action = '/movies/' + id + '/restore?_method=PATCH'
        restoreForm.submit()
    }))
})
