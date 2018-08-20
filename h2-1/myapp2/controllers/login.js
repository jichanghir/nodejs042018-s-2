exports.login = ({email, password}) => new Promise((resolve, reject) => {
    try {
        if (!email || !password) {
            resolve({success: false, message: 'Email and password are required'});
            return;
        }
        if (email !== 'admin@admin.com' || password !== '123') {
            resolve({success: false, message: 'Invalid'});
            return;
        }
        resolve({success: true, message: 'Succes'});
    }
    catch (err) {
        reject(err);
    }
});
