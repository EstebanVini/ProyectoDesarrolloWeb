class Chat {
    constructor() {
        this.chats = [];
    }

    addChat(name, desc, currentUser, id){
        if(name.trim().length === 0){
            return {error: true, message: 'Chat name is required!'}
        }
        const chat = {id, title:name, desc, users: [currentUser], messages: []};
        this.chats.push(chat);
        return {error: false, chat};
    }

   
    
    

    removeChat(id){
        const index = this.chats.findIndex((chat) => chat.id === id);
        if(index !== -1){
            this.chats.splice(index, 1)[0];
            return {error: false, message: 'Chat removed'}    
        }
        return {error: true, message: 'Chat not found'}   
    }

    addUserToChat(id, user){
        const chat = this.chats.find((chat) => chat.id === id);
        if(chat){
            this.chats = chat.users.push(user);
            return {error: false, message: 'User added to chat'}    
        }
        return {error: true, message: 'Chat not found'}   
    }

    removeUserFromChat(id, user){
        const chat = this.chats.find((chat) => chat.id === id);
        if(chat){
            const index = chat.users.findIndex((user) => user.name === name);
            if(index !== -1){
                chat.users.splice(index, 1)[0];
                return {error: false, message: 'User removed from chat'}
            }
            return {error: true, message: 'User not found'}
        }
        return {error: true, message: 'Chat not found'}
    }

    getChat(chatId){

        const chat = this.chats.map((chat) => {
            if(chat.id == chatId){
                return chat;
            }
        });        
        if(chat){
            return chat;
        }
        return null;
    }

    getChats(userName){
        // Buscamos el usuario dentro del arreglo de usuarios
        const chat = this.chats.map((chat) => {
            const user = chat.users.find((user) => user.name === userName);
            if(user){
                console.log(chat)
                return chat;
            }
        });
        
        
        
        if(chat){
            
            return chat;
        }
        return null;
    }

    changeChatName(id, name){
        const chat = this.chats.find((chat) => chat.id === id);
        if(chat){
            chat.name = name;
            return {error: false, message: 'Chat name changed'}    
        }
        return {error: true, message: 'Chat not found'}   
    }

    sendMessage(userMessage, chatName){
        // userMessage = {autor: "djhd", mensaje:"djh"}
        const chat = this.chats.find((chat) => chat.name === chatName);
        if(chat){
            chat.messages.push(userMessage);
            return {error: false, message: 'Message sent'}    
        }
        return {error: true, message: 'Chat not found'}           
    }

    addMessageToChat(chatName, name, message){
        const chat = this.chats.find((chat) => chat.name === chatName);
        if(chat){
            chat.messages.push({name, message});
            return {error: false, message: 'Message added to chat'}    
        }
        return {error: true, message: 'Chat not found'}   
    }
}

module.exports = Chat;