tsParticles.loadJSON("tsparticles", "json/particles.json");

document.getElementById("createKey").addEventListener("click", function () {
    var bordKey = document.getElementById("keyCreate").value.trim();
    if (bordKey !== "") {
        insertKey(bordKey)
            .then(response => {
                if (response.ok) {
                    // handle successful response
                    showMessage("Key wurde erstellt", "success");
                    // perform any additional checks or actions here
                } else {
                    // handle error response
                    showMessage("Key existiert schon, bitte nochmal versuchen!", "error");
                }
            })
            .catch(error => {
                // handle any errors that occurred during the fetch request
                console.error(error);
                showMessage("Ein Fehler ist aufgetreten, bitte versuchen Sie es später erneut!", "error");
            });
    } else {
        alert("Please enter a key.");
    }
});

const url = 'http://localhost:8080/'

const showMessage = (message, type) => {
    var messageElement = document.getElementById("message");
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