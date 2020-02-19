<template>
    <div id="app">
        <Header></Header>
        <router-view/>
        <Register></Register>
    </div>
</template>

<script>
    import Header from "@/components/Header"
    import Register from "@/components/Register"

    export default {
        name: "app",
        components: {
            Header,
            Register
        },
        data() {
            return {
                
            }
        },
        methods: {
            
        }
    }
</script>

<style>
</style>
