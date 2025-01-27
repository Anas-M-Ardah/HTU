const showLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'flex';
    }
}

const hideLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
}

const addHoursPostRequest = async () => {
    const hours = document.getElementById("hours").value;
    const data = { courseName, hours };
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch('http://localhost:3000/api/courses/add-hours', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showModal(true, `Successfully added ${hours} hours to ${courseName}`);
            // Optional: Clear the input
            document.getElementById("hours").value = '';
            // Optional: Refresh the display
            // await refreshCourseDisplay();
        }else if (response.status === 401){
            showModal(false, 'Session expired. Please sign in again.');
            window.location.href = 'signIn.html';
        } else {
            const errorData = await response.json();
            showModal(false, errorData.message || 'Failed to add hours. Please try again.');
        }
    } catch (error) {
        showModal(false, 'Network error occurred. Please check your connection.');
        console.error('Error adding hours:', error);
    }
}

const addHours = async () => {
    showLoader();
    await addHoursPostRequest();
    hideLoader();
};

const courseName = document.currentScript.getAttribute('data-course-name');
document.getElementById("add-hours").addEventListener("click", addHours);

