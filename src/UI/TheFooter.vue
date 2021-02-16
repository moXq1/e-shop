<template>
  <footer>
    <div class="container">
      <div class="socials">
        <ul>
          <li>
            <a
              class="socials__link"
              href="https://www.facebook.com"
              target="_blank"
            >
              <div class="socials__wrap">
                <img src="../assets/logo-facebook.svg" alt="facebook logo" />
              </div>
            </a>
          </li>
          <li>
            <a
              class="socials__link"
              href="https://www.twitter.com"
              target="_blank"
            >
              <div class="socials__wrap">
                <img src="../assets/logo-twitter.svg" alt="twitter logo" />
              </div>
            </a>
          </li>
          <li>
            <a
              class="socials__link"
              href="https://www.youtube.com"
              target="_blank"
            >
              <div class="socials__wrap">
                <img src="../assets/logo-youtube.svg" alt="youtube logo" />
              </div>
            </a>
          </li>
          <li>
            <a
              class="socials__link"
              href="https://www.instagram.com"
              target="_blank"
            >
              <div class="socials__wrap">
                <img src="../assets/logo-instagram.svg" alt="instagram logo" />
              </div>
            </a>
          </li>
          <li>
            <a
              class="socials__link"
              href="https://www.linkedin.com/"
              target="_blank"
            >
              <div class="socials__wrap">
                <img src="../assets/logo-linkedin.svg" alt="linkedin logo" />
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="sitemap">
        <ul>
          <li>
            <a href="#" class="sitemap__link">About us</a>
          </li>
          <li><a class="sitemap__link" href="#">Careers</a></li>
          <li><a class="sitemap__link" href="#">Blog</a></li>
          <li><a class="sitemap__link" href="#">Account</a></li>
          <li><a class="sitemap__link" href="#">Chat with us</a></li>
          <li><a class="sitemap__link" href="#">Help</a></li>
        </ul>
      </div>
      <div class="copyright">
        <span>Copyright@ {{ new Date().getFullYear() }} Freshnesecom</span>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.container {
  padding-top: 4rem;
}

.socials {
  & ul {
    list-style: none;
    display: flex;
    padding-top: 24px;
    padding-bottom: 40px;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  &__wrap {
    width: 34px;
    height: 34px;
  }

  &__link {
    cursor: pointer;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: invert(52%) sepia(26%) saturate(807%) hue-rotate(47deg)
        brightness(98%) contrast(96%);
      transition: all 0.5s ease;

      &:hover {
        filter: invert(90%) sepia(16%) saturate(408%) hue-rotate(46deg)
          brightness(95%) contrast(90%);
      }
    }
  }
}

.sitemap {
  & ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  &__link {
    font-family: "Open-Sans";
    font-size: 1rem;
    line-height: 16px;
    font-weight: 400;
    text-decoration: none;
    color: #46760a;
    transition: all 0.5s ease;

    &:hover {
      color: #c8deb3;
    }
  }
}

.copyright {
  padding: 2rem 0;

  font-family: "Open Sans";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
}
</style>
