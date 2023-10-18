import { fetchingDataFile } from "../types/typesFetch";
import { useEffect, useState } from 'react'
import { getItemWithExpiration, fetchingDataByUser } from '../helpers/function.helpers'

function DownloadComp() {
  const [data, setdata] = useState<fetchingDataFile[] | null>(null)
  const [username, setusername] = useState("")

  useEffect(() => {
    let user = getItemWithExpiration("user"); 

    if (user) {
      fetchingDataByUser(user, "findAllFiles").then(
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
            { data && data.map((value) => (
                <li key={value.uuidImg} data-uuid={value.uuidImg}>{value.fieldname}</li>
            )) }
          </ul>
        </div>
      </details>
    </div>
  );
}

export default DownloadComp;
