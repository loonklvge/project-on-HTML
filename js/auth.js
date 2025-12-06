function registerUser(email, name, password) {
    const users = getUsers();
    
    if (users.find(user => user.email === email)) {
        return { success: false, message: 'Пользователь с таким email уже существует' };
    }
    
    const newUser = {
        id: Date.now(),
        email: email,
        name: name,
        password: password,
        createdAt: new Date().toISOString(),
        orders: []
    };
    
    users.push(newUser);
    saveUsers(users);
    
    loginUser(email, password);
    
    return { success: true, message: 'Регистрация прошла успешно!', user: newUser };
}

function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        const safeUser = { 
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
            orders: user.orders || []
        };
        localStorage.setItem(currentUserKey, JSON.stringify(safeUser));
        return { success: true, message: 'Вход выполнен успешно!', user: safeUser };
    } else {
        return { success: false, message: 'Неверный email или пароль' };
    }
}