cell_obj = {                             // How to make sure that this is gonna be the structure of ecah object entered in the table
    ticketSold: {
        type: Number,
    },
    bookingType: {
        type: String,
    },
    bookingPrice: {
        type: Number,
    }
}

const rows = 25,  //1state + 24slots + 1date + 1totalPrice
      cols = 365; //1timeslot + 365 days

let slot_date_2D_arr = new Array(rows);

for(let i = 0; i < slot_date_2D_arr.length; i++) {
    slot_date_2D_arr[i] = new Array(cols);
}
