const PORT = process.env.APP_ENV || 9000
const app = require('./app')

//------------------lancer le serveur sur le port 
app.listen(PORT, () => {
    if (process.env.APP_ENV == "dev" && process.send) {
        process.send("online");
    }
    console.log(`Le serveur est démarré : http://localhost:${PORT}`);
});
