import loading from '../components/loading.vue'
export default{
    components:{
        'loading':loading
    },
    data() {
        return {
            showload:true,
            itensPerpage:10,
        }
    },
    methods:{
        responseError(err){
            switch(err.response.status){
               case 500:
                   return 'internal server error'
               break
               case 404:
                   return 'Page not found'
               break
               default:
                   return 'Unable to claim the characters, please try later.'
            }
        },
    }
}