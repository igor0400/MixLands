export interface UserType {
   LOWERCASENICKNAME: string;
   NICKNAME: string;
   REGDATE: number;
   HOURS: number;
}

export interface PrivateUserType {
   HASH: string;
   IP: string;
   LOWERCASENICKNAME: string;
   NICKNAME: string;
   PREMIUMUUID: string;
   REGDATE: number;
   UUID: string;
   HOURS: number;
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
   data: PrivateUserType | string;
}

export interface RoleType {
   name: string;
   color: string;
   top_role: boolean;
}
