window.addEventListener('load', () => {
    const currentUrl = window.location.href;
    const token = sessionStorage.getItem('token')
    if (!token) {
        window.location.assign('./login.html')
    }
})