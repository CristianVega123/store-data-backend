import {
  fetchingDataFile,
  IntersectionFilesComponents,
} from "../types/typesFetch";
import {
  fetchingDataByUser,
  getItemWithExpiration,
} from "../helpers/function.helpers";
import { useState, useEffect } from "react";
import { url_backend } from "../url";

function DownloadComp({
  objParent,
}: {
  objParent: IntersectionFilesComponents;
}) {
  const [username, setusername] = useState("");
  const [data, setdata] = useState<fetchingDataFile[] | null>();
  const { value, eventChangeComp } = objParent;

  useEffect(() => {
    const user = getItemWithExpiration("user");

    if (user) {
      setusername(user);
      setTimeout(() => {
        fetchingDataByUser(user, "findAllFiles").then((value) => {
          setdata(value);
          console.log(value);
        });
      }, 300);

      window.history.replaceState(null, "", user);
    }

    return () => {};
  }, [value]);

  const download = async (event: React.MouseEvent) => {
    const nodo = event.target as HTMLButtonElement;
    const uuidNode = (nodo.parentNode as HTMLLIElement).getAttribute(
      "data-uuid"
    );

    //* Los datos blob traidos del backend
    const user = getItemWithExpiration("user");
    if (user) {
      const blobData = await fetch(
        `${url_backend}/folder/file?uuidImg=${uuidNode}&user=${user}`,
        {}
      );

      const blob = await blobData.blob();
      const type = blob.type.split("/")[1];

      console.log(blob.type);

      //* URL
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `img-${uuidNode}.${type}`);
      document.body.appendChild(link);
      link.click();

      console.log(data);
    }
  };

  const deleteFile = (event: React.MouseEvent) => {
    const node = event.target as HTMLButtonElement;
    const idFileNode = node.getAttribute("data-id");
    const user = getItemWithExpiration("user");
    console.log(idFileNode);

    fetch(
      `${url_backend}/folder/deleteFile?idfile=${idFileNode}&iduser=${user}`,
      {
        method: "DELETE",
      }
    );

    if (eventChangeComp) {
      eventChangeComp(!value);
    }
  };
  return (
    <div className="text-white mt-6">
      <details className="bg-slate-800 rounded-lg p-4">
        <summary className="text-2xl cursor-pointer ">
          {" "}
          Archivos de {username}
        </summary>
        <div className="ml-4">
          <ul>
            {data &&
              data.map((value) => {
                const destrucArray = value.fieldname.split(".");
                const type = destrucArray[destrucArray.length - 1];

                let ruta = "/src/assets/";

                if (type == "png" || type == "jpeg" || type == "gif") {
                  ruta += "icons8-image.png";
                } else if (type == "pdf") {
                  ruta += "icons8-pdf.png"
                } else if(type == "docx") {
                  ruta += "icons8-word.png"
                }
                else {
                  ruta += "icons8-archivo.png";
                }

                console.log(type);

                return (
                  <li
                    className="flex h-[58px] items-center p-3 bg-zinc-800 border-1 border-solid border-slate-700 rounded-sm m-3"
                    key={value.uuidImg}
                    data-uuid={value.uuidImg}
                  >
                    <div>
                      <img src={ruta} className="inline-block" alt="" />
                      <span>{value.fieldname}</span>
                    </div>
                    <div className="ml-3">
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-1 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={download}
                      >
                        Descargar
                      </button>
                      <button
                        data-id={value.id}
                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-1 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={deleteFile}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </details>
    </div>
  );
}

export default DownloadComp;
