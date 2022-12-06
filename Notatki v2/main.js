// all required variables
const popupBox = document.getElementById('new-note'),
      closeBtn = document.querySelector('#close-btn'),
      changeNote = document.getElementById('edited-note'),
      submission = document.querySelector('#submit'),
      title = document.querySelector('.title input'),
      text = document.querySelector('.content textarea'),
      newNote = document.querySelector('.notes');

//for showing the popup window
function showBtn() {
    popupBox.style.display = 'block';
    changeNote.style.display = 'none';
    submission.style.display = 'block';
    text.value = '';
    title.value = '';
    title.classList.remove('focus');
    text.disabled = false;
    title.disabled = false;
}

// close button
closeBtn.addEventListener('click', () => {
    popupBox.style.display = 'none';
})

// for adding new notes
submission.addEventListener('click', () => {
    if(title.value == ''){
        title.classList.add('focus');
    }else{
        let newDate = new Date().toLocaleDateString();

        const notes = {
            date: newDate,
            title: title.value,
            text: text.value
        }

        let local = JSON.parse(localStorage.getItem('notes'));

        if(local == null){
            const arr = [];
            arr.push(notes);
            localStorage.setItem('notes', JSON.stringify(arr))
        }else{
            local.push(notes);
            localStorage.setItem('notes', JSON.stringify(local))
        }

        newNote.innerHTML = `<div class="note add-note" onclick="showBtn()">
                                <span class="material-icons-sharp">add</span>
                            </div>`;

        reload()

        popupBox.style.display = 'none';

        title.value = '';
        text.value = '';
    }
    
})

// function for reloading the notes
function reload(){
    let array = JSON.parse(localStorage.getItem('notes'));

    if(array != null){
        for(let i=array.length-1;i>=0;i--){
            newNote.innerHTML += `<div class="note added-note" id="${i}">
                                    <span class="date">${array[i].date}</span>
                                    <h3 onclick="viewNote()">${array[i].title}</h3>
                                    <div class="buttons">
                                        <div class="edit"><span onclick="editNote()" class="material-icons-sharp">edit_note</span></div>
                                        <div class="delete"><span onclick="deleteNote()" class="material-icons-sharp">delete</span></div>
                                    </div>
                                </div>`
        }
    }
}


// for load all the notes from localstorage after loading the page
window.addEventListener('load', () => {
    reload()
})


// for deleting the notes
function deleteNote(){
    const mark = document.querySelectorAll('.delete');
    let datas = JSON.parse(localStorage.getItem('notes'));
    let remaining;

    for(let i=mark.length-1;i>=0;i--){
        mark[i].onclick = function(){
            this.parentNode.parentNode.remove();

            remaining = datas.filter(data => data != datas[this.parentNode.parentNode.id]);

            localStorage.setItem('notes', JSON.stringify(remaining));

            newNote.innerHTML = `<div class="note add-note" onclick="showBtn()">
                                <span class="material-icons-sharp">add</span>
                            </div>`;

            reload()
        }
    }
}


// for editing the notes
function editNote(){

    text.disabled = false;
    title.disabled = false;
    title.classList.remove('focus');

    let currentData = JSON.parse(localStorage.getItem('notes'));
    let mark = document.querySelectorAll('.edit');
    let noteDate = new Date().toLocaleDateString();
    let updatedNote;

    for(let i=mark.length-1;i>=0;i--){
        mark[i].onclick = function(){
            popupBox.style.display = 'block';
            title.value = currentData[this.parentNode.parentNode.id].title;
            text.value = currentData[this.parentNode.parentNode.id].text;

            submission.style.display = 'none';
            changeNote.style.display = 'block';

            changeNote.onclick = () => {
                if(title.value == ''){
                    title.classList.add('focus');
                }else{
                    if(currentData[this.parentNode.parentNode.id].title != title.value || currentData[this.parentNode.parentNode.id].text != text.value){
                        this.parentNode.parentNode.remove();

                        updatedNote = currentData.filter(data => data != currentData[this.parentNode.parentNode.id])

                        const notes = {
                            date: noteDate,
                            title: title.value,
                            text: text.value
                        }

                        updatedNote.push(notes);
                        localStorage.setItem('notes', JSON.stringify(updatedNote));

                        popupBox.style.display = 'none';

                        newNote.innerHTML = `<div class="note add-note" onclick="showBtn()">
                                                <span class="material-icons-sharp">add</span>
                                            </div>`;

                        reload()
                    }else{
                        popupBox.style.display = 'none';
                    }
                }
            }
        }
    }
}

// for viewing the notes contents
function viewNote(){
    title.classList.remove('focus');

    let currentData = JSON.parse(localStorage.getItem('notes'));
    const noteLists = document.querySelectorAll('.added-note');

    for(let i=noteLists.length-1;i>=0;i--){
        noteLists[i].onclick = function(){
            popupBox.style.display = 'block';
            title.value = currentData[this.id].title;
            text.value = currentData[this.id].text;
        }

        submission.style.display = 'none';
        changeNote.style.display = 'none';

        text.disabled = true;
        title.disabled = true;
    }
}

function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}