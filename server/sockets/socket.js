const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {

        let next = ticketControl.next();

        console.log(next);
        callback(next);
    });

    client.emit('currentTicket', {
        current: ticketControl.getLastTicket(),
        lastFour: ticketControl.getLastFour()
    });

    client.on('atendTicket', (data, callback) => {

        if (!data.desk) {
            return callback({
                err: true,
                message: 'Desk is necesary'
            });
        }

        let atendTicket = ticketControl.attendTicket(data.desk);

        callback(atendTicket);


        //Update changes in lastFour

        client.broadcast.emit('lastFour', {
            lastFour: ticketControl.getLastFour()
        })

    })

})