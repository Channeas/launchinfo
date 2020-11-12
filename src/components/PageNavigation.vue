<!-- Component that generates a page navigation section (for pagination) -->
<template>
    <div class="pageNavigation" v-if="pages != null">
        <!-- Previous page button -->
        <a
            class="stepButton"
            v-if="currentPage != 1"
            :href="`?page=${currentPage - 1}`"
            ><img src="../assets/chevron-left.svg"
        /></a>
        <div class="stepButton" v-else>
            <img src="../assets/chevron-left.svg" />
        </div>

        <!-- Relative buttons -->
        <pageNavButton
            v-for="(item, index) in pages"
            :key="index"
            :buttonData="item"
        ></pageNavButton>

        <!-- Next page button -->
        <a
            class="stepButton"
            v-if="currentPage != pageCount"
            :href="`?page=${currentPage + 1}`"
            ><img src="../assets/chevron-right.svg"
        /></a>

        <div class="stepButton" v-else>
            <img src="../assets/chevron-right.svg" />
        </div>
    </div>
</template>

<script>
// Import the components used
import PageNavButton from "@/components/PageNavButton.vue";

export default {
    name: "PageNavigation",
    components: {
        PageNavButton
    },
    props: {
        pageData: {
            type: Object,
            required: true
        }
    },
    computed: {
        // The current page that the user is on
        currentPage: function() {
            if (this.$route.query.page) {
                return parseInt(this.$route.query.page);
            } else {
                return 1;
            }
        },
        // The total amount of pages
        pageCount: function() {
            return Math.ceil(
                this.pageData.itemCount / this.pageData.itemsPerPage
            );
        },
        pages: function() {
            // Create a representation of the different pages, to be displayed as PageNavButtons
            var pages = [];
            const hiddenPages = { value: "...", active: false },
                firstPage = { value: 1, active: false },
                lastPage = { value: this.pageCount, active: false };

            // There are four different possible cases for the buttons
            if (this.pageCount < 10) {
                // If there are less than 12 pages, all are shown
                pages = this.createPages(1, this.pageCount);
            } else if (this.currentPage < 6) {
                // If the user is at the start of the pages, pages 1-7 as well as the last page are shown
                pages = this.createPages(1, 7);
                pages.push(hiddenPages, lastPage);
            } else if (this.currentPage > this.pageCount - 5) {
                // If the user is at the end of the pages, the first page as well as pages last - 6 to last are shown
                pages = this.createPages(this.pageCount - 6, this.pageCount);
                pages.unshift(firstPage, hiddenPages);
            } else {
                // If the user is somewhere in the middle of the pages, the first page, the last page, and 3 pages before and after the current page are shown
                pages = this.createPages(
                    this.currentPage - 2,
                    this.currentPage + 2
                );
                pages.unshift(firstPage, hiddenPages);
                pages.push(hiddenPages, lastPage);
            }

            return pages;
        }
    },
    methods: {
        createPages(startPage, endPage) {
            // Loop through the range, creating one page for each number
            const pages = [];
            for (
                var pageNumber = startPage;
                pageNumber <= endPage;
                pageNumber++
            ) {
                pages.push({
                    value: pageNumber,
                    active: pageNumber == this.currentPage ? true : false
                });
            }

            return pages;
        }
    }
};
</script>

<style scoped>
.pageNavigation {
    text-align: center;
    margin-top: 50px;
}

.stepButton {
    height: 40px;
    padding: 0 15px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    border-radius: 5px;
    text-decoration: none;
    vertical-align: middle;
    -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
}

.stepButton:first-of-type {
    margin-right: 10px;
}

.stepButton:last-of-type {
    margin-left: 10px;
}

div {
    cursor: default;
}
</style>
