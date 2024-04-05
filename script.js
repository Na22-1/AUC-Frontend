import { insertData, getData, updateData, deleteData } from './server.js';
import { onClick } from './webSocket.js';

function createList(listInputId, addBtnId, listId, canVote = false, canvasBoxId, data) {
    const informations = ['',
        `<p class="MsoNormal" style="font-weight: bold">Brainstorming: <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Neue Prozesse, Markt- und Kundenanforderungen können Auslöser für die Probleme sein, die mit aktuellem Wissen im Team verbunden sind. Daher sollen die Teammitglieder Denkweisen und Wissen ständig hinterfragen, ob es noch aktuell ist oder ob eine Veränderung notwendig ist.</p>
        <p>Der Canvas-Prozess beginnt damit, dass jeder zu dem Wort kommen und hier Ideen und wissensbezogene Probleme aufschreiben kann, wo er glaubt, dass aktuelles Wissen und Prozesse verlernt werden müssen.<o:p></o:p></p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Welche Probleme haben wir?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Wo brauchen wir Veränderungen?<o:p></o:p></span></li>
        </ul>`,

        `<p class="MsoNormal" style="font-weight: bold">Knowledge Impediments: <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Wenn man alle Probleme auf einmal löst, kann es schnell zu Verlernenstress kommen. Daher nicht alle Probleme auf einmal lösen! Die Teammitglieder sollen sich für ein Problem entscheiden, bei dem der Veränderungsbedarf am dringendsten ist, und dann versuchen, die Probleme schrittweise zu lösen.<o:p></o:p></p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Was sind die dringendsten und wichtigsten Probleme?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Welches Thema gehen wir erstens ein?<o:p></o:p></span></li>
        </ul>`,

        `<p class="MsoNormal" style="font-weight: bold">Reflexion: <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Ziel ist es, das Problem auf Teamebene zu reflektieren und gemeinsam zu diskutieren, warum das Problem für das gesamte Team hinderlich ist. Auf diese Weise kann ein gemeinsames Verständnis des Problems entwickelt werden.<o:p></o:p></p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Was sehen wir als Team daran hinderlich?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Haben wir für diese Probleme gleichen Vorstellung?<o:p></o:p></span></li>
        </ul>`,

        `<p class="MsoNormal" style="font-weight: bold">Neue Perspektiven: <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Nach der Reflexion kann das Problem aus verschiedenen Blickwinkeln betrachtet und definiert werden, um zu sehen, welche Verbesserungsmöglichkeiten die Veränderung bietet und was dadurch verbessert wird.<o:p></o:p></p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Was wird damit verbessert?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Wo sehen wir Verbesserungsschritte?<o:p></o:p></span></li>
        </ul>`,

        `<p class="MsoNormal" style="font-weight: bold">Vision: <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Alles hat seine Vision. Beim Verlernen kann die Endvision definiert werden, um später festzustellen, ob sich das Team in die richtige Richtung entwickelt.<o:p></o:p></p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Wie stellen wir uns den idealen Zustand vor, wenn das Team erfolgreich verlern hat?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Welche konkreten Vorteile werden wir durch das Verlernen erreichen?<o:p></o:p></span></li>
        </ul>`,

        `<p class="MsoNormal" style="font-weight: bold">Definition of Unlearned: <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Das Team soll ein gemeinsames Commitment und Verständnis für die Veränderungen entwickeln. Auf diese Weise kann Akzeptanz für die Veränderung geschaffen und definiert werden, was gemeinsam erreicht werden soll.<o:p></o:p></p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Was wollen wir erreichen?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Was wollen wir jetzt genau festlegen?<o:p></o:p></span></li>
        </ul>`,

        `<p class="MsoNormal" style="font-weight: bold">Vorbereitung: <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Das Team muss die Veränderungen planen und vorbereiten, wie sie das ganze vorgehen wollen. Daher können hier die Ideen notiert und gesammelt werden, wie das Team das Problem lösen will und wie die Vorgehensweise sein könnte.<o:p></o:p></p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Wie sollen wir gemeinsam, dieses Problem lösen?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Was sollen wir für die Veränderung tun?<o:p></o:p></span></li>
        </ul>`,

        `<p class="MsoNormal" style="font-weight: bold">Action Items: <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Nicht alles auf einmal planen! Im Sprint sollen die Aktionen vorgenommen und geplant werden, die wirklich umsetzbar sind  und für die das Team genügend Kapazitäten hat. So kann das Problem schrittweise gelöst werden.<o:p></o:p></p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Wie gehen wir da schrittweise um?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Welche Action Items nehmen wir im aktuellen Sprint rein?<o:p></o:p></span></li>
        </ul>`,

        `<p class="MsoNormal" style="font-weight: bold">Measuring Unlearning: <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Da kann das Team sich fragen, wie die das Unleraning messen können, um den Erfolg zu bewerten und zu sagen, wie weit wir von der Ziellinie entfernt sind.<o:p></o:p></p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Welche Erkenntnisse haben wir durch die Umsetzung des Action-Items gewonnen?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Wie haben sich die Action Items auf die Leistung und das Ergebnis des Teams ausgewirkt?<o:p></o:p></span></li>
        </ul>`,

        `<p class="MsoNormal" style="font-weight: bold">Feedback: <o:p></o:p></p>
        <p class="MsoNormal" style="text-align: justify;">Nach dem Sprint kann das Team wieder zusammenkommen und gemeinsam die Action Items bewerten. Die gewonnenen Erkenntnisse können dann in die nächste Iteration einfließen und weitere Verbesserungen geplant werden.<o:p></o:p></p>
        <p class="MsoNormal" style="font-weight: bold">Leitfragen: <o:p></o:p></p>
        <p></p>
        <ul type="disc">
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">Was hat funktioniert?<o:p></o:p></span></li>
            <li class="MsoNormal" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:normal;mso-list:l0 level1 lfo1;tab-stops:list 36.0pt"><span style="font-size:12.0pt;font-family:&quot;Times New Roman&quot;,serif;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:DE">War diese auch nützlich?<o:p></o:p></span></li>
        </ul>`
    ];

    const listInput = document.getElementById(listInputId);
    const addToListBtn = document.getElementById(addBtnId);
    const list = document.getElementById(listId);


    if (list) {
        // List exists, so delete its items
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }

    if (data.length !== 0){
        data.forEach((element) => {
            let createdItem = addNewItem(element);
            addEditDeleteListener(createdItem);
            //    canVoteAdd(createdItem);
        });
    }

    addToListBtn.addEventListener('click', function () {
        const newItemText = listInput.value.trim();
        if (newItemText !== '') {
            insertData(newItemText, canvasBoxId)
                .then(responseData => {
                    let createdItem = addNewItem(JSON.parse(responseData));
                    listInput.value = '';
                    addEditDeleteListener(createdItem);
                    //     canVoteAdd(createdItem);
                    onClick();
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    });
    function addNewItem(element){
        const newItem = document.createElement('li');
        const span = document.createElement('span');
        const hiddenInput = document.createElement('input'); // Create hidden input
        hiddenInput.type = 'hidden'; // Set input type to hidden
        hiddenInput.name = 'item-id'; // Set a name for identification if needed
        hiddenInput.value = element.id; // Set the value to the item ID
        span.textContent = element.description;
        newItem.appendChild(span);
        newItem.appendChild(hiddenInput); // Append hidden input to the list item
        list.appendChild(newItem);

        return newItem;
    }

    /*   function canVoteAdd(newItem){
           if (canVote) {
               const voteBtn = document.createElement('button');
               voteBtn.className = 'voteBtn';
               voteBtn.textContent = '+1';
               newItem.appendChild(voteBtn);
               const voteCount = document.createElement('span');
               voteCount.className = 'voteCount';
               voteCount.textContent = '0';
               newItem.appendChild(voteCount);
               addVoteListener(newItem);
           }
       }*/
    /*   function addVoteListener(item) {
           const voteBtn = item.querySelector('.voteBtn');
           const voteCount = item.querySelector('.voteCount');

           voteBtn.addEventListener('click', function (e) {
               e.stopPropagation(); // Prevents the event from bubbling up to the parent span
               let currentCount = parseInt(voteCount.textContent);
               voteCount.textContent = currentCount + 1;
           });
       }*/
    function addEditDeleteListener(item) {
        item.addEventListener('click', function (event) {
            const target = event.target;
            if (target.tagName === 'SPAN' && target.classList.contains('voteCount')) {
                event.stopPropagation();
                return;
            }

            if (target.tagName === 'SPAN') {
                const spanText = target.textContent;
                const inputField = document.createElement('input');
                inputField.type = 'text';
                inputField.value = spanText;
                inputField.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter') {
                        const newText = inputField.value.trim();
                        const hiddenInput = item.querySelector('input[type="hidden"]');
                        const itemId = hiddenInput.value;
                        if (newText !== '') {
                            const newSpan = document.createElement('span');
                            newSpan.textContent = newText;
                            item.replaceChild(newSpan, inputField);
                            // Update data on the server
                            updateData(newText, canvasBoxId, itemId)
                                .then(() => {
                                    onClick(); // Notify websocket
                                })
                                .catch(error => {
                                    console.error("Error:", error);
                                });
                        } else {
                            item.parentNode.removeChild(item); // Remove the whole list item
                            deleteData(itemId)
                                .then(() => {
                                    onClick(); // Notify websocket
                                })
                                .catch(error => {
                                    console.error("Error:", error);
                                });
                        }
                        //    item.removeChild(inputField);
                        inputField.blur(); // Unfocus the input field
                    } else if (e.key === 'Escape') {
                        item.removeChild(inputField);
                    }
                });
                item.replaceChild(inputField, target);
                inputField.focus();
            }
        });
    }

    listInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addToListBtn.click();
            if (listInput.value.trim() === '') {
                listInput.blur();
            }
        }
    });
    var infoBtns = document.querySelectorAll('.infoBtn');
    if (infoBtns) {
        infoBtns.forEach((element) => {
            element.addEventListener('click', function() {
                var num = parseInt(element.id.split('-')[1]); // Extract the number after the hyphen
                var modal = document.getElementById("myModal");
                var span = document.getElementsByClassName("close")[0];
                var modalContent = document.querySelector(".modal-content p");
                modalContent.innerHTML = informations[num];

                element.onclick = function() {
                    modal.style.display = "block";
                }


                span.onclick = function() {
                    modal.style.display = "none";
                }

                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            });
        })
    }
}

function load(){
    getData((responseText) => {
        const data = JSON.parse(responseText);

        createList('brainstorminglistInput', 'brainstormingaddToListBtn', 'brainstormingList', true,
            1, data.filter((item) => item.canvasBox === 1));
        createList('knowledgelistInput', 'knowledgeToListBtn', 'knowledgeList', false,
            2, data.filter((item) => item.canvasBox === 2));
        createList('reflexionListInput', 'reflexionListBtn', 'reflexionList', false,
            3, data.filter((item) => item.canvasBox === 3));
        createList('neuePerspektivenListInput', 'neuePerspektivenListBtn', 'neuePerspektivenList', false,
            4, data.filter((item) => item.canvasBox === 4));
        createList('VisionListInput', 'VisionListBtn', 'VisionList', false,
            5, data.filter((item) => item.canvasBox === 5));
        createList('definitionOfUnlearnedListInput', 'definitionOfUnlearnedListBtn', 'definitionOfUnlearnedList', false,
            6, data.filter((item) => item.canvasBox === 6));
        createList('vorbereitungListInput', 'vorbereitungListBtn', 'vorbereitungList', false,
            7, data.filter((item) => item.canvasBox === 7));
        createList('actionItemsListInput', 'actionItemsListBtn', 'actionItemsList', false,
            8, data.filter((item) => item.canvasBox === 8));
        createList('measuringUnlearningListInput', 'measuringUnlearningListBtn', 'measuringUnlearningItemsList', false,
            9, data.filter((item) => item.canvasBox === 9));
        createList('feedbackListInput', 'feedbackListBtn', 'feedbackList', false,
            10, data.filter((item) => item.canvasBox === 10));
    });
}

load();

export {load}
