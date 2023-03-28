<template>
  <div :class="['flex',isMe(type)?'flex-row-reverse':'flex-row' ]">
    <img class="h-16 w-16 rounded-full" src="https://placehold.jp/150x150.png"/>
    <div :class="['relative max-w-full w-[480px] balloon',isMe(type) ? 'balloon-me': isJuicer(type) ? 'balloon-juicer':'balloon-chatgpt']">
      <div :class="['px-4 py-3 min-h-[5rem] text-white w-full',isMe(type) ? 'bg-gray-300': isJuicer(type)? 'bg-main' : 'bg-green-500',]">
        <div v-if="isLoading">
          <svg class="animate-spin h-8 w-8 border-4 border-white rounded-full border-t-transparent" viewBox="0 0 24 24"></svg>
        </div>
        <span class="line-clamp-3 hover:overflow-none hover:block transition-all duration-300 " v-else>
          {{ text }}
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from "nuxt/dist/app/compat/capi";

defineProps({
  text: {
    type: String,
    required: true,
    default: ""
  },
  type: {
    type: String as PropType<"me"|"juicer"|"chatgpt">,
    required: false,
    default : "me"
  },
  isLoading: {
    type: Boolean,
    required: false,
    default: false
  }
})

const isMe = (type: "me"|"juicer"|"chatgpt") => {
  return type === "me"
}

const isJuicer = (type: "me" | "juicer" | "chatgpt") => {
  return type ==="juicer"
}

</script>

<style scoped>
.balloon {
  position: relative;
  display: inline-block;
  margin: 0.8rem 0 1.5em 15px;
  padding: 0px;
  min-width: 120px;
  max-width: 100%;
  font-size: 16px;
  box-sizing: border-box;
}

.balloon:after {
  content: "";
  position: absolute;
  top: 0.4rem;
  border: 14px solid transparent;
  z-index: 1;
}

.balloon-me {
  margin: 0.8rem 15px 1.5em 0;
  border: solid 3px #D1D5DB;
}

.balloon-me:after {
  right: -30px;
  border-left: 14px solid #D1D5DB;
}

.balloon-juicer {
  margin: 0.8rem 0 1.5em 15px;
  border: solid 3px #5a4775;
}

.balloon-juicer:after {
  left: -30px;
  border-right: 14px solid #5a4775;
}

.balloon-chatgpt {
  margin: 0.8rem 0 1.5em 15px;
  border: solid 3px #22C55E;
}

.balloon-chatgpt:after {
  left: -30px;
  border-right: 14px solid #22C55E;
}





</style>
