<template>
  <v-btn icon
         v-if="!searching"
         @click="toggle(true)">
    <v-icon>search</v-icon>
  </v-btn>
  <v-text-field v-else
                append-outer-icon="search"
                class="tag-input"
                color="#fff"
                hide-details
                single-line
                v-model="name"
                @click:append-outer="toggle(false)"
                @keyup.enter="submit" />
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component({
  name: 'tagInput'
})
export default class TagInput extends Vue {
  @Prop({ type: String, default: '' })
  tagName!: string;

  name: string = this.tagName || '';
  searching: boolean = false;

  @Watch('tagName')
  tagNameChange(tagName: string) {
    this.name = tagName;
  }

  toggle(searching: boolean) {
    this.searching = searching;
    this.$emit('searching', searching);
  }

  submit() {
    this.toggle(false);
    this.$emit('change', this.name);
  }
}
</script>

<style lang="stylus" scoped>
.tag-input {
  padding-top: 0;
}
</style>
