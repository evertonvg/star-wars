<template>
    <transition name="fade">
        <div class="fixed w-screen h-screen  top-0 left-0 bg-black opacity-90 flex items-center justify-center" v-show="showModal" @click.self="closeModal">
            <div class="rounded-md bg-white h-auto w-9/12 relative overflow-hidden py-48">
                <close fill="#302E53" title="botão de fechar modal" class="absolute top-3 right-3 md:top-4 md:right-4 cursor-pointer" @click="closeModal"/>
                <p class="text-center">Carregando... <loading class="animate animate-spin"/></p>
            </div>
        </div>
    </transition>
</template>

<script>

export default {
 
    name:"modal",
    props:['character'],
    data() {
        return {
            showModal:false,
            showLoad:true
        }
    },
    methods:{
        openModal(){
            this.showModal = true
        },
        closeModal(){
            this.showModal = false
        }, 
    },
    mounted(){
        window.addEventListener('keyup',(ev)=>{
            switch(ev.key){
                case 'Escape':
                    this.closeModal()
                    document.body.style.overflow = 'auto'
                break
            }
        })
        
    }
}
</script>

<style>

</style>