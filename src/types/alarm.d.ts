interface AlarmType {
  title: string;
  body: string;
  image: string | null;
  createdAt: Date;
  isSeen: boolean;
  type: string;
  teamId: number;
}
