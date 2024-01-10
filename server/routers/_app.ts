import {mountainurlmemosRouter} from 'server/routers/mt-url-memo/MountainUrlMemo.router';
import {areasRouter} from 'server/routers/Area.router';
import {postlikesRouter} from 'server/routers/PostLike.router';
import {hashtagsRouter} from 'server/routers/Hashtag.router';
import {usersRouter} from 'server/routers/user/User.router';
import {postbookmarksRouter} from 'server/routers/PostBookmark.router';
import {userfollowsRouter} from 'server/routers/UserFollow.router';
import {afterclimbmealsRouter} from 'server/routers/AfterClimbMeal.router';
import {afterclimbspasRouter} from 'server/routers/AfterClimbSpa.router';
import {mountaintomtfacilitiesRouter} from 'server/routers/mountain-to-mtFacility/MountainToMtFacility.router';
import {mountainsRouter} from 'server/routers/mountain/Mountain.router';
import {router} from '../trpc';
import {mapRouter} from './map/Map.router';
import {mtPhotosRouter} from './mt-photo/MountainToPhoto.router';
import {mountainTrailHeadsRouter} from './mt-to-trail-head/MountainToTrailhead.router';
import {searchPlaceRouter} from './search-place/SearchPlace.router';
import {mountainFeaturesRouter} from './mt-feature/MountainFeature.router';
import {mtFeatureRatingRouter} from './mountain-feature-rating/MountainFeatureRating.router';
import {mtThRatingRouter} from './mt-th-rating/MtThRating.router';
import {postsRouter} from './post/Post.router';
import {mtFacilitiesRouter} from './mt-facility/MtFacility.router';
import {trailheadRouteGroupsRouter} from './trailhead-route/TrailheadRouteGroup.router';
import {photosRouter} from './photo/Photo.router';
import {ratingHistoriesRouter} from './rating-history/RatingHistory.router';
import {trailheadsRouter} from './trailhead/Trailhead.router';
import {mtFacilityTypeRouter} from './mt-facility-type/MtFacilityType.router';
import {rsvMethodRouter} from './rsv-method/MtFacilityMethod.router';
import {payMethodRouter} from './pay-method/MtFacilityMethod.router';
import {mountainFeatureRouter} from './mountain-feature/MountainFeature.router';
import {userInfosRouter} from './user-info/UserInfo.router';
import {noticeRouter} from './Notice.router';

export const appRouter = router({
  mountains: mountainsRouter,
  mtFeature: mountainFeaturesRouter,
  mtPhotos: mtPhotosRouter,
  mtTrailHeads: mountainTrailHeadsRouter,
  trailheadRouteGroup: trailheadRouteGroupsRouter,
  trailhead: trailheadsRouter,
  mtToMtFacility: mountaintomtfacilitiesRouter,
  mtFacilities: mtFacilitiesRouter,
  mtFacilityType: mtFacilityTypeRouter,
  rsvMethod: rsvMethodRouter,
  payMethod: payMethodRouter,
  mtUrlMemo: mountainurlmemosRouter,
  map: mapRouter,
  searchPlace: searchPlaceRouter,
  mtFeatureRating: mtFeatureRatingRouter,
  mtThRating: mtThRatingRouter,
  post: postsRouter,
  area: areasRouter,
  notice: noticeRouter,
  postLike: postlikesRouter,
  postBookmark: postbookmarksRouter,
  photo: photosRouter,
  hashTag: hashtagsRouter,
  user: usersRouter,
  userInfo: userInfosRouter,
  userFollow: userfollowsRouter,
  ratingHistory: ratingHistoriesRouter,
  afterClimbMeal: afterclimbmealsRouter,
  afterClimbSpa: afterclimbspasRouter,
  mountainFeature: mountainFeatureRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
