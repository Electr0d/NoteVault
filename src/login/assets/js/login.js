

const el = {
  app: document.querySelector('.app')
}
function init() {
  let form = addForm({ class: 'login-form' }, el.app);
  let input = addRichInput({ class: 'login-form-item', id: 'login-input', hidden: true}, 'Master Password', form);
  addElement('span', { class: 'login-form-item error no-error', id: 'login-error', type: 'button' }, 'ERROR', form);
  addElement('button', { class: 'login-form-item', id: 'login-button', type: 'button', onclick: `submitForm()` }, 'Unlock', form);
  input.addEventListener('keydown', e => {
    if(e.key == "Enter") submitForm();
  });
}

init();

function submitForm() {
  error('add');
  let input = document.querySelector('#login-input-rich-input');
  // password is empty
  console.log(input.value, config.masterPassword);
  if(input.value == '') {
    error('remove', 'Master password cannot be empty.');
  } else if (input.value == config.masterPassword)  {
    // password is correct
    error('add');
    ipcRenderer.send('login');
    win.close();
		win.on('closed', () => {
			win = null;
		});


  } else {
    // password is incorrect
    error('remove', 'Password is incorrect.');
  }
}

function error(action, message) {
  let error = document.querySelector('#login-error');
  if(message) error.textContent = message;
  error.classList[action]('no-error');
}