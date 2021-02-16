<template>
  <header>
    <nav class="nav">
      <div class="nav__info">
        <a class="nav__link nav__link--active" href="#">Chat with us</a>
        <p class="nav__contact">+420 336 775 664</p>
        <p class="nav__contact">info@fresnesecom.com</p>
      </div>
      <div class="nav__links">
        <a href="#" class="nav__link nav__link--active">Blog</a>
        <a href="#" class="nav__link nav__link--active">About Us</a>
        <a href="#" class="nav__link nav__link--active">Careers</a>
      </div>
    </nav>
    <div class="head">
      <div class="head__logo">Freshnesecom</div>
      <div class="head__categories">
        <label class="head__label head__label--select" for="select">
          <select id="select">
            <option value="value1"> 1</option>
            <option value="value2" selected>All categories</option>
            <option value="value3">3</option>
          </select>
        </label>

        <label class="head__label">
          <input type="text" placeholder="Search Products,categories&hellip;" />
          <div class="head__search">
            <img src="../assets/search-outline.svg" alt="" />
          </div>
        </label>
      </div>
      <div class="head__icons">
        <div class="head__icon">
          <img src="../assets/person-outline.svg" alt="person icon" />
        </div>
        <div class="head__icon head__icon--count">
          <div class="head__count">0</div>
          <img src="../assets/basket-outline.svg" alt="basket icon" />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
header {
  width: 100vw;
  height: 100px;

  display: grid;
  place-content: center;
  grid-template-columns: 1fr;
}

.head {
  width: 100%;
  display: flex;
  justify-content: space-between;

  background-color: #fff;

  padding: 1.5rem 3rem;

  &__categories {
    background: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    border: 1px solid #d1d1d1;
    padding: 0 0.5rem;
    width: min-content;
    & input,
    & select {
      border: none;
      background-color: inherit;
      outline: none;
    }

    & input::placeholder {
      font-family: "Open Sans";
      font-size: 14px;
      line-height: 19px;
      font-weight: 400;
      color: #a9a9a9;
    }

    & input {
      padding: 0.4rem 0 0.4rem 0.4rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: 16.3rem;
      width: clamp(11rem, 20vw, 16.3rem);
      font-size: 14px;
    }

    & select {
      font-weight: 700;
      font-family: inherit;
      //   appearance: none;
      font-size: 15px;
      line-height: 22.5px;
      color: #151515;
      padding: 0 1rem 0 0;
    }
  }

  &__icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__count {
    position: absolute;
    width: 16px;
    height: 16px;
    font-size: 12px;
    line-height: 18px;
    font-weight: 600;
    background-color: #e6704b;
    color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    box-shadow: 0px 2px 3px #d1d1d1;
    bottom: 1px;
    left: 3px;
  }

  &__icon {
    width: 40px;
    height: 40px;
    transition: all 0.5s ease;
    border-radius: 8px;

    &--count {
      position: relative;
    }

    &:hover {
      cursor: pointer;
      background-color: #f5f5f5;
    }

    &:first-child {
      margin-right: 1rem;
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      padding: 0.5rem;
    }
  }

  &__logo {
    font-weight: bold;
    font-size: 1.7rem;
    cursor: pointer;
  }

  &__search {
    width: 16px;
    height: 16px;
    margin-bottom: 0.2rem;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & label {
    height: 100%;
  }

  &__label {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__label--select {
    position: relative;
    padding: 0 0.4rem 0 0.4rem;
    // &:after {
    //   content: "";
    //   position: absolute;
    //   right: 0.8rem;
    //   width: 0.8em;
    //   height: 0.5em;
    //   background-color: green;
    //   clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    // }

    &:before {
      content: "";
      width: 1px;
      height: 20px;
      background-color: #d1d1d1;
      position: absolute;
      right: 0rem;
    }
  }
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 3rem;
  /* padding: 1rem 3rem; */
  padding-top: 4rem;
  padding-bottom: 1rem;
  overflow: hidden;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: calc(100vw - 6rem);
    height: 1px;
    background: #151515;
    opacity: 0.05;
    bottom: 0;
  }

  &__info,
  &__links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  &__contact,
  &__link {
    font-family: "Open Sans";
    font-size: 0.9rem;
    line-height: 16px;
    font-weight: 400;
  }

  &__link {
    text-decoration: none;
    color: #46760a;
    transition: all 0.5s ease;

    &:hover {
      color: #c8deb3;
    }

    &--active {
    }
  }
}

@media (max-width: 799px) {
  .nav {
    padding: 6rem 0 1rem 0;
    display: grid;
    place-content: center;
    place-items: center;

    &:after {
      width: 100%;
    }
    &__info {
      display: none;
    }
  }

  .head {
    display: grid;
    grid-template-columns: 1fr 9rem;
    grid-row-gap: 1rem;

    &__logo {
      grid-column: 1/3;
    }

    &__icons {
      justify-content: flex-end;
    }

    &__categories {
      & input {
        width: clamp(11rem, 35vw, 16.3rem);
      }
    }
  }
}

@media (max-width: 549px) {
  .head {
    &__logo {
      grid-column: 1/2;
      justify-self: start;
    }
    &__icons {
      grid-row: 1/1;
      grid-column: 2/3;
    }
    &__categories {
      grid-column: 1/3;
      justify-self: center;
      padding: 0.2rem 0.5rem;
      & input {
        width: clamp(11rem, 40vw, 16.3rem);
      }
    }
  }
}

@media (max-width: 399px) {
  .head {
    grid-template-columns: 1fr 7rem;
    &__logo {
      font-size: 1.5rem;
    }
    &__icons {
    }
    &__icon {
      width: 35px;
      height: 35px;

      &:first-child {
        margin-right: 0.5rem;
      }
    }
    &__count {
      width: 13px;
      height: 13px;
      bottom: 2px;
      left: 5px;
    }

    &__categories {
      & input {
        width: clamp(5rem, 30vw, 16.3rem);
        padding: 0 0.5rem;
      }
    }
  }
}
</style>
