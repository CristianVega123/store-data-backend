export interface fetchingDataFile {
    fieldname: string;
    id: number;
    nameUser: string;
    uuidImg: string;
}

export interface IntersectionFilesComponents {
  value: string 
  event: React.Dispatch<React.SetStateAction<boolean>>
}
