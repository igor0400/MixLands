export interface userType {
   HASH: string;
   IP: string;
   LOWERCASENICKNAME: string;
   NICKNAME: string;
   PREMIUMUUID: string;
   REGDATE: number;
   UUID: string;
   BALANCE?: number;
}

export interface onlineUserType {
   nickname: string;
   server: string;
}
