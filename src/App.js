import { useState, useEffect } from "react";
import Alert from "./Alert";
import "./App.css";
import ToDo from "./ToDo";
import image from "./todo-image.png";
import Footer from "./Footer";

// Nous avons besoin d'un localStorage pour ne pas perdre toutes les valeurs après avoir actualisé la page

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState(""); // valeur que nous utiliserons dans notre formulaire / la valeur vide par défaut
  const [list, setList] = useState(getLocalStorage()); // tableau vide que nous utiliserons pour le stockage local // liste de stockage local
  const [isEditing, setIsEditing] = useState(false); // un drapeau dans un état, qu'il soit en cours d'édition ou non
  const [editID, setEditID] = useState(null); // cet état reflétera ce qu'il est réellement en train de modifier
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  }); // est un objet à partir duquel nous pouvons afficher des informations d'alerte

  const handleSubmit = (e) => {
    e.preventDefault(); // la méthode PreventDefault() annule l'événement s'il est annulable, ce qui signifie que l'action par défaut qui appartient à l'événement ne se produira pas. // en cliquant sur un bouton "Soumettre", l'empêche de soumettre un formulaire
    // console.log('bonjour');
    if (!name) {
      // vérifiez si la valeur en entrée est vide et si elle est vide puis affichez l'alerte
      showAlert(true, "danger", "veuillez saisir une valeur"); //afficher l'alerte
    } else if (name && isEditing) {
      // check s'il y a quelque chose dans la valeur et si l'édition est vraie
      setList(
        list.map((item) => {
          // nous avons notre liste et nous la parcourons
          if (item.id === editID) {
            // si l'identifiant de l'élément correspond à tout ce que nous avons dans un état, toutes les propriétés sont renvoyées
            return { ...item, title: name }; // renvoie l'identifiant et change le titre en quel que soit l'état(state)
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "succès", "valeur changée");
    } else {
      // afficher l'alerte
      showAlert(true, "succès", "nouvelle tâche ajoutée à la liste");
      const newItem = {
        // créer un nouvel élément est équivalent à l'objet avec un identifiant unique et un titre qui sera équivalent à la valeur du nom provenant de l'état(state)
        id: new Date().getTime().toString(),
        title: name,
      };
      setList([...list, newItem]); // ... récupérez-moi les valeurs précédentes de l'état, ajoutez-en une nouvelle
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    //paramètres par défaut
    setAlert({ show, type, msg }); // si le nom de la propriété correspond au nom de la variable qui contient la valeur, affichez et tapez un message
  };

  const clearList = () => {
    showAlert(true, "danger", "liste vide");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "tâche supprimée");
    setList(list.filter((item) => item.id !== id)); // si l'identifiant de l'élément correspond, renvoyez cet élément
  };

  const editItem = (id) => {
    // obtenir un élément spécifique dont l'identifiant correspond
    const specificItem = list.find((item) => item.id === id); // si l'identifiant de l'élément correspond, renvoyez cet élément
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <div className="back">
        <br/>
        <h1 id="faire">TÂCHES</h1>
        <h2 id="fa">Que feras-tu aujourd'hui?</h2>
        <section className="section-center">
          <form className="todo-form" onSubmit={handleSubmit}>
            {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list={list} />
            )}{" "}
            {/* à l'intérieur du composant d'alerte, transmettez toutes les propriétés de la valeur d'alerte d'état(state) */}
            {/* montre une vérification de la propriété de show plus spécifique pour la valeur et si tel est le cas - affichez-la // vous pouvez la vérifier si vous modifiez useState pour alert en show:true // L'opérateur logique AND (&&) pour un ensemble d'opérandes booléens sera vrai si et seulement si tous les opérandes sont vrais. Sinon, ce sera faux. */}
            <div className="form-control">
              <input
                type="text"
                className="todo"
                placeholder="Entrez une nouvelle tâche à faire"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit" className="submit-btn">
                {isEditing ? "modifier" : "soumettre"}{" "}
                {/* vérifie si l'édition est en cours et si est vrai, puis affiche l'édition, sinon - soumets (par défaut est faux). Vous pouvez le vérifier si vous changez useState pour isEditing en true*/}
              </button>
            </div>
          </form>
          {list.length > 0 && (
            <div className="todo-container">
              <ToDo items={list} removeItem={removeItem} editItem={editItem} />{" "}
              {/* liste comme accessoire dans le composant Todo nommé 'items' */}
              <button className="clear-btn" onClick={clearList}>
                effacer les éléments
              </button>
            </div>
          )}
          <div className="img-container">
            <img src={image} className="image" />
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default App;
