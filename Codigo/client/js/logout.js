function logout() {
    console.log("Logout function called");
    sessionStorage.removeItem("token");
    console.log("Token removed from session storage: ", sessionStorage.getItem("token")); // Deve imprimir null
    window.alert("Saiu!");
    window.location.href = "../index.html";
}