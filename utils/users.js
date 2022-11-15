class Users {
    constructor() {
        this.users = [];
    }

    addUser(name,  password){
        if(name.trim().length === 0 || password.trim().length === 0){
            return {error: true, message: 'Username and password are required!'}
        }
        const user = {name, password, chats:[]};
        this.users.push(user);
        return {error: false, user};
    }

    removeUser(name){
        const index = this.users.findIndex((user) => user.name === name);
        if(index !== -1){
            this.users.splice(index, 1)[0];
            return {error: false, message: 'User removed'}    
        }
        return {error: true, message: 'User not found'}   

    }

    addChatToUser(name, chat){
        const user = this.users.find((user) => user.name === name);
        if(user){
            this.users = user.chats.push(chat);
            return {error: false, message: 'Chat added to user'}    
        }
        return {error: true, message: 'User not found'}   
    }

    getUser(name){
        return this.users.find((user) => user.name === name);
    }

    changePassword(name, password){
        const user = this.users.find((user) => user.name === name);
        if(user){
            user.password = password;
            return {error: false, message: 'Password changed'}    
        }
        return {error: true, message: 'User not found'}   
    }
}

module.exports = Users; 