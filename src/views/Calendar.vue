<template>
    <div class="pa-2">
        <v-autocomplete clearable class="pa-4 w-25" chips label="Select a country" :items="countries" item-text="name"
            variant="solo-filled"></v-autocomplete>
    </div>
    <div>
        <VCalendar borderless :attributes='attrs' class="w-25 my-calendar" />
    </div>
</template>
<script>
import axiosInstance from "../services/service.js";

export default {
    name: 'Calendar',

    data() {
        return {
            countries: [],
            attrs: [
                {
                    key: 'today',
                    highlight: {
                        backgroundColor: '#ff8080',
                        // Other properties are available too, like `height` & `borderRadius`
                    },
                    dates: new Date()
                }
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
.my-calendar .vc-weekday-1, .my-calendar .vc-weekday-7 {
  color: red;
}
</style>