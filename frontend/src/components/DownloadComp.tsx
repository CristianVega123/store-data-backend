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
  const { value } = objParent;

  useEffect(() => {
    const user = getItemWithExpiration("user");

    setTimeout(() => {
      if (user) {
        fetchingDataByUser(user, "findAllFiles").then((value) => {
          setdata(value);
          console.log(value);
        });

        setusername(user);
      }
    }, 800);

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
        `${url_backend}/folder/file?uuidImg=${uuidNode}&user=${user}`
      );
      const data = await blobData.blob();
      //* URL
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `img-${uuidNode}.png`);
      document.body.appendChild(link);
      link.click();
  
      console.log(data);
    }


  };
  return (
    <div>
      <details>
        <summary>{username}</summary>
        <div className="ml-4">
          <ul>
            {data &&
              data.map((value) => (
                <li key={value.uuidImg} data-uuid={value.uuidImg}>
                  {value.fieldname}
                  <button onClick={download}>Descargar</button>
                </li>
              ))}
          </ul>
        </div>
      </details>
    </div>
  );
}

export default DownloadComp;
