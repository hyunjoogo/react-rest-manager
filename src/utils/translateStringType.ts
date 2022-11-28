interface TranslateType {
  (typeEn: string): string;
}

export const translateStringType: TranslateType = (typeEn) => {
  let typeKo = "";
  switch (typeEn) {
    case "takeoff" :
      typeKo = "연차";
      break;
    case "vacation" :
      typeKo = "여름휴가";
      break;
    case "replace":
      typeKo = "대체휴무";
      break;
    case "tmo" :
      typeKo = "하루 종일";
      break;
    case "tao" :
      typeKo = "오전 반차";
      break;
    case "tdo":
      typeKo = "오후 반차";
      break;
    default:
      alert("잘못된 값입니다.");
  }
  return typeKo;
};

export const translateNumberType = (useType: string) => {
  switch (useType) {
    case "tmo" :
      return 1;
    case "tao":
      return 0.5;
    case "tdo":
      return 0.5;
    default:
      return console.error("잘못된 값입니다.")
  }
};
