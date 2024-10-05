const Timer = require('../models/Timer');
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const createTimer = async (req, res) => {
    const timers = await Timer.find({});
    if (timers.length > 0) {
        throw new CustomError.BadRequestError("Timer is already running");
    }
    const { start, end } = req.body;
    const timer = await Timer.create({ start, end });
    res.status(StatusCodes.CREATED).json({ timer });
}

const getTimer = async (req, res) => {
    const timer = await Timer.findOne({});
    res.status(StatusCodes.OK).json({ timer });
}
// delete timer 
const deleteTimer = async (req, res) => {
    const timer = await Timer.findOneAndDelete({});
    if (!timer) {
        throw new CustomError.NotFoundError("Timer not found");
    }
    res.status(StatusCodes.OK).send("deleted timer successfully");
}

module.exports = {
    createTimer,
    getTimer,
    deleteTimer
}