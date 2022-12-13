<template>
  <div class="wrapper">
    <my-header></my-header>
    <main class="main">
      <section>
        <router-view />
      </section>
    </main>
    <my-footer></my-footer>
  </div>
</template>
<script>

import MyHeader from '@/components/MyHeader.vue';
import MyFooter from '@/components/MyFooter.vue';

export default {
  components: {
    MyFooter,
    MyHeader
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif
}
input,
button {
  display: block;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
a {
  text-decoration: none;
}
html,
body,
#app {
  height: 100%;
}
body {
  color: #f7fffc;
  background-color: #141414;
}
.wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1 1 auto;
}
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 15px;
}

#app {}
</style>
