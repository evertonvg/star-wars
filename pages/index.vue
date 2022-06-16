<template>
  <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap -m-4">
      <card v-for="character in characters" :key="character.name" :character="character" />
    </div>
    <paginate/>
  </div>
</section>
</template>

<script>
import Vue from 'vue'
import card from '@/components/card.vue'
import paginate from '@/components/paginate.vue'
import character from '@/typings/character'

export default Vue.extend({
  name: 'IndexPage',
  components: { card, paginate },
  data() {
    return {
      characters : [],
      totalCharacters:0
    }
  },
  async fetch(){
    this.characters = await this.$axios.$get('people')
    .then((res) => {
      this.totalCharacters = res.count

      return res.results
    })
    
  },
})
</script>
