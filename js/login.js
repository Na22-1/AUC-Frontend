document.getElementById("keyInput").addEventListener("keypress", async function(event) {
    // Check if the Enter key is pressed
    if (event.key === "Enter") {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Call the checkKey function
        await checkKey(this.value.trim());
    }
});

// Add event listener for button click
document.getElementById("loginButton").addEventListener("click", async function (event) {
    // Prevent the default behavior of the button click
    event.preventDefault();
    // Check if the input field is not empty
    var keyInputValue = document.getElementById("keyInput").value.trim();
    if (keyInputValue !== "") {
        await checkKey(keyInputValue);
    } else {
        alert("Bitte Key eingeben.");
    }
});



const checkKey = async (bordKey) => {
    try {
        const response = await fetch(`https://auc-web-q448.onrender.com/api/idea/login/${bordKey}`, {
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
            // Assuming showMessage function takes three arguments: message, type, and elementId
            showMessage("Key existiert nicht, bitte richtig eingeben!", "error", "message2");

            return false;
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};
