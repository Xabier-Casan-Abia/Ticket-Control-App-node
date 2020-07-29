// Command to set conexion
const socket = io();

const lblTicket1 = $('#lblTicket1');
const lblTicket2 = $('#lblTicket2');
const lblTicket3 = $('#lblTicket3');
const lblTicket4 = $('#lblTicket4');

const lblDesk1 = $('#lblDesk1');
const lblDesk2 = $('#lblDesk2');
const lblDesk3 = $('#lblDesk3');
const lblDesk4 = $('#lblDesk4');

let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let lblDesks = [lblDesk1, lblDesk2, lblDesk3, lblDesk4];


socket.on('connect', () => {
    console.log("Conected to server")
});

socket.on('disconnect', () => {
    console.log("Lost conexion with server")
});

socket.on('currentTicket', (data) => {
    updateHTML(data.lastFour);
});

socket.on('lastFour', (data) => {
    updateHTML(data.lastFour);
});

const updateHTML = (lastFour) => {

    for (var i = 0; i <= lastFour.length - 1; i++) {

        lblTickets[i].text('Ticket ' + lastFour[i].number);
        lblDesks[i].text('Desk ' + lastFour[i].desk);

    }
}