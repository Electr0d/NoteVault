const controlsUI = {
  expand: {
    src: icons.arrowDown,
    onclick: 'expandToggle(this)'
  },
  copy: {
    src: icons.copy,
    onclick: 'copy(this)'
  },
  edit: {
    src: icons.pencil,
    onclick: 'edit(this)'
  },
  delete: {
    src: icons.trashcan,
    onclick: 'deleteNote(this)'
  },
  fullscreen: {
    src: icons.fullscreen,
    onclick: 'fullscreenToggle(this)'
  }
}

function addNote(index, title, body) {
  let note = addElement('div', { class: 'note', id: 'note-' + index }, '', el.content);
  let header = addElement('div', { class: 'note-item note-header', id: 'note-header-' + index }, '', note);
  
  addElement('textarea', { class: 'note-header-item note-title', id: 'note-title-' + index, readonly: '' }, title, header);

  // controls
  let controls = addElement('div', { class: 'note-header-item note-controls', id: 'note-controls-' + index }, '', header);

  for(let control  in controlsUI) {
    let c = addElement('div', { class: `note-control-item ${control}-control`, id: control + '-control-' + index, onclick: controlsUI[control].onclick, onmouseover: `addTooltip(this, "${capitalize(control)}")` }, '', controls);
    addElement('img', { class: 'note-control-image', src: controlsUI[control].src }, '', c);
  }
  addElement('div', { class: 'note-item note-body note-body-hidden', id: 'note-body-' + index, innerHTML: 'innerHTML' }, marked(body), note);
}


function expandToggle(e, action) {
  let index = e.id.replace("expand-control-", "");
  let header = document.querySelector('#note-header-' + index);
  let body = document.querySelector('#note-body-' + index);
  let act = action ? action : 'toggle';
  let altAction = action == 'add' ? 'remove' : action == 'remove' ? 'add' : 'toggle';

  header.classList[act]('note-header-expand');
  body.classList[altAction]('note-body-hidden');
  document.querySelector(`#expand-control-${index} img`).classList[act]('rotate-control');

}

function deleteNote(e) {
  let index = Number(e.id.replace('delete-control-', ''));
  let note = document.querySelector('#note-' + index);
  note.classList.add('note-draw-out');
  setTimeout(()=> {
    el.content.removeChild(note);
    
    delete data['note_' + index];
    let notes = document.querySelectorAll('.note');
    // shift data
    for (let i = index + 1; i < config.notes.index; i++) {
			let note = data['note_' + i];
			data['note_' + (i - 1)] = {
				title: note.title,
				body: note.body,
				index: i - 1,
      };
    }


    // update elements
    for(let i = 0; i < notes.length; i++) {
      notes[i].id = 'note-' + i;
      
      
      let children = document.querySelectorAll(`#note-${i} *`);
      for(let x = 0; x < children.length; x++) {
        children[x].id = children[x].id.replace(i + 1, i);
      }
    }

    config.notes.index--;
    delete data['note_' + config.notes.index];


    //
  }, 200);
}


function copy(e) {
  let index = e.id.replace('copy-control-', '');
  let content = document.querySelector('#note-body-' + index);
  
  let type = content.tagName == 'DIV' ? 'textContent' : 'value';
  
  // get text
  let text = content[type];


  // add input, copy, then remove
  let input = addElement('input', { style: 'height: 0; border: 0; padding: 0; margin: 0' }, text, document.body);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);


  // display to user
  toast('Copied to clipboard!')
}


function edit(e) {
  let index = e.id.replace('edit-control-', '');
  let img = document.querySelector(`#${e.id} img`);
  let deleteID = '#delete-control-' + index;
  let deleteControl = document.querySelector(deleteID);
  let deleteImage = document.querySelector(deleteID + ' img');
  document.querySelector('#note-title-' + index).removeAttribute('readonly');


  let body = document.querySelector('#note-body-' + index);
  body.textContent = data['note_' + index].body;
  body.outerHTML = body.outerHTML.replace(/div/g, 'textarea');



  // change icon and attributes
  img.src = icons.confirm;
  e.id = 'confirm-control-' + index;
  e.setAttribute('onclick', 'confirmEdit(this)');


  // change icon and attributes
  deleteImage.src = icons.remove;
  deleteControl.id = 'cancel-control-' + index;
  deleteControl.setAttribute('onclick', 'cancelEdit(this)');
}



function cancelEdit(e) {
  let index = e.id.replace('cancel-control-', '');
  let img = document.querySelector(`#${e.id} img`);
  let confirmID = '#confirm-control-' + index;
  let confirmControl = document.querySelector(confirmID);
  let confirmImage = document.querySelector(confirmID + ' img');

  
  // reset delete/cancel button
  img.src = icons.trashcan;
  e.id = 'delete-control-' + index;
  e.setAttribute('onclick', 'deleteNote(this)');


  // reset edit/confirm button
  confirmImage.src = icons.pencil;
  confirmControl.id = 'edit-control-' + index;
  confirmControl.setAttribute('onclick', 'edit(this)');



  let noteData = data['note_' + index];

  // reset title values
  let title = document.querySelector(`#note-title-${index}`)
  title.setAttribute('readonly', '');
  title.value = noteData.title

  // reset body values
  let body = document.querySelector('#note-body-' + index);
  body.outerHTML = body.outerHTML.replace(/textarea/g, 'div');
  body = document.querySelector('#note-body-' + index);
  body.innerHTML = marked(noteData.body);

}

function confirmEdit(e) {
  let index = e.id.replace('confirm-control-', '');
  let img = document.querySelector(`#${e.id} img`);
  let deleteID = '#cancel-control-' + index;
  let deleteControl = document.querySelector(deleteID);
  let deleteImage = document.querySelector(deleteID + ' img');
  
  let title = document.querySelector('#note-title-' + index);
  let body = document.querySelector('#note-body-' + index);
  
  // make sure both inputs are not empty
  if(title.value != '' && body.value != '') {
    // reset delete/cancel button
    img.src = icons.pencil;
    e.id = 'edit-control-' + index;
    e.setAttribute('onclick', 'edit(this)');
    
    
    // reset edit/confirm button
    deleteImage.src = icons.trashcan;
    deleteControl.id = 'delete-control-' + index;
    deleteControl.setAttribute('onclick', 'deleteNote(this)');
    
    // update data
    let noteData = data['note_' + index];
    noteData.title = title.value;
    noteData.body = body.value;

    
    // disable edit
    title.setAttribute('readonly', '');

    // update body values
    body.outerHTML = body.outerHTML.replace(/textarea/g, 'div');
    body = document.querySelector('#note-body-' + index);
    body.innerHTML = marked(noteData.body);
    
  }
}


function fullscreenToggle(e) {
  let index = e.id.replace('fullscreen-control-', '');
  document.querySelector(`#fullscreen-control-${index} img`).classList.toggle('rotate-control');
  let icon = document.querySelector(`#${e.id} img`);
  let img = icon.src.includes('unfullscreen') ? 'fullscreen' : 'unfullscreen';
  icon.src = icons[img];


  el.app.classList.toggle('disable-scroll');
  el.content.classList.toggle('note-fullscreen');
  document.querySelector('#note-' + index).classList.toggle('note-fullscreen');
  
  // expand button
  let expand = document.querySelector(`#expand-control-${index}`);
  let expandImage = document.querySelector(`#expand-control-${index} img`);
  let action = expandImage.classList.contains('rotate-control') && el.content.classList.contains('note-fullscreen') ? 'add' : 'toggle';
  expandToggle(expand, action);
  let attributeType = expand.hasAttribute('onclick') ? 'removeAttribute' : 'setAttribute';

  expand[attributeType]('onclick', 'expandToggle(this)');
}