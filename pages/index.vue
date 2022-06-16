<template>
  <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <transition-group name="fade" tag="div" class="flex flex-wrap -m-4">
      <card v-for="character in characters" :key="character.name" :character="character" v-on:openModalCard="openModal"/>
    </transition-group>
    <paginate :page="page" :totalPages="totalPages" :totalCharacters="totalCharacters" v-on:attPageEmit="attPage" v-show="characters" />
  </div>
  <loading v-show="showload"/>
  <p class="text-center" v-show="error!=''">{{error}}</p>
  <modal :character="character" ref="modal" />
</section>
</template>

<script>
import Vue from 'vue'
import card from '@/components/card.vue'
import paginate from '@/components/paginate.vue'
import character from '@/typings/character'
import global from '../mixins/global'
import modal from '@/components/modal.vue'
export default Vue.extend({
  name: 'IndexPage',
  components: { card, paginate, modal },
  data() {
    return {
      characters : [],
      totalCharacters:0,
      error:'',
      page:1,
      totalPages:0,
      character:''
    }
  },
  mixins:[global],
  async fetch(){
    await this.search()
  },
  methods:{
    async search(){
      
      this.characters = await this.$axios.$get('people/?page='+this.page)
      .then((res) => {
        this.totalCharacters = res.count
        this.totalPages = Math.ceil(this.totalCharacters / this.itensPerpage)
        this.showload = false
        return res.results
      })
      .catch((err)=>{
        this.showload = false
        this.error = this.responseError(err)
      })
    },
    attPage(atP){
      this.page = atP
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      this.showload = true
      this.characters = []
      this.search()
    },
    openModal(){
      this.$refs.modal.openModal()
    }
    
  },
  created(){
    if(this.$route.query.page){
        this.page = this.$route.query.page
      }
  }
})
</script>
