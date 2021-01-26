const marked = require('marked');

const el = {
  app: document.querySelector('.app'),
  panel: document.querySelector('.panel'),
  panelItems: {
    add: document.querySelector('#add-control'),
    icon: document.querySelector('img.panel-icon'),
    name: document.querySelector('.panel-name'),
    header: document.querySelector('.panel-header'),
    content: document.querySelector('.panel-content')
  },
  content: document.querySelector('.content')
}
document.body.addEventListener('keydown', e => {
  if (e.altKey && e.code == "KeyA") {
		toggleAdd();
	}
})
let components = {
  panel: {
    add: false
  }
}