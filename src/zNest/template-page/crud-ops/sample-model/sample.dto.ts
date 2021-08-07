
export class SampleDto  {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  password: string;
  description: string;
  isActive: boolean;
  id: string;
  
  constructor(initialValues: Partial<SampleDto> = {}) {
    if (initialValues) {
      for (const key in initialValues) {
        if (initialValues.hasOwnProperty(key)) {
          this[key] = initialValues[key];
        }
      }
    }
  }
   
}

export function getSampleData():SampleDto[]{
  let sampleData:SampleDto[]=[];
  for (let index = 1; index <= 20; index++) {
    sampleData.push(new SampleDto(
      {
        id:index.toString(),
        name:"name "+index.toString(),
        userName:"userName"+index.toString(),
        surname:"surname "+index.toString(),
        emailAddress:"emailAddress"+index.toString()+"@gmail.com",
        password:"password"+index.toString(),
        description:"description "+index.toString(),
        isActive:true        
      }));
    }
    return sampleData;
  }
 