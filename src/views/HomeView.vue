<template>
  <div class="home">
    <div class="home__container container">

      <div class="home__body">
        <div class="home__search search-home">
          <form class="search-home__form" @submit.prevent="searchMovies">
            <div class="search-home__item">
              <input class="search-home__input" type="text" name="" placeholder="search for movies..." v-model.trim="searchQuery"/>
              <button class="search-home__btn" type="submit">
                <svg width="24" height="24" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M448.3 424.7L335 311.3C355.8 285.3 368.3 252.2 368.3 216.2C368.3 132.1 300.2 64 216.3 64C132.3 64 64.3 132.2 64.3 216.2C64.3 300.2 132.4 368.4 216.3 368.4C252.5 368.4 285.7 355.7 311.8 334.6L425 448L448.3 424.7ZM120.1 312.6C94.4 286.9 80.3 252.7 80.3 216.3C80.3 179.9 94.5 145.7 120.1 120C145.7 94.3 180 80 216.3 80C252.6 80 286.8 94.2 312.5 119.9C338.2 145.6 352.3 179.8 352.3 216.2C352.3 252.6 338.1 286.8 312.5 312.5C286.8 338.2 252.6 352.4 216.3 352.4C180 352.5 145.8 338.3 120.1 312.6Z" fill="black"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="home__movies movies">
        <div class="movies__result" v-if="movies.length != 0 && isSearch">Search results - <span>{{ searchResultsQuery }}</span> ({{movies.length}} items)</div>
        <div class="movies__trending" v-if="isSearch != true"><span>Trending</span> movies today:</div>
          <div class="movies__body">
            <div class="movies__list">
              <div class="movie__item item-movie" v-for="movie in movies" :key="movie.id">

              <router-link :to="`/movie/${movie.id}`" target="_blank">
                <div class="item-movie__body">
                  <div class="item-movie__poster">
                    <img v-show="movie.poster_path" :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" alt="Movie poster">
                    <div class="item-movie__rating">{{ movie.vote_average.toFixed(1) }}</div>
                  </div>
                  <div class="item-movie__title">{{  movie.title }}</div>
                <div class="item-movie__release-date">{{ movie.release_date.replace(/-/gi, " ").split(' ').splice(0, 1).join('') }}</div>
                </div>
                
              </router-link>

              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';
import env from '@/env.js'
export default {

  setup() {
    const searchQuery = ref('');
    const movies = ref([]);
    const topMovies = ref([]);
    const searchResultsQuery = ref('');
    const isSearch = ref(false);
    
    const fetchMovies = () => {
      axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${env.apikey}`)
      .then(response => {
        movies.value = response.data.results;
      })
    }
    const searchMovies = () => {
      if(searchQuery.value != '') {
        axios.get(`${env.moviesearch}${env.apikey}&query=${searchQuery.value}`)
        .then(response => {

            movies.value = response.data.results;

            isSearch.value = true
            searchResultsQuery.value = searchQuery.value
            searchQuery.value = '';

          }).catch(e => {
            console.log(e)
          })
      }
        
    }

    onBeforeMount(fetchMovies)
    return {
      searchQuery,
      movies,
      topMovies,
      searchMovies,
      searchResultsQuery,
      fetchMovies,
      isSearch,
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
		// .home__container
		&__container {}
		// .home__body
		&__body {}
		// .home__search
		&__search {}
}
.container {
}
//search========================================================================================================================================================
.search-home {
  margin-top: 30px;
		// .search-home__form
		&__form {}
		// .search-home__item
		&__item {
      display: flex;
      justify-content:center;
      align-items: center;
    }
		// .search-home__input
		&__input {
      width: 100%;
      padding: 0px 15px;
      height: 50px;
      border-radius: 12px 0px 0px 12px;
      background-color: #363636;
      color: #f7fffc;
      transition: all 0.3s ease 0s;
      &::placeholder {
        color: #f7fffc;
      }
      &:focus {
        background-color: #4f4f4f;
      }
    }
		// .search-home__btn
		&__btn {
      cursor: pointer;
      height: 50px;
      padding: 0px 15px;
      background-color: #1976d2;
      border-radius: 0px 12px 12px 0px;
      transition: background-color 0.3s ease 0s;
      @media (any-hover: hover){
        &:hover{
          background-color: #1b7ee1;
        }
      }
      path {
        fill: #fff;
      }
    }
}
//movies========================================================================================================================================================
.movies {
  padding: 30px 0 60px 0;
		// .movies__body
		&__body {}
		// .movies__list
		&__list {
      display: grid;
      gap: 15px;
      grid-template-columns: repeat(auto-fit,minmax(250px, 1fr));
    }
    // .movies__result
    &__result {
    margin-bottom: 30px;
      span {
        color: #01df82;
      }
    }
    // .movies__trending
    &__trending {
      margin-bottom: 30px;
      span {
      color: #01df82;
      }
    }
}
.movie {
		// .movie__item
		&__item {
    
    }
}
.item-movie {
		// .item-movie__body
		&__body {
      cursor: pointer;
      min-height: 400px;
      min-width: 268px;
      transition: all 0.3s ease 0s;     
      display: flex;
      flex-direction: column;
      justify-content:center;
      align-items: center;
   
    }
		// .item-movie__poster
		&__poster {
      min-height: 400px;
      min-width: 268px;
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