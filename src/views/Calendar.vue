<template>
    <div class="pa-2">
        <v-autocomplete clearable class="pa-4 w-25" chips label="Select a country" :items="countries" item-text="name"
            v-model="countryName" variant="solo-filled"></v-autocomplete>
    </div>
    <div>
        <VCalendar borderless :attributes="attrs" class="w-25 my-calendar" />
    </div>
    <h1>{{ countryName }}</h1>
</template>
  
<script>
import axiosInstance from "../services/service.js";

export default {
    name: "Calendar",
    data() {
        return {
            countries: [],
            countryName: "",
            attrs: [
                {
                    key: "today",
                    // dot: true,
                    // bar: true,
                    highlight: {
                        backgroundColor: "#ff8080",
                        content: "red",
                        highlight: "#E7F0FA5",

                        // popover: { ... },
                        // customData: { ... },
                    },
                    dates: new Date(),
                },
            ],
        };
    },

    mounted() {
        this.selectCountry();
    },

    methods: {
        selectCountry() {
            axiosInstance
                .get("AvailableCountries")
                .then((response) => {
                    console.log("Response from server:", response.data);
                    this.countries = response.data.map((country) => country.name);
                })
                .catch((error) => {
                    console.log("Error from server:", error);
                });
        },
    },
};
</script>
  
<style>
.my-calendar .vc-weekday-1,
.my-calendar .vc-weekday-7 {
    color: red;
}
</style>
  