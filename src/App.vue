<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import storage from "./storage";

export default {
  mounted() {
    // storage.setItem('a', 1)
    // storage.setItem('user', { a: 1 })
    // storage.setItem('abc', { b: 1 }, 'user')
    // storage.clear('a')
    // storage.clear('a', 'user')
  }
}
</script>

