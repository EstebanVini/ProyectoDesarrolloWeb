const express=require("express")
const mustacheExpress=require("mustache-express")
const app=express()
app.use(express.static("www"))
app.use(express.json())

app.engine('mustache',mustacheExpress())  //Define las vistas de mustache
app.set('view engine','mustache')
app.set('views',__dirname + '/vistas')


app.get('/', (req, res) => {
    res.send('Hello World!');
    } 
);

app.get('/pruebas', (req, res) => {
    res.render('registro') 
    
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    }
);
