export {};

declare global {
  type TBeaconConnection = {
    id: number;
    beaconID: string;
    plantID: number;
    machNo: number;
    machIP: string;
    version: string;
    active: number;
    shiftCode: string;
    event: number;
    lifeTime: number;
    length: number;
    created: string;
    modified: string;
  };
}
