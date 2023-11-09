import { ChangeEvent, useState, useRef } from "react";
import { setInfoLocalStorage, threeLetters } from "../helpers/function.helpers";
import { url_backend } from "../url";
import { IntersectionFilesComponents } from "../types/typesFetch";
import search from "../assets/icons8-búsqueda.svg";

function ToolBar({ objParent }: { objParent: IntersectionFilesComponents }) {
  const [disableInput, setDisableInput] = useState(true);
  const { value, eventChangeComp } = objParent;
  const userInput = useRef<HTMLInputElement>(null);

  const changeParams = (event: ChangeEvent) => {
    const element = event.target as HTMLOptionElement;

    if (element.value == "new") {
      //* User -> Las tres letras aleatorias.
      const wordQuery = threeLetters();
      window.history.replaceState(null, "", `?nombre=${wordQuery}`);

      setInfoLocalStorage("user", wordQuery, 24);

      fetch(`${url_backend}/folder?nombre=${wordQuery}`);
      setDisableInput(true);
      if (eventChangeComp) {
        eventChangeComp(!value);
      }
    } else if (element.value == "find") {
      setDisableInput(false);
    }
  };

  const show = (event: React.KeyboardEvent) => {
    const userInput = (event.target as HTMLInputElement).value;
    const key = event.key;

    if (key === "Enter" && userInput.length === 3) {
      clickAllInfo();
    }
  };
  const clickAllInfo = () => {
    if (userInput.current) {
      const userNewInput = userInput.current.value;
      setInfoLocalStorage("user", userNewInput, 26);
      if (eventChangeComp) {
        eventChangeComp(!value);
      }
    }
    // (event.target as HTMLSelectElement).options[0].selected = true;
  };
  return (
    <nav className="h-[5em] w-full flex justify-center items-center md:justify-end ">
      <section className="flex w-[76%] justify-around items-center flex-wrap gap-8 md:w-max">
        <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
          <img
            src={search}
            alt=""
            className="absolute ml-3 w-5 h-5 pointer-events-none"
          />
          <input
            ref={userInput}
            className={`w-[300px] pl-10 placeholder-slate-600 text-black focus:ring-2 p-2 border-2 border-black rounded-2xl ${
              disableInput ? "opacity-25" : "block"
            }`}
            type="text"
            disabled={disableInput}
            maxLength={3}
            placeholder="Busca tu usuario"
            onKeyDown={show}
          />
        </div>
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
