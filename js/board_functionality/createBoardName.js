// Function to save the board name
function saveBoardName() {
    const boardName = document.getElementById('boardName').value;
    localStorage.setItem('boardName', boardName); // Save to localStorage
}

// Event listener to save the board name when the Enter key is pressed
document.getElementById('boardName').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        saveBoardName();
    }
});

function loadBoardInfo() {
    const boardName = localStorage.getItem('boardName');
    return { boardName }; // Updated return
}


export { loadBoardInfo };
