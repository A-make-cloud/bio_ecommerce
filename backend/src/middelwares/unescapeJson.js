//&#x27; &quot; &amp;
// ' " &
exports.unescape=(escSrting)=>{
  let unescString = escSrting.replaceAll("&#x27;", "'")
  unescString = unescString.replaceAll("&quot;", '"')
  unescString = unescString.replaceAll("&amp;", '&')
  return unescString
}

/**Unescape all data in a complexe object in a recursive way*/
exports.unescapeAll=(escObject)=>{

  return decodeObject(escObject)

  function decodeObject(obj, processed = []) {
    if (typeof obj !== 'object' || obj === null || processed.includes(obj)) {
      return obj;
    }
  
    if (Array.isArray(obj)) {
      return obj.map(item => decodeObject(item, processed));
    }
  
    let decodedObj = {};
  
    processed.push(obj); // Ajouter l'objet en cours de traitement à la liste des objets déjà rencontrés
  
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'string') {
          decodedObj[key] = this.unescape(obj[key]);
        } else {
          decodedObj[key] = decodeObject(obj[key], processed);
        }
      }
    }
  
    processed.pop(); // Retirer l'objet en cours de traitement de la liste des objets déjà rencontrés
  
    return decodedObj;
  }
  
}

/**look for keys in a complex object in a recursive way and escape their values*/
exports.unescapeThose=(escObject, keyList)=>{

  return decodeObject(escObject)

  function decodeObject(obj, processed = []) {
    if (typeof obj !== 'object' || obj === null || processed.includes(obj)) {
      return obj;
    }
  
    if (Array.isArray(obj)) {
      return obj.map(item => decodeObject(item, processed));
    }
  
    let decodedObj = {};
  
    processed.push(obj); // Ajouter l'objet en cours de traitement à la liste des objets déjà rencontrés
  
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'string' && keyList.includes(key)) {
          decodedObj[key] = this.unescape(obj[key]);
        } else {
          decodedObj[key] = decodeObject(obj[key], processed);
        }
      }
    }
  
    processed.pop(); // Retirer l'objet en cours de traitement de la liste des objets déjà rencontrés
  
    return decodedObj;
  }
}
