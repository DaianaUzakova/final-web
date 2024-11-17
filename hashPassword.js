const bcrypt = require('bcrypt');

(async () => {
    const password = 'qwerty123'; 
    const hashedPassword = await bcrypt.hash(password, 10); 
    console.log('Хэшированный пароль:', hashedPassword);
})();
