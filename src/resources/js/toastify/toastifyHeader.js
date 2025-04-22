export const showToast = (message) => {
    Toastify({
        text: message,
        duration: 1500,
        gravity: "top",
        position: "right",
        style: {
            background: "#55a14e",
            color: "#fff",
            borderRadius: "8px",
            padding: "12px 16px"
        },
        close: false
    }).showToast()
}

export const showToastDanger = (message) => {
    Toastify({
        text: message,
        duration: 1500,
        gravity: "top",
        position: "right",
        style: {
            background: "#ff8a66",
            color: "#fff",
            borderRadius: "8px",
            padding: "12px 16px"
        },
        close: false
    }).showToast()
}
