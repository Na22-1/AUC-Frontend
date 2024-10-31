import {insertData, getData, updateData, deleteData, createNewBoard, getBoardWithKeyAndDate} from './server/server.js';
import { onClick } from './server/webSocket.js';
import { information } from "./board/boardInfo.js";

let key;
let date;

function createList(listInputId, addBtnId, listId,  canvasBoxId, data, boardKey) {

    const listInput = document.getElementById(listInputId);
    const addToListBtn = document.getElementById(addBtnId);
    const list = document.getElementById(listId);

    if (data.length !== 0) {
        data.forEach((element) => {
            let createdItem = addNewItem(element, list);
            addEditDeleteListener(createdItem, canvasBoxId, boardKey);
        });
    }
    const handleKeypress = (e) => {
        if (e.key === 'Enter') {
            addToListBtn.click();
            if (listInput.value.trim() === '') {
                listInput.blur();
            }
        }
    };
    listInput.addEventListener('keypress', handleKeypress);

    addToListBtn.addEventListener('click', function () {
        const newItemText = listInput.value.trim();
        if (newItemText !== '') {
            addToListBtn.disable = true;

            insertData(newItemText, canvasBoxId, boardKey, date)
                .then(responseData => {
                    let createdItem = addNewItem(JSON.parse(responseData.toString()), list);
                    listInput.value = '';
                    addEditDeleteListener(createdItem, canvasBoxId);
                    addToListBtn.disable = false;
                    onClick(key);
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    });

    const infoBtns = document.querySelectorAll('.infoBtn');
    if (infoBtns) {
        infoBtns.forEach((element) => {
            element.addEventListener('click', () => {
                const num = parseInt(element.id.split('-')[1]);
                const modal = document.getElementById("myModal");
                const span = document.getElementsByClassName("close")[0];
                const modalContent = document.querySelector(".modal-content p");
                modalContent.innerHTML = information[num];

                element.onclick = () => {
                    modal.style.display = "block";
                }

                span.onclick = () => {
                    modal.style.display = "none";
                }

                window.onclick = (event) => {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                }
            });
        })
    }

}

function addNewItem(element, list) {
    const newItem = document.createElement('li');
    const span = document.createElement('span');
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'item-id';
    hiddenInput.value = element.id;
    span.textContent = element.description;
    newItem.appendChild(span);
    newItem.appendChild(hiddenInput);
    list.appendChild(newItem);

    return newItem;
}

function addEditDeleteListener(item, canvasBoxId, boardKey) {
    item.addEventListener('click', (event) => {

        const target = event.target;

        if (target.tagName === 'SPAN') {
            const spanText = target.textContent;
            const inputField = createInputField(spanText);

            const saveData = () => {
                const newText = inputField.value.trim();
                const hiddenInput = item.querySelector('input[type="hidden"]');
                const itemId = hiddenInput ? hiddenInput.value : null;

                if (newText !== '') {
                    const newSpan = document.createElement('span');
                    newSpan.textContent = newText;
                    item.replaceChild(newSpan, inputField);

                    // Update data on the server
                    updateData(newText, canvasBoxId, itemId, boardKey,  date)
                        .then(() => {
                            onClick(key); // Notify websocket
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                } else {
                    item.parentNode.removeChild(item); // Remove the whole list item
                    deleteData(itemId)
                        .then(() => {
                            onClick(key); // Notify websocket
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                }
            };

            inputField.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    saveData();
                    inputField.blur();
                } else if (e.key === 'Escape') {
                    item.replaceChild(target, inputField);
                }
            });

            inputField.addEventListener('blur', () => {
                saveData();
            });

            item.replaceChild(inputField, target);

            inputField.focus();
            item.replaceChild(inputField, target);
            inputField.focus();
        }
    });
}

function refresh(boardKey) {
    if (boardKey === key) {
        getData(boardKey, (responseText) => {
            const fetchedData = JSON.parse(responseText);
            const listIds = ['', 'knowledgeList', 'targetingPrioritizationList', 'teamReflexionList', 'sharedPerspectiveList', 'unlearningVisionList', 'definitionOfUnlearnedList', 'interventionPlanningList', 'actionItemsList', 'measuringUnlearningItemsList', 'feedbackList'];

            listIds.forEach((listId) => {
                let data = fetchedData.filter((item) => item.canvasBox === listIds.indexOf(listId));
                const list = document.getElementById(listId);
                let existingItems = list ? list.getElementsByTagName('li') : [];

                Array.from(existingItems).forEach(item => {
                    let input = item.querySelector('input');
                    let span = item.querySelector('span');
                    let matchingData = data.find(element => input.value === element.id.toString());

                    if (matchingData) {
                        if (input.value === matchingData.id.toString()) {
                            if (span.textContent !== matchingData.description) {
                                span.textContent = matchingData.description; // Update description
                            }
                        }
                    } else {
                        item.remove();
                    }
                });
                data.forEach(element => {
                    let isItemInList = Array.from(existingItems).some(item => {
                        let input = item.querySelector('input');
                        return input.value === element.id.toString();
                    });

                    if (!isItemInList) {
                        let createdItem = addNewItem(element, list);
                        addEditDeleteListener(createdItem, listIds.indexOf(listId));
                    }
                });
            });
        });
    }
}

function load(boardData, boardKey) {
    key = boardKey;

    const createDateInput = document.getElementById('createDate');
    const createDate    = new Date().toISOString().split('T')[0];
    if (createDateInput && !createDateInput.value) {
        createDateInput.value = createDate ;

    }
    date = createDate;
    //createNewBoard(boardKey, date).then(r => );
    if (typeof boardData === 'undefined' || boardData === null || boardData.length === 0) {
        boardData = [];
        callCreateLists(boardData, boardKey, date);
    } else {
        callCreateLists(boardData, boardKey, date);
    }
}


function createInputField(spanText) {
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = spanText;

    inputField.style.backgroundColor = 'transparent';
    inputField.style.border = 'none';
    return inputField;
}

function callCreateLists(boardData, boardKey){

    createList('knowledgeListInput', 'knowledgeToListBtn', 'knowledgeList',
        1, boardData.filter((item) => item.canvasBox === 1), boardKey);
    createList('targetingPrioritizationInput', 'targetingPrioritizationBtn', 'targetingPrioritizationList',
        2, boardData.filter((item) => item.canvasBox === 2), boardKey);
    createList('teamReflexionListInput', 'teamReflexionListBtn', 'teamReflexionList',
        3, boardData.filter((item) => item.canvasBox === 3), boardKey);
    createList('sharedPerspectiveListInput', 'sharedPerspectiveListBtn', 'sharedPerspectiveList',
        4, boardData.filter((item) => item.canvasBox === 4), boardKey);
    createList('unlearningVisionListInput', 'unlearningVisionListBtn', 'unlearningVisionList',
        5, boardData.filter((item) => item.canvasBox === 5), boardKey);
    createList('definitionOfUnlearnedListInput', 'definitionOfUnlearnedListBtn', 'definitionOfUnlearnedList',
        6, boardData.filter((item) => item.canvasBox === 6), boardKey);
    createList('interventionPlanningListInput', 'interventionPlanningListBtn', 'interventionPlanningList',
        7, boardData.filter((item) => item.canvasBox === 7), boardKey);
    createList('actionItemsListInput', 'actionItemsListBtn', 'actionItemsList',
        8, boardData.filter((item) => item.canvasBox === 8), boardKey);
    createList('measuringUnlearningListInput', 'measuringUnlearningListBtn', 'measuringUnlearningItemsList',
        9, boardData.filter((item) => item.canvasBox === 9), boardKey);
    createList('feedbackListInput', 'feedbackListBtn', 'feedbackList',
        10, boardData.filter((item) => item.canvasBox === 10), boardKey);
}

document.getElementById('createDate').addEventListener('change', function() {
    date = this.value;
    const boardKey = sessionStorage.getItem('bordKey');

    if (date && boardKey) {
        createNewBoard(boardKey, date)
            .then(responseData => {
                // Clear existing lists before loading new data
                clearListForNewBoard();

                load(responseData.data, boardKey);
                onClick(key);
                console.log('New board created with date:', date);
            })
            .catch(error => {
                console.error('Error creating board:', error);
            });
    }
});

function clearListForNewBoard() {
    document.getElementById('feedbackList').innerHTML = '';
    document.getElementById('knowledgeList').innerHTML = '';
    document.getElementById('targetingPrioritizationList').innerHTML = '';
    document.getElementById('teamReflexionList').innerHTML = '';
    document.getElementById('sharedPerspectiveList').innerHTML = '';
    document.getElementById('unlearningVisionList').innerHTML = '';
    document.getElementById('definitionOfUnlearnedList').innerHTML = '';
    document.getElementById('interventionPlanningList').innerHTML = '';
    document.getElementById('actionItemsList').innerHTML = '';
    document.getElementById('measuringUnlearningItemsList').innerHTML = '';
}



export { refresh, load };