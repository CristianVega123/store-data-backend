import { useEffect, useState } from "react";
import {
  getItemWithExpiration,
  setInfoLocalStorage,
  threeLetters,
  fetchingDataByUser,
} from "./helpers/function.helpers";
import { fetchingDataFile } from "./types/typesFetch";
import { url_backend } from "./url";
import UploadFile from "./components/CompUplaodFile";
import "./index.css";
import ToolBar from "./components/ToolBar";
import DownloadComp from "./components/DownloadComp";

function App() {
  const [data, setdata] = useState<fetchingDataFile[] | null>();
  const [username, setUsername] = useState("");
  useEffect(() => {
    //* Variable que almacena los tres caracteres para identificar el usuario.
    window.history.pushState(null, "", "/");

    const wordQuery = threeLetters();

    //* Ver si hay algun valor dentro del localstorage.
    const user = getItemWithExpiration("user");
    let params = `?nombre=${user}`;

    if (user) {
      window.history.replaceState(null, "", params);
      fetchingDataByUser(user, "findAllFiles").then((data) => {
        setdata(data);
      });
      setUsername(user);
    } else {
      //* Establece un objeto con el nombre del item como "user"
      setInfoLocalStorage("user", wordQuery, 24);
      params = `?nombre=${wordQuery}`;
      window.history.replaceState(null, "", params);
      fetchingDataByUser(wordQuery, "findAllFiles").then((data) =>
        setdata(data)
      );
      setUsername(wordQuery);
    }

    //* Trayendo los datos de las imagenes que estan guardadas a través del username

    fetch(`${url_backend}/folder${params}`);

    return () => {};
  }, []);

  return (
    <main className="w-[80vw] h-[90%] min-w-[340px]">
      <ToolBar />
      <div className="">
        <UploadFile />
      </div>
      {data && <DownloadComp username={username} data={data} />}
    </main>
  );
}

export default App;
