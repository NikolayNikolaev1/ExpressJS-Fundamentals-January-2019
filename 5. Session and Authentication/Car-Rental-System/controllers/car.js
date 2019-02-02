const Car = require('../models/Car');
const Rent = require('../models/Rent');

module.exports = {
    addGet: (req, res) => {
        res.render('car/add');
    },
    addPost: (req, res) => {
        const reqCar = req.body;
        reqCar.pricePerDay = +reqCar.pricePerDay;

        if (!reqCar.model || !reqCar.image || !reqCar.pricePerDay) {
            reqCar.error = 'Please fill all fields';
            res.render('car/add', reqCar);
            return;
        }

        Car.create(reqCar)
            .then(() => {
                res.redirect('/')
            })
            .catch(console.error);
    },
    allCars: (req, res) => {
        Car.find({ isRented: false })
            .then((cars) => {
                res.render('car/all', { cars });
            })
            .catch(console.error);;
    },
    rentGet: (req, res) => {
        const carId = req.params.id;
        Car.findById(carId)
            .then((car) => {
                res.render('car/rent', car);
            })
            .catch(console.error);
    },
    rentPost: (req, res) => {
        const car = req.params.id;
        const user = req.user._id;
        const days = Number(req.body.days);

       Rent.create({ days, car, owner: user })
       .then(() => {
           Car.findById(car)
               .then((c) => {
                   car.isRented = true;

                   return c.save();
               })
               .then(() => {
                   res.redirect('/car/all');
               })
               .catch(console.error);
       })
       .catch(console.error);
    },
    editGet: (req, res) => {

    },
    editPost: (req, res) => {

    }
}