<template>
  <div class="pa-2">
    <v-autocomplete clearable class="pa-4 w-25" chips label="Select a country" :items="countries" v-model="countryName"
      item-title="name" item-value="code" variant="solo"></v-autocomplete>
  </div>
  <div class=" pa-6">
    <VCalendar :attributes="computedAttributes" class="w-25 my-calendar" :active-date="activeDate" />
  </div>

  <v-btn @click="fetchPublicHolidays">Public Holidays</v-btn>
</template>
<script>
import axiosInstance from "../services/service.js";

export default {
  name: "Calendar",
  data() {
    return {
      countries: [],
      countryName: "",
      activeDate: new Date(),
      publicHolidays: [],
      attrs: [
        {
          key: "today",
          highlight: {
            backgroundColor: "#ff8080",
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
  computed: {
    computedAttributes() {
      return [...this.attrs, ...this.publicHolidays];
    },
  },
  methods: {
    selectCountry() {
      axiosInstance
        .get("AvailableCountries").then((response) => {
          this.countries = response.data.map((country) => ({
            name: country.name,
            code: country.countryCode,
          }));
        })
        .catch((error) => {
          console.log("Error from server:", error);
        });
    },
    fetchPublicHolidays() {
      axiosInstance
        .get("NextPublicHolidays/" + this.countryName).then((response) => {
          console.log("Response from server:", response.data);
          this.publicHolidays = response.data.map((holiday) => {
            return {
              key: holiday.date,
              highlight: {
                backgroundColor: "#ff8080",
                highlight: "red",
                color: "red"
              },
              dates: new Date(holiday.date),
              popover: {
                label: holiday.name,
              },
            };
          });
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
