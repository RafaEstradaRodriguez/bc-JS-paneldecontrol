// CARGA DE DATOS
var estado = {
    "accion":"listado",
    "elemento":null
}
var peliculas = [
{ 
  "id" : 1,
  "nombre"  :  "El señor de los anillos", 
  "genero"   :  "Accion",
  "año" : "2010"
},
{ 
  "id" : 2,
  "nombre"  :  "Regreso al Futuro", 
  "genero"   :  "Accion",
  "año" : "1982"
}
];

peliculas.forEach(addPeliGuay);

function addPeli(_peli){

    var tabla = document.querySelector("#tabla_pelis tbody");
    var fila = document.createElement("tr");

    var celdaNombre = document.createElement("td");
    celdaNombre.innerHTML = _peli.id;   
    fila.appendChild(celdaNombre);

    var celdaNombre = document.createElement("td");
    celdaNombre.innerHTML = _peli.nombre;   
    fila.appendChild(celdaNombre);

    var celdaNombre = document.createElement("td");
    celdaNombre.innerHTML = _peli.genero;   
    fila.appendChild(celdaNombre);
    
    var celdaNombre = document.createElement("td");
    celdaNombre.innerHTML = _peli.año;   
    fila.appendChild(celdaNombre);

    var celda3 = document.createElement("td");
    var linkCelda3 = document.createElement("btn");
    linkCelda3.id = "editBtn";
    linkCelda3.classList.add('btn', 'btn-primary', 'm-r-1em');
    linkCelda3.innerHTML = "Editar";
    celda3.appendChild(linkCelda3);
    
    var linkCeldaBorrar = document.createElement("btn");
    linkCeldaBorrar.id = "delBtn";
    linkCeldaBorrar.classList.add('btn', 'btn-danger', 'm-r-1em');
    linkCeldaBorrar.innerHTML = "Borrar";
    celda3.appendChild(linkCeldaBorrar);

    fila.appendChild(celda3);
   
    tabla.appendChild(fila);
    
}

// GUARDAR
var btnGuardar = document.querySelector("#guardar");

btnGuardar.onclick = function() {

    var nombre = document.querySelector("#inputNombre").value;
    var genero = document.querySelector("#inputGenero").value;
    var año = document.querySelector("#inputAño").value;
    if (nombre == ""){
        var div=document.createElement.("div");
        //div.classList.add('alert', 'alert-danger');
        //div.innerHTML="No puedes guardar una pelicula sin nombre";
        //document.append(div);
    }else {
    // Calculamos el nuevo id a mano
    var tabla = document.querySelector("#tabla_pelis");
    var id = tabla.rows.length;

    var peli = {};
    peli.id = id;
    peli.nombre = nombre;
    peli.genero = genero;
    peli.año = año;
    
    addPeliGuay(peli);

    clearForm();
}
}

function clearForm(){
    document.querySelector("#inputNombre").value = "";
    document.querySelector("#inputGenero").value = "";
    document.querySelector("#inputAño").value = "";
}

function addPeliGuay(_peli) {
    var tabla = document.querySelector("#tabla_pelis");
    var row = tabla.insertRow(tabla.rows.length);
    for (var dato in _peli){
        var celda = row.insertCell();
        celda.innerHTML = _peli[dato];
    }

    var celdaLinks = row.insertCell();
    var linkCelda3 = document.createElement("btn");
    linkCelda3.id = "editBtn";
    linkCelda3.classList.add('btn', 'btn-primary', 'm-r-1em');
    linkCelda3.innerHTML = "Editar";
    celdaLinks.appendChild(linkCelda3);
    
    var linkCeldaBorrar = document.createElement("btn");
    linkCeldaBorrar.id = "delBtn";
    linkCeldaBorrar.classList.add('btn', 'btn-danger', 'm-r-1em');
    linkCeldaBorrar.addEventListener("click", borrar);
    linkCeldaBorrar.innerHTML = "Borrar";
    celdaLinks.appendChild(linkCeldaBorrar);
}

// EDITAR
var btnGuardar = document.querySelectorAll("#editBtn");
for (var i = 0; i < btnGuardar.length; i++) {
    btnGuardar[i].addEventListener("click", edit);
}

function edit(e) {
    var btnAct = document.createElement("btn");
    btnAct.id = "actBtn";
    btnAct.classList.add('btn', 'btn-primary', 'm-r-1em');
    btnAct.innerHTML = "Actualizar";
    btnguardar = document.querySelector("#guardar");
    var pos = btnguardar.parentNode;
    btnguardar.parentNode.removeChild(btnguardar);
    pos.appendChild(btnAct);
    var btnAct = document.querySelector("#actBtn");
    fila = e.target.parentNode.parentNode.childNodes;
    for (var i=0;i<fila.length;i++) {
        console.log(fila[i]);
    }

    // Recogemos el id
    var id = fila[0];
    document.querySelector("#inputNombre").value = fila[1].innerHTML;
    document.querySelector("#inputGenero").value = fila[2].innerHTML;
    document.querySelector("#inputAño").value = fila[3].innerHTML;
    btnAct.addEventListener("click",update);
}
function update(){
    fila[1].innerHTML = document.querySelector("#inputNombre").value;
    fila[2].innerHTML = document.querySelector("#inputGenero").value;
    fila[3].innerHTML = document.querySelector("#inputAño").value;
    clearForm();
    var btnAct = document.querySelector("#actBtn");
    var pos = btnAct.parentNode;
    btnAct.parentNode.removeChild(btnAct);
    pos.appendChild(btnguardar);
}
function borrar(e){
    var fila = e.target.parentNode.parentNode;
    fila.parentNode.removeChild(fila);
}