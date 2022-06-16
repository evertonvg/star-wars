<template>
    <div>
        <menuhead/>
        <main class="mx-auto container">
            <Nuxt/>
        </main>
    </div>
</template>
<script>
import menuhead from '@/components/menu.vue'
import Vue from 'vue'
export default Vue.extend({
    name:'default',
    components: { menuhead },

    
})
</script>
