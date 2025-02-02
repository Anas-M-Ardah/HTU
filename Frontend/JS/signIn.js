//show loader
const showLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'flex';
    }
}

//hide loader
const hideLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
}


const sendSignInRequest = () => {

    const { identifier, password } = getInputValue();

    const data = { identifier, password };

    fetch('https://htu-zb7c.onrender.com/api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                localStorage.setItem('token', data.token);
                window.location.href = '/index.html';
            } else {
                showModal(false, "Invalid email or password");
            }
        });
}

const getInputValue = () => {
    const identifier = document.querySelector('#identifier').value;
    const password = document.querySelector('#password').value;
    return { identifier, password };
}

const validateForm = () => {
    const { identifier, password } = getInputValue();

    // Basic validation
    if (!identifier.trim()) {
        alert('Please enter your email or username');
        return false;
    }

    if (!password.trim()) {
        alert('Please enter your password');
        return false;
    }

    return true;
}

const signinBtn = document.querySelector('#signin-button');
signinBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    showLoader();
    try {
        await sendSignInRequest();
    } catch (error) {
        console.error('Sign-in error:', error);
    } finally {
        hideLoader(); // This runs after the request completes
    }
});


function togglePassword(element) {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('togglePassword');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}