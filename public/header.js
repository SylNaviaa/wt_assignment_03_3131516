function isLoggedIn() {
    return user !== undefined && user !== null;
}

// Function to update the header based on login status
function updateHeader() {
    const header = document.querySelector('header');
    if (isLoggedIn()) {
        // If the user is logged in, update the header accordingly
        header.innerHTML = `
            <h1>Welcome, ${user.username}!</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </nav>
        `;
    } else {
        // If the user is not logged in, update the header accordingly
        header.innerHTML = `
            <h1>My Blog</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/article">Article</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                </ul>
            </nav>
        `;
    }
}

// Call the updateHeader function when the page loads
window.addEventListener('load', updateHeader);
