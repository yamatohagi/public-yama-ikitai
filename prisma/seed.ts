import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const Area = await prisma.area.createMany({
    data: [
      {id: 1, name: '北海道', nameKana: 'ホッカイドウ'},
      {id: 2, name: '東北', nameKana: 'トウホク'},
      {id: 3, name: '上信越', nameKana: 'ジョウシンエツ'},
      {id: 4, name: '関東', nameKana: 'カントウ'},
      {id: 5, name: '八ヶ岳', nameKana: 'ヤツガタケ'},
      {
        id: 6,
        name: '北アルプス・御嶽山',
        nameKana: 'キタアルプス・オンタケサン',
      },
      {id: 7, name: '中央アルプス', nameKana: 'チュウオウアルプス'},
      {id: 8, name: '南アルプス', nameKana: 'ミナミアルプス'},
      {
        id: 9,
        name: '東海・北陸・近畿',
        nameKana: 'トウカイ・ホクリク・キンキ',
      },
      {id: 10, name: '中国・四国', nameKana: 'チュウゴク・シコク'},
      {id: 11, name: '九州・沖縄', nameKana: 'キュウシュウ・オキナワ'},
      {id: 12, name: '海外', nameKana: 'カイガイ'},
    ],
  });

  const Mountain = await prisma.mountain.createMany({
    data: [
      {
        id: 1,
        applicationAt: new Date(),
        name: '木曽駒ヶ岳',
        nameKana: 'きそこまがたけ',

        stay0n1d: true,
        stay1n2d: true,

        postalCode: 3994301,
        prefecture: '長野県',
        address1: '木曽郡上松町',
        address2: '',
        address3: '',
        hyakumeizanStatus: true,
        elevation: 2956,
        appealPoint: '高尾山よりコースタイム短いのに景色はアルプス。コスパ良き!',
        description:
          '長野県南部に連なる中央アルプス（木曽山脈）の最高峰。登山者の多くが利用するロープウェイ・千畳敷駅がメインの登山口となる。標高約2600ｍ、日本最高地点の駅前に広がる千畳敷は、日本でも有数のお花畑だ。ここから山頂へは、急登こそあるものの通過困難箇所はなく、天気が安定していれば初級者でもそう苦労せず山頂を踏めることだろう。コース沿いには中央アルプス固有種のコマウスユキソウ（ヒメウスユキソウ）が咲き、時間があれば中央アルプス唯一の氷河湖、濃ヶ池に立ち寄るのもいい。山頂周辺と宝剣岳北面には計５軒の山小屋もあって天気急変の際などは安心だが、一気に高度が上がるので高山病には注意が必要。水分をたっぷり摂ることとゆっくり歩くことが高山病を防ぐコツだ。なお、宝剣岳はクサリ場が連続する。岩場が苦手な人は立ち入らないように。',
      },

      {
        id: 2,
        approvalAt: new Date(),
        name: '槍ヶ岳',
        nameKana: 'やりがたけ',

        stay1n2d: true,
        stay2n3d: true,

        postalCode: 4180006,
        prefecture: '静岡県',
        address1: '駿東郡小山町',
        address2: '富士山',
        address3: '',
        hyakumeizanStatus: true,
        elevation: 3776,
        appealPoint: '日本一高い山であり、美しい富士五湖を一望できる。',
        description:
          '静岡県と山梨県にまたがる富士山は、日本一高い山であり、世界文化遺産にも登録されています。その美しい姿勢と麓に広がる富士五湖の風景は、多くの登山者や観光客に人気です。富士山は四季折々の風景を楽しむことができ、特に初夏の山頂の雪解け水が流れる姿は美しいと評価されています。登山ルートは数多くあり、初心者から経験豊富な登山者まで、様々なレベルの人々が楽しむことができます。富士山の登山は、体力と十分な準備が必要ですが、山頂からの眺望は絶対に価値があります。',
      },
      {
        id: 3,
        name: '北岳',
        nameKana: 'きただけ',
        applicationAt: new Date(),

        stay1n2d: true,
        stay2n3d: true,

        postalCode: 3920500,
        prefecture: '長野県',
        address1: '上高地',
        address2: '北岳',
        address3: '',
        hyakumeizanStatus: true,
        elevation: 3190,
        appealPoint: 'アルプスの麓に広がる美しい景色と、独特な雰囲気が魅力。',
        description:
          '北アルプス（飛騨山脈）の最高峰であり、日本百名山にも選ばれている北岳は、長野県上高地に位置しています。北岳は非常に雄大な山岳地帯であり、山頂からの眺望は息をのむほど美しいです。登山者にとっては、雄大な自然と独特の雰囲気が魅力であり、多くの人々が訪れます。北岳への登山ルートにはいくつかの選択肢があり、初心者から経験豊富な登山者まで、様々なレベルの人々が楽しむことができます。ただし、北岳は高度が高いため、高山病には注意が必要です。適切な装備と登山計画を持ち、安全に登山を楽しんでください。',
      },
      {
        id: 4,
        approvalAt: new Date(),
        name: '宝剣山',
        nameKana: 'ほうけんざん',

        stay0n1d: true,
        stay1n2d: true,
        areaId: 7,
        postalCode: 3994301,
        prefecture: '長野県',
        address1: '木曽郡上松町',
        address2: '',
        address3: '',
        hyakumeizanStatus: true,
        elevation: 2956,
        appealPoint: '高尾山よりコースタイム短いのに景色はアルプス。コスパ良き!',
        description: '',
      },
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."Mountain_id_seq"', 4);`;

  const AfterClimbMeal = await prisma.afterClimbMeal.createMany({
    data: [
      {
        mtId: 1,
        name: '早太郎温泉こまくさの湯',
        remark: '勝つがうまいらしい',
        url: 'https://www.yamakei-online.com/yama-ya/detail.php?id=707',
      },
    ],
  });

  const AfterClimbSpa = await prisma.afterClimbSpa.createMany({
    data: [
      {
        mtId: 1,
        name: '露天 こぶしの湯',
        remark: '早太郎温泉郷',
        url: 'https://yamahack.com/1744',
      },
    ],
  });

  const MountainFeature = await prisma.mountainFeature.createMany({
    data: [
      {
        id: 1,
        mountainId: 1,

        seaOfCloudsRating: 2.3,
        seaOfCloudsRemark: '山頂から南アルプス方面に雲海が見れます',

        starrySkyRating: 3.0,
        starrySkyRemark: 'テント場の近くに大きな岩がオブジェみたいに置いてあるスポットがあり、星の灯りと岩のシャドウがとてもかっこいい',

        ptarmiganRating: 3.0,
        ptarmiganRemark: '山頂付近で雷鳥が見れます',

        sunriseRating: 3.0,
        sunriseRemark: '山頂からご来光が見れます',

        sunsetRating: 2.0,

        widthPeakRating: 2.0,

        trailViewRating: 2.0,
        trailViewRemark: '*千畳敷からのコース\n登山開始時から展望が広がる、最高。\nしかし、樹林帯が全くないので逆に退屈かも',
      },
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."MountainFeature_id_seq"', ${MountainFeature.count});`;

  const TrailHead = await prisma.trailhead.createMany({
    data: [
      {
        id: 1,
        areaId: 7,
        name: '千畳敷',
        nameKana: 'せんじょうじき',
        intro: 'ロープウェイを使用した一般的な登山口',
        elevation: 2612,

        lat: 36.2769807,
        lng: 137.5678748,

        postalCode: 3901511,
        prefecture: '長野県',
        address1: '松本市',
        address2: '安曇',
        address3: '平湯',

        lastConbiniName: 'セブン-イレブン 駒ヶ根インター店',
        lastConbiniLat: 35.739653,
        lastConbiniLng: 137.919576,

        myCarReg: 1,

        intensity: 10,
        view: 10,
        toilet: 1,
        vendingMachine: 1,
        store: 1,
        remark: 'ホテルもある',

        roadblockInfo: '特になし',
      },
      {
        id: 2,
        areaId: 6,
        name: '新穂高温泉',
        nameKana: 'しんほたかおんせん',
        elevation: 1117,

        lat: 36.2769807,
        lng: 137.5678748,

        postalCode: 3901511,
        prefecture: '岐阜県',
        address1: '高山市',
        address2: '安曇',
        address3: '平湯',

        lastConbiniName: 'セブン-イレブン 波田赤松店',
        lastConbiniLat: 36.1912273,
        lastConbiniLng: 137.8242933,

        myCarReg: 0,

        intensity: 8,
        view: 8,
        toilet: 1,
        vendingMachine: 1,
        store: 1,
        remark: '',
      },
      {
        id: 3,
        areaId: 8,
        name: '広河原',
        nameKana: 'ひろがわら',
        elevation: 1592,

        lat: 36.5063173,
        lng: 135.1875405,

        postalCode: 3901511,
        prefecture: '岐阜県',
        address1: '高山市',
        address2: '安曇',
        address3: '平湯',

        lastConbiniName: 'ローソン南アルプス街道店',
        lastConbiniLat: 35.6610837,
        lastConbiniLng: 138.4402605,

        myCarReg: 1,

        intensity: 7,
        view: 9,
        toilet: 1,
        vendingMachine: 1,
        store: 1,
        remark: '',
      },
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."Trailhead_id_seq"', 3);`;

  const TrailheadRating = await prisma.trailheadRating.createMany({
    data: [
      {
        id: 1,
        trailheadId: 1,
        featureType: '人気度',
        rating: 2.3,
      },
      {
        id: 2,
        trailheadId: 1,
        featureType: '体力度',
        rating: 3.0,
      },
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."TrailheadRating_id_seq"', 3);`;

  const MountainToTrailhead = await prisma.mountainToTrailhead.createMany({
    data: [
      {
        id: 1,
        mountainId: 1,
        trailheadId: 1,

        uphillTime: 120,
        downhillTime: 110,
        uphillDistance: 2000,
        downhillDistance: 2000,
        upDownTime: 230,
        upDownDistance: 4000,
      },
      {
        id: 2,
        mountainId: 2,
        trailheadId: 2,

        uphillTime: 550, // しっかり調べた
        downhillTime: 355, // しっかり調べた
        uphillDistance: 13500, // しっかり調べた
        downhillDistance: 13500, // しっかり調べた
        upDownTime: 909, // しっかり調べた
        upDownDistance: 27000, // しっかり調べた
      },
      {
        id: 3,
        mountainId: 3,
        trailheadId: 3,

        uphillTime: 390, // しっかり調べた
        downhillTime: 220, // しっかり調べた
        uphillDistance: 5000, // しっかり調べた
        downhillDistance: 5000, // しっかり調べた
        upDownTime: 611, // しっかり調べた
        upDownDistance: 10000, // しっかり調べた
      },
      {
        id: 4,
        mountainId: 4,
        trailheadId: 1,

        uphillTime: 120,
        downhillTime: 110,
        uphillDistance: 2000,
        downhillDistance: 2000,
        upDownTime: 230,
        upDownDistance: 4000,
      },
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."MountainToTrailhead_id_seq"', 4);`;

  const Parking = await prisma.parking.createMany({
    data: [
      {
        id: 1,
        trailheadId: 1,
        fromMethod: 'car',
        name: '菅の台バスセンター',
        nameKana: 'すげのだいばすせんたー',
        lat: 35.7433633,
        lng: 137.888863,

        timeToTrailhead: 60,
        distanceToTrailhead: 5000,
        feeToTrailhead: 13000,

        postalCode: 3994117,
        prefecture: '長野県',
        address1: '駒ヶ根市',
        address2: '赤穂',
        address3: '',
      },
      {
        id: 2,
        trailheadId: 2,
        fromMethod: 'car',
        name: '新穂高ロープウェイ',
        nameKana: 'しんほたかおんせん',
        lat: 36.2769807,
        lng: 137.5678748,

        timeToTrailhead: 20,
        distanceToTrailhead: 5000,
        feeToTrailhead: 11000,

        postalCode: 3901511,
        prefecture: '長野県',
        address1: '松本市',
        address2: '安曇',
        address3: '',
      },
      {
        id: 3,
        trailheadId: 3,
        fromMethod: 'car',
        name: '南アルプス市芦安観光第2駐車場',
        nameKana: 'あしあんちゅうしゃじょう',
        lat: 35.6329902,
        lng: 138.3595548,

        timeToTrailhead: 10,
        distanceToTrailhead: 5000,
        feeToTrailhead: 10000,

        postalCode: 3901511,
        prefecture: '長野県',
        address1: '松本市',
        address2: '安曇',
        address3: '',
      },
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."Parking_id_seq"', 3);`;

  const TrailheadRouteGroup = await prisma.trailheadRouteGroup.createMany({
    data: [
      {
        id: 1,
        trailheadId: 1,
        type: 'publicTransport',
        remark: '新宿駅からのルート',
      },
      {
        id: 2,
        trailheadId: 1,
        type: 'publicTransport',
      },
      {
        id: 3,
        trailheadId: 1,
        type: 'publicTransport',
      },
      {
        id: 4,
        trailheadId: 1,
        type: 'myCar',
      },
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."TrailheadRouteGroup_id_seq"', 4);`;

  const TrailheadRoute = await prisma.trailheadRoute.createMany({
    data: [
      {
        id: 1,
        name: '新宿駅',
        type: 'start',
        time: 140,
        methodType: 'train',
        methodName: 'JR特急あずさ 松本行',
        payment: 8000,
        order: 1,
        routeGroupId: 1,
        url: 'https://www.eki-net.com/pc/jreast-shinkansen-reservation/English/wb/common/timetable/e_lex_hakutaka_u/03.html',
      },
      {
        id: 2,
        name: '松本',
        type: 'middle',
        time: 113,
        methodType: 'bus',
        methodName: 'アルピコ交通バス',
        payment: 2700,
        order: 2,
        routeGroupId: 1,
        url: 'https://www.alpico.co.jp/access/line/azumino_line/',
      },
      {
        id: 3,
        name: '平湯',
        type: 'middle',
        order: 3,
        routeGroupId: 1,

        methodType: 'walk',
        methodName: '徒歩',
      },
      {
        id: 4,
        name: '新穂高温泉',
        type: 'end',
        order: 4,
        routeGroupId: 1,
      },
      {
        id: 5,
        name: '新宿駅',
        type: 'start',
        time: 140,
        methodType: 'train',
        methodName: 'JR特急あずさ 松本行',
        payment: 22000,
        order: 1,
        routeGroupId: 2,
        url: 'https://www.eki-net.com/pc/jreast-shinkansen-reservation/English/wb/common/timetable/e_lex_hakutaka_u/03.html',
      },
      {
        id: 6,
        name: '新穂高温泉',
        type: 'end',
        order: 4,
        routeGroupId: 2,
      },
      {
        id: 7,
        name: '大阪駅',
        type: 'start',
        time: 140,
        methodType: 'train',
        methodName: 'JR特急あずさ 松本行',
        payment: 22000,
        order: 1,
        routeGroupId: 3,
      },
      {
        id: 8,
        name: '新穂高温泉',
        type: 'end',
        order: 2,
        routeGroupId: 3,
      },
      {
        id: 9,
        name: '菅の台バスターミナル',
        type: 'start',
        time: 140,
        methodType: 'bus',
        methodName: '千畳敷バス',
        payment: 4000,
        order: 1,
        routeGroupId: 4,
      },
      {
        id: 10,
        name: '千畳敷',
        type: 'end',
        order: 2,
        routeGroupId: 4,
      },
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."TrailheadRoute_id_seq"', 10);`;

  const Facility = await prisma.mtFacility.createMany({
    data: [
      {
        id: 1,
        name: '双六小屋',
        nameKana: 'すごろくごや',
        lat: 36.2769807,
        lng: 137.5678748,

        postalCode: 3901511,
        prefecture: '長野県',
        address1: '松本市',
        address2: '安曇',
        address3: '平湯',
        areaId: 7,

        // facilityNameId: 1,
        docomo: 1,
        au: 1,
        softbank: 0,
        rakuten: null,

        remark: 'トイレは頂上山荘のものを使用が可能',

        //* **施設の情報***//

        inTFlag: 1,
        inTCleanRating: 3.0,
        inTRemark:
          '貯めてヘリで地上に下ろすタイプだが、全く匂わず通常通り流すことができる。\nここまで綺麗なトイレはなかなかない。\nトイレ自体も新しい',

        outTFlag: 1,
        outTCleanRating: 2.0,
        outTRemark: '使用者意見募集中',

        bathSinkFlag: 1,
        bathSinkCleanRating: 3.0,
        bathSinkRemark: '数も多いし、アルコールや自動で開くゴミ箱が完備されていて完璧',

        talkRoomFlag: 1,
        talkRoomCleanRating: 3.0,
        talkRoomRemark: '数も多いし、アルコールや自動で開くゴミ箱が完備されていて完璧',

        dryRoomFlag: 1,
        dryRoomCleanRating: 3.0,
        dryRoomRemark: '数も多いし、アルコールや自動で開くゴミ箱が完備されていて完璧',

        cafeSpaceRoomFlag: 0,

        // listのところ
        listCapacityTent: 150,
        listCapacityHut: 150,
        listFeeTent: 2000,
        listFeeHut: 14000,
        listFeeHut2: 9500,
        listTelOffice: '0577-34-6268',
        listTelLocal: '090-3480-0434',
        listHp: 'http://www.sugorokugoya.com/',
        listElevation: 2600,
        listConnectionRemark: '発電時のみ',

        // 表のところ
        tStay: 1,
        tCafeSpace: 1,
        tTent: 1,
        tShop: 1,
        tToilet: 1,
        tBathSink: 1,
        tChangingRoom: 1,
        tDryRoom: 1,
        tBath: 0,
        tWave: 1,
        tWifi: 0,
        tPublicPhone: 1,
        tKitchen: 0,
        tTalkRoom: 1,
        tOther: 1,
      },
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."MtFacility_id_seq"', 1);`;

  // 施設のタイプ
  const MtFacilityType = await prisma.mtFacilityType.createMany({
    data: [
      {id: 1, name: 'ホテル'},
      {id: 2, name: '小屋'},
      {id: 3, name: 'テント場'},
      {id: 4, name: '休憩小屋'},
    ],
  });

  const MtFacilityToMtFacilityType = await prisma.mtFacilityToMtFacilityType.createMany({
    data: [
      {id: 1, mtFacilityId: 1, mtFacilityTypeId: 2},
      {id: 2, mtFacilityId: 1, mtFacilityTypeId: 3},
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."MtFacilityToMtFacilityType_id_seq"', 2);`;

  // 予約方法 (複数可) 電話 WEB 予約不要
  const RsvMethod = await prisma.rsvMethod.createMany({
    data: [
      {id: 1, name: '電話'},
      {id: 2, name: 'WEB'},
      {id: 3, name: '予約不要'},
    ],
  });

  const MtFacilityToRsvMethod = await prisma.mtFacilityToRsvMethod.createMany({
    data: [
      {id: 1, mtFacilityId: 1, rsvMethodId: 2},
      {id: 2, mtFacilityId: 1, rsvMethodId: 3},
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."MtFacilityToRsvMethod_id_seq"', 2);`;

  // 決済情報(決済方法 (複数可) 現金 クレジット 電子マネー)
  const PayMethod = await prisma.payMethod.createMany({
    data: [
      {id: 1, name: '現金'},
      {id: 2, name: 'クレジット'},
      {id: 3, name: '電子マネー'},
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."PayMethod_id_seq"', 3);`;

  const MtFacilityToPayMethod = await prisma.mtFacilityToPayMethod.createMany({
    data: [
      {id: 1, mtFacilityId: 1, payMethodId: 2},
      {id: 2, mtFacilityId: 1, payMethodId: 3},
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."MtFacilityToPayMethod_id_seq"', 2);`;

  // 決済情報(決済方法 (複数可) 現金 クレジット 電子マネー)
  const BusinessPeriod = await prisma.businessPeriod.createMany({
    data: [
      {
        id: 1,
        mtFacilityId: 1,
        year: '2023',
        start: new Date(),
        end: new Date(),
      },
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."BusinessPeriod_id_seq"', 1);`;

  const MountainFacilityName = await prisma.mountainToMtFacility.createMany({
    data: [
      {
        mountainId: 1,
        mtFacilityId: 1,
      },
    ],
  });

  const MountainUrlMemo = await prisma.mountainUrlMemo.createMany({
    data: [
      {
        mountainId: 1,
        name: 'バスの時刻表',
        url: 'https://www.alpico.co.jp/traffic/express/komagatake/',
        remark: 'ここが一番わかりやすい',
      },
    ],
  });

  const user1Id = 'clp3c1dwj00gp3r6wzceuttmj';
  const user2Id = 'clp3cpl1m0000vwl9fygk8xvn';
  const User = await prisma.user.createMany({
    data: [
      {
        id: user1Id,
      },
      {
        id: user2Id,
        name: '返信太郎',
        userName: 'replyTaro',
        iconOriginal: 'https://pbs.twimg.com/profile_images/1536303114470699008/WS3EdQV0_400x400.jpg',
        iconThumbnail: 'https://pbs.twimg.com/profile_images/1536303114470699008/WS3EdQV0_400x400.jpg',
      },
    ],
  });

  const Post = await prisma.post.createMany({
    data: [
      {
        id: 1,
        userId: user1Id,
        mtId: 1,
        content: '木曽駒ヶ岳に行ってきました！',
        activityDate: new Date('2021-09-01'),
      },
      {
        id: 2,
        userId: user1Id,
        mtId: 1,
        content: '木曽駒ヶ岳の雲海の写真を投稿しました！',
        activityDate: new Date('2021-09-01'),
      },
      {
        id: 3,
        parentId: 2,
        userId: user2Id,
        content: 'いいですね！',
        activityDate: new Date('2021-09-02'),
      },
      {
        id: 4,
        parentId: 3,
        userId: user1Id,
        content: 'ありがとう、返信太郎さん！',
        activityDate: new Date('2021-09-03'),
      },
      {
        id: 5,
        parentId: 3,
        userId: user2Id,
        content: 'どういたしまして',
        activityDate: new Date('2021-09-04'),
      },
      {
        id: 6,
        userId: user2Id,
        content: '双六小屋の写真を投稿しました',
        activityDate: new Date('2021-09-04'),
        mtFacilityId: 1,
      },
      {
        id: 7,
        userId: user2Id,
        content: '双六小屋のトイレの写真を投稿しました',
        activityDate: new Date('2021-09-04'),
        mtFacilityId: 1,
      },
      {
        id: 8,
        userId: user2Id,
        content: '千畳敷',
        activityDate: new Date('2021-09-04'),
        mtTrailheadId: 1,
      },
    ],
  });

  const userAId = 'mai';
  const userBId = 'pokey';
  const postId = '123';
  const Notice = await prisma.notice.createMany({
    data: [
      {
        id: 1,
        type: 'like',
        fromUserId: user1Id,
        toUserId: user2Id,
        userImage: 'https://profile.line-scdn.net/0hneEViu8XMUp4LyWvkBpOHURqPycPATcCAE52Kg8pOHtRTyZJQhx_JVl4PXNdH3RMEEh7eQonZi0C',
        createdAt: new Date('2023-12-12 12:12:12'),
        postId: 1,
      },
      {
        id: 2,
        type: 'follow',
        fromUserId: user1Id,
        toUserId: user2Id,
        userImage: 'https://profile.line-scdn.net/0hneEViu8XMUp4LyWvkBpOHURqPycPATcCAE52Kg8pOHtRTyZJQhx_JVl4PXNdH3RMEEh7eQonZi0C',
        createdAt: new Date('2023-12-11 12:12:12'),
      },
      {
        id: 3,
        type: 'comment',
        fromUserId: user1Id,
        toUserId: user2Id,
        userImage: 'https://profile.line-scdn.net/0hneEViu8XMUp4LyWvkBpOHURqPycPATcCAE52Kg8pOHtRTyZJQhx_JVl4PXNdH3RMEEh7eQonZi0C',
        createdAt: new Date('2023-12-16 12:12:12'),
      },
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."Post_id_seq"', ${Post.count});`;

  const Mention = await prisma.mention.createMany({
    data: [
      {
        id: 1,
        postId: 3,
        mentionedUserId: user1Id,
      },
      {
        id: 2,
        postId: 4,
        mentionedUserId: user2Id,
      },
    ],
  });

  const PostLike = await prisma.postLike.createMany({
    data: [
      {
        id: 1,
        postId: 2,
        userId: user2Id,
      },
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."PostLike_id_seq"', 1);`;

  const Hashtag = await prisma.hashtag.createMany({
    data: [
      {
        id: 1,
        tag: '木曽駒ヶ岳',
      },
      {
        id: 2,
        tag: '双六小屋',
      },
      {
        id: 3,
        tag: '雲海',
      },
      {
        id: 4,
        tag: '外トイレ',
      },
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."Hashtag_id_seq"', 4);`;

  const PostToHashtag = await prisma.postToHashtag.createMany({
    data: [
      {
        postId: 1,
        hashtagId: 1,
      },
      {
        postId: 2,
        hashtagId: 1,
      },
      {
        postId: 2,
        hashtagId: 3,
      },
      {
        postId: 7,
        hashtagId: 4,
      },
    ],
  });

  const Photo = await prisma.photo.createMany({
    data: [
      {
        id: 1,
        title: '黒部五郎岳',
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
        postId: 1,
        width: 414,
        height: 276,
      },
      {
        id: 2,
        title: '槍ヶ岳',
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
        width: 414,
        height: 276,
      },
      {
        id: 3,
        title: '剣岳',
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
        width: 414,
        height: 276,
      },
      {
        id: 4,
        title: '宝剣',
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
        width: 414,
        height: 276,
      },
      // この下Feature
      {
        id: 5,
        order: 1,
        type: 'VIDEO',
        title: 'ご来光と雲海',
        original: 'https://sta-media.yama-ikitai.com/topImages/clqcaiat200003x6359irj7vw.mp4',
        thumbnail: 'https://sta-media.yama-ikitai.com/topImages/clqcaiat200003x6359irj7vw.jpg',
        width: 750,
        height: 420,
        postId: 2,
      },
      {
        id: 6,
        order: 1,
        title: 'ご来光と雲海',
        original: 'https://tripeditor.com/wp-content/uploads/2019/05/22211852/pl-999228957536a.jpg',
        thumbnail: 'https://tripeditor.com/wp-content/uploads/2019/05/22211852/pl-999228957536a.jpg',
        width: 750,
        height: 420,
        postId: 2,
      },
      {
        id: 7,
        order: 1,
        title: 'ご来光と雲海',
        original: 'https://tripeditor.com/wp-content/uploads/2019/05/22211852/pl-999228957536a.jpg',
        thumbnail: 'https://tripeditor.com/wp-content/uploads/2019/05/22211852/pl-999228957536a.jpg',
        width: 750,
        height: 420,
        postId: 2,
      },
      {
        id: 8,
        order: 1,
        title: 'ご来光と雲海',
        original: 'https://tripeditor.com/wp-content/uploads/2019/05/22211852/pl-999228957536a.jpg',
        thumbnail: 'https://tripeditor.com/wp-content/uploads/2019/05/22211852/pl-999228957536a.jpg',
        width: 750,
        height: 420,
        postId: 2,
      },
      {
        id: 9,
        order: 1,
        title: 'ご来光と雲海',
        original: 'https://tripeditor.com/wp-content/uploads/2019/05/22211852/pl-999228957536a.jpg',
        thumbnail: 'https://tripeditor.com/wp-content/uploads/2019/05/22211852/pl-999228957536a.jpg',
        width: 750,
        height: 420,
        postId: 2,
      },
      {
        id: 10,
        order: 1,
        title: 'ご来光と雲海',
        original: 'https://tripeditor.com/wp-content/uploads/2019/05/22211852/pl-999228957536a.jpg',
        thumbnail: 'https://tripeditor.com/wp-content/uploads/2019/05/22211852/pl-999228957536a.jpg',
        width: 750,
        height: 420,
        postId: 2,
      },
      {
        id: 11,
        order: 1,
        title: 'ご来光と雲海',
        original: 'https://tripeditor.com/wp-content/uploads/2019/05/22211852/pl-999228957536a.jpg',
        thumbnail: 'https://tripeditor.com/wp-content/uploads/2019/05/22211852/pl-999228957536a.jpg',
        width: 750,
        height: 420,
        postId: 2,
      },
      // 山小屋
      {
        id: 12,
        title: '双六',
        postId: 6,
        original: 'https://sta-media.yama-ikitai.com/topImages/clqn8jxl400003v5yynsiwkmp.jpg',
        thumbnail: 'https://sta-media.yama-ikitai.com/topImages/clqn8jxl400003v5yynsiwkmp.jpg',
        width: 414,
        height: 297,
      },
      {
        id: 13,
        title: '双六',
        postId: 6,
        original: 'https://sta-media.yama-ikitai.com/topImages/clqn8jxle00013v5y3z2hoiue.jpg',
        thumbnail: 'https://sta-media.yama-ikitai.com/topImages/clqn8jxle00013v5y3z2hoiue.jpg',
        width: 414,
        height: 276,
      },
      {
        id: 14,
        title: '双六のトイレ',
        postId: 7,
        original: 'https://sta-media.yama-ikitai.com/topImages/clq84p7cc00013x5znx1ce37y.jpg',
        thumbnail: 'https://sta-media.yama-ikitai.com/topImages/clq84p7cc00013x5znx1ce37y.jpg',
        width: 414,
        height: 276,
      },
      {
        id: 15,
        title: '千畳敷',
        postId: 8,
        original: 'https://sta-media.yama-ikitai.com/topImages/clqn8rzvn00003b6jf5czijeg.jpg',
        thumbnail: 'https://sta-media.yama-ikitai.com/topImages/clqn8rzvn00003b6jf5czijeg.jpg',
        width: 414,
        height: 276,
      },
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."Photo_id_seq"', ${Photo.count});`;

  const MtFacilityToPhoto = await prisma.mtFacilityToPhoto.createMany({
    data: [
      {
        id: 1,
        mtFacilityId: 1,
        photoId: 12,
        outdoor: true,
      },
      {
        id: 2,
        mtFacilityId: 1,
        photoId: 13,
        outdoor: true,
      },
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."MtFacilityToPhoto_id_seq"', ${MtFacilityToPhoto.count});`;

  const MountainToPhoto = await prisma.mountainToPhoto.createMany({
    data: [
      // {
      //   id: 1,
      //   mountainId: 1,
      //   photoId: 1,
      //   viewTo: true,
      // },

      {
        id: 2,
        mountainId: 1,
        photoId: 2,
      },
      {
        id: 3,
        mountainId: 1,
        photoId: 3,
      },
      {
        id: 4,
        mountainId: 4,
        photoId: 4,
      },
      // {
      //   id: 5,
      //   mountainId: 2,
      //   photoId: 1,
      //   labelTop: 30,
      //   labelLeft: 30,
      //   viewTo: true,
      // },
      // {
      //   id: 6,
      //   mountainId: 3,
      //   photoId: 1,
      //   labelTop: 60,
      //   labelLeft: 60,
      //   viewTo: true,
      // },
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."MountainToPhoto_id_seq"', ${MountainToPhoto.count});`;

  const TrailheadToPhoto = await prisma.trailheadToPhoto.createMany({
    data: [
      {
        id: 1,
        trailheadId: 1,
        photoId: 15,
      },
    ],
  });
  await prisma.$executeRaw`SELECT setval('public."TrailheadToPhoto_id_seq"', 1);`;

  // REINDEX DATABASE mydatabase;
  await prisma.$executeRaw`REINDEX DATABASE mydatabase;`;

  console.log('TrailheadToPhoto', TrailheadToPhoto);
  console.log('AfterClimbMeal', AfterClimbMeal);
  console.log('AfterClimbSpa', AfterClimbSpa);
  console.log('AfterClimbMeal', AfterClimbMeal);
  console.log('Created area:', Area);
  console.log('Created mountain:', Mountain);
  console.log('Created mountainFeature:', MountainFeature);
  console.log('Created mountain:', Mountain);
  console.log('Created mountainFeature:', MountainFeature);
  console.log('Created mountainFeature:', MtFacilityToPhoto);

  console.log('Created MountainToPhoto:', MountainToPhoto);

  console.log('Created MtFacilityToMtFacilityType:', MtFacilityToMtFacilityType);
  console.log('Created MtFacilityType:', MtFacilityType);

  console.log('Created RsvMethod:', RsvMethod);
  console.log('Created MtFacilityToRsvMethod:', MtFacilityToRsvMethod);

  console.log('Created PayMethod:', PayMethod);
  console.log('Created MtFacilityToPayMethod:', MtFacilityToPayMethod);

  console.log('Created BusinessPeriod:', BusinessPeriod);

  console.log('Created Photo:', Photo);
  console.log('Created trailHead:', TrailHead);
  console.log('Created TrailheadRating:', TrailheadRating);
  console.log('Created mountainToTrailhead:', MountainToTrailhead);

  console.log('Created TrailheadRouteGroup:', TrailheadRouteGroup);
  console.log('Created TrailheadRoute:', TrailheadRoute);
  console.log('Created parking:', Parking);
  console.log('Created mountainFacility:', MountainFacilityName);
  console.log('Created facility:', Facility);
  console.log('Created mountainUrlMemo:', MountainUrlMemo);

  console.log('Created user:', User);
  console.log('Created post:', Post);
  console.log('Created hashtag:', Hashtag);
  console.log('Created postToHashtag:', PostToHashtag);
  console.log('Created mention:', Mention);
  console.log('Created postLike:', PostLike);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
