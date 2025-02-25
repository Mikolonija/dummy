<template>
  <nav class="nav">
    <router-link to="/" class="font-poppins-medium-24 app-name">Sales.</router-link>
    <div class="nav-container">
      <router-link
        v-for="router in routerMenu"
        class="menu"
        :key="router.id"
        :to="router.path"
        :class="{ 'menu-item-active': isActiveRoute(router) }"
      >
        <div class="menu-line-active" v-if="isActiveRoute(router)" />
        <div class="menu-item layout-left-center">
          <img :src="router.img" :alt="router.alt" width="24" height="24" />
          <p class="menu-item-text font-poppins-regular-16">
            {{ router.name }}
          </p>
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { MenuPageType } from '@/types/enums/menu';
import { useRouter } from 'vue-router';
import emptyWallet from '@/assets/navBar/empty-wallet.svg?url';
import calendarTick from '@/assets/navBar/calendar-tick.svg?url';
import medicine from '@/assets/navBar/medicine.svg?url';
import dashboard from '@/assets/navBar/dashboard.svg?url';
import labTest from '@/assets/navBar/clipboard-tick.svg?url';
import help from '@/assets/navBar/help.svg?url';
import setting from '@/assets/navBar/setting.svg?url';
import sms from '@/assets/navBar/sms.svg?url';
import type { IMenu } from '@/types/interfaces/menu';

const router = useRouter();
const routerMenu = reactive<IMenu[]>([
  {
    id: MenuPageType.Dashboard,
    path: '/',
    name: 'Dashboard',
    img: dashboard,
    alt: 'Icon representing a grid of four quadrants',
  },
  {
    id: MenuPageType.LabTest,
    path: '/lab-test',
    name: 'Lab Test',
    img: labTest,
    alt: 'Icon of a laboratory test tube',
  },
  {
    id: MenuPageType.Appointment,
    path: '/appointment',
    name: 'Appointment',
    img: calendarTick,
    alt: 'Icon of a calendar with a checkmark',
  },
  {
    id: MenuPageType.MedicineOrder,
    path: '/medicine-order',
    name: 'Medicine Order',
    img: medicine,
    alt: 'Icon of a pill bottle',
  },
  {
    id: MenuPageType.Message,
    path: '/message',
    name: 'Message',
    img: sms,
    alt: 'Icon resembling an SMS',
  },
  {
    id: MenuPageType.Payment,
    path: '/payment',
    name: 'Payment',
    img: emptyWallet,
    alt: 'Icon of an empty wallet',
  },
  {
    id: MenuPageType.Settings,
    path: '/settings',
    name: 'Settings',
    img: setting,
    alt: 'icon of a gear or cogwheel',
  },
  {
    id: MenuPageType.Help,
    path: '/help',
    name: 'Help',
    img: help,
    alt: 'Icon of a question mark',
  },
]);

const isActiveRoute = (currentRoute: IMenu): boolean => {
  if (currentRoute.path) return router.currentRoute.value.path === currentRoute.path;
  return false;
};
</script>

<style scoped lang="scss">
.nav {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  position: fixed;
  width: 230px;
  overflow-y: auto;
  z-index: $index-default;
  background-color: var(--c-aside-bg);

  &-container {
    position: relative;
  }
}

.menu {
  display: flex;
  color: var(--c-text);
  height: 40px;
  width: 100%;
  margin: 0 0 $spacing-x-medium 0;

  &-item {
    padding: 0 0 0 $spacing-xx-large;
    gap: $spacing-medium;
  }

  &-item-active {
    color: var(--c-active);
  }

  &-item-active img {
    filter: invert(39%) sepia(75%) saturate(5714%) hue-rotate(210deg) brightness(96%) contrast(103%);
    color: var(--c-active);
  }

  &-line-active {
    height: 40px;
    width: 3px;
    position: absolute;
    background-color: var(--c-active);
  }
}

.menu:hover {
  color: var(--c-active);
}

.menu:nth-child(7) {
  margin-bottom: 80px;
}

.menu:last-child {
  position: absolute;
  bottom: 0;
  background-color: var(--c-white);
}

.app-name {
  color: var(--c-logo);
  padding: $spacing-xx-large 0 $spacing-xx-large $spacing-x-large;
}

@include media-query(laptop) {
  .nav {
    width: 80px;
  }

  .menu {
    &-item {
      padding: 0 0 0 $spacing-x-large;
      gap: $spacing-medium;

      &-text {
        display: none;
      }
    }
  }

  .app-name {
    visibility: hidden;
    overflow-x: hidden;
  }
}

@include media-query(phone) {
  .nav {
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    grid-template-rows: 1fr;
    border-top: solid 2px var(--c-active);
    height: auto;
    width: 100%;
    margin-top: 40px;

    &-container {
      display: grid;
      grid-template-columns: 60px 60px 60px 60px 60px 60px 60px 60px;
      justify-content: center;
      align-items: center;
    }
  }

  .menu {
    margin: 0 0 0 0;
    width: 0;

    &-item {
      padding: 0;
      margin: 0 $spacing-medium;
    }

    &-line-active {
      display: none;
    }
  }

  .menu:nth-child(7) {
    margin-bottom: 0;
  }

  .menu:last-child {
    position: relative;
  }

  .app-name {
    display: none;
  }
}
</style>
