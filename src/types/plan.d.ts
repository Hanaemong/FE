interface PlanType {
  planName: string;
  planDate: string;
  planPlace: string;
  planCost: number;
  planImg: File;
}

interface PlanResType {
  planId: number;
  planName: string;
  planDate: Date;
  place: string;
  cost: number;
  planImg: string;
  isSurveyed: boolean;
}
