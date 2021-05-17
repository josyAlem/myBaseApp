
export class CategoryDto  {
  name: string;
  description: string;
  isActive: boolean;
  id: string;
  
  constructor(initialValues: Partial<CategoryDto> = {}) {
    if (initialValues) {
      for (const key in initialValues) {
        if (initialValues.hasOwnProperty(key)) {
          this[key] = initialValues[key];
        }
      }
    }
  }
   
}

 