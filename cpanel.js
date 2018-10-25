const LIST = "list";
const EDIT = "edit";

var estado = {
    "action" : LIST,
    "elem" : null
};
// CARGA DE DATOS
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

function update(){
    // Revertimos los cambios en los botones y estado
    document.querySelector("#guardar").innerHTML = "Guardar";
    estado.action = LIST;
    // Modificamos el DOM
    var fila = estado.elem.childNodes;
    fila[1].innerHTML = document.querySelector("#inputNombre").value;
    fila[2].innerHTML = document.querySelector("#inputGenero").value;
    fila[3].innerHTML = document.querySelector("#inputAño").value;
    // Reactivamos el boton de borrar
    var delBtn = estado.elem.querySelector("#delBtn");
    delBtn.addEventListener("click", borrar);
    delBtn.classList.remove("btn-warning");
    delBtn.classList.add("btn-danger");
    clearForm();
}

function save(){

    var nombre = document.querySelector("#inputNombre").value;
    var genero = document.querySelector("#inputGenero").value;
    var año = document.querySelector("#inputAño").value;
    // Calculamos el nuevo id a mano
    var tabla = document.querySelector("#tabla_pelis");
    var id = tabla.rows.length;

    var peli = {};
    peli.id = id;
    peli.nombre = nombre;
    peli.genero = genero;
    peli.año = año;
    
    addPeliGuay(peli);

    peliculas.push(peli);
    console.log(peliculas);
    localStorage.setItem("peliculas", JSON.stringify(peliculas));

    clearForm();
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
    var linkCeldaEdit = document.createElement("btn");
    linkCeldaEdit.id = "editBtn";
    linkCeldaEdit.classList.add('btn', 'btn-primary', 'm-r-1em');
    linkCeldaEdit.innerHTML = "Editar";
    linkCeldaEdit.addEventListener("click", edit);

    celdaLinks.appendChild(linkCeldaEdit);
    
    var linkCeldaBorrar = document.createElement("btn");
    linkCeldaBorrar.id = "delBtn";
    linkCeldaBorrar.classList.add('btn', 'btn-danger', 'm-r-1em');
    linkCeldaBorrar.addEventListener("click", borrar);
    linkCeldaBorrar.innerHTML = "Borrar";
    celdaLinks.appendChild(linkCeldaBorrar);
}

// EDITAR
function edit(e) {
    estado.action = EDIT;

    var fila = e.target.parentNode.parentNode.childNodes;

    document.querySelector("#inputNombre").value = fila[1].innerHTML;
    document.querySelector("#inputGenero").value = fila[2].innerHTML;
    document.querySelector("#inputAño").value = fila[3].innerHTML;

    document.querySelector("#guardar").innerHTML = "Actualizar";
    // Añadimos la fila a nuestro objeto estado
    estado.elem = e.target.parentNode.parentNode;
    // Desactivamos el boton de Borrar
    var delBtn = e.target.parentNode.querySelector("#delBtn");
    delBtn.removeEventListener("click", borrar);
    delBtn.classList.add("btn-warning");
    delBtn.classList.remove("btn-danger");
    
}

function borrar(e){
    var fila = e.target.parentNode.parentNode;
    fila.parentNode.removeChild(fila);
}

//localStorage.setItem("peliculas", JSON.stringify(peliculas));

function init(){
        peliculas = JSON.parse(localStorage.getItem("peliculas"));
}

init();

peliculas.forEach(addPeliGuay);

// GUARDAR
var btnGuardar = document.querySelector("#guardar");

btnGuardar.onclick = function() {
    switch (estado.action) {
        case EDIT:
            update();
            break;
        default:
            save();
    }

}