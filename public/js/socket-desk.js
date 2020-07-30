// Command to set conexion
const socket = io();

socket.on('connect', () => {
    console.log("Conected to server")
});

socket.on('disconnect', () => {
    console.log("Lost conexion with server")
});

const serachParams = new URLSearchParams(window.location.search);
const label = $('small');

if (!serachParams.has('desk')) {

    window.location = 'index.html';
    throw new Error('Desk number needed');
}

const desk = serachParams.get('desk')

$('h1').text('Desk ' + desk);

$('button').on('click', () => {

    socket.emit('atendTicket', { desk }, (resp) => {

        if (resp === 'No tickets left') {
            label.text(resp);
            alert(resp);
            return;
        }

        label.text('Ticket ' + resp.number);

    });
});