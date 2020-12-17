<!--
 * @Author: 王佳宾
 * @Date: 2020-12-02 17:15:55
 * @LastEditors: 王佳宾
 * @LastEditTime: 2020-12-16 16:33:33
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
                class="paddingCell"
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
          <ProjectType :industryTypeS="industryType" @sendData="takeDataHandle" />
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
          <van-cell v-for="(item, index) in vantCellData" class="paddingCell" :key="index">
            <template #title>
              <span class="custom-title">{{ item.title }}</span>
              <span class="newConrequired">{{ item.required ? '*' : '' }}</span
              >：
            </template>
            <template #default>
              <van-field
                v-model="formList[item.value]"
                input-align="right"
                :placeholder="'请填写' + item.title"
              />
            </template>
          </van-cell>
          <!--  -->
          <van-cell @click="isShowDate = true" is-link :value="formList.createTime">
            <template #title>
              <span class="custom-title">时间</span>
              <span class="newConrequired">*</span>：
            </template>
            <template #default v-if="formList.createTime ? false : true">
              <van-field input-align="right" disabled :placeholder="'请填写时间'" />
            </template>
          </van-cell>
          <!--  -->
          <van-cell
            @click="isShowLevel = true"
            is-link
            :value="placeData"
            class="lastChlidren"
          >
            <template #title>
              <span class="custom-title">地点</span><span class="newConrequired">*</span>：
            </template>
            <template #default v-if="placeData ? false : true">
              <van-field input-align="right" disabled :placeholder="'请填写地点'" />
            </template>
          </van-cell>
          <!--  -->
          <div v-for="(item, index) in configList" :key="index">
            <van-cell>
              <template #title>
                <span class="custom-title">{{ item.title }}</span
                >：
              </template>
            </van-cell>
            <textarea
              class="textAreaInput textAreaConfig"
              :placeholder="'请填写' + item.title"
              v-model="formList[item.type]"
            ></textarea>
          </div>
          <!--  -->
          <van-cell>
            <template #title> <span class="custom-title">备注</span>： </template>
          </van-cell>
          <textarea
            class="textAreaInput"
            placeholder="备注信息填写"
            v-model="formList.remarkInfo"
          ></textarea>
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
import { projectData } from 'utils/mapConfig';
import { addProject, getOneProject } from 'api/api';
import ProjectType from 'components/projectType/projectType.vue';
import { dateFormat, isEmpty } from '../../utils/utils';

export default {
  components: {
    PopupDate,
    LevelMenu,
    ReturnUp,
    ProjectType,
  },
  data() {
    return {
      title: this.$route.query.isUpdate ? '项目编辑页' : '项目新建',
      projectData: projectData,
      progressIndex: -1,
      placeData: '',
      isShowDate: false,
      isShowLevel: false,
      provinceId: '',
      industryType: [],
      configList: [
        {
          title: '项目进展计划',
          type: 'progressPlan',
        },
        {
          title: '项目人员分配',
          type: 'peoplePositioning',
        },
        {
          title: '项目的问题',
          type: 'projectIssues',
        },
      ],
      formList: {
        createUserId: '',
        name: '',
        industryType: [], // 行业类型
        progressType: '', // 进展类型
        chargePeople: '', // 负责人
        meetPeople: '', // 对接人员
        projectManager: '', // 项目经理
        technicalManager: '', // 技术经理
        createTime: '', // 创建时间
        provinceId: '', // 省id
        cityId: '', // 市id
        district: '', // 县id
        remarkInfo: '', // 备注信息
        progressPlan: null, //项目计划
        peoplePositioning: null, // 项目人员配置
        projectIssues: null, // 项目的问题
      },
      vantCellData: [
        {
          title: '销售负责人',
          value: 'chargePeople',
          required: true,
        },
        {
          title: '对接单位',
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
      requiredData: [
        { key: 'name', value: '项目名称' },
        { key: 'industryType', value: '项目类型' },
        { key: 'progressType', value: '项目进展' },
        { key: 'chargePeople', value: '负责人' },
        { key: 'meetPeople', value: '对接人' },
        { key: 'createTime', value: '时间' },
        { key: 'provinceId', value: '地点' },
      ], // 所有表单必填项
    };
  },
  created() {
    if (this.isUpdate) {
      getOneProject({ id: this.id }).then((res) => {
        this.progressIndex = this.projectData.findIndex(
          (item) => item.name === res.data.project.progressTypeName
        );
        const { project } = res.data;
        project.industryType.forEach((item) => {
          this.industryType.push(item);
        });
        this.placeData = `${project.provinceName}${
          project.cityName !== null ? project.cityName + '' : ''
        }${project.districtName !== null ? project.districtName : ''}`;
        project.district !== null
          ? (this.provinceId = project.district)
          : (this.provinceId = project.cityId);
        this.formList = project;
        this.formList.createUserId = this.$cookies.getCookie('token').id;
        this.formList.peopleName = this.$cookies.getCookie('token').userName;
      });
    }
    this.formList.createUserId = this.$cookies.getCookie('token').id;
    this.formList.peopleName = this.$cookies.getCookie('token').userName;
    console.warn(this.formList);
  },
  methods: {
    progressTap(item, index) {
      this.progressIndex = index;
      this.formList.progressType = item.type;
    },
    SelectTime(value) {
      const createDate = dateFormat(new Date(value), 'yyyy-MM-dd');
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
    submitButton() {
      const allFormItem = Object.entries(this.formList);
      const hasEmpty = isEmpty(this.requiredData, allFormItem);
      if (!hasEmpty) {
        if (this.isUpdate) {
          this.formList.id = this.id;
        }
        this.formList.roleKey = this.$cookies.getCookie('token').roleKey;
        this.formList.regionId = this.$cookies.getCookie('token').regionId;
        addProject(this.formList).then((res) => {
          if (res.data.message === 'yes') {
            this.$toast.success(this.isUpdate ? '编辑成功' : '新建成功');
            this.$router.push({
              name: 'person',
              replace: true,
            });
          } else if (res.data.message === 'no') {
            this.$toast.fail('请选择本地区');
          }
        });
      } else {
        this.$toast.fail(`请输入\n${hasEmpty.value}`);
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
    .lastChlidren {
      border-bottom: 1px solid #e5e5e5;
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
      @import '../../style/vant.scss';
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
        color: #010713;
        border: 1px solid #ededed;
      }
      .textAreaInput::placeholder {
        color: #d0d0d0;
      }
      .textAreaConfig {
        height: 0.64rem !important;
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
  }
}
</style>
