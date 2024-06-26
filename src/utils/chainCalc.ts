const chainCalc = (rating: number) => {
  if (rating >= 4.0) {
    return "vip";
  } else if (rating >= 3.0) {
    return "diamond";
  } else if (rating >= 2.0) {
    return "gold";
  } else if (rating >= 1.0) {
    return "silver";
  } else {
    return "bronze";
  }
};

export default chainCalc;
