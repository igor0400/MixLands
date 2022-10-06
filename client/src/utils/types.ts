export interface UserType {
   HASH: string;
   IP: string;
   LOWERCASENICKNAME: string;
   NICKNAME: string;
   PREMIUMUUID: string;
   REGDATE: number;
   UUID: string;
   BALANCE?: number;
}

export interface OnlineUserType {
   nickname: string;
   server: string;
}

export interface UserTypeWithOnline extends UserType {
   online: {
      server: string;
   };
}

export interface ResponseType {
   status: number;
   data: UserType | string;
}
