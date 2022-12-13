<template>
   <footer class="footer">
    <div class="footer__container container">
      <div class="footer__body">
        <div class="footer__copyright">This app was made with The Movie Database (TMDB) API</div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
   name: 'my-footer'
}
</script>

<style lang="scss" scoped>
.footer {
   background-color: #0a0909;
		// .footer__container
		&__container {}
		// .footer__body
		&__body {
         height: 50px;
         display: flex;
         justify-content:center;
         align-items: center;
      }
		// .footer__copyright
		&__copyright {
       color: #b7b7b7;
      }
}
.container {
}

</style>