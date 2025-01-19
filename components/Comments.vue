<script lang="ts" setup>
import { useUserStore } from "~/store";

// Props
interface Props {
  id: string;
}
const props = defineProps<Props>();

// Reactive state
const comment = ref<string>("");
const comments = ref<
  Array<{
    id: string;
    userName: string;
    userImage: string;
    userId: string;
    date: string;
    comment: string;
  }>
>([]);
const viewAlert = ref<boolean>(false);
const alertMessage = ref<string>("");
const alertType = ref<"success" | "error">("success");
const textAreaHeight = ref<number>(100);

// Pinia store
const userStore = useUserStore();
const user = computed(() => userStore.user);

// Utility functions
const showAlert = (message: string, type: "success" | "error"): void => {
  alertMessage.value = message;
  alertType.value = type;
  viewAlert.value = true;

  setTimeout(() => {
    viewAlert.value = false;
  }, 2000);
};

const adjustTextareaHeight = (event: Event): void => {
  const target = event.target as HTMLTextAreaElement;
  textAreaHeight.value = Math.max(target.scrollHeight, 100);
};

// Fetch comments dynamically
const fetchComments = async (): Promise<void> => {
  try {
    const response = await $fetch(`/api/comments/${props.id}`);
    comments.value = (response as any).body.comments;
  } catch (error) {
    showAlert("Failed to load comments.", "error");
  }
};

// Watch for changes in the prop to fetch comments dynamically
watch(() => props.id, fetchComments);

// Initial fetch
fetchComments();

// Actions
const handlePost = async (): Promise<void> => {
  const currentUser = useCheckAuth();

  if (!currentUser) {
    showAlert("Please SignIn to comment", "error");
    return;
  }

  if (comment.value.trim()) {
    try {
      const response = await $fetch("/api/comments/post-comment", {
        method: "POST",
        body: {
          postId: props.id,
          userName: currentUser.name,
          userImage: currentUser.photo,
          comment: comment.value.trim(),
          userId: currentUser.uid,
        },
      });

      if (response.status === 200) {
        showAlert("Comment posted successfully.", "success");
        comment.value = "";
        await fetchComments();
      } else {
        showAlert(response.message, "error");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      showAlert("Failed to post comment.", "error");
    }
  }
};

const resetComment = (): void => {
  comment.value = "";
};

const handleDeleteComment = async (commentId: string): Promise<void> => {
  const currentUser = useCheckAuth();

  if (!currentUser) {
    showAlert("Please SignIn to delete comments", "error");
    return;
  }

  try {
    const response: any = await $fetch("/api/comments/delete-comment", {
      method: "DELETE",
      body: {
        postId: props.id,
        commentId,
      },
    });

    if (response.status === 200) {
      await fetchComments();
      showAlert("Comment deleted successfully.", "success");
    } else {
      showAlert(response.message || "Failed to delete comment.", "error");
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    showAlert("Failed to delete comment.", "error");
  }
};
</script>

<template>
  <div>
    <!-- Alert Section -->
    <Alert :show="viewAlert" :type="alertType" :message="alertMessage" />

    <!-- Comment Input Section -->
    <div class="flex flex-wrap mb-6 mt-6 mx-auto max-w-screen-md">
      <div class="relative container p-1 appearance-none label-floating">
        <form @submit.prevent="handlePost">
          <textarea
            v-model="comment"
            class="resize-none tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-100 border border-gray-100 dark:bg-gray-800 dark:border-gray-800 rounded focus:outline-none focus:bg-white focus:border-gray-300 dark:focus:bg-gray-900 dark:focus:border-gray-700 dark:text-white"
            id="message"
            placeholder="What are your thoughts..?"
            :style="{ height: textAreaHeight + 'px' }"
            @input="adjustTextareaHeight"
          ></textarea>
          <div class="text-right">
            <button
              type="button"
              class="bg-indigo-500 dark:bg-indigo-600 text-white px-3 py-1.5 rounded text-sm font-semibold mr-5"
              @click="resetComment"
            >
              Reset
            </button>
            <button
              type="submit"
              class="bg-indigo-500 dark:bg-indigo-600 text-white px-3 py-1.5 rounded text-sm font-semibold"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Comments Section -->
    <div class="mx-auto max-w-screen-md">
      <div class="m-2 md:m-0">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="space-y-4 py-3"
        >
          <div class="flex">
            <div class="flex-shrink-0 mr-1.5 md:mr-3">
              <img
                class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                :src="comment.userImage"
                :alt="comment.userName"
              />
            </div>
            <div
              class="flex-1 border border-gray-300 dark:border-gray-500 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed relative"
            >
              <strong class="text-gray-700 dark:text-gray-200">
                {{ comment.userName + " " }}
              </strong>
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ comment.date }}
              </span>
              <span
                v-if="comment.userId === user?.uid"
                class="absolute right-6 top-5 cursor-pointer"
                @click="handleDeleteComment(comment.id)"
              >
                <Icon name="mdi:delete" class="dark:text-white" />
              </span>
              <p
                v-for="(line, index) in comment.comment.split('\\n')"
                :key="index"
                class="text-sm text-gray-600 dark:text-gray-300"
              >
                {{ line }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
