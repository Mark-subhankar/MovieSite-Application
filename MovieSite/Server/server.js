const express = require("express");
const redis = require("redis");
const Popular_Movie = require("./DummyData/Popular_Movie");
const Top_Movie = require("./DummyData/Top_Movies");
const MostPopularTvshow = require("./DummyData/MostPopularTvshow");
const UpcomingJapanMovie = require("./DummyData/Japan_upcoming_movie");
const UpcomingSouthKoreaMovie = require("./DummyData/SouthKorea_upcoming_movie");
const UpcomingChinaMovie = require("./DummyData/China_upcoming_movie");
const FranceUpcomingMovie = require("./DummyData/France_upcoming_movie");
const GermanyUpcomingMovie = require("./DummyData/Germany_upcoming_movie");
const SwitzerlandUpcomingMovies = require("./DummyData/Switzerland_upcoming_movie");
require("dotenv").config();

const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// create redis client to connect redis server
let redisClient;
(async () => {
  redisClient = redis.createClient({ url: process.env.REDIS_URL });
  redisClient.on("error", (e) => {
    console.log("error : ", e);
  });
  await redisClient.connect();
})();


// here - top250-movies , most-popular-movies , most-popular-tv
app.get("/getMoviesDetails/:category", async (req, res) => {

  // retrive params valus 
  let category = req.params.category;

  try {
    // get current year
    const year = new Date().getFullYear();

    // create key
    const cacheKey = `${category}:${year}`;

    // retrive key from redis
    const cachedData = await redisClient.get(cacheKey);

    // one year value
    const removeData = Number(process.env.CACHE_EXPIRE);

    // if key exist then fetch data from redis  -
    if (cachedData) {
      // return data
      return res.status(200).json({ data: JSON.parse(cachedData) });

      // else data fetch from an api request
    } else {
      // URL Details -
      const url = `https://${process.env.RAPIDAPI_HOST}/api/imdb/${category}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        },
      };

      // fecth data from an api
      const response = await fetch(url, options);

      // check request error ?
      if (!response.ok) {
        // if - top250-movies
        if (/top250-movies/i.test(category)) {
          // set data in redis
          await redisClient.set(cacheKey, JSON.stringify(Top_Movie));

          // remove from redis for 1 years
          await redisClient.setEx(
            cacheKey,
            removeData,
            JSON.stringify(Top_Movie)
          );

          // then return
          return res.status(200).json({
            data: Top_Movie,
          });

          // if - most-popular-movies
        } else if (/most-popular-movies/i.test(category)) {

          // redis store data
          await redisClient.set(cacheKey, JSON.stringify(Popular_Movie));

          // remove from redis for 1 year
          await redisClient.setEx(
            cacheKey,
            removeData,
            JSON.stringify(Popular_Movie)
          );

          // then return
          return res.status(200).json({
            data: Popular_Movie,
          });

          // if -  most-popular-tv
        } else if (/most-popular-tv/i.test(category)) {

          // data set in redis
          await redisClient.set(cacheKey, JSON.stringify(MostPopularTvshow));

          // remove from redis
          await redisClient.setEx(
            cacheKey,
            removeData,
            JSON.stringify(MostPopularTvshow)
          );

          // then return
          return res.status(200).json({
            data: MostPopularTvshow,
          });
        } else {
          // if error - show Top_Movie data
          // set data in redis
          await redisClient.set(cacheKey, JSON.stringify(Top_Movie));

          // remove from redis
          await redisClient.setEx(
            cacheKey,
            removeData,
            JSON.stringify(Top_Movie)
          );

          // then return
          return res.status(200).json({
            data: Top_Movie,
          });
        }
      }

      // convert data into json
      const data = await response.json();

      // new fetched data set into redis
      await redisClient.set(cacheKey, JSON.stringify(data));

      // remove from redis
      await redisClient.setEx(cacheKey, removeData, JSON.stringify(data));

      // return data as json
      return res.status(200).json({ data: data });
    }
  } catch (error) {
    // if err -  then show err in clg
    console.log("error occer : ", error);
    return res.status(500).json({ error: error.message });
  }
});

// here - upcoming movie
app.get("/getUpcomingMoviesDetails/:country", async (req, res) => {
  let country = req.params.country.toUpperCase();

  try {
    // get current year
    const year = new Date().getFullYear();

    // create key
    const cacheKey = `${country}:${year}`;

    // retrive key from redis
    const cachedData = await redisClient.get(cacheKey);

    // one year value
    const removeData = Number(process.env.CACHE_EXPIRE);

    // if key exist then fetch data from redis  -
    if (cachedData) {
      // return data
      return res.status(200).json({ data: JSON.parse(cachedData) });

      // else data fetch from an api request
    } else {
      // URL Details -
      const url = `https://${process.env.RAPIDAPI_HOST}/api/imdb/upcoming-releases?countryCode=${country}&type=MOVIE`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        },
      };

      // fecth data from an api
      const response = await fetch(url, options);

      // check request error ?
      if (!response.ok) {

        // if - japan-upcoming movies
        if (/JP/i.test(country)) {
          
          // set data in redis
          await redisClient.set(cacheKey, JSON.stringify(UpcomingJapanMovie));

          // remove from redis for 1 years
          await redisClient.setEx(
            cacheKey,
            removeData,
            JSON.stringify(UpcomingJapanMovie)
          );

          // then return
          return res.status(200).json({
            data: UpcomingJapanMovie,
          });

          // if - south korea upcoming movies
        } else if (/KR/i.test(country)) {
          // redis store data
          await redisClient.set(
            cacheKey,
            JSON.stringify(UpcomingSouthKoreaMovie)
          );

          // remove from redis for 1 year
          await redisClient.setEx(
            cacheKey,
            removeData,
            JSON.stringify(UpcomingSouthKoreaMovie)
          );

          // then return
          return res.status(200).json({
            data: UpcomingSouthKoreaMovie,
          });

          // if -  China upcoming movies
        } else if (/CN/i.test(country)) {
          // data set in redis
          await redisClient.set(cacheKey, JSON.stringify(UpcomingChinaMovie));

          // remove from redis
          await redisClient.setEx(
            cacheKey,
            removeData,
            JSON.stringify(UpcomingChinaMovie)
          );

          // then return
          return res.status(200).json({
            data: UpcomingChinaMovie,
          });
        }

        // france upcoming movie
        else if (/FR/i.test(country)) {
          // data set in redis
          await redisClient.set(cacheKey, JSON.stringify(FranceUpcomingMovie));

          // remove from redis
          await redisClient.setEx(
            cacheKey,
            removeData,
            JSON.stringify(FranceUpcomingMovie)
          );

          // then return
          return res.status(200).json({
            data: FranceUpcomingMovie,
          });
        }

        // Germany Upcoming movie
        else if (/DE/i.test(country)) {
          // data set in redis
          await redisClient.set(cacheKey, JSON.stringify(GermanyUpcomingMovie));

          // remove from redis
          await redisClient.setEx(
            cacheKey,
            removeData,
            JSON.stringify(GermanyUpcomingMovie)
          );

          // then return
          return res.status(200).json({
            data: GermanyUpcomingMovie,
          });
        }

        // Switzerland Upcoming movie
        else if (/CH/i.test(country)) {
          // data set in redis
          await redisClient.set(
            cacheKey,
            JSON.stringify(SwitzerlandUpcomingMovies)
          );

          // remove from redis
          await redisClient.setEx(
            cacheKey,
            removeData,
            JSON.stringify(SwitzerlandUpcomingMovies)
          );

          // then return
          return res.status(200).json({
            data: SwitzerlandUpcomingMovies,
          });
        } else {
          // if error - show Top_Movie data
          // set data in redis
          await redisClient.set(cacheKey, JSON.stringify(UpcomingChinaMovie));

          // remove from redis
          await redisClient.setEx(
            cacheKey,
            removeData,
            JSON.stringify(UpcomingChinaMovie)
          );

          // then return
          return res.status(200).json({
            data: UpcomingChinaMovie,
          });
        }
      }

      // convert data into json
      const data = await response.json();

      // new fetched data set into redis
      await redisClient.set(cacheKey, JSON.stringify(data));

      // remove from redis
      await redisClient.setEx(cacheKey, removeData, JSON.stringify(data));

      // return data as json
      return res.status(200).json({ data: data });
    }
  } catch (error) {
    // if err -  then show err in clg
    console.log("error occer : ", error);
    return res.status(500).json({ error: error.message });
  }
});


// http://localhost:3000/...url path - hit this api request inpostman
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});