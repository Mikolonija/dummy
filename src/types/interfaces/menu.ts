import type { MenuPageType } from '@/types/enums/menu';

export interface IMenu {
  id: MenuPageType;
  path: string;
  name: string;
  img: string;
  alt: string;
}
