import { ChangeEvent } from "react";
import { threeLetters, setInfoLocalStorage } from "../helpers/function.helpers";
import { url_backend } from "../url";

function ToolBar() {
  const changeParams = (event: ChangeEvent) => {
    const element = event.target as HTMLOptionElement;

    if (element.value == "new") {
      //* User -> Las tres letras aleatorias.
      const wordQuery = threeLetters();

      setInfoLocalStorage("user", wordQuery, 24);

      fetch(`${url_backend}/folder?nombre=${wordQuery}`);
      window.history.pushState("", "", `?nombre=${wordQuery}`);
    }
    (event.target as HTMLSelectElement).options[0].selected = true;
  };
  return (
    <nav className="h-[5em] flex justify-center items-center">
      <section className="flex w-[76%] justify-around items-center">
        <input
          className="w-[60vw] p-2 border-2 border-black rounded-2xl"
          type="text"
        />
        <select onChange={changeParams} defaultValue={"DEFAULT"}>
          <option value="DEFAULT" disabled>
            Elija una opción
          </option>
          <option value="new">Nuevo usuario</option>
          <option value="find">Buscar usuario</option>
        </select>
      </section>
    </nav>
  );
}

export default ToolBar;
