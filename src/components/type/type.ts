import {RestType} from "../Calendar";

export type DataType = {
  date: string;
  category: "takeoff" | "vacation" | "replace", // 휴가유형
  useType: "tmo" | "tao" | "tdo", // 휴가사용유형
  deduction: number, // 차감날짜
  publicReason: string, // 휴가사유
  privateReason?: string, // 개인메모
  createDt?: string // 생성날짜
};

// 모든 다이얼로그(모달)의 기본 인터페이스
export interface DialogProps {
  show: boolean;
  onClose: (result: string) => void;
}


export type MyRestType = {
  myRestList: {
    [key: string]: RestType[]
  },
  restRemainDay: {
    [key: string]: {
      [key: string]: number;
    };
  },
  uid: string;
}
