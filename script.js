/*ACTUALMENTE LA RESPUESTA SE DETECTA EN EL DIV DE CADA RESPUESTA PERO ESO ESTA MAL, LO QUE SE TIENE QUE HACER ES DETECTAR LA RESPUESTA CUANDO SE PULSA EL BOTON "RESPONDER". HAY QUE INTENTAR CAMBIAR LA LOGICA PARA VER SI PODEMOS HACER QUE CUANDO SE SELECCIONE UNA RESPUESTA SE "GUARDE" EN UNA VARIABLE O ALGO ASI Y LUEGO SE PUEDA COMPROBAR SI ES CIERTA O NO CUANDO SE HACE CLICK EN EL BOTON "RESPONDER"*/

/*
1. ¿Cuál es mi marca favorita de tenis para running? (Hoka, Nike, Adidas o Saucony)
2. ¿Qué deporte me gusta más? (Gimnasio, escalada, running o pádel)
3. ¿Qué es lo que más me gusta en el mundo? (Comer, dormir, entrenar o jugar)
4. ¿Cuál es una de mis comidas favoritas? (Arroz con pollo, kebab, lasaña o hamburguesa)
5. ¿Cuál es mi estacion favorita? (Invierno, primavera, otoño o verano)
*/

const preguntas = [
    {
        pregunta:"¿Cuál es mi marca favorita de tenis para running?",
        respuestas: [
            {respuesta: "Hoka", correcta: true},
            {respuesta: "Adidas", correcta: false},
            {respuesta: "Nike", correcta: false},
            {respuesta: "Saucony", correcta: false}
        ]
    },
    {
        pregunta:"¿Qué deporte me gusta más?",
        respuestas: [
            {respuesta: "Gimnasio", correcta: true},
            {respuesta: "Escalada", correcta: false},
            {respuesta: "Running", correcta: false},
            {respuesta: "Pádel", correcta: false}
        ]
    },
    {
        pregunta:"¿Qué es lo que más me gusta en el mundo?",
        respuestas: [
            {respuesta: "Entrenar", correcta: true},
            {respuesta: "Comer", correcta: false},
            {respuesta: "Dormir", correcta: false},
            {respuesta: "Jugar", correcta: false}
        ]
    },
    {
        pregunta:"¿Cuál es una de mis comidas favoritas?",
        respuestas: [
            {respuesta: "Kebab", correcta: true},
            {respuesta: "Arroz con pollo", correcta: false},
            {respuesta: "Lasaña", correcta: false},
            {respuesta: "Hamburguesa", correcta: false}
        ]
    },
    {
        pregunta:"¿Cuál es mi estacion favorita?",
        respuestas: [
            {respuesta: "Verano", correcta: true},
            {respuesta: "Otoño", correcta: false},
            {respuesta: "Invierno", correcta: false},
            {respuesta: "Primavera", correcta: false}
        ]
    }
];

//Variables globales
let preguntaActual = 0; //Para saber en qué pregunta estás
const introduccion = document.getElementById('introduccion');
const preguntaFormulario = document.getElementById('pregunta');
const respuestasDiv = document.getElementById('respuestas');
const botonEmpezar = document.getElementById('empezar');
const botonResponder = document.getElementById('responder');

function empezarQuiz() {
    //Ocultar botón de "Responder"
    botonResponder.style.display = 'none';

    //Crear el eventlistener para empezar el Quiz y ocultar la introducción
    botonEmpezar.addEventListener("click", function() {
        botonEmpezar.remove();
        botonResponder.style.display = 'block';
        introduccion.style.display = 'none';

        //Función que muestra las preguntas y sus respuestas
        mostrarPregunta();
    });
}

function mostrarPregunta() {
    preguntaFormulario.innerHTML = preguntas[preguntaActual].pregunta;
    respuestasDiv.innerHTML = ''; // Borrar respuestas anteriores

    // Mostrar respuestas de la pregunta actual
    preguntas[preguntaActual].respuestas.forEach((respuesta, index) => {
        const crearDiv = document.createElement('div');
        crearDiv.classList.add('respuesta');
        crearDiv.innerHTML = respuesta.respuesta; //Aquí es "respuesta.respuesta" porque en el forEach se selecciona cada elemento "respuesta" (se le puede llamar como quieras, simplemente se usa para manejar las iteracciones dentro del forEach) y se muestra su "respuesta" que la que está creada en el array de objetos del principio
        respuestasDiv.appendChild(crearDiv);

        // Agregar nuevo event listener a cada respuesta
        crearDiv.addEventListener('click', function() {
            clickRespuesta(index);
        });
    });
}

// Función para manejar la respuesta
function clickRespuesta(index) {
    const respuestaSeleccionada = preguntas[preguntaActual].respuestas[index];
    if (respuestaSeleccionada.correcta === true) {
        alert("¡Respuesta correcta!");
    } else {
        alert("Respuesta incorrecta. Intenta de nuevo.");
    }
}

empezarQuiz();