<template lang="pug">
  .gallery(v-if="props.gallery")
    .gallery-title Gallery
    ul.gallery-list
      li.gallery-list-one(
        v-for="(photo,photoKey) in props.gallery"
        :key="`${photo.fields.title}`"
        )
          button.gallery-photo(
            :style="`background-image: url(${photo.fields.file.url});`"
            :title="photo.fields.title"
            @click="openGalleryDetail(photoKey)"
            )
    transition(name="fade")
      .gallery-dialog(v-if="state.isOpenGalleryDialog")
        hooper(ref="hooper" :initialSlide="state.initialSlide")
          slide(
            v-for="(photo,photoKey) in props.gallery"
            :key="`${photo.fields.title}`"
            )
            .container.hooper-slide-container
              .hooper-slide-contents
                .hooper-slide-photo(
                  :style="`background-image: url(${photo.fields.file.url});`"
                  :title="photo.fields.title"
                  )
                .hooper-slide-text
                  p.hooper-slide-text-title {{photo.fields.title}}
                  p.hooper-slide-text-description(v-if="photo.fields.description") {{photo.fields.description}}
          hooper-navigation(slot="hooper-addons")
          hooper-pagination(slot="hooper-addons")
        button.close-button(@click="closeGalleryDetail()") CLOSE
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'

import {
  Hooper,
  Slide,
  Navigation as HooperNavigation,
  Pagination as HooperPagination,
  // @ts-ignore
} from 'hooper'
import 'hooper/dist/hooper.css'

type State = {
  isOpenGalleryDialog: boolean
  initialSlide: number
}
type Props = {
  gallery: Array<any>
}

export default defineComponent({
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    HooperPagination,
  },
  props: {
    gallery: {
      type: Array,
      default: () => [],
    },
  },
  setup(props: Props) {
    const hooper = ref()
    const state = reactive<State>({
      isOpenGalleryDialog: false,
      initialSlide: 0,
    })

    const openGalleryDetail = (photoKey: number) => {
      state.initialSlide = photoKey
      state.isOpenGalleryDialog = true
    }
    const closeGalleryDetail = () => {
      state.isOpenGalleryDialog = false
    }

    return {
      hooper,
      state,
      props,
      openGalleryDetail,
      closeGalleryDetail,
    }
  },
})
</script>
<style lang="scss" scoped>
.gallery {
  padding-top: 48px;
}
.gallery-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  list-style: none;
}

$gallery-columns-num: 5;
.gallery-list-one {
  position: relative;
  width: calc(
    (100% - #{16px * ($gallery-columns-num - 1)}) / #{$gallery-columns-num}
  );
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba($theme-gray-dark-2, 0.3);
  // width:height = 1:1
  &::before {
    pointer-events: none;
    content: '';
    display: block;
    padding-top: 100%;
  }
}
.gallery-photo {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background-position: center;
  background-size: cover;
  transition: 0.2s ease-out;
  &:focus {
    transform: scale(1.05);
  }
}
.gallery-list-one:hover {
  .gallery-photo {
    transform: scale(1.05);
  }
}

.gallery-title {
  padding: 6px 2px;
}
.gallery-description {
  padding: 0 2px;
}

.gallery-dialog {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: rgba(#4e648a, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.hooper {
  width: 100%;
  height: 100%;
  position: relative;
}
.hooper-slide {
  width: 100% !important;
  height: 100%;
  padding: 32px 0 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hooper-slide-container {
  height: 100%;
  filter: drop-shadow(0 2px 10px rgba($theme-gray-dark-1, 0.3));
}
.hooper-slide-contents {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.hooper-slide-photo {
  display: block;
  flex-grow: 1;
  width: 100%;
  background-size: contain;
  background-position: center;
}
.hooper-slide-text {
  width: 100%;
  margin-top: 16px;
  padding: 16px 24px;
  background: rgba($theme-navy, 0.6);
  color: white;
  border-radius: 18px;
  &-title {
    font-size: 18px;
    font-weight: bold;
  }
  &-description {
    margin-top: 8px;
  }
}
.hooper-pagination {
  bottom: 32px;
}
.close-button {
  position: fixed;
  top: 16px;
  right: 16px;
  color: white;
  padding: 8px 16px;
  font-size: 20px;
  font-weight: bold;
  transition: 0.2s ease-out;
  border-radius: 8px;
  &:hover {
    color: saturate($theme-mint, 30%);
  }
}
</style>
<style lang="scss">
.hooper-pagination .hooper-indicator {
  width: 32px;
  height: 6px;
  transition: 0.2s ease-out;
  &:hover {
    background: saturate($theme-mint, 30%);
  }
  &.is-active {
    background: $theme-navy;
  }
}
.hooper-navigation {
  .icon {
    display: block;
    width: 48px;
    height: 48px;
    fill: $white;
    transition: 0.2s ease-out;
  }
  .hooper-prev,
  .hooper-next {
    margin: 0 16px;
    padding: 12px;
    border-radius: 50%;
    transition: 0.2s ease-out;
    &:hover {
      background: rgba($white, 0.8);
      .icon {
        fill: $theme-mint;
      }
    }
    &.is-disabled:hover {
      background: transparent;
      .icon {
        fill: $white;
      }
    }
  }
}
</style>
