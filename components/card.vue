<template>
    <div class="p-4 md:w-1/3 cursor-pointer" @click="requireStarships">
        <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden pointer-events-none">
            <img class="lg:h-48 md:h-36 w-full object-cover object-center" :src="imageRet" alt="blog" loading="lazy" @error="defaultImage">
            <div class="p-6">
                <h2 class="title-font text-lg font-medium text-gray-900 mb-3">{{character.name}}</h2>
                <p class="leading-relaxed mb-3">
                  Height : {{character.height}} <br>
                  Mass : {{character.mass}}
                </p>
                <div class="flex items-center flex-wrap ">
                    <div class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script >
import Vue from 'vue'
export default Vue.extend({
  name: 'card',
  props:['character'],
  data() {
    return {
        image : ''
    }
  },
  computed:{
    imageRet(){
      if(this.image){
        return `http://farm${this.image.farm}.staticflickr.com/${this.image.server}/${this.image.id}_${this.image.secret}.jpg`
      }else{
        return 'https://www.vectordiary.com/wp-content/uploads/2021/03/star-wars-logo-font.jpg'
      }
        
    }
  },
  methods:{
    defaultImage(ev){
        ev.target.src = 'https://www.vectordiary.com/wp-content/uploads/2021/03/star-wars-logo-font.jpg'
    },
    requireStarships(ev){
      this.$emit('openModalCard')
    }
  },
  mounted(){
    this.$axios.$get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a17951a94d5e22808db5d118db5b74e6&tags=${this.character.name}&format=json&nojsoncallback=1`)
    .then((res)=>{
        this.image = res.photos.photo[0]
    })
  }
  

})
</script>