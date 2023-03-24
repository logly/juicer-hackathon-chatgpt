<template>
  <div :class="['flex',isMe?'flex-row-reverse':'flex-row' ]">
  <img class="h-16 w-16 rounded-full" src="https://placehold.jp/150x150.png"/>
    <div :class="['relative','max-w-full','w-[480px]','balloon',isMe ? 'balloon-me':'balloon-opponent']">
      <div :class="['px-4','py-3','min-h-[5rem]', 'text-white',isMe?'bg-main':'bg-green-500','w-full']">{{ text }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    required: true,
    default: ""
  },
  icon: {
    type: String,
    required: false,
    default :"",
  },
  isMe: {
    type: Boolean,
    required: false,
    default : false
  }
})
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
  top: 50%;
  margin-top: -2rem;
  border: 14px solid transparent;
  z-index: 1;
}

.balloon-me {
  margin: 0.8rem 15px 1.5em 0;
  border: solid 3px #5a4775;
}

.balloon-me:after {
  right: -30px;
  border-left: 14px solid #5a4775;
}

.balloon-opponent {
  margin: 0.8rem 0 1.5em 15px;
  border: solid 3px #22C55E;
}

.balloon-opponent:after {
  left: -30px;
  border-right: 14px solid #22C55E;
}





</style>
