const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const glob = require("glob");
const path = require("path");

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));

let initRoutes = () => {
	glob('./routes/*.js', {cwd: path.resolve('./src')}, (err, routes) => {
		if (err) {
			console.log('Error occured including routes');
			return;
		}
		routes.forEach((routePath) => {
			require(routePath).getRouter(app);
		});
		console.log(`included ${routes.length} route files`);
	});
}

initRoutes();



app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
})
