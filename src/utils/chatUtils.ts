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
    profile:
      "https://hanalinkbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A7%E1%86%AF%E1%84%83%E1%85%A9%E1%86%AF%E1%84%8B%E1%85%B5.svg",
    time: "2024-07-06 13:20",
  },
  {
    roomId: 1,
    nickname: "별돌이",
    msg: "ㄱㄱ?",
    profile:
      "https://hanalinkbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A7%E1%86%AF%E1%84%83%E1%85%A9%E1%86%AF%E1%84%8B%E1%85%B5.svg",
    time: "2024-07-06 13:20",
  },
  {
    roomId: 1,
    nickname: "별돌이",
    msg: "대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답. 대답.",
    profile:
      "https://hanalinkbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A7%E1%86%AF%E1%84%83%E1%85%A9%E1%86%AF%E1%84%8B%E1%85%B5.svg",
    time: "2024-07-06 13:20",
  },
  {
    roomId: 1,
    nickname: "도라에몽",
    msg: "오늘은 좀..",
    profile:
      "https://hanalinkbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A7%E1%86%AF%E1%84%83%E1%85%A9%E1%86%AF%E1%84%8B%E1%85%B5.svg",
    time: "2024-07-06 13:21",
  },
  {
    roomId: 1,
    nickname: "도라에몽",
    msg: "차라리 테니스?",
    profile:
      "https://hanalinkbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A7%E1%86%AF%E1%84%83%E1%85%A9%E1%86%AF%E1%84%8B%E1%85%B5.svg",
    time: "2024-07-06 13:21",
  },
  {
    roomId: 1,
    nickname: "별돌이",
    msg: "테니스는 ㅈㅅ요",
    profile:
      "https://hanalinkbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A7%E1%86%AF%E1%84%83%E1%85%A9%E1%86%AF%E1%84%8B%E1%85%B5.svg",
    time: "2024-07-06 13:21",
  },
  {
    roomId: 1,
    nickname: "도라미",
    msg: "배고파",
    profile:
      "https://hanalinkbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A7%E1%86%AF%E1%84%83%E1%85%A9%E1%86%AF%E1%84%8B%E1%85%B5.svg",
    time: "2024-07-06 13:21",
  },
  {
    roomId: 1,
    nickname: "별돌이",
    msg: "걍 안감 ㅅㄱ",
    profile:
      "https://hanalinkbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A7%E1%86%AF%E1%84%83%E1%85%A9%E1%86%AF%E1%84%8B%E1%85%B5.svg",
    time: "2024-07-06 13:22",
  },
];
