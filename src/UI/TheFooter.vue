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
              rel="noopener" 
            >
              <div class="socials__wrap">
                <img
                  width="20"
                  height="20"
                  src="../assets/logo-facebook.svg"
                  alt="facebook logo"
                />
              </div>
            </a>
          </li>
          <li>
            <a
              class="socials__link"
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener" 
            >
              <div class="socials__wrap">
                <img
                  width="20"
                  height="20"
                  src="../assets/logo-twitter.svg"
                  alt="twitter logo"
                />
              </div>
            </a>
          </li>
          <li>
            <a
              class="socials__link"
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener" 
            >
              <div class="socials__wrap">
                <img
                  width="20"
                  height="20"
                  src="../assets/logo-youtube.svg"
                  alt="youtube logo"
                />
              </div>
            </a>
          </li>
          <li>
            <a
              class="socials__link"
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener" 
            >
              <div class="socials__wrap">
                <img
                  width="20"
                  height="20"
                  src="../assets/logo-instagram.svg"
                  alt="instagram logo"
                />
              </div>
            </a>
          </li>
          <li>
            <a
              class="socials__link"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener" 
            >
              <div class="socials__wrap">
                <img
                  width="20"
                  height="20"
                  src="../assets/logo-linkedin.svg"
                  alt="linkedin logo"
                />
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="sitemap">
        <ul>
          <li>
            <a href="#" class="sitemap__link sitemap__link--notActive"
              >About us</a
            >
          </li>
          <li>
            <a class="sitemap__link sitemap__link--notActive" href="#"
              >Careers</a
            >
          </li>
          <li>
            <router-link class="sitemap__link" to="/posts">Blog</router-link>
          </li>
          <li>
            <router-link class="sitemap__link" to="/auth">Account</router-link>
          </li>
          <li>
            <router-link class="sitemap__link" to="/contact"
              >Chat with us</router-link
            >
          </li>
          <li>
            <a class="sitemap__link sitemap__link--notActive" href="#">Help</a>
          </li>
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
      height: auto;
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

    &--notActive {
      color: #303030;
      cursor: not-allowed;

      &:hover {
        color: #303030;
      }
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
