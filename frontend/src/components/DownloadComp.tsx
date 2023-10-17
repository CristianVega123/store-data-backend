import { fetchingDataFile } from "../types/typesFetch";

function DownloadComp({
  username,
  data,
}: {
  username: string;
  data: fetchingDataFile[];
}) {
  console.log(data);

  return (
    <div>
      <details>
        <summary>{username}</summary>
        <div className="ml-4">
          <ul >
            {data.map((value) => (
                <li key={value.uuidImg} data-uuid={value.uuidImg}>{value.fieldname}</li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
}

export default DownloadComp;
