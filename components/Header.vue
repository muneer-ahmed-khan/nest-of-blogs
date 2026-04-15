<script setup lang="ts">
defineProps({
  topic:      { type: Boolean,  default: false },
  topicName:  { type: String,   default: "" },
  topicCount: { type: Number,   default: 0 },
});
</script>

<template>
  <!-- Topic header -->
  <div v-if="topic" class="pt-28 pb-6 px-6 mx-auto max-w-7xl">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span
          class="w-1 h-8 rounded-full"
          style="background: linear-gradient(180deg, #2dd4bf, #fbbf24);"
        ></span>
        <h1 class="font-heading text-2xl font-bold dark:text-white text-gray-900">
          {{ topicName }}
        </h1>
      </div>
      <span class="tag-pill-teal">{{ topicCount }} article{{ topicCount !== 1 ? 's' : '' }}</span>
    </div>
  </div>

  <!-- Blog home hero -->
  <div v-else class="pt-32 pb-16 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col lg:flex-row items-center gap-12">

        <!-- Left: text -->
        <div class="flex-1 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 mb-6 animate-fade-up">
            <span class="w-2 h-2 rounded-full animate-pulse" style="background:#2dd4bf;"></span>
            <span class="font-mono text-xs font-semibold tracking-widest uppercase" style="color: #2dd4bf;">
              Technical Blog
            </span>
            <span class="w-8 h-px" style="background: #2dd4bf; opacity: 0.4;"></span>
          </div>

          <h1
            class="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.12] tracking-tight dark:text-white text-gray-900 mb-6 animate-fade-up-2"
          >
            Code.<br />
            <span
              class="bg-clip-text text-transparent"
              style="background-image: linear-gradient(135deg, #2dd4bf 0%, #fbbf24 100%);"
            >Learn.</span>
            Build.
          </h1>

          <p class="text-lg dark:text-gray-400 text-gray-500 max-w-lg leading-relaxed animate-fade-up-3 mx-auto lg:mx-0">
            Practical Node.js, Express, and TypeScript. Written clearly, from first principles to production.
          </p>

          <!-- Audience signal -->
          <div class="flex flex-wrap items-center gap-2 mt-5 animate-fade-up-3 justify-center lg:justify-start">
            <span class="font-mono text-xs dark:text-gray-600 text-gray-400">Written for</span>
            <span v-for="label in ['Junior Devs', 'Senior Engineers', 'Hiring Managers']" :key="label"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium dark:bg-teal-400/8 bg-teal-600/8 dark:text-teal-400/70 text-teal-600/70 border dark:border-teal-400/15 border-teal-600/15"
            >{{ label }}</span>
          </div>

          <div class="flex flex-wrap items-center gap-3 mt-8 animate-fade-up-3 justify-center lg:justify-start">
            <NuxtLink to="#articles" class="btn-ocean no-underline">
              <Icon name="bx:terminal" />
              Read Articles
            </NuxtLink>
            <NuxtLink to="/series" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border dark:border-teal-400/25 border-teal-600/25 dark:text-gray-300 text-gray-600 hover:dark:border-teal-400/50 hover:border-teal-600/50 transition-all duration-200 no-underline">
              <Icon name="mdi:github" class="dark:text-teal-400 text-teal-600" />
              GitHub Series
            </NuxtLink>
          </div>
        </div>

        <!-- Right: floating terminal card -->
        <div class="flex-shrink-0 w-full max-w-sm lg:max-w-md animate-fade-up-3 animate-float">
          <div
            class="rounded-2xl border dark:border-teal-400/18 border-teal-600/18 overflow-hidden relative"
            style="background: #0a1a20; box-shadow: 0 24px 64px rgba(45,212,191,0.12);"
          >
            <!-- Terminal title bar -->
            <div class="flex items-center gap-2 px-4 py-3 border-b dark:border-teal-400/12 border-teal-600/12" style="background: rgba(45,212,191,0.04);">
              <span class="w-3 h-3 rounded-full" style="background:#ff5f56;"></span>
              <span class="w-3 h-3 rounded-full" style="background:#ffbd2e;"></span>
              <span class="w-3 h-3 rounded-full" style="background:#27c93f;"></span>
              <span class="ml-3 font-mono text-xs dark:text-gray-500 text-gray-400">node server.ts</span>
            </div>
            <!-- Code body -->
            <div class="p-5 font-mono text-xs leading-relaxed">
              <div><span style="color:#6b7280;">// TypeScript Node.js</span></div>
              <div class="mt-2">
                <span style="color:#2dd4bf;">import</span>
                <span class="dark:text-gray-300 text-gray-600"> &#123; EventEmitter &#125; </span>
                <span style="color:#2dd4bf;">from</span>
                <span style="color:#fbbf24;"> 'events'</span>
              </div>
              <div class="mt-1">
                <span style="color:#2dd4bf;">import</span>
                <span class="dark:text-gray-300 text-gray-600"> http </span>
                <span style="color:#2dd4bf;">from</span>
                <span style="color:#fbbf24;"> 'http'</span>
              </div>
              <div class="mt-3">
                <span style="color:#2dd4bf;">const</span>
                <span class="dark:text-gray-300 text-gray-600"> server </span>
                <span style="color:#e2e8f0;">=</span>
                <span class="dark:text-gray-300 text-gray-600"> http.</span>
                <span style="color:#fbbf24;">createServer</span>
                <span class="dark:text-gray-300 text-gray-600;">(</span>
              </div>
              <div class="ml-4">
                <span style="color:#2dd4bf;">(req, res)</span>
                <span class="dark:text-gray-300 text-gray-600"> =&gt; &#123;</span>
              </div>
              <div class="ml-8">
                <span class="dark:text-gray-300 text-gray-600">res.</span>
                <span style="color:#fbbf24;">writeHead</span>
                <span class="dark:text-gray-300 text-gray-600;">(</span>
                <span style="color:#2dd4bf;">200</span>
                <span class="dark:text-gray-300 text-gray-600;">)</span>
              </div>
              <div class="ml-8">
                <span class="dark:text-gray-300 text-gray-600">res.</span>
                <span style="color:#fbbf24;">end</span>
                <span class="dark:text-gray-300 text-gray-600;">(</span>
                <span style="color:#fbbf24;">'Hello World'</span>
                <span class="dark:text-gray-300 text-gray-600;">)</span>
              </div>
              <div class="ml-4">
                <span class="dark:text-gray-300 text-gray-600">&#125;</span>
              </div>
              <div>
                <span class="dark:text-gray-300 text-gray-600">)</span>
              </div>
              <div class="mt-3 flex items-center gap-2">
                <span style="color:#2dd4bf;">server</span>
                <span class="dark:text-gray-300 text-gray-600;">.</span>
                <span style="color:#fbbf24;">listen</span>
                <span class="dark:text-gray-300 text-gray-600;">(</span>
                <span style="color:#2dd4bf;">3000</span>
                <span class="dark:text-gray-300 text-gray-600;">)</span>
              </div>
              <div class="mt-4 pt-3 border-t dark:border-teal-400/10 border-teal-600/10 flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full animate-pulse" style="background:#27c93f;"></span>
                <span style="color:#27c93f;" class="font-mono text-xs">Server running on port 3000</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
