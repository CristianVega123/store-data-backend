import { useState, useRef } from "react";
import { url_backend } from "../url";
import { returnUserLocalStorage } from "../helpers/function.helpers";
import { IntersectionFilesComponents } from "../types/typesFetch";
import document from "../assets/icons8-documento.svg";
import uploadFileImg from "../assets/icons8-upload-file-100.png";

function CompUplaodFile({
  objParent,
}: {
  objParent: IntersectionFilesComponents;
}) {
  /**
   ** Functions
   */

  const [files, setFiles] = useState<any>([]);
  const [uploadFileState, setuploadFileState] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const fileInputRef = useRef(null);

  const { value, eventChangeComp } = objParent;
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
    if (eventChangeComp) {
      eventChangeComp(!value);
    }
  };

  return (
    <section className="w-[350px] p-6 mt-7 bg-[#fff] rounded-[5px] shadow-[7px_7px_12px_rgba(0,0,0,0.05)]">
      <p className="text-center mt-3 font-[800]">Upload your File</p>
      <form
        action=""
        className="h-[170px] flex cursor-pointer mt-5 mb-3 items-center justify-center flex-col rounded-[5px] border-dashed border-[2px] border-[#0086fe] "
      >
        <input
          onChange={uploadFile}
          multiple
          type="file"
          name=""
          id=""
          className="opacity-0 p-32 absolute"
        />
        <div className="w-[90px] h-[90px]">
          <img src={uploadFileImg} alt="" className="w-full" />
        </div>
        <p className="mt-4 text-[16px]">Browse File to Upload</p>
      </form>
      {showProgress &&
        files.map((file, index: number) => (
          <section className="" key={index}>
            <li className="mt-3 bg-[#d5ebff] list-none p-3 rounded-[10px] flex items-center justify-between">
              <img src={document} alt="" />
              <div className="w-full ml-4 flex items-center">
                <div className="flex items-center mb-2 justify-between ml-4 flex-col">
                  <span>{file.name}</span>
                  <span>{file.loading}</span>
                  <div className="h-[6px] w-full mb-1 bg-[#fff] rounded-[30px]">
                    <div
                      className={`h-full w-[10%] bg-[#0086fe] rounded-[30px] w-[${file.loading}]`}
                    ></div>
                  </div>
                </div>
              </div>
            </li>
          </section>
        ))}

      <section className="overflow-y-scroll upload-area ">
        {uploadFileState.map((file: File, index) => (
          <li className=" flex items-center justify-between" key={index}>
            <div className="flex items-center">
              <img src={document} alt="" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px]">{file.name}</span>
                <span className="text-[12px]">{file.size}</span>
              </div>
            </div>
            <i></i>
          </li>
        ))}
      </section>
    </section>
  );
}

export default CompUplaodFile;
