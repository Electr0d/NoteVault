function error(e, action, message) {
  let ac = action ? action.split('-') : [''];
  let property = ac[0] == 'show' ? 'remove' : 'add'; 
  if(message) e.textContent = message;
  if(ac[1]) e.style = 'color: ' + ac[1];
  e.classList[property]('no-error');
}