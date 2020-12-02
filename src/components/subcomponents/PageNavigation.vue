<!-- Component that generates a page navigation section (for pagination) -->
<template>
    <div class="pageNavigation" v-if="pages != null">
        <!-- Previous page button -->
        <a
            class="stepButton"
            v-if="currentPage != 1"
            :href="`?page=${currentPage - 1}`"
            ><img src="../../assets/chevron-left.svg"
        /></a>
        <div class="stepButton" v-else>
            <img src="../../assets/chevron-left.svg" />
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
            ><img src="../../assets/chevron-right.svg"
        /></a>
        <div class="stepButton" v-else>
            <img src="../../assets/chevron-right.svg" />
        </div>
    </div>
</template>

<script>
// Import the components used
import PageNavButton from "./PageNavButton.vue";

export default {
    components: {
        PageNavButton
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
                lastPage = { value: this.pageCount, active: false },
                pageCount = this.pageCount,
                currentPage = this.currentPage,
                buttonCount = this.buttonCount;

            // There are four different possible cases for the buttons
            if (pageCount < buttonCount * 3 + 1) {
                // If there are less than 3x the current buttonCount + 1 pages, all are shown
                pages = this.createPages(1, pageCount);
            } else if (currentPage < buttonCount * 2 + 2) {
                // If the user is at the start of the pages, pages 1-7 as well as the last page are shown
                pages = this.createPages(1, buttonCount * 2 + 1);

                // Add "..." and the last page
                pages.push(hiddenPages, lastPage);
            } else if (currentPage > pageCount - buttonCount * 2 - 1) {
                // If the user is at the end of the pages, the first page as well as pages last - 6 to last are shown
                pages = this.createPages(
                    pageCount - buttonCount * 2,
                    pageCount
                );

                // Add the first page and "..."
                pages.unshift(firstPage, hiddenPages);
            } else {
                // If the user is somewhere in the middle of the pages, the first page, the last page, and 3 pages before and after the current page are shown
                pages = this.createPages(
                    currentPage - buttonCount - 1,
                    currentPage + buttonCount - 1
                );

                // Add first and last pages, as well as "..."
                pages.unshift(firstPage, hiddenPages);
                pages.push(hiddenPages, lastPage);
            }

            return pages;
        }
    },

    created() {
        // Calculate how many buttons can be shown given the current screen width
        this.calculateButtonCount();
        window.addEventListener("resize", this.calculateButtonCount);
    },

    data: function() {
        return {
            buttonCount: 3
        };
    },

    destroyed() {
        // Stop calculating how many buttons can be shown when this component is destroyed
        window.removeEventListener("resize", this.calculateButtonCount);
    },

    methods: {
        // Method that calculates how many buttons to show depending on screen width
        calculateButtonCount() {
            if (window.innerWidth < 450) {
                this.buttonCount = 1;
            } else if (window.innerWidth < 700) {
                this.buttonCount = 2;
            } else {
                this.buttonCount = 3;
            }
        },

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
    },

    name: "PageNavigation",

    props: {
        pageData: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped>
.pageNavigation {
    text-align: center;
    margin-top: 50px;
}

/* The actual buttons for navigating between pages */
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
