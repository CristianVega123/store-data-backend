import { useEffect } from "react";
import { threeLetters, setInfoLocalStorage, getItemWithExpiration } from "./helpers/function.helpers";
import { url_backend } from './url'
import UploadFile from './components/CompUplaodFile'
import "./App.css";

function App() {
  useEffect(() => {

    //* Variable que almacena los tres caracteres para identificar el usuario.
    const wordQuery = threeLetters();

    
    //* Ver si hay algun valor dentro del localstorage.
    const user = getItemWithExpiration("user")
    let params = `?nombre=${user}`
    
    if (user) {
      window.history.replaceState(null, "", params );
    } else {
      //* Establece un objeto con el nombre del item como "user"
      setInfoLocalStorage("user", wordQuery, 3); 
      params = `?nombre=${wordQuery}`
      window.history.replaceState(null, "", params);
    }

    fetch(`${url_backend}/folder${params}`);
    
    return () => {};
  }, []);
  
  return (
    <>
    <UploadFile />
    </>
  );
}

export default App;
