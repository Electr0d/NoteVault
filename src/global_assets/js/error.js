function error(e, action, message) {
  let property = action == 'show' ? 'remove' : 'add'; 
  if(message) e.textContent = message;
  e.classList[property]('no-error');
}