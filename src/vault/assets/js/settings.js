let settingsWindow;
function toggleSettings() {
  settingsWindow = new Window('settings', 'Settings', { src: icons.gear, rotate: true, width: '20px' });

  // form
  let form = addForm({ class: 'change-password' }, settingsWindow.body);
  
  // inputs
  addRichInput({ class: 'change-password-item', id: 'change-password-old', hidden: true }, 'Old password', form);
  addRichInput({ class: 'change-password-item', id: 'change-password-new', hidden: true }, 'New password', form);
  addRichInput({ class: 'change-password-item', id: 'change-password-confirm', hidden: true }, 'Confirm new password', form);
  
  // error span and button
  addElement('span', { class: 'error no-error change-password-item', id: 'change-password-error' }, '', form);
  addElement('button', { class: 'change-password-item', id: 'change-password-button', type: 'button', onclick: 'changePassword()' }, 'Change Password', form);
}

function changePassword() {
  let inputs = [
    document.querySelector('#change-password-old-rich-input'),
    document.querySelector('#change-password-new-rich-input'),
    document.querySelector('#change-password-confirm-rich-input')
  ];
  let err = document.querySelector('#change-password-error');
  let pass = true;
  for(let i = 0; i < inputs.length; i++) {
    if(inputs[i].value == '') {
      inputs[i].select();

      // throw error

      // remove "change-password-" and "-rich-input" leaving out "old" then capitalize it
      error(err, 'show', capitalize(inputs[i].id.replace('change-password-', '').replace('-rich-input', '')) + ' password is empty.');
      pass = false;
      break;
    }
  }

  if(pass) {
    if(inputs[1].value != inputs[2].value) {
      error(err, 'show', 'New passwords do not match.');
    } else if(inputs[0].value == inputs[1].value) {
      error(err, 'show', 'Old and new passwords match.');
    } else if(inputs[0].value != config.masterPassword) {
      error(err, 'show', 'Old password is incorrect.');
    } else {
      config.masterPassword = inputs[1].value;
      save('config');
      error(err, 'show-rgb(100, 250, 100)', 'Password changed!');

      setTimeout(()=> {
        settingsWindow.close();
      }, 1000);
    }
  }
}