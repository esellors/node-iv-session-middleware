let id = 4;

let drinks = [
    {drinkId: 1, drinkName: 'Juice'},
    {drinkId: 2, drinkName: 'Milk'},
    {drinkId: 3, drinkName: 'Water'}
];

module.exports = {
    getAll: (req, res) => {
        res.status(200).json(drinks);
    },
    addOne: (req, res) => {
        const {name} = req.body;

        const newDrink = {
            drinkId: id,
            drinkName: name
        }

        drinks.push(newDrink);
        id++;

        res.status(200).json(drinks);
    },
    deleteOne: (req, res) => {
        const drinkId = +req.params.drinkId;

        const foundDrinkIndex = drinks.findIndex(drink => drink.drinkId === drinkId);

        drinks.splice(foundDrinkIndex, 1);

        res.status(200).json(drinks);
    }
}