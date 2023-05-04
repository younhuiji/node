const app = require("../app");
const PORT = process.config.PORT || 3000;

app.listen(PORT, () => {
    console.log(  `server starteed. ${PORT}.`);
});








