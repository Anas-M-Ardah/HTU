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

const getAllCourses = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://htu-zb7c.onrender.com/api/courses/all', {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        const courses = await response.json();
        if (response.status === 401) {
            alert('Session expired. Please sign in again.');
            window.location.href = '/html/signIn.html';
        } 
        return courses;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
};

const displayCourses = async () => {
    const courses = await getAllCourses();
    const table = document.querySelector('table');
    console.log(courses);
    courses.forEach(course => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${course.courseName}</td>
            <td>${course.hoursTaken}</td>
            <td>${course.hoursRemaining}</td>
            <td>${course.totalHours}</td>
            <td>${course.progressBar}%</td>
            <td>${course.updatedAt.split('T')[0]} (added ${course.lastHoursAdded})</td>
        `;
    });
};

const main = async () => {
    showLoader();
    await displayCourses();
    hideLoader();
};

main();