interface CheckRegionType {
  latitude: number;
  longitude: number;
  siGunId: number;
  siGunGuId: number;
}

interface CheckRegionResponseType {
  match: boolean;
  address: string;
  region: string;
}

interface SigunType {
  siGunId: number;
  siGun: string;
}

interface SigunguType {
  siGunGuId: number;
  siGunGu: string;
}
