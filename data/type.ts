export type HomeStackParamList = {
  Home: undefined;
  ViewCookie: { fortuneId: number, fortuneText:string, fortuneDate: string }
  AddCookie: undefined;
}

export interface FortuneListShape{
  text: string;
  date: string;
}
