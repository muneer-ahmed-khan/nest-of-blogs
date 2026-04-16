<script lang="ts" setup>
import { useUserStore } from '~/store'

interface Comment { id: string; userName: string; userImage: string; userId: string; date: string; comment: string }
interface Props    { id: string }

const props   = defineProps<Props>()
const userStore = useUserStore()
const user      = computed(() => userStore.user)

const comment    = ref('')
const comments   = ref<Comment[]>([])
const viewAlert  = ref(false)
const alertMsg   = ref('')
const alertType  = ref<'success' | 'error'>('success')

function showAlert(msg: string, type: 'success' | 'error') {
  alertMsg.value = msg; alertType.value = type; viewAlert.value = true
  setTimeout(() => (viewAlert.value = false), 2500)
}

async function fetchComments() {
  try {
    const res = await $fetch(`/api/comments/${props.id}`)
    comments.value = (res as any).body.comments
  } catch { showAlert('Failed to load comments.', 'error') }
}

async function handlePost() {
  const currentUser = useCheckAuth()
  if (!currentUser) return showAlert('Please sign in to comment', 'error')
  if (!comment.value.trim()) return
  try {
    const res = await $fetch('/api/comments/post-comment', {
      method: 'POST',
      body: { postId: props.id, userName: currentUser.name, userImage: currentUser.photo, comment: comment.value.trim(), userId: currentUser.uid },
    }) as any
    if (res.status === 200) { showAlert('Comment posted!', 'success'); comment.value = ''; await fetchComments() }
    else showAlert(res.message, 'error')
  } catch { showAlert('Failed to post comment.', 'error') }
}

async function handleDelete(commentId: string) {
  const currentUser = useCheckAuth()
  if (!currentUser) return showAlert('Please sign in', 'error')
  try {
    const res = await $fetch('/api/comments/delete-comment', { method: 'DELETE', body: { postId: props.id, commentId } }) as any
    if (res.status === 200) { await fetchComments(); showAlert('Comment deleted.', 'success') }
    else showAlert(res.message || 'Failed to delete.', 'error')
  } catch { showAlert('Failed to delete comment.', 'error') }
}

watch(() => props.id, fetchComments)
fetchComments()
</script>

<template>
  <div class="mx-auto max-w-screen-md px-4 py-8">
    <Alert :show="viewAlert" :type="alertType" :message="alertMsg" />

    <!-- Section header -->
    <div class="flex items-center gap-4 mb-8">
      <h3 class="font-heading text-lg font-semibold dark:text-white text-gray-900 flex items-center gap-2">
        <Icon name="mdi:comment-outline" class="dark:text-teal-400 text-teal-600" />
        Discussion
        <span
          v-if="comments.length"
          class="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
          style="background:rgba(45,212,191,0.12);color:#2dd4bf;"
        >{{ comments.length }}</span>
      </h3>
      <div class="flex-1 h-px dark:bg-teal-400/15 bg-teal-600/15"></div>
    </div>

    <!-- Comment input -->
    <form @submit.prevent="handlePost" class="mb-10">
      <textarea
        v-model="comment"
        rows="3"
        placeholder="Share your thoughts…"
        class="w-full px-4 py-3 rounded-xl border dark:border-teal-400/20 border-teal-600/20 dark:bg-ocean-surface bg-white dark:text-gray-200 text-gray-700 text-sm leading-relaxed resize-none focus:outline-none focus:dark:border-teal-400/50 focus:border-teal-600/50 transition-colors placeholder:dark:text-gray-600 placeholder:text-gray-400 mb-3"
      ></textarea>
      <div class="flex justify-end gap-2">
        <button
          type="button"
          @click="comment = ''"
          class="px-4 py-2 rounded-xl text-sm font-medium border dark:border-teal-400/20 border-teal-600/20 dark:text-gray-400 text-gray-500 hover:dark:bg-teal-400/8 hover:bg-teal-600/6 transition-all duration-200"
        >Reset</button>
        <button
          type="submit"
          class="px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 bg-[rgba(45,212,191,0.12)] hover:bg-[rgba(45,212,191,0.2)] border border-[rgba(45,212,191,0.3)] text-teal-400"
        >Post</button>
      </div>
    </form>

    <!-- Comments list -->
    <div v-if="comments.length" class="space-y-4">
      <div
        v-for="c in comments"
        :key="c.id"
        class="flex gap-3 p-4 rounded-xl border dark:border-teal-400/10 border-teal-600/10 dark:bg-ocean-surface/50 bg-white/70"
      >
        <img :src="c.userImage" :alt="c.userName" class="w-9 h-9 rounded-full flex-shrink-0 mt-0.5" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-2 mb-1.5">
            <span class="font-semibold text-sm dark:text-white text-gray-900">{{ c.userName }}</span>
            <div class="flex items-center gap-2">
              <span class="text-xs dark:text-gray-600 text-gray-400">{{ c.date }}</span>
              <button
                v-if="c.userId === user?.uid"
                @click="handleDelete(c.id)"
                class="text-xs dark:text-gray-600 text-gray-400 hover:dark:text-red-400 hover:text-red-500 transition-colors"
                title="Delete comment"
              >
                <Icon name="mdi:delete-outline" class="text-sm" />
              </button>
            </div>
          </div>
          <p
            v-for="(line, i) in c.comment.split('\n')"
            :key="i"
            class="text-sm dark:text-gray-300 text-gray-600 leading-relaxed"
          >{{ line }}</p>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-10">
      <Icon name="mdi:comment-outline" class="text-4xl dark:text-gray-700 text-gray-300 mb-3" />
      <p class="text-sm dark:text-gray-500 text-gray-400">No comments yet. Start the discussion!</p>
    </div>
  </div>
</template>
