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

    removeUser(id){
        const index = this.users.findIndex((user) => user.id === id);
        if(index !== -1){
            this.users.splice(index, 1)[0];
            return {error: false, message: 'User removed'}    
        }
        return {error: true, message: 'User not found'}   

    }

    addChatToUser(id, chat){
        const user = this.users.find((user) => user.id === id);
        if(user){
            this.users = user.chats.push(chat);
            return {error: false, message: 'Chat added to user'}    
        }
        return {error: true, message: 'User not found'}   
    }

    getUser(name){
        return this.users.find((user) => user.name === name);
    }

    changePassword(id, password){
        const user = this.users.find((user) => user.id === id);
        if(user){
            user.password = password;
            return {error: false, message: 'Password changed'}    
        }
        return {error: true, message: 'User not found'}   
    }
}

module.exports = Users; 