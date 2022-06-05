export const formatResponseText = (unformattedText: string): string => {
  const capitalizedFirstLetterText =
    unformattedText.charAt(0).toUpperCase() + unformattedText.slice(1);
  const capitalizedText = (): string => {
    let newText = "";
    Array.from(capitalizedFirstLetterText).map((e, i) => {
      const previousChar = capitalizedFirstLetterText[i - 1];
      if (previousChar === "-") {
        newText = newText.concat(capitalizedFirstLetterText[i].toUpperCase());
      } else newText = newText.concat(capitalizedFirstLetterText[i]);
    });
    return newText;
  };
  const formattedText = capitalizedText().replaceAll("-", " ");
  return formattedText;
};
