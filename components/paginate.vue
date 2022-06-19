<template>
<div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
  <div class="flex-1 flex justify-between sm:hidden">
    <button v-show="page > 1"  @click="setPage('prev')" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </button>
    <div class="grow-1"></div>
    <button v-show="page < totalPages"  @click="setPage('next')" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </button>
  </div>
  <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
    <div>
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">{{page*itensPerpage - (itensPerpage-1)}}</span>
        to
        <span class="font-medium">{{ page*itensPerpage <= totalCharacters ? page*itensPerpage : totalCharacters}}</span>
        of
        <span class="font-medium">{{totalCharacters}}</span>
        results
      </p>
    </div>
    <div>
      <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <button :disabled="page==1"
          @click="setPage('prev')"
          :class="`relative inline-flex items-center px-2 py-2 rounded-l-md border
            ${page==1 ? 'border-gray-300 bg-white text-gray-500':'border-black text-black hover:text-gray-800 hover:bg-gray-500 bg-white'}
             text-sm font-medium `">
          <span class="sr-only">Previous</span>
          <arrow-left/>
        </button>
       
        <button v-for="index in totalPages" :key="index"  v-bind:aria-current="index == page ? 'page' : ''"
          @click="index != page ? setPage(index) : null"
          :class="`border-black  relative inline-flex items-center px-4 py-2 border text-sm font-medium 
          ${index == page ? 'bg-black  text-yellow-500' :'text-black hover:text-gray-800 hover:bg-gray-500 bg-white'}`">
          {{index}}
        </button>
       
        <button :disabled="page==totalPages"
          @click="setPage('next')"
          :class="`relative inline-flex items-center px-2 py-2 rounded-r-md border
          ${page==totalPages ? 'border-gray-300 bg-white text-gray-500':'border-black text-black hover:text-gray-800 hover:bg-gray-500 bg-white'}
             text-sm font-medium`">
          <span class="sr-only">Next</span>
          <arrow-right/>
        </button>
      </nav>
    </div>
  </div>
</div>

</template>
<script>
import Vue from 'vue'
import global from '../mixins/global'
export default Vue.extend({
    name:"paginate",
    props:['page','totalPages','totalCharacters'],
    data() {
      return {
        attPage: ''
      }
    },
    mixins:[global],
    methods:{
      setPage(p){
        
        switch(p){
          case 'prev':
              this.attPage = this.page-1
          break;
          case 'next':
              this.attPage = this.page+1
          break;
          default:
            this.attPage = p
        }
        if(this.attPage <1 ){
           this.attPage = 1
        }
        if(this.attPage > this.totalPages ){
            this.attPage =  this.totalPages
        }
        this.$router.replace({ path: '/', query: { page: this.attPage }})
        document.title = 'Star Wars API - Página '+ this.attPage
        this.$emit('attPageEmit',this.attPage)
        
      }
    }
})
</script>