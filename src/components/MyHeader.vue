<template>
    <div class="header">
      <div class="header__container container">
        <div class="header__body">
          <router-link to="/">
            <div class="header__logo">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M52 12.9819H12C9.8 12.9819 8 14.7819 8 16.9819V47.0179C8 49.2179 9.8 51.0179 12 51.0179H52C54.2 51.0179 56 49.2179 56 47.0179V16.9819C56 14.7819 54.2 12.9819 52 12.9819ZM28.204 20.7889L37.797 27.3389L28.204 33.8889V20.7889V20.7889ZM48.001 43.2119H26.875C26.305 44.4519 25.059 45.3169 23.605 45.3169C22.151 45.3169 20.906 44.4509 20.335 43.2119H16C15.171 43.2119 14.5 42.5399 14.5 41.7119C14.5 40.8839 15.171 40.2119 16 40.2119H20.336C20.906 38.9719 22.151 38.1059 23.606 38.1059C25.061 38.1059 26.306 38.9719 26.876 40.2119H48.002C48.83 40.2119 49.502 40.8839 49.502 41.7119C49.502 42.5399 48.829 43.2119 48.001 43.2119Z" fill="black"/>
                <path d="M23.605 43.1089C24.3765 43.1089 25.002 42.4835 25.002 41.7119C25.002 40.9404 24.3765 40.3149 23.605 40.3149C22.8335 40.3149 22.208 40.9404 22.208 41.7119C22.208 42.4835 22.8335 43.1089 23.605 43.1089Z" fill="black"/>
              </svg>
              Movie<span>Finder</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
export default {
   name: 'my-header',
}
</script>

<style lang="scss" scoped>
//Header========================================================================================================================================================
.header {
  height: 70px;
  background-color:#0e0d0d;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  &__container {
  }
  &__body {
    display: flex;
    align-items: center;
  }
  &__logo {
    display: flex;
    justify-content:center;
    align-items: center;
    color: #fff;
    letter-spacing: 2px;
    span {
      color: #1976d2;
      font-weight: 700;
    }
    path {
      fill: #02ffaf;
    }
  }
}

</style>