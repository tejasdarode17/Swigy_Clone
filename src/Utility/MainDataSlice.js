import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const getApiData = createAsyncThunk("getApidata", async (_, { getState, rejectWithValue }) => {

    const state = getState();
    const { lat, long } = state.sideBar.coordinates

    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const carousalData = data?.data?.cards[0]?.card?.card?.imageGridCards?.info || [];
        const restaurentInfo = data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        const restaurentTitle = data?.data?.cards[1]?.card?.card?.header?.title || "";
        const onlineDeliveryTitle = data?.data?.cards[2]?.card?.card?.title || "";
        const swigyNotPresentData = data || {};

        return { carousalData, restaurentInfo, restaurentTitle, onlineDeliveryTitle, swigyNotPresentData };


    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
    }

})



const MainDataSlice = createSlice({
    name: mainData,
    initialState: {
        carousalData: [],
        restaurentInfo: [],
        restaurentTitle: "",
        onlineDeliveryTitle: [],
        loading: [],
        swigyNotPresentData: {}
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getApiData.fulfilled , (state ,action)=> {
            state.carousalData = action.payload.carousalData;
            state.restaurentTitle = action.payload.restaurentTitle;
            state.restaurentInfo = action.payload.restaurentInfo;
            state.onlineDeliveryTitle = action.payload.onlineDeliveryTitle;
            state.swigyNotPresentData = action.payload.swigyNotPresentData;
        }) 
    }

    
       
})