const el = {
  app: document.querySelector('.app')
}
function init() {
  let form = addForm({ class: 'login-form' }, el.app);
  let input = addRichInput({ class: 'login-form-item', id: 'login-input', hidden: true}, 'Master Password', form);
  addElement('span', { class: 'login-form-item error no-error', id: 'login-error', type: 'button' }, 'ERROR', form);

  let onclick = 'submitForm()';
  let buttonText = 'Unlock';
  if(!config) {
    config = new Config("");
    data = {};
    onclick = 'setPassword()';
    buttonText = 'Set Password';
  }
  addElement('button', { class: 'login-form-item', id: 'login-button', type: 'button', onclick: onclick }, buttonText, form);
  input.addEventListener('keydown', e => {
    if(e.key == "Enter") submitForm();
  });
}

init();

function submitForm() {
  let err = document.querySelector('#login-error');
  error(err);
  let input = document.querySelector('#login-input-rich-input');
  // password is empty
  if(input.value == '') {
    error(err, 'show', 'Master password cannot be empty.');
  } else if (input.value == config.masterPassword)  {
    // password is correct
    error(err);

    // reset cooldowns
    // reset cooldowns 
    config.login = new Cooldown();
    save('config');

    ipcRenderer.send('login');



    win.close();
		win.on('closed', () => {
			win = null;
		});


  } else {
    // password is incorrect
    error(err, 'show', 'Password is incorrect.');
    updateAttempts();
  }
}

function setPassword() {
  let err = document.querySelector('#login-error');
  error(err);
  let password = document.querySelector('#login-input-rich-input');
  if(password.value != '') {
    if(password.value.length > 8) {
      config.masterPassword = password.value;
      error(err, 'show-rgb(100, 250, 100)', 'Password set.');
      save();
      setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      error(err, 'show', 'Password must be above 8 characters.');
    }
  } else {
    error(err, 'show', 'Password cannot be empty.');
  }
}