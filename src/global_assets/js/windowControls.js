const electron = require('electron');
const remote = electron.remote;
const { ipcRenderer } = electron;

// When document has loaded, initialise
document.onreadystatechange = () => {
	if (document.readyState == 'complete') {
		handleWindowControls();
	}
};

let win = remote.getCurrentWindow();
function handleWindowControls() {
	// Make minimise/maximise/restore/close buttons work when they are clicked
	document.getElementById('min-button').addEventListener('click', (event) => {
		win.minimize();
	});

	try {
		document.getElementById('max-button').addEventListener('click', (event) => {
			win.maximize();
		});
	
		document.getElementById('restore-button').addEventListener('click', (event) => {
			win.unmaximize();
		});
	} catch(err) {
		console.log("%c WARNING: max and restore buttons don't exist.", terminal.orange);
	}

	document.getElementById('close-button').addEventListener('click', (event) => {
			win.close();
	});

	// Toggle maximise/restore buttons when maximisation/unmaximisation occurs
	toggleMaxRestoreButtons();
	win.on('maximize', toggleMaxRestoreButtons);
	win.on('unmaximize', toggleMaxRestoreButtons);

	function toggleMaxRestoreButtons() {
		if (win.isMaximized()) {
			document.body.classList.add('maximized');
		} else {
			document.body.classList.remove('maximized');
		}
	}
}
