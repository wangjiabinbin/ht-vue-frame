<!--
 * @Author: 王佳宾
 * @Date: 2020-12-02 17:15:55
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-08 09:20:59
 * @Description: 新建页面
 * @FilePath: \src\views\newCon\newCon.vue
-->
<template>
  <div class="newCon">
    <div class="headerNav">
      <div
        v-for="(item, index) in navList"
        @click="tapNavHandle(index)"
        :class="{ navActivety: navActivetyIndex === index }"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="newConMain">
      <!-- main -->
      <div class="newConMainCenter">
        <div v-for="(item, index) in dataList" :key="index">
          <div>{{ item.title }}</div>
          <div class="projectType">
            <div v-for="(i, n) in item.type" :key="n">
              {{ i.name }}
            </div>
          </div>
          <div>
            <div>
              负责人：<span>{{ item.fzr }}</span>
            </div>
            <router-link tag="div" :to="{ naem: 'login' }"
              >详情<van-icon style="margin-left: 0.1rem" name="arrow"
            /></router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="posictionRoter" @click="prevRouterAdd"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          name: '全部',
        },
        {
          name: '审核中',
        },
        {
          name: '审核通过',
        },
        {
          name: '审核未通过',
        },
      ],
      navActivetyIndex: 0,
      dataList: [
        {
          title: '应急项目',
          fzr: '张三',
          id: 'aaa',
          type: [
            {
              name: '应急',
            },
            {
              name: '地震',
            },
          ],
        },
        {
          title: '应急项目',
          fzr: '张三',
          id: 'aaa',
          type: [
            {
              name: '应急',
            },
            {
              name: '地震',
            },
          ],
        },
        {
          title: '应急项目',
          fzr: '张三',
          id: 'aaa',
          type: [
            {
              name: '应急',
            },
            {
              name: '地震',
            },
          ],
        },
        {
          title: '应急项目',
          fzr: '张三',
          id: 'aaa',
          type: [
            {
              name: '应急',
            },
            {
              name: '地震',
            },
          ],
        },
        {
          title: '应急项目',
          fzr: '张三',
          id: 'aaa',
          type: [
            {
              name: '应急',
            },
            {
              name: '地震',
            },
          ],
        },
        {
          title: '应急项目',
          fzr: '张三',
          id: 'aaa',
          type: [
            {
              name: '应急',
            },
            {
              name: '地震',
            },
          ],
        },
      ],
    };
  },
  created() {},
  methods: {
    tapNavHandle(index) {
      this.navActivetyIndex = index;
    },
    prevRouterAdd() {
      this.$router.push({ name: 'issueCon', replace: true });
    },
  },
};
</script>

<style scoped lang="scss">
.newCon {
  width: 100%;
  background: rgb(248, 247, 250);
  overflow: hidden;
  .posictionRoter {
    width: 0.6rem;
    height: 0.4rem;
    background: #ffffff;
    border: 1px solid rgba(64, 99, 231, 0.1);
    box-shadow: 0px 4px 5px 0px rgba(64, 99, 231, 0.1);
    border-radius: 0.2rem 0 0 0.2rem;
    position: fixed;
    right: 0;
    bottom: 0.9rem;
    z-index: 999;
  }
  .headerNav {
    display: flex;
    height: 0.42rem;
    width: 92%;
    padding: 0 0.15rem;
    justify-content: space-around;
    position: fixed;
    background: rgb(248, 247, 250);
    z-index: 999;
    top: 0;
    > div {
      font-size: 0.15rem;
      color: #4063e7;
      line-height: 0.42rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #4a4a4a;
    }
    .navActivety {
      font-weight: bold;
      color: #4063e7;
      border-bottom: 0.02rem solid #4063e7;
    }
  }
  .newConMain {
    padding: 0 0.15rem;
    margin-top: 0.42rem;
    .newConMainCenter {
      display: flex;
      flex-direction: column;
      padding-bottom: 0.15rem;
      > div {
        padding: 0 0.13rem;
        background: #fff;
        margin-top: 0.15rem;
        .projectType {
          display: flex;
          > div {
            width: 0.52rem;
            height: 0.18rem;
            background: #e0e6f4;
            border: 0.005rem solid #a4a4a4;
            border-radius: 0.02rem;
            font-size: 0.12rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #4063e7;
            line-height: 0.18rem;
            text-align: center;
            margin-right: 0.08rem;
          }
        }
        > div:first-child {
          height: 0.35rem;
          font-size: 0.15rem;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #4a4a4a;
          line-height: 0.36rem;
        }
        > div:last-child {
          display: flex;
          justify-content: space-between;
          height: 0.31rem;
          align-items: center;
          > div:first-child {
            font-size: 0.12rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #a4a4a4;
          }
          > div:last-child {
            font-size: 0.12rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #2e6fd7;
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
