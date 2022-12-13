import {RestType} from "../Calendar";

export type DataType = {
  date: string;
  category: "takeoff" | "vacation" | "replace"; // 휴가유형
  useType: "tmo" | "tao" | "tdo"; // 휴가사용유형 - 연차 / 오전반차 / 오후반차
  deduction: number; // 차감날짜
  publicReason: string; // 휴가사유
  privateReason?: string; // 개인메모
  createDt?: string; // 생성날짜
};

export type CategoryType = "takeoff" | "vacation" | "replace" | "";
export type UseTypeType = "tmo" | "tao" | "tdo" | "";


// 모든 다이얼로그(모달)의 기본 인터페이스
export interface DialogProps {
  show: boolean;
  onClose: (result: string) => void;
}


export type MyRestType = {
  myRestList: MyRestListType,
  restRemainDay: {
    [key: string]: {
      [key: string]: number;
    };
  },
  uid: string;
}

export type MyRestListType = {
  [key: string]: RestType[]
}
