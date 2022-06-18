<template>
  <div class="p-4 w-full md:w-3/6 lg:w-1/3 cursor-pointer" @click="requireStarships">
    <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden pointer-events-none">
      <img class="h-48 w-full object-cover object-center" :src="imageRet" alt="blog" loading="lazy" @error="defaultImage">
      <div class="p-6">
        <h2 class="title-font text-lg font-medium text-gray-900 mb-3">{{character.name}}</h2>
        <p class="leading-relaxed mb-3">
          Gender: {{character.gender}} <br>
          Birth Year: {{character.birth_year}} <br>
          Height : {{character.height}} feets <br>
          Mass : {{character.mass}} pounds
        </p>
        <div class="flex items-center flex-wrap ">
            Learn More 
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import Vue from 'vue'
export default Vue.extend({
  name: 'card',
  props:['character','ind'],
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
      this.$emit('openModalCard',this.ind)
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