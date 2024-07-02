interface LoginType {
  phone: string;
  password: string;
}

interface LoginResponseType {
  accessToken: string;
  memberId: number;
  siGunGu: string;
}

interface JoinType {
  name: string;
  phone: string;
  gender: string;
  password: string;
  siGunId: number;
  siGunGuId: number;
  fcmToken: string;
  profile: string;
}

interface CheckMsgReqType {
  phone: string;
  code: string;
}

interface CheckMsgResType {
  check: string;
}
