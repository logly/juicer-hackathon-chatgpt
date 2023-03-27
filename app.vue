<template>
  <div class="min-h-screen bg-gray-200">
    <div class="bg-main flex h-12 items-center py-2 px-4 text-white">
      <div>Juicer</div>
    </div>
    <div class="container mx-auto max-w-4xl">
      <div class="my-5 flex h-24 items-center bg-white">
        <h1 class="px-4 text-3xl font-bold">サイトカテゴリ分類</h1>
      </div>
      <div class="my-5 min-h-[20rem] bg-white px-4 py-3">
        <div class="flex h-20 w-full items-center justify-center bg-gray-200 px-5 py-3">
          <input v-model="inputUrl" class="w-full rounded-full px-5 py-2" placeholder="URL を入力( 例: https://example.com )"/>
          <button class="mx-5 w-20 rounded bg-gray-800 px-5 py-1 text-white" @click="onGpt">検索</button>
        </div>
        <div class="my-6 min-h-[16rem] w-full bg-gray-200 px-5 py-3">
          <ChatCard v-for="(chat,index) in chatMessages" :key="index" :text="chat.text" :is-me="chat.isMe" :is-loading="chat.isLoading"/>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>

type ChatType = {
  isMe: boolean,
  icon: string,
  text: string,
  isLoading?: boolean
}

const inputUrl = ref("");


const onGpt = () => {
  // ここで fetch するように実装
  console.log(inputUrl.value);
}

const chatMessages = ref<ChatType[]>([
  {isMe: true, icon: "", text: "これはテストです。" },
  {isMe: false, icon: "",text: "ほげほげほげ"},
  {isMe: true, icon: "", text: "これはテストです。" },
  {isMe: false, icon: "",text: "ほげほげほげ",isLoading: true},
])



</script>
