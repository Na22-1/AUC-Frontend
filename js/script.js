import {insertData, getData, updateData, deleteData} from './server/server.js';
import {onClick} from './server/webSocket.js';
import {information} from "./board/boardInfo.js";

let key;

function createList(listInputId, addBtnId, listId,  canvasBoxId, data, boardKey, boardName, createDate) {

    const listInput = document.getElementById(listInputId);
    const addToListBtn = document.getElementById(addBtnId);
    const list = document.getElementById(listId);

    if (data.length !== 0) {
        data.forEach((element) => {
            let createdItem = addNewItem(element, list);
            addEditDeleteListener(createdItem, canvasBoxId, boardKey, boardName, createDate);
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

            insertData(newItemText, canvasBoxId, boardKey, boardName, createDate)
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

    document.addEventListener('DOMContentLoaded', () => {
        const dateInput = document.getElementById('date-input');
        if (dateInput) {
            dateInput.addEventListener('change', () => {
                const date = dateInput.value;
                const [year, month, day] = date.split('-');
                dateInput.value = `${day}.${month}.${year}`;
            });
        }
    });


    const infoBtns = document.querySelectorAll('.infoBtn');
    if (infoBtns) {
        infoBtns.forEach((element) => {
            element.addEventListener('click', () => {
                const num = parseInt(element.id.split('-')[1]); // Extract the number after the hyphen
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

function addEditDeleteListener(item, canvasBoxId, boardKey, boardName, createDate) {
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
                    updateData(newText, canvasBoxId, itemId, boardKey, boardName, createDate)
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

                // Update existing items and remove items not present in fetched data
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
    key=boardKey;
    if (typeof boardData === 'undefined' || boardData === null || boardData.length === 0) {
        boardData=[];
        callCreateLists(boardData,boardKey);
    }
    else{
        callCreateLists(boardData,boardKey);
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
        1, boardData.filter((item) => item.canvasBox === 1), boardKey, 'boardName', 'createDate');
    createList('targetingPrioritizationInput', 'targetingPrioritizationBtn', 'targetingPrioritizationList',
        2, boardData.filter((item) => item.canvasBox === 2), boardKey, 'boardName', 'createDate');
    createList('teamReflexionListInput', 'teamReflexionListBtn', 'teamReflexionList',
        3, boardData.filter((item) => item.canvasBox === 3), boardKey, 'boardName', 'createDate');
    createList('sharedPerspectiveListInput', 'sharedPerspectiveListBtn', 'sharedPerspectiveList',
        4, boardData.filter((item) => item.canvasBox === 4), boardKey, 'boardName', 'createDate');
    createList('unlearningVisionListInput', 'unlearningVisionListBtn', 'unlearningVisionList',
        5, boardData.filter((item) => item.canvasBox === 5), boardKey, 'boardName', 'createDate');
    createList('definitionOfUnlearnedListInput', 'definitionOfUnlearnedListBtn', 'definitionOfUnlearnedList',
        6, boardData.filter((item) => item.canvasBox === 6), boardKey, 'boardName', 'createDate');
    createList('interventionPlanningListInput', 'interventionPlanningListBtn', 'interventionPlanningList',
        7, boardData.filter((item) => item.canvasBox === 7), boardKey, 'boardName', 'createDate');
    createList('actionItemsListInput', 'actionItemsListBtn', 'actionItemsList',
        8, boardData.filter((item) => item.canvasBox === 8), boardKey, 'boardName', 'createDate');
    createList('measuringUnlearningListInput', 'measuringUnlearningListBtn', 'measuringUnlearningItemsList',
        9, boardData.filter((item) => item.canvasBox === 9), boardKey, 'boardName', 'createDate');
    createList('feedbackListInput', 'feedbackListBtn', 'feedbackList',
        10, boardData.filter((item) => item.canvasBox === 10), boardKey, 'boardName', 'createDate');
}

export {refresh, load};