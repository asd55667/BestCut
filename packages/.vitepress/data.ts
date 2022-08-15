import type { DefaultTheme } from 'vitepress';

const Guide: DefaultTheme.SidebarItem[] = [
  { text: 'What is VitePress?', link: '/guide/what-is-vitepress' },
  { text: 'Getting Started', link: '/guide/getting-started' },
];

const Components: DefaultTheme.SidebarItem[] = [
  { text: 'ResourceBox', link: '/components/resource-box/' },
  { text: 'TrackBox', link: '/components/track-box/' },
  { text: 'SplitPanes', link: '/components/split-panes/' },
  //
];

const SideBarGuide: () => DefaultTheme.SidebarGroup[] = () => [
  { text: 'Introduction', collapsible: true, items: Guide },
];

const SideBarComponent: () => DefaultTheme.SidebarGroup[] = () => [
  { text: '', items: [{ text: 'Overview', link: '/components/overview' }] },
  { text: 'General', items: Components },
];

export const sidebar: DefaultTheme.Sidebar = {
  '/guide/': SideBarGuide(),
  '/components/': SideBarComponent(),
};

export const nav: DefaultTheme.NavItem[] = [
  { text: 'Guide', link: '/guide/what-is-vitepress', activeMatch: '/guide/' },
  { text: 'Components', link: '/components/overview', activeMatch: '/components/' },
  //
];
