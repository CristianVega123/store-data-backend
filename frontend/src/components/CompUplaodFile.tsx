import { url_backend } from "../url";
import { returnUserLocalStorage } from "../helpers/function.helpers";

function CompUplaodFile() {
  /**
   ** Functions
   */
  const uploadFile = (event: React.ChangeEvent) => {
    //* Estructura que guarda los files
    const formFile = new FormData();

    const $input_file = event.target as HTMLInputElement;

    if ($input_file.files) {
      for (const key of $input_file.files) {
        formFile.append("files", key);
      }
    }
    const user = returnUserLocalStorage("user");

    fetch(`${url_backend}/folder/upload?nombre=${user}`, {
      method: "POST",
      body: formFile,
    });
  };

  return (
    <section className="w-max">
      <input onChange={uploadFile} multiple type="file" name="" id="" />
    </section>
  );
}

export default CompUplaodFile;
