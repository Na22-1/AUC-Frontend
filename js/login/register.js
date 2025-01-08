const url = 'https://www.unlearningsupport.de/'
//const url = 'http://localhost:8080/';

const handleCreateKey = () => {
    const bordKey = document.getElementById("keyCreate").value.trim();
    if (bordKey !== "") {
        insertKey(bordKey)
            .then(response => {
                if (response.ok) {
                    showMessage("Key wurde erstellt", "success", "message1");
                } else {
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
    const messageElement = document.getElementById(messageId);
    messageElement.innerText = message;
    messageElement.className = `visible ${type}`;
    setTimeout(() => {
        messageElement.className = "hidden";
    }, 3000);
}

async function insertKey(bordKey) {
    return await fetch(url + `api/idea/create/` + bordKey, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}