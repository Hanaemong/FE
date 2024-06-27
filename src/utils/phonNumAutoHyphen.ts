export const phoneNumAutoHyphen = (phoneNum: string) => {
  let newNumber = phoneNum
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/g, "$1-$2-$3");
  return newNumber;
};
