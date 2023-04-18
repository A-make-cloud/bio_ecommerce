const jwt = require('jsonwebtoken');

exports.tokenVerif = (req, res, next) => {
    /*
    const auth_form = req.headers['authorization'];
    const token_access = auth_form && auth_form.split(' ')[1];
    */
    const token_access = req.cookies.access_token;
    if (token_access == null) {
        return res.status(401).send({ message: "Token introuvable !" });
    }
    //-------------verifier le token access
    jwt.verify(token_access, process.env.SECRET_JWT, (err, user) => {
        if (err) {
            return res.sendStatus(403).send({ message: "Token invalide !" });
        }
        req.user = user;
        next();
    });
}

exports.adminVerif = (req, res, next) => {
  const token_access = req.cookies.access_token;
  if (token_access == null) {
      return res.status(401).send({ message: "Token introuvable !" });
  }
  //-------------verifier le token access
  jwt.verify(token_access, process.env.SECRET_JWT, (err, user) => {
      if (err) {
          return res.sendStatus(401).send({ message: "Token invalide !" });
      }
      if(user.profil !== 'admin'){
        return res.sendStatus(403).send({ message: "Réservé aux administrateurs !" });
      }
      req.user = user;
      next();
  });
}


//faire meme chose pour vérifier role admin ?
//exemple
/*const jwt = require('jsonwebtoken');

const token = 'votre_jwt_token'; // Remplacez par votre propre token JWT
const secret = 'votre_secret'; // Remplacez par votre propre secret

try {
  const decoded = jwt.verify(token, secret);
  if (decoded.role === 'admin') {
    console.log('L\'utilisateur est un administrateur.');
  } else {
    console.log('L\'utilisateur n\'est pas un administrateur.');
  }
} catch (err) {
  console.error(err);
}
Dans cet exemple, nous vérifions le JWT en utilisant la fonction jwt.verify de la bibliothèque jsonwebtoken. Si la vérification réussit, nous vérifions si le rôle de l'utilisateur est 'admin' en accédant à la propriété role de l'objet décodé.

Notez que vous devrez remplacer votre_jwt_token et votre_secret par les valeurs appropriées pour votre propre JWT et secret.
*/




