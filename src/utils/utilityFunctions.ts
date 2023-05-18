export function getRandomValue(index: number, values: any[]) {
  return values[Math.floor(index % values.length)];
}

export function getRandomDate(
  startDate = new Date("1900-01-01"),
  endDate = new Date()
) {
  const start = startDate.getTime();
  const end = endDate.getTime();

  if (start >= end) {
    throw new Error("Invalid date range");
  }

  const randomTimestamp = start + Math.random() * (end - start);
  const randomDate = new Date(randomTimestamp);
  const year = randomDate.getUTCFullYear();
  const month = String(randomDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(randomDate.getUTCDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

export function generateString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
