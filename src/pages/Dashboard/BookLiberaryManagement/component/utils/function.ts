export const generateBookInitialValues = (data?: any) => {
  return {
    title: data?.title || "",
    author: data?.author || "",
    categories: [],
    publisher: data?.publisher || "",
    isbn: data?.publisher || "",
    publishedDate: data?.publishedDate || undefined,
    numberOfPages: data?.numberOfPages || undefined,
    availableCopies: data?.availableCopies || undefined,
    ratings: data?.ratings || undefined,
    totalCopies: data?.totalCopies || undefined,
    language: [],
    tags: [],
    edition: data?.edition || undefined,
    description: data?.description || undefined,
    coverImage: {
      file: [],
    },
  };
};

export const generateSendBookResponse = (data : any) => {
  return {
    ...data,
    language : data.language.map((it : any) => it.value)
  }
}
