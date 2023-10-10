import React from "react";
import { url_backend } from "../url";
import { returnUserLocalStorage } from "../helpers/function.helpers";

function CompUplaodFile() {
  /**
   ** Functions
   */
  const uploadFile = (event: React.ChangeEvent) => {
    const formFile = new FormData();

    const $input_file = event.target as HTMLInputElement;
    if ($input_file.files) {
      console.log($input_file.files[0]);

      for (const key of $input_file.files) {
        formFile.append("files", key);
      }
    }

    const user = returnUserLocalStorage("user");
    console.log(user)
    fetch(`${url_backend}/folder/upload?nombre=${user}`, {
      method: "POST",
      body: formFile,
      
    });
  };

  return (
    <div>
      <input onChange={uploadFile} multiple type="file" name="" id="" />
    </div>
  );
}

export default CompUplaodFile;
