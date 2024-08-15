declare module "*module.css" {
  const styles: {
    [className: string]: string;
  };
  export default styles;
}

export interface User {
  id: string;
  name: string;
}
