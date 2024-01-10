-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('PHOTO', 'VIDEO');

-- CreateEnum
CREATE TYPE "MethodToThType" AS ENUM ('walk', 'publicTransport');

-- CreateEnum
CREATE TYPE "SegmentType" AS ENUM ('start', 'middle', 'end');

-- CreateEnum
CREATE TYPE "MethodType" AS ENUM ('bus', 'train', 'taxi', 'walk');

-- CreateEnum
CREATE TYPE "TrailheadRouteGroupType" AS ENUM ('myCar', 'publicTransport');

-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "nameKana" TEXT NOT NULL,
    "remark" TEXT,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AfterClimbMeal" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "areaId" INTEGER,
    "mtId" INTEGER,
    "trailheadId" INTEGER,
    "name" TEXT NOT NULL,
    "nameKana" TEXT,
    "mtArea" TEXT,
    "postalCode" INTEGER,
    "prefecture" TEXT,
    "address1" TEXT,
    "address2" TEXT,
    "address3" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "remark" TEXT,
    "url" TEXT,

    CONSTRAINT "AfterClimbMeal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AfterClimbSpa" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "areaId" INTEGER,
    "mtId" INTEGER,
    "trailheadId" INTEGER,
    "name" TEXT NOT NULL,
    "nameKana" TEXT,
    "mtArea" TEXT,
    "postalCode" INTEGER,
    "prefecture" TEXT,
    "address1" TEXT,
    "address2" TEXT,
    "address3" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "remark" TEXT,
    "url" TEXT,

    CONSTRAINT "AfterClimbSpa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mountain" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "areaId" INTEGER,
    "name" TEXT NOT NULL,
    "nameKana" TEXT NOT NULL,
    "postalCode" INTEGER,
    "prefecture" TEXT,
    "address1" TEXT,
    "address2" TEXT,
    "address3" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "hyakumeizanStatus" BOOLEAN,
    "elevation" INTEGER,
    "appealPoint" TEXT,
    "description" TEXT,

    CONSTRAINT "Mountain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MountainFeature" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "mountainId" INTEGER NOT NULL,
    "seaOfCloudsRating" DOUBLE PRECISION,
    "seaOfCloudsRemark" TEXT,
    "starrySkyRating" DOUBLE PRECISION,
    "starrySkyRemark" TEXT,
    "ptarmiganRating" DOUBLE PRECISION,
    "ptarmiganRemark" TEXT,
    "sunriseRating" DOUBLE PRECISION,
    "sunriseRemark" TEXT,
    "sunsetRating" DOUBLE PRECISION,
    "sunsetRemark" TEXT,
    "widthPeakRating" DOUBLE PRECISION,
    "widthPeakRemark" TEXT,
    "trailViewRating" DOUBLE PRECISION,
    "trailViewRemark" TEXT,
    "remark" TEXT,

    CONSTRAINT "MountainFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MountainFeatureRatingHistory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "mountainFeatureId" INTEGER NOT NULL,
    "featureName" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MountainFeatureRatingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MtFacilityToPhoto" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "indoor" BOOLEAN NOT NULL DEFAULT false,
    "outdoor" BOOLEAN NOT NULL DEFAULT false,
    "mtFacilityId" INTEGER NOT NULL,
    "photoId" INTEGER NOT NULL,

    CONSTRAINT "MtFacilityToPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MountainToPhoto" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "labelTop" INTEGER,
    "labelLeft" INTEGER,
    "mountainId" INTEGER NOT NULL,
    "photoId" INTEGER NOT NULL,
    "viewTo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MountainToPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrailheadToPhoto" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "trailheadId" INTEGER NOT NULL,
    "photoId" INTEGER NOT NULL,

    CONSTRAINT "TrailheadToPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "type" "MediaType" NOT NULL DEFAULT 'PHOTO',
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "original" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "remark" TEXT,
    "postId" INTEGER,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MountainToTrailhead" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "mountainId" INTEGER NOT NULL,
    "trailheadId" INTEGER NOT NULL,
    "uphillTime" INTEGER,
    "uphillDistance" INTEGER,
    "downhillTime" INTEGER,
    "downhillDistance" INTEGER,
    "upDownTime" INTEGER,
    "upDownDistance" INTEGER,
    "remark" TEXT,

    CONSTRAINT "MountainToTrailhead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrailheadToMtFacility" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "mtFacilityId" INTEGER NOT NULL,
    "trailheadId" INTEGER NOT NULL,
    "timeTo" INTEGER,
    "distanceTo" INTEGER,
    "timeFrom" INTEGER,
    "distanceFrom" INTEGER,
    "remark" TEXT,

    CONSTRAINT "TrailheadToMtFacility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trailhead" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "areaId" INTEGER,
    "name" TEXT NOT NULL,
    "nameKana" TEXT NOT NULL,
    "intro" TEXT,
    "elevation" INTEGER,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "postalCode" INTEGER,
    "prefecture" TEXT,
    "address1" TEXT,
    "address2" TEXT,
    "address3" TEXT,
    "lastConbiniName" TEXT,
    "lastConbiniNameKana" TEXT,
    "lastConbiniLat" DOUBLE PRECISION,
    "lastConbiniLng" DOUBLE PRECISION,
    "popularRating" DOUBLE PRECISION,
    "hpRating" DOUBLE PRECISION,
    "myCarReg" INTEGER,
    "intensity" INTEGER,
    "view" INTEGER,
    "toilet" INTEGER,
    "vendingMachine" INTEGER,
    "store" INTEGER,
    "remark" TEXT,
    "roadblockInfo" TEXT,
    "roadblockStart" TIMESTAMP(3),
    "roadblockEnd" TIMESTAMP(3),

    CONSTRAINT "Trailhead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrailheadRating" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "trailheadId" INTEGER NOT NULL,
    "featureType" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TrailheadRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrailheadRatingHistory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "trailheadId" INTEGER NOT NULL,
    "featureType" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TrailheadRatingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RatingHistory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "trailheadId" INTEGER,
    "mtId" INTEGER,
    "mtFacilityId" INTEGER,
    "userId" TEXT,
    "userUuid" TEXT,
    "idName" TEXT,
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RatingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parking" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "trailheadId" INTEGER NOT NULL,
    "fromMethod" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameKana" TEXT NOT NULL,
    "postalCode" INTEGER,
    "prefecture" TEXT,
    "address1" TEXT,
    "address2" TEXT,
    "address3" TEXT,
    "mapLink" TEXT,
    "methodToTh" "MethodToThType",
    "timeToTrailhead" INTEGER,
    "distanceToTrailhead" INTEGER,
    "feeToTrailhead" INTEGER,
    "capacity" INTEGER,
    "dirtRoad" BOOLEAN,
    "feeFree" BOOLEAN,
    "feeStr" TEXT,
    "notes" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,

    CONSTRAINT "Parking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrailheadRouteGroup" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "type" "TrailheadRouteGroupType" NOT NULL,
    "trailheadId" INTEGER NOT NULL,
    "remark" TEXT,

    CONSTRAINT "TrailheadRouteGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrailheadRoute" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SegmentType" NOT NULL,
    "time" INTEGER,
    "methodType" "MethodType",
    "methodName" TEXT,
    "payment" INTEGER,
    "order" INTEGER NOT NULL,
    "routeGroupId" INTEGER NOT NULL,
    "url" TEXT,

    CONSTRAINT "TrailheadRoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MountainToMtFacility" (
    "mountainId" INTEGER NOT NULL,
    "mtFacilityId" INTEGER NOT NULL,
    "timeTo" INTEGER,
    "distanceTo" INTEGER,
    "timeFrom" INTEGER,
    "distanceFrom" INTEGER,
    "remark" TEXT,

    CONSTRAINT "MountainToMtFacility_pkey" PRIMARY KEY ("mountainId","mtFacilityId")
);

-- CreateTable
CREATE TABLE "MtFacilityType" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "nameKana" TEXT,
    "remark" TEXT,

    CONSTRAINT "MtFacilityType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MtFacilityToMtFacilityType" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "mtFacilityId" INTEGER NOT NULL,
    "mtFacilityTypeId" INTEGER NOT NULL,

    CONSTRAINT "MtFacilityToMtFacilityType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MtFacility" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "nameKana" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "postalCode" INTEGER,
    "prefecture" TEXT,
    "address1" TEXT,
    "address2" TEXT,
    "address3" TEXT,
    "areaId" INTEGER,
    "docomo" INTEGER,
    "au" INTEGER,
    "softbank" INTEGER,
    "rakuten" INTEGER,
    "remark" TEXT,
    "inTFlag" INTEGER,
    "inTCleanRating" DOUBLE PRECISION,
    "inTRemark" TEXT,
    "outTFlag" INTEGER,
    "outTCleanRating" DOUBLE PRECISION,
    "outTRemark" TEXT,
    "bathSinkFlag" INTEGER,
    "bathSinkCleanRating" DOUBLE PRECISION,
    "bathSinkRemark" TEXT,
    "talkRoomFlag" INTEGER,
    "talkRoomCleanRating" DOUBLE PRECISION,
    "talkRoomRemark" TEXT,
    "dryRoomFlag" INTEGER,
    "dryRoomCleanRating" DOUBLE PRECISION,
    "dryRoomRemark" TEXT,
    "cafeSpaceRoomFlag" INTEGER,
    "cafeSpaceRoomCleanRating" DOUBLE PRECISION,
    "cafeSpaceRoomRemark" TEXT,
    "bashRoomFlag" INTEGER,
    "bashRoomCleanRating" DOUBLE PRECISION,
    "bashRoomRemark" TEXT,
    "listTimeRemark" TEXT,
    "listCapacityTent" INTEGER,
    "listCapacityHut" INTEGER,
    "listFeeTent" INTEGER,
    "listFeeHut" INTEGER,
    "listFeeHut2" INTEGER,
    "listTelOffice" TEXT,
    "listTelLocal" TEXT,
    "listHp" TEXT,
    "listElevation" INTEGER,
    "listConnectionRemark" TEXT,
    "tStay" INTEGER,
    "tCafeSpace" INTEGER,
    "tTent" INTEGER,
    "tShop" INTEGER,
    "tToilet" INTEGER,
    "tBathSink" INTEGER,
    "tChangingRoom" INTEGER,
    "tDryRoom" INTEGER,
    "tBath" INTEGER,
    "tWave" INTEGER,
    "tWifi" INTEGER,
    "tPublicPhone" INTEGER,
    "tKitchen" INTEGER,
    "tTalkRoom" INTEGER,
    "tOther" INTEGER,

    CONSTRAINT "MtFacility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RsvMethod" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,

    CONSTRAINT "RsvMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MtFacilityToRsvMethod" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "mtFacilityId" INTEGER NOT NULL,
    "rsvMethodId" INTEGER NOT NULL,

    CONSTRAINT "MtFacilityToRsvMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayMethod" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,

    CONSTRAINT "PayMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MtFacilityToPayMethod" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "mtFacilityId" INTEGER NOT NULL,
    "payMethodId" INTEGER NOT NULL,

    CONSTRAINT "MtFacilityToPayMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessPeriod" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "mtFacilityId" INTEGER NOT NULL,
    "year" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessPeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MountainUrlMemo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "mountainId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "remark" TEXT,

    CONSTRAINT "MountainUrlMemo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteResult" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "startSearchWord" TEXT,
    "endSearchWord" TEXT,
    "routeResult" JSONB NOT NULL,
    "startAddress" TEXT,
    "startLocationLat" DOUBLE PRECISION,
    "startLocationLng" DOUBLE PRECISION,
    "endAddress" TEXT,
    "endLocationLat" DOUBLE PRECISION,
    "endLocationLng" DOUBLE PRECISION,
    "distanceText" TEXT,
    "distanceValue" INTEGER,
    "durationText" TEXT,
    "durationValue" INTEGER,
    "remark" TEXT,

    CONSTRAINT "RouteResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "parentId" INTEGER,
    "userId" TEXT NOT NULL,
    "mtId" INTEGER,
    "mtFacilityId" INTEGER,
    "mtTrailheadId" INTEGER,
    "content" TEXT NOT NULL,
    "activityDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostBookmark" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "postId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PostBookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "userName" TEXT,
    "iconOriginal" TEXT,
    "iconThumbnail" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInfo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "startPointLat" DOUBLE PRECISION,
    "startPointLng" DOUBLE PRECISION,
    "startPointLabel" TEXT,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFollow" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "followingId" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,

    CONSTRAINT "UserFollow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mention" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "postId" INTEGER NOT NULL,
    "mentionedUserId" TEXT NOT NULL,

    CONSTRAINT "Mention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hashtag" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "tag" TEXT NOT NULL,

    CONSTRAINT "Hashtag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostToHashtag" (
    "postId" INTEGER NOT NULL,
    "hashtagId" INTEGER NOT NULL,

    CONSTRAINT "PostToHashtag_pkey" PRIMARY KEY ("postId","hashtagId")
);

-- CreateTable
CREATE TABLE "PostLike" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "postId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PostLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "_MtFacilityToMtFacilityType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MountainFeature_mountainId_key" ON "MountainFeature"("mountainId");

-- CreateIndex
CREATE INDEX "MountainToMtFacility_mtFacilityId_idx" ON "MountainToMtFacility"("mtFacilityId");

-- CreateIndex
CREATE INDEX "MountainToMtFacility_mountainId_idx" ON "MountainToMtFacility"("mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_userId_key" ON "UserInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag_tag_key" ON "Hashtag"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "_MtFacilityToMtFacilityType_AB_unique" ON "_MtFacilityToMtFacilityType"("A", "B");

-- CreateIndex
CREATE INDEX "_MtFacilityToMtFacilityType_B_index" ON "_MtFacilityToMtFacilityType"("B");

-- AddForeignKey
ALTER TABLE "AfterClimbMeal" ADD CONSTRAINT "AfterClimbMeal_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AfterClimbMeal" ADD CONSTRAINT "AfterClimbMeal_mtId_fkey" FOREIGN KEY ("mtId") REFERENCES "Mountain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AfterClimbMeal" ADD CONSTRAINT "AfterClimbMeal_trailheadId_fkey" FOREIGN KEY ("trailheadId") REFERENCES "Trailhead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AfterClimbSpa" ADD CONSTRAINT "AfterClimbSpa_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AfterClimbSpa" ADD CONSTRAINT "AfterClimbSpa_mtId_fkey" FOREIGN KEY ("mtId") REFERENCES "Mountain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AfterClimbSpa" ADD CONSTRAINT "AfterClimbSpa_trailheadId_fkey" FOREIGN KEY ("trailheadId") REFERENCES "Trailhead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mountain" ADD CONSTRAINT "Mountain_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MountainFeature" ADD CONSTRAINT "MountainFeature_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MtFacilityToPhoto" ADD CONSTRAINT "MtFacilityToPhoto_mtFacilityId_fkey" FOREIGN KEY ("mtFacilityId") REFERENCES "MtFacility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MtFacilityToPhoto" ADD CONSTRAINT "MtFacilityToPhoto_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MountainToPhoto" ADD CONSTRAINT "MountainToPhoto_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MountainToPhoto" ADD CONSTRAINT "MountainToPhoto_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailheadToPhoto" ADD CONSTRAINT "TrailheadToPhoto_trailheadId_fkey" FOREIGN KEY ("trailheadId") REFERENCES "Trailhead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailheadToPhoto" ADD CONSTRAINT "TrailheadToPhoto_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MountainToTrailhead" ADD CONSTRAINT "MountainToTrailhead_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MountainToTrailhead" ADD CONSTRAINT "MountainToTrailhead_trailheadId_fkey" FOREIGN KEY ("trailheadId") REFERENCES "Trailhead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailheadToMtFacility" ADD CONSTRAINT "TrailheadToMtFacility_mtFacilityId_fkey" FOREIGN KEY ("mtFacilityId") REFERENCES "MtFacility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailheadToMtFacility" ADD CONSTRAINT "TrailheadToMtFacility_trailheadId_fkey" FOREIGN KEY ("trailheadId") REFERENCES "Trailhead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trailhead" ADD CONSTRAINT "Trailhead_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailheadRating" ADD CONSTRAINT "TrailheadRating_trailheadId_fkey" FOREIGN KEY ("trailheadId") REFERENCES "Trailhead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parking" ADD CONSTRAINT "Parking_trailheadId_fkey" FOREIGN KEY ("trailheadId") REFERENCES "Trailhead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailheadRouteGroup" ADD CONSTRAINT "TrailheadRouteGroup_trailheadId_fkey" FOREIGN KEY ("trailheadId") REFERENCES "Trailhead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailheadRoute" ADD CONSTRAINT "TrailheadRoute_routeGroupId_fkey" FOREIGN KEY ("routeGroupId") REFERENCES "TrailheadRouteGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MountainToMtFacility" ADD CONSTRAINT "MountainToMtFacility_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MountainToMtFacility" ADD CONSTRAINT "MountainToMtFacility_mtFacilityId_fkey" FOREIGN KEY ("mtFacilityId") REFERENCES "MtFacility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MtFacilityToMtFacilityType" ADD CONSTRAINT "MtFacilityToMtFacilityType_mtFacilityId_fkey" FOREIGN KEY ("mtFacilityId") REFERENCES "MtFacility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MtFacilityToMtFacilityType" ADD CONSTRAINT "MtFacilityToMtFacilityType_mtFacilityTypeId_fkey" FOREIGN KEY ("mtFacilityTypeId") REFERENCES "MtFacilityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MtFacility" ADD CONSTRAINT "MtFacility_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MtFacilityToRsvMethod" ADD CONSTRAINT "MtFacilityToRsvMethod_mtFacilityId_fkey" FOREIGN KEY ("mtFacilityId") REFERENCES "MtFacility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MtFacilityToRsvMethod" ADD CONSTRAINT "MtFacilityToRsvMethod_rsvMethodId_fkey" FOREIGN KEY ("rsvMethodId") REFERENCES "RsvMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MtFacilityToPayMethod" ADD CONSTRAINT "MtFacilityToPayMethod_mtFacilityId_fkey" FOREIGN KEY ("mtFacilityId") REFERENCES "MtFacility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MtFacilityToPayMethod" ADD CONSTRAINT "MtFacilityToPayMethod_payMethodId_fkey" FOREIGN KEY ("payMethodId") REFERENCES "PayMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessPeriod" ADD CONSTRAINT "BusinessPeriod_mtFacilityId_fkey" FOREIGN KEY ("mtFacilityId") REFERENCES "MtFacility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MountainUrlMemo" ADD CONSTRAINT "MountainUrlMemo_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_mtId_fkey" FOREIGN KEY ("mtId") REFERENCES "Mountain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_mtFacilityId_fkey" FOREIGN KEY ("mtFacilityId") REFERENCES "MtFacility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_mtTrailheadId_fkey" FOREIGN KEY ("mtTrailheadId") REFERENCES "MountainToTrailhead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostBookmark" ADD CONSTRAINT "PostBookmark_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostBookmark" ADD CONSTRAINT "PostBookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mention" ADD CONSTRAINT "Mention_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mention" ADD CONSTRAINT "Mention_mentionedUserId_fkey" FOREIGN KEY ("mentionedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostToHashtag" ADD CONSTRAINT "PostToHashtag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostToHashtag" ADD CONSTRAINT "PostToHashtag_hashtagId_fkey" FOREIGN KEY ("hashtagId") REFERENCES "Hashtag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MtFacilityToMtFacilityType" ADD CONSTRAINT "_MtFacilityToMtFacilityType_A_fkey" FOREIGN KEY ("A") REFERENCES "MtFacility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MtFacilityToMtFacilityType" ADD CONSTRAINT "_MtFacilityToMtFacilityType_B_fkey" FOREIGN KEY ("B") REFERENCES "MtFacilityType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
