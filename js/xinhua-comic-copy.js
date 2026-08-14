/**
 * 关系空间构图 · 漫画引导文案（成人 / 儿童）
 * 分镜图共用，字幕分叉。
 */
window.XinhuaComicCopy = {
  adult: {
    pages: [
      {
        title: "先画出心里的家",
        body: "请根据目前家庭中的实际成员，把他们放进关系地图。方格□代表男性，圆圈○代表女性。",
        img: "assets/xinhua/xinhua-panel-01-begin.png",
        alt: "家庭地图启程",
      },
      {
        title: "位置就是感受",
        body: "请按当下的感觉自由安排每个人的位置：近一点、远一点都可以。没有对错，也没有标准答案。",
        img: "assets/xinhua/xinhua-panel-02-shapes.png",
        alt: "男女图形示意",
      },
      {
        title: "符号可有可无",
        body: "画完人物后，可在图形里填入＞或＜，也可以不填。只需跟随第一感觉，不必解释为什么。",
        img: "assets/xinhua/xinhua-panel-03-arrange.png",
        alt: "自由摆放示意",
      },
      {
        title: "把关系摆上地图",
        body: "接下来你会在客厅场景里的关系地图板上拖转成员。",
        howto: true,
        img: "assets/xinhua/xinhua-scene-living-board.png",
        alt: "客厅关系地图板",
        howtoItems: [
          "添加并摆放□男性 / ○女性（至少一位）",
          "点选后可调大小、颜色与＞＜符号",
          "完成后将短暂「理解构图」，再进入探索性解读（本测评不生成配图）",
        ],
      },
    ],
  },
  child: {
    pages: [
      {
        title: "今天玩家庭地图",
        body: "你可以把家里的人放进地图里。男生用方格□，女生用圆圈○。",
        img: "assets/xinhua/xinhua-panel-01-begin.png",
        alt: "家庭地图启程",
      },
      {
        title: "想放哪里都可以",
        body: "近一点、远一点都没关系。不用画得漂亮，也没有对错，按你的感觉来。",
        img: "assets/xinhua/xinhua-panel-02-shapes.png",
        alt: "男女图形示意",
      },
      {
        title: "里面可以画符号",
        body: "可以在里面画＞或＜，也可以不画。跟着第一感觉就好。",
        img: "assets/xinhua/xinhua-panel-03-arrange.png",
        alt: "自由摆放示意",
      },
      {
        title: "把家人摆上地图",
        body: "接下来在客厅里的地图板上拖一拖、摆一摆。",
        howto: true,
        img: "assets/xinhua/xinhua-scene-living-board.png",
        alt: "客厅关系地图板",
        howtoItems: [
          "先放上家里的人（□男生 / ○女生）",
          "可以拖动位置，也可以改大小和符号",
          "点完成后会稍等一下，再看看地图说了什么（不会生成新的大图）",
        ],
      },
    ],
  },
};
