<script setup lang="ts">
import { signInWithPopup, signOut } from "firebase/auth";
import { useUserStore } from "~/store";

const { $auth, $provider } = useNuxtApp();
const colorMode  = useColorMode();
const userStore  = useUserStore();

const articles   = await queryContent().find();
const topics     = [...new Set(articles.map((a: any) => a.topic).filter(Boolean))];

const scrolled      = ref(false);
const menuOpen      = ref(false);
const topicsOpen    = ref(false);
const topicsDropdown = ref<HTMLElement | null>(null);
const isLogin    = ref(false);
const viewAlert  = ref(false);
const alertMsg   = ref("");
const alertType  = ref("");

function onScroll() { scrolled.value = window.scrollY > 48; }

function onDocumentClick(e: MouseEvent) {
  if (topicsDropdown.value && !topicsDropdown.value.contains(e.target as Node)) {
    topicsOpen.value = false;
  }
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("click", onDocumentClick);
  const stored = localStorage.getItem("user");
  if (stored) {
    try { userStore.setUser(JSON.parse(stored)); isLogin.value = true; } catch {}
  }
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  document.removeEventListener("click", onDocumentClick);
});

const isDark = computed(() => colorMode.value === "dark");

function toggleTheme() {
  colorMode.value = isDark.value ? "light" : "dark";
}

function showAlert(msg: string, type: "success" | "failed") {
  alertMsg.value = msg; alertType.value = type; viewAlert.value = true;
  setTimeout(() => (viewAlert.value = false), 2500);
}

async function handleSignIn() {
  try {
    const res = await signInWithPopup($auth, $provider);
    const u = { name: res.user.displayName, photo: res.user.photoURL, token: (res.user as any).accessToken, uid: res.user.uid };
    localStorage.setItem("user", JSON.stringify(u));
    userStore.setUser(u);
    isLogin.value = true;
    showAlert(`Welcome, ${res.user.displayName}!`, "success");
  } catch { showAlert("Sign-in failed", "failed"); }
}

async function handleSignOut() {
  try {
    await signOut($auth);
    localStorage.removeItem("user");
    userStore.clearUser();
    isLogin.value = false;
    showAlert("Signed out. See you soon!", "success");
  } catch { showAlert("Sign-out failed", "failed"); }
}
</script>

<template>
  <Alert :show="viewAlert" :type="alertType" :message="alertMsg" />

  <!-- Fixed navbar -->
  <header
    :class="[
      'fixed w-full z-50 transition-all duration-300',
      scrolled
        ? 'dark:bg-ocean-bg/90 bg-mist-bg/90 backdrop-blur-xl border-b dark:border-teal-400/10 border-teal-600/10 shadow-card'
        : 'bg-transparent'
    ]"
  >
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between h-16">

        <!-- Brand -->
        <NuxtLink to="/" class="flex items-center gap-2.5 group no-underline">
          <span class="w-2 h-2 rounded-full bg-teal-400 dark:bg-teal-400 animate-pulse"></span>
          <span class="font-heading font-bold text-lg dark:text-white text-gray-900 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            muneer<span class="text-teal-600 dark:text-teal-400">.</span>dev
          </span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            to="/"
            class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium dark:text-gray-300 text-gray-600 hover:dark:text-white hover:text-gray-900 hover:dark:bg-teal-400/8 hover:bg-teal-600/8 transition-all duration-200 no-underline"
            active-class="dark:text-teal-400 text-teal-600 dark:bg-teal-400/10 bg-teal-600/10"
          >
            <Icon name="bx:terminal" class="text-base" />
            Latest
          </NuxtLink>

          <!-- Topics popover -->
          <div class="relative" ref="topicsDropdown">
            <button
              @click.stop="topicsOpen = !topicsOpen"
              :class="[
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer',
                topicsOpen
                  ? 'dark:text-teal-400 text-teal-600 dark:bg-teal-400/10 bg-teal-600/10'
                  : 'dark:text-gray-300 text-gray-600 hover:dark:text-white hover:text-gray-900 hover:dark:bg-teal-400/8 hover:bg-teal-600/8'
              ]"
            >
              <Icon name="gridicons:menus" class="text-base" />
              Topics
              <Icon
                name="mdi:chevron-down"
                :class="['text-base opacity-60 transition-transform duration-200', topicsOpen ? 'rotate-180' : '']"
              />
            </button>

            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 -translate-y-1 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 -translate-y-1 scale-95"
            >
              <div
                v-if="topicsOpen"
                class="absolute top-full left-0 mt-2 w-52 rounded-2xl border dark:border-teal-400/15 border-teal-600/15 dark:bg-ocean-surface bg-white z-50 overflow-hidden origin-top"
                style="box-shadow: 0 16px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(45,212,191,0.06);"
              >
                <!-- Panel header -->
                <div class="px-4 py-2.5 border-b dark:border-teal-400/10 border-teal-600/10 flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                  <span class="font-mono text-xs font-semibold uppercase tracking-widest dark:text-teal-400 text-teal-600">
                    Browse Topics
                  </span>
                </div>
                <!-- Topic pills -->
                <div class="p-2 grid grid-cols-2 gap-1">
                  <NuxtLink
                    v-for="topic in topics"
                    :key="topic"
                    :to="`/topic/${topic}`"
                    @click="topicsOpen = false"
                    class="flex items-center gap-2 px-3 py-2 rounded-xl text-sm dark:text-gray-300 text-gray-600 hover:dark:text-teal-400 hover:text-teal-600 hover:dark:bg-teal-400/8 hover:bg-teal-600/8 transition-all duration-150 no-underline group"
                  >
                    <span class="w-1.5 h-1.5 rounded-full flex-shrink-0 dark:bg-teal-400/30 bg-teal-600/30 group-hover:dark:bg-teal-400 group-hover:bg-teal-600 transition-colors"></span>
                    {{ topic }}
                  </NuxtLink>
                </div>
              </div>
            </Transition>
          </div>

          <NuxtLink
            to="/series"
            class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium dark:text-gray-300 text-gray-600 hover:dark:text-white hover:text-gray-900 hover:dark:bg-teal-400/8 hover:bg-teal-600/8 transition-all duration-200 no-underline"
            active-class="dark:text-teal-400 text-teal-600 dark:bg-teal-400/10 bg-teal-600/10"
          >
            <Icon name="mdi:github" class="text-base" />
            Series
          </NuxtLink>

          <NuxtLink
            to="/about"
            class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium dark:text-gray-300 text-gray-600 hover:dark:text-white hover:text-gray-900 hover:dark:bg-teal-400/8 hover:bg-teal-600/8 transition-all duration-200 no-underline"
          >
            <Icon name="gg:profile" class="text-base" />
            About
          </NuxtLink>

          <a
            href="https://muneer-ahmed.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium dark:text-gray-300 text-gray-600 hover:dark:text-white hover:text-gray-900 hover:dark:bg-teal-400/8 hover:bg-teal-600/8 transition-all duration-200 no-underline"
          >
            <Icon name="mdi:briefcase-outline" class="text-base" />
            Portfolio
            <Icon name="mdi:arrow-top-right" class="text-xs opacity-50" />
          </a>
        </nav>

        <!-- Right actions -->
        <div class="flex items-center gap-2">

          <!-- Theme toggle -->
          <button
            @click="toggleTheme"
            class="w-9 h-9 flex items-center justify-center rounded-xl border dark:border-teal-400/20 border-teal-600/20 dark:text-gray-300 text-gray-600 hover:dark:text-teal-400 hover:text-teal-600 hover:dark:bg-teal-400/8 hover:bg-teal-600/8 transition-all duration-200"
            :title="isDark ? 'Switch to light' : 'Switch to dark'"
          >
            <Icon v-if="isDark" name="tabler:sun-filled" class="text-base" />
            <Icon v-else name="ion:moon" class="text-base" />
          </button>

          <!-- Auth -->
          <button
            v-if="isLogin"
            @click="handleSignOut"
            class="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border dark:border-teal-400/20 border-teal-600/20 text-sm font-medium dark:text-gray-300 text-gray-600 hover:dark:text-teal-400 hover:text-teal-600 hover:dark:bg-teal-400/8 hover:bg-teal-600/8 transition-all duration-200"
          >
            <Icon name="mdi:logout" class="text-sm" />
            Sign Out
          </button>
          <button
            v-else
            @click="handleSignIn"
            class="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style="background: rgba(45,212,191,0.12); border: 1px solid rgba(45,212,191,0.3); color: #2dd4bf;"
            onmouseover="this.style.background='rgba(45,212,191,0.2)'"
            onmouseout="this.style.background='rgba(45,212,191,0.12)'"
          >
            <Icon name="dashicons:googleplus" class="text-base" />
            Sign In
          </button>

          <!-- Mobile hamburger -->
          <button
            @click="menuOpen = !menuOpen"
            class="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border dark:border-teal-400/20 border-teal-600/20 dark:text-gray-300 text-gray-600 transition-colors"
          >
            <Icon :name="menuOpen ? 'mdi:close' : 'mdi:menu'" class="text-lg" />
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <nav
        v-if="menuOpen"
        class="md:hidden py-3 border-t dark:border-teal-400/10 border-teal-600/10 flex flex-col gap-1"
        @click="menuOpen = false"
      >
        <NuxtLink to="/" class="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium dark:text-gray-300 text-gray-700 hover:dark:bg-teal-400/8 hover:bg-teal-600/8 no-underline transition-colors">
          <Icon name="bx:terminal" /> Latest
        </NuxtLink>
        <NuxtLink to="/series" class="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium dark:text-gray-300 text-gray-700 hover:dark:bg-teal-400/8 hover:bg-teal-600/8 no-underline transition-colors">
          <Icon name="mdi:github" /> Series
        </NuxtLink>
        <NuxtLink to="/about" class="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium dark:text-gray-300 text-gray-700 hover:dark:bg-teal-400/8 hover:bg-teal-600/8 no-underline transition-colors">
          <Icon name="gg:profile" /> About
        </NuxtLink>
        <a
          href="https://muneer-ahmed.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium dark:text-gray-300 text-gray-700 hover:dark:bg-teal-400/8 hover:bg-teal-600/8 no-underline transition-colors"
        >
          <Icon name="mdi:briefcase-outline" /> Portfolio
          <Icon name="mdi:arrow-top-right" class="text-xs opacity-50" />
        </a>
        <div v-for="topic in topics" :key="topic">
          <NuxtLink :to="`/topic/${topic}`" class="flex items-center gap-2 px-3 py-2.5 pl-6 rounded-xl text-sm dark:text-gray-400 text-gray-500 hover:dark:bg-teal-400/8 hover:bg-teal-600/8 no-underline transition-colors">
            {{ topic }}
          </NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>
