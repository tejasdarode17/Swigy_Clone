import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const getCities = createAsyncThunk("getCities", async (value) => {

    try {

        const response = await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${value}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = response.json()
        return data.data || [];

    } catch (error) {
        console.log(error);
    }
})


export const getCoordinates = createAsyncThunk("getCoordinates", async (id) => {

    try {
        const response = await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }


        const data = await response.json();

        const newCooredinates = {
            lat: data?.data?.[0]?.geometry?.location?.lat,
            long: data?.data?.[0]?.geometry?.location?.lng
        }

        const newAddres = data?.data[0]?.formatted_address || ""

        localStorage.setItem("address", JSON.stringify(newAddres));
        localStorage.setItem("co-ordinates", JSON.stringify(newCooredinates));

        localStorage.removeItem("dishes");
        localStorage.removeItem("SearchedRestaurents");


        return {coordinates : newCooredinates , addres : newAddres}


    } catch (error) {
        console.log(error);
    }
})



const SideBarSlice = createSlice({
    name: "sideBar",
    initialState: {
        cities: [],
        coordinates: JSON.parse(localStorage.getItem("co-ordinates")) || { lat: 18.52110, long: 73.85020 },
        addres: JSON.parse(localStorage.getItem("address")) || "Pune",
        citiSideBarvisible : false
    },
    reducers : {
        handleClick : (state) => {
            state.citiSideBarvisible = !state.citiSideBarvisible
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getCities.fulfilled, (state, action) => {
            state.cities = action.payload
        }),
        builder.addCase(getCoordinates.fulfilled , (state , action)=> {
            state.coordinates = action.payload.coordinates
            state.addres = action.payload.addres
        })
    }
})


export const {handleClick} = SideBarSlice.actions;
export default SideBarSlice.reducer;


