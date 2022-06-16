<template>
    <div ref="content">
        <menuhead/>
        <main class="mx-auto container">
            <Nuxt/>
        </main>
    </div>
</template>
<script>
import menuhead from '@/components/menu.vue'
import Vue from 'vue'
import global from '../mixins/global' 
export default Vue.extend({
    name:'default',
    components: { menuhead },


    
    
})
</script>
