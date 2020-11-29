<template>
  <div style="background: #f8f7fa">
    <!-- banner -->
    <div class="imgBanner">
      <img src="../../assets/banner.png" alt="" />
    </div>
    <div class="projectHomeDetail">
      <div class="homeProject">
        <div class="homeHeader">
          <div class="homeEvolve1" @click="isShowData = true" :class="{ actives: isShowData }">
            项目进展信息
          </div>
          <div>人员安排信息</div>
        </div>
        <div class="homeProjectMain">
          <div class="homeDate">
            <span class="homeDate-title"> 当前时间: </span>
            <span> {{ getDate }} </span>
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
                ><span :style="{ color: colorData[index].color }"
                  >+{{ projectDataWeek[index] }}</span
                >
              </div>
              <span class="projectNum" :style="{ color: colorData[index].bjColor }">
                {{ projectDataAll[index] }}
              </span>
              <span class="projectName"> {{ item.name }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 主体图表 -->
    <div class="homeMain">
      <!-- 态势图 -->
      <div>
        <div class="situationMapTitle">
          风险普查态势图<img src="../../assets/icon_1.png" alt="" />
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
            每周新增数量
          </div>
        </div>
        <swiper
          ref="situationMapSwiper"
          class="swiper-no-swiping situationMapSwiper"
          :options="swiperOptions"
        >
          <swiper-slide
            ><ProjectProgress
              :serversData="serversData"
              :jsonData="jsonData"
              :isShow="!isShowMinistries"
          /></swiper-slide>
          <swiper-slide
            ><ProjectProgress
              :serversData="serversData2"
              :jsonData="jsonData"
              :isShow="isShowMinistries"
          /></swiper-slide>
        </swiper>
      </div>
      <!-- 态势图 -->
      <!-- 趋势图 -->
      <div class="situationMapBoss">
        <div class="situationMapTitle">
          风险普查趋势图<img src="../../assets/icon_2.png" alt="" />
        </div>
        <div class="iconButtonLeft" @click="cutSwiperHandle(0)">
          <img src="../../assets/icon_left.png" alt="" />
        </div>
        <div class="iconButtonRight" @click="cutSwiperHandle(1)">
          <img src="../../assets/icon_left.png" alt="" />
        </div>
        <swiper
          ref="tendencyMapSwiper"
          class="swiper-no-swiping tendencyMapSwiper"
          :options="swiperOptions"
          style="width: 3.13rem; height: 1.92rem"
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
        <div class="tendencyMap">
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
      <div class="projectTableTitle">全国省市项目</div>
      <van-list
        v-model="tableS.loading"
        :finished="tableS.finished"
        finished-text="没有更多啦"
        offset="40"
        @load="loadHandle"
      >
        <Tables :tableData="tableS.tableData" :isShowMinistries="isShowMinistries" />
      </van-list>
    </div>
  </div>
</template>

<script>
import { getTables, getMapInfo, getMapJson, getAllProject } from '../../api/api';
import getNowFormatDate from '../../utils/dateS';
import ProjectProgress from './projectProgress.vue';
import LineChartsMap from './lineCharts.vue';
import Tables from './tables.vue';

export default {
  components: {
    ProjectProgress,
    LineChartsMap,
    Tables,
  },
  data() {
    return {
      serversData2: [],
      serversData: [],
      jsonData: null,
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
      projectDataAll: [],
      projectDataWeek: [],
      projectData: [
        {
          name: '正式实施',
        },
        {
          name: '已中标',
        },
        {
          name: '验收结项',
        },
        {
          name: '招标中',
        },
        {
          name: '售前实施',
        },
        {
          name: '售前支持',
        },
      ],
      colorData: [
        {
          color: '#6cbd78',
          bjColor: '#6CBD78',
        },
        {
          color: '#f09329',
          bjColor: '#EF9228',
        },
        {
          color: '#5f6f93',
          bjColor: '#5E7093',
        },
        {
          color: '#79CBEA',
          bjColor: 'e4f6fa',
        },
        {
          color: '#719bd5',
          bjColor: '#709BD2',
        },
        {
          color: '#8970b2',
          bjColor: '#8970B0',
        },
      ],
      tabMap: [
        {
          name: '累计项目总量',
        },
        {
          name: '每周新增数量',
        },
      ],
      tabLineMap: [
        {
          name: '新增中标',
        },
        {
          name: '新增验收',
        },
        {
          name: '售前支持',
        },
        {
          name: '售前实施',
        },
        {
          name: '已中标',
        },
        {
          name: '正式实施',
        },
        {
          name: '验收结项',
        },
      ],
      tableS: {
        tableData: [],
        load: this.loadHandle,
        page: 0,
        finished: false,
        loading: false,
        totals: 4,
      },
      getDate: '',
      lineCutData: {},
      isShowMinistries: false,
    };
  },
  methods: {
    clickHandle() {},
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
    // 下拉加载
    async loadHandle() {
      this.tableS.page++;
      await this.getTableData(this.tableS.page);
      // const TableList = Array.from(document.getElementsByClassName('isShowTable'));
      // if (!this.isShowMinistries) {
      //   TableList.forEach((item) => {
      //     const isShowDetail = item.firstElementChild.lastElementChild;
      //     isShowDetail.innerHTML = '';
      //   });
      // }
      this.tableS.loading = false;
      if (this.tableS.page === this.tableS.totals) {
        this.tableS.finished = true;
      }
    },
    // 获取table数据
    async getTableData(page) {
      const res = await getTables({
        parent: 100000,
        pageNum: page,
        pageSize: 10,
      });
      this.tableS.tableData = [...this.tableS.tableData, ...res.data.data.list];
    },
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
  async created() {
    // 折线图
    getAllProject().then((res) => {
      this.projectData.forEach((i, n) => {
        res.data.data.week.forEach((item, index) => {
          if (i.name === item.progress) {
            this.projectDataWeek.push(item.num);
          }
        });
      });
      this.projectData.forEach((i, n) => {
        res.data.data.All.forEach((item, index) => {
          if (i.name === item.progress) {
            this.projectDataAll.push(item.num);
          }
        });
      });
      this.lineCutData.XZZB = res.data.data.Classify[0].addWBD;
      this.lineCutData.XZYS = res.data.data.Classify[0].addCBA;
      this.lineCutData.SQZC = res.data.data.Classify[0].PST;
      this.lineCutData.SQSS = res.data.data.Classify[0].PIT;
      this.lineCutData.YZB = res.data.data.Classify[0].WBD;
      this.lineCutData.ZSSS = res.data.data.Classify[0].FIE;
      this.lineCutData.YSJX = res.data.data.Classify[0].CBA;
    });
    await getMapJson(100000).then((res) => {
      this.jsonData = res.data;
    });
    // JSon  数据
    getMapInfo({
      parent: 100000,
      type: 1,
    }).then((res) => {
      this.serversData2 = res.data.data;
    });
    // 地图数据
    getMapInfo({
      parent: 100000,
      type: 0,
    }).then((res) => {
      this.serversData = res.data.data;
    });
  },
  mounted() {
    this.getDate = getNowFormatDate();
  },
};
</script>
<style scoped lang="scss">
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
    }

    :nth-child(1) {
      z-index: 9999;
    }
    :nth-child(2) {
      box-shadow: inset 0px 0px 20px 2px #e3e4ea;
      position: absolute;
      right: 0;
      top: 0;
      width: 50%;
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
      width: 80%;
      border-radius: 0.05rem;
      text-align: left;
      line-height: 0.5rem;
      font-weight: 400;
      color: #010713;
      margin-left: 0.15rem;

      .homeDate-title {
        margin-right: 0.1rem;
      }
    }
    // 项目信息
    .projectDetail {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .afterRight::after {
        content: '';
        width: 0.01rem;
        height: 0.28rem;
        background: #d0d0d0;
        position: absolute;
        right: 0;
      }
      .projectData {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 1.06rem;
        height: 0.68rem;
        background-color: #fff;
        margin-bottom: 0.22rem;
        .projectHead {
          min-width: 0.55rem;
          display: flex;
          justify-content: center;
          padding: 0.02rem 0.08rem;
          > span:nth-child(1) {
            margin-right: 0.05rem;
            font-size: 0.1rem;
            color: #848484;
          }
          > span:nth-child(2) {
            font-size: 0.1rem;
          }
        }
        .projectNum {
          display: inline-block;
          margin: 0.08rem 0;
          line-height: 0.24rem;
          font-size: 0.24rem;
          font-weight: bold;
        }

        .projectName {
          font-size: 0.12rem;
        }
      }
    }
  }
}
// 图表内容
.homeMain {
  padding: 0 0.13rem;

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
    width: 3.45rem;
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
  .tendencyMap {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
    > div {
      height: 0.32rem;
      width: 0.78rem;
      border: 1px solid #e9e9eb;
      text-align: center;
      line-height: 0.32rem;
      background-color: #f4f4f4;
      margin-bottom: 0.05rem;
    }
    > div:not(:nth-child(4)) {
      margin-right: 0.03rem;
    }
  }
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
  // background-color: #ffffff !important;
  background-image: linear-gradient(#ffffff, #ffffff) !important;
  font-weight: bold;
}
.tapsituationMapActive {
  background-color: #e0e6f4 !important;
  color: #5c77ea;
  border-color: transparent !important;
}
</style>
