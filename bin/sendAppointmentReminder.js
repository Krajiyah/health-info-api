#!/usr/bin/env node

const run = require("../util/job.js").run;
const fn = require("../models/Appointment.js").remind;
const initLabel = "Sending appointment reminders...";
const successLabel = "Appointment reminders sent!";
run(fn, initLabel, successLabel);
