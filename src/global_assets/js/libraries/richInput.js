function addRichInput(attributes, placeholder, parent) {
  let container, input;

  if(attributes.form) {
    container = addElement('form', { onkeypress:'return event.keyCode != 13', novalidate: '', class: 'rich-input-container ' + attributes.class, id: attributes.id + '-rich-input-container' }, '', parent);
  } else {    
    container = addElement('div', { class: 'rich-input-container ' + attributes.class, id: attributes.id + '-rich-input-container' }, '', parent);
  }

  
  if(attributes.hidden) {
    input = addElement('input', { class: 'rich-input hidden-rich-input', id: attributes.id + '-rich-input', required: '', type: 'password' }, '', container);
  } else {
    input = addElement('input', { class: 'rich-input', id: attributes.id + '-rich-input', required: '' }, '', container);
  }
  
  let label = addElement('label', { class: 'rich-input-label', id: attributes.id + '-rich-input-label' }, '', container);
  addElement('span', { class: 'rich-input-placeholder', id: attributes.id + '-rich-input-placeholder' }, placeholder, label);
  


  // label needs to be added before this because of the CSS selector
  if(attributes.hidden) {
    // create password hide/show switch
    let hideShow = addElement('div', { class: 'hide-show', id: attributes.id + '-hide-show', onclick: 'hideShow(this)' }, '', container);
    addElement('img', { class: 'eye-icon', id: attributes.id + '-eye-icon', src: icons.eye.eye }, '', hideShow);
  }

  if(!attributes.checkValid) input.addEventListener('input', checkRichInputValidity);
  return input;
}
function addForm(attributes, parent) {
  return addElement('form', { novalidate: '', onkeypress: 'return event.keyCode != 13', class: attributes.class, id: attributes.id }, '', parent);
}
function hideShow(e) {
  let input = document.querySelector(`input#${e.id.replace('-hide-show', '')}-rich-input`);
  let icon = document.querySelector(`#${e.id} img`);
  if(input.type == 'password') {
    input.type = 'text';
    icon.src = icons.eye.crossed;
  } else {
    input.type = 'password';
    icon.src = icons.eye.eye;
  }
}

function inputInvalid(input, action) {
  let commonID = input.id.replace('-rich-input', '');
  document.querySelector(`#${commonID}-rich-input-label`).classList[action]('invalid');
  document.querySelector(`#${commonID}-rich-input-placeholder`).classList[action]('invalid');
}

function checkRichInputValidity(e) {
	if(e.target.value == '') {
		inputInvalid(e.target, 'add');
	} else {
		inputInvalid(e.target, 'remove');
	}
}