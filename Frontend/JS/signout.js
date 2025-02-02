const signOutBtn = document.getElementById('signout-button');
signOutBtn.addEventListener('click', () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    window.location.href = '/html/signIn.html'; // Redirect to the sign-in page
});