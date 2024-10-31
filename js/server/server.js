const url = 'https://auc-web-o8ve.onrender.com/';
//const url = 'http://localhost:8080/';


const insertData = (data, canvasBoxId, boardKey, createDate) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", `${url}api/idea/${boardKey}/${createDate}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("Data inserted successfully");
                    resolve(xhr.responseText); // Resolve with response data
                } else {
                    console.log("Failed to insert data");
                    reject(xhr.statusText); // Reject with status text
                }
            }
        };
        var body = {
            canvasBox: canvasBoxId,
            description: data,
            boardKey_id: boardKey
        }
        xhr.send(JSON.stringify(body)); // Sending JSON data
    });
}


// Update an existing AucItem
const updateData = (data, canvasBoxId, itemId, boardKey, createDate) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", `${url}api/idea/${itemId}`, true); // Using PUT method for update
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("Data updated successfully");
                    resolve(); // Resolve the promise if update is successful
                } else {
                    console.error("Failed to update data:", xhr.statusText);
                    reject(xhr.statusText); // Reject the promise if update fails
                }
            }
        };
        var body = {
            canvasBox: canvasBoxId,
            description: data,
            boardKey_id: boardKey,
            createDate: createDate
        };
        xhr.send(JSON.stringify(body));
    });
};

// Fetch AucItems by boardKey
const getData = (boardKey, createDate, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${url}api/idea/${boardKey}/${createDate}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(JSON.parse(xhr.responseText));
            } else {
                console.log("Failed to fetch data:", xhr.statusText);
            }
        }
    };
    xhr.send();
};

// Delete AucItem by its ID
const deleteData = (id) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", `${url}api/idea/${id}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 204) { // Check for 204 No Content status
                    console.log("Data deleted successfully");
                    resolve(); // Resolve the promise if deletion is successful
                } else {
                    console.error("Failed to delete data:", xhr.statusText);
                    reject(xhr.statusText); // Reject the promise if deletion fails
                }
            }
        };
        xhr.send();
    });
};

// Create a new board with a specific key,  and createDate
const createNewBoard = (boardKey, date) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", `${url}api/idea/createNewBoard/${boardKey}/${date}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve({ existing: true, data: JSON.parse(xhr.responseText) });
                } else if (xhr.status === 201) {
                    resolve({ existing: false, data: [] });
                } else if (xhr.status === 404) {
                    console.error("Board not found.");
                    reject("Board not found.");
                } else {
                    console.error("Failed to create or fetch board:", xhr.statusText);
                    reject(xhr.statusText);
                }
            }
        };
        xhr.send(); // Removed JSON.stringify({ date }) since server doesn't expect a body
    });
};
/*
function sendDateToServer(boardKey) {
    // Retrieve createDate from localStorage
    const createDate = localStorage.getItem('createDate').replace(/-/g, '');

    var xhr = new XMLHttpRequest();
    xhr.open("POST", `${url}api/idea/${boardKey}/${createDate}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {  // Check for 201 Created status
                console.log("Board created successfully");
                resolve(JSON.parse(xhr.responseText)); // Parse and resolve with response data
            } else {
                console.log("Failed to create board:", xhr.statusText);
                reject(xhr.statusText); // Reject with status text
            }
        }
    };
    var body = {
        boardKey: boardKey,
        createDate: createDate
    };
    xhr.send(JSON.stringify(body)); // Sending JSON data
}
*/
export { insertData, deleteData, getData, updateData, createNewBoard };