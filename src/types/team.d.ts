interface TeamItemType {
  teamId: number;
  siGunGu: string;
  teamName: string;
  category: string;
  score: number;
  thumbNail: string;
  memberCnt: number;
}

interface TeamCreateType {
  teamName: string;
  teamDesc: string;
  capacity: number;
  category: string;
  thumbNail: string;
}

interface TeamDetailType extends TeamItemType {
  teamDesc: string;
  banner: string;
  role: string;
}
