var models = require('../models');

exports.view = function(req, res) {
    var data = {data: []};

    models.Message.find().exec(displayMessages);

    function displayMessages( err, messages )
    {
    	console.log ( messages );
    	data["data"] = messages;
    	res.render("index", data); 
    };
    
}
