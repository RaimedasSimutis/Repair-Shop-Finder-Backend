const RepairShop = require('./repairShopModel.js')
const axios = require('axios');

const getAll = async (req, res) => {
    try {
        const city = req.params.city;
        const fetchedCity = await fetchCity(city)
        const fetch = await fetchRepairShopsList(fetchedCity.lat, fetchedCity.lng, 1500)
        res.json(fetch)
    } catch (err) {
        res.status(400).json(err);
    }
}

// const getMore = async (req, res) => {
//     const nextPageToken = req.params.nextPageToken

//     const fetchedResults = await fetchMoreResults {

//     }
// }

// const fetchMoreResults = async( )

const fetchCity = async (city) => {
    // console.log(city)
    return await (axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyBcx5kE2vlUnaAK0QQCIVbNuJ_Tj6vgosM`)
        .then(response => {
            // console.log(response.data.results[0].geometry.location.lat)
            // console.log(response.data.results[0].geometry.location.lng)
            return {
                lat: response.data.results[0].geometry.location.lat,
                lng: response.data.results[0].geometry.location.lng
            }
        })
        .catch(error => {
            console.log(error);
            })
    
    )
}

const fetchRepairShopsList = async (lat, lng, rad) => {
    //console.log(lat)
    const apiKey = 'AIzaSyBcx5kE2vlUnaAK0QQCIVbNuJ_Tj6vgosM'
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${rad}&type=car_repair&key=${apiKey}`;

    return await (axios.get(url)
        .then(response => {
            const responseArr = response.data.results;
            // let resultArr = []
            
            let resultArr =  responseArr.map( (element) => {
                // console.log(element.photos)

                let obj = { 
                    name: element.name,
                    adress: element.vicinity,
                    reviews: element.user_ratings_total,
                    rating: element.rating,
                    photoReference: element.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${element.photos[0].photo_reference}&key=AIzaSyBcx5kE2vlUnaAK0QQCIVbNuJ_Tj6vgosM`: ''
                }

                return obj
            })

            return {
                isAvailableNextPage: response.data.next_page_token ? true : false,
                results: resultArr
            }
        })
        .catch(error => {
        console.log(error);
        })
    )

}


module.exports = { getAll }