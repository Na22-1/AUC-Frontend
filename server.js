// const express = require('express');
// const app = express();
//
// // Add CORS middleware
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://auc-masterarbeit.onrender.com');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });
//
// // Your route handlers
// app.get('/api/idea', (req, res) => {
//     // Your code to handle the request
// });
//
// // Start the server
// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
//


const insertData = (data, canvasBoxId) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://auc-web-q448.onrender.com/api/idea", true);
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
            description: data
        }
        xhr.send(JSON.stringify(body)); // Sending JSON data
    });
}

const updateData = (data, canvasBoxId, itemId) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", `https://auc-web-q448.onrender.com/api/idea/${itemId}`, true); // Using PUT method for update
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("Data updated successfully");
                    resolve(); // Resolve the promise if update is successful
                } else {
                    console.error("Failed to update data");
                    reject("Failed to update data"); // Reject the promise if update fails
                }
            }
        };
        var body = {
            canvasBox: canvasBoxId,
            description: data
        }
        xhr.send(JSON.stringify(body));
    });
}


const getData = (callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://auc-web-q448.onrender.com/api/idea", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(xhr.responseText);
            } else {
                console.log("Failed to fetch data");
            }
        }
    };
    xhr.send();
};
const deleteData = (id) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", `https://auc-web-q448.onrender.com/api/idea/${id}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("Data deleted successfully");
                    resolve(); // Resolve the promise if deletion is successful
                } else {
                    console.error("Failed to delete data");
                    reject("Failed to delete data"); // Reject the promise if deletion fails
                }
            }
        };
        xhr.send();
    });


}


export {insertData, deleteData, getData, updateData};