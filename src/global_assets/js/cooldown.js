function updateAttempts() {
  config.login.attempts++;
  if(config.login.attempts >= 5) {
    config.login.cooldown = 5 * 60 * config.login.cooldowns;
    startCooldown();
  }
  save('config');
}


if(config.login.cooldown > 0) startCooldown();
function startCooldown() {
  let error = document.querySelector('#login-error');
  console.log('started cooldown');
  error.textContent = 'Login disabled. Please wait ' + ((config.login.cooldown - (config.login.cooldown % 60)) / 60) + ' minute(s) and 0 second(s)';
  
  // save
  save('config');
  
  let cooldown = setInterval(()=> {
    error.classList.remove('no-error');
    config.login.cooldown--;
    // calculate minutes and seconds remainaing
    error.textContent = 'Login disabled. Please wait ' + ((config.login.cooldown - (config.login.cooldown % 60)) / 60) + ' minute(s) and ' + (config.login.cooldown % 60) + ' second(s).';
    if(config.login.cooldown <= 0) {
      // clear interval, double cooldowns reset attempts, and remove error message
      clearInterval(cooldown);
      config.login.cooldowns *= 2;
      config.login.attempts = 0;
      error.classList.add('no-error');
      error.textContent = '';
      save('config');
    }
  }, 1000);
}