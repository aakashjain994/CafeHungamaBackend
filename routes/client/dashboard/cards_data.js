                                   //client/dashboard/:client_id/stats

//1. total successfull events done by a client   //count from Client model the number of events in event array having state successfull
//2. total upcoming events           // same
//3. cancelled events                // same
//4. total business done             // extract from payment model
//5. no of venues registered         // extract from client model
//6. total tickets sold              // extract from client model -> events -> successfull events -> count of tickets added
//7. 
//8. 

const express = require('express'),
      Client = require('../../../models/client'),
      pay
