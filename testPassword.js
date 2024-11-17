const bcrypt = require('bcrypt');

(async () => {
    const password = 'qwerty123'; 
    const hash = '$2b$10$0EzkoAgcFy9IJ8bf3SfHP.f8CQMIuDthQc2VbTK5cPg5ny9jzNGkq'; // Хэш из базы данных

    const isMatch = await bcrypt.compare(password, hash);
    console.log('Пароль совпадает:', isMatch);
})();
