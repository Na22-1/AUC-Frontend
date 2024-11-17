const url = 'https://auc-web-o8ve.onrender.com/';
//const url = 'http://localhost:8080/';


const insertData = (data, canvasBoxId, boardKey, createDate) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${url}api/idea/${boardKey}/${createDate}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("Data inserted successfully");
                    resolve(xhr.responseText);
                } else {
                    console.log("Failed to insert data");
                    reject(xhr.statusText);
                }
            }
        };
        const body = {
            canvasBox: canvasBoxId,
            description: data,
            boardKey_id: boardKey
        };
        xhr.send(JSON.stringify(body));
    });
}


const updateData = (data, canvasBoxId, itemId, boardKey, createDate) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", `${url}api/idea/${itemId}`, true); // Using PUT method for update
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("Data updated successfully");
                    resolve();
                } else {
                    console.error("Failed to update data:", xhr.statusText);
                    reject(xhr.statusText);
                }
            }
        };
        const body = {
            canvasBox: canvasBoxId,
            description: data,
            boardKey_id: boardKey,
            createDate: createDate
        };
        xhr.send(JSON.stringify(body));
    });
};

const getData = (boardKey, createDate, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${url}api/idea/${boardKey}/${createDate}`, true);
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
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", url + `api/idea/${id}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("Data deleted successfully");
                    resolve();
                } else {
                    console.error("Failed to delete data");
                    reject("Failed to delete data");
                }
            }
        };
        xhr.send();
    });
}



const createNewBoard = (boardKey, date) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
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
        xhr.send();
    });
};

export { insertData, deleteData, getData, updateData, createNewBoard };