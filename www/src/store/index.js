import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'

var api=axios.create){
    baseURL: 'https://itunes.apple.com/search?media=music&term=',     // Need to add in url link to database
    timeout: 3000
})

vue.use(vuex)

export default new vuex.Store({
    state:{
        
    },
    mutations:{

    },
    actions:{

    }
})