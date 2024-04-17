const express = require('express')
const cors=require("cors")
const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let numeros=[3,5,7,8,1];
let productos=[];


app.get('/productos',(req,res)=>{
    res.json({productos:productos});
})
app.get('/numeros', (req, res) => { //aqui se hace como en general porque tenemos '/numeros'
  res.json({numeros:numeros});
})

app.get('/numeros/:id',(req,res)=>{ //aqui lo hacemos como para buscar en especifico por el id
    let num=parseInt(req.params.id);
    indice=numeros.indexOf(num);
    res.json({tipo:'busqueda',pos:indice});
})
app.get('/productos/:id',(req,res)=>{
    res.json({tipo:'busqueda productos'});
})

app.delete('/numeros/:id',(req,res)=>{
    let num=parseInt(req.params.id);
    let indice=numeros.indexOf(num);
    numeros.splice(indice,1);
    res.json({tipo:'delete'})
})

app.post('/numeros',(req,res)=>{
    let num=req.body.num;
    console.log(num);
    let indice=numeros.indexOf(num);
    if (indice==-1)
        numeros.push(num);
    res.json({tipo:'agregar'})
})

app.post('/productos',(req,res)=>{
    let id=req.body.id;
    //buscar el id, si no existe
    let nombre=req.body.nombre;
    let cantidad=req.body.cantidad;
    let costo=req.body.costo;
    let nuevo={id,nombre,cantidad,costo};
    productos.push(nuevo);
    res.json({tipo:'agregar'});

})
app.listen(3000,()=>{console.log('Escuchando en puerto 3000')});