const getCurrentDate = () => {

    return new Date().toISOString().split('T')[0];
};

document.getElementById("keyInput").addEventListener("keypress", async function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const currentDate = getCurrentDate();
        await checkKey(this.value.trim(), currentDate);
    }
});


document.getElementById("loginButton").addEventListener("click", async function (event) {
    event.preventDefault();
    const keyInputValue = document.getElementById("keyInput").value.trim();
    if (keyInputValue !== "") {
        const currentDate = getCurrentDate();
        await checkKey(keyInputValue, currentDate);
    } else {
        alert("Bitte Key eingeben.");
    }
});

const checkKey = async (bordKey, boardDate) => {
    try {
        const response = await fetch(`https://auc-web-o8ve.onrender.com/api/idea/login/${bordKey}/${boardDate}`, {
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
                console.log('Board not found');
            } else {
                console.log('Error:', response.statusText);
            }
            showMessage("Key existiert nicht, bitte richtig eingeben!", "error", "message2");

            return false;
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};
