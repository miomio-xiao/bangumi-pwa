<template>
  <div class="search-page">
    <v-toolbar floating
               dark
               color="pink"
               dense>
      <v-text-field prepend-icon="arrow_back"
                    hide-details
                    single-line></v-text-field>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Search extends Vue {}
</script>

<style lang="scss" scoped>

</style>
