const fs = require("fs");

const { Ticket } = require("../classes/ticket");


class TicketControl {

    constructor() {

        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        let data = require("../data/data.json");

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.restartCount();
        }

    }

    next() {

        this.last += 1;

        let ticket = new Ticket(this.last, null);

        this.tickets.push(ticket);

        this.saveFile();

        return `Ticket ${this.last}`;

    }

    getLastTicket() {

        return `Ticket ${this.last}`;

    }

    getLastFour() {

        return this.lastFour;

    }

    attendTicket(desk) {

        if (this.tickets.length === 0) {

            return 'No tickets left';
        }

        let ticketNumber = this.tickets[0].number;
        this.tickets.shift();

        let attendTicket = new Ticket(ticketNumber, desk);
        this.lastFour.unshift(attendTicket);

        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1);
        }

        console.log("Last four", this.lastFour);

        this.saveFile();

        return attendTicket;
    }

    restartCount() {

        this.last = 0;
        this.tickets = [];
        this.lastFour = [];

        this.saveFile();

    }

    saveFile() {

        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync("./server/data/data.json", jsonDataString);

    }
}

module.exports = { TicketControl }