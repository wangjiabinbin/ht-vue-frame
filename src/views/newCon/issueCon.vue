<!--
 * @Author: 王佳宾
 * @Date: 2020-12-02 17:15:55
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-10 14:52:58
 * @Description: Please set Description
 * @FilePath: \src\views\newCon\issueCon.vue
-->
<template>
  <div class="issueCon">
    <div style="overflow: hidden">
      <ReturnUp :title="title" />
      <div class="issueConMain">
        <div class="headerTop">*为必填项</div>
        <div class="newConCenter">
          <!--  -->
          <van-cell>
            <template #title>
              <span class="custom-title">项目名称</span>
              <span class="newConrequired">*</span>：
            </template>
            <template #default>
              <van-field
                v-model="formList.name"
                input-align="right"
                placeholder="请填写项目名称"
              />
            </template>
          </van-cell>
          <!--  项目类型 -->
          <van-cell>
            <template #title>
              <span class="custom-title">项目类型</span>
              <span class="newConrequired">*</span>：
            </template>
          </van-cell>
          <ProjectType @sendData="takeDataHandle" />
          <!-- <div class="Classification">
            <div
              :class="{
                actictyClassi: seachSekectHandle(item),
                actictyClassiAll: item.name === '总包' && checkefAll,
              }"
              v-for="(item, index) in ClassificationData"
              :key="index"
              @click="selectHandle(item, index)"
            >
              {{ item.name }}
            </div>
          </div> -->
          <!-- 项目类型 -->
          <!-- 项目进展 -->
          <van-cell>
            <template #title>
              <span class="custom-title">项目进展</span>
              <span class="newConrequired">*</span>：
            </template>
          </van-cell>
          <div class="progressClassin">
            <div
              v-for="(item, index) in projectData"
              :key="index"
              :class="{ progressClassinActive: progressIndex === index }"
              @click="progressTap(item, index)"
            >
              {{ item.name }}
            </div>
          </div>
          <!-- 项目进展 -->
          <!--  -->
          <van-cell v-for="(item, index) in vantCellData" :key="index">
            <template #title>
              <span class="custom-title">{{ item.title }}</span>
              <span class="newConrequired">{{ item.required ? '*' : '' }}</span
              >：
            </template>
            <template #default>
              <van-field
                v-model="formList[item.value]"
                input-align="right"
                :placeholder="'请输入' + item.title"
              />
            </template>
          </van-cell>
          <!--  -->
          <van-cell @click="isShowDate = true" is-link :value="formList.createTime">
            <template #title>
              <span class="custom-title">时间</span>
              <span class="newConrequired">*</span>：
            </template>
          </van-cell>
          <!--  -->
          <van-cell @click="isShowLevel = true" is-link :value="placeData">
            <template #title> <span class="custom-title">地点</span>： </template>
          </van-cell>
          <van-cell>
            <template #title> <span class="custom-title">备注</span>： </template>
          </van-cell>
          <textarea class="textAreaInput" v-model="formList.remarkInfo"></textarea>
          <div class="submitButton" @click="submitButton">提交</div>
          <PopupDate :closed="closedDate" :isShowDate="isShowDate" :SelectTime="SelectTime" />
          <LevelMenu
            :closed="closedDate"
            :confirm="SelectLevel"
            :isShowLevel="isShowLevel"
            :cityId="provinceId"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PopupDate from 'components/Popup.vue';
import LevelMenu from 'components/levelmenu/levelMenu.vue';
import ReturnUp from 'components/returnUp.vue';
import { ClassificationData, projectData } from 'utils/mapConfig';
import { addProject, getOneProject } from 'api/api';
import getNowFormatDate from 'utils/dateS';
import ProjectType from 'components/projectType/projectType.vue';
import { getStorage } from '../../utils/localstorageS';
import { dateFormat } from '../../utils/utils';

export default {
  components: {
    PopupDate,
    LevelMenu,
    ReturnUp,
    ProjectType,
  },
  data() {
    return {
      title: '项目新建',
      projectData: projectData,
      progressIndex: -1,
      placeData: '',
      isShowDate: false,
      isShowLevel: false,
      provinceId: '',
      formList: {
        createUserId: '',
        name: '',
        industryType: [], // 行业类型
        progressType: '售前支持', // 进展类型
        chargePeople: '', // 负责人
        meetPeople: '', // 对接人员
        projectManager: '', // 项目经理
        technicalManager: '', // 技术经理
        createTime: '', // 创建时间
        provinceId: '', // 省id
        cityId: '', // 市id
        district: '', // 县id
        remarkInfo: '', // 备注信息
      },
      vantCellData: [
        {
          title: '负责人',
          value: 'chargePeople',
          required: true,
        },
        {
          title: '对接人',
          value: 'meetPeople',
          required: true,
        },
        {
          title: '项目经理',
          value: 'projectManager',
        },
        {
          title: '技术经理',
          value: 'technicalManager',
        },
      ],
      isUpdate: this.$route.query.isUpdate,
      id: this.$route.query.id,
    };
  },
  created() {
    if (this.isUpdate) {
      getOneProject({ id: this.id }).then((res) => {
        this.progressIndex = this.projectData.findIndex(
          (item) => item.name === res.data.progressTypeName
        );
        const { data } = res;
        data.industryType.forEach((item) => {
          this.industryType.push(item);
          this.formList.industryType.push(item);
        });
        this.placeData = data.ProvinceName;
        data.district !== null
          ? (this.provinceId = data.district)
          : (this.provinceId = data.cityId);
        // res.data.cityId !== null
        // ? (this.provinceId = res.data.cityId)
        // : res.data.provinceId !== null
        // ? (this.provinceId = res.data.provinceId)
        // : (this.provinceId = '');
        this.formList = data;
      });
    } else {
      this.formList.createUserId = getStorage().id;
    }
  },
  methods: {
    progressTap(item, index) {
      this.progressIndex = index;
      this.formList.progressType = item.type;
    },
    SelectTime(value) {
      let createDate = dateFormat(new Date(value), 'yyyy-MM-dd');
      createDate += ' ' + getNowFormatDate().date;
      this.formList.createTime = createDate;
      this.isShowDate = false;
    },
    closedDate() {
      this.isShowDate = false;
      this.isShowLevel = false;
    },
    SelectLevel(value) {
      const [ProvinceName, CityName, DistrictName] = value;
      const { formList } = this;
      if (
        CityName.name === '北京' ||
        CityName.name === '天津' ||
        CityName.name === '上海' ||
        CityName.name === '重庆'
      ) {
        this.placeData = ProvinceName.name + '/' + DistrictName.name;
        formList.cityId = null;
      } else if (DistrictName) {
        this.placeData = ProvinceName.name + '/' + value[1].name + '/' + DistrictName.name;
        formList.cityId = value[1].code;
      } else {
        this.placeData = ProvinceName.name + '/' + value[1].name;
        formList.cityId = value[1].code;
      }
      formList.provinceId = ProvinceName.code;
      if (DistrictName) {
        formList.district = DistrictName.code;
      } else {
        formList.district = null;
      }
      this.isShowLevel = false;
    },
    isEmpty() {
      const {
        name,
        industryType,
        progressType,
        chargePeople,
        meetPeople,
        createTime,
      } = this.formList;
      if (
        name &&
        industryType.length > 0 &&
        progressType &&
        chargePeople &&
        meetPeople &&
        createTime
      ) {
        return true;
      }
      return false;
    },
    submitButton() {
      if (this.isEmpty()) {
        if (this.isUpdate) {
          this.formList.id = this.id;
        }
        addProject(this.formList).then((res) => {
          console.warn(res);
          if (res.code === 200) {
            this.$toast.success(this.isUpdate ? '编辑成功' : '新建成功');
            this.$router.push({
              name: 'person',
              replace: true,
            });
          }
        });
      } else {
        this.$toast.fail('请填写必选项');
      }
    },
    takeDataHandle(value) {
      this.formList.industryType = value;
    },
  },
};
</script>

<style scped lang="scss">
.issueCon {
  .issueConMain {
    height: 100%;
    margin: 0.15rem 0.15rem 0 0.15rem;
    // 必选
    .newConrequired {
      color: #4063e7;
    }
    .headerTop {
      width: 100%;
      height: 0.24rem;
      background: #e0e6f4;
      border-radius: 0.02rem;
      line-height: 0.24rem;
      text-indent: 0.06rem;
      font-size: 0.12rem;
      font-family: 'CNNormal';
      font-weight: 400;
      color: #4063e7;
    }
    .newConCenter {
      /deep/.van-cell {
        padding: 0;
        height: 0.45rem;
        background: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
      }
      /deep/.van-cell::after {
        display: none !important;
      }
      @import '../../style/progreesClassi/progressClassi.scss';
      .progressClassin {
        margin: 0;
      }
      .progressClassinActive {
        background-color: #e0e6f4 !important;
        color: #4063e7;
        border-color: transparent !important;
      }
      .textAreaInput {
        border: none;
        height: 0.9rem !important;
        width: 98% !important;
        resize: none;
        caret-color: #555454;
        text-indent: 0.05rem;
        color: #010713;
      }
      .submitButton {
        height: 0.43rem;
        background: #4063e7;
        border-radius: 0.22rem;
        font-size: 0.18rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        line-height: 0.43rem;
        text-align: center;
        margin: 0.13rem;
      }
      .submitButton::before {
        content: '';
        margin-bottom: 0.13rem;
      }
    }
    /deep/.van-cell-clickable:first-child {
      border-bottom: 0.01rem solid #e5e5e5;
    }
    /deep/.van-cell:nth-child(2) {
      height: 0.5rem;
      line-height: 0.54rem;
    }
    /deep/.van-field__control {
      color: #010713;
    }
  }
}
</style>
