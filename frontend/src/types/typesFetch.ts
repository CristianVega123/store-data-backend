export interface fetchingDataFile {
    fieldname: string;
    id: number;
    nameUser: string;
    uuidImg: string;
}

export interface IntersectionFilesComponents {
  value: boolean 
  eventChangeComp ?: React.Dispatch<React.SetStateAction<boolean>>
}
