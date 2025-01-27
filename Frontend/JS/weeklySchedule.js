
const getWeeklySchedule = async () => {
    try {
        const courseName = document.currentScript.getAttribute('data-course-name');
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/weekly-schedule/${courseName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            return data;
        }else if(response.status === 401){
            showModal(false, 'Session expired. Please sign in again.');
            window.location.href = 'signIn.html';
        } else {
            const errorData = await response.json();
            return errorData.message || 'Failed to get weekly schedule. Please try again.';
        }
    } catch (error) {
        return 'Network error occurred. Please check your connection.';
    }
};

const renderSchedule = (schedule) => {
    const tableBody = document.getElementById('schedule-table-body');
    tableBody.innerHTML = '';

    schedule.forEach(day => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${day.dayName}</td>
            <td>${formatTime(day.startTime)}</td>
            <td>${formatTime(day.endTime)}</td>
            <td>${day.place}</td>
        `;
        tableBody.appendChild(row);
    });
};

formatTime = (time) => {
    //form 24 to 12 hour format
    const [hours, minutes] = time.split(':');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
};

const main = async () => {
    showLoader();
    const schedule = await getWeeklySchedule();
    renderSchedule(schedule);
    hideLoader();
};

main();