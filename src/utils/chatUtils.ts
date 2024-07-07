import { timeConvertor } from "./datetimeFormat";

export function toChatArr(data: ChatType[]): ChatType[][] {
  let arr: ChatType[][] = new Array();
  if (data.length == 0) return arr;

  let lastTime: string = timeConvertor(new Date(data[0].time));
  let lastNickname: string = data[0].nickname;
  let newArr: ChatType[] = new Array(data[0]);

  for (let i = 1; i < data.length; i++) {
    if (
      timeConvertor(new Date(data[i].time)) === lastTime &&
      data[i].nickname === lastNickname
    ) {
      newArr.push({ ...data[i], time: timeConvertor(new Date(data[i].time)) });
    } else {
      arr.push(newArr);
      newArr = new Array({
        ...data[i],
        time: timeConvertor(new Date(data[i].time)),
      });
      lastTime = timeConvertor(new Date(data[i].time));
      lastNickname = data[i].nickname;
    }
  }

  if (newArr.length != 0) arr.push(newArr);

  return arr;
}

export const dummy: ChatType[] = [
  {
    roomId: 1,
    nickname: "별돌이",
    msg: "오늘 배드민턴 ㄱ?",
    type: "CHAT",
    time: "2024-07-06 13:20",
  },
  {
    roomId: 1,
    nickname: "별돌이",
    msg: "ㄱㄱ?",
    type: "CHAT",
    time: "2024-07-06 13:20",
  },
  {
    roomId: 1,
    nickname: "별돌이",
    msg: "대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답.",
    type: "CHAT",
    time: "2024-07-06 13:20",
  },
  {
    roomId: 1,
    nickname: "도라에몽",
    msg: "오늘은 좀..",
    type: "CHAT",
    time: "2024-07-06 13:21",
  },
  {
    roomId: 1,
    nickname: "도라에몽",
    msg: "차라리 테니스?",
    type: "CHAT",
    time: "2024-07-06 13:21",
  },
  {
    roomId: 1,
    nickname: "별돌이",
    msg: "테니스는 ㅈㅅ요",
    type: "CHAT",
    time: "2024-07-06 13:21",
  },
  {
    roomId: 1,
    nickname: "도라미",
    msg: "배고파",
    type: "CHAT",
    time: "2024-07-06 13:21",
  },
  {
    roomId: 1,
    nickname: "별돌이",
    msg: "걍 안감 ㅅㄱ",
    type: "CHAT",
    time: "2024-07-06 13:22",
  },
];
