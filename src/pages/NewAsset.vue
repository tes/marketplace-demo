<script>
import { compact, flatten, get, groupBy, values, pick } from 'lodash'
import { mapState, mapGetters } from 'vuex'

import EventBus from 'src/utils/event-bus'
import { extractLocationDataFromPlace, isPlaceSearchEnabled } from 'src/utils/places'
import logger from 'src/utils/logger'

import BasicHeroLayout from 'src/layouts/BasicHeroLayout'

import CustomAttributesEditor from 'src/components/CustomAttributesEditor'
import SelectAssetType from 'src/components/SelectAssetType'
import SelectCategories from 'src/components/SelectCategories'

import PageComponentMixin from 'src/mixins/pageComponent'
import StripeMixin from 'src/mixins/stripe'

export default {
  components: {
    BasicHeroLayout,

    CustomAttributesEditor,
    SelectAssetType,
    SelectCategories,
  },
  mixins: [
    PageComponentMixin,
    StripeMixin,
  ],
  data () {
    return {
      name: '',
      nameMaxLength: 70,
      description: '',
      descriptionMaxLength: 2000,
      price: null,
      startDate: '',
      endDate: '',
      locations: [],
      isPlaceSearchEnabled,
      options: ['option1'],
      selectedCategory: null,
      editingAssetType: null,
      visibleStep: 1,
      requestAuthentication: false,
      editingCustomAttributes: {},
      assetImages: [],
      newUserImages: [], // to add to user images for reuse
      uploaderFiles: [],
      creatingAsset: false,
    }
  },
  computed: {
    defaultAssetType () {
      return this.defaultActiveAssetType
    },
    isAssetTypeReadonly () {
      return !!this.asset.asset.id
    },
    categoryRequired () {
      const categories = values(this.common.categoriesById)
      return !!categories.length
    },
    showCategory () { // could depend on some env variable or config
      return this.categoryRequired
    },
    assetTypeRequired () {
      const assetTypes = values(this.common.assetTypesById)
      return !!assetTypes.length
    },
    selectedAssetType () {
      if (!this.asset.asset.id) {
        if (this.editingAssetType) return this.editingAssetType
        else if (this.defaultAssetType) return this.defaultAssetType
        else return null
      } else {
        return this.common.assetTypesById[this.asset.asset.assetTypeId] || null
      }
    },
    editableCustomAttributeNames () {
      if (!this.selectedAssetType) return []

      const config = this.common.config
      const assetTypesConfig = get(config, 'stelace.instant.assetTypes')

      if (!assetTypesConfig) return []

      const assetTypeConfig = assetTypesConfig[this.selectedAssetType.id]
      if (!assetTypeConfig) return []

      return assetTypeConfig.customAttributes || []
    },
    customAttributes () {
      const attrs = this.common.customAttributesById
      const activeNames = this.editableCustomAttributeNames

      return values(attrs).filter((ca) => activeNames.includes(ca.name))
    },
    customAttributesByType () {
      const customAttributes = this.customAttributes // ensure Vue reactivity
      return groupBy(customAttributes, ca => ca.type)
    },
    assetTypes () {
      return values(this.common.assetTypesById)
    },
    showAvailabilityDates () {
      if (!this.selectedAssetType) return false

      return this.selectedAssetType.timeBased && !this.selectedAssetType.infiniteStock
    },
    locationName () {
      const locations = this.locations
      return get(locations, '[0].shortDisplayName', '')
    },
    priceLabel () {
      const defaultPriceLabel = this.$t({ id: 'pricing.price_label' })
      if (!this.selectedAssetType || !this.selectedAssetType.timeBased) return defaultPriceLabel

      const timeUnit = get(this.selectedAssetType, 'timing.timeUnit')
      return this.$t({ id: 'pricing.price_per_time_unit_label' }, { timeUnit })
    },
    step () {
      const steps = [
        true, // fictive step 0
        true,
        false,
        false,
        false,
      ]

      if (this.name.length >= 1) { // with high debounce to reduce distraction while typing
        steps[2] = true
      }

      const validCategory = this.selectedCategory && this.selectedCategory.name
      if ((!this.categoryRequired || validCategory) && !isNaN(parseInt(this.price))) {
        steps[3] = true
      }

      // Index of first falsy step
      return steps.indexOf(false) >= 0 ? steps.indexOf(false) - 1 : steps.length - 1
    },
    reusableImages () {
      return this.currentUser.id ? this.currentUser.images : []
    },
    ...mapState([
      'asset',
      'common',
      'content',
      'style',
    ]),
    ...mapGetters([
      'currentUser',
      'activeAssetTypes',
      'defaultActiveAssetType',
      'stripeActive',
    ]),
  },
  async preFetch ({ store }) {
    await store.dispatch('initEditAssetPage')
  },
  async mounted () {
    EventBus.$on('authStatusChanged', (status) => this.onAuthChange(status))
  },
  beforeDestroy () {
    EventBus.$off('authStatusChanged', (status) => this.onAuthChange(status))
  },
  methods: {
    afterAuth () {
      if (this.currentUser.id && this.currentUser.locations.length) {
        this.locations = [this.currentUser.locations[0]]
      }
    },
    changeCustomAttributes (customAttributes) {
      this.editingCustomAttributes = customAttributes
    },
    customAttributesOfTypes (types) {
      if (!Array.isArray(types)) return []
      return compact(flatten(types.map(t => this.customAttributesByType[t])))
    },
    selectAssetType (assetType) {
      this.editingAssetType = assetType
    },
    selectCategory (category) {
      this.selectedCategory = category
    },
    onAuthChange (status) {
      if (status === 'success' && this.requestAuthentication) {
        this.requestAuthentication = false

        this.createAsset()
      } else if (status === 'closed') {
        this.requestAuthentication = false
      }
    },
    filterCompleteFiles (files) {
      return files.filter(f => f.name && f.url)
    },
    uploaderFilesChanged (files) {
      this.uploaderFiles = files
      this.assetImages = this.filterCompleteFiles(files) // url can be undefined because upload is processing
    },
    removeImage (removed) {
      this.newUserImages = this.newUserImages.filter(img => img.name !== removed.name)
    },
    uploadCompleted ({ transformedUploadedFiles, uploadedOrReused }) {
      this.assetImages = uploadedOrReused
      this.newUserImages = transformedUploadedFiles

      if (this.creatingAsset) this.createAsset()
    },
    async createAsset () {
      if (!this.currentUser.id) {
        this.requestAuthentication = true
        this.openAuthDialog({ action: 'createAsset' })
        return
      }

      if (this.step === 3) {
        try {
          const attrs = {
            // autogrow on name QInput makes it a textarea, with possible line returns
            name: this.name.replace('\n', ''),
            assetTypeId: (this.selectedAssetType && this.selectedAssetType.id) || undefined, // `null` not allowed
            description: this.description,
            price: this.price,
            locations: this.locations,
            categoryId: this.selectedCategory ? this.selectedCategory.id : null,
            customAttributes: pick(this.editingCustomAttributes, this.editableCustomAttributeNames),
            active: true,
            validated: true,
          }

          if (this.content.currency) {
            attrs.currency = this.content.currency
          }

          const asset = await this.$store.dispatch('createAsset', { attrs })

          this.notifySuccess('notification.saved')
          // this.resetForm() // useful when not keeping the user on the current page

          const updateUserImages = !!this.newUserImages.length
          const updateUserLocations = !!(!this.currentUser.locations.length && asset.locations.length)
          const needUpdateUser = updateUserImages || updateUserLocations

          if (needUpdateUser) {
            const attrs = {}

            if (updateUserLocations) {
              attrs.locations = [asset.locations[0]]
            }

            try { // not awaiting this since it’s not critical
              this.$store.dispatch('updateUser', {
                userId: this.currentUser.id,
                attrs
              })
            } catch (e) {
              logger(e)
            }
          }

          this.creatingAsset = false

          // Show that the asset is ready…
          this.$router.push({ name: 'asset', params: { id: asset.id } })

          if (this.stripeActive) this.displayLinkStripeAccountMessage()
        } catch (err) {
          this.creatingAsset = false

          this.notifyWarning('error.unknown_happened_header')
        }
      }
    },
    /* resetForm () {
      this.name = ''
      this.description = ''
      this.price = null
      this.startDate = ''
      this.endDate = ''
      this.locations = []
      this.selectedCategory = null
      this.editingCustomAttributes = {}

      this.resetUploader()
    }, */
    selectStartDate (startDate) {
      this.startDate = startDate
    },
    selectEndDate (endDate) {
      this.endDate = endDate
    },
    forceEndDateAfterStartDate (date) {
      return new Date(date).toISOString() >= this.startDate
    },
    selectPlace (place) {
      this.locations = place ? [extractLocationDataFromPlace(place)] : []
    },
  }
}
</script>

<template>
  <BasicHeroLayout>
    <template #heroContent>
      <AppContent
        class="text-h4"
        tag="h1"
        entry="pages"
        field="new_asset.header"
      />
    </template>

    <section class="q-pa-sm">
      <form
        class="text-center stl-content-container stl-content-container--large margin-h-center q-mb-xl"
        @submit.prevent="createAsset"
      >
        <div class="step-1 q-py-lg">
          <div class="row justify-center">
            <QInput
              v-model="name"
              class="row-input"
              :label="$t({ id: 'asset.name_label' })"
              :counter="name.length > nameMaxLength / 2"
              :maxlength="nameMaxLength"
              :rules="[
                name => !!name ||
                  $t({ id: 'form.error.missing_title' })
              ]"
              debounce="500"
              autogrow
              required
            />
          </div>
          <div
            v-if="assetTypeRequired && activeAssetTypes.length > 1"
            class="q-mt-md row justify-center"
          >
            <SelectAssetType
              :initial-asset-type="selectedAssetType"
              :label="$t({ id: 'asset.asset_type_label' })"
              :show-search-icon="false"
              :rules="[
                selectedAssetType => assetTypeRequired
                  ? (!!selectedAssetType || $t({ id: 'form.error.missing_field' }))
                  : true
              ]"
              class="row-input -small"
              :readonly="isAssetTypeReadonly"
              bottom-slots
              @change="selectAssetType"
            />
          </div>
        </div>

        <transition enter-active-class="animated fadeInUp">
          <div
            v-if="step > 1"
            class="step-2 q-py-lg"
          >
            <div class="row justify-around">
              <div v-if="showCategory" class="flex-item--grow-shrink-auto q-pr-lg">
                <SelectCategories
                  :set-category="selectedCategory"
                  :label="$t({ id: 'asset.category_label' })"
                  :show-search-icon="false"
                  :rules="[
                    selectedCategory => categoryRequired
                      ? (!!selectedCategory || $t({ id: 'form.error.missing_field' }))
                      : true
                  ]"
                  bottom-slots
                  @change="selectCategory"
                />
              </div>
              <div :style="showCategory ? 'flex: 1 2 auto;' : ''">
                <AppInputNumber
                  v-model="price"
                  :label="priceLabel"
                  :rules="[
                    price => Number.isFinite(price) ||
                      $t({ id: 'form.error.missing_price' })
                  ]"
                  required
                  bottom-slots
                />
              </div>
            </div>
          </div>
        </transition>

        <transition enter-active-class="animated fadeInUp">
          <div
            v-if="step > 2"
            class="step-3 q-py-lg"
          >
            <div class="row justify-around">
              <div class="col-12 col-md-7">
                <QInput
                  v-model="description"
                  class="q-mb-md"
                  :label="$t({ id: 'asset.description_label' })"
                  :maxlength="descriptionMaxLength"
                  :counter="description.length > (descriptionMaxLength / 2)"
                  :rules="[
                    description => !!description ||
                      $t({ id: 'form.error.missing_description' })
                  ]"
                  :input-style="customAttributesByType['boolean']
                    ? `min-height: ${customAttributesByType['boolean'].length * 3}rem;` : ''"
                  type="textarea"
                  required
                />
              </div>
              <div
                v-if="customAttributesByType['boolean']"
                class="col-12 col-sm-6 col-md-5 q-pl-md"
              >
                <CustomAttributesEditor
                  :definitions="customAttributesByType['boolean']"
                  :values="editingCustomAttributes"
                  @change="changeCustomAttributes"
                />
              </div>
            </div>

            <div class="row q-py-lg justify-around">
              <CustomAttributesEditor
                :definitions="customAttributesOfTypes(['text', 'number'])"
                :values="editingCustomAttributes"
                class="col-12 col-sm-5"
                @change="changeCustomAttributes"
              />
              <CustomAttributesEditor
                :definitions="customAttributesByType['select']"
                :values="editingCustomAttributes"
                class="col-12 col-sm-5"
                @change="changeCustomAttributes"
              />
            </div>

            <div v-if="customAttributesByType['tags']" class="row q-py-lg justify-around">
              <CustomAttributesEditor
                :definitions="customAttributesByType['tags']"
                :values="editingCustomAttributes"
                class="col-12 col-sm-10"
                @change="changeCustomAttributes"
              />
            </div>

            <QBtn
              class="q-my-md text-weight-bold"
              :loading="creatingAsset"
              :label="$t( { id: 'prompt.create_button' })"
              :rounded="style.roundedTheme"
              :disabled="step < 3"
              color="secondary"
              size="lg"
              type="submit"
            />
          </div>
        </transition>
      </form>
    </section>
  </BasicHeroLayout>
</template>

<style lang="stylus" scoped>
.row-input
  flex: 1 0
  min-width: 0
  @media (min-width $breakpoint-sm-min)
    // Using flex-basis instead of max-width for IE11
    // https://github.com/philipwalton/flexbugs#flexbug-17
    flex: 0 0 30rem
  &.-small
    @media (min-width $breakpoint-sm-min)
      flex: 0 0 20rem
</style>
