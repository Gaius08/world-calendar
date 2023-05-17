<template>
    <div class="pa-2">
        <v-autocomplete clearable class="pa-4 w-25" chips label="Select a country" :items="countries" v-model="countryName"
            item-title="name" item-value="code" variant="solo"></v-autocomplete>
    </div>
    <div>
        <VCalendar borderless :attributes="attrs" class="w-25 my-calendar" :active-date="activeDate" />
    </div>
    <h1>{{ countryName }}</h1>
    <button @click="printCurrentYear">Print Current Year</button>
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
                    highlight: {
                        backgroundColor: "#ff8080",
                        content: "red",
                        highlight: "#E7F0FA5",
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
                    response.data.map((country) => (
                        this.countries.push({ name: country.name, code: country.countryCode })
                    ));
                    console.log("this.countries", this.countries)
                })
                .catch((error) => {
                    console.log("Error from server:", error);
                });
        },
        printCurrentYear() {
            const currentYear = new Date(this.activeDate).getFullYear();
            console.log(currentYear);
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