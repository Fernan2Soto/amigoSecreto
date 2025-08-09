// Lista de participantes del juego
const participants = [ ];

//agregar participantes
function agregarAmigo() {
    const nameInput = document.getElementById('amigo');
    agregarAmigoALista(nameInput);
}

// Agegamos nombre a la lista de participantes y mostramos el nombre en la lista del HTML
function agregarAmigoALista(nameInput) {
    const name = nameInput.value.trim();
    if (name) {
        //Agrgamos el nombre a la lista de participantes
        participants.push({ nombre: name, estado: 'Disponible', amigo: null });
        // Mostramos el nombre en la lista del HTML
        nameInput.value = '';
        const lista = document.getElementById('listaAmigos');
        lista.appendChild(Object.assign(document.createElement('li'), { textContent: name }));
    }else {
        alert('Por favor, ingresa un nombre válido.');
    }
    //console.log(participants);
}

function sortearAmigo() {
    if (participants.length < 2) {
        alert('Necesitas al menos dos participantes para sortear amigos.');
        return;
    }

    // Creamos una copia de los participantes para asignar amigos
    let disponibles = participants.slice();

    // Mezclamos la copia para asignar aleatoriamente
    for (let i = disponibles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [disponibles[i], disponibles[j]] = [disponibles[j], disponibles[i]];
    }

    // Verificamos que nadie se asigne a sí mismo
    for (let i = 0; i < participants.length; i++) {
        if (participants[i].nombre === disponibles[i].nombre) {
            // Si alguien se asignó a sí mismo, volvemos a sortear
            return sortearAmigo();
        }
    }

    // Asignamos los amigos secretos
    for (let i = 0; i < participants.length; i++) {
        participants[i].amigo = disponibles[i].nombre;
        participants[i].estado = 'Asignado';
    }

    // Mostramos los resultados en consola (puedes mostrarlo en el HTML si lo deseas)
    // console.log('Resultados del sorteo:', participants);
    const lista = document.getElementById('listaAmigos');
    // Limpiar la lista antes de mostrar los resultados
    lista.innerHTML =  `${participants[0].nombre} has click en "Ver Amigo" para ver tu amigo secreto.`;
    
    document.getElementById('btnAmigo').style.display = 'none';
    document.getElementById('btnSortear').style.display = 'none';
    document.getElementById('btnVerAmigo').style.display = 'block';
    document.getElementById('btnReiniciar').style.display = 'block';
  
}

function VerAmigo() {
    // Variable para llevar el índice del participante actual
    if (typeof VerAmigo.currentIndex === 'undefined') {
        VerAmigo.currentIndex = 0;
    }

    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    if (VerAmigo.currentIndex < participants.length) {
        const participante = participants[VerAmigo.currentIndex];
        const li = document.createElement('li');
        li.textContent = `${participante.nombre}!! tu amigo secreto es: ${participante.amigo }`;
        lista.appendChild(li);

        // Deshabilitar el botón para evitar múltiples clics
        document.getElementById('btnVerAmigo').disabled = true;

        setTimeout(() => {
            lista.innerHTML = '';
            VerAmigo.currentIndex++;
            document.getElementById('btnVerAmigo').disabled = false;
            // Mostrar el nombre de quien continúa, si hay más
            if (VerAmigo.currentIndex < participants.length) {
                const siguiente = participants[VerAmigo.currentIndex].nombre;
                alert(`Ahora es el turno de: ${siguiente}`);
                li.textContent = `${siguiente} has click en "Ver Amigo" para ver tu amigo secreto.`;
                lista.appendChild(li);
            } else {
                alert('Ya se mostraron todos los amigos secretos.');
                VerAmigo.currentIndex = 0;
            }
        }, 5000);
    } else {
        // Reinicia el índice si ya se mostraron todos
        VerAmigo.currentIndex = 0;
        alert('Ya se mostraron todos los amigos secretos.');
    }
}
function reiniciarJuego() {
    // Limpiar la lista de participantes y resultados
    participants.length = 0;
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    
    // Reiniciar los botones
    document.getElementById('btnAmigo').style.display = 'block';
    document.getElementById('btnSortear').style.display = 'block';
    document.getElementById('btnVerAmigo').style.display = 'none';
    document.getElementById('btnReiniciar').style.display = 'none';
    
    // Reiniciar el índice de VerAmigo
    VerAmigo.currentIndex = 0;

    // Limpiar el campo de entrada
    document.getElementById('amigo').value = '';
}