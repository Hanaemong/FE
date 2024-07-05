interface ChatType {
  nickname: string;
  msg: string;
  type: string;
  time: string;
}

export const dummy: ChatType[] = [
  {
    nickname: "별돌이",
    msg: "오늘 배드민턴 ㄱ?",
    type: "CHAT",
    time: "오후 1:20",
  },
  {
    nickname: "별돌이",
    msg: "대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답.",
    type: "CHAT",
    time: "오후 1:20",
  },
  {
    nickname: "도라에몽",
    msg: "오늘은 좀..",
    type: "CHAT",
    time: "오후 1:21",
  },
  {
    nickname: "도라에몽",
    msg: "차라리 테니스?",
    type: "CHAT",
    time: "오후 1:21",
  },
  {
    nickname: "별돌이",
    msg: "테니스는 ㅈㅅ요",
    type: "CHAT",
    time: "오후 1:21",
  },
  {
    nickname: "별돌이",
    msg: "걍 안감 ㅅㄱ",
    type: "CHAT",
    time: "오후 1:22",
  },
];
