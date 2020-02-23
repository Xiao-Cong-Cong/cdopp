<template>
    <nav>
        <ul class="pagination">
            <li :class="{disabled: page<=1}"><a @click="previous" href="#">&laquo;</a></li>
            <li v-for="p in getPages(page)" :key="p" :class="{active: page===p}" @click="page = p"><a href="#">{{p}}</a></li>
            <li :class="{disabled: page>=total}"><a @click="nextPage" href="#">&raquo;</a></li>
        </ul>
        <!-- {{ page }} / {{ total }} -->
        <!-- <Pagination v-model="page" :total="total"></Pagination> -->
    </nav>
</template>

<script>
export default {
    name: "Pagination",
    model: {
        prop: 'givenPage',
        event: 'page-change'
    },
    props: ['givenPage', 'total'],
    data () {
        return {
            page: 0,
            pages: [],		
        }
    },
    methods:{
        previous() {
            if(this.page > 1) this.page--;
        },
        nextPage() {
            if(this.page < this.total) this.page++;
        },
        getPages(p) {
            if(p < 3) return this.pages.slice(0, Math.min(5, this.total));
            if(this.total - p < 3) return this.pages.slice(Math.max(0, this.total-5), this.total);
            return this.pages.slice(p-3, p+2);
        }
    },
    created() {
        this.page = this.givenPage;
        for(var i = 1; i <= 999; i++)   // 初始化成一个极大值
            this.pages.push(i);
    },
    watch: {
        page: function(p) {
            this.$emit('page-change', p);
        }
    }
}
</script>

<style scoped>
    .pagination>li>a {
        text-align: center;
        min-width: 42px;
    }
</style>