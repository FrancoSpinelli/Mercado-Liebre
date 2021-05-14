const path = require ('path');

let mainController = {
    index: (req,res) => {
        res.render('home.ejs');
    },
}

module.exports = mainController;

