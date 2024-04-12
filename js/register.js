const url = 'https://auc-web-q448.onrender.com/'
const handleCreateKey = () => {
    var bordKey = document.getElementById("keyCreate").value.trim();
    if (bordKey !== "") {
        insertKey(bordKey)
            .then(response => {
                if (response.ok) {
                    // handle successful response
                    showMessage("Key wurde erstellt", "success", "message1");
                    // perform any additional checks or actions here
                } else {
                    // handle error response
                    showMessage("Key existiert schon, bitte nochmal versuchen!", "error", "message1");
                }
            })
            .catch(error => {
                // handle any errors that occurred during the fetch request
                console.error(error);
                showMessage("Ein Fehler ist aufgetreten, bitte erneut versuchen.", "error", "message1");
            });
    } else {
        alert("Bitte Key eingeben.");
    }
}

document.getElementById("createKey").addEventListener('click', handleCreateKey);

document.getElementById("keyCreate").addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        handleCreateKey();
    }
});

const showMessage = (message, type, messageId) => {
    var messageElement = document.getElementById(messageId);
    messageElement.innerText = message;
    messageElement.className = `visible ${type}`;
    setTimeout(() => {
        messageElement.className = "hidden";
    }, 3000);
}

async function insertKey(bordKey) {
    const response = await fetch(url + `api/idea/create/` + bordKey, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}