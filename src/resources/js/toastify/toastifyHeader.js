export const showToast = (message) => {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "#218838", // gradient hiện đại
            color: "#ffffff",
            borderRadius: "12px",
            padding: "12px 24px",
            fontSize: "14px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            borderLeft: "6px solid rgb(0, 247, 255)", // tạo điểm nhấn
        },
        close: false,
        stopOnFocus: true,
    }).showToast()
}

export const showToastDanger = (message) => {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "#ff8a66", // gradient hiện đại
            color: "#ffffff",
            borderRadius: "12px",
            padding: "12px 24px",
            fontSize: "14px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            borderLeft: "6px solid rgb(255, 238, 0)", // tạo điểm nhấn
        },
        close: false,
        stopOnFocus: true,
    }).showToast()
}
