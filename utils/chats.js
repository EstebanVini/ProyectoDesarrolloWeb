class Chat {
    constructor() {
        this.chats = [];
    }

    addChat(id, name, users){
        if(name.trim().length === 0){
            return {error: true, message: 'Chat name is required!'}
        }
        const chat = {id, name, users};
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

    getChat(id){
        return this.chats.find((chat) => chat.id === id);
    }

    changeChatName(id, name){
        const chat = this.chats.find((chat) => chat.id === id);
        if(chat){
            chat.name = name;
            return {error: false, message: 'Chat name changed'}    
        }
        return {error: true, message: 'Chat not found'}   
    }
}