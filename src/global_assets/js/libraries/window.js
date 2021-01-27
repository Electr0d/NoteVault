class Window {
  constructor(id, title, icon) {
    // create overlay
    this.overlay = addElement('overlay', {id: id + '-overlay' }, '', el.app);
    
    // create window
    this.window = addElement('div', { class: 'popup window', id: id + '-window' }, '', this.overlay);
    
    // create titlebar
    this.titlebar = addElement('div', { class: 'title-bar', id: id + '-title-bar' }, '', this.window);
    
    // create info section
    this.info = addElement('div', { class: 'title-bar-item title-bar-info' }, '', this.titlebar);
    
    // create icon and text
    if(icon) {
      this.img = addElement('img', { class: 'window-icon icon', id: id + '-window-icon', src: icon.src, style: `width: ${icon.width}` }, '', this.info);
      if(icon.rotate) this.img.classList.add('rotate');
    }
    addElement('div', { class: 'window-title', id: id + '-window-title' }, title, this.info);
    
    // create controls
    this.controls = addElement('div', { class: 'window-controls controls', id: id + '-window-controls', onclick: `removeWindow("${id}")` }, '', this.titlebar);
    addElement('img', { class: 'window-controls-item window-close', id: id + '-window-close', src: '../global_assets/img/window_icons/close.png' }, '', this.controls);
    
    // create window body
    this.body = addElement('div', { class: 'window-body', id: id + '-window-body' }, '', this.window);
  }


  close() {
    removeWindow(this.overlay.id.replace('-overlay', ''));
  }
  
}

function removeWindow(id) {
  document.querySelector(`#${id}-window`).classList.add('popup-draw-out');
  document.querySelector(`#${id}-overlay`).classList.add('popup-draw-out');
  setTimeout(() => {
    el.app.removeChild(document.querySelector(`#${id}-overlay`));
  }, 200);
}