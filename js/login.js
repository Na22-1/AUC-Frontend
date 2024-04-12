//tsParticles.loadJSON("tsparticles", "json/particles.json");


document.getElementById("loginButton").addEventListener("click", async function (event) {
    // Prevent the default behavior of the link click
    event.preventDefault();
    // Check if the input field is not empty
    var keyInputValue = document.getElementById("keyInput").value.trim();
    if (keyInputValue !== "") {
        await checkKey(keyInputValue);

    } else {
        alert("Please enter a key.");
    }
});

const checkKey = async (bordKey) => {
    try {
        const response = await fetch(`http://localhost:8080/api/idea/login/${bordKey}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Log the data to the console
            console.log(data.length);
            sessionStorage.setItem('boardData', JSON.stringify(data));
            sessionStorage.setItem('bordKey', bordKey);
            window.location.href = "auc.html";

            return true;
        } else {
            if (response.status === 404) {
                // handle 404 Not Found
                console.log('Board not found');
            } else {
                // handle other status codes
                console.log('Error:', response.statusText);
            }
            showMessage("Key exisitert nicht, bitte richtige eingeben!", "error");

            return false;
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};
