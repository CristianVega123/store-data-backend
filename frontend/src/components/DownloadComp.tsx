import { fetchingDataFile } from "../types/typesFetch";
import { fetchingDataByUser, getItemWithExpiration } from '../helpers/function.helpers'
import { useState, useEffect } from 'react'

function DownloadComp() {
  const [username, setusername] = useState("")
  const [data, setdata] = useState<fetchingDataFile[] | null>();

  useEffect(() => {
    const user = getItemWithExpiration("user") 

    if (user) {
      fetchingDataByUser(user, "findAllFiles")
      .then(
          value => {
            setdata(value)
            console.log(value);
            
          }
        )

      setusername(user)
    }

    return () => {
    }
  }, [])

  return (
    <div>
      <details>
        <summary>{username}</summary>
        <div className="ml-4">
          <ul >
            {data && data.map((value) => (
                <li key={value.uuidImg} data-uuid={value.uuidImg}>{value.fieldname}</li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
}

export default DownloadComp;
