  export const firstLettersUpperCase = (username) => {
    if (!username) {
      return;
    }
    const userNameFirstLetters = username
      .split(" ")
      .map((word) => word[0].toUpperCase());
    return userNameFirstLetters.join("");
  };