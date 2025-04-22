import { showToast, showToastDanger } from "../toastify/toastifyHeader.js"
document.addEventListener('DOMContentLoaded', () => {
  // handle logout
  const isLogout = document.getElementById("logout")
  if (isLogout) {
    isLogout.addEventListener("click", async (e) => {
      e.preventDefault()
      try {
        const res = await fetch("/users/logout", { method: "POST" })
        if (!res.ok) throw new Error("Logout thất bại")

        showToast("Bạn đang đăng xuất!")
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } catch (err) {
        showToastDanger("Đăng xuất thất bại, thử lại sau")
      }
    })
  }

  FilePond.registerPlugin(FilePondPluginImagePreview)
  FilePond.create(document.getElementById("imageInput"), {
    labelIdle: `Đưa ảnh vào đây <span class="filepond--label-action">Chọn ảnh</span>`,
    imagePreviewHeight: 100,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 100,
    stylePanelLayout: "compact circle",
    styleButtonRemoveItemPosition: "center bottom",
  })

  // Lấy dữ liệu ảnh
  function getFilePond() {
    const pond = FilePond.find(document.querySelector(".filepond"))
    const files = pond.getFiles() // lấy mảng files
    const file = files[0]?.file // lấy file thực giá trị đầu tiên

    if (file) {
      const formData = new FormData()
      formData.append("img", file)
      return formData
    } else {
      console.log("Chưa chọn ảnh!")
      return null
    }
  }

  // upload file ảnh lên BE xử lý
  document.getElementById("uploadImage").addEventListener("click", async (e) => {
    e.preventDefault()
    const formData = getFilePond()
    if (formData) {

      try {
        const response = await fetch("/users/upload-avatar", {
          method: "POST",
          body: formData,
        })

        const result = await response.json()
        if (!response.ok) {
          showToastDanger(result.message)
        } else {
          showToast("Cập nhật ảnh thành công!")
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        }
      } catch (error) {
        console.error("Lỗi khi upload:", error.message)
      }

    }
  })
})
