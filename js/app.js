console.log("Conectado");

// Objeto con las recomendaciones de ropa según la temperatura
const recomendaciones = {
  alta: "Hace mucho calor. Te recomendamos usar ropa ligera, como camisetas y pantalones o shorts cortos.",
  media: "El clima está joya. Puedes usar camisetas de manga corta.",
  baja: "Fresco como lechuga. Te recomendamos usar un canguro o campera ligera.",
  muyBaja:
    "Está más frío que el corazón de tu ex. Es mejor que uses ropa abrigada, como un buzo o campera.",
};

// Función para obtener una recomendación de ropa según la temperatura
function obtenerRecomendacion(temperatura) {
  if (temperatura >= 30) {
    return recomendaciones.alta;
  } else if (temperatura >= 20 && temperatura < 30) {
    return recomendaciones.media;
  } else if (temperatura >= 10 && temperatura < 20) {
    return recomendaciones.baja;
  } else {
    return recomendaciones.muyBaja;
  }
}

// Función para mostrar el modal con la recomendación de ropa
function mostrarRecomendacionModal(recomendacion) {
  const modalBody = document.getElementById("recomendacionModalBody");
  modalBody.textContent = recomendacion;

  // Mostrar el modal
  $("#recomendacionModal").modal("show");
}

// Función para simular el clima
function simularClima() {
  let temperaturaInput = document.getElementById("temperatura");
  let ciudadSelect = document.getElementById("ciudad");
  let iteracionesInput = document.getElementById("iteraciones");
  let resultadosDiv = document.getElementById("resultados");

  let temperatura = parseFloat(temperaturaInput.value);
  let ciudad = ciudadSelect.value;
  let iteraciones = parseInt(iteracionesInput.value);

  if (iteraciones < 1 || iteraciones > 5) {
    mostrarRecomendacionModal(
      "La cantidad de iteraciones debe estar entre 1 y 5."
    );
    return;
  }

  const registrosClima = [];

  for (let iteracion = 1; iteracion <= iteraciones; iteracion++) {
    const registro = {
      dia: iteracion,
      ciudad: ciudad,
      temperatura: temperatura,
      recomendacion: obtenerRecomendacion(temperatura),
    };
    registrosClima.push(registro);

    console.log(registro);

    temperatura += Math.floor(Math.random() * 5) - 2; // Simulación de cambio de temperatura
  }

  // Crear un objeto con los datos a almacenar
  const datos = {
    temperatura: temperatura,
    ciudad: ciudad,
    iteraciones: iteraciones,
    registrosClima: registrosClima,
  };

  // Convertir el objeto en una cadena JSON
  let datosJSON = JSON.stringify(datos);

  // Almacenar la cadena JSON en sessionStorage
  sessionStorage.setItem("datos", datosJSON);

  // Muestra los resultados en el elemento "resultadosDiv"
  resultadosDiv.innerHTML = "";

  for (const registro of registrosClima) {
    const resultado = document.createElement("p");
    resultado.textContent = `Día ${registro.dia}: Ciudad ${registro.ciudad} - Temperatura: ${registro.temperatura}ºC - Recomendación: ${registro.recomendacion}`;
    resultadosDiv.appendChild(resultado);
  }
}

// Obtener los datos de sessionStorage y establecerlos como valores predeterminados
let datosJSON = sessionStorage.getItem("datos");

if (datosJSON) {
  // Convertir la cadena JSON en un objeto
  let datos = JSON.parse(datosJSON);

  // Establecer los valores predeterminados en los campos de entrada
  let temperaturaInput = document.getElementById("temperatura");
  let ciudadSelect = document.getElementById("ciudad");
  let iteracionesInput = document.getElementById("iteraciones");

  temperaturaInput.value = datos.temperatura || "";
  ciudadSelect.value = datos.ciudad || "";
  iteracionesInput.value = datos.iteraciones || "";
}

// Limpiar los datos almacenados en sessionStorage
sessionStorage.removeItem("datos");
