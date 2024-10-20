// Function to save create date when Enter is pressed or input loses focus
function saveCreateDate() {
    var createDate = document.getElementById('createDate').value;
    if (createDate) {
        localStorage.setItem('createDate', createDate); // Save the date to localStorage
    }
}

document.getElementById('createDate').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') { // Check if Enter key is pressed
        saveCreateDate();
    }
});

document.getElementById('createDate').addEventListener('blur', function() {
    saveCreateDate();
});
