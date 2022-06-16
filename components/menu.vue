<template>
    <nav class="bg-black w-screen fixed top-0 left-0 z-10 transform ease-in duration-300" ref="menu">
        <div class="max-h-full mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start max-h-full">
                    <div class="flex-shrink-0 flex items-center">
                        <img src="../static/img/cdnlogo.com_star-wars.svg" alt="logo star wars">
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import Vue from 'vue'

export default Vue.extend({
    name:'Menu-Head',
    data() {
        return {
            pagey:0
        }
    },
    methods:{
        scrollMenuEffect(value){
           if(value>this.pagey){
            this.$refs.menu.classList.add('-translate-y-16')
           }else{
            this.$refs.menu.classList.remove('-translate-y-16')
           }
           this.pagey = value
        }
    },
    
    mounted(){
        window.addEventListener('scroll',()=>{
            this.scrollMenuEffect(window.pageYOffset)
        })
    }
})
</script>