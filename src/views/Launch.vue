<!-- Component displaying the details of a single launch -->
<template>
    <div class="launch">
        <ViewBody>
            <div class="details-container">
                <HeaderSection
                    :header="headerData"
                    class="topSection"
                ></HeaderSection>

                <DetailsSection :detailsData="details"></DetailsSection>

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
import HeaderSection from "@/components/HeaderSection.vue";
import DetailsSection from "@/components/DetailsSection.vue";
import List from "@/components/List.vue";

export default {
    name: "Launch",
    components: {
        ViewBody,
        HeaderSection,
        DetailsSection,
        List
    },
    data: function() {
        return {
            /* Header data */
            headerData: {
                imageSource:
                    "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/falcon25209_image_20190224025007.jpeg",
                title: "Falcon 9 Block 5",
                subTitle: "SpaceX",
                description:
                    "Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit. The Block 5 variant is the fifth major interval aimed at improving upon the ability for rapid reusability.",
                buttonUrl: "/agency/123",
                buttonText: "Learn more about SpaceX"
            },

            details: [
                { rowData: ["Launch provider:", "SpaceX"] },
                { rowData: ["Rocket:", "Falcon 9 Block 5"] },
                { rowData: ["Location:", "Kennedy Space Center, FL, USA"] },
                { rowData: ["Pad:", "Launch Complex 39A"] },
                { rowData: ["Target:", "Low Earth Orbit"] },
                { rowData: ["Mission type:", "Communications"] },
                { rowData: ["Window start:", "2020-10-03T12:34:00Z"] },
                { rowData: ["Window end:", "2020-10-03T12:34:00Z"] }
            ],

            /* List data */
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
