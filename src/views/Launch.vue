<!-- Component displaying the details of a single launch -->
<template>
    <div class="launch">
        <ViewBody>
            <div class="details-container">
                <List
                    :listHead="listHead"
                    :listData="listData"
                    :hasButton="true"
                    :buttonText="buttonText"
                    id="list1"
                ></List>
            </div>
        </ViewBody>
    </div>
</template>

<script>
import ViewBody from "@/components/ViewBody.vue";
import List from "@/components/List.vue";

export default {
    name: "Launch",
    components: {
        ViewBody,
        List
    },
    data: function() {
        return {
            listData: [
                {
                    rowData: [
                        "GPS III SV04",
                        "T- 7D 12H 13M",
                        "Kennedy Space Center, FL, USA"
                    ],
                    rowLink: "/launches/123"
                },
                {
                    rowData: [
                        "GPS III SV04",
                        "T- 7D 12H 13M",
                        "Kennedy Space Center, FL, USA"
                    ],
                    rowLink: "/launches/124"
                },
                {
                    rowData: [
                        "GPS III SV04",
                        "T- 7D 12H 13M",
                        "Kennedy Space Center, FL, USA"
                    ],
                    rowLink: "/launches/125"
                },
                {
                    rowData: [
                        "GPS III SV04",
                        "T- 7D 12H 13M",
                        "Kennedy Space Center, FL, USA"
                    ],
                    rowLink: "/launches/126"
                }
            ],
            listHead: ["Mission name", "When", "Where", ""],
            buttonText: "Learn more"
        };
    }
};
</script>

<style>
.details-container {
    background-color: #fff;
    margin-top: 30px;
    padding: 40px;
}

#list1 {
    grid-template-columns: 1fr 160px 1fr 120px;
}
</style>
