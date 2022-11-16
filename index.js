const express=require("express")
const mustacheExpress=require("mustache-express")
const app=express()
const Users=require("./utils/users") 
const Chats=require("./utils/chats") 
app.use(express.static("www"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.engine('mustache',mustacheExpress())  //Define las vistas de mustache
app.set('view engine','mustache')
app.set('views',__dirname + '/vistas')

usuarios = new Users();
chats = new Chats(); 

var currentUser = null;

usuarios.addUser("admin","admin");
currentUser = usuarios.getUser("admin");
chats.addChat("General","Chat general",currentUser);     
 



 
 
// Mostramos la pagina de registro LISTO
app.get("/register", (req, res) => {
    res.render("registro")
})

// Mostramos la pagina principal LISTO
app.get("/", (req, res) => {
    res.render("homePage")
})


app.get("/chat/:id", (req, res) => {
    res.render("chat", {ussername: currentUser.name, chat: []})
})

// Mostramos la pagina de login LISTO
app.get("/login", (req, res) => {
    res.render("login")
})


// Hacemos Render de los chats del usuario LISTO
app.get("/chats", (req, res) => {
    if(currentUser){
        // Buscamos los chats en los que esta el usuario
        const userChats = chats.getChats(currentUser.name);
        console.log("User chats: ", userChats);
        return res.render("chats", {userId: currentUser.name, chats: userChats});
    } else {
        return res.redirect("/login")
    }
    
})

// registrar usuario LISTO
app.post('/register', (req, res) => {
    const {username, password} = req.body;
    const {error, user} = usuarios.addUser(username, password);
    if(error){
        res.status(400).send({error: true, message: 'Username and password are required!'})
    }
    res.render("homePage")
});

// iniciar sesion LISTO
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    console.log(username, password)
    const user = usuarios.getUser(username);
    if(!user){
        return res.status(400).send({error: true, message: 'User not found'})
    } 
    if(user.password !== password){
        return res.status(400).send({error: true, message: 'Password incorrect'})
    }
    currentUser = user;
    return res.redirect("chats");
});

// eliminar usuario
app.delete('/users/:name', (req, res) => {
    const {name} = req.params;
    const {error, message} = usuarios.removeUser(name);
    if(error){
        res.status(404).send({error: true, message: 'User not found'})
    }
    res.status(200).send({error: false, message: 'User removed'});
});

// crear chat
app.post('/chats', (req, res) => {
    const {name, desc} = req.body;
    console.log(name, desc) 
    const {error, chat} = chats.addChat(name, desc, currentUser);
    console.log("Chat creado: ", chat)
    if(error){
        return res.status(400).send({error: true, message: 'Chat name is required!'})
    }  
    console.log("chats"+chats.getChats(currentUser.name))
    return res.render("chats", {userId: currentUser.name, chats: chats.getChats(currentUser.name)});
}); 

// eliminar chat
app.delete('/chats/:id', (req, res) => {
    const {id} = req.params;
    const {error, message} = chats.removeChat(id);
    if(error){
        res.status(404).send({error: true, message: 'Chat not found'})
    }
    res.status(200).send({error: false, message: 'Chat removed'});
});

// agregar usuario a chat
app.post('/chats/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const {error, message} = chats.addUserToChat(id, name);
    if(error){
        res.status(404).send({error: true, message: 'Chat or user not found'})
    }
    res.status(200).send({error: false, message: 'User added to chat'});
});

// eliminar usuario de chat
app.delete('/chats/:id/:name', (req, res) => {
    const {id, name} = req.params;
    const {error, message} = chats.removeUserFromChat(id, name);
    if(error){
        res.status(404).send({error: true, message: 'Chat or user not found'})
    }
    res.status(200).send({error: false, message: 'User removed from chat'});
});

// obtener chat
app.get('/chats/:id', (req, res) => {
    const {id} = req.params;
    const chat = chats.getChat(id);
    if(!chat){
        res.status(404).send({error: true, message: 'Chat not found'})
    }
    res.status(200).send({error: false, chat});
});

// mandar mensaje a chat
app.post('/chats/:chatName/mandarMensaje', (req, res) => {
    const {chatName} = req.params;
    const {name, mensaje} = req.body;
    const {error, message: message} = chats.addMessageToChat(chatName, name, mensaje);
    if(error){
        res.status(404).send({error: true, message: 'Chat or user not found'})
    }
    res.status(200).send({error: false, message: 'Message sent'});
});



app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    }
);
