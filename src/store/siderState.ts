import { atom } from "recoil";

const isSiderVisibleOnInitialRender = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 1024;
  }
};

export const siderState = atom<boolean>({
  key: "siderState",
  default: isSiderVisibleOnInitialRender(),
});