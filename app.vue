<template>
  <div class="min-h-screen bg-gray-200">
    <div class="bg-main flex h-12 items-center py-2 px-4 text-white">
      <div>Juicer</div>
    </div>
    <div class="container mx-auto max-w-4xl">
      <div class="my-5 flex h-24 items-center bg-white">
        <h1 class="px-4 text-3xl font-bold">サイトカテゴリ分類</h1>
      </div>
      <div class="my-5 min-h-[32rem] bg-white px-4 py-3">
        <div class="flex h-20 w-full items-center justify-center bg-gray-200 px-5 py-3">
          <input v-model="inputUrl" type="url" class="w-full rounded-full px-5 py-2" placeholder="URL を入力( 例: https://example.com )"/>
          <button class="mx-5 w-20 rounded bg-gray-800 px-5 py-1 text-white" @click="onCategorizeUrl">検索</button>
        </div>
        <div class="my-6 h-full min-h-[50rem] w-full bg-gray-200 px-5 py-3">
          <ChatCard v-for="(chat,index) in chatMessages" :key="index" :text="chat.text" :type="chat.type"/>
          <ChatCard v-if ="isLoading" is-loading :type="currentType" />
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>

type ChatType = {
  type: "me"| "juicer" | "chatgpt" ,
  text: string,
}

const inputUrl = ref("");
const isLoading = ref(false);
const currentType = ref<"juicer"|"chatgpt">("juicer")

const chatMessages = ref<ChatType[]>([])


const onCategorizeUrl = async () => {

  chatMessages.value = [
    ...chatMessages.value,
    { type: 'me', text: `[${inputUrl.value}] を分類して` },
    { type: 'juicer', text: "わかりました！" }
  ]

  currentType.value = "juicer";
  isLoading.value = true;

  const getPageInfo = await useFetch("/api/scrape", {
    method: "POST",
    body: { 'url': inputUrl.value }
  });

  isLoading.value = false;

  chatMessages.value = [
    ...chatMessages.value,
    {
      type: 'juicer', text: `
        @chatgpt へ以下のデータを送ります。。

      {
        title: ${getPageInfo.data.value?.title},
        description: ${getPageInfo.data.value?.description},
        keywords: ${getPageInfo.data.value?.keywords},
        body: ${getPageInfo.data.value?.body},
      }
    `
    }
  ]

  currentType.value="chatgpt"
  isLoading.value = true;

  const chatGPTAnswer = await useFetch("/api/openai", {
    method: "POST",
    body: getPageInfo.data.value,
  })

  isLoading.value = false;
  chatMessages.value = [
    ...chatMessages.value,
    {type: "chatgpt", text :chatGPTAnswer.data.value?.category ?? "判定できませんでした。"}
  ]
}


</script>
