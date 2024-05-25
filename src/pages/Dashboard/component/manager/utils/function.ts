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
  export { generateManagerData }