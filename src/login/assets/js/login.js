const el = {
  app: document.querySelector('.app')
}
function init() {
  let form = addForm({ class: 'login-form' }, el.app);
  addRichInput({ class: 'login-form-item', id: 'login-input', hidden: true}, 'Master Password', form);
  addElement('button', { class: 'login-form-item', id: 'login-input', type: 'button' }, 'Unlock', form);
}

init();