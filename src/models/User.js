const path = require ('path');
const fs = require ('fs');

let User = {

    fileName: path.join(__dirname, '../data/users.json'),

    readDataBase: function() {
        let dataBase = fs.readFileSync(this.fileName, 'utf-8');
        return JSON.parse(dataBase);
    },

    writeDataBase: function(data) {
        users = JSON.stringify(data, null, 4)
        return fs.writeFileSync(this.fileName, users);
    },

    users: function(){return this.readDataBase()},

    findIDUser : function (id) {
        let users = this.users();
        userFound = users.find(user => user.id === id);
        return userFound;
    },

    findUserName : function (userName) {
        let users = this.users();
        userFound = users.find(user => user.userName === userName);
        return userFound;
    },

    findEmailUser : function (email) {
        let users = this.users();
        return users.find(user => user.email == email);
    },

    generateID: function() {
        let users = this.users();
        user = users.pop();
        if (user) {
            return user.id + 1;
        }
        return 1;
    },

    create: function (data) {
        let users = this.users();
        let newUser = data;
        users.push(newUser);
        this.writeDataBase(users);
        return console.log(`El usuario ${newUser.userName} (${newUser.email}) ha sido creado exitosamente`);
    },

    edit: function(userName, userUpdate){
        let users = this.users();
        users = users.filter(user => user.userName !== userName);
        users.push(userUpdate);
        this.writeDataBase(users);
        return console.log(`El usuario ${userUpdate.userName} (${userUpdate.email}) ha sido editado exitosamente`);
    },

    delete: function (userName) {
        let users = this.users();
        let usersUpdate = users.filter((user) => {return user.userName !== userName});
        this.writeDataBase(usersUpdate);
        return `El usuario ${userName} ha sido eliminado correctamente.`
    }
    
};

module.exports = User;
