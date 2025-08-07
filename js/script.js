function handleLogin() {

    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "" || pass === "") {
        alert("Please enter both username and password.");
    } else {
        alert("Logging in...");
    }
}
