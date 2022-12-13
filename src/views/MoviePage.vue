<template>
  <section>
    <div class="movie">
      <div class="movie__container container">
        <div class="movie__body">
          <div class="movie__item">
            <div class="movie__title">{{ movie.title}}</div>
            <div class="movie__poster">
              <img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" alt="Movie poster">
              <div class="movie__rating">{{ movie.vote_average.toFixed(1) }}</div>
            </div>
          </div>
          <div class="movie__info">
            <div class="movie__row">
              <div class="movie__production item">
                <h4>Production:</h4>
                <span>{{ movie.production_companies[0].name }}</span>
              </div>
              <div class="movie__budget item">
                <h4>Budget:</h4>
                <span>{{ movie.budget }} $</span>
              </div>
              <div class="movie__country item">
                <h4>Country:</h4>
                <span>{{ movie.production_countries[0].iso_3166_1 }}</span>
              </div>
            </div>
            <div class="movie__row">
              <div class="movie__year item"><h4>Year:</h4><span>{{ movie.release_date.replace(/-/gi, " ").split(' ').splice(0, 1).join(' ') }}</span></div>
              <div class="movie__genres">
                <h4>Genre:</h4>
                <div class="movie__genre" v-for="genre in genres" :key="genre">
                  <span>{{ genre.name }}</span>
                </div>
              </div>
            </div>
            <div class="movie__row">
              <div class="movie__status item">
                <h4>Status:</h4>
                <span>{{ movie.status}}</span>
              </div>
              <div class="movie__language item">
                <h4>Language:</h4>
                <span>{{ movie.original_language}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="movie__plot">
          <div class="movie__tagline">"{{ movie.tagline }}"</div>
          <div class="movie__overview">
            <h4>Overview</h4>
            <span>{{ movie.overview }}</span></div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="similar-movies">
      <div class="similar-movies__container container">
        <div class="similar-movies__body">
          <div class="similar-movies__title">
            Check out similar movies
          </div>
            <div class="similar-movies__list">
              <div class="similar-movies item-movie" v-for="similar in similarMovies" :key="similar.id">

              <router-link :to="`/movie/${similar.id}`" target="_blank">
                <div class="item-movie__body">
                  <div class="item-movie__poster">
                    <img :src="`https://image.tmdb.org/t/p/original${similar.poster_path}`" alt="Movie poster">
                    <div class="item-movie__rating">{{ similar.vote_average.toFixed(1) }}</div>
                  </div>
                </div>
                <div class="item-movie__title">{{ similar.title }}</div>
                <div class="item-movie__release-date">{{ similar.release_date.replace(/-/gi, " ").split(' ').splice(0, 1).join('')}}</div>
              </router-link>
              </div>
            </div>
          </div>
      </div>
    </div>
  </section>
</template>

<script>

import {ref, onBeforeMount} from 'vue';
import env from '@/env.js'
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const movie = ref({});
    const similarMovies = ref({});
    const route = useRoute();
    const genres = ref([]);

    const fetchSimilar = () => {
      axios.get(`https://api.themoviedb.org/3/movie/${route.params.id}/similar?api_key=${env.apikey}&append_to_response=${route.params.poster_path}`)
      .then(response => {
        similarMovies.value = response.data.results
        console.log(response.data.results);

      }).catch(e => {
        console.log(e)
        })

    }

    onBeforeMount(() => {
      axios.get(`https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${env.apikey}`)
      .then(response => {

        movie.value = response.data
        genres.value = movie.value.genres
        

        }).catch(e => {
        console.log(e)
        })
    })

    onBeforeMount(fetchSimilar)
    return {
      movie,
      route,
      genres,
      similarMovies,
      fetchSimilar,
    }
  }
}
</script>

<style lang="scss" scoped>
  h4 {
    color: #f7f7f7;
    margin-bottom: 10px;
  }
  span {
    color: #a2a7aa;
  }
  .item {
    display: flex;
    gap: 15px;
  }
  .movie {
    padding: 30px 0;
    // .movie__not-found
    &__not-found {
      font-size: 50px;
      span {
        color: #01df82;
      }
    }
		// .movie__body
		&__body {
      display: flex;
      align-items: center;
      gap: 30px;
      padding: 15px;
      background-color: #252425;
      border-radius: 15px;
      @media (max-width: 768px){
          flex-direction: column;
      }
      @media (max-width: 768px){
          flex-direction: column;
      }
    }
    &__item {
      display: flex;
      justify-content:center;
      flex-direction: column;
    }
		// .movie__title
		&__title {
      display: inline-flex;
      position: relative;
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 30px;
      letter-spacing: 2px;
      padding-left: 10px;
      word-break: break;
      @media (max-width: 425px){
          text-align: center;
          font-size: 24px;
      }
      &::before{
        content:'';
        position: absolute;
        // bottom: -5px;
        left: 0;
        height: 100%;
        width:  5px;
        background-color: #01df82;
      }
    }
		// .movie__poster
		&__poster {
      position: relative;
      // width: 100%;
      img {
        width: 250px;
        height: 100%;
        object-fit: contain;
        border-radius: 15px;
        @media (max-width: 768px){
          width: 100%;
        }
      }
    }
    // .item-movie__rating
		&__rating {
      position: absolute;
      bottom: 30px;
      left: 0px;
      padding: 15px;
      color: #f7fffc;
      background-color: rgba(75, 75, 75, 0.74);
      border-radius: 0px 15px 15px 0px;

    }
		// .movie__info
		&__info {
      display: grid;
      gap: 15px;
      grid-template-columns: 1fr 1fr 1fr;
      border-top: 1px solid #ccc;
      @media (max-width: 882px){
          grid-template-columns: 1fr 1fr;
      }
      @media (max-width: 480px){
          grid-template-columns: 1fr;
      }
    }
		// .movie__row
		&__row {
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 15px;
      @media (max-width: 882px){
        border-bottom: 1px solid #ccc;
      }
    
    }
		// .movie__production
		&__production {}
		// .movie__budget
		&__budget {}
		// .movie__genres
		&__genres {
    }
		// .movie__genre
		&__genre {
    }
		// .movie__tagline
		&__tagline {
      font-style: italic;
      margin-bottom: 15px;
    }
		// .movie__overview
		&__overview {
      h4 {
        position: relative;
        padding: 0px 15px;
        font-size: 24px;
        &::before{
          content:'';
          position: absolute;
          left: 0px;
          height: 100%;
          width: 5px;
          background: #01df82;
        }
      }
      span {
        font-size: 18px;
      }
    }
    // .movie__plot
    &__plot {
      margin-top: 30px;
    }
}

.similar-movies {
  margin-top: 50px;
  background: #1c1c1c;
		// .similar-movies__container
		&__container {}
		// .similar-movies__title
		&__title {
      font-size: 30px;
      font-weight: 700;
    }
		// .similar-movies__body
		&__body {
      padding: 50px 0;
    }
		// .similar-movies__list
		&__list {
      display: grid;
      gap: 15px;
      grid-template-columns: repeat(auto-fit,minmax(250px, 1fr));
    }
}
.container {
}
.movie {
		// .movie__item
		&__item {}
}
.item-movie {
		// .item-movie__body
		&__body {
      cursor: pointer;
      transition: all 0.3s ease 0s;     
      display: flex;
      flex-direction: column;
      justify-content:center;
      align-items: center;
   
    }
		// .item-movie__poster
		&__poster {
      width: 100%;
      position: relative;
      overflow: hidden;
      margin-bottom: 10px;
      @media (any-hover: hover){
        &:hover{
          img {
            transform: scale(1.1);
          }
        }
      }
      &::before{
        content:'';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
      }
      img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        transform: scale(1);
        transition: transform 0.8s ease 0s;
      }
    }
		// .item-movie__rating
		&__rating {
      position: absolute;
      bottom: 10px;
      left: 0px;
      padding: 15px;
      color: #f7fffc;
      background-color: rgba(75, 75, 75, 0.74);

    }
		// .item-movie__title
		&__title {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 10px;

    }
		// .item-movie__release-date
		&__release-date {
      font-size: 18px;
      font-weight: 500;
      color: #1976d2;
    }
}

</style>