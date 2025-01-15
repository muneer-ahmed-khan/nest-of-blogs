<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="absolute w-full -bottom-0">
    <div class="bg-indigo-600 dark:bg-indigo-900">
      <div
        class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row"
      >
        <p class="text-gray-50 text-sm text-center sm:text-left">
          © {{ year }} Nest-Of-Blogs —
          <a
            href="https://github.com/muneer-ahmed-khan"
            rel="noopener noreferrer"
            class="text-gray-50 ml-1"
            target="_blank"
          >
            @Muneer
          </a>
        </p>
        <span
          class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start"
        >
          <a
            class="ml-4 text-gray-50"
            href="https://github.com/muneer-ahmed-khan"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon name="mdi:github" class="w-5 h-5" />
          </a>
          <a
            class="ml-4 text-gray-50"
            href="https://www.linkedin.com/in/muneer-ahmed-a59362140/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon name="mdi:linkedin" class="w-5 h-5" />
          </a>
          <a
            class="ml-4 text-gray-50"
            href="https://stackoverflow.com/users/8422060/muneer-khan"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon name="mdi:stack-overflow" class="w-5 h-5" />
          </a>
          <a
            class="ml-4 text-gray-50"
            href="https://www.facebook.com/muneerkhan555/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon name="mdi:facebook" class="w-5 h-5" />
          </a>
        </span>
      </div>
    </div>
  </footer>
</template>
