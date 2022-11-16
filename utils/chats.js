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
        const chat = this.chats.find((chat) => chat.id == id);
        if(chat){
            this.chats = this.chats.map((item) => {
                if(item.id == id){
                    console.log("usuarios antes", item.users)
                    item.users.push({name: user, password: user, chats:[]});
                    console.log("usuarios despues", item.users)

                }
                return item;
            })

            console.log("chats: ", chat.users)
            return {error: false, message: 'User added to chat'}    
        } 
        return {error: true, message: 'Chat not found'}   
    }

  
    getChat(chatId){
        const chats = this.chats
        console.log("chats hola: ", typeof(chats))
        return chats.find((chat) => chat.id == chatId);
    } 

    getAll(){
        return this.chats;
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