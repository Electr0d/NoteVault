const el = {
  panel: document.querySelector('.panel'),
  panelItems: {
    add: document.querySelector('#add-control'),
    icon: document.querySelector('img.panel-icon'),
    name: document.querySelector('.panel-name'),
  }
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