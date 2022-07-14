const express = require("express");
const routes = require("./controllers");
const db = require("sequelize");
const path = require("path");
const helpers = require("./lib/helpers");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({helpers});
const session = require("express-session");
const app = express();

const PORT = process.env.PORT || 3000;

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
    secret: "This is an incredibly secret form of knowledge",
    cooke: {},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: db
    })
}

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

db.sync({force: false})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is now listening on ${PORT}`);
    });
});