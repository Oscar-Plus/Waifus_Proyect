// Definir arreglos , permite guardar muchos objetos / cosas
const waifus = [];
//Funciones---------------------------------------------------------------------------------------------------
// funcion limpiar 
const limpiarContenido = ()=>{
    document.querySelector("#nombre-txt").value = "";
    document.querySelector("#url-txt").value = "";
    document.querySelector("#raza-select").value = "humano";
    document.querySelector("#edad-num").value = 0;
    document.querySelector("#legal-si").checked = true;
};

// funcion boton eliminar
const eliminarWaifu = async function(){
    let res = await Swal.fire({
        title : "Desea eliminar a la waifu " + waifus[this.nro].nombre + " ?",
        showCancelButton : true,
        confirmButtonText : "Si , eliminar!",
        cancelButtonText : "No , lo siento"
    });
    if(res.isConfirmed){
        waifus.splice(this.nro , 1); // "elimina el dato en el arreglo" y dezplaza 1 a los demas
        cargarTabla();               // carga la tabla nuevamente 
        Swal.fire("F por la Waifu");
    }else{
        Swal.fire("eliminación de la waifu cancelada ;)");
    }
};


//crear función
const cargarTabla = ()=>{
    //1. Seleccionar el tbody para usarlo.
    const tbody = document.querySelector("#tabla-tbody");
    // limpiar tabla
    tbody.innerHTML = "" 

    //2. Recorrer el arreglo de waifus
    for(let i = 0 ; i < waifus.length ; ++i ){
        let w = waifus[i]; // obtener waifu

        //3. Por cada waifu generar una fila de la tabla (tr)
        let tr = document.createElement("tr");

        //4. Por cada atributo del guerrero generar una celda (td)
        let tdNom  = document.createElement("td");
        tdNom.innerText = w.nombre;
        let tdUrl  = document.createElement("td");
        // Crear imagen 
        let img = new Image();
        img.classList.add("img-fluid");
        img.width = 100 ;
        img.height = 100;
        img.src = w.url ;  // asignar url
        
        // agregar imagen a celda tdUrl
        tdUrl.appendChild(img);

        let tdRaza = document.createElement("td");
        //creando icono 
        let icono = new Image();
        icono.width = 40 ;
        icono.height = 40;

        // Definiendo icono
        if(w.raza == "humano"){
            icono.src = "https://www.flaticon.es/svg/vstatic/svg/2922/2922576.svg?token=exp=1620441261~hmac=859fabc2a10b6d9dc8f48fd386208de9";
        }else if(w.raza == "demonio"){
            icono.src = "https://www.flaticon.es/premium-icon/icons/svg/3639/3639965.svg";
        }else if(w.raza == "bestia"){
            icono.src = "https://www.flaticon.es/premium-icon/icons/svg/3704/3704644.svg";
        }else if(w.raza == "hibrido"){
            icono.src = "https://i.pinimg.com/originals/95/8f/d1/958fd1b499f23a3f4c25206904ac09d8.jpg";
        }else if(w.raza == "elfo"){
            icono.src = "https://www.flaticon.com/svg/vstatic/svg/4352/4352142.svg?token=exp=1620441618~hmac=58504972b1717f83f53cc3a29ff50494";
        }
        // agregar icono a la celda.
        tdRaza.appendChild(icono);

        let tdEdad = document.createElement("td");
        tdEdad.innerText = w.edad;
        // validando si es legal o nop.
        if(w.edad < 18){
            document.querySelector("#legal-no").checked = true;
            tdNom.classList.add("text-danger");
        }else{
            document.querySelector("#legal-si").checked = true;
        }

        let tdAcciones = document.createElement("td");
        // Crear boton en JS
        let boton = document.createElement("button");
        boton.classList.add("btn" , "btn-danger"); // agregar clases
        boton.innerText = "Eliminar waifu :("; // texto
        boton.nro = i ; // obtener pos
        boton.addEventListener("click" , eliminarWaifu);

        //añadir boton tdAcciones
        tdAcciones.appendChild(boton);

        //5. agregar cada celda a la fila nueva
        tr.appendChild(tdNom);
        tr.appendChild(tdUrl);
        tr.appendChild(tdRaza);
        tr.appendChild(tdEdad);
        tr.appendChild(tdAcciones);


        //6. Agregar la fila al cuerpo de la tabla
        tbody.appendChild(tr);

    };


};


// agraegar un listener para el evento click

document.querySelector("#registrar-btn").addEventListener("click" , ()=>{
    //obtener valor(value) y seleccionar el elmento (querySelector)
    let nombre = document.querySelector("#nombre-txt").value;
    let url    = document.querySelector("#url-txt").value; 
    let raza   = document.querySelector("#raza-select").value; 
    let edad   = document.querySelector("#edad-num").value;
    // checked indica si el radiobutton esta seleccionado
    let legal  = document.querySelector("#legal-si").checked; 
    
    // crear objeto , permite definir muchas propiedades
    let waifu = {};
    waifu.nombre = nombre ;
    waifu.url    = url;
    waifu.raza   = raza;
    waifu.edad   = edad;
    waifu.legal  = legal;
    
    //guardar objeto en arreglo
    waifus.push(waifu);
  

    //LLAMAR A LA FUNCIÓN
    cargarTabla();

   
    // Señal de registro exitoso
    Swal.fire("Exito" , "Waifu registrada!" , "success");

    // limpiar
    document.querySelector("#nombre-txt").value = "";
    document.querySelector("#url-txt").value = "";
    document.querySelector("#raza-select").value = "humano";
    document.querySelector("#edad-num").value = 0;
});

// agregar evento a boton limpiar
document.querySelector("#limpiar-btn").addEventListener("click" , ()=>{
    limpiarContenido();
});