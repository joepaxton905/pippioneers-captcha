export function Locaa(data) {
  let num = parseFloat(data);

  // if (isNaN(num)) {
  //   console.error("Error: Invalid number input");
  //   return "Invalid number";
  // }

  const nana = num.toFixed(2);

  const localizedNana = Number(nana).toLocaleString();

  return localizedNana;
}
