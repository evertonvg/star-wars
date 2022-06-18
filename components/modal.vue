<template>
    <transition name="fade">
        <div class="fixed w-screen h-screen  top-0 left-0 bg-black opacity-90 flex items-center justify-center" v-show="showModal" @click.self="closeModal">
            <div class="rounded-md bg-white h-auto w-9/12 relative overflow-hidden p-3 sm:p-20">
                <close fill="#302E53" title="botão de fechar modal" class="absolute top-3 right-3 md:top-4 md:right-4 cursor-pointer" @click="closeModal"/>
                <p class="text-center flex items-center justify-center" v-show="people=='' || starships.length!=people.starships.length">
                    Loading... <load class="animate animate-spin"/>
                </p>
                <p class="text-center" v-show="showWarn!=''">
                    {{showWarn}}
                </p>
                <div v-show="people!='' && starships.length==people.starships.length">
                    <h2 class="title-font text-lg font-medium text-gray-900 mb-3">starships belonging to {{people.name}}</h2>
                    <p class="leading-relaxed mb-3" v-for="starship in starships" :key="starship.name">
                        {{starship}}
                    </p>
                    <p class="leading-relaxed mb-3" v-if="starships.length==0">
                        Nothing found
                    </p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import global from '../mixins/global'
export default {
 
    name:"modal",
    props:['character'],
    data() {
        return {
            showModal:false,
            showLoad:true,
            lastURL : '',
            people:'',
            showWarn: '',
            starships:[]
        }
    },
    mixins:[global],
    methods:{
        async openModal(ind,pg){
            this.lastURL = pg
            this.showModal = true
            if(!this.$route.query.people){
               await this.$router.replace({ path: '/', query: { people: ind }}) 
            }
            this.callPeople(ind)
        },
        closeModal(){
            this.$router.replace({ path: '/', query: { page: this.lastURL }})
            this.people=''
            this.starships = []
            this.showModal = false
        },
        callPeople(ind){
            this.$axios.$get('people/'+ind)
            .then((res)=>{
                this.showWarn = ''
                this.people = res
                this.callStarships(res)
                return res
            })
            .catch((err)=>{
                this.showWarn = this.responseError(err)
            })  
        },
        callStarships(st){
            st.starships.forEach((sts)=>{ 
            this.$axios.$get(sts)
                .then((resp)=>{
                    this.starships.push(resp.name)
                })
            })
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