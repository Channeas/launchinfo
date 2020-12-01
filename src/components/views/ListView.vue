<!-- Component used on the views displaying lists giving a uniform title -->
<template>
    <div class="listView">
        <h1 class="listName">{{ title }}</h1>
        <slot></slot>

        <!-- Potentially display an error message -->
        <p v-if="errorCode" class="errorMessage">
            {{ errorMessage }}
        </p>
    </div>
</template>

<script>
export default {
    computed: {
        errorMessage: function() {
            // Make sure there is an error message
            if (!this.errorCode) {
                return "";
            }

            // Display the correct error message
            switch (this.errorCode) {
                case 429:
                    return "API limit exceeded. Sorry";
                default:
                    return "Unknown error";
            }
        }
    },
    name: "ListView",
    props: {
        title: {
            type: String,
            required: true
        },
        errorCode: {
            required: true
        }
    }
};
</script>

<style>
.listName {
    font-size: 50px;
    font-weight: bold;
    color: var(--text-color);
    margin: 0;
    padding: 30px 0;
}

.errorMessage {
    font-size: 26px;
    font-weight: bold;
}

@media (max-width: 775px) {
    .listName {
        text-align: center;
    }
}
</style>
