<!--
 * @Author: 王佳宾
 * @Date: 2020-12-02 20:46:08
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-17 09:12:19
 * @Description: Please set Description
 * @FilePath: \src\views\home\Home.vue
-->
<template>
  <div>
    <!-- banner -->
    <div class="imgBanner">
      <img src="../../static/banner.png" alt="" />
    </div>
    <div class="projectHomeDetail">
      <div class="homeProject">
        <div class="homeHeader">
          <div class="homeEvolve1" @click="isShowData = true" :class="{ actives: isShowData }">
            项目进展信息
          </div>
          <div @click="isShowData = false" :class="{ actives: !isShowData }">人员安排信息</div>
        </div>
        <div
          :class="{
            homeProjectMain: true,
            homeProjectMainS: isShowData,
            homeProjectMainF: !isShowData,
          }"
          v-show="isShowData"
        >
          <div class="homeDate">
            <div>
              <span class="homeDate-title"> 更新时间: </span> <span> {{ getDate }} </span>
            </div>
            <div @click="overlayShow = true" class="homeExplain">
              <van-icon name="question-o" />
              数据说明
            </div>
            <!-- 遮罩层 -->
            <van-overlay :show="overlayShow" z-index="999999" @click="overlayShow = false">
              <div class="overlayDetail">
                <div class="overlayText">
                  <div
                    :class="{ overlayTitle: index === 0 }"
                    v-for="(item, index) in dataDeclaration"
                    :key="index"
                  >
                    <p>
                      {{ item.name }}
                    </p>
                    <p v-for="(i, n) in item.children ? item.children : null" :key="n + 's'">
                      {{ i }}
                    </p>
                  </div>
                </div>
                <div class="overlayDown">X</div>
              </div>
            </van-overlay>
          </div>
          <!-- 数据 -->

          <div class="projectDetail">
            <!-- 较上周增加数量 -->
            <div
              class="projectData"
              v-for="(item, index) in projectData"
              :class="{
                afterRight: index === 0 || index === 1 || index === 3 || index === 4,
              }"
              :key="index"
            >
              <div class="projectHead">
                <span class="">较上周</span
                ><span :style="{ color: colorData[index].color }">{{
                  projectDataWeek[index]
                }}</span>
              </div>
              <span class="projectNum" :style="{ color: colorData[index].bjColor }">
                {{ projectDataAll[index] }}
              </span>
              <span class="projectName"> {{ item.name }} </span>
            </div>
          </div>
        </div>
        <div
          :class="{
            homeProjectMain: true,
            homeProjectMainS: isShowData,
            homeProjectMainF: !isShowData,
          }"
          style="height: 2.3rem; display: flex; justify-content: center; align-items: center"
          v-show="!isShowData"
        >
          页面建设中，敬请期待~~
        </div>
      </div>
    </div>
    <!-- 主体图表 -->
    <div class="homeMain">
      <!-- 态势图 -->
      <div>
        <div class="situationMapTitle">
          风险普查态势图<img src="../../static/icon_1.png" alt="" />
        </div>
        <div class="situationMaptap">
          <div
            class="grossMap"
            @click="tapsituation(1)"
            :class="{ tapsituationMapActive: tapsituationIndex === 1 }"
          >
            累计项目总量
          </div>
          <div
            class="addMap"
            @click="tapsituation(2)"
            :class="{ tapsituationMapActive: tapsituationIndex === 2 }"
          >
            本周新增数量
          </div>
        </div>
        <swiper
          ref="situationMapSwiper"
          class="swiper-no-swiping situationMapSwiper"
          :options="swiperOptions"
        >
          <swiper-slide
            ><ProjectProgress
              :serversData="serversDataOne"
              :jsonData="jsonData"
              :isShow="isShowMinistries"
              :name="china"
          /></swiper-slide>
          <swiper-slide
            ><ProjectProgress
              :serversData="serversDataTwo"
              :jsonData="jsonData"
              :isShow="!isShowMinistries"
              :name="china"
          /></swiper-slide>
        </swiper>
      </div>
      <!-- 态势图 -->
      <!-- 趋势图 -->
      <div class="situationMapBoss">
        <div class="situationMapTitle">
          风险普查趋势图<img src="../../static/icon_2.png" alt="" />
        </div>
        <div class="iconButtonLeft" @click="cutSwiperHandle(0)">
          <img src="../../static/icon_left.png" alt="" />
        </div>
        <div class="iconButtonRight" @click="cutSwiperHandle(1)">
          <img src="../../static/icon_left.png" alt="" />
        </div>
        <swiper
          ref="tendencyMapSwiper"
          class="swiper-no-swiping tendencyMapSwiper"
          :options="swiperOptions"
          style="width: 100%; height: 1.92rem"
        >
          <swiper-slide
            ><LineChartsMap :lineMapData="lineCutData.XZZB" :name="tabLineMap[0].name"
          /></swiper-slide>
          <swiper-slide
            ><LineChartsMap :lineMapData="lineCutData.XZYS" :name="tabLineMap[1].name"
          /></swiper-slide>
          <swiper-slide
            ><LineChartsMap :lineMapData="lineCutData.SQZC" :name="tabLineMap[2].name"
          /></swiper-slide>
          <swiper-slide
            ><LineChartsMap :lineMapData="lineCutData.SQSS" :name="tabLineMap[3].name"
          /></swiper-slide>
          <swiper-slide
            ><LineChartsMap :lineMapData="lineCutData.YZB" :name="tabLineMap[4].name"
          /></swiper-slide>
          <swiper-slide
            ><LineChartsMap :lineMapData="lineCutData.ZSSS" :name="tabLineMap[5].name"
          /></swiper-slide>
          <swiper-slide
            ><LineChartsMap :lineMapData="lineCutData.YSJX" :name="tabLineMap[6].name"
          /></swiper-slide>
        </swiper>
        <div class="progressClassin">
          <div
            v-for="(item, index) in tabLineMap"
            :key="index"
            :class="{ tapsituationMapActive: taptendencyMapIndex === index }"
            @click="taptendencyMap(index)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <!-- 趋势图 -->
    </div>
    <!-- 主体图表结束 -->
    <!-- table -->
    <div class="tableDetail" style="background-color: #f8f8fa; margin-top: 0.2rem">
      <div class="projectTableTitle">全国省市县项目</div>
      <Tables :tableData="tableData" :isShowMinistries="isShowMinistries" />
    </div>
    <div class="bottomTitle" v-if="tableData.length ? true : false">没有更多啦</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getNowFormatDate, headerLineS } from '../../utils/utils';
import { ProjectProgress, LineChartsMap, Tables } from '../../utils/routers';
import { tabMap, tabLineMap, projectData, colorData } from '../../utils/mapConfig';

export default {
  components: {
    ProjectProgress,
    LineChartsMap,
    Tables,
  },
  data() {
    return {
      dataDeclaration: headerLineS,
      overlayShow: false,
      china: 'china',
      swiperOptions: {
        observer: true, // 启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
        observerParents: true, // 将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。
        // 自动高度
        autoHeight: true, // 自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
        loop: true, // 设置为true 则开启loop模式。
      },
      tapsituationIndex: 1,
      taptendencyMapIndex: 0,
      isShowData: true,
      projectData: projectData,
      colorData: colorData,
      tabMap: tabMap,
      tabLineMap: tabLineMap,
      getDate: '',
      isShowMinistries: false,
    };
  },
  async created() {
    this.getMapInfoOneAsync();
    this.getMapInfoAsync();
    this.getMapJsonAsync();
    this.getAllProjectAsync();
  },
  mounted() {
    this.getTableDataAsync();
    this.getDate = getNowFormatDate().currentdate;
  },
  computed: {
    ...mapState('HomeStore', [
      'serversDataTwo',
      'projectDataWeek',
      'projectDataAll',
      'lineCutData',
      'serversDataOne',
      'jsonData',
      'tableData',
    ]),
  },
  methods: {
    ...mapActions('HomeStore', [
      'getMapInfoAsync',
      'getAllProjectAsync',
      'getMapInfoOneAsync',
      'getMapJsonAsync',
      'getTableDataAsync',
    ]),
    // 点击轮播
    tapsituation(i) {
      this.tapsituationIndex = i;
      this.$refs.situationMapSwiper.$swiper.slideTo(i);
    },
    // 点击轮播
    taptendencyMap(i) {
      this.taptendencyMapIndex = i;
      this.$refs.tendencyMapSwiper.$swiper.slideTo(i + 1);
    },
    // 获取table数据

    // 左右按钮切换
    cutSwiperHandle(val) {
      if (!val) {
        this.taptendencyMapIndex--;
        if (this.taptendencyMapIndex < 0) {
          this.taptendencyMapIndex = this.tabLineMap.length - 1;
        }
        this.$refs.tendencyMapSwiper.$swiper.slideTo(this.taptendencyMapIndex + 1);
      } else {
        this.taptendencyMapIndex++;
        if (this.taptendencyMapIndex > this.tabLineMap.length - 1) {
          this.taptendencyMapIndex = 0;
        }
        this.$refs.tendencyMapSwiper.$swiper.slideTo(this.taptendencyMapIndex + 1);
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../style/projectDetail/_projectDetail.scss';
.projectProgress div {
  width: 5rem;
}
.imgBanner {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 1.5rem;
    display: block;
  }
}

.projectHomeDetail {
  background-color: #f9f9fb !important;
}
.homeProject {
  width: 100%;
  margin: auto;
  background-color: #ffffff;
  border-radius: 0.05rem;
  box-shadow: 0px 0px 0.1rem #d5e4ff;
  .homeHeader {
    height: 0.4rem;
    display: flex;
    position: relative;

    > div {
      width: 50%;
      text-align: center;
      line-height: 0.4rem;
      font-size: 0.14rem;
      font-weight: normal;
      box-shadow: inset 0px 0px 20px 2px #e3e4ea;
      // position: absolute;
      // right: 0;
      // top: 0;
      z-index: 9999;
    }
    :nth-child(2) {
    }
  }
  // 项目主体
  .homeProjectMain {
    border-radius: 0.05rem;
    position: relative;
    background-color: #fff;
    box-shadow: 0px 0px 8px 4px #e3e4ea;

    // 时间
    .homeDate {
      // background-color: #cad8ff;
      height: 0.5rem;
      font-weight: 400;
      color: #010713;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 0.15rem;
      .homeDate-title {
        margin-right: 0.1rem;
      }
      .homeExplain {
        width: 0.76rem;
        height: 0.2rem;
        background: #eff0f8;
        border-radius: 0.1rem 0 0 0.1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      .overlayDetail {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .overlayText {
          width: 2.17rem;
          height: 2.95rem;
          background: #ffffff;
          border-radius: 0.02rem;
          padding: 0 0.17rem 0 0.15rem;
          margin: 0;
          > div {
            font-size: 0.12rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #010713;
            margin-bottom: 0.17rem;
            p {
              line-height: 0.16rem;
              margin: 0;
            }
          }
          > div:nth-child(1) p {
            margin: 0;
          }
          .overlayTitle {
            font-size: 0.15rem;
            font-family: CNBold;
            font-weight: bold;
            color: #4163e8;
            line-height: 18px;
            margin-bottom: 0.17rem;
            margin-top: 0.23rem;
          }
        }
        .overlayDown {
          width: 0.28rem;
          height: 0.28rem;
          background: #010713;
          opacity: 0.6;
          border-radius: 50%;
          color: #fff;
          line-height: 0.28rem;
          text-align: center;
          margin-top: 0.1rem;
        }
      }
    }
    // 项目信息
  }
}
// 图表内容
.homeMain {
  padding: 0 3.46%;

  // 态势图切换
  .situationMapTitle {
    display: flex;
    align-items: center;
    padding: 0.22rem 0 0.14rem 0;
    line-height: 0.18rem;
    font-size: 0.18rem;
    font-weight: bold;

    img {
      width: 0.15rem;
      height: 0.12rem;
      margin-left: 0.05rem;
    }
  }
  .situationMapSwiper {
    border: 0.01rem solid #e1e1e1;
    // width: 3.45rem;
    width: 100%;
    height: 2.805rem;
  }
  // 态势图
  .situationMaptap {
    display: flex;
    margin-bottom: 0.1rem;

    > div {
      width: 0.87rem;
      height: 0.26rem;
      border: 1px solid #dfdfdf;
      background-color: #fff;
      font-size: 0.12rem;
      line-height: 0.26rem;
      border-radius: 0.04rem;
      text-align: center;
    }
    :nth-child(1) {
      margin-right: 0.09rem;
    }
  }
  // 趋势图
  .situationMapBoss {
    position: relative;

    .iconButtonLeft,
    .iconButtonRight {
      background-color: #b1aeae;
      border-radius: 50%;

      img {
        display: block;
        width: 100%;
        height: 100%;
        transform: scale(0.6);
      }
    }

    .iconButtonLeft {
      position: absolute;
      width: 0.3rem;
      height: 0.3rem;
      top: 1.41rem;
      left: -0.1rem;
      transform: scale(0.8);
      z-index: 999;
    }
    .iconButtonRight {
      position: absolute;
      top: 1.41rem;
      right: -0.1rem;
      width: 0.3rem;
      height: 0.3rem;
      transform: rotate(180deg) scale(0.8);
      z-index: 999;
    }
  }
  @import '../../style/progreesClassi/progressClassi.scss';
}
.bottomTitle {
  width: 100%;
  color: #969799;
  font-size: 0.14rem;
  line-height: 0.5rem;
  text-align: center;
}
// table样式
.tableDetail {
  padding: 0 0.1rem;
  .projectTableTitle {
    height: 0.45rem;
    font-size: 0.16rem;
    font-weight: bold;
    line-height: 0.45rem;
  }
}
.actives {
  box-shadow: none !important;
  background-color: #ffffff !important;
  // background-ima: linearge-gradient(#ffffff, #ffffff) !important;
  font-weight: bold;
}
.homeProjectMainS {
  border-radius: 0 0.05rem 0.05rem 0.05rem !important;
}
.homeProjectMainF {
  border-radius: 0.05rem 0 0.05rem 0.05rem !important;
}
.tapsituationMapActive {
  background-color: #e0e6f4 !important;
  color: #4063e7;
  border-color: transparent !important;
}
</style>
