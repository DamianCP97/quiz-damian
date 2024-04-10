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
let aciertos = 0; //Variable para contar el número de aciertos y mostrarlo al final
const introduccion = document.getElementById('introduccion');
const mensajeFinal = document.getElementById('mensaje-final');
const preguntaFormulario = document.getElementById('pregunta');
const respuestasDiv = document.getElementById('respuestas');
const botonEmpezar = document.getElementById('empezar');
const botonResponder = document.getElementById('responder');
const botonReiniciar = document.getElementById('reiniciar');

function empezarQuiz() {
    // Mezclar el array de preguntas de forma aleatoria
    preguntas.sort(() => Math.random() - 0.5);

    //Ocultar botón de "Responder"
    botonResponder.style.display = 'none';
    mensajeFinal.style.display = 'none';
    botonReiniciar.style.display = 'none';

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

    // Mezclar las respuestas de la pregunta actual de forma aleatoria
    const respuestasAleatorias = preguntas[preguntaActual].respuestas.sort(() => Math.random() - 0.5);

    // Mostrar respuestas de la pregunta actual
    respuestasAleatorias.forEach((respuesta, index) => {
        // Crear elemento de input tipo radio
        const radioInput = document.createElement('input');
        radioInput.setAttribute('type', 'radio');
        radioInput.setAttribute('name', 'quemiras'); //Establecer el mismo nombre para todos los input y que así solo se pueda seleccionar uno
        radioInput.setAttribute('value', respuesta.respuesta); //Para asignarle el valor a cada input
        radioInput.id = 'respuesta' + index; //Le da un ID a cada respuesta

        // Crear la label para el input
        const label = document.createElement('label');
        label.setAttribute('for', 'respuesta' + index); //Lo que hace esto es relacionar el label con el input, para que puedas hacer click en la label y se marque el input. Es decir, si el "for" del elemento label coincide con el id del input, se quedan relacionados.
        label.textContent = respuesta.respuesta; //Texto de la respuesta

         // Crear contenedor para el input y la etiqueta
        const divRespuesta = document.createElement('div');
        divRespuesta.appendChild(radioInput);
        divRespuesta.appendChild(label);

         // Agregar contenedor al div de respuestas
        respuestasDiv.appendChild(divRespuesta);

        // Agregar evento de escucha al botón "Responder"
        botonResponder.addEventListener("click", function() {
            // Obtener la respuesta seleccionada por el usuario
            const respuestaSeleccionada = document.querySelector('input[name="quemiras"]:checked');
            
            // Verificar si se seleccionó alguna respuesta
            if (respuestaSeleccionada) { //Se necesita este if porque así solo se ejecuta una vez al haber un input:checked, si se saca el código fuera del if se ejecutará una vez por cada respuesta que haya y saltan errores en la consola
                const respuestaUsuario = respuestaSeleccionada.value;

                // Obtener la respuesta correcta
                const respuestaCorrecta = preguntas[preguntaActual].respuestas.find(respuesta => respuesta.correcta).respuesta; //Se utiliza el método find() en lugar de filter() porque en este caso solo va a haber una respuesta correcta y el método find() devuelve el primer elemento que cumple con la condición. Si hubiese varias respuestas correctas el método find() no valdría

                // Comparar la respuesta del usuario con la respuesta correcta
                if (respuestaUsuario === respuestaCorrecta) {
                    // La respuesta es correcta
                    console.log("¡Respuesta correcta!");
                    aciertos++;
                } else {
                    // La respuesta es incorrecta
                    console.log("Respuesta incorrecta. La respuesta correcta es: " + respuestaCorrecta);
                }

                //Cambiar de pregunta cada vez que se hace click el botón de "Responder"
                if (preguntaActual < preguntas.length - 1) {
                    preguntaActual++;
                    mostrarPregunta();
                } else {
                    // Mostrar mensaje final y botón de reinicio
                    mensajeFinal.style.display = 'block';
                    mensajeFinal.innerHTML = '¡Felicidades! <br><br> Has conseguido completar el Quiz y tu resultado ha sido de: ';
                    mensajeFinal.innerHTML += aciertos + '/' + preguntas.length; //Hay que ponerle el "+=" para que no se borre el texto anterior
                    
                    if (aciertos === 0) {
                        mensajeFinal.innerHTML += '<br><br>No has acertado ni una, ¿de qué vas? Debería de darte vergüenza mirarme a la cara.';
                    } else if (aciertos > 0 && aciertos <= 2) {
                        mensajeFinal.innerHTML += '<br><br>Te crees que me conoces pero no, siento decirte que no mereces mi respeto.';
                    } else if (aciertos > 2 && aciertos <= 4) {
                        mensajeFinal.innerHTML += '<br><br>No ha estado tan mal como crees, pero sigues sin conocerme a fondo. Mis gustos más profundos siguen siendo un misterio para ti.';
                    } else if (aciertos === 5) {
                        mensajeFinal.innerHTML += '<br><br>Eres una persona maravillosa que me conoce a la perfección. Sabes lo que pienso en todo momento y eso me asusta pero a la vez me gusta.';
                    }
                    
                    preguntaFormulario.style.display = 'none'; //Ocultar preguntas
                    respuestasDiv.innerHTML = ''; // Borrar respuestas anteriores
                    botonResponder.style.display = 'none';
                    botonReiniciar.style.display = 'block';
                }
            }
        });
    });
}

botonReiniciar.addEventListener("click", function() {
    location.reload();
});

empezarQuiz();