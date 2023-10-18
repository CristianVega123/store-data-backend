import { useEffect, useState } from "react";
import {
  getItemWithExpiration,
  setInfoLocalStorage,
  threeLetters,
  fetchingDataByUser,
} from "./helpers/function.helpers";
import { url_backend } from "./url";
import UploadFile from "./components/CompUplaodFile";
import "./index.css";
import ToolBar from "./components/ToolBar";
import DownloadComp from "./components/DownloadComp";

function App() {
  
  useEffect(() => {
    //* Variable que almacena los tres caracteres para identificar el usuario.
    window.history.pushState(null, "", "/");

    const wordQuery = threeLetters();

    //* Ver si hay algun valor dentro del localstorage.
    const user = getItemWithExpiration("user");
    let params = `?nombre=${user}`;

    if (user) {
      window.history.replaceState(null, "", params);
    } else {
      //* Establece un objeto con el nombre del item como "user"
      setInfoLocalStorage("user", wordQuery, 24);
      params = `?nombre=${wordQuery}`;
      window.history.replaceState(null, "", params);
    }

    //* Trayendo los datos de las imagenes que estan guardadas a través del username

    fetch(`${url_backend}/folder${params}`);

    return () => {};
  }, []);

  
  return (
    <main className="w-[80vw] h-[90%] min-w-[340px]">
      <ToolBar />
      <div className="">
        <UploadFile  />
      </div>
       <DownloadComp  />
    </main>
  );
}

export default App;
