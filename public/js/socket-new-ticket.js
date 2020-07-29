// Command to set conexion
const socket = io();

const label = $('#lbNewTicket');

socket.on('connect', () => {
    console.log("Conected to server")
});

socket.on('disconnect', () => {
    console.log("Lost conexion with server")
});

socket.on('actualTicket', (resp) => {
    label.text(resp.current);
});

$('button').on('click', () => {
    socket.emit("nextTicket", null, (nextTicket) => {
        label.text(nextTicket);
    });
});