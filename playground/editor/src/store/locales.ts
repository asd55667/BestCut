import type { LocaleSetting, LocaleType } from '@/modules/i18n';

import { defineStore } from 'pinia';
import { store } from '@/store';

const locale = 'zh_CN';
const fallbackLocale = 'zh_CN';

export const localeSetting: LocaleSetting = {
  showPicker: true,
  locale,
  fallbackLocale,
  availableLocales: [locale, 'en'],
};

export const LOCALE_KEY = 'LOCALE__';

const setting = localStorage.getItem(LOCALE_KEY);
const lsLocaleSetting: LocaleSetting = setting ? JSON.parse(setting) : localeSetting;

interface LocaleState {
  localInfo: LocaleSetting;
}

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting,
  }),
  getters: {
    getShowPicker(): boolean {
      return !!this.localInfo?.showPicker;
    },
    getLocale(): { locale: LocaleType; fallbackLocale: LocaleType } {
      return {
        locale: this.localInfo?.locale ?? 'zh_CN',
        fallbackLocale: this.localInfo?.fallbackLocale ?? 'zh_CN',
      };
    },
  },
  actions: {
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info };
      localStorage.setItem(LOCALE_KEY, JSON.stringify(this.localInfo));
    },

    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      });
    },
  },
});

export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}
