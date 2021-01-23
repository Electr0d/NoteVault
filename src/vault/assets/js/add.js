function toggleAdd() {
  togglePanel();
  el.panelItems.add.classList.toggle('rotate');
  el.content.classList.toggle('content-on-panel-down');
  if(!components.panel.add) {
    setPanel('add', icons.add);
    // inputs
    let form = addForm({ class: 'add-form' }, el.panelItems.content);
    let title = addRichInput({ class: 'add-panel-item', id: 'add-title' }, 'Title', form);
    let body = addElement('textarea', { class: 'add-panel-item', id: 'add-body', placeholder: 'Type something here.', rows: '4' }, '', form);

    // event listeners
    body.addEventListener('keydown', e => {
      if(e.key == 'Enter' && e.shiftKey) {
        e.preventDefault();
        e.target.value += "\n";
      } else if(e.key == "Enter") addData();
    });
    title.addEventListener('keydown', e => {
      if(e.key == "Enter") addData();
    });


    // error and submit button
    addElement('span', { class: 'add-panel-item no-error error', id: 'add-error', }, 'error', form);
    addElement('button', { class: 'add-panel-item', id: 'add-submit', type: 'button', onclick: 'addData()' }, 'Add', form);

  } else {
    el.panelItems.content.innerHTML = '';
    setPanel('');
  }
  components.panel.add = !components.panel.add;
}

function togglePanel() {
  el.panel.classList.toggle('panel-down');
}

function setPanel(name, icon) {
  el.panelItems.name.textContent = name;
  if(icon) {
    el.panelItems.icon.src = icon;
  } else {
    el.panelItems.icon.removeAttribute('src');
  }
}

function addData() {
  let err = document.querySelector('#add-error');
  error(err);
  let inputs = [
    document.querySelector('#add-title-rich-input'),
    document.querySelector('#add-body')
  ];
  let pass = true;
  for(let i = 0; i < inputs.length; i++) {
    if(inputs[i].value == '') {
      inputs[i].select();
      error(err, 'show', capitalize(inputs[i].id.replace('add-', '').replace('-rich-input', '')) + ' is empty.');
      pass = false;
      break;
    }
  }
  if(pass) {
    addNote(config.notes.index, inputs[0].value, inputs[1].value);
    data['note_' + config.notes.index] = new Note(config.notes.index, inputs[0].value, inputs[1].value);
    config.notes.index++;
  }
}