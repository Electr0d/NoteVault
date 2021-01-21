function toggleAdd() {
  togglePanel();
  el.panelItems.add.classList.toggle('rotate');
  if(components.panel.add) {
    setPanel('add', icons.add);
  } else {

  }
  components.panel.add = !components.panel.add;
}

function togglePanel() {
  el.panel.classList.toggle('panel-down');
}

function setPanel(name, icon) {
  el.panelItems.name.textContent = name;
  el.panelItems.icon.src = path.join(__dirname, icon.add);

}