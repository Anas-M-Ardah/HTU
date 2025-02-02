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

// Utility function to create progress bar
const createProgressBar = (percentage) => {
    return `
        <div class="progress-bar" 
             style="background: linear-gradient(to right, var(--light-red) ${percentage}%, var(--light-gray) ${percentage}%)">
            <span class="progress-bar__text">${percentage}%</span>
        </div>
    `;
};

// Utility function to format date and hours
const formatLastUpdate = (dateString, hoursAdded) => {
    const date = new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    return `${date} (added ${hoursAdded}h)`;
};

// Add loading state to table
const setLoadingState = (tableBody, isLoading) => {
    if (isLoading) {
        const loadingRow = tableBody.insertRow();
        loadingRow.innerHTML = `
            <td colspan="6" class="course-table__loading">
                Loading courses...
            </td>
        `;
    } else {
        tableBody.innerHTML = '';
    }
};

const displayCourses = async () => {
    const tableBody = document.querySelector('.course-table__body');
    
    try {
        // Show loading state
        setLoadingState(tableBody, true);
        
        // Fetch courses
        const courses = await getAllCourses();
        
        // Clear loading state
        setLoadingState(tableBody, false);
        
        if (!courses || courses.length === 0) {
            const emptyRow = tableBody.insertRow();
            emptyRow.innerHTML = `
                <td colspan="6" class="course-table__empty">
                    No courses found
                </td>
            `;
            return;
        }

        // Display courses
        courses.forEach(course => {
            const row = tableBody.insertRow();
            row.className = 'course-table__row';
            
            const progressPercentage = Math.round((course.hoursTaken / course.totalHours) * 100);
            
            row.innerHTML = `
                <td class="course-table__cell">${course.courseName}</td>
                <td class="course-table__cell">${course.hoursTaken}</td>
                <td class="course-table__cell">${course.hoursRemaining}</td>
                <td class="course-table__cell">${course.totalHours}</td>
                <td class="course-table__cell">${createProgressBar(progressPercentage)}</td>
                <td class="course-table__cell">${formatLastUpdate(course.updatedAt, course.lastHoursAdded)}</td>
            `;
        });

    } catch (error) {
        console.error('Error fetching courses:', error);
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="course-table__error">
                    Error loading courses. Please try again later.
                </td>
            </tr>
        `;
    }
};

// Add corresponding CSS for new elements
const style = document.createElement('style');
style.textContent = `
    .progress-bar {
        width: 100%;
        height: 20px;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
    }

    .progress-bar__text {
        position: absolute;
        width: 100%;
        text-align: center;
        color: var(--dark-gray);
        font-size: 0.875rem;
        line-height: 20px;
    }

    .course-table__loading,
    .course-table__empty,
    .course-table__error {
        text-align: center;
        padding: 2rem;
        color: var(--dark-gray);
    }

    .course-table__error {
        color: var(--primary-red);
    }
`;

document.head.appendChild(style);

const main = async () => {
    showLoader();
    await displayCourses();
    hideLoader();
};

main();