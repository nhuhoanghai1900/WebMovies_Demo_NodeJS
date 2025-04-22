document.addEventListener('DOMContentLoaded', () => {

    const deleteEpisodeModal = document.getElementById('delete-episode-modal')
    const btnDeleteEpisodeModal = document.getElementById('btn_delete-episode-modal')
    const deleteEpisodeForm = document.forms['delete-episode-form']
    var id

    if (deleteEpisodeModal) {
        deleteEpisodeModal.addEventListener('show.bs.modal', (e) => {
            const button = e.relatedTarget
            id = button.getAttribute('data-id')

            btnDeleteEpisodeModal.onclick = function () {
                console.log('yes')
                deleteEpisodeForm.action = '/movies/{{movies._id}}/episodes/' + id + '?_method=DELETE'
                deleteEpisodeForm.submit()
            }
        })
    }

})
