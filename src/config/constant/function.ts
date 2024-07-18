export const insertUniqueFile = (setState : any, state : any[], newFiles : any[], uploadType? : string, position? : string) => {
  const pos = position === "prefix" ? "prefix" : "suffix";

  // Check if newFiles is not an array, convert it to an array
  if (!Array.isArray(newFiles)) {
    newFiles = Array.from(newFiles);
  }

  // Get the names of existing files in the state
  const stateFileNames = state.map((item) => item.name);
  const newFileNames = newFiles.map((item) => item.name);

  // Find the names of new files that already exist in the state
  const duplicates = newFileNames.filter((name) => stateFileNames.includes(name));

  // If duplicates exist, show an alert and return
  if (duplicates.length > 0) {
    alert(`The following files already exist: ${duplicates.join(', ')}`);
  }

  // Filter out the files that already exist in the state
  const uniqueNewFiles = newFiles.filter((file : any) => !stateFileNames.includes(file.name));

  // Insert files based on the specified position
  let updatedState;
  if (pos === "prefix") {
    updatedState = [...uniqueNewFiles, ...state];
  } else {
    updatedState = [...state, ...uniqueNewFiles];
  }

  // Update the state
  if(uploadType === "multi"){
    setState(updatedState);
  }else{
    setState(newFiles)
  }
};


export const removeDataByIndex = (data : any[], index : number) => {
  if(Array.isArray(data)){
    return data.filter((_,ind: number) => ind !== index)
  }
  else{
    return []
  }
}

export const getDataByIndex = (data : any[], index : number) => {
  if(Array.isArray(data)){
    return data.filter((_,ind: number) => ind === index)
  }
  else{
    return []
  }
}

export function readFileAsBase64(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String : any = reader.result as string;
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

export const advancedSearch = (
  dataArray: any[],
  searchValue: string
): any[] => {
  const searchTerm = searchValue.toLowerCase();
  const filteredData = dataArray.filter((item: any) => {
    const itemTitle = item.title.toLowerCase();
    return itemTitle.includes(searchTerm);
  });

  return filteredData;
};

export const getIdFromObject = (data: any, property: string = "_id") => {
  var arr: any = [];
  if (Array.isArray(data)) {
    data.forEach((item: any) => {
      arr.push(item[property]);
    });
  }
  return arr;
};

