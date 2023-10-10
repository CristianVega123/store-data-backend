//* Esta función retorna una palabra con tres cifra (se puede modificar para tener más cifras).

export function threeLetters(): string {
  let word: string = "";

  const random = (max: number, min: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  for (let index = 0; index < 3; index++) {
    let number = random(65, 122);
    while (91 <= number && number <= 96) {
      number = random(65, 122);
    }

    word += String.fromCharCode(number);
  }

  return word;
}
type userLocalStorage = {
  user: string;
  expiration: number;
};
//* Función para establecer información dentro del localStorage y colocarle un tiempo de expiración.
export function setInfoLocalStorage(
  key: string,
  id: string,
  timeExpiration: number
) {
  const expirationTime = new Date().getTime() + timeExpiration * 60 * 1000;
  const item: userLocalStorage = {
    user: id,
    expiration: expirationTime,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

export function getItemWithExpiration(key: string): string | null {
  const item = localStorage.getItem(key);
  if (!item) {
    return null;
  }
  const parsedItem: userLocalStorage = JSON.parse(item);
  const currenTime = new Date().getTime();

  if (currenTime > parsedItem.expiration) {
    localStorage.removeItem(key);
    return null;
  }

  return parsedItem.user;
}

export function returnUserLocalStorage(key: string): string | null {
  const item = localStorage.getItem(key);
  if (!item) {
    return null;
  }
  const parsedItem: userLocalStorage = JSON.parse(item);
  return parsedItem.user;
}