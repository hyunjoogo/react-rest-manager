export type DataType = {
  date: string;
  category: "takeoff" | "vacation" | "replace" | "", // 휴가유형
  useType: "tmo" | "tao" | "tdo" | "", // 휴가사용유형
  deduction: number, // 차감날짜
  publicReason: string, // 휴가사유
  privateReason?: string, // 개인메모
  "createDt" : string // 생성날짜
};
