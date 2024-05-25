const getIdFromObject = (data: any) => {
  var arr: any = [];
  if (Array.isArray(data)) {
    data.forEach((item: any) => {
      arr.push(item._id);
    });
    return arr;
  } else {
    return arr;
  }
};

const generateManagerData = (data : any) => {
  try
  {
    return data.map((item : any) => ({'  name  ' : item.userData[0]?.name , 'E-code' : item.userData[0]?.code , username : item.userData[0]?.username, designation : item.details?.designation}))
  }
  catch(err)
  {
    return []
  }
}
export { getIdFromObject,generateManagerData };