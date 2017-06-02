<template>
  <div>
    <ul>
      <li v-for="item in 20">
        <p>{{item}}</p>
        <router-link :to="{ name: 'test' }">test</router-link>
      </li>
    </ul>
  </div>
</template>
