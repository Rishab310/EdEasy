const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getDateFromTimestamp = (timestamp) => {
    const dueDate = new Date(timestamp);
    let date = dueDate.getDate();
    let month = dueDate.getMonth();
    let year = dueDate.getFullYear();
    
    const todayDate = new Date();
    let currDate = todayDate.getDate();
    let currMonth = todayDate.getMonth();
    let currYear = todayDate.getFullYear();

    if (currYear === year && currMonth === month && currDate === date) {
        return "Today";
    } 
    
    const yesterday = new Date(timestamp - 86400000);
    if (yesterday.getMonth() === todayDate.getMonth() && yesterday.getDate() === todayDate.getDate()) {
        return "Tomorrow";
    }

    date = date.toString();
    if (date.length === 1) date = "0" + date;

    month = (month + 1).toString();
    if (month.length === 1) month = "0" + month;

    return date + "/" + month + "/" + year;
}

export const getTimeFromTimestamp = (timestamp) => {
    const newDate = new Date(timestamp);
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes().toString();

    let notation = "AM";
    if (hours === 0) {
        hours = 12;
    } else if (hours > 12) {
        hours -= 12;
        notation = "PM";
    }

    hours = hours.toString();
    // if (hours.length === 1) hours = "0" + hours;
    if (minutes.length === 1) minutes = "0" + minutes;

    return hours + ":" + minutes + " " + notation;
}

export const getDateStringFromTimestamp = (timestamp) => {
    const newDate = new Date(timestamp);
    const month = months[newDate.getMonth()];
    return newDate.getDate() + " " + month + " " + newDate.getFullYear();
}