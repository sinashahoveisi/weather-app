export const saveToStorage = (name: string, data: any) => {
  try {
    localStorage.setItem(name, encodeURIComponent(JSON.stringify(data)));
  } catch (e) {
    console.log(e);
  }
};

export const getFromStorage = (name: string): any => {
  try {
    return (
      localStorage.getItem(name) !== null && JSON.parse(decodeURIComponent(localStorage.getItem(name) || '') || '')
    );
  } catch (e) {
    return null;
  }
};

export const deleteFromStorage = (name: string) => {
  localStorage.removeItem(name);
};
