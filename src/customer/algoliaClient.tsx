import {liteClient as algoliasearch} from "algoliasearch/lite"

const algoliaId = __ALGOLIA_ID__ || "supersecret"
const algoliaSearchKey =
  __ALGOLIA_SEARCH_KEY__ || "supersecret"

export const algoliaClient = algoliasearch(algoliaId, algoliaSearchKey)
