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
 



 
app.get("/pruebas", (req, res) => {
    res.render('chat', {chats: [{title: 'Chat 1', id: 1}, {title: 'Chat 2', id: 2}], userId:  1234432});  
})             
 
app.get("/register", (req, res) => {
    res.render("registro")
})

app.get("/", (req, res) => {
    res.render("homePage")
})

app.get("/chat", (req, res) => {
    res.render("chats")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("chats", (req, res) => {
    res.render("chats")
})

// registrar usuario
app.post('/register', (req, res) => {
    const {username, password} = req.body;
    const {error, user} = usuarios.addUser(new Date().getTime(),username, password);
    if(error){
        res.status(400).send({error: true, message: 'Username and password are required!'})
    }
    res.render("homePage")
});

// iniciar sesion
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
app.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    const {error, message} = usuarios.removeUser(id);
    if(error){
        res.status(404).send({error: true, message: 'User not found'})
    }
    res.status(200).send({error: false, message: 'User removed'});
});

// crear chat
app.post('/chats', (req, res) => {
    const {name} = req.body;
    const {error, chat} = chats.addChat(name);
    if(error){
        res.status(400).send({error: true, message: 'Chat name is required!'})
    }
    res.status(200).send({error: false, chat});
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
app.post('/chats/:id/mandarMensaje', (req, res) => {
    const {id} = req.params;
    const {name, mensaje} = req.body;
    const {error, message: message} = chats.addMessageToChat(id, name, mensaje);
    if(error){
        res.status(404).send({error: true, message: 'Chat or user not found'})
    }
    res.status(200).send({error: false, message: 'Message sent'});
});



app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    }
);
